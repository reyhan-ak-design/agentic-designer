---
name: domain-ecommerce
description: Domain Pack for e-commerce and marketplaces — product discovery, search, PDP, cart, checkout, promos and vouchers, order tracking, returns, seller centers, and social commerce. Use whenever a brief mentions e-commerce, marketplace, toko online, online shop, product, cart, keranjang, checkout, voucher, promo, flash sale, order, pesanan, shipping, seller, or live shopping.
---

# Domain Pack — E-commerce & Marketplace
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Browsers hunting deals and buyers with intent; sellers managing stores.
- Trained by major Indonesian marketplaces: vouchers, free shipping, COD, ratings, chat with seller.

## Principles
1. Price clarity: original, discount, final, and what the voucher changed.
2. Trust signals are real: ratings with counts, sold count, seller status, reviews with photos.
3. Checkout is fast and predictable: address, shipping, payment, total — no surprises.
4. Post-purchase matters: tracking, receipts, returns.

## Patterns
- Product card: image, name (2 lines), price (+ strike-through if discount), rating · sold, location/shipping badge if real.
- Search with suggestions, recent, filters (price, rating, location, shipping), sort.
- PDP: gallery, price block, variants selector with stock, shipping estimate, seller card, reviews, sticky add-to-cart / buy-now.
- Cart grouped by seller with select-all, voucher per seller and platform.
- Checkout: address → shipping per seller → payment → voucher → total breakdown → pay.
- Order tracking timeline with courier and resi.

## Regulatory UI implications
- Final price including fees shown before payment; clear return/refund policy.
- Consumer data consent and marketing opt-in not pre-checked.

## Data guide
- Products: "Sepatu Lari Pria Ringan Size 42", Rp349.000 → Rp279.000 (-20%); ★4,8 · 2,1rb terjual.
- Couriers: JNE, J&T, SiCepat, AnterAja; resi `JP1234567890`.

## Recommended styles
`style-modern-minimal`, `style-bold-editorial` (promo/brand stores), `style-luxury` (premium brands), `style-playful`.

## Checks
- ECM-01 [J][Blocker] — Total breakdown (items, shipping, fees, discounts) before payment.
- ECM-02 [J][Blocker] — Variant selection shows stock and blocks invalid combinations.
- ECM-03 [J][Major] — Discounted prices show original and final clearly.
- ECM-04 [J][Major] — Add-to-cart/buy action sticky on PDP mobile.
- ECM-05 [J][Major] — Empty cart, out-of-stock, and voucher-invalid states designed.
- ECM-06 [J][Major] — Order tracking shows courier, resi, and timeline.

## Anti-patterns
Fake scarcity timers; badges on every card; hiding service fees until the last step; infinite banner carousels above search.

## Notes for Desi
Brand accent for CTAs and price; strong error/warning ramps for stock and voucher messaging.
