---
name: visual-craft
description: The visual craft layer that turns a correct layout into a design a lead would be proud of — when to use surfaces, cards, and tints vs whitespace; surface layering; composition and focal point; big-number typography; concentric radius; optical alignment; shadows for elevation vs borders for structure; icon stroke and state rules; controls distinct from content; one signature moment per screen inside the design system. Use for every design build and every visual review, on any platform or domain.
---

# Visual Craft

`layout-and-spacing` makes a screen correct. This skill makes it good. Credits: ideas adapted
from Jakub Krehel's "better-interface" and Emil Kowalski's design-engineering notes (rewritten).

## 1. Containment — group with the right tool
Choose per group, in this order of preference, and **use containers when they carry meaning**:
| Situation | Tool |
|---|---|
| Related static text/data | whitespace (T1 inside, T2 around) |
| A set of interactive rows that belong together (recipient + source of funds, settings group, form section) | **card/surface** on a tinted page background |
| A summary the user must verify (transfer summary, order total, KPI) | **card/surface**, often with a subtle brand tint |
| Status/alert/info | tinted container (semantic 25–50) + icon + text |
| List/table rows | dividers or row surfaces |
Never card-in-card. Never a card around a single line of text. Never everything floating on white
when groups contain interactive rows — that reads as unfinished.

## 2. Surface layering
Page background (neutral/25–50 or surface-secondary) → cards (surface-primary/white) →
elevated (sheets, menus, dialogs). Depth comes from contrast between layers first, shadow second.
Dark mode: lighter surfaces for higher layers, borders instead of shadows.

## 3. Composition
- One focal point per screen (the hero from the priority guide). Everything else supports it.
- Contrast of scale: the hero is clearly bigger than the next level (≥ 1.5× type size).
- Few alignment axes: most content shares the screen margin edge; center only the hero when it is a single value.
- Rhythm: vary spacing by relationship (see `layout-and-spacing`), never one repeated gap.
- Fill the canvas purposefully: empty space should look intended (breathing room around the hero), not leftover (a gap before the CTA).

## 4. Typography craft
- Big numbers: tight tracking (≈ −1% to −2%), tabular figures, currency prefix quieter (smaller or secondary color).
- Headings tighter line-height (~1.1–1.2), body 1.4–1.5.
- Labels above inputs in secondary color; values in primary color and weight.
- Weight carries hierarchy before color; color before size changes.

## 5. Details that separate good from great
- **Concentric radius:** outer radius = inner radius + padding (when padding ≤ 24).
- **Optical alignment:** icons and play glyphs adjusted by eye; text-with-trailing-icon padding −2 on the icon side.
- **Shadows for elevation, borders for structure:** floating layers use soft layered shadows from the DS; structure (dividers, inputs, selected states) uses borders.
- **Icons:** one set per product; stroke matches adjacent text weight (regular → 1.5, semibold → 2); outline = default, filled = active/selected; sized to the text (1–1.25× cap height).
- **Controls look like controls:** anything tappable has a shape, border, or a consistent placement zone; never styled like static text.
- **Truncation:** only with a way to see the full value; never on money, names on confirmation screens, or error text.
- **Imagery:** real, illustrated, or generated (`visual-assets`) — never grey placeholder boxes in a final; follow the Style Pack's art direction; images get a hairline outline (black/white at 10%) on light surfaces.

## 6. Signature moment (required in Explore/Premium, expected in Standard)
Every screen has **one** considered, ownable idea that makes it memorable and is **visible in the blur test** — a hero
amount set at display scale, a brand-color field with a bold shape, a striking photo crop, an illustrated empty state, a
card stack with depth, a micro-interaction handed to Pandu. It uses DS tokens (or a proposed token), serves the objective,
and never competes with the primary action. Name it in the plan and check it in polish. "Nothing is ownable" is a finding.

## 7. The lead's bar
Before handoff, compare your screen side by side with the **hero reference** (ceiling) and the golden screen:
would it hold up next to it? Name the gap in one line and close it, or justify it.

## Platform notes (2025–2026)
- **iOS 26 Liquid Glass:** glass only on the navigation/controls layer; never on content cards; never glass on glass;
  drop custom backgrounds from tab bars/toolbars; concentric radii (inner = outer − inset); capsules for large touch
  controls, rounded rectangles for small/dense ones.
- **Material 3 Expressive:** use expressive emphasis (larger, bolder, closer to the task) for exactly **one** key action
  per screen — not as a global style.
- Targets: ≥ 44×44 pt iOS, ≥ 48dp Android; contrast WCAG 2.1 AA.
