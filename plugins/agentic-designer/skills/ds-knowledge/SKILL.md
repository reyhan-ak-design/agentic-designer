---
name: ds-knowledge
description: Your design system, read once and stored — resolved token values per brand × Light/Dark, component sizes and radii, fonts — so agents never re-query the DS through MCP. Ships with a small fictional demo DS (brands "Base" and "Nimbus"); run /add-ds to store your own Figma design system. Use for any work that uses a DS, new brands, prototypes, and handoff specs.
---

# DS knowledge (read, don't re-query)

| Need | Read |
|---|---|
| Your DS (after `/add-ds`) | `agentic-designer-work/_ds/<slug>/ds-resolved.json` + `_ds/<slug>/DESIGN.md` + `manifest.json` (component keys) |
| Demo DS (until you add yours) | `data/ds-resolved.json` (fictional: Base, Nimbus) |
| Format of the stored data | `references/format.md` |

Rules: no discovery scripts against the DS file — import by key from the manifest; a key that fails to import or a DS change
→ `/add-ds <slug>` again (only the changed part). Bind semantic tokens and text/effect styles only.
