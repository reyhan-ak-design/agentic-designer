---
name: office
description: Start, stop, or check the Agentic Designer 3D office — a live three.js studio (http://127.0.0.1:4317) where Jarvis works at his desk and each specialist (Fresh Eyes, Pandu, Desi, Pram, Wulan, Dev, Sari) walks to work, grabs skills from the library, hands off, and naps at night. Streams the plugin's own activity log, read-only. Use when the Manager asks to open/turn on/turn off the office, kantor, studio view, or agent dashboard.
argument-hint: "[start|stop|status|restart] [--port N]"
---

Runtime: `${CLAUDE_SKILL_DIR}/../../office/` (our own code; three.js from CDN). Run from the **workspace root**.

1. Run `node "${CLAUDE_SKILL_DIR}/../../office/bin/office.mjs" <start|stop|status|restart> --project "<workspace root>" [--port N] --open`
   (`--open` only with start/restart). Windows, macOS, Linux; Node ≥ 18.
2. Report in Indonesian, ≤ 3 lines: the `URL :` line and how to stop (`/agentic-designer:office stop`). If it prints
   `Catatan : belum ada aktivitas…`, say the office fills up once Claude Code is used in this folder.
3. Autostart (optional): `<workspace>/.claude/agentic-office.json` → `{"autostart": true}`, or an empty file `~/.agentic-office-autostart`.
4. Phone on the same Wi-Fi only if the Manager asks: env `OFFICE_BIND=0.0.0.0` + restart; warn that anyone on that network can see activity.

Controls: WASD move · Q/E rotate · drag/right-drag · scroll zoom · F walk mode · L labels · H panel.
Rules: read-only; never expose the office publicly without the Manager's explicit yes.
