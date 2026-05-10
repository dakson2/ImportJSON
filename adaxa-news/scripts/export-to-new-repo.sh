#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-../adaxa-news}"
REPO_URL="${2:-https://github.com/dakson2/adaxa-news.git}"
BRANCH="${3:-main}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

mkdir -p "$TARGET_DIR"

rsync -av --delete \
  --exclude='.git' \
  --exclude='vendor' \
  --exclude='data/*.json' \
  "$SOURCE_DIR/" "$TARGET_DIR/"

echo "Export complete to: $TARGET_DIR"

cd "$TARGET_DIR"

if [ ! -d .git ]; then
  git init
fi

git add .

if ! git diff --cached --quiet; then
  git commit -m "Initial Adaxa News skeleton"
else
  echo "No changes to commit."
fi

git branch -M "$BRANCH"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

if [ -n "${GITHUB_TOKEN:-}" ]; then
  AUTH_URL="${REPO_URL/https:\/\//https:\/\/${GITHUB_TOKEN}@}"
  git remote set-url origin "$AUTH_URL"
  echo "Using GITHUB_TOKEN authentication for push."
fi

if [ -n "${SSH_AUTH_SOCK:-}" ] && [[ "$REPO_URL" == git@* ]]; then
  echo "SSH agent detected; pushing via SSH remote."
fi

set +e
git push -u origin "$BRANCH"
PUSH_STATUS=$?
set -e

if [ $PUSH_STATUS -ne 0 ]; then
  echo
  echo "Push failed. Please verify network access and credentials."
  echo "You can retry manually with:"
  echo "  git push -u origin $BRANCH"
  exit $PUSH_STATUS
fi

echo "Repository prepared and pushed to $REPO_URL ($BRANCH)."
