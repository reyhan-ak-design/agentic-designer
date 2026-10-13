---
name: domain-fnb
description: Domain Pack for food and beverage — restaurant and café apps, food ordering and delivery, menus, table ordering (QR), reservations, kitchen displays, and F&B loyalty. Use whenever a brief mentions F&B, food, makanan, minuman, restaurant, restoran, cafe, kopi, menu, order, delivery, pesan antar, reservation, QR table order, or kitchen.
---

# Domain Pack — Food & Beverage
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Hungry people who want to order fast; staff processing orders under pressure.

## Principles
1. Food photos and prices sell; customization is clear and priced.
2. Order status is live and honest (preparing, ready, on the way).
3. Repeat orders are one tap.
4. Dietary and halal information is visible where relevant.

## Patterns
- Menu: categories tabs, item card (photo, name, price, tags like pedas/best seller only if real).
- Item customization sheet: size, sugar/ice level, toppings with price delta, notes, quantity.
- Cart with outlet, order type (dine-in, takeaway, delivery), time estimate.
- Order tracker; pickup code.
- QR table ordering: table number confirmed, bill split.

## Regulatory UI implications
- Halal certification (BPJPH) labels only when certified; allergen info when provided.
- Prices include tax/service clearly (PB1/service charge).

## Data guide
- Items: "Es Kopi Susu Gula Aren" Rp22.000; "Nasi Goreng Kampung" Rp35.000. Options: Less sugar, Extra shot +Rp6.000.

## Recommended styles
`style-playful`, `style-bold-editorial`, `style-elegant` (fine dining), `style-modern-minimal`.

## Checks
- FNB-01 [J][Blocker] — Customization price deltas shown before add to cart.
- FNB-02 [J][Blocker] — Total including tax/service before payment.
- FNB-03 [J][Major] — Order status live with estimate.
- FNB-04 [J][Major] — Out-of-stock items and outlet-closed states designed.
- FNB-05 [J][Major] — Halal/allergen info only when data exists; never implied.

## Anti-patterns
Menu without photos where competitors have them; hidden service charges; tiny option chips.

## Notes for Desi
Appetizing warm accents; photography-first; slightly larger radius for friendliness.
