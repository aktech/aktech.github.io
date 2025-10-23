# Personal Blog and Webpage

**Website:** https://iamit.in
**Blog:** https://iamit.in/blog

Built with [Hugo](https://gohugo.io/) and deployed via GitHub Actions to GitHub Pages.

## Quick Start

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (v0.152.0 or later, extended version)
- [htmltest](https://github.com/wjdp/htmltest) (optional, for link checking)

### Local Development

```bash
# Serve the site locally with live reload
hugo server

# Open http://localhost:1313 in your browser
```

### Building

```bash
# Build the site (outputs to public/)
./build.sh

# Or manually:
hugo --gc --minify
cp public/index.xml public/atom.xml
```

### Testing

```bash
# Check for broken links
htmltest
```

## Writing a New Post

1. Create a new markdown file in `content/blog/`:
   ```bash
   # Format: YYYY-MM-DD-Title.md
   touch "content/blog/$(date +%Y-%m-%d)-My-New-Post.md"
   ```

2. Add front matter:
   ```yaml
   ---
   date: "2024-01-15"
   title: My New Post
   tags:
     - Tag1
     - Tag2
   url: /blog/my-new-post/
   ---
   ```

3. Write your content in Markdown

4. Preview locally:
   ```bash
   hugo server -D  # -D includes drafts
   ```

5. Commit and push - GitHub Actions will automatically deploy

## Project Structure

```
├── content/           # Markdown content
│   ├── blog/         # Blog posts
│   ├── about.md      # About page
│   ├── talks.md      # Talks page
│   └── publications.md
├── layouts/          # Hugo templates
├── static/           # Static assets (images, CSS, JS)
├── hugo.toml         # Hugo configuration
└── .github/workflows/
    ├── hugo.yml      # Deployment workflow
    └── pr-check.yml  # PR validation workflow
```

## Deployment

The site automatically deploys via GitHub Actions when you push to `main`:

1. Build with Hugo
2. Run htmltest for link validation
3. Deploy to GitHub Pages

## RSS Feeds

- All Posts: https://iamit.in/index.xml
- Atom Feed: https://iamit.in/atom.xml

## License

See [LICENSE](LICENSE)
