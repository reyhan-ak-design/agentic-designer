---
name: domain-finance
description: Domain Pack for finance products — banking, digital banks, e-wallets, payments (QRIS, BI-FAST, virtual accounts, bills), lending and paylater, investing (mutual funds, stocks), and money security (PIN, biometrics, device binding, fraud) — focused on the Indonesian market by default. For crypto/digital-asset products also load domain-crypto. Gives designers the user expectations, trust patterns, regulatory UI implications, realistic data, and FIN-xx compliance checks for this domain. Use this skill whenever a brief's domain is finance, banking, fintech, e-wallet, payment, transfer, top up, QRIS, bills, loans, paylater, savings, investment, or crypto / digital asset — and whenever Desi sets up a brand for a finance product.
---

# Domain Pack — Finance
Deep sub-domain patterns: `references/fintech-patterns.md` (load the section you need).
Crypto / digital assets: `domain-crypto`.

Owner designer: **Jarvis**. Other designers may load this pack when a brief crosses into finance.

## Who the users are
- Mass-market Indonesian users on mid-range Android and iPhone; many are cautious with money apps.
- They judge trust in seconds: clarity of balance, fees, and "where is my money" matter more than visual novelty.
- Habits formed by leading local apps (m-banking, e-wallets, digital banks): PIN confirmation, receipt screens, QRIS, transfer to other banks via BI-FAST.

## Core principles
1. **Money is always explicit.** Show amount, fee, and total before the user commits.
2. **Every money movement is reviewable and confirmable.** Input → Review → Authenticate (PIN/biometric) → Result + receipt.
3. **Status is never ambiguous.** Success, pending, and failed look clearly different and say what happens next.
4. **Sensitive data is masked by default** with a deliberate reveal action.
5. **Calm over hype.** No confetti for routine transfers; celebrate milestones only when meaningful.

## Common patterns (prefer these)
- Transfer: recipient → amount → review → PIN → result → receipt (share/download).
- Amount input: large tabular numerals, `Rp` prefix, live thousands separator, balance and limits as helper text, quick-amount chips optional.
- Source of fund: row with account name, masked number, and balance; changed via bottom sheet.
- Scheduled / recurring transfer: toggle reveals date + frequency + end condition.
- History: grouped by date, amount signed and colored with a text/icon cue (not color alone), filters for date/type.
- Receipt: transaction ID, date-time with timezone (WIB/WITA/WIT), sender, recipient, amount, fee, total, status, share action.
- Errors specific to cause: insufficient balance, below minimum, above per-transaction limit, above daily limit, recipient invalid, service offline, timeout (show "we'll notify you" rather than "failed" when status is unknown).

## Regulatory UI implications (design-level, not legal advice)
- Regulated entity disclosure where the product requires it (e.g. "Terdaftar dan diawasi oleh OJK", LPS guarantee for bank deposits) — usually footer of onboarding, product pages, and receipts.
- Fees, interest, and penalties shown before commitment (lending/paylater: total repayment, tenor, due dates).
- Session timeout and re-authentication for sensitive actions.
- Consent screens for data sharing and terms are explicit, not pre-ticked.
- Digital assets: prices are volatile and real-time → show last-updated time, price change with sign + color + arrow, and a risk statement before first purchase. Digital asset trading in Indonesia is supervised by OJK (transferred from Bappebti in January 2025); follow the client's legal copy.
- Final legal text is always provided by the client; designers mark it `[copy: legal]` for Wulan and the client.

## Realistic data guide
- Currency: `Rp1.250.000` (no space, dot thousands, no decimals for IDR). Negative: `-Rp50.000`.
- Dates: `27 Sep 2026, 14:32 WIB`.
- Names: Siti Nurhaliza, Budi Santoso, Dev Pratama, Dewi Lestari, Rizky Maulana, Putri Ayu Wulandari (include one long name for edge testing).
- Banks: BCA, Mandiri, BRI, BNI, BSI, CIMB Niaga, Permata, Bank Jago, SeaBank. Use the client's own bank name for "own account".
- Account numbers masked: `•••• 4417`; e-wallet phone masked: `0812 •••• 7890`.
- Typical amounts: transfer 50.000–5.000.000; balance 2.450.750; edge cases 0, 1, 999.999.999.
- Limits (example): min transfer Rp10.000, daily limit Rp50.000.000; BI-FAST fee Rp2.500.

## Recommended Style Packs
`style-modern-minimal` (digital banks, e-wallets), `style-corporate-trustworthy` (incumbent banks, B2B), `style-dark-premium` (investment, crypto, priority banking), `style-senior-friendly` (mass-market, pension products).

## Compliance checks (reported via design-master-checklist, section L)
- FIN-01 [J][Blocker] — Amount, fee, and total are visible before the confirm step.
- FIN-02 [J][Blocker] — Money movement has Review → Authenticate → Result steps.
- FIN-03 [M][Blocker] — Account numbers, card numbers, and phone numbers are masked by default.
- FIN-04 [J][Blocker] — Success, pending, and failed states are visually and verbally distinct.
- FIN-05 [J][Major] — Each error cause has its own message and fix (see common patterns).
- FIN-06 [M][Major] — IDR formatting follows the data guide everywhere, including inputs.
- FIN-07 [J][Major] — Balance visibility toggle exists where balance is shown on high-exposure screens (home, dashboard).
- FIN-08 [J][Major] — Receipt includes transaction ID, timestamp with timezone, and a share action.
- FIN-09 [J][Major] — Regulatory disclosure slot exists where the product type needs it (marked `[copy: legal]`).
- FIN-10 [J][Major] — Digital assets: last-updated time, signed price change, and risk statement before first buy.
- FIN-11 [J][Minor] — Recent recipients or amounts are offered to reduce re-entry.

## Domain anti-patterns
- Hiding fees until the PIN step.
- Green "Success" for a transaction whose status is actually pending.
- Gamified confetti on routine payments.
- Red used for both brand and error without another cue.
- Showing full balance on the lock screen or in widgets without a toggle.

## Notes for Desi (brand setup)
- Finance brands need a primary that reads trustworthy at 500–600 and passes AA for white text on 500 or 600 buttons.
- If the brand primary is red/orange, shift the error ramp's hue or rely on icon + text so errors stay distinct.
- Numeric-heavy UI: prefer fonts with clear tabular figures (Plus Jakarta Sans, Inter, Manrope, Geist).
