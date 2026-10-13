---
name: rename-screens
description: Screen naming convention flow.context.state[.variant][.device] — one ID shared by designers, developers, and string keys (screen_element_variant). Jarvis names frames this way while building; /rename-screens renames existing frames (selected frames or a section) from labels, current names, and screen content, with a proposal table and confirmation first. Use for "rename screens", "rapikan nama layar", naming before handoff.
---

# Screen naming

## Grammar
`flow.context.state[.variant][.device]` — lowercase a–z 0–9 · `.` between segments · `-` inside a segment ·
3–5 segments · ≤ 48 characters · English words only (even for Indonesian copy) · never start with `.` or `_`.

| Segment | Meaning | Examples |
|---|---|---|
| flow | Journey or main page | home, portfolio, connect, onboarding, ekyc, buy, sell, transfer, topup, history, profile, settings |
| context | Object, feature, or partner in focus (short noun) | wallet, pin, ktp, card, domain |
| state | Step or status (list below only) | success, rejected, in-review |
| variant (optional) | Alternative or sub-case | alt, alt-2, zero-balance |
| device (optional) | **Only unusual devices**, and only when the Manager chooses it | landscape, tablet, fold-cover, fold-inner, flip, duo, duo-split |

States — steps: intro, form, summary, confirm, otp, pin, detail, list · statuses: default, empty, loading, partial,
processing, in-review, pending, success, failed, rejected, expired, error, offline, locked, maintenance.
`rejected` = decision by a reviewer/partner; `failed` = technical or transaction failure; `partial` = some data loaded, some failed.

Project flow/context words live in `PROJECT.md` → "Naming vocabulary" (add new flows there after the Manager approves).

## Signals → state (English + Indonesian copy)
success: berhasil, aktif, done · rejected: ditolak, tidak dapat, not approved · failed: gagal, terjadi kesalahan ·
in-review: sedang ditinjau/diverifikasi · processing: sedang diproses, progress steps · loading: skeleton/spinner only ·
pending: menunggu, waiting for · empty: belum ada, no … yet · expired: kedaluwarsa · default: normal content.

## Devices
Normal phone portrait → **no device segment**. Frames for landscape, tablet, foldable, flip, or dual-screen → ask once with a
popup (`AskUserQuestion`): "Tambahkan nama perangkat di nama layar?" → **Tidak — catat perangkat di nama Section** (Recommended)
· **Ya — tambahkan segmen perangkat** (`home.wallet.default.fold-inner`). Sections are then named `<platform> · <device>`.

## /rename-screens workflow
1. Scope: selected frames, or every top-level frame in a selected section (incl. nested sections). Skip text, connectors,
   stickies, annotation/label instances, groups, components, sets, instances. Names starting with `.`/`_` → "template?".
   Nothing selected → ask the Manager to select, stop.
2. Read each frame (current name, flow label above it, headline, status chips, CTA) with ONE read script.
   Decide by: flow label (an "Alt." label sets variant `alt`) → meaningful current name → content. Composite screens: name
   what this frame documents. Unclear flow/context → put `?` and mark "Needs input". Never guess.
3. Proposal table — rename nothing yet:
   | # | Current name | Label | New name | String key prefix | Confidence | Why |
   String key prefix = new name with `.` and `-` → `_` (connect.wallet.success → connect_wallet_success). High = label and
   content agree · Medium = one signal · Low = Needs input.
4. Conflicts: duplicates in the batch → `.alt`, `.alt-2`; a name already used elsewhere in the same section → flag.
5. Popup: "Terapkan?" → Semua · High saja (Recommended) · Edit dulu. If run with "apply": apply High + Medium, list Low.
6. Rename frame names only (never layers, labels, components, prototype links). Report: renamed X · skipped Y (why) ·
   needs input Z · Ctrl/Cmd+Z undoes the batch.

## While building (Jarvis)
Name every new screen frame by this grammar at creation time; lint (`kiki-lint.js` → `badName`) flags anything else.
Wulan uses the string key prefix for copy keys (`<prefix>_<element>_<variant>`).
