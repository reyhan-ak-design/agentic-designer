---
name: ds-code-kit
description: Desi's DS Code Kit — turns a Figma design system into code-ready assets for prototypes (tokens.css with real resolved values per brand and theme, role map, kit.css components that mirror the DS anatomy, icon set, DESIGN.md link) so prototypes built without a Figma design still look like the product, not generic AI UI. Use before the first prototype for a DS or brand, when the DS changes, or when Pandu reports a missing token or component.
---

# DS Code Kit (Desi)

Output: `agentic-designer-work/_kit/<ds-slug>-<brand>/` → `tokens.css`, `kit.css`, `kit-map.json`, `ICONS.md`.
Built once per DS × brand; reused by every prototype.

## Steps
1. **Extract real values (read-only, in the DS file):** run `scripts/kit-extract.js` with `BRAND_MODE`, `THEME_MODE='Light'`,
   `PLATFORM_MODE='Mobile'` (or `Desktop` for web), `SECTION='vars'`, paging `OFFSET += LIMIT` until `done`. Save the pages as
   `light.json`. Repeat with `THEME_MODE='Dark'` → `dark.json` (only if the product ships dark mode). Run `SECTION='styles'` once → `styles.json`.
2. **Map roles:** copy `templates/kit-map.json` and point each role to the DS token that plays it (primary action, surfaces,
   text levels, borders, semantic colors, spacing steps, radii, shadows, motion). Roles are the only thing `kit.css` uses.
3. **Build:** `node scripts/build-tokens.js --light light.json --dark dark.json --styles styles.json --map kit-map.json --out <kit>/tokens.css`.
   Fix every "role pointing to a token not in the export" warning before continuing.
4. **Components:** copy `templates/kit.css`. Adjust only anatomy constants that differ from the DS components
   (button height/radius, input height, list row height, sheet radius, tab bar) — read them from the DS components once.
   Never add colors or spacing literals; use roles.
5. **Icons:** write `ICONS.md` with the project's single icon set (Phosphor / Lucide / Solar) and the CDN tag to use.
6. Tell Jarvis the kit path. Record it in `PROJECT.md`.

## Rules
- Values come from the DS, never invented. If the DS lacks a token a prototype needs, propose it (`ds-change-proposal`);
  meanwhile map the role to the closest existing token and note it in chat, not in the kit.
- Same DESIGN.md Don'ts apply to prototypes.
