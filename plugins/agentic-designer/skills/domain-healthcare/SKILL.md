---
name: domain-healthcare
description: Domain Pack for healthcare and wellness — telemedicine, hospital and clinic apps, appointments, prescriptions and pharmacy, medical records, lab results, BPJS-related flows, fitness, mental wellbeing, and health tracking. Use whenever a brief mentions health, kesehatan, doctor, dokter, patient, pasien, clinic, hospital, appointment, pharmacy, apotek, prescription, lab, telemedicine, wellness, fitness, or mental health.
---

# Domain Pack — Healthcare & Wellness
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Patients and caregivers, often stressed, unwell, or older; also clinicians in back-office tools.
- Accuracy and reassurance beat speed and delight.

## Principles
1. Clarity under stress: one task per screen, big targets, plain language.
2. Medical data is private and precise: units, ranges, dates always shown.
3. Never imply diagnosis the product cannot make; route to professionals.
4. Emergency paths are obvious where relevant (call 112/119 or facility hotline).

## Patterns
- Appointment: specialty/doctor → date/slot → patient profile (self/family) → review → confirmation with calendar add.
- Doctor card: photo, name with title, specialty, facility, experience, next available slot, price if paid.
- Telemedicine: waiting room state, connection quality, chat + video, post-consult summary and prescription.
- Lab results: value, unit, reference range, flag (high/low) with text not only color, trend over time.
- Medication: name, dose, schedule, stock; reminders with confirm/skip.
- Family profiles switchable.

## Regulatory UI implications
- Health data is sensitive under UU PDP (27/2022): explicit consent, purpose, and access controls.
- Integrations with national records (e.g. SATUSEHAT) and BPJS show source and date of data.
- Prescription drugs require a valid prescription flow; OTC vs prescription clearly labeled.
- Disclaimers that content is not a substitute for professional advice (`[copy: legal]`).

## Data guide
- Doctors: dr. Anisa Rahmawati, Sp.PD; dr. Bayu Hidayat, Sp.A. Facilities: RS / Klinik names generic (e.g. "RS Sehat Sentosa").
- Lab: Hemoglobin 13,2 g/dL (13,0–17,0); Gula darah puasa 110 mg/dL (70–99) → flagged high.
- Times: `Sen, 28 Sep 2026 · 09.30 WIB`.

## Recommended styles
`style-modern-minimal`, `style-senior-friendly`, `style-public-service-accessible`.

## Checks
- HLT-01 [J][Blocker] — Clinical values show unit and reference range.
- HLT-02 [J][Blocker] — Abnormal flags use text/icon, not color alone.
- HLT-03 [J][Blocker] — No UI copy implies a diagnosis the product cannot make.
- HLT-04 [J][Major] — Consent for health data is explicit and specific.
- HLT-05 [J][Major] — Emergency path visible on symptom or triage screens.
- HLT-06 [J][Major] — Patient identity (self/family member) is always visible in booking and records.
- HLT-07 [J][Major] — Accessibility raised: body ≥ 16pt, targets ≥ 48.

## Anti-patterns
Cute illustrations on serious results; red/green only flags; gamified streak pressure in mental-health apps; dense tables on mobile.

## Notes for Desi
Calm palettes (teal, blue, green); avoid pure red primary; comfortable sizes (button height 52+, text field 56).
