#!/bin/bash

# Build script for Hugo site
set -e

echo "Building Hugo site..."
hugo --gc --minify

echo "Creating atom.xml from index.xml..."
cp public/index.xml public/atom.xml

echo "✓ Build complete!"
echo ""
echo "To check for broken links, run: htmltest"
echo "To serve locally, run: hugo server"
