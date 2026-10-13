---
name: domain-telco
description: Domain Pack for telecommunications and utilities — mobile operator apps, data/pulsa packages, top up, prepaid/postpaid billing, home internet (ISP), SIM registration, and utility bills (PLN, PDAM). Use whenever a brief mentions telco, operator, provider, pulsa, paket data, kuota, internet, ISP, SIM, eSIM, billing, tagihan, PLN, token listrik, or PDAM.
---

# Domain Pack — Telco & Utilities
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Frequent, quick sessions: check remaining quota, buy a package, pay a bill.
- Price-sensitive; compare packages by quota, validity, and price.

## Principles
1. Remaining balance/quota and expiry are the home screen hero.
2. Packages are comparable at a glance: quota, validity, price, main benefits.
3. Purchase in ≤ 3 taps for repeat buyers.
4. Usage is explained, not just displayed (what consumed my quota).

## Patterns
- Quota dashboard: rings or bars per quota type with numbers and expiry.
- Package list with filter (daily, weekly, monthly), recommended/last-bought first.
- Checkout with payment methods (balance/pulsa, e-wallet, VA, card).
- Bill summary (postpaid/ISP): period, amount, due date, breakdown, autopay.
- Token PLN: meter number, nominal, token result with copy action.

## Regulatory UI implications
- Package terms (validity, fair usage, area limits) visible before purchase.
- SIM registration flows use NIK/KK with consent and masking.

## Data guide
- Numbers: `0812 •••• 7890`. Quota: `12,4 GB dari 30 GB · berlaku s.d. 15 Okt 2026`.
- Packages: 7 hari 5 GB Rp25.000; 30 hari 30 GB Rp85.000.
- PLN meter: `5412 •••• 3301`; token nominal Rp20.000–Rp1.000.000.

## Recommended styles
`style-modern-minimal`, `style-playful` (youth brands), `style-bold-editorial` (promo-heavy brands).

## Checks
- TEL-01 [J][Blocker] — Package quota, validity, and price all visible on the card.
- TEL-02 [J][Major] — Remaining quota shows number + unit + expiry, not only a chart.
- TEL-03 [J][Major] — Repeat purchase path ≤ 3 taps.
- TEL-04 [J][Major] — Package terms reachable before purchase.
- TEL-05 [J][Major] — Token/voucher results copyable and saved to history.

## Anti-patterns
Promo banners pushing the quota status below the fold; fake urgency timers; unreadable package cards stuffed with badges.

## Notes for Desi
Operators have strong brand colors — keep accent use disciplined; tabular numerals matter for quota.
