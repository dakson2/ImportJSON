#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-../adaxa-news}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

mkdir -p "$TARGET_DIR"

rsync -av --delete \
  --exclude='.git' \
  --exclude='vendor' \
  --exclude='data/*.json' \
  "$SOURCE_DIR/" "$TARGET_DIR/"

echo "Export complete to: $TARGET_DIR"
echo "Next steps:"
echo "  cd $TARGET_DIR"
echo "  git init"
echo "  git add ."
echo "  git commit -m 'Initial Adaxa News skeleton'"
echo "  git branch -M main"
echo "  git remote add origin https://github.com/dakson2/adaxa-news.git"
echo "  git push -u origin main"
