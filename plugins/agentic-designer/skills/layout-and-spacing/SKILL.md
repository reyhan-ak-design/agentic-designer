---
name: layout-and-spacing
description: Measurable visual-hierarchy, spacing, typography-role, density, and keyboard-up rules for mobile (iOS/Android), web forms, and back-office dashboards, mapped to the design system tokens. Every designer applies these while laying out; the lint checks the [M] rules; Jarvis judges the [J] rules. Use whenever a screen is laid out, spaced, reviewed for hierarchy, readability, whitespace, density, cramped layouts, keyboard states, tables, dashboards, or forms.
---

# Layout & Spacing — the rules that separate shipped products from AI slop

The failure these rules prevent: content laid out before it is **ranked**, so every group
gets the same gap, critical data ends up as caption text, decoration outranks information,
and keyboard states cram everything. Rank first (see `senior-design-craft`), then apply this.

Token note (Global DS): spacing tokens are `number/Spacing/{0,2,4,8,12,16,20,24,32,36,40,48,56,64,80,96,120,160}`
in `03 Semantic`. Text styles: Display L/M/S 56/48/40 · H1–H6 32/28/24/20/18/16 ·
Body L/M/S 16/14/12 · Caption L/S 12/10 · Button L/M/S 16/14/12. Bind to these; never raw values.

## 1. Spacing by relationship — ranges, not one number
Spacing expresses how strongly two things belong together. Pick each gap from the token scale
(4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64) according to the relationship, not a default.

| Tier | Relationship | Mobile range | Web / dashboard range |
|---|---|---|---|
| **T0** inside an element | icon↔label, label↔value of one datum | 2–8 | 4–8 |
| **T1** within a group | siblings of one group (rows, fields) | 8–16 | 8–16 |
| **T2** between groups | group↔group inside a section/card | 20–32 | 16–32 |
| **T3** between sections | section↔section, header↔content | 32–48 | 32–64 |

**Nesting rule** (adapted from rad-spacing): each outer level gets ≈ 1.4–2× the spacing of the level
inside it, snapped to the token scale. Work from the innermost level outward.

**Spacing map (required in every plan):** list each adjacency that matters with its tier, value, and
one-word reason, e.g. `Recipient card → Amount: T2 24 (different decision)`,
`Amount → balance line: T0 4 (same datum)`. Two adjacent gaps with the same value must be the same relationship.

- **SP1 [M]** Every padding/gap/margin is bound to a `number/Spacing/*` token.
- **SP2 [M]** T2 ≥ 2 × T1 on the same screen; T3 ≥ 1.5 × T2.
- **SP3 [M]** A label sits closer to its own value than to the previous group.
- **SP4 [M]** Padding shrinks with nesting depth (outer ≥ inner).
- **SP5 [J]** Grouping tool chosen per `visual-craft` §1: whitespace for static related content;
  **cards/surfaces for groups of interactive rows and summaries**; dividers only in lists/tables.
- **SP6 [M]** Mobile screen margin 16 (20–24 only for marketing-like surfaces); card padding 16.
- **SP7 [J] Start loose, tighten with a reason.** Draft at the upper end of each range; tighten only when a stated constraint requires it.
- **SP8 [J]** No monotony: if more than half the gaps on a screen share one value, the relationships were not decided.

## 2. Type roles and floors

| Role | Mobile (Global DS) | Web app | Dense dashboard |
|---|---|---|---|
| **Hero** (balance, amount, total, KPI) | H1 32 – Display S 40, Semibold/Bold | 28–40 | 24–32 |
| **Primary** (the fact the user came for) | Body L 16 or H6/H5, **Semibold** | 16 | 14 Semibold |
| **Secondary** | Body M 14 | 14 | 12–14 |
| **Meta** (timestamp, ID, helper) | Body S / Caption L 12 | 12–13 | 12 |
| **Never for meaningful content** | Caption S 10 | — | — |

- **TY1 [M]** Any layer named with `[critical]` uses at least the Primary role (≥16 mobile/web, ≥14 dashboard) and at least Semibold/Medium weight. Source of funds, recipient, amount, fee, total, due date, and money status are always `[critical]`.
- **TY2 [M]** ≤ 4 font sizes and ≤ 3 weights per screen (system bars and keyboards excluded).
- **TY3 [M]** Line-height from the DS text style (≈1.4–1.5 body); paragraphs separated by ≥ T1.
- **TY4 [M]** Body line length ≤ 75 characters on web.
- **TY5 [M]** Contrast ≥ 4.5:1 for text < 18.66px bold / 24px regular; ≥ 3:1 for larger text.
- **TY6 [M] Grey budget:** ≤ 40% of text nodes use `text/secondary` or `text/tertiary`. Exceeding it means the structure is wrong, not the color.
- **TY7 [M]** Caption S (10) never used except legal footnotes explicitly marked `[copy: legal]`.

## 3. Emphasis budget (per view)

- **1 hero** — answers "what is this screen about?"
- **1 primary action** — the only filled primary button.
- **≤ 3 secondary emphases** — section titles, key secondary figures.
- Everything else neutral.

- **EM1 [M]** Chip/tag/badge text size ≤ Primary size; chip fill is never the highest-saturation element unless it IS the primary status.
- **EM2 [M]** Exactly one filled primary button per view.
- **EM3 [J]** Decoration (chips, promos, pills, illustrations) never outranks primary info in the blur test.
- **EM4 [J]** "Labels are a last resort": prefer self-describing data ("Saldo Rp2.450.750" as one datum) over label + value pairs everywhere.

## 4. Clipping, scrolling, density

- **CL1 [M]** Any clipped overflow shows a scroll affordance: the next item peeks 15–30%, a fade, or a page indicator. Silent clipping is severity 3.
- **DN1 [J]** No compact density on focused tasks (transfer, pay, PIN, date pick, dialogs, snackbars).
- **DN2 [J]** Density is a deliberate mode: Focused (comfortable), Form, or Operate (dashboard). State it in the plan.
- **TT1 [M]** Touch targets ≥ 44×44 (iOS) / 48×48 (Android); spacing between adjacent targets ≥ 8.

## 5. Keyboard-up layout (its own frame, never an accident)

Keep visible, in order: (1) focused field + label + its error, (2) primary action pinned above
the keyboard, (3) one compact line of decision-critical context (e.g. "Dari Tabungan Utama ••8821 ·
Saldo Rp2.450.750"). Collapse large titles, illustrations, explanations, and summaries
(collapsed-but-accessible, not deleted). Everything else scrolls; nothing shrinks.

- **KB1 [M]** In keyboard-up frames: focused field, CTA, and `[critical]` context sit within the
  visible area (frame height − keyboard height − status bar); no text below its role floor.
- **KB2 [J]** Use the numeric keypad for amounts; the keyboard is part of the frame.

## 6. Platform specifics

See `references/platform-density.md` for web form widths, grids, and dashboard/table numbers.
Load it only for Web or BO/dashboard briefs.

## Quick self-test before handoff

1. Squint (or view the frame at 25%): are the first 3 things you see = your top 3 in the priority guide?
2. Count gaps: can you name the tier of every gap?
3. Count text styles and grey texts: within budget?
4. Is any `[critical]` item smaller than Primary?
5. Open the keyboard-up frame: is the CTA visible and nothing shrunk?
