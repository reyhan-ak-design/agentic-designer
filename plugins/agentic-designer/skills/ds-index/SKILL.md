---
name: ds-index
description: The design system index for Agentic Designer — a compact, pre-built map of the linked design system's variable collections, brand modes, Brand Settings variable names, and components (with keys, variants, and when to use each). Designers and Desi read this before any Figma search to save tokens. Also explains how Desi refreshes the index. Use whenever a designer needs to pick components or tokens, whenever Desi works on brand settings, or when someone asks what the design system contains.
---

# DS Index

Read the index file for the project's design system **before** calling any Figma search.
Only search Figma for things the index does not cover.

| Design system | Index file | Figma file key |
|---|---|---|
| Any other DS the Manager links | `agentic-designer-work/_ds/index/<ds-slug>.md` (built by Desi) | from the link |

Which DS a project uses is recorded in its `PROJECT.md`. If a project names a DS that has no index yet,
ask Desi to build one before designing.

## Using it
- Pick components by the **Use when** column. Import by component key.
- Choose variants by the listed properties; do not restyle instances by hand.
- Tokens: use `03 Semantic` variables in designs. Brand differences come from the active
  Brand Settings mode — designers never bind to Brand Settings or Primitive directly
  unless a Semantic token does not exist (then flag it as a DS gap).

## Indexing a new DS from a link (Desi only)
1. Read-only audit in as few calls as possible: pages, variable collections + modes + variable name
   groups (and value patterns: raw vs alias), text/effect/color styles, top-level components/component
   sets with keys, variant properties, and descriptions; skip icon pages (note the icon set names).
2. Identify the **theming mechanism** (brand collection with modes, light/dark only, style swapping, or none).
3. Write `_ds/index/<ds-slug>.md` in the same format as the Global DS index (≤ 250 lines), plus a
   "Theming" section explaining how a new brand/mode would be added in this DS.
4. Record it in the project's `PROJECT.md`.

## Refreshing (Desi only)
Refresh when components are added, a brand mode is created, or the index is older than the
library's last publish. Use one read-only script that walks each page (`page.loadAsync()`),
collects top-level `COMPONENT_SET` and standalone `COMPONENT` nodes (skip names starting with
`.` or `_`, skip icon pages), and variable collections with their modes. Rewrite the index file
in the same format. Keep it under ~250 lines.
