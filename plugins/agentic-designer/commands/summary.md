---
description: Write a change summary (or PRD) in the team's Markdown format from the logs of this work
argument-hint: "[change|prd] [title or period]"
---
Use the `doc-templates` skill. Default = change summary from `agentic-designer-work/_ds/CHANGELOG.md` and `_team/` logs for the
period in $ARGUMENTS (popup with `AskUserQuestion` if unclear: "Dokumen apa?" → Change Summary (Recommended) · PRD).
Fill only what the logs and the Manager's words support; "To be confirmed" for the rest. Save under `agentic-designer-work/docs/`
and reply with the path + 3-line summary.
