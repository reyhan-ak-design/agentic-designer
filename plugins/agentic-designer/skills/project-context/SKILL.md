---
name: project-context
description: How the team keeps and uses persistent project memory — PROJECT.md (audience, platform, brand mode, style, decisions, local components), lessons.md (rules learned from Manager feedback), taste-profile.md (what the Manager approves/rejects and why), and the knowledge/patterns library from Sari. Jarvis loads and updates these; other agents receive only the relevant lines. Use at the start of every task, whenever the Manager gives feedback, approves, or rejects work, and when a new project starts.
---

# Project Context & Learning Memory

## Files (in the workspace)
```
agentic-designer-work/
  _team/lessons.md          ← global rules learned from feedback (all projects)
  _team/taste-profile.md    ← Manager's approvals/rejections with reasons
  <project>/PROJECT.md      ← per-project context
  <project>/lessons.md      ← project-specific rules
knowledge/patterns/*.md     ← Sari's pattern library (see learning-loop)
```

## PROJECT.md (create on first task; ≤ 60 lines)
Client/product · audience · platforms + frame sizes · DS file + brand mode · Style Pack · Domain Pack ·
key decisions (with date) · local components built · copy language/tone · open questions.

## Using memory (cheap)
- Jarvis reads PROJECT.md, both lessons files, and taste-profile at task start, then passes **only the
  relevant lines** into each brief. Agents do not re-read the files themselves.
- Designers check `knowledge/patterns/` for an existing pattern note before any Mobbin search.

## Learning from the Manager
- Every correction the Manager gives → Jarvis writes a candidate rule in the matching lessons file:
  `- [date] <rule> — because <reason> (source: <task>)`.
- Additive, clearly-scoped rules (a new do/don't, a preference) apply immediately and are listed in
  Jarvis's next report under "Learned". Rules that change a core standard (checklist thresholds, agent
  roles, skill rules) are proposed in the report and applied only after the Manager says yes.
- Every pass → one line in taste-profile ("approved: <what> — liked <why>" if a reason is given).
  Every rejection → one line with the reason. Designers read the top 10 most recent lines.
- Merge duplicates; keep each file under ~100 lines by summarizing older entries.
