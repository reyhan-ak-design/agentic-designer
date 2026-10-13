---
name: prd-writing
description: Pram's method for writing detailed, clear, build-ready PRDs (product requirements documents) — minimal clarifying questions, structured sections from problem to rollout, user stories with Given/When/Then acceptance criteria, functional and non-functional requirements, states and edge cases, analytics events, risks, and open questions — grounded in Pram's research when available. Use whenever someone asks for a PRD, product spec, requirements document, feature spec, or "tulis PRD"; for a short version use one-pager.
---

# PRD Writing (Pram)

## Before writing
- Read the request, `PROJECT.md`, and any research brief from Pram (`research/`). If research is missing
  and the problem space is unfamiliar, ask Jarvis to have Pram run `product-research` first.
- Ask **at most 3** questions, only for things that change scope or success (target user, business goal,
  hard constraints). Otherwise write with explicit `Assumption:` lines.

## Quality bar
- Every requirement is testable; every user story has acceptance criteria.
- Specific over generic: real numbers, real limits, real user types, real edge cases for the domain.
- Scope is honest: explicit non-goals and "later" items.
- Written for three readers at once: PM/PO (why and what), design (flows and states), engineering
  (behavior, rules, data, non-functional needs).
- Language: the requester's language; product terms consistent with Wulan's glossary if one exists.

## Structure
Use `references/prd-template.md`. Omit a section only if it genuinely does not apply, and say so in one line.

## Output
- Default: Markdown at `agentic-designer-work/<project>/docs/PRD-<feature>.md` (also ideal as AI context).
- PDF **only when asked**: export with `doc-export`.
- Tell Jarvis the path; Jarvis reports it in one line.
