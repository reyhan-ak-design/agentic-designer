---
name: domain-retail
description: Domain Pack for retail and brand commerce — retail/brand apps, loyalty and membership, POS, store locators, in-store pickup, catalog, promo, and omnichannel. Use whenever a brief mentions retail, ritel, store, toko, minimarket, supermarket, loyalty, member, poin, POS, kasir, catalog, katalog, promo, or omnichannel.
---

# Domain Pack — Retail
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Shoppers and members (points, vouchers, nearest store); store staff on POS or handheld devices.

## Principles
1. Membership value is visible: points, tier, next reward.
2. Promo information is precise: period, terms, where valid (online/store).
3. Online and store experiences connect (stock per store, pickup).
4. Staff tools prioritize speed and error prevention.

## Patterns
- Member card with barcode/QR, points, tier progress.
- Voucher wallet with status (active, used, expired) and terms.
- Store locator: map/list, hours, stock availability.
- Catalog with categories and promo labels; pickup/delivery choice.
- POS: product search/scan, cart, discounts, payment split, receipt.

## Regulatory UI implications
- Promo terms and periods displayed; price labels include tax where required.

## Data guide
- Stores: "Cabang Margonda, Depok · Buka 08.00–22.00". Points `2.450 poin · 550 lagi ke Gold`.

## Recommended styles
`style-modern-minimal`, `style-bold-editorial`, `style-playful`, `style-luxury` (premium retail).

## Checks
- RTL-01 [J][Major] — Member barcode/QR reachable in ≤ 2 taps and bright enough to scan.
- RTL-02 [J][Blocker] — Promo shows period, terms, and channel validity.
- RTL-03 [J][Major] — Store stock/availability shown where pickup exists.
- RTL-04 [J][Major] — POS flows prevent common errors (void confirmation, quantity limits).
- RTL-05 [J][Major] — Voucher states (active/used/expired) distinct.

## Anti-patterns
Promo banners without terms; member card buried in profile; dense POS screens with small targets.

## Notes for Desi
Retail brands are bold: allow secondary ramp for promo surfaces; keep error distinct from brand red.
