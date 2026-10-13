---
name: taste-library
description: The Manager's taste library — a folder where the Manager drops screenshots/designs they love or dislike with one line each, which Jarvis or Sari turn into house rules, favorite moves, banned tropes, and tagged golden references loaded into every task. Use when the Manager says "update taste", adds images to _taste/inbox, approves/rejects work, or at the start of any design task.
---

# Taste library

## Folder (workspace)
```
agentic-designer-work/_taste/
  inbox/               ← Manager drops images here (png/jpg/webp), any name
  library/<tag>/       ← processed images, filed by tag (e.g. fintech, editorial, dark, web, onboarding)
  TASTE.md             ← the distilled taste (always loaded)
```

## How the Manager feeds it
Drop images into `inbox/` and (optionally) add one line per image to `TASTE.md` under **Inbox notes**:
`ref-name.png — suka: tipografi besar + foto crop ketat` or `— tidak: terlalu ramai`. No note = "likes it".

## "Update taste" (Jarvis on request, or Sari nightly)
1. Look at every inbox image (vision). For each, extract: what makes it good or bad in concrete terms (type scale, color
   proportion, composition, imagery treatment, density, signature move) + tags.
2. Move it to `library/<main-tag>/` and add a row to **Library**: `file · tags · verdict · 1-line why`.
3. Update the distilled sections (keep each ≤ 12 bullets, merge duplicates, newest wins):
   **House rules** (always true for this Manager) · **Favorite moves** · **Banned** (dislikes + `anti-slop` additions) ·
   **Golden references** (the 3–6 best, by tag).
4. Report in chat: n images processed, new rules, changed rules.

## Using it in a task
Read `TASTE.md`; pick the 3 library images whose tags best match the brief; use them as hero references and as Fresh
Eyes' comparison set. House rules override Style Pack defaults; the brief overrides both.

## Learning from verdicts
Each Manager approval/rejection adds one line under **Verdicts** (`date · screen · kept/rejected · why`). When a verdict
repeats, promote it to a House rule or Banned item.

## TASTE.md template (create if missing)
```
# TASTE — <Manager>
## House rules
## Favorite moves
## Banned
## Golden references
## Library
| file | tags | verdict | why |
## Inbox notes
## Verdicts
```
