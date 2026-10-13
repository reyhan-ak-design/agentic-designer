# Critique output schema

```
REVIEW — <screen/flow> · round <n> · mode <Focused|Form|Operate> · by Jarvis
OBJECTIVE: <user> needs to <job> so that <outcome>. Primary action: <label>.
FIRST READ (blur): 1) <…> 2) <…> 3) <…> → matches priority guide? Y/N
WHAT WORKS (keep):
- <strength tied to objective>
- <strength>
COVERAGE: hierarchy ✓ · spacing ✓ · type ✓ · color ✓ · states ✓ · copy ✓ · a11y ✓ · tech ✓ (✗ = not reviewed + why)
POINT OF VIEW: <the one memorable idea, or 'none'> · vs hero reference: <gap>
RUBRIC: H <n> · Craft <n> · States <n> · DS <n> · Tech <n> · Taste <n> · PoV <n> · Ambition <n> → avg <n>
TASTE DELTA: <gap to best-in-class> → <how to close>
FINDINGS (highest severity first):
[F1] Sev <0–4> · <Hierarchy|Spacing|Type|Color|Content|States|Platform|A11y|Tech|DS> · node <id>
     Observation: <what, where, measured value>
     Principle: <rule ID or objective link>
     Why it matters: <user/business impact>
     Fix: <verb> — <exact change: tokens, text style, component/variant, order>
     Verify: <rule to re-check / blur expectation>
[F2] …
CONSIDERED BUT REJECTED (1–3): <candidate> — <why left as is>
DS ISSUES (for Desi): <none | issue + evidence>
KIKI AGREEMENT: <agree | disagreements re-inspected: …>
VERDICT: SHIP | REVISE | RETHINK — <one line>
```
