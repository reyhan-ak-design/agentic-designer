# Filling component slots & layout recipes (designers read before building)

## Exact property names
Component property keys are stored in the manifest **exactly as Figma returns them** — including prefixes such as
`➜ ` and the `#id` suffix (e.g. `➜ Label#2:0`). Never retype or "clean" a name; copy it from the manifest.
In scripts, match by the part before `#` only when setting props through `helpers.js` (it does this for you).

## Slots (instance-swap / slot areas)
1. Prefer the component's **slot property** (INSTANCE_SWAP or a native Slot) — set it with `instance.setProperties({ '<exact key>': <componentId> })`.
2. If the slot is a frame inside the instance meant to receive content: enable it via its BOOLEAN property, then
   `appendChild` your content into the slot frame, and set the slot and the content to **HUG** (vertical) so the
   instance grows with its content. Never detach the instance to fill a slot.
3. Mode-specific content (brand/theme): set the explicit variable mode on the **wrapper**, not on each child
   (`wrapper.setExplicitVariableModeForCollection(collection, modeId)` with the mode id from the manifest).

## Layout recipes
- **Dashboard (web 1440):** root frame auto-layout HORIZONTAL · sidebar = FIXED width, `layoutSizingVertical = FILL` ·
  main = FILL width, **HUG height** · root **HUG height with min-height = viewport** so the sidebar always runs to the
  bottom of the content (fixes "sidebar stops at 1080").
- **Mobile screen:** root VERTICAL, FIXED 390 width, HUG height (or FIXED 844 when a sticky CTA is used) · body
  VERTICAL with the spacing map · sticky CTA as the last child with `layoutPositioning = 'ABSOLUTE'` pinned bottom.
- **Card grids:** HORIZONTAL wrap with the DS gap token; cards FILL in their column, HUG height.
