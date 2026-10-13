---
name: window-size-classes
description: Official Android window size classes (width Compact/Medium/Expanded/Large/Extra-large, height Compact/Medium/Expanded) mapped to iPhone/iPad size classes, used to decide layout for unusual or "abnormal" screens — foldables, tablets, landscape phones, split-screen / multi-window, Chrome OS / desktop windows, odd custom dimensions, and briefs that want BOTH Android and iPhone versions. Contains a mandatory PLAN-FIRST gate — present a size-class plan to the Manager and wait for a yes before building. Use whenever a screen looks wrong or cramped at a non-standard size, or a brief names foldable, Fold, Flip, dual-screen, tablet, iPad, landscape, split screen, multi-window, desktop window, "Android dan iPhone", or any width/height outside a normal portrait phone. Works alongside adaptive-devices (does not replace it).
---

# Window size classes — rules for unusual screens

Source: Android Developers, "Use window size classes" (developer.android.com/develop/ui/views/layout/use-window-size-classes)
and Material 3 window size classes. Apple: UITraitCollection horizontal/vertical size class (compact / regular).
This skill **adds to** `adaptive-devices`; when both apply, follow this skill's plan-first gate and height rules, and
`adaptive-devices` for postures, hinge, and min/max widths.

## 1. The breakpoints (all in dp — Android dp ≈ iOS pt ≈ web CSS px)
**Width (primary decision):**
| Width class | Range | What it usually is |
|---|---|---|
| Compact | < 600 | phones in portrait (99.96%), Fold cover screen, Flip, split-screen half |
| Medium | 600 – 839 | tablets in portrait, Fold inner screen in portrait, large foldables unfolded |
| Expanded | 840 – 1199 | tablets in landscape, Fold inner in landscape, dual-screen spanned |
| Large | 1200 – 1599 | large tablets, desktop windows |
| Extra-large | ≥ 1600 | desktop / connected displays |

**Height (secondary — check only for the special cases in §3):**
| Height class | Range | What it usually is |
|---|---|---|
| Compact | < 480 | phones in landscape (99.78%) |
| Medium | 480 – 899 | phones in portrait, tablets in landscape |
| Expanded | ≥ 900 | tablets in portrait |

Boundaries are inclusive at the bottom: exactly 600 → Medium, exactly 840 → Expanded, exactly 480 high → Medium.

## 2. Five laws (from the guideline)
1. **Width first.** Most layout decisions use the width class alone.
2. **Window, not device.** The class comes from the app's *window* size, not the phone model. A big tablet in split
   screen can be Compact. Never design "the tablet version" — design "the Medium/Expanded version". No `isTablet` logic.
3. **Classes change while the app runs** — rotation, split screen, fold/unfold, resizing a desktop window. Every screen
   must survive moving between classes without losing the user's place (scroll, selection, form input).
4. **Classes decide high-level layout only:** navigation pattern, number of panes, canonical layout (list-detail,
   supporting pane, feed). They do **not** decide component pixel sizes — those come from the DS and the min/max-width
   table in `adaptive-devices`.
5. **Design order:** Compact width first (base) → Expanded width (most room, add the extra panes/features here) →
   Medium width (in-between, only if it needs its own layout) → then check Compact **height** (landscape phone).

## 3. When height matters
- **Phone/foldable landscape = Medium or Expanded width + Compact height.** Do not show a two-pane or tall layout here
  just because width is Medium: < 480 high cannot fit a header + list + bottom bar. Use: navigation rail instead of
  bottom bar, collapse large headers/heroes, keep one primary action visible, put the keyboard-heavy form in one scroll.
- **Two panes need height too.** Use two panes only when width ≥ Medium **and** height ≥ Medium (480).
- **Full-screen media / camera / maps** in Compact height: controls overlay the edges, no stacked chrome.

