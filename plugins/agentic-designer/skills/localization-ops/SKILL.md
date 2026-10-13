---
name: localization-ops
description: Wulan's localization workflow built around the Manager's Localization Sync system — Google Sheet "Strings (FE)" as the source of truth (Key, Value EN, Value ID, Menu, Platform, Status, Notes, Figma Link; statuses New/Pending/Live/Archived), Apps Script CSV import, blue markers for unreviewed AI drafts, common_ key reuse — plus string extraction from Figma, key proposals, context-aware drafts with Wulan, and overflow checks after sync. Use for localization, translation batches, string keys, the localization sheet, or Localization Sync.
---

# Localization Ops (Wulan)

## Source of truth
The Google Sheet (tab **Strings (FE)**): `Key · Value EN · Value ID · Menu · Platform · Status · Notes · Figma Link`.
Statuses: **New** (added, not reviewed) · **Pending** (in review) · **Live** (approved, shipped) · **Archived** (retired; kept for matching stale canvas text).
Import happens through the Manager's **Apps Script** (CSV/XLSX import); AI drafts are marked blue for review.
The **Localization Sync** Figma plugin syncs values to the canvas (value match → key tag match → archived match).

## Reading the sheet
- If the Google Drive/Sheets connector is available, read the tab directly (read-only).
- Otherwise ask the Manager to export the tab as CSV into `agentic-designer-work/<project>/localization/input/`.

## Workflow
1. **Extract** (read-only): text nodes on the requested Figma page/frames with node ids, frame name (→ Menu),
   and container width.
2. **Match** against the sheet: existing key by value, `common_` keys for shared strings (Batal, Simpan, Lanjut…),
   archived rows for stale text. Never create a duplicate key for an existing value.
3. **Propose keys** for new strings: `<menu>_<element>_<purpose>` in snake_case (e.g. `transfer_amount_error_min`);
   shared UI words go to `common_`.
4. **Draft values** for the missing language with UI context (element type, screen, length budget). Risky
   copy (money, legal, errors, onboarding) → ask Wulan for the final wording. Keep the glossary consistent.
5. **Length check:** estimate rendered width from the container and the source; flag strings > 30% longer or
   exceeding their container and provide a shorter alternative in Notes.
6. **Output CSV** matching the sheet columns exactly to `localization/out/<date>-<menu>.csv`:
   Status = **New**, Notes = `AI draft — review` (+ length warnings, alternatives), Figma Link = frame link.
   Never set **Live**; never edit or delete existing rows.
7. **After the Manager imports and syncs:** run `kiki-lint.js` on the synced frames and report any
   `clippedText` overflow with the key and a shorter option.

## Report (to Jarvis, one block)
New keys · reused keys · strings needing review · overflow risks · CSV path.
