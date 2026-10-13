# Mechanical checklist ([M]) — the lint / lint scope

Checked by `kiki-lint.js`; designers fix what it reports.


## C. Layout & spacing
- C-01 [M][Major] — All spacing values come from the DS spacing scale (default 4/8pt); no off-scale values like 13 or 22.
- C-02 [M][Major] — Horizontal screen margins are consistent (default 16 mobile, per DS if defined).
- C-03 [M][Blocker] — No hardcoded color, radius, or spacing where a DS variable exists.
- C-04 [M][Major] — Every container uses auto layout; absolute positioning only for intentional overlays (badges, FABs, sheets).
- C-05 [M][Blocker] — Content respects platform safe areas (status bar, home indicator, notches).
- C-06 [M][Minor] — Elements align to a shared edge or center line; no 1–2px misalignments.

## D. Typography
- D-01 [M][Blocker] — Only DS text styles are used; no local font sizes or weights.
- D-02 [M][Major] — Max 4 distinct text styles on one screen (excluding system bars).
- D-03 [M][Major] — Monetary and numeric values use tabular figures and a consistent format.

## E. Color
- E-01 [M][Blocker] — All colors are DS variables (semantic tokens preferred over primitives).
- E-03 [M][Major] — Semantic colors are used correctly: error = danger token, success = success token, etc.
- E-05 [M][Major] — Dark mode tokens resolve correctly if the DS has a dark mode and the brief requires it.

## F. Design system compliance
- F-01 [M][Blocker] — Components are instances from the linked DS library, not redrawn copies.
- F-02 [M][Major] — Instances are not detached. Any detach is listed with a reason.
- F-03 [M][Major] — Component variants and properties are used as designed (no overriding a variant's look by hand).
- F-04 [M][Major] — Missing components are escalated to Jarvis/Desi; no local stand-ins without approval (then on page `_Local components`).
- F-05 [M][Major] — One icon set per screen (the DS contains more than one — do not mix them).

## G. States & edge cases
- G-01 [M][Blocker] — Every state requested in the brief exists as its own frame.

## J. Accessibility (WCAG 2.1 AA minimum)
- J-01 [M][Blocker] — Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 18.66px bold / 24px regular).
- J-02 [M][Blocker] — UI component and icon contrast ≥ 3:1 against adjacent colors.
- J-03 [M][Blocker] — Touch targets ≥ 44×44pt (iOS) / 48×48dp (Android).

## K. Content & data
- K-01 [M][Blocker] — No lorem ipsum, "John Doe", "Title", or "$0.00" placeholders.

## N. Figma hygiene
- N-01 [M][Major] — Frames named `<Screen> / <Option> / <State>` (e.g. `Transfer Amount / A / Error - Insufficient`).
- N-02 [M][Major] — Layers have meaningful names; no "Frame 123", "Rectangle 45", "Group 7".
- N-03 [M][Minor] — No hidden, empty, or off-canvas junk layers.
- N-04 [M][Major] — Page layout: chosen option only; default + budgeted states in one row, left→right.
- N-05 [M][Blocker] — The DS library file was not modified; nothing outside the assigned page was changed or deleted.

## O. Handoff readiness
- O-01 [M][Blocker] — No notes, annotation cards, explanation text, review pages, or DS-gap sections on the canvas. Explanations live in the handoff and Jarvis's chat summary only.

## P. Rhythm & readability (from `layout-and-spacing`)
- P-01 [M][Major] — SP1 spacing values bound to `number/Spacing/*` tokens.
- P-02 [M][Blocker] — SP2 between-group gap ≥ 2× within-group gap; section gap ≥ 1.5× group gap.
- P-03 [M][Major] — SP3 label closer to its value than to the previous group.
- P-04 [M][Blocker] — TY1 `[critical]` layers ≥ Primary role size and ≥ Semibold/Medium.
- P-05 [M][Major] — TY2 ≤ 4 font sizes and ≤ 3 weights per screen.
- P-06 [M][Blocker] — TY5 contrast thresholds met.
- P-07 [M][Major] — TY6 grey budget ≤ 40% of text nodes.
- P-08 [M][Major] — TY7 no Caption S (10) outside `[copy: legal]`.
- P-09 [M][Blocker] — TT1 touch targets ≥ 44 (iOS) / 48 (Android).
- P-10 [M][Blocker] — EM2 exactly one filled primary button per view.
- P-11 [M][Major] — EM1 chip/tag text ≤ Primary size.
- P-12 [M][Blocker] — CL1 clipped overflow has a scroll affordance.
- P-13b [M][Blocker] — No text cut off by a clipping container or truncated without access to the full value (`clippedText`).
- P-13 [M][Blocker] — KB1 keyboard-up: field, CTA, and `[critical]` context visible; nothing below its floor.
