---
name: adaptive-devices
description: Designing one product across phones, foldables (Galaxy Z Fold cover + inner screen, Z Flip), dual-screen devices (Surface Duo style, spanned across a hinge), tablets, and web — portrait and landscape, fold postures (tabletop, book), hinge avoidance, continuity when folding, canonical layouts (list-detail, supporting pane, feed), navigation changes per size, and min/max-width rules per component applied in Figma and written as a developer spec. Use whenever a brief names foldables, dual-screen, tablets, landscape, "responsive", breakpoints, or max width.
---

# Adaptive devices

## 1. Size classes (design by width class, not by device)
| Class | Width (dp/pt/px) | Typical | Navigation | Layout |
|---|---|---|---|---|
| Compact | < 600 | phones, Fold cover, Flip | bottom bar | single pane |
| Medium | 600–839 | Fold inner portrait, small tablet, phone landscape (some) | navigation rail | single pane with wider margins, or 2 panes for list-detail |
| Expanded | 840–1199 | Fold inner landscape, tablet landscape, dual-screen spanned | rail or drawer | 2 panes (list-detail / supporting pane) |
| Large / XL | 1200–1599 / ≥ 1600 | desktop web, large tablets | drawer / top nav | 2–3 panes, max content width |
Android uses Material window size classes; iOS uses horizontal size classes (compact / regular) — map compact ↔ Compact,
regular ↔ Medium+. Web: breakpoints from the DS (`-> Breakpoints & Layout Guide` in the Global DS) or the table above.

## 2. Frames to build (verify current device specs on the web at task time — models change)
Use the DS breakpoint collection when it exists. Otherwise start from `references/device-frames.md` (approximate
defaults, labeled) and correct them with a quick web check of the exact model the brief names.
Build only the frames the brief's Scope asks for; name them `<Screen> / <Device> / <Posture> / <Orientation>`.

## 3. Foldables & dual-screen rules
- **Postures:** flat (fully open), half-open **tabletop** (hinge horizontal: top half = content/viewer, bottom half =
  controls) and **book** (hinge vertical: left/right panes). Android exposes these via Jetpack WindowManager
  `FoldingFeature` (state FLAT / HALF_OPENED, orientation HORIZONTAL / VERTICAL, `isSeparating`, `occlusionType`).
- **Hinge avoidance:** never place text, buttons, faces, or key numbers across the hinge or fold line; on separating
  hinges (dual-screen) treat each screen as its own pane with a gutter equal to the hinge width.
- **Continuity:** folding/unfolding keeps the user's place (same item, scroll position, form input). Show both states
  in the plan when the flow crosses a posture change.
- **Cover screen (Fold/Flip):** a focused compact version — glanceable status, 1–2 actions; never a squeezed inner layout.
- **Canonical layouts:** list-detail (inbox, transactions), supporting pane (editor + tools, chart + details), feed
  (grid that reflows columns). Pick one per screen for Medium+.

## 4. Min/max width per component (developers need this)
Apply in Figma on auto-layout children (`node.minWidth` / `node.maxWidth`) **and** list them in the spec file.
Defaults (override with the DS):
| Component | Min | Max | Behavior |
|---|---|---|---|
| Body text block | — | 60–75 ch (≈ 560–680 at 16) | wraps; never full-bleed on Expanded |
| Primary button | 120 | full width on Compact; 400 on Medium+ | bottom CTA full width only on Compact |
| Form / input column | 280 | 560–640 | centered or in a pane on Medium+ |
| Card (grid) | 280 | 420 | columns reflow: 1 → 2 → 3 → 4 |
| Illustration / hero art | 160 | 320 Compact · 400 Medium · 480 Expanded | scales down, never upscales beyond asset size |
| Photo / media | — | pane width; 1280 container on web | keep ratio; crop focal point, not stretch |
| Dialog | 280 | 560 | Compact: bottom sheet or full screen |
| Bottom sheet | — | 640 | Medium+: side sheet or dialog |
| Content container (web) | — | 1200–1280 | margins grow beyond it |

## 5. Deliverables
Frames per Scope · `agentic-designer-work/<project>/specs/adaptive-<screen>.md`:
```
| Component | Compact | Medium | Expanded | Min | Max | Notes (reflow, posture) |
```
plus navigation per class, pane rules, and posture behavior. Ask `dev` only for platform-specific feasibility.
