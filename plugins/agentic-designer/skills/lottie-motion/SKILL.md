---
name: lottie-motion
description: Pandu's method for exporting animations as Lottie JSON (Bodymovin format) — micro-interactions, animated icons, loaders, success/error/empty states, and simple vector illustrations — from a small motion spec (shapes, SVG paths from Figma, fills, strokes, trim paths, transforms, keyframes with easing), plus a browser preview and validation. Use when the Manager or developers ask for a Lottie/JSON animation.
---

# Lottie motion

1. **Design the motion first** (`motion-design`): gate, durations, easing, reduced-motion fallback.
2. **Get vectors:** simple shapes directly, or export icon/illustration paths from Figma (`download_assets` SVG, or read
   `vectorPaths` via a read-only script) and use the `d` strings.
3. **Write a spec** `motion/<name>.spec.json` (format in `scripts/make-lottie.js` header): canvas size, fps, duration,
   layers with shapes (rect / ellipse / SVG path), fill/stroke, trim paths, and animated transform/opacity/trim values as
   keyframes `{ t: seconds, v: value, ease: "out" | "inOut" | "linear" | [x1,y1,x2,y2] }`.
4. **Build:** `node skills/lottie-motion/scripts/make-lottie.js motion/<name>.spec.json` → `<name>.json` + `<name>.preview.html`
   (opens in any browser; plays with lottie-web from the free cdnjs CDN).
5. **Check:** the script validates structure; open the preview and watch it at 1× and 0.25× (edit `speed` in the URL hash).
6. **Deliver** (chat): the `.json` path, duration, loop/one-shot, size, reduced-motion note, and where it is used.

Limits: complex illustration animation (characters, masks, 3D) should come from After Effects/Rive — say so instead of faking it.
