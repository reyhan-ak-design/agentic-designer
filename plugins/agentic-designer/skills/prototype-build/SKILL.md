---
name: prototype-build
description: Pandu's method for making designs clickable — wiring Figma prototypes from the flow (navigate, back, overlays for sheets and dialogs, smart-animate transitions matched to Pandu's motion spec, flow starting points) on the existing frames, and, only on request, building a single-file interactive HTML prototype with real input behavior for user testing. Use when someone asks for a prototype, clickable flow, "sambungkan prototype", demo, or user-testing build.
---

# Prototype Build (Pandu)

## Figma prototype (default)
1. Read the flow (`flow.md` or the flow page) and the frames' ids from the handoff. Never duplicate frames.
2. Load `figma-use`. In as few `use_figma` calls as possible:
   - For each interactive element on the happy path and key branches, set reactions with
     `node.setReactionsAsync([...])`: trigger `ON_CLICK` → action `NODE` with `destinationId`,
     `navigation: "NAVIGATE"` (screens), `"OVERLAY"` (bottom sheets, dialogs — set the overlay frame's
     position to bottom/center and a dim background), `"BACK"` for back buttons.
   - Transitions: `SMART_ANIMATE` or `MOVE_IN`/`MOVE_OUT` with durations/easing from Pandu's motion spec
     if it exists; otherwise ease-out 0.25–0.35s (sheets 0.35s).
   - Add a flow starting point on the first screen (`page.flowStartingPoints`), named after the flow.
   Confirm exact API field names in `figma-use` references before writing.
3. Verify by reading back reactions per node; list any element without a destination.
4. Hand off: prototype link (the Figma file with `?node-id=<start>&starting-point-node-id=<start>` in present mode), the path covered, gaps.

## HTML prototype (only when asked)
- One self-contained `index.html` in `agentic-designer-work/<project>/prototype/<flow>/` — mobile frame
  375 wide, DS token values read once from the file (colors, type, spacing, radius), real behaviors
  (numeric input formatting "Rp1.250.000", validation, sheets, loading/error states), no external requests.
- Open it for the Manager with the local file path. Keep it faithful to the Figma design; do not redesign.
