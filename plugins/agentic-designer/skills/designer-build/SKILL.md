---
name: designer-build
description: How a domain designer builds their OWN design in Figma end to end and then polishes it by looking at it — preflight, DS Manifest keys only, template shell, one use_figma call per section with the shared helpers, real imagery, the lint lint, then two screenshot-driven polish passes (max 5 visual changes each), within a tool-call budget, with zero notes on the canvas. Use for every build, polish, or fix run.
---

# Designer build & polish loop

The person who designs is the person who builds — and looks at the result before anyone else does.

## Budget (per screen)
≈ 30 `use_figma` calls · 4 screenshots for yourself (maxDimension 1024) · at most 3 builds run in parallel team-wide.
If you hit the budget, stop and hand off what you have with a one-line note to Jarvis (chat/file, never canvas).

## 1. Build
1. **Preflight (one call):** file/page, manifest version (`_ds/<ds>/manifest.json`), fonts, every key your plan needs.
   Missing key → stop and ask Jarvis (Desi adds it). Never search the library blindly.
2. **Shell (one call):** clone the template shell as the wrapper frame.
3. **Sections (one call each):** prepend `base-designer/references/helpers.js` unchanged, paste only the manifest subset as `M`,
   `H.preload(...)` in parallel, build inside the wrapper, return `{ createdNodeIds, errors }` only.
   Build the **hero/signature section first and best** — that is where the screen is won.
4. **Imagery:** place real assets per `visual-assets` (never grey placeholder boxes in anything you hand off).
5. **States:** clone the finished default for each budgeted state; change only what differs.
6. **Lint:** run `design-master-checklist/references/kiki-lint.js` on your frames; fix every FAIL.
   Explore lane: lint layout items are warnings; accessibility and token binding still block.

## 2. Polish (the step that makes it good)
Two passes. Each pass: one screenshot of the default frame → compare against your hero reference and the golden screen →
write (for yourself, in the handoff file) the **3–5 visual changes** that most raise quality (type scale contrast, hero size,
color proportion, rhythm, image crop, the signature moment) → apply them in 1–2 calls. Never more than 5 changes per pass;
stop early if nothing meaningful is left.

## 3. Handoff (chat/file only)
Frame ids · lint verdict · what you changed in polish · signature moment · assets used (source + license) · open questions.
**The canvas holds only the design — no notes, labels, annotations, spec frames, or DS-gap sections.**

## Rules
Every value from the manifest (variables/styles/components) — including in Explore. Need a new token → propose to Desi,
use the closest token meanwhile. Read order: manifest → targeted script → `get_metadata` → `get_design_context` on one node → screenshot.
Read `base-designer/references/gotchas.md` and `ds-manifest/references/slot-method.md` before the first write; tell Jarvis about new failures.
