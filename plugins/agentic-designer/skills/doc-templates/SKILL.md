---
name: doc-templates
description: The Manager's document formats in Markdown — PRD (product requirements, 22 sections with Document Information, Approval Page, Version History, journeys, rules, acceptance criteria, API needs, open items) and Change Summary (design-system or product change report: Document Information, Version History, Summary, Changes at a Glance, Rules, Variables/Tokens, Styles, Components, Cleanup, Impact). Use whenever asked for a PRD, ringkasan, summary, change log report, or "dalam md".
---

# Document templates

| Asked for | Template | Notes |
|---|---|---|
| PRD, requirements, "bikin PRD" | `references/prd-template.md` | Pram writes it; Jarvis fills section 18 (Mockup) and 17 (UI/UX) |
| Ringkasan perubahan, change summary, DS changelog report | `references/change-summary-template.md` | `/summary` builds it from `_ds/CHANGELOG.md` / `_team/` logs |

Rules: keep every section heading and table in the template order; write "To be confirmed" instead of inventing names, dates,
or numbers; tables over prose for rules and criteria; IDs are stable (`REQ-01`, `BR-01`, `ERR-01`); the document language follows
the request (default English for PRDs, Indonesian replies in chat). Save to `agentic-designer-work/docs/<doc-number>-<slug>.md`.
