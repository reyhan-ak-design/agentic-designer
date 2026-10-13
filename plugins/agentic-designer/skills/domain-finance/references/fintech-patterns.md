# Fintech patterns (Indonesia-first) — load only the section you need

## Payments
- **QRIS (scan & pay):** camera screen with frame, flashlight, gallery import, "Tampilkan QR saya"; after scan: merchant name + location + NMID (optional), amount (static QR → user inputs; dynamic QR → locked), tip if merchant allows, source of funds, review → PIN → receipt. States: invalid QR, expired dynamic QR, merchant not supported, amount above limit, camera permission denied.
- **Transfer:** recipient (saved, recent, new by bank + account number with name inquiry → show resolved account holder name before amount), amount, method (BI-FAST default for interbank, RTOL/SKN only if client supports; show fee per method), note, schedule. Name inquiry failure and "name mismatch" states are mandatory.
- **Virtual account / bills (PLN, BPJS, PDAM, telco, e-commerce VA):** biller → customer ID → **inquiry result** (name, period, amount, admin fee) → confirm → PIN → receipt. Show "tagihan tidak ditemukan" and "sudah dibayar" states.
- **Top up / cash in:** list of channels (VA per bank, minimarket codes, debit card) with instructions per channel, copyable codes, countdown for expiring codes.
- **Receipts:** status, amount, fee, total, from/to, reference/transaction ID, date-time with timezone, share/download; pending → "we'll notify you".

## Accounts & onboarding (digital bank / e-wallet)
- eKYC: KTP capture (guides, glare/blur detection), liveness selfie, data confirmation (pre-filled from OCR, editable), address, occupation/source of funds (regulatory), PIN creation, device binding. Progress indicator; save and resume; clear reasons when rejected.
- Tiered accounts (e.g. basic vs premium e-wallet) with visible limits and upgrade path.

## Lending & paylater
- Limit card (available / used / total), billing cycle, due date, minimum vs full payment, late-fee disclosure **before** the user commits, installment simulator (tenor, monthly amount, total interest/fees, effective cost), contract/agreement acceptance with scrollable terms, reminder states (due soon, overdue).
- Collection and overdue screens: calm tone, clear amount and how to pay; no shaming.

## Investing (mutual funds, stocks, bonds/SBN)
- Risk profile questionnaire before first buy; product cards with risk level, return period labels ("1 thn"), NAB/price with date; buy flow with amount, fees, cut-off time and settlement date; sell/redeem with estimated proceeds and date; portfolio with unrealized gain/loss (signed, color + arrow), allocation.
- Disclaimers: past performance, risk — `[copy: legal]`.

## Security & trust
- PIN pad (6 digits, shuffled only if the client requires), biometric prompt as the default with PIN fallback, OTP (6 digits, auto-fill, resend countdown), device binding / new-device verification, session timeout, "Lupa PIN" recovery.
- Fraud/safety: warnings on suspicious transfers ("Waspada penipuan" interstitial for first-time recipients or large amounts), cooling-off confirmations, block card, report fraud.
- Balance hide/show toggle persisted per user; masked numbers everywhere by default.

## Data
- Banks and wallets: BCA, Mandiri, BRI, BNI, BSI, CIMB Niaga, Permata, Jago, SeaBank, Blu, GoPay, OVO, DANA, ShopeePay (use the client's own brand for "own").
- Amounts: Rp10.000 – Rp50.000.000 typical; limits per tier; BI-FAST fee Rp2.500 (use the client's fee table if given).

## Mobile fintech — rules
- QR payments are **QRIS** (Bank Indonesia mandate for QR payment providers): use QRIS naming and branding, never a generic "Scan QR".
- Biometric login always has a **visible PIN/OTP fallback**; explain failed scans; show remaining attempts.
- Confirm screen: amount is the single dominant element; recipient identity (name + bank/wallet + masked account); fee shown before confirming; one primary CTA in the thumb zone.
- Rupiah: `Rp1.250.000` (dot thousands, no decimals) unless the client style says otherwise; tabular figures for amounts.
- Money-movement screens stay calm; expressive styling is for onboarding, rewards, and promos.
