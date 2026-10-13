# Sari nightly setup (Windows) — runs automatically at 00:00

1. **Test once by hand** (any time): open PowerShell in `D:\design-workspace` and run
   `powershell -ExecutionPolicy Bypass -File "D:\agentic-designer-marketplace\plugins\agentic-designer\tools\sari-nightly.ps1"`.
   Outside 00:00–03:59 the script only writes "Skipped" — to test, temporarily run `claude -p "..." --agent agentic-designer:sari`
   yourself, or run the script right after midnight once. If Mobbin/web tools ask for permission, run `claude`
   interactively once in the workspace and approve them.
2. **Schedule** — Task Scheduler → *Create Task* (not Basic):
   - General: name `Agentic Designer — Sari`; *Run whether user is logged on or not* (optional).
   - Triggers → New: **Daily, start 00:00:00**, recur every 1 day.
   - Actions → New: Program `powershell.exe`, Arguments
     `-ExecutionPolicy Bypass -File "D:\agentic-designer-marketplace\plugins\agentic-designer\tools\sari-nightly.ps1"`
   - Conditions: tick **Wake the computer to run this task**; untick "Start only if on AC power" if you want it on battery.
   - Settings: **untick "Run task as soon as possible after a scheduled start is missed"** (so it never starts in the morning);
     tick **Stop the task if it runs longer than 4 hours**.
3. The laptop must be on or asleep (not shut down) and online at 00:00.
4. Results appear in `D:\design-workspace\knowledge\` (pattern notes, proposals, log).
