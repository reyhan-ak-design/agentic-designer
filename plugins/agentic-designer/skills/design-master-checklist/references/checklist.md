# Checklist items

Format: `ID [type] [default severity] — check`

## Contents
A. Brief fit · B. Visual hierarchy · C. Layout & spacing · D. Typography ·
E. Color · F. Design system compliance · G. States & edge cases ·
H. UX heuristics · I. Platform conventions · J. Accessibility ·
K. Content & data · L. Domain compliance · M. Anti-AI-slop ·
N. Figma hygiene · O. Handoff readiness

---

## A. Brief fit
- A-01 [J][Blocker] — Every "must-have" content item in the brief is present.
- A-02 [J][Blocker] — The screen lets the user complete the stated goal without leaving the screen or guessing.
- A-03 [J][Major] — Nothing was added that the brief did not ask for, unless it serves the goal and is noted.
- A-04 [J][Major] — The chosen option is explained in one sentence tied to the user goal.

## B. Visual hierarchy
- B-01 [J][Blocker] — The single most important element (e.g. the amount on an amount screen) is the first thing the eye lands on.
- B-02 [J][Major] — The primary action is visually unique; no secondary element competes with it.
- B-03 [J][Major] — There are at most 3 clear levels of emphasis on the screen.
- B-04 [J][Major] — Related items are grouped by proximity; unrelated groups are separated by whitespace, not only by lines or cards.
- B-05 [J][Minor] — Reading order matches task order (top→bottom = first→last decision).

## C. Layout & spacing
- C-01 [M][Major] — All spacing values come from the DS spacing scale (default 4/8pt); no off-scale values like 13 or 22.
- C-02 [M][Major] — Horizontal screen margins are consistent (default 16 mobile, per DS if defined).
- C-03 [M][Blocker] — No hardcoded color, radius, or spacing where a DS variable exists.
- C-04 [M][Major] — Every container uses auto layout; absolute positioning only for intentional overlays (badges, FABs, sheets).
- C-05 [M][Blocker] — Content respects platform safe areas (status bar, home indicator, notches).
- C-06 [M][Minor] — Elements align to a shared edge or center line; no 1–2px misalignments.
- C-07 [J][Major] — The primary action sits in the thumb-reachable zone on mobile (bottom third), or is sticky.

## D. Typography
- D-01 [M][Blocker] — Only DS text styles are used; no local font sizes or weights.
- D-02 [M][Major] — Max 4 distinct text styles on one screen (excluding system bars).
- D-03 [M][Major] — Monetary and numeric values use tabular figures and a consistent format.
- D-04 [J][Major] — Line length for body text stays readable (~30–45 chars mobile, ≤ 75 web).
- D-05 [J][Minor] — No orphaned single words in headings or buttons at the designed width.

## E. Color
- E-01 [M][Blocker] — All colors are DS variables (semantic tokens preferred over primitives).
- E-02 [J][Major] — One accent color carries emphasis; other colors are neutral or semantic.
- E-03 [M][Major] — Semantic colors are used correctly: error = danger token, success = success token, etc.
- E-04 [J][Blocker] — Meaning is never carried by color alone (errors also have text or icon).
- E-05 [M][Major] — Dark mode tokens resolve correctly if the DS has a dark mode and the brief requires it.

## F. Design system compliance
- F-01 [M][Blocker] — Components are instances from the linked DS library, not redrawn copies.
- F-02 [M][Major] — Instances are not detached. Any detach is listed with a reason.
- F-03 [M][Major] — Component variants and properties are used as designed (no overriding a variant's look by hand).
- F-04 [M][Major] — Missing components are escalated to Jarvis/Desi; no local stand-ins without approval (then on page `_Local components`).
- F-05 [M][Major] — One icon set per screen (the DS contains more than one — do not mix them).

## G. States & edge cases
- G-01 [M][Blocker] — Every state requested in the brief exists as its own frame.
- G-02 [J][Major] — Default set when the brief says "all states": default/empty, filled/valid, error (each distinct cause), loading, disabled, success or next-step.
- G-03 [J][Major] — Edge content is tested: longest realistic name, largest realistic number, zero, empty list.
- G-04 [J][Major] — Loading uses skeletons shaped like the content, not a lone spinner, unless the wait is < 1s.
- G-05 [J][Major] — Errors say what happened and how to fix it, next to where it happened.
- G-06 [J][Minor] — Disabled primary actions communicate why they are disabled (helper text).

## H. UX heuristics
- H-01 [J][Major] — System status is visible (balance, progress, what is selected).
- H-02 [J][Major] — Input is forgiving: auto-formatting, sensible defaults, no forced exact formats.
- H-03 [J][Blocker] — Irreversible or money-moving actions have a review/confirm step.
- H-04 [J][Major] — The user can go back or cancel at every step without losing entered data.
- H-05 [J][Major] — Recognition over recall: previously used values (recent amounts, contacts) are offered where useful.
- H-06 [J][Major] — The number of decisions on one screen is minimal; optional items look optional.
- H-07 [J][Minor] — Patterns match what users know from leading apps in the same domain and market.

## I. Platform conventions
### iOS
- I-iOS-01 [M][Blocker] — Frame size matches the brief (e.g. 375×812) with status bar and home indicator.
- I-iOS-02 [J][Major] — Navigation follows HIG (back chevron top-left, sheets for sub-tasks, no Android-style patterns).
- I-iOS-03 [J][Major] — Keyboard type matches input (numeric pad for amounts); design shows the keyboard when relevant.
### Android
- I-AND-01 [M][Blocker] — Frame size matches the brief with status and navigation bars.
- I-AND-02 [J][Major] — Navigation and components follow Material conventions (system back, bottom sheets, FAB rules).
### Web
- I-WEB-01 [M][Blocker] — Designed at the breakpoints the brief names (default: 1440 and 375).
- I-WEB-02 [J][Major] — Hover, focus, and active states exist for interactive elements.

## J. Accessibility (WCAG 2.1 AA minimum)
- J-01 [M][Blocker] — Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 18.66px bold / 24px regular).
- J-02 [M][Blocker] — UI component and icon contrast ≥ 3:1 against adjacent colors.
- J-03 [M][Blocker] — Touch targets ≥ 44×44pt (iOS) / 48×48dp (Android).
- J-04 [J][Major] — Layout survives larger text (Dynamic Type / font scale ~130%) without clipping key content.
- J-05 [J][Major] — Every input has a visible label (placeholder alone is not a label).
- J-06 [J][Minor] — Focus / reading order is annotated for complex screens.

