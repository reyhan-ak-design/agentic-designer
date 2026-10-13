---
name: design-master-checklist
description: The Agentic Designer quality gate. Defines every check a design must pass before it reaches the Manager, who runs which check (designer self-check, the lint mechanical check, Jarvis judgment review), severity rules, pass/fail logic, and the compact report format. Use this skill whenever a designer agent finishes a screen or flow, whenever the lint or Jarvis reviews design work, whenever someone asks "is this design ready", "review this", "self-check", "QA this screen", or before any handoff to the Manager, developers, or a client — even if the word "checklist" is never mentioned.
---

> **Split for focus:** designers read `references/checklist-craft.md` ([J] items); the lint and the lint script own
> `references/checklist-mechanical.md` ([M] items). The full list stays in `references/checklist.md`.

# Design Master Checklist

The single source of truth for design quality in the Agentic Designer team.
Every design deliverable passes through three gates in this order:

```
1. Designer self-check  → all items (M + J) on own work
2. the lint (Haiku)         → re-runs M items only, by inspecting the Figma file
3. Jarvis  (Opus)          → reviews J items + spot-checks M items the lint flagged
→ Manager (the human user): final check only
```

Nothing reaches the Manager unless it has passed all three gates or has
exhausted the revision limit (see "Revision loop").

## Item types

Every item in `references/checklist.md` has an ID, a type, and a default severity.

- **[M] Mechanical** — objectively verifiable from the Figma file. the lint runs
  `references/kiki-lint.js` (one read-only `use_figma` call per page) to collect the measurements,
  (naming, auto layout, variables vs hardcoded values, contrast ratio, target size,
  state frames present). the lint owns these. Prefer checking them with a single
  read-only Figma inspection script rather than many separate calls.
- **[J] Judgment** — needs design reasoning (hierarchy, UX flow, domain fit,
  anti-AI-slop). Jarvis owns these.

## Severity

| Severity | Meaning | Rule |
|---|---|---|
| **Blocker** | Breaks the task, the platform, accessibility minimums, domain compliance, or the design system | Must be fixed. Cannot pass. |
| **Major** | Noticeably hurts usability, hierarchy, or consistency | Fix, or write a one-line justification the reviewer accepts |
| **Minor** | Polish | Fix if cheap, otherwise list as a note |

## Pass rule

A deliverable **passes** when:
- 0 Blocker
- 0 Major without an accepted justification
- Minor items are either fixed or listed in the handoff notes
- Jarvis's critique (`design-critique`) has no open severity ≥ 3 and ≤ 2 severity 2

## Which items apply

Not every item applies to every task. Before checking, decide scope in one line:
- Platform: iOS / Android / Web → use only that platform's section in I.
- Domain: load only the matching Domain Pack's compliance items (section L).
- Style: load only the Style Pack named in the brief (section M adds its don'ts).
- Items that do not apply are skipped silently — never listed as "N/A".

## Report format (keep it short — this is a token budget rule)

Report **failures and justifications only**. Never list passed items.

```
CHECK REPORT — <Screen> / <Option> — by <agent>
Scope: <platform> · <domain pack> · <style pack>
Result: PASS | FAIL (<n> blocker, <n> major, <n> minor)

FAIL
- [C-03][M][Blocker] Hardcoded #1A1A1A on amount text → bind to text/primary
- [B-02][J][Major] Fee line competes with CTA → reduce to caption style

JUSTIFIED
- [F-04][M][Major] Local stand-in component without Jarvis approval

NOTES (minor, not fixed)
- [D-05] Helper text could be 1 line shorter
```

If there are no failures, the whole report is two lines: header + `Result: PASS`.

## Revision loop

- Jarvis returns a FAIL report to the same designer; the designer fixes **only the listed items**
  (no re-designing untouched parts) and re-runs self-check on changed items only.
- Maximum **2 revision rounds**. If still failing, Jarvis escalates to the Manager with
  the latest report and a one-line summary of what is blocking.

## Role-specific use

- **Designers**: run the full checklist on your own work before handing to the lint.
  Fix what you find. Hand off with your self-check report.
- **the lint**: run M items only. Do not comment on taste. Do not redesign.
  Output the report and stop.
- **Jarvis**: read the lint's report first, then check J items. Be specific:
  name the element, the item ID, and the fix. Vague feedback ("improve hierarchy")
  is not allowed.

The full item list is in `references/checklist.md`. Read the sections that match
the scope; you do not need to read the whole file every time.
