---
name: domain-property
description: Domain Pack for property and real estate — listings, rent and buy, KPR/mortgage simulation, property management, developer sales apps, and kos/boarding. Use whenever a brief mentions property, real estate, rumah, apartemen, kos, rent, sewa, KPR, mortgage, listing, agent, or developer project.
---

# Domain Pack — Property
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Buyers/renters comparing many options over weeks; agents and owners managing listings.
- Decisions are high value and emotional; photos, location, and total cost dominate.

## Principles
1. Photos and location first; specs scannable; price always with context (per month, per m², total).
2. Filtering and saved searches are core, not extras.
3. Contact actions (chat, call, schedule visit) are always reachable.
4. Financing is simulated transparently (tenor, rate type, monthly installment).

## Patterns
- Listing card: photo carousel, price, key specs (LT/LB, bedrooms, bathrooms), location, badges only for real facts (verified, new).
- Map + list toggle; filter sheet with counts.
- Detail: gallery, price breakdown, specs table, facilities, map, agent card, similar listings.
- KPR calculator: price, down payment %, tenor, rate (fixed/floating period), monthly result with disclaimer.
- Visit scheduling with date/time slots.

## Regulatory UI implications
- KPR simulations labeled as estimates; bank terms decide final numbers.
- Clear distinction between listing price and total cost (BPHTB, notary fees) when shown.

## Data guide
- Areas: Depok, BSD City, Bekasi, Jakarta Selatan, Bandung. Prices: Rp750.000.000–Rp5.500.000.000; rent Rp3.500.000–Rp25.000.000/bulan.
- Specs: `LT 120 m² · LB 90 m² · 3 KT · 2 KM`. Certificates: SHM, HGB.

## Recommended styles
`style-modern-minimal`, `style-elegant`, `style-luxury` (premium developers).

## Checks
- PRP-01 [J][Blocker] — Price always states its unit (total, per month, per m²).
- PRP-02 [J][Major] — Primary contact action visible on listing detail without scrolling past the gallery.
- PRP-03 [J][Major] — Filters show active state and result count.
- PRP-04 [J][Major] — KPR results labeled as estimates with assumptions visible.
- PRP-05 [J][Major] — Photos handle missing/low-count cases (placeholder with message, not broken grid).

## Anti-patterns
Decorative badges on every card; hiding price behind "contact for price" by default; maps without list fallback.

## Notes for Desi
Photography-led: neutral UI, restrained accent; slightly larger card radius works well.
