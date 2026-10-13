# Craft checklist ([J]) — designer & Jarvis scope

Judgment items. In the **Explore** lane, layout/spacing/hierarchy items are advisory; accessibility (J-section) still applies.


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
- C-07 [J][Major] — The primary action sits in the thumb-reachable zone on mobile (bottom third), or is sticky.

## D. Typography
- D-04 [J][Major] — Line length for body text stays readable (~30–45 chars mobile, ≤ 75 web).
- D-05 [J][Minor] — No orphaned single words in headings or buttons at the designed width.

## E. Color
- E-02 [J][Major] — One accent color carries emphasis; other colors are neutral or semantic.
- E-04 [J][Blocker] — Meaning is never carried by color alone (errors also have text or icon).

## G. States & edge cases
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
- I-iOS-01 [M][Blocker] — Frame size matches the brief (e.g. 375×812) with status bar and home indicator.
- I-iOS-02 [J][Major] — Navigation follows HIG (back chevron top-left, sheets for sub-tasks, no Android-style patterns).
- I-iOS-03 [J][Major] — Keyboard type matches input (numeric pad for amounts); design shows the keyboard when relevant.
- I-AND-01 [M][Blocker] — Frame size matches the brief with status and navigation bars.
- I-AND-02 [J][Major] — Navigation and components follow Material conventions (system back, bottom sheets, FAB rules).
- I-WEB-01 [M][Blocker] — Designed at the breakpoints the brief names (default: 1440 and 375).
- I-WEB-02 [J][Major] — Hover, focus, and active states exist for interactive elements.

## J. Accessibility (WCAG 2.1 AA minimum)
- J-04 [J][Major] — Layout survives larger text (Dynamic Type / font scale ~130%) without clipping key content.
- J-05 [J][Major] — Every input has a visible label (placeholder alone is not a label).
- J-06 [J][Minor] — Focus / reading order is annotated for complex screens.

## K. Content & data
- K-02 [J][Major] — Data is realistic for the market and domain (Indonesian names, Rp formatting "Rp1.250.000", real bank names) unless the brief says otherwise.
- K-03 [J][Major] — Microcopy is short, specific, and action-led (buttons are verbs). Final copy is owned by Wulan (UX Writer); designers mark copy that needs review.
- K-04 [J][Minor] — Terminology is consistent across all states and options.

## M. Anti-AI-slop
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

## O. Handoff readiness
- O-02 [J][Major] — Technical risks raised by the dev agent (Dev) are addressed or listed as open.
- O-03 [J][Minor] — Interactions that are not obvious from static frames (keypad behavior, sheet open, schedule toggle) are annotated.

## P. Rhythm & readability (from `layout-and-spacing`; added v0.2.0)
- P-14 [J][Blocker] — Blur-test top 3 = priority guide top 3.
- P-15 [J][Major] — Emphasis budget respected (1 hero, 1 primary action, ≤ 3 secondary).
- P-16 [J][Major] — Worst-case data and all states designed.
- P-17 [J][Major] — Density matches the mode; no compact density on focused tasks.
- P-18 [J][Major] — No AI tells; brief and DS win over taste.
- P-19 [J][Major] — Every finding tied to the objective, severity-rated, token-exact fix, verified.
