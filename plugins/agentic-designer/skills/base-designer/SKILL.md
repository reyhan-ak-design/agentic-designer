---
name: base-designer
description: Team mechanics for Agentic Designer design work — work lanes (Quick/Standard/Explore/Flow/DS Maintenance — defined in jarvis-studio), brief and plan formats, handoff format, file locations, the designer's own build-and-polish loop, and the English-internal working language. Used by designers (plan, build, polish), and Pram (brief format). Use whenever a design task is planned, built, handed off, or revised.
---

# Base Designer — team mechanics

How to think is in `senior-design-craft`; how to lay out is in `layout-and-spacing` and `visual-craft`.
This file only covers mechanics. **Work, files, and agent-to-agent messages are in English.**
UI copy follows the product language; Jarvis talks to the Manager in the Manager's language.

## Lanes
Lanes, budgets, and the gate are defined in `jarvis-studio` (Quick · Standard · Explore). Jarvis plans, builds, and
polishes; Fresh Eyes gates the rough hero.

## Files
`agentic-designer-work/<project>/` → `PROJECT.md`, `briefs/`, `plans/`, `handoffs/`, `reports/`, `docs/`, `research/`, `motion/`, `localization/`.

## Brief → Plan → Build → Handoff
- **Brief:** `references/brief-format.md`. Missing must-have (platform/frame, user goal, must-have content,
  Figma target) → one question to Jarvis, then stop.
- **Plan (text):** `references/plan-format.md` — job, priority guide, direction (feel words, hero reference, mood board,
  signature moment, art direction), emphasis, spacing map, options, states, key copy, DS suggestions, and a **Build Spec**
  (`references/build-spec.md`) using only DS-manifest IDs, a template shell, and a golden screen. The rough hero then passes the Fresh Eyes gate.
- **Build + polish (same designer):** `designer-build` — shell, one section per call with `references/helpers.js`,
  real imagery (`visual-assets`), states, `kiki-lint.js`, then two screenshot-driven polish passes. **No notes on the canvas.**
- **Handoff:**
```
HANDOFF — <Screen> — <agent>
Figma: <page link> · Frames: <ids>
Built: <states> · Compositions: <names>
QA (kiki-lint): PASS | <remaining failures + justification>
Deviations from plan: none | <list>
Open questions: none | <list>
```

## Choosing between options
Score 1–3 on task speed, hierarchy, DS fit, accessibility, domain fit; pick the highest total (ties → speed).
Options must be different strategies from the same priority guide, never color/spacing variants.

## Design system inputs (never re-discover)
Read `agentic-designer-work/_ds/<ds>/manifest.json`, `DESIGN.md`, and `golden.md` (built by Desi, see
`ds-manifest`). If a manifest is missing or its library hash is stale, stop and ask Jarvis for Desi first.

## Canvas = design only
Nobody writes notes, annotations, explanation text, review pages, or DS-gap sections in Figma. All reasoning
goes into plan/handoff files; Jarvis gives the Manager a short chat summary.

## Always
Realistic data from the Domain Pack · DS instances and variables only · auto layout everywhere ·
never touch the DS library or other pages · stop when the ship bar is met.
