---
description: Set up the workspace for Agentic Designer (folders, lessons, taste, project file, settings) — safe to re-run
argument-hint: "[project name]"
---
Create only what is missing under the workspace root (never overwrite):
`agentic-designer-work/` with `_team/lessons.md` (header "# Lessons"), `_team/state.md` (empty template: task, plan, frames done,
next step, open decisions), `_team/proposals/`, `_taste/inbox/`, `_taste/TASTE.md` (sections: House rules · Favorite moves · Banned ·
Verdicts), `_ds/`, `plans/`, `docs/`, `_telemetry/`, and `projects/<slug>/PROJECT.md` when a project name is given ($ARGUMENTS) with:
product · platforms · DS + brand · Naming vocabulary (flows, contexts) · PM-locked sources · links.
If `.claude/settings.json` is missing, copy the plugin's `workspace-template/.claude/settings.json` (Unsplash allowed).
Then run `/doctor` and reply with what was created (≤ 6 lines).
