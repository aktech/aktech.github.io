#!/usr/bin/env node
/**
 * Generate TTS audio files for all blog posts using Kokoro TTS.
 *
 * Usage: node scripts/generate_tts.mjs [--force] [--shard N --total-shards M] [--concurrency C]
 *
 * Reads markdown files from content/blog/, extracts text,
 * generates audio with kokoro-js, and saves WAV files to static/audio/.
 * Skips posts that already have audio unless --force is passed.
 *
 * For parallel CI: use --shard 0 --total-shards 6 to process only
 * shard 0 of 6. Each shard gets a deterministic subset of posts.
 *
 * Within a shard, uses child_process.fork() with --concurrency to
 * generate multiple posts in parallel (default: 2).
 */

import { readdir, readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, basename } from "node:path";
import { fork } from "node:child_process";
import { fileURLToPath } from "node:url";

const CONTENT_DIR = "content/blog";
const OUTPUT_DIR = "static/audio";
const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
const VOICE = "am_michael";
const FORCE = process.argv.includes("--force");

function getIntArg(name, fallback) {
  const idx = process.argv.indexOf(name);
  if (idx !== -1 && process.argv[idx + 1]) {
    return parseInt(process.argv[idx + 1], 10);
  }
  return fallback;
}

const SHARD = getIntArg("--shard", 0);
const TOTAL_SHARDS = getIntArg("--total-shards", 1);
const CONCURRENCY = getIntArg("--concurrency", 2);

/** Extract the slug from front matter (url: or permalink:) or filename */
function getSlug(frontMatter, filename) {
  const urlMatch = frontMatter.match(/^(?:url|permalink):\s*\/blog\/(.+)/m);
  if (urlMatch) return urlMatch[1].replace(/\/$/, "");
  return basename(filename, ".md")
    .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "");
}

