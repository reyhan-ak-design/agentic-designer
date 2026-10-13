---
name: learning-loop
description: Sari's automatic nightly self-learning routine (starts exactly 00:00, must finish before 04:00) — pick the next topic from the curriculum (domain × pattern), study real shipped products (Mobbin, app stores, product sites, design-system docs, UX research) and design inspiration (Dribbble, Behance, Awwwards, and similar) within a strict budget, write reusable pattern notes to knowledge/patterns, and propose rule improvements (additive knowledge applies immediately; core rule changes wait for the Manager's weekly yes). Use only for the scheduled learning session or when the Manager asks the team to study a pattern.
---

# Learning Loop (Sari)

## Schedule & budget
- Runs automatically once per night at **00:00 exactly** (Task Scheduler); never waits for the Manager.
- Hard stop: finish and write the log **before 04:00**. If started outside 00:00–03:59, exit immediately.
- Per session: ≤ 6 Mobbin searches (limit ≤ 12), ≤ 10 web searches/fetches, ~40 turns.

## Sources (label every finding)
| Type | Examples | Use for | Weight |
|---|---|---|---|
| **Real-world (shipped)** | Mobbin, app store screenshots, product websites/help centers, public design systems (HIG, Material, Polaris, Carbon, Atlassian), UX research (NN/g, Baymard) | patterns, hierarchy, states, copy, rules | high — rules come only from here |
| **Inspiration (concept)** | Dribbble, Behance, Awwwards, Godly, Land-book, Page Flows | visual treatments, color, type pairing, composition ideas | low — never a rule; always translated into DS tokens and checked against real-world patterns |
Concept shots often ignore states, real data, and accessibility: take the visual idea, never the structure,
and flag anything that would fail `layout-and-spacing` or `visual-craft`.

## Curriculum
Rotate through `knowledge/curriculum.md` (create it from the list below if missing; mark done items
with a date). Domains follow the Domain Packs; patterns include:
onboarding · login/OTP · home/dashboard · list + filters · detail · form/checkout · confirmation/review ·
success/receipt · empty/error states · settings · search · notifications · tables (BO) · data entry (BO).
Order: the Manager's active project domains first, then the rest.

## Per topic
1. Check `knowledge/patterns/<domain>-<pattern>.md`; if it exists and is < 60 days old, skip to the next topic.
2. Real-world first: Mobbin by job (see `reference-research`), 5–8 references from ≥ 3 apps; add official docs or
   UX research if the pattern has known guidance. Then 1–3 inspiration searches for visual treatments.
3. Write the pattern note (≤ 60 lines) — **visual inspiration first, UX pattern second**:
   - **Signature moves (required):** 3–5 concrete visual moves that make the best examples memorable (e.g. display-size
     amount with a tinted field, full-bleed food photo with a tight crop, illustrated empty state), each with the source link
     and a screenshot saved to `knowledge/shots/<topic>/`.
   - **Hero reference candidate:** the single best example and why (feeds briefs and golden-screen proposals).
   - Job & context · common structure (anatomy) · hierarchy (hero, sizes) · spacing & containment ·
     visual treatments that make the best ones feel premium · inspiration ideas (labeled, with DS-token translation) · states they design · copy patterns ·
     anti-patterns seen · 2–3 "rules worth adopting" · source apps (names + Mobbin links).
4. Rule proposals → append to `knowledge/proposals.md` with evidence. Tag each `additive` or `core`.

## Applying what was learned
- Pattern notes are used by designers immediately (knowledge, not rules).
- `additive` proposals (new do/don't, examples) → Jarvis may merge into `_team/lessons.md` at the next task and mention it in one report line.
- `core` proposals (thresholds, checklist, agent behavior) → collected into a weekly digest for the Manager; never applied without a yes.
- Never edit plugin skill files directly.

## End of session
Write a 3-line summary to `knowledge/log.md`: date · topics studied · proposals made.

## Also every night: learn from the team's own mistakes (cheap, no web)
Read the day's `agentic-designer-work/*/reports/` (the lint lint results, Jarvis critiques) and write proposals to
`knowledge/proposals.md`:
- **New DESIGN.md Don'ts** — one line per repeated bad output (e.g. "3 screens this week had 2 primary buttons").
- **New lint rules or threshold changes** for `kiki-lint.js`, with the evidence.
- **New gotchas** for `base-designer/references/gotchas.md` from build errors.
Desi approves Don'ts; Jarvis approves lint/gotcha additions; core changes wait for the Manager's weekly yes.
Candidate golden screens found on Mobbin go to `knowledge/golden-candidates.md` for Desi.
