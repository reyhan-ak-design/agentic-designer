---
name: domain-insurance
description: Domain Pack for insurance products — health, life, vehicle, travel, property and micro-insurance, policy management, claims, and embedded insurance inside other apps — Indonesian market by default. Use whenever a brief mentions insurance, asuransi, policy, premium, coverage, claim, underwriting, benefit, polis, or insurtech, and when Desi sets up a brand for an insurer.
---

# Domain Pack — Insurance
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- People buying protection they hope never to use; low interest, high anxiety at claim time.
- Two moments matter: **buying** (understand what is covered) and **claiming** (fast, guided, transparent).
- Many buy through agents, banks, or embedded offers in e-commerce/ride-hailing apps.

## Principles
1. Coverage in plain language: what is covered, what is not, how much, for how long.
2. Price is always "per period" with the total shown (e.g. Rp150.000/bulan · Rp1.800.000/tahun).
3. Claims are a guided checklist with visible progress and expected time.
4. Exclusions are never hidden; they are one tap away from the benefit they limit.

## Patterns
- Product comparison: 2–3 plans side by side, recommended plan marked with a reason.
- Quote flow: few questions → instant price → adjust coverage → review → pay.
- Policy card: policy number (masked partly), status, period, insured person, quick actions (claim, e-card, renew).
- Claim flow: incident type → documents (camera upload with examples) → review → submit → tracker (submitted, verified, approved/rejected, paid).
- Renewal reminders and grace-period states.

## Regulatory UI implications (design-level)
- Insurer supervised by OJK; disclosure slot on product and policy screens (`[copy: legal]`).
- Summary of product information (RIPLAY-style summary) available before purchase.
- Free-look/cancellation period and waiting periods shown where applicable.
- Explicit consent for health data; PDP law (UU 27/2022) consent patterns.

## Data guide
- Plans: Basic / Plus / Premier; premiums Rp49.000–Rp1.500.000/bulan; sum insured Rp50.000.000–Rp2.000.000.000.
- Policy number: `POL-2026-0048•••21`.
- Claim IDs: `CLM-26092701`; statuses in Indonesian: Diajukan, Diverifikasi, Disetujui, Ditolak, Dibayarkan.

## Recommended styles
`style-corporate-trustworthy`, `style-modern-minimal`, `style-senior-friendly`.

## Checks
- INS-01 [J][Blocker] — Premium shows period and total cost before purchase.
- INS-02 [J][Blocker] — Covered vs not covered is visible before purchase.
- INS-03 [J][Major] — Claim flow shows required documents upfront with examples.
- INS-04 [J][Major] — Claim tracker shows current step, next step, and expected time.
- INS-05 [J][Major] — Waiting period, free-look period, and exclusions are reachable from the benefit they affect.
- INS-06 [M][Major] — Policy and ID numbers masked by default.
- INS-07 [J][Major] — Disclosure slot present (`[copy: legal]`).

## Anti-patterns
Fine-print exclusions below the fold; fear-based imagery; claim forms asking for everything at once; "Contact agent" as the only path.

## Notes for Desi
Trust-first palettes (blue, teal, green, deep navy); avoid alarming reds as primary; generous radius softens a serious topic.
