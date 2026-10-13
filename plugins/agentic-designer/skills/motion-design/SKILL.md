---
name: motion-design
description: Pandu's motion design method — decide whether something should animate at all (frequency, purpose, speed, function gates), choose properties, durations, easing or springs, choreograph staggers and sequences, design enter/exit and interruption, specify reduced-motion behavior, match motion personality to the Style Pack and domain, and hand off a precise motion spec that iOS, Android, and web developers can implement. Use for any request about animation, motion, transitions, micro-interactions, prototypes that should feel alive, Figma Motion, or "make this feel better/smoother", and for motion reviews.
---

# Motion Design

Motion is functional first. It explains cause and effect, keeps spatial continuity, confirms
actions, and — only in rare moments — delights. Most UI motion should be felt, not noticed.

Adapted in part from Emil Kowalski's animation skills (MIT) — see `references/credits.md`.

## 1. The gate — run for every candidate, in order
**Frequency**
| How often seen | Verdict |
|---|---|
| 100+/day (core navigation, keyboard/shortcut actions, tab switches in ops tools) | **No animation** |
| Tens/day (hover, list navigation, frequent toggles) | Near-imperceptible only (≤ 150ms, tiny transforms) or none |
| Occasional (sheets, modals, toasts, step transitions, filters) | Standard motion |
| Rare / first-time (onboarding, success, milestones, empty-state first visit) | Delight budget lives here |

**Purpose** — name exactly one: Feedback · Spatial consistency · State indication ·
Prevent a jarring change · Explanation (onboarding/marketing only) · Delight (rare tier only).
Can't name it → don't animate.

**Speed** — must fit the duration budget below.
**Function** — data the user is reading or acting on (balances, prices, tables, charts being read)
never moves for style.

## 2. Properties
- Transform (translate, scale) and opacity first. Layout properties (width, height, padding, gap)
  only when there is no transform equivalent (accordion, expanding field) — flag for devs.
- Never scale from 0. Enter from scale 0.95–0.97 + opacity 0.
- Anchored surfaces (menus, popovers, tooltips) grow from their trigger. Modals and full sheets are centered/edge-anchored.
- Sheets and toasts enter and exit through the same edge.

## 3. Duration budget (UI stays under 300ms unless justified)
| Element | Duration |
|---|---|
| Press / tap feedback | 100–160ms |
| Tooltip, small popover | 125–200ms |
| Dropdown, select, chip toggle | 150–250ms |
| Bottom sheet, modal, drawer | 250–400ms (iOS sheets ~350ms) |
| Screen push / step transition | 250–350ms |
| Success / celebration (rare) | 400–800ms total choreography |
| Onboarding / explanation | may be longer; one idea at a time |

## 4. Easing
| Situation | Easing |
|---|---|
| Entering / exiting | Strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` |
| Moving / morphing on screen | Strong ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` |
| Sheets / drawers (iOS feel) | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Color / hover | standard ease |
| Constant (progress, marquee) | linear |
Never ease-in on UI. Springs for gestures, drag-to-dismiss, and "alive" elements:
`duration 0.5, bounce 0.1–0.3`; no bounce on money, errors, or data.
Figma enum mapping is in `references/figma-easing-map.md`.

## 5. Choreography
- One focal motion at a time; secondary elements follow.
- Stagger groups by 30–80ms; order follows hierarchy (hero → primary → secondary).
- Total choreography ≤ 500ms for standard UI; never block interaction while it plays.
- Asymmetric timing: deliberate phases slow (hold-to-confirm ≈ 1.5–2s linear), system responses snap (≤ 200ms).
- Rapid/interruptible interactions (toggles, chips, toasts) must retarget smoothly — spec them as transitions, not restart-from-zero keyframes.

## 6. Reduced motion (always specified)
Fewer and gentler, not zero: keep opacity/color crossfades that aid comprehension; remove
translation, scale, parallax, and bounce. Write the reduced variant for every motion in the spec.

## 7. Personality
Follow the Style Pack's Motion section and the domain:
- Finance, healthcare, government, B2B: crisp, calm, no bounce except success moments; numbers
  don't count up on screens where they are read repeatedly (balances) — count-up only on rare summaries.
- Playful / consumer / edtech kids: springier, more generous delight budget — still inside the gate.
- Luxury / elegant: slower (+50–100ms), fades over movement, no bounce.
- Dashboards / ops: nearly static; only state changes and loading.

## 8. Output — the motion spec (always)
Write `motion/<screen-or-flow>.md` using `references/motion-spec-format.md`. The spec is the
source of truth for developers; the Figma build (`motion-build-figma`) illustrates it.

## 9. Self-review (the ten standards)
Justified · frequency-appropriate · responsive easing (no ease-in) · sub-300ms UI · correct origin,
no scale(0) · interruptible where rapid · transform/opacity first · reduced motion specified ·
asymmetric where deliberate · cohesive with personality. Any miss is a finding. When unsure, delete the motion.
