# Figma build protocol (designer)

Design only on the canvas. **Never create notes, annotation cards, "Notes" frames, DS-gap sections, review
pages, labels explaining decisions, or any text that is not part of the UI.** All explanations go to Jarvis in
the handoff; Jarvis reports to the Manager in chat.

## 0. Preflight (one call, read-only)
Load `figma-use` + `figma-generate-design` first. Then one `use_figma` script that checks: target page exists,
file is editable, the DS manifest version matches (`manifest.libraryHash`), required fonts load, the template
shell exists. Return `{ok, missing[]}`. Stop and ask Jarvis if anything is missing.

## 1. Read discipline (reads are rate-limited; writes are not)
Order of preference: **manifest (0 calls) → targeted Plugin-API read script returning only needed fields →
`get_metadata` outline → `get_design_context` on one node → `get_screenshot`.**
Never call `get_design_context` on a page (it returns React/Tailwind — waste for Figma-to-Figma work).
Token audits of variants: `get_variable_defs` or a script, not `get_design_context`.

## 2. Build (section per call)
1. **Call 1 — wrapper:** clone the template shell for the platform (from the manifest `shells`), rename to the
   screen, place on the page. Return its id.
2. **Calls 2..n — one per section** of the Build Spec, built *inside* the wrapper with `helpers.js`
   (prepend it to every script). Return `{created:[ids], unbound:n, errors:[]}` only.
3. **States:** after the default screen passes lint, clone it per budgeted state and change only what differs
   (variant swaps via component properties). Multi-screen: one screen per call, independent calls in parallel.
4. No screenshots between sections.

## 3. Verify
Run `design-master-checklist/references/kiki-lint.js` once over all built frames. Fix every blocker, re-run
lint once. Then **one** screenshot of the default and one of the hardest state (`maxDimension` 1024).

## 4. Hard rules
- Every fill, stroke, text style, gap, padding, and radius bound to a manifest token/style. No raw hex or px
  when a token exists.
- Components only from the manifest. Missing component → stop and tell Jarvis (Desi decides). Never build a local
  stand-in without Jarvis's approval; if approved, build it off-canvas on a page named `_Local components`.
- Wrapper first; never reparent across calls. Append to an auto-layout parent before setting FILL/HUG.
- Fonts from the manifest (never default to Inter). Set `variable.scopes` explicitly if creating variables.
- Text via component TEXT properties (e.g. `Label#2:0`), not by editing detached text.
- On error, obey `safeToRetryWithoutCanvasRead`; if false, read before retrying.
- Page layout: states left→right in one row; multi-screen flows follow `flow-presentation`.
- Read `gotchas.md` before the first write of a session; append any new failure you hit.
