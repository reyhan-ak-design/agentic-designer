---
description: Design a motion and export it (Figma Motion, spec, and/or Lottie JSON)
argument-hint: <what should animate> [lottie]
---
Ask **pandu** to design this motion: $ARGUMENTS

Pandu writes the motion spec first (gate, timing, easing, reduced motion). If "lottie" or "json" is mentioned, export Lottie JSON
with `lottie-motion` (spec → `make-lottie.js` → preview). Reply in Indonesian with file paths and duration.
First, a popup (`AskUserQuestion`) unless $ARGUMENTS already says it:
- "Output animasinya?" → **Figma saja (Smart Animate / prototype)** (Recommended for design reviews) · **Lottie JSON untuk dev** ·
  **Spec untuk dev (durasi, easing, urutan — JSON + CSS)** · **Semua**
- "Platform target?" (only for dev outputs) → iOS · Android · Web · Semua
Use the DS motion tokens (Animation collection: durations, easings, springs, stagger; **Reduced** mode → 0–200 ms, no bounce).
Lottie: `lottie-motion` (`make-lottie.js` → validate → preview HTML). Spec: `motion-spec.json` + `motion.css` next to the screen.
