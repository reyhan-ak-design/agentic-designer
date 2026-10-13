#!/bin/sh
# Agentic Designer preflight (SessionStart). POSIX sh only, so it works even when Node.js is missing.
# 1) shows the loaded plugin version, 2) warns once if Node.js is missing (hooks, lint, office, telemetry need it),
# 3) creates the workspace scaffold if missing. Never fails the session.
ROOT="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
WS="${CLAUDE_PROJECT_DIR:-$(pwd)}"
VER=$(sed -n 's/.*"version"[^"]*"\([^"]*\)".*/\1/p' "$ROOT/.claude-plugin/plugin.json" 2>/dev/null | head -n 1)
W="$WS/agentic-designer-work"; CREATED=""
for d in "$W/_team/proposals" "$W/_taste/inbox" "$W/_ds/golden" "$W/_telemetry" "$W/plans" "$W/docs"; do
  [ -d "$d" ] || { mkdir -p "$d" 2>/dev/null && CREATED="yes"; }
done
mk() { [ -f "$1" ] || { printf '%s\n' "$2" > "$1" 2>/dev/null && CREATED="yes"; }; }
mk "$W/_team/lessons.md" "# Lessons (one line per Manager correction: - [date] rule — because reason)"
mk "$W/_team/state.md" "# State (task · plan file · frames done · next step · open decisions)"
mk "$W/_taste/TASTE.md" "# Taste
## House rules
## Favorite moves
## Banned
## Verdicts"
mk "$W/_ds/gaps.md" "# DS gaps (component/token missing · where needed · date) — Desi picks these up"
if command -v node >/dev/null 2>&1; then NODE="ok ($(node -v 2>/dev/null))"; NODEWARN=""; else NODE="MISSING"; NODEWARN=" ⚠ Node.js tidak ditemukan: lint, kantor 3D, telemetri, dan script lain tidak jalan. Install Node.js 18+ (nodejs.org), lalu restart Claude."; fi
MSG="Agentic Designer v${VER:-?} aktif.${NODEWARN}"
[ -n "$CREATED" ] && MSG="$MSG Workspace disiapkan di agentic-designer-work/."
CTX="Agentic Designer v${VER:-?} loaded · node: $NODE · workspace: agentic-designer-work/ (scaffold ok). Hard steps this session: every plan has a LANE line; Standard/Explore need plans/<task>.fresh-eyes.md before the full build; every final summary ends with 'Gate:' and 'Lessons appended: n'."
esc() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }
printf '{"systemMessage":"%s","hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}\n' "$(esc "$MSG")" "$(esc "$CTX")"
exit 0
