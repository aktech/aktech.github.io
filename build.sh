#!/bin/bash

# Build script for Hugo site
set -e

# Get git commit hash and create data file
mkdir -p data
GIT_COMMIT_HASH=$(git rev-parse --short HEAD)
GIT_COMMIT_HASH_FULL=$(git rev-parse HEAD)
cat > data/git.json <<EOF
{
  "hash": "$GIT_COMMIT_HASH",
  "hashFull": "$GIT_COMMIT_HASH_FULL"
}
EOF

echo "Building Hugo site (commit: $GIT_COMMIT_HASH)..."
hugo --gc --minify

echo "Creating atom.xml from index.xml..."
cp public/index.xml public/atom.xml

echo "✓ Build complete!"
echo ""
echo "To check for broken links, run: htmltest"
echo "To serve locally, run: hugo server"
