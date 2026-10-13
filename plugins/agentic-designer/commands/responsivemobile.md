---
description: Make a responsive mobile version for Android AND iPhone — Android by Android window size classes, iPhone by Apple's own rules — plan first, build after the Manager's yes
argument-hint: <screen or Figma link> [devices/sizes, e.g. "Fold, Flip, tablet, iPhone 16 Pro Max landscape"]
---
Use the `window-size-classes` skill (plus `adaptive-devices` for foldable postures, hinge, and min/max widths) on: $ARGUMENTS

Two platforms, two rulebooks — never copy one platform's layout onto the other:
- **Android frames:** follow Android window size classes exactly (width 600 / 840 / 1200 / 1600 dp, height 480 / 900 dp),
  Material 3 components, navigation per class (bottom bar → rail → drawer), canonical layouts.
- **iPhone/iPad frames:** follow `skills/window-size-classes/references/iphone-rules.md` — Apple size classes
  (compact / regular), HIG components, tab bar, safe areas, Dynamic Island, sheets. iPhone has no foldable: map a
  foldable request to the matching iPhone landscape / iPad class.

Steps:
0. **First, ask with a popup** — call the `AskUserQuestion` tool (load it via ToolSearch if deferred) BEFORE anything else,
   unless $ARGUMENTS already says the platform clearly. Ask in Indonesian:
   - Question 1 — header "Platform": "Versi responsive untuk platform mana?" (single choice)
     options: "Keduanya (Android + iPhone)" (Recommended) · "Android saja" · "iPhone saja"
   - Question 2 — header "Ukuran": "Ukuran layar mana yang mau dibuat?" (multiSelect) — show only options for the chosen
     platform(s); if both, combine: "HP landscape" · "Foldable (Fold/Flip)" · "Tablet / iPad" · "Pakai default"
   Use the answers to set scope: Android only → skip every iPhone/iPad frame and the iPhone section of the plan; iPhone only
   → skip Android frames. If the popup tool is unavailable (unattended run), choose "Keduanya" + defaults and say so at the
   top of the plan.
1. If no devices are given (or "Pakai default" was chosen), default to: Android phone portrait + landscape, Android foldable (cover + inner), Android
   tablet landscape; iPhone portrait + landscape, iPhone Pro Max landscape, iPad portrait.
2. Verify current device sizes on the web, compute width × height class for every target.
3. **Send the plan first** (Indonesian, `references/plan-template.md`, with separate Android and iPhone sections) and
   STOP. Do not build anything until the Manager says yes or edits it.
4. After the yes: build only the planned frames, named `<Screen> / <Android|iOS> / <Class W×H> / <Device>`, then
   write `specs/adaptive-<screen>.md` with the per-class table and the dev handoff note.
5. Reply in Indonesian: frame list + the 3 most important layout changes per platform.
