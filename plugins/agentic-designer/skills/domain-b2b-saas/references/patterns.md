# B2B SaaS, back-office & internal-tool patterns (deep)
- App shell: sidebar (grouped, collapsible, current highlighted), top bar (global search ⌘K, notifications, org/workspace switcher, profile), breadcrumb for deep pages.
- List pages: page header (title, count, primary action), toolbar (search, filter chips with count, saved views, column settings, export), table (sticky header, sortable, selectable rows, row actions menu, inline status chips), pagination with totals, bulk-action bar on selection.
- Detail pages: header (name, status, key actions), summary panel (key fields), tabs (Overview, Activity, Related, Settings), activity log with actor/time, side panel for quick view instead of full navigation.
- Forms: sectioned (T3 between sections), inline validation, draft saving, unsaved-changes guard, dangerous actions in a separate "Danger zone".
- Approvals (maker-checker): request → approver chain visualization → approve/reject with comment → audit; SLA timers; delegation.
- Dashboards: KPI row (3–5), trend chart with period selector and comparison, top lists, alerts panel; drill-down to filtered tables.
- Roles & permissions: role matrix, invite users, pending invites, view-only states, "request access".
- Data states: loading skeleton rows, empty (first-use with setup CTA), no results (clear filters), error (retry), partial/stale (last synced time).
- Density: rows 48 default / 40 dense / 32 opt-in; 14px cell text; numbers right-aligned tabular.

## Data tables — rules (practitioner consensus)
- Left-align text; **right-align numbers and currency**; header alignment matches its column; tabular figures on.
- No vertical borders; subtle horizontal dividers or zebra in dense mode; frozen header (and first column when scrolling sideways).
- 6–8 default columns, the rest behind a column picker; density toggle (comfortable / compact).
- Filters above the table with active-filter chips; row actions in a trailing menu; bulk bar on selection.
- KPI cards: value → label → delta, delta colored by semantic tokens only.
- Remove separators that spacing or surface contrast can replace (audit borders per screen).
- One primary action per view.
