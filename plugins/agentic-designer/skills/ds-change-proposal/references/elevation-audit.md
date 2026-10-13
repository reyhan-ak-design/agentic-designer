# Elevation / drop shadow audit

1. **Inventory (read-only, one call):** all local effect styles — name, effects (type, color with
   bound variable or hex, offset, blur, spread), and usage count per style if obtainable.
2. **Check:**
   - A clear, small scale (typically 0–4 levels: none · raised · floating · overlay · modal) with
     monotonic increase in offset/blur and consistent light direction (y-offset only, x = 0).
   - Shadow colors bound to variables (neutral with alpha), not raw hex; dark-mode behavior defined
     (usually lower opacity or replaced by surface lightness/border).
   - Names describe role/level, not values (`elevation/2`, not `shadow-8-24`).
   - No near-duplicates (two styles within ~10% of each other).
   - Layering: two-layer shadows (ambient + key) only if the whole scale uses them.
   - Usage fits the style packs: modern-minimal and corporate use shadows only for floating layers.
3. **Propose:** the target scale with exact values, mapping old → new styles, and the migration impact
   (components using each style). Changes to existing styles are executed only after Manager approval.
