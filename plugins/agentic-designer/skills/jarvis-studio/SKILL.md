---
name: jarvis-studio
description: Jarvis's end-to-end studio workflow — brief check, 15-line plan, rough hero, Fresh Eyes gate, build, two polish passes, lint, short chat summary — with lanes (Quick, Standard, Explore, Flow, DS Maintenance), stored DS knowledge instead of MCP discovery, screen naming, PM-locked content, checkpoints/resume, time and token budgets, scope discipline, tokens-waived mode for tests without a DS, image policy without paid APIs, specialist routing, and learning from the Manager. Use at the start of every design task.
---

# Jarvis Studio workflow

## 0. Load (once per task, cheap)
`_team/state.md` (resume point, if any) · `PROJECT.md` (if any; missing → `/init`) · `_team/lessons.md` · `_taste/TASTE.md` + the 3
closest taste images (`taste-library`) · **design system from stored knowledge**: your stored DS → `ds-knowledge` (grep only what you need;
**no discovery scripts against the DS file**), other DS → `_ds/<slug>/` from `ds-manifest`. Load Domain/Style Packs and `adaptive-devices` only if relevant.

## 1. Brief check (≤ 1 question)
Need: platform/frame(s) · user goal · must-have content · **Scope** (e.g. "default only") · **PM-locked content** (copy, data,
fields from a PRD/mock — list them in the plan; they are not design choices and are never "fixed" without asking) · feel (3 words) · references ·
Figma target · DS or "no DS". Missing items → assume sensible defaults and state them in the plan; ask the Manager
**one** question only if a wrong guess would waste the build (e.g. platform, scope).

## 2. Plan (≤ 15 lines, ~2 minutes, written to `plans/`)
```
JOB: <user> needs <job> · risk: <what breaks if wrong>
SCOPE: <exactly what is built>          FRAMES: <device(s) × orientation(s)>
FEEL: <3 words> · HERO REF: <taste image / Manager ref> · SIGNATURE: <one ownable idea>
HIERARCHY: hero=<x> · primary=<1 action> · secondaries=<≤3>
DIRECTION(S): <Standard: 1 · Explore: A safe / B strong / C bold — differ on ≥3 of 5 axes>
TYPE/COLOR: <scale + weights · color proportion>   IMAGES: <real | Unsplash | designed placeholders>
ADAPTIVE: <breakpoints/postures + max-width rules> (if more than one frame size)
DATA: <currency, formats, language, realistic samples>   LOCKED: <PM copy/data kept verbatim>
LAYOUT: <template — Mobile App Layout | Dashboard-BO Layout | Iphone Duo Layout | none>   NAMES: <flow.context.state per frame>
```
Start screens from a template layout when the DS has one (recommended). Either way, **name every screen frame by
`rename-screens` grammar while building** (`home.wallet.default`); unusual devices → popup about the device segment.
No Mobbin search by default. Search only for an unfamiliar pattern (max 2 queries).

## 3. Rough hero (≤ 10 minutes)
Build only the hero/signature section at real size with real type and color (rough is fine elsewhere). Screenshot it.
**Fresh Eyes gate:** spawn `fresh-eyes` with the screenshot path(s), `_taste/TASTE.md`, and the lane — nothing else.
PoV < 4 or "slop" → change direction now (cheap), not after the full build.

## 4. Build → 5. Polish → 6. Lint (`designer-build`)
Sections one call each; two polish passes (≤ 5 changes each); `kiki-lint.js` with the right mode
(`TOKENS='waived'` for tests without a DS). Fix every FAIL; report measured numbers, not ticks.

## 7. Final review & summary
Optional final Fresh Eyes on the finished frames (Explore always). Then answer the Manager in ≤ 8 bullets:
✅ what + link · ⭐ signature/why · 📐 adaptive/max-width spec file (if any) · ❓ decisions (≤ 3, with recommendation) · 📚 learned.

## Lanes
| Lane | When | Directions | Fresh Eyes |
|---|---|---|---|
| **Quick** | small change, known pattern | 1 | final only if asked |
| **Standard** | production screen | 1 (2 low-fi ideas in the plan) | rough-hero gate |
| **Explore** | new product/direction, "wow" | 3 built sequentially in this session (parallel forks only if the Manager asks) | gate + final |

| **Flow** | multi-screen journeys, back office, PRD → screens | recipes first (shell, table, form, detail, drawer), then screens; ≤ 3 builders | consistency pass + final |
| **DS Maintenance** | editing components, variants, tokens, brands | options table + test-instance screenshot → Manager picks → build → `D.audit()` | diff mode on the set |

### Flow lane rules
State and screenshot budgets count per flow, not per screen. Connectors and Screen Name labels are allowed in the flow
presentation (`flow-presentation`). After builders finish: **consistency pass** — same components/props for the same job,
same header, table column styles, spacing, labels across screens (script: compare instance props per screen; fix drift).

### DS Maintenance lane rules (`base-designer/references/ds-ops.js`)
1. Restate the request as a scope: which set(s), which variants, which property. **Dry run** (`D.dryRun`) → show the count
   and sample. More targets than asked → ask before touching anything. A preference for one component applies only to it.
2. Behavior/layout changes: build ONE test instance per option (2–3 options), screenshot, let the Manager pick — then apply.
3. Build with `D.cloneVariant` (never plain `clone()`), `D.bindPaint`, `D.byRef` (never name lookups), `D.gridPlace` (never
   left-pack into gutters), chunks of ~60 variants, `D.checkpoint` per chunk (idempotent: re-running skips finished work).
4. After every edit: `D.audit(set)` must be `ok` (no duplicates, ref/slot drift, overlaps). Toggle every exposed prop on a
   test instance and screenshot it. Log the change in `_ds/CHANGELOG.md` with the Manager's words.

## Budgets
≈ 30 `use_figma` calls and ≈ 4 screenshots per screen; target ≤ 60k tokens per frame once recipes exist. Read helpers once per
session; send only the helper functions a call uses. Never re-read a DS you have in stored knowledge.

## State, checkpoints, resume
Keep `_team/state.md` current (≤ 25 lines): task, plan file, frames done (ids), next step, open decisions. Update after every
section or chunk. A dropped run (limit, disconnect, compaction) continues with `/resume` from that file — never from memory.
Parallel work (if requested) ≤ 3 at a time.

## Scope & canvas discipline
Build exactly the Scope. No extra states, frames, or pages unless asked. The canvas holds only the design.

## Tokens-waived mode (tests without a DS)
Create a small local set of color/type/spacing styles or variables first, use them everywhere, and run lint with
`TOKENS='waived'` (binding checks become advisory). Consistency still matters.

## Popups (ask fast, never type-heavy)
Use `AskUserQuestion` for choices with a Recommended default: lane, scope, device segment, prototype target, motion output,
brand questions. One popup with ≤ 4 questions beats several chat turns.

## Images (no paid APIs)
Manager uploads → free Unsplash (`images.unsplash.com`) → DS illustrations → **designed placeholders**
(`visual-assets`). Never grey boxes.

## Learning
Every Manager correction → one line in `_team/lessons.md` (`- [date] rule — because reason`). Every approval or rejection →
one line in `_taste/TASTE.md` under "Verdicts". Apply lessons from the next task on.
