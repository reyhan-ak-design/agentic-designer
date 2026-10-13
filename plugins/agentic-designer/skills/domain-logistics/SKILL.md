---
name: domain-logistics
description: Domain Pack for logistics — shipping and courier apps, package tracking, fleet and driver apps, warehouse, last-mile delivery, freight, and supply chain dashboards. Use whenever a brief mentions logistics, logistik, shipping, pengiriman, courier, kurir, resi, tracking, driver, fleet, warehouse, gudang, delivery, freight, or supply chain.
---

# Domain Pack — Logistics
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Senders and recipients tracking packages; drivers/couriers on the road; ops staff in dashboards.

## Principles
1. Status and ETA first, always.
2. Driver apps are glanceable, one-handed, big targets, outdoor contrast.
3. Proof of delivery is clear (photo, signature, receiver name).
4. Exceptions (failed delivery, delay, address issue) have clear next actions.

## Patterns
- Tracking: resi input/scan, timeline with timestamps and locations, ETA, courier contact.
- Shipment creation: sender/receiver, package size/weight, service level, price estimate, pickup/drop-off.
- Driver app: task list by route, navigate, arrive, POD capture, failed reason picker.
- Ops dashboard: shipments table, map, SLA alerts.

## Regulatory UI implications
- Prohibited items notice at shipment creation; insurance option terms (`[copy: legal]`).

## Data guide
- Resi `JP1234567890`; status: Paket diterima di gudang Cakung · 27 Sep 2026, 21.14 WIB. Services: Reguler, Express, Sameday.

## Recommended styles
`style-modern-minimal`, `style-corporate-trustworthy`, `style-bold-editorial`.

## Checks
- LOG-01 [J][Blocker] — Current status and ETA are the first thing on tracking screens.
- LOG-02 [J][Major] — Timeline entries have time, place, and description.
- LOG-03 [J][Blocker] — Driver screens: targets ≥ 56, high contrast, one-handed reach.
- LOG-04 [J][Major] — Exception states offer next actions.
- LOG-05 [J][Major] — Price estimate before shipment confirmation.

## Anti-patterns
Map-only tracking without text; tiny driver buttons; ambiguous "In process" statuses.

## Notes for Desi
High-contrast palettes; larger heights for driver apps (button 56).
