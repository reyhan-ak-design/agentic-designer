# Benchmark — run on every release

Five fixed briefs (`briefs.md`). Run each in a fresh session on a new Figma page named
`BENCH <version> — <brief id>`. Record results in `scoresheet.csv` (one row per brief per version).

## Per run, record
- **Lane** Leo chose · **Time** (start → Leo's final summary) · **Usage**: `/usage` (subscription) or `/cost` (API) before and after
- **Leo rubric** (6 scores, average) · **Manager score** 1–5 · **Revision rounds** · **Manager edits needed** (count)
- One-line note: best part / worst part

## Reading results
A release is better only if the average Manager score rises (or holds) **and** usage/time fall (or hold).
Tokens, tool calls, and minutes are captured automatically (v0.5.1+): run
`node "<plugin>/office/telemetry-summary.js" "<workspace>"` after each brief and copy the numbers into the scoresheet.

## Consistency (v0.6+)
Run each brief **3 times** on the same version. Consistency = spread across the 3 runs of: Kiki blockers,
distinct gap count, text-edge count (from `kiki-lint.js` metrics), pairwise wins vs the golden screen, tokens,
minutes. Lower spread = more consistent. Record per run in `scoresheet.csv` (add a `run` column).

## Monthly human calibration
Blind-rank 10 pairs Leo judged. If agreement < ~70%, refresh the critique bank examples.


## v0.8 acceptance test (taste)
Redo 2 v0.7 screens (Lunas e-wallet home, Lahap F&B home) in the **Explore** lane with 2–3 Manager references.
Show v0.7 vs v0.8 side by side. Pass = the Manager picks v0.8 on both and scores Point of View ≥ 4.
