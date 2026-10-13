---
name: brand-mode
description: Create a new brand in the design system (adds ONE mode to the Brand Settings collection, built from the base brand) or optimize an existing brand's values against the base — color ramps from one color (OKLCH, auto contrast checks), radii derived from the button radius, optional neutral ramp from a 500 color, font, HTML preview before anything touches Figma, dry-run first, rollback. Use for "/new-brand", "buat brand baru", "tambah brand", "/optimize-brand", "rapikan brand X".
---

# Brand modes (Brand Settings only)

**Hard limits:** write only to the Brand Settings collection (`02 Brand Settings…`), only to the ONE target mode
(the new brand, or the brand being optimized). Never touch the base brand, other brands, Semantic, or Primitive.
**Base brand = the `base` brand in your stored DS** (`ds-resolved.json`). Other brands are ignored as references.

Tools: `scripts/brand-tools.js` (Node, local) · `scripts/brand-apply.js` (use_figma, in the DS file). Data: `ds-knowledge/data/ds-resolved.json`.

## /new-brand
1. **Popup** (`AskUserQuestion`, Indonesian; brand name from $ARGUMENTS or ask in chat first):
   - "Warna primary?" → Masukkan hex (Other) · Ambil dari logo (upload) · Sarankan untukku
   - "Warna secondary?" → Masukkan hex (Other) · Sarankan pasangan · Tidak punya secondary
   - "Radius tombol (patokan radius lain)?" → 4 tajam · 8 lembut (Recommended) · 12 bulat · Pill (Full)
   - "Warna netral?" → Sama seperti sekarang (Recommended) · Ubah → masukkan warna **500** (Other)
   Font: default = base font; mention it in the plan table where the Manager can change it.
2. Write `answers.json` → `node brand-tools.js plan answers.json --out agentic-designer-work/_ds/brands/<slug>/`.
3. Show in chat (≤ 15 lines): primary/secondary anchor, the derived radius table, contrast checks, warnings. Give the
   path to `brand-preview.html` (palette + sample UI, Light and Dark). Offer fixes for any FAIL (darker 500, anchor shift).
4. After the Manager's yes: `brand-apply.js` with `MODE 'create'`, **`DRY_RUN = true` first** (names + aliases must resolve),
   then `DRY_RUN = false`. Verify `missing: 0` and the mode list. Rollback = `MODE 'rollback'` (only the mode this run created).
5. Log in `_ds/CHANGELOG.md`, update the stored DS knowledge (`/refresh-ds <slug> brand`), report in ≤ 6 bullets.

## /optimize-brand <brand>
1. `node brand-tools.js audit "<brand>" --out agentic-designer-work/_ds/brands/<slug>/audit.md` — ramp order and duplicates,
   contrast (button text, brand text, warning text, dark mode), numbers far from the base (< 0.5× or > 2×), radius family drift.
2. Present the table (token · now · finding · suggestion). Popup: "Terapkan saran mana?" (multiSelect, Recommended = the
   contrast and obvious-error rows). Some odd values may be intentional — never apply without the Manager's pick.
3. Apply the picked rows with `brand-apply.js` `MODE 'update'` on that brand only (dry run first), log, refresh knowledge.