## 4. Layout per width class (default — the DS or brief can override)
| Width | Navigation | Panes / canonical layout | Content |
|---|---|---|---|
| Compact | bottom bar (3–5 items) or top app bar | 1 pane; detail opens as a new screen | full-width cards, full-width bottom CTA |
| Medium | navigation rail | 1 pane with wider margins, **or** list-detail if height ≥ Medium | 2-column grid, CTA max 400 |
| Expanded | rail (or drawer) | 2 panes: list-detail / supporting pane | 2–3 columns, text max ≈ 680 |
| Large / XL | permanent drawer or top nav | 2–3 panes, content container max 1200–1280 | extra width becomes margin, never stretched text |

## 5. Android ↔ iPhone/iPad mapping (when the Manager wants both)
| Situation | Android (width × height) | Apple size class (H × V) | Design it as |
|---|---|---|---|
| Phone portrait | Compact × Medium | compact × regular | Compact |
| Phone landscape (most iPhones) | Medium/Expanded × Compact | compact × compact | Compact-height landscape (§3) |
| Large iPhone landscape (Plus/Pro Max) | Expanded × Compact | **regular** × compact | Compact-height landscape, may show 2 panes if content needs |
| Fold cover / Flip | Compact × Medium | — (no iPhone equivalent) | Compact, glanceable |
| Fold inner portrait | Medium × Medium/Expanded | ≈ iPad portrait (regular × regular) | Medium |
| Tablet / iPad landscape | Expanded × Medium | regular × regular | Expanded |
| iPad Split View / Slide Over, Android split screen | often Compact × Medium | compact × regular | Compact (same as phone) |
| Desktop window / Chrome OS / Stage Manager | any — resizable | any | test all width classes |

Platform differences to keep per frame: Android = Material components, back gesture, navigation rail; iPhone = HIG tab
bar (not a rail on iPhone), large titles, safe areas (Dynamic Island, home indicator), sheets. Same size class ≠ same
components. iPhones have no foldable — an "iPhone version of the Fold screen" means the matching iPad/landscape class.

## 6. PLAN-FIRST GATE (mandatory for unusual screens)
Trigger: any frame that is not a normal portrait phone (Compact × Medium), **or** the brief asks for Android **and**
iPhone together, **or** a screen "looks weird / broken" at some size.
Before any `use_figma` build call, send the Manager a plan in Indonesian using `references/plan-template.md`:
1. Target list: every device/window the brief names → its exact width × height in dp/pt (verify current specs on the
   web; models change) → width class × height class.
2. Group targets by class — **one layout per class, not per device.** Show how many unique layouts that actually is.
3. Per class: navigation, panes, canonical layout, what changes from Compact, what is hidden/added.
4. Transitions to support (rotate, fold/unfold, split screen) and what state must be kept.
5. Android vs iPhone differences, if both are in scope.
6. Frame list to build (`<Screen> / <Platform> / <Class W×H> / <Device example>`) and rough effort.
7. Open questions (max 3).
Then **stop and wait for the Manager's yes** (or edits). Do not build "a quick one to show" first. When the Manager is
unattended (scheduled run), write the plan to `agentic-designer-work/<project>/plans/size-classes-<screen>.md` and stop.

## 7. Fixing a screen that looks wrong at an odd size
1. Measure the frame → compute width class and height class.
2. Diagnose with this list: phone layout stretched across Expanded (lines too long, buttons too wide) · two panes
   squeezed into Compact height · bottom bar at Expanded (should be rail) · tall hero eating Compact height · content
   crossing a fold/hinge · fixed widths that don't reflow · iOS components on Android frame or the reverse.
3. Name the class-appropriate layout from §4/§3, include it in the plan (§6), fix after the yes.

## 8. Handoff note for developers (add to the adaptive spec)
```
Android: WindowSizeClass (Jetpack WindowManager) — compute from current window metrics divided by density;
recompute on View.onConfigurationChanged (not only Activity). Compose: currentWindowAdaptiveInfo().windowSizeClass.
iOS: traitCollection.horizontalSizeClass / verticalSizeClass; update in traitCollectionDidChange / onChange.
Breakpoints: width 600 / 840 / 1200 / 1600 dp; height 480 / 900 dp. Decide layout by class, never by device model.
```
