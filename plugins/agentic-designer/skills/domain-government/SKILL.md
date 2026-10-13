---
name: domain-government
description: Domain Pack for government and public services — citizen service apps and portals, permits and licensing, tax and levies, population administration, public complaints, social assistance, and internal government systems. Use whenever a brief mentions government, pemerintah, public service, layanan publik, dinas, kementerian, pemda, permit, izin, pajak, KTP/NIK, e-government, SPBE, or civic tech.
---

# Domain Pack — Government & Public Services
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Every citizen: all ages, literacy levels, devices, and connectivity. Also civil servants processing requests.
- Users arrive with an obligation, not a desire; they want to finish correctly the first time.

## Principles
1. Inclusive by default: plain Bahasa Indonesia, large text, works on low-end devices and slow networks.
2. Show requirements before starting (documents, fees, time).
3. Every submission gets a reference number and a trackable status.
4. Official identity is clear (institution name, logo, official domain) to prevent phishing.

## Patterns
- Service catalog with search and categories.
- Pre-flight checklist: requirements, fees, estimated processing time, office hours.
- Multi-step forms with save-and-continue, step indicator, and review page.
- NIK/KK input with format validation and masking.
- Status tracker with SLA and contact channel; downloadable official documents (PDF with QR verification).
- Complaint/aspiration forms with category, location, and attachment.

## Regulatory UI implications
- Align with national e-government principles (SPBE) and the institution's brand guideline.
- Personal data under UU PDP; explicit consent and purpose.
- Fees and legal basis shown where the service is paid (`[copy: legal]`).

## Data guide
- Names from across Indonesia (e.g. I Made Suardana, Ahmad Fauzi, Maria Goreti Lamawuran).
- NIK masked: `3276 •••• •••• 0012`. Reference: `REG-2026-09-000123`.
- Institutions: generic ("Dinas Kependudukan dan Pencatatan Sipil Kota Depok").

## Recommended styles
`style-public-service-accessible`, `style-corporate-trustworthy`, `style-senior-friendly`.

## Checks
- GOV-01 [J][Blocker] — Requirements, fees, and time shown before the form starts.
- GOV-02 [J][Blocker] — Submission returns a reference number and status tracker.
- GOV-03 [J][Blocker] — WCAG AA met with extra margin: body ≥ 16, targets ≥ 48.
- GOV-04 [J][Major] — Long forms support save-and-continue and a review step.
- GOV-05 [M][Major] — Identity numbers masked by default.
- GOV-06 [J][Major] — Official identity (institution, domain) visible on entry screens.
- GOV-07 [J][Major] — Offline/slow-network states designed.

## Anti-patterns
Jargon and legal references as primary copy; banner carousels of officials on the home screen; PDFs as the only way to apply.

## Notes for Desi
Institution color from guideline at 500; high-contrast neutrals; larger heights (button 52–56) and legible fonts.
