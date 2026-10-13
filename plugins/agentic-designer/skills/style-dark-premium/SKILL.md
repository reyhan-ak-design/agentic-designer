---
name: style-dark-premium
description: Style Pack "Dark Premium" — dark-first, focused, high-tech premium look for investment and trading apps, crypto, streaming, monitoring dashboards, and priority tiers. Use whenever a brief says dark, dark mode first, premium dark, trading, crypto, pro, night, or cinematic.
---

# Style Pack — Dark Premium

## Personality
Focused and powerful. Data and content glow on a calm dark canvas.

## Typography
- Precise sans (Inter, Geist, Manrope); tabular numerals everywhere for data.
- Slightly lighter weights on dark for comfort; strong size hierarchy.

## Color
- Surfaces: layered near-blacks/deep greys (not pure #000 except OLED video), 3–4 elevation steps via lightness.
- One luminous accent; positive/negative data colors tuned for dark (desaturated, AA on dark).
- Text: high-emphasis ~90% white, medium ~65%, never below AA.

## Density & spacing
Medium-dense for data; clear section surfaces.

## Shape & elevation
Radius medium (10–16). Elevation by surface lightness and 1px borders, not shadows.

## Iconography & imagery
Outline icons; charts with clean gridlines; imagery with scrims.

## Motion
Fast data transitions (150ms); number tickers once, not looping.

## Visual recipes (component treatments)
- **Surfaces:** 3–4 elevation steps of near-black/deep grey; borders 1px neutral/800 instead of shadows.
- **Data:** tabular numbers, up/down colors tuned for dark with sign + arrow; charts with subtle gridlines.
- **Accent:** one luminous accent for actions and live states; no glows.
- **Cards:** radius 12–16, compact padding (16), clear section titles.
- **Text:** high-emphasis ~90% white, medium ~65%, never below AA.

## Density tiers (applies `layout-and-spacing`)
Medium-dense for data: T1 8–12 · T2 16–24 · T3 32. Tables 40–48 rows; surfaces separate groups.

## Don'ts
- STY-DP-01 [J][Blocker] — No neon glow effects or gradient glows.
- STY-DP-02 [J][Major] — No saturated red/green that fails AA on dark.
- STY-DP-03 [J][Major] — No pure white large surfaces inside dark UI.
- STY-DP-04 [J][Major] — Data colors always paired with sign/arrow.

## Suggested Brand Settings (for Desi)
| Group | Suggestion |
|---|---|
| font-family | Inter / Geist / Manrope |
| radius button/text-field | 10–12 |
| radius card | 16 |
| border | 1 (neutral/800 on dark) |
| primary 500 | Must pass AA on neutral/900 background |
| Note | Semantic collection has Dark Mode; verify brand ramp in both modes |

## Taste kit (use it — this is what makes screens memorable)
**Typography.** Clean sans with tabular numbers; hero figures large and light-on-dark (Semibold, not Black); labels at ~65% white; max 4 sizes.

**Color proportion.** 80% layered near-black surfaces (3–4 elevations) · 15% greys · 5% one luminous accent for actions/live states; up/down colors tuned for dark.

**Hero compositions (pick one per screen, adapt with the DS):**
1. **Portfolio hero:** big balance with PnL chip and a subtle area chart behind it.
2. **Card showcase:** the physical/virtual card rendered with depth at the top.
3. **Command surface (web):** dense dark lists with a floating command bar.

**Signature moves (use exactly one per screen):**
- Big number over a soft glow area chart in the accent color.
- Card render with realistic light and slight tilt.
- Hairline borders instead of shadows; one luminous accent.

**Imagery / art direction.** Product renders (cards, devices) with rim light on dark; abstract light trails; avoid bright photos. Sources and placement: `visual-assets`.

**Real products to study (visual moves only, never copy):**
- Revolut — https://www.revolut.com
- Robinhood — https://robinhood.com
- Tesla app — https://www.tesla.com
- Raycast — https://www.raycast.com
- Vercel — https://vercel.com

**Avoid.** Pure black with pure white text (harsh), neon everywhere, glassmorphism on content, red/green-only signals.

**Explore lane — the BOLD direction.** Full-bleed 3D card or object hero with the balance set at display scale beneath it.
