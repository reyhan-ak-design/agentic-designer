---
name: one-pager
description: Pram's format for a one-page requirements brief (1-pager) — problem, why now, target user, proposed solution, success metrics, scope in/out, key requirements, risks, and asks — detailed but fitting on one page, for alignment before a full PRD. Use when someone asks for a one-pager, 1 pager, brief requirement, feature brief, or a short version of a PRD.
---

# One-Pager (Pram)

Same quality bar as `prd-writing`, compressed to one page (~400–600 words). Ask at most 2 questions.

```
# <Feature> — One-Pager            <date> · <owner> · Status
**Problem** — 2–3 sentences with evidence.
**Why now** — trigger (data, market, regulation, strategy).
**Target user** — who, context, job-to-be-done.
**Proposed solution** — 3–5 bullets describing the experience, not the UI.
**Success metrics** — primary + 1–2 guardrails with targets.
**Scope** — In (MVP) · Out · Later.
**Key requirements** — 5–8 testable bullets (IDs R1…).
**Risks & mitigations** — top 3.
**Screens (for a prototype)** — 3–8 screens, one line each: purpose · data · states.
**Open questions / asks** — decisions or resources needed, with owners.
```
Output: Markdown at `agentic-designer-work/<project>/docs/1P-<feature>.md`; PDF only when asked (`doc-export`).
