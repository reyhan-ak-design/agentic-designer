---
name: ds-manifest
description: Desi's per-design-system machine-readable manifest (component, variable, and style keys with variants and property keys, fonts, library keys) plus a DESIGN.md (tokens + rationale + do's and don'ts), template shells, and golden screens — built once per DS and reused by every agent so nobody re-discovers the library. Use when a new DS link arrives, when a library version changes, when a key is missing, or to add a golden screen or shell.
---

# DS Manifest (Desi)

Consistency comes from every run starting from the same parts. Build once, reuse always.

## Files (workspace)
```
agentic-designer-work/_ds/
  manifest/<ds-slug>.json      ← keys only, compact (from scripts/manifest-extract.js)
  <ds-slug>.DESIGN.md          ← tokens (YAML) + prose rules + Don'ts (references/design-md-template.md)
  shells.md                    ← template shell component keys per platform
  golden/<ds-slug>.md          ← golden screens: node ids + "why this is good" (3–6 per platform)
```

## Build the manifest (read-only, few calls)
1. Run `scripts/manifest-extract.js` with `SECTION='summary'` → collections, modes, counts, pages.
2. `SECTION='styles'` once; `SECTION='variables'` and `'components'` paged (`OFFSET += LIMIT` until `done`).
   Primitives are skipped by default; screens use semantic/brand tokens.
3. Write `manifest/<ds>.json`:
   `{ "version": "<date>", "font": "<family>", "libraryKeys": [...], "components": {...}, "variables": {...}, "textStyles": {...}, "effectStyles": {...} }`
   Add a `hash` (component count + variable count + date) and bump `version` when the library changes.
4. Discovery order for anything missing later: Code Connect → instances used on existing screens → `search_design_system`
   scoped with `includeLibraryKeys` (one intent per query). Add what you find to the manifest.

## DESIGN.md
Fill `references/design-md-template.md` from the manifest and the DS docs. The **Don'ts** section grows from real bad
generations (Sari proposes, Jarvis approves). Keep it ≤ 200 lines. Validate with `npx @google/design.md lint` if available
(format is alpha — optional).

## Template shells (per platform)
Create (after Manager approval — it writes to a page) one page of shell frames/components bound to tokens:
Mobile app (fintech) 375/390 · Web back-office 1440 (12-col grid, sidebar, header, content slots) · Modal/drawer ·
Form/settings page · Empty/error state. Record their keys in `shells.md`. Designers clone shells instead of drawing frames.

## Golden screens
3–6 human-approved screens per platform (dashboard overview, dense table, detail, form, mobile home, transfer/confirm).
Store node id + one paragraph on why each is good. Jarvis compares new work against the matching one.

## Slots, exact property names, layout recipes
Record property keys verbatim (including `➜ ` prefixes and `#id` suffixes) and point designers to
`references/slot-method.md` — slot filling, mode ids on wrappers, and the dashboard/mobile/grid layout recipes.

## Golden screens (Manager's taste target)
The Manager may pick golden screens from anywhere (our files, Mobbin, Dribbble, screenshots). Store them in
`_ds/<ds>/golden/` (image or node link) with 2–3 lines on what makes each excellent. Without golden screens the
pairwise step cannot run — ask the Manager for 3–6 before the first Explore task.

## Hygiene (improves search and lint)
Hide primitives from publishing, scope variables to property types (never ALL_SCOPES), semantic layer names.
Propose these to the Manager as DS changes; never apply silently.
