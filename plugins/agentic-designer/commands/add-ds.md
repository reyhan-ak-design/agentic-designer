---
description: Store your Figma design system once (tokens per brand × theme, sizes, fonts, component keys) so agents stop re-reading it
argument-hint: <figma link> [slug]
---
Read-only in the DS file. 1) `ds-manifest` → components/styles/variables keys + DESIGN.md into `agentic-designer-work/_ds/<slug>/`.
2) `ds-manifest/scripts/export-resolved.js` one brand per call (set the brand/semantic collection prefixes; ask with a popup if the
DS has no brand collection) → merge into `_ds/<slug>/ds-resolved.json` (format: `ds-knowledge/references/format.md`). Truncated = error.
3) Record the slug as the default DS in `PROJECT.md`. Reply with brands, token counts, and components stored (≤ 5 lines).