## K. Content & data
- K-01 [M][Blocker] — No lorem ipsum, "John Doe", "Title", or "$0.00" placeholders.
- K-02 [J][Major] — Data is realistic for the market and domain (Indonesian names, Rp formatting "Rp1.250.000", real bank names) unless the brief says otherwise.
- K-03 [J][Major] — Microcopy is short, specific, and action-led (buttons are verbs). Final copy is owned by Wulan (UX Writer); designers mark copy that needs review.
- K-04 [J][Minor] — Terminology is consistent across all states and options.

## L. Domain compliance
Load the checks from the active Domain Pack (`domain-*` skill). Domain Pack items keep their own IDs (e.g. `FIN-03`) and severities, and are reported in this same format.

## M. Anti-AI-slop
All items are [J]. Default severity Major unless marked.
- M-01 — No decorative gradients, mesh gradients, or glow effects without a brand reason.
- M-02 — No glassmorphism / frosted cards as a default surface.
- M-03 — No default "AI palette" (purple-blue neon) unless it is the brand.
- M-04 [Blocker] — No emoji used as UI icons.
- M-05 — No generic 3D illustrations, blobs, or stock "people with laptops" art.
- M-06 — Shadows are rare and purposeful; not every card floats.
- M-07 — Corner radius follows the DS scale; not everything is a pill.
- M-08 — Not everything is centered; alignment follows content type.
- M-09 — No icon in every row "for decoration" — icons earn their place.
- M-10 — No filler: "Welcome back 👋" heroes, fake stats, marketing banners the brief did not ask for.
- M-11 — No low-contrast grey text used for aesthetics.
- M-12 — No sprinkled badges, pills, or chips that carry no information.
- M-13 — The design would be believable as a shipped product from a real company in this domain. If it looks like a Dribbble shot or a template, it fails.
- Plus: every "don't" in the active Style Pack.

## N. Figma hygiene
- N-01 [M][Major] — Frames named `<Screen> / <Option> / <State>` (e.g. `Transfer Amount / A / Error - Insufficient`).
- N-02 [M][Major] — Layers have meaningful names; no "Frame 123", "Rectangle 45", "Group 7".
- N-03 [M][Minor] — No hidden, empty, or off-canvas junk layers.
- N-04 [M][Major] — Page layout: chosen option only; default + budgeted states in one row, left→right.
- N-05 [M][Blocker] — The DS library file was not modified; nothing outside the assigned page was changed or deleted.

## O. Handoff readiness
- O-01 [M][Blocker] — No notes, annotation cards, explanation text, review pages, or DS-gap sections on the canvas. Explanations live in the handoff and Jarvis's chat summary only.
- O-02 [J][Major] — Technical risks raised by the dev agent (Dev) are addressed or listed as open.
- O-03 [J][Minor] — Interactions that are not obvious from static frames (keypad behavior, sheet open, schedule toggle) are annotated.

## P. Rhythm & readability (from `layout-and-spacing`)
Mechanical — the lint (run `references/kiki-lint.js` once per page):
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
Judgment — Jarvis (`design-critique`):
- P-14 [J][Blocker] — Blur-test top 3 = priority guide top 3.
- P-15 [J][Major] — Emphasis budget respected (1 hero, 1 primary action, ≤ 3 secondary).
- P-16 [J][Major] — Worst-case data and all states designed.
- P-17 [J][Major] — Density matches the mode; no compact density on focused tasks.
- P-18 [J][Major] — No AI tells; brief and DS win over taste.
- P-19 [J][Major] — Every finding tied to the objective, severity-rated, token-exact fix, verified.

## Severity mapping
Blocker = Sev 3–4 · Major = Sev 2–3 (reviewer decides) · Minor = Sev 1.
Delivery to the Manager requires: no Sev ≥ 3 open, ≤ 2 Sev 2 open.
