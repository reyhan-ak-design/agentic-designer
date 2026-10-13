---
name: style-modern-minimal
description: Style Pack "Modern Minimal" — the equipment designers and Desi use when a brief asks for a clean, modern, contemporary, digital-first, or "simple but premium" look (typical for digital banks, e-wallets, SaaS, modern consumer apps). Defines typography feel, color use, density, radius, elevation, iconography, imagery, motion, its own don'ts (STY-MM-xx), and suggested Brand Settings values. Use whenever a brief names modern, minimal, clean, simple, contemporary, or leaves style to the designer on a digital-first product.
---

# Style Pack — Modern Minimal

## Personality
Confident, calm, efficient. Content first; the interface steps back.
Think "a tool you trust", not "a poster you admire".

## Typography
- One family, geometric or neo-grotesque sans (e.g. Plus Jakarta Sans, Inter, Manrope, Geist).
- Contrast through size and weight, not through many styles: display/heading Semibold–Bold, body Regular, labels Medium.
- Numbers are the hero where money or data is involved: large, tabular, tight letter-spacing.
- Sentence case everywhere. No all-caps except tiny overlines (optional).

## Color
- Neutral canvas (white or neutral/25–50) carries 80–90% of the surface.
- One accent (brand primary) used only for the primary action, active states, and key highlights.
- Secondary color used sparingly or not at all on a single screen.
- Semantic colors only for meaning; tinted backgrounds (25–50) for status containers.
- Dark mode: true neutrals, not pure black; accent slightly lighter (400) for contrast.

## Density & spacing
- Generous but disciplined: 16 screen margin, 24–32 between sections, 8–12 inside groups.
- Group with whitespace first, dividers second, cards last.
- One primary action per screen, sticky at the bottom on mobile.

## Shape & elevation
- Radius: medium and consistent — components ~12, cards/sheets ~16–20, pills only for chips/tags.
- Elevation almost flat: borders (neutral/100–200) or subtle surface shifts instead of shadows.
  Shadows only for floating layers (sheets, dropdowns, toasts).

## Iconography & imagery
- One outline icon set, one stroke weight (1.5–2px), 20–24px.
- Icons only where they aid scanning or recognition.
- Imagery: real product visuals or none. Illustrations only if the brand owns a system.

## Motion
- Short and functional: 150–250ms, ease-out for entering, ease-in for leaving.
- Motion explains cause and effect (sheet rises from its trigger, value counts up once).
- No looping decorative animation.

## Visual recipes (component treatments)
- **Page:** neutral/25 background; cards white, radius from DS (≈12–16), no shadow, 1px neutral/100 border optional.
- **Header:** large title left-aligned on scroll-top, compact on scroll; actions as icon buttons (24 icon, 44 target).
- **List rows:** 56–64 tall, leading icon in 40 soft-tint circle, title Body L Semibold, meta Body S secondary, chevron only when it navigates.
- **Hero numbers:** Display S/H1, tight tracking, currency prefix secondary.
- **Buttons:** one filled primary, full-width sticky on mobile; secondary as outline or ghost.
- **Empty states:** small DS illustration or icon, one line title, one line explanation, one CTA.

## Density tiers (applies `layout-and-spacing`)
Comfortable. Mobile T1 12 · T2 24 · T3 32. Web sections 48. Tables 48 rows.

## Don'ts (reported via design-master-checklist section M)
- STY-MM-01 [J][Major] — No more than one accent color on a single screen.
- STY-MM-02 [J][Major] — No card-inside-card nesting.
- STY-MM-03 [J][Major] — No shadows on static, in-flow elements.
- STY-MM-04 [J][Major] — No more than 2 font weights in the body area of a screen (headings excluded).
- STY-MM-05 [J][Minor] — No dividers between items already separated by whitespace.
- STY-MM-06 [J][Minor] — No icon + label + chevron + badge stacked in one row unless each carries information.

## Suggested Brand Settings values (for Desi)
Map to Primitive aliases; pick the nearest existing primitive.

| Brand Settings group | Suggestion |
|---|---|
| `string/font-family/*` | One family for all roles (Plus Jakarta Sans / Inter / Manrope / Geist) |
| `string/font-weight/display-*`, `h1–h2` | Bold |
| `string/font-weight/h3–h6` | Semibold |
| `string/font-weight/body*` | Regular (Medium for emphasis) |
| `number/radius/button`, text-field | 12 |
| `number/radius/card`, sheet | 16–20 |
| `number/radius/tag`, chip | full (pill) |
| `number/height/button-large` / medium / small | 52 / 44 / 36 |
| `number/height/text-field` | 52 |
| `number/border/*` | 1 |
| `color/neutral/*` | Cool slate neutrals unless the brand is warm |

## Taste kit (use it — this is what makes screens memorable)
**Typography.** One neutral grotesk (DS font) in 2–3 weights; hero numbers at Display S–M (40–48) Bold with −2% tracking; labels Regular in secondary; max 4 sizes. Scale contrast carries hierarchy, not color.

**Color proportion.** 70% neutral surfaces · 20% text greys · 10% brand accent (actions, active states, one hero tint). One accent only.

**Hero compositions (pick one per screen, adapt with the DS):**
1. **Number hero:** big figure top-left, small label above, one quiet secondary line below; content on white cards over a neutral-25 page.
2. **Focused card:** a single brand-tinted card holds the key object (balance, plan, order) with 2 quick actions inside; everything else is a flat list.
3. **Search-first:** large title → prominent search field → chips → results; generous top whitespace.

**Signature moves (use exactly one per screen):**
- Display-scale key number with a muted currency prefix (`Rp` at 55% size, secondary color).
- One brand-tinted surface on an otherwise neutral screen.
- Hairline dividers inset from the text edge; icons in soft 40px tinted circles.

**Imagery / art direction.** Product UI, crisp object photos on plain backgrounds, or none. Neutral light, lots of negative space; no busy stock scenes. Sources and placement: `visual-assets`.

**Real products to study (visual moves only, never copy):**
- Linear — https://linear.app
- Stripe Dashboard — https://stripe.com
- Bank Jago — https://www.jago.com
- Monzo — https://monzo.com
- Things 3 — https://culturedcode.com/things/

**Avoid.** Grey-on-grey everything (no accent), five equal-weight cards, centered hero on every screen, drop shadows on every card, generic 3D blobs.

**Explore lane — the BOLD direction.** Push scale: hero at 56 with a full-width brand field; one oversized icon or number as the signature.
