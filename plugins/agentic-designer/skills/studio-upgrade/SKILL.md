---
name: studio-upgrade
description: How Jarvis upgrades the studio itself — turning the Manager's feedback, lessons, taste updates, recurring critique findings, and new lint rules into concrete edits of the plugin's skills, agents, commands, and scripts, as a reviewed proposal that is applied to the marketplace repo only after the Manager says yes (version bump, CHANGELOG, README version line), then shipped with commit, push, and plugin update. Use when the Manager says "upgrade", "jadikan aturan", "improve the agent", or when the same finding repeats 2+ times.
---

# Studio upgrade (self-improvement, human-approved)

## When
- The Manager corrects the same thing twice, a Fresh Eyes / lint finding repeats across 2+ screens, or the Manager asks.
- Nightly: Sari lists upgrade candidates in `knowledge/proposals.md`; Jarvis picks them up on the next `/upgrade`.

## 1. Propose (never edit silently)
Write `agentic-designer-work/_team/proposals/<date>-<slug>.md`:
```
UPGRADE — <slug> · evidence: <screens/feedback, dates>
Why: <the repeated problem in one line>
Change: <file> → <exact new/changed lines>   (one block per file; keep diffs small)
Test: <how we'll know it worked — e.g. lint catches X on frame Y; next Explore run avoids trope Z>
Risk: <what could get worse>
```
Show the Manager a 3-line summary in chat and ask **one** question: apply?

## 2. Apply (only after "yes")
- Repo path: read `agentic-designer-work/_team/config.md` (`repo: D:\agentic-designer-marketplace`). Missing → ask once and save it.
- Edit files **in the repo**, never in the installed plugin cache (`~/.claude/plugins/…`).
- Bump the patch version in `plugins/agentic-designer/.claude-plugin/plugin.json`, add a CHANGELOG entry, update the
  README "Versi saat ini" line. Run the relevant check (`node --check`, lint on a test frame) before finishing.
- Record the rule in `_team/lessons.md` with a pointer to the skill line that now enforces it.

## 3. Ship
Tell the Manager exactly: commit + push (GitHub Desktop or `git add -A && git commit -m "vX.Y.Z" && git push`), then
`claude plugin marketplace update agentic-designer-marketplace` and
`claude plugin update agentic-designer@agentic-designer-marketplace --scope project`, then restart.

## Rules
- Prefer changing **one** skill line or lint rule over adding new skills; delete rules that stopped earning their keep.
- Never weaken accessibility, the no-notes-on-canvas rule, or scope/budget rules via self-upgrade.
- Optional helper: Anthropic's free **skill-creator** skill (anthropics/skills) can evaluate a changed skill — use it if installed.
