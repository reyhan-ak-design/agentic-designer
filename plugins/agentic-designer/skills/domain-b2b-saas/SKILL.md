---
name: domain-b2b-saas
description: Domain Pack for B2B SaaS, dashboards, back-office, admin panels, CMS, CRM/ERP, and internal company tools (HR, approvals, operations). Use whenever a brief mentions dashboard, back office, admin, CMS, portal, internal tool, SaaS, CRM, ERP, approval matrix, workflow, data table, reporting, or enterprise web app.
---

# Domain Pack — B2B SaaS & Internal Tools
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Operators who use the tool for hours daily; power users who value speed and density.
- Admins configuring roles and permissions; managers reading reports.

## Principles
1. Efficiency over first impressions: dense but ordered, keyboard-friendly.
2. Tables are the product: sorting, filtering, bulk actions, column control, pagination.
3. Roles and permissions shape what is visible; disabled vs hidden is a deliberate choice.
4. Every destructive or bulk action is confirmable and, where possible, undoable.

## Patterns
- Layout: sidebar nav + top bar (search, notifications, profile) + page header (title, primary action) + content.
- Data table: sticky header, column sort, filters as chips, bulk select, row actions menu, empty and no-results states.
- Detail page / side panel for records; tabs for sub-sections; activity log.
- Forms in sections with inline validation; long forms in steps.
- Approval flows: status chips, approver chain, comments, audit trail.
- Dashboards: KPI row, charts with clear time range, drill-down to tables.

## Regulatory UI implications
- Audit trail for changes in regulated clients (finance, health, government).
- Role-based access visible in UI (who can see/edit).

## Data guide
- Companies: PT Maju Bersama Sejahtera, CV Sinar Jaya. Users with roles (Maker, Checker, Approver, Admin).
- Tables with 20–50 realistic rows, mixed statuses, one very long value per column for edge testing.
- Dates `27/09/2026 14:32`; IDs `TRX-000482`.

## Recommended styles
`style-corporate-trustworthy`, `style-modern-minimal`, `style-dark-premium` (monitoring tools).

## Checks
- B2B-01 [J][Blocker] — Tables have sort, filter, empty, loading, and no-results states.
- B2B-02 [J][Blocker] — Destructive and bulk actions have confirmation with count ("Hapus 12 data?").
- B2B-03 [J][Major] — Page has one clear primary action in the header.
- B2B-04 [J][Major] — Web breakpoints: 1440 designed; 1280 and 1024 do not break layout.
- B2B-05 [J][Major] — Role-dependent states (view-only, no access) designed where roles exist.
- B2B-06 [J][Major] — Hover/focus/selected states on table rows and controls.

## Anti-patterns
Card grids where a table is needed; hero banners in admin tools; pagination without totals; charts without time range.

## Density (see `layout-and-spacing/references/platform-density.md`)
Rows 48 default / 40 dense ops / 32 opt-in; header same height, 14 Semibold; cell text 14; numbers right-aligned tabular;
card padding 24 desktop; page padding 24–32; KPI row 3–5 cards; form column 480–640.

## Notes for Desi
Smaller component heights (button 36–40, table rows 44–52), radius 6–8, neutral-dominant palettes.
