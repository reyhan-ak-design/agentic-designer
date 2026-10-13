---
name: domain-ngo
description: Domain Pack for NGOs, nonprofits, social impact, donation and crowdfunding (zakat, infaq, sedekah, wakaf), volunteering, and community programs. Use whenever a brief mentions NGO, nonprofit, yayasan, charity, donation, donasi, crowdfunding, zakat, volunteer, relawan, campaign, impact report, or social program.
---

# Domain Pack — NGO & Social Impact
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Donors (one-time and recurring), volunteers, beneficiaries, and program staff.
- Donors need trust and proof of impact; beneficiaries need simple, respectful access.

## Principles
1. Trust through transparency: organization legitimacy, fund usage, and updates.
2. Dignity: beneficiaries are portrayed with respect; no exploitative imagery.
3. Giving is fast; recurring giving is easy to manage and cancel.
4. Impact is reported with real numbers and stories.

## Patterns
- Campaign card: image, title, organizer (verified), progress (raised of target + donors + days left).
- Donation flow: amount (presets + custom) → optional message/anonymous → payment → thank-you with share.
- Zakat calculator with type and nisab explanation where relevant.
- Updates timeline and fund distribution report.
- Volunteer signup: event details, requirements, slots, confirmation.

## Regulatory UI implications
- Organizer legitimacy (registration/permit) visible; fundraising permits per local rules (`[copy: legal]`).
- Donor data consent; option to donate anonymously.

## Data guide
- Campaigns: "Bantu Renovasi Sekolah di Lombok Timur" — terkumpul Rp48.250.000 dari Rp120.000.000 · 1.284 donatur · 18 hari lagi.
- Preset amounts: Rp10.000 / Rp25.000 / Rp50.000 / Rp100.000.

## Recommended styles
`style-modern-minimal`, `style-elegant`, `style-playful` (youth volunteering).

## Checks
- NGO-01 [J][Blocker] — Organizer identity and verification visible on campaign and payment screens.
- NGO-02 [J][Blocker] — Imagery and copy preserve beneficiary dignity.
- NGO-03 [J][Major] — Progress shows raised, target, donors, and time left.
- NGO-04 [J][Major] — Recurring donations can be managed and cancelled in-app.
- NGO-05 [J][Major] — Post-donation screen confirms amount, receipt, and next update.

## Anti-patterns
Guilt-driven dark patterns; pre-selected large amounts; stock photos of suffering; hiding fees taken by the platform.

## Notes for Desi
Warm, human palettes; illustration systems only if the organization owns one.
