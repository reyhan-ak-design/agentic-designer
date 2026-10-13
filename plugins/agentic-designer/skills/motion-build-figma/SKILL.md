---
name: motion-build-figma
description: How Pandu builds and verifies motion in Figma with Figma Motion via use_figma — runtime gating check, dedicated motion page, animating descendants of top-level frames, applying Figma animation styles vs manual keyframe tracks, timeline duration, easing objects, and cheap verification with export_video. Use whenever motion must be built, edited, or inspected in a Figma file; always after a motion spec exists.
---

# Build Motion in Figma

## Before any call
- Load `figma-use` and `figma-use-motion`; pass `skillNames: "figma-use,figma-use-motion"`.
- **Gating:** Motion APIs may be disabled for the user (feature flag). On the first
  `"<name>" is not a supported API` error: stop immediately, tell Jarvis motion is not enabled for
  this account, and deliver the motion spec only. Never retry.

## Where to build
- Build motion **directly on the designer's frames** on the same page (no duplicate pages — copying
  designs wastes tokens). Figma's motion mode plays the animation in place.
- The **resting state must stay identical to the approved static design**: the final keyframe of
  every track equals the static value, so screenshots and reviews of the static design are unaffected.
- Animate **descendants** of top-level frames, never the top-level frame itself.
- One scenario per top-level frame where possible (e.g. the "Source Picker Open" frame carries the
  sheet-open motion). Record which frame carries which motion ID in the motion spec (never as notes on the canvas).
- Never change layout, content, or styles while adding motion; if the design needs a change for motion
  to work, send it back to the designer through Jarvis.

## Styles vs manual keyframes
- Prefer Figma's first-party animation styles (`figma.motion.figmaAnimationStyles()`) when one
  matches the spec (fade, slide, scale-in); inspect its `props` before applying.
- Use manual keyframe tracks when the spec needs exact values (custom cubic, stagger offsets,
  multi-property choreography). Transform fields are relative (translation additive, scale multiplicative).
- Set timeline duration to the choreography length (+ ~0.2s rest at the end). Values are seconds.

## Efficiency
- Build every motion of a scenario in one `use_figma` call when possible.
- Stagger = same track copied with delayed keyframe times; generate it in a loop.

## Verify (only when not self-evident)
- `export_video` on the scenario's top-level frame, `quality: "low"`, `fps: 5`,
  `constraint: { type: "WIDTH", value: 320 }` (raise only to read small details). Poll with `jobId`.
- Max **1 render per scenario per round**; batch all fixes before re-rendering.
- If no frame extractor (ffmpeg) is available locally, skip rendering and verify by reading back
  `node.manualKeyframeTracks` / `node.animations` against the spec.

## Handoff
Link each scenario frame from the motion spec and list node IDs. Jarvis reviews spec + frames.

## Budget (v1.1 — from a 95M-token splash run)
Per alternative: ≤ 25 `use_figma` calls · ≤ 8 `export_video` · ≤ 6 screenshots · ≤ 3 spec revisions before a checkpoint.
Write the spec to disk after every revision (`motion/<flow>/SPEC.md`). After 5 SendMessage continuations, or when switching to
another alternative, stop: summarise to a handoff file and let Jarvis spawn a **fresh** Pandu with that file (cheap context).
Two alternatives = two separate runs, never one long conversation.

## Seam check (mandatory before "done")
Every navigation into or out of an animated screen (splash → login, sheet → screen, success → home):
1. Export/screenshot the **last frame** of the source and the **first frame** of the destination at the same size.
2. `node skills/fresh-eyes-review/scripts/pixel-diff.mjs last.png first.png` — the changed box must be only what is meant to
   change; no white/blank frame, no flash, no push/slide unless designed.
3. In the prototype, the destination's transition is **Instant** unless the spec says otherwise.
Report "Seam check: OK (n seams)" in the handoff. A failed seam is a blocker, never a note.