/** Strip markdown/HTML to plain text */
function markdownToText(content) {
  return (
    content
      .replace(/<[^>]+>/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
      .replace(/_{1,3}([^_]+)_{1,3}/g, "$1")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]+`/g, "")
      .replace(/^>\s+/gm, "")
      .replace(/^[-*_]{3,}\s*$/gm, "")
      .replace(/^[\s]*[-*+]\s+/gm, "")
      .replace(/^[\s]*\d+\.\s+/gm, "")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/&#\d+;/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** Split text into chunks suitable for TTS generation */
function splitChunks(text) {
  const parts = text.split(/(?<=[.!?])\s+/);
  const expanded = [];
  for (const p of parts) {
    if (p.length > 300) {
      expanded.push(...p.split(/(?<=[,;:])\s+/));
    } else {
      expanded.push(p);
    }
  }
  const chunks = [];
  let buf = "";
  for (const part of expanded) {
    if (buf && buf.length + part.length + 1 > 200) {
      chunks.push(buf);
      buf = part;
    } else {
      buf += (buf ? " " : "") + part;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

/** Encode Float32Array samples to WAV ArrayBuffer */
function encodeWAV(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (off, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return Buffer.from(buffer);
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// --------------- Child Process: generate a single post ---------------
if (process.env.TTS_CHILD === "1") {
  const post = JSON.parse(process.env.TTS_POST);

  async function generatePost() {
    const { KokoroTTS } = await import("kokoro-js");
    const tts = await KokoroTTS.from_pretrained(process.env.TTS_MODEL, {
      dtype: "q8",
      device: "cpu",
    });

    const { slug, text, outPath } = post;
    const chunks = splitChunks(text);
    const audioResults = [];

    for (let i = 0; i < chunks.length; i++) {
      process.send({ type: "progress", slug, chunk: i + 1, total: chunks.length });
      const audio = await tts.generate(chunks[i], { voice: process.env.TTS_VOICE });
      audioResults.push(audio);
    }

    let totalLen = 0;
    for (const a of audioResults) totalLen += a.audio.length;
    const combined = new Float32Array(totalLen);
    let offset = 0;
    for (const a of audioResults) {
      combined.set(a.audio, offset);
      offset += a.audio.length;
    }

    const wav = encodeWAV(combined, audioResults[0].sampling_rate);
    await writeFile(outPath, wav);
    const sizeMB = (wav.length / 1024 / 1024).toFixed(1);
    const durationSec = (combined.length / audioResults[0].sampling_rate).toFixed(0);
    process.send({ type: "done", slug, outPath, sizeMB, durationSec });
  }

  generatePost().catch((e) => {
    process.send({ type: "error", slug: post.slug, msg: e.message });
    process.exit(1);
  });
} else {
  // --------------- Main Process ---------------
  async function main() {
    await mkdir(OUTPUT_DIR, { recursive: true });

    // Read and filter blog posts
    const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
    files.sort();
    console.log(`Found ${files.length} blog posts.`);

    const postsToGenerate = [];
    let skipped = 0;

    for (const file of files) {
      const raw = await readFile(join(CONTENT_DIR, file), "utf-8");
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!fmMatch) {
        console.log(`  [skip] ${file} (no front matter)`);
        skipped++;
        continue;
      }

      const frontMatter = fmMatch[1];
      const content = fmMatch[2];
      const slug = getSlug(frontMatter, file);
      const outPath = join(OUTPUT_DIR, `${slug}.wav`);

      if (!FORCE && (await fileExists(outPath))) {
        console.log(`  [skip] ${slug} (already exists)`);
        skipped++;
        continue;
      }

      const text = markdownToText(content);
      if (text.length < 100) {
        console.log(`  [skip] ${slug} (too short: ${text.length} chars)`);
        skipped++;
        continue;
      }

      postsToGenerate.push({ slug, text, outPath });
    }

    // Apply sharding
    const shardPosts = postsToGenerate.filter(
      (_, i) => i % TOTAL_SHARDS === SHARD
    );

    if (TOTAL_SHARDS > 1) {
      console.log(
        `\nShard ${SHARD + 1}/${TOTAL_SHARDS}: ${shardPosts.length} posts to generate (${postsToGenerate.length} total need generation)`
      );
    }

    if (shardPosts.length === 0) {
      console.log(`\nNothing to generate for this shard. Skipped: ${skipped}`);
      return;
    }

    // Pre-cache model so child processes load from disk
    console.log("\nPre-caching Kokoro TTS model...");
    const { KokoroTTS } = await import("kokoro-js");
    await KokoroTTS.from_pretrained(MODEL_ID, { dtype: "q8", device: "cpu" });
    console.log("Model cached.");

    const actual = Math.min(CONCURRENCY, shardPosts.length);
    console.log(`\nGenerating ${shardPosts.length} posts with concurrency ${actual}...\n`);

    const scriptPath = fileURLToPath(import.meta.url);
    let totalGenerated = 0;

    // Process posts with bounded concurrency using a worker pool
    let nextIdx = 0;

    function spawnNext() {
      if (nextIdx >= shardPosts.length) return null;
      const post = shardPosts[nextIdx++];

      return new Promise((resolve, reject) => {
        const child = fork(scriptPath, [], {
          env: {
            ...process.env,
            TTS_CHILD: "1",
            TTS_POST: JSON.stringify(post),
            TTS_VOICE: VOICE,
            TTS_MODEL: MODEL_ID,
          },
          stdio: ["pipe", "inherit", "inherit", "ipc"],
        });

        child.on("message", (msg) => {
          if (msg.type === "progress") {
            console.log(`  [${msg.slug}] chunk ${msg.chunk}/${msg.total}`);
          } else if (msg.type === "done") {
            console.log(`  [${msg.slug}] -> ${msg.outPath} (${msg.sizeMB} MB, ${msg.durationSec}s)`);
            totalGenerated++;
          } else if (msg.type === "error") {
            console.error(`  [${msg.slug}] Error: ${msg.msg}`);
          }
        });

        child.on("error", reject);
        child.on("exit", (code) => {
          if (code !== 0) {
            reject(new Error(`Child for ${post.slug} exited with code ${code}`));
          } else {
            resolve();
          }
        });
      });
    }

    // Run worker pool
    async function runPool() {
      async function worker() {
        while (true) {
          const task = spawnNext();
          if (!task) break;
          await task;
        }
      }
      await Promise.all(Array.from({ length: actual }, () => worker()));
    }

    await runPool();

    console.log(`\nDone! Generated: ${totalGenerated}, Skipped: ${skipped}`);
  }

  main().catch((e) => {
    console.error("Fatal:", e);
    process.exit(1);
  });
}
