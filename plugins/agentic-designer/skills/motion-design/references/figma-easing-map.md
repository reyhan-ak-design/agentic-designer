# Mapping motion intent to Figma Motion easing (public Plugin API)

| Intent | Figma easing object |
|---|---|
| Strong ease-out (enter/exit) | `{ type: "CUSTOM_CUBIC_BEZIER", easingFunctionCubicBezier: { x1: 0.23, y1: 1, x2: 0.32, y2: 1 } }` |
| Strong ease-in-out (on-screen move) | `{ type: "CUSTOM_CUBIC_BEZIER", easingFunctionCubicBezier: { x1: 0.77, y1: 0, x2: 0.175, y2: 1 } }` |
| iOS sheet / drawer | `{ type: "CUSTOM_CUBIC_BEZIER", easingFunctionCubicBezier: { x1: 0.32, y1: 0.72, x2: 0, y2: 1 } }` |
| Standard ease-out (quick, simple) | `{ type: "EASE_OUT" }` |
| Ease in-and-out | `{ type: "EASE_IN_AND_OUT" }` (never `EASE_IN_OUT`) |
| Spring (gesture / alive) | `{ type: "CUSTOM_SPRING", easingFunctionSpring: { bounce: 0.1–0.3 } }` (check exact shape in figma-use-motion `motion-easing.md`) |
| Hold (step change) | `{ type: "HOLD" }` |
| Linear (progress) | `{ type: "LINEAR" }` |
Durations in the Plugin API are **seconds** (350ms → 0.35).
Always confirm field names against `figma-use-motion` references before writing.
