#!/bin/sh
# Agentic Designer office (macOS). Double-click, then type your design workspace path. Needs Node 18+.
DIR="$(cd "$(dirname "$0")" && pwd)"
printf "Path workspace: "; read WS
node "$DIR/bin/office.mjs" start --project "$WS" --open
