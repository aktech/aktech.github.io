#!/usr/bin/env node
/**
 * Generate TTS audio files for blog posts using Kokoro TTS.
 *
 * Modes:
 *   --plan          Output JSON list of posts needing generation (for CI matrix)
 *   --slug <slug>   Generate audio for a single post by slug
 *   (no flags)      Generate all posts that need audio (local dev)
 *   --force         Regenerate even if audio exists and content unchanged
 */

import { readdir, readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, basename } from "node:path";
import { createHash } from "node:crypto";

const CONTENT_DIR = "content/blog";
const OUTPUT_DIR = "static/audio";
const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
const VOICE = "am_eric";
const FORCE = process.argv.includes("--force");
const PLAN = process.argv.includes("--plan");
const LIST_SLUGS = process.argv.includes("--list-slugs");

function getStringArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return null;
}

const SLUG_ARG = getStringArg("--slug");

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
    if (buf && buf.length + part.length + 1 > 500) {
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

/** Scan all posts and return those needing generation */
async function scanPosts() {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  files.sort();

  const needsGeneration = [];
  let skipped = 0;

  for (const file of files) {
    const raw = await readFile(join(CONTENT_DIR, file), "utf-8");
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fmMatch) { skipped++; continue; }

    const frontMatter = fmMatch[1];
    const content = fmMatch[2];
    const slug = getSlug(frontMatter, file);
    const text = markdownToText(content);

    if (text.length < 100) { skipped++; continue; }

    const contentHash = createHash("sha256")
      .update(`v1:${VOICE}:${MODEL_ID}\n${text}`)
      .digest("hex");
    const outPath = join(OUTPUT_DIR, `${slug}.wav`);
    const hashPath = join(OUTPUT_DIR, `${slug}.sha256`);

    if (!FORCE && (await fileExists(outPath)) && (await fileExists(hashPath))) {
      const storedHash = (await readFile(hashPath, "utf-8")).trim();
      if (storedHash === contentHash) { skipped++; continue; }
    }

    needsGeneration.push({ slug, text, outPath, contentHash, hashPath });
  }

  return { needsGeneration, skipped, totalFiles: files.length };
}

/** Generate audio for a single post */
async function generateOne(post) {
  const { slug, text, outPath, contentHash, hashPath } = post;

  const { KokoroTTS } = await import("kokoro-js");
  console.log("Loading Kokoro TTS model...");
  const tts = await KokoroTTS.from_pretrained(MODEL_ID, { dtype: "q8", device: "cpu" });
  console.log("Model loaded.\n");

  console.log(`  [gen] ${slug} (${text.length} chars)`);
  const chunks = splitChunks(text);
  const audioResults = [];

  for (let i = 0; i < chunks.length; i++) {
    process.stdout.write(`\r        chunk ${i + 1}/${chunks.length}`);
    const audio = await tts.generate(chunks[i], { voice: VOICE });
    audioResults.push(audio);
  }
  process.stdout.write("\r        " + " ".repeat(30) + "\r");

  let totalLen = 0;
  for (const a of audioResults) totalLen += a.audio.length;
  const combined = new Float32Array(totalLen);
  let offset = 0;
  for (const a of audioResults) {
    combined.set(a.audio, offset);
    offset += a.audio.length;
  }

  const wav = encodeWAV(combined, audioResults[0].sampling_rate);
  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(outPath, wav);
  await writeFile(hashPath, contentHash);
  const sizeMB = (wav.length / 1024 / 1024).toFixed(1);
  const durationSec = (combined.length / audioResults[0].sampling_rate).toFixed(0);
  console.log(`        -> ${outPath} (${sizeMB} MB, ${durationSec}s)`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const { needsGeneration, skipped, totalFiles } = await scanPosts();

  // --list-slugs mode: output all valid slugs (for downloading from live site)
  if (LIST_SLUGS) {
    const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const raw = await readFile(join(CONTENT_DIR, file), "utf-8");
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!fmMatch) continue;
      const slug = getSlug(fmMatch[1], file);
      const text = markdownToText(fmMatch[2]);
      if (text.length >= 100) console.log(slug);
    }
    return;
  }

  // --plan mode: output JSON for CI matrix and exit
  if (PLAN) {
    const matrix = needsGeneration.map((p) => ({ slug: p.slug }));
    // GitHub Actions needs a non-empty matrix; output empty array if nothing to do
    console.log(JSON.stringify(matrix));
    return;
  }

  // --slug mode: generate a single post
  if (SLUG_ARG) {
    const post = needsGeneration.find((p) => p.slug === SLUG_ARG);
    if (!post) {
      console.log(`Post "${SLUG_ARG}" not found or already up to date.`);
      return;
    }
    await generateOne(post);
    return;
  }

  // Default: generate all needed posts sequentially (local dev)
  console.log(`Found ${totalFiles} blog posts. ${needsGeneration.length} need generation, ${skipped} skipped.\n`);

  if (needsGeneration.length === 0) {
    console.log("Nothing to generate.");
    return;
  }

  const { KokoroTTS } = await import("kokoro-js");
  console.log("Loading Kokoro TTS model...");
  const tts = await KokoroTTS.from_pretrained(MODEL_ID, { dtype: "q8", device: "cpu" });
  console.log("Model loaded.\n");

  let generated = 0;

  for (const { slug, text, outPath, contentHash, hashPath } of needsGeneration) {
    console.log(`  [gen] ${slug} (${text.length} chars)`);
    const chunks = splitChunks(text);
    const audioResults = [];

    for (let i = 0; i < chunks.length; i++) {
      process.stdout.write(`\r        chunk ${i + 1}/${chunks.length}`);
      const audio = await tts.generate(chunks[i], { voice: VOICE });
      audioResults.push(audio);
    }
    process.stdout.write("\r        " + " ".repeat(30) + "\r");

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
    await writeFile(hashPath, contentHash);
    const sizeMB = (wav.length / 1024 / 1024).toFixed(1);
    const durationSec = (combined.length / audioResults[0].sampling_rate).toFixed(0);
    console.log(`        -> ${outPath} (${sizeMB} MB, ${durationSec}s)`);
    generated++;
  }

  console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped}`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
