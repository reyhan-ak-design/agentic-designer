# Platform density — web forms and back-office dashboards

## Web app & forms
- Page: 12-column fluid grid, 24 gutters; page max width 1200–1440 for apps; reading/form column capped independently.
- Reading column ≤ 75 characters (~640–720px at 16px).
- **Forms are single-column.** Only tightly related pairs share a row (first/last name, city/postcode, expiry/CVV).
- Form column 480–640px on desktop even inside a wide page. Empty space beside a well-sized form is correct; stretched inputs are not.
- Field width matches expected input (postcode, OTP, CVV narrow; name/email one shared width).
- Spacing: T3 (32–48) between form sections · T2 (16–24) between fields · T0 (4–8) label↔input.
- Primary action at the end of the form, left-aligned with the fields (or right in dialogs, consistently).
- Hover, focus, active, disabled states for every interactive element.
- Breakpoints to design: 1440 (default), 1280, 1024, and 375 when the brief says responsive.

## Back-office dashboards & data tables
| Parameter | Value |
|---|---|
| Row heights | 32 compact (opt-in) · **40 dense ops** · **48 default** · 64 two-line only |
| Header row | same height as body rows; 14 Semibold |
| Cell text | 14 Regular; numbers right-aligned, tabular figures, consistent decimals |
| Cell horizontal padding | 16 (12 in compact) |
| Toolbar above table | 48 with 48/64 rows; 40 with 32/40 rows |
| Card padding | 16 mobile, 24 desktop |
| Page padding (content area) | 24–32 |
| Section gap | 24–32 |

Composition:
- KPI row: 3–5 cards max. Each: label (12–14 secondary) → hero number (24–32, tabular) → delta/comparison (secondary with sign + color + arrow).
- Tables are tight; KPI and summary areas are loose ("tight for lots of information, loose for focused content").
- Never build tables out of nested cards. Never put a hero banner in admin tools.
- Filters as a toolbar row with visible active state and result count; bulk actions appear on selection.
- Every table: loading (skeleton rows), empty, no-results, error, and 50+ row states.
- Sidebar nav 240–280 wide (collapsed 64–72); top bar 56–64.
