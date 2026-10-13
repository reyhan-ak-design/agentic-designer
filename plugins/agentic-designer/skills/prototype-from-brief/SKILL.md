---
name: prototype-from-brief
description: Pandu's method for building a high-quality interactive HTML prototype WITHOUT a Figma design — from a PRD, a one-pager, an API spec (OpenAPI/Swagger, Postman collection, JSON samples), or just a few lines in chat — using only Desi's DS Code Kit so it looks like the product, not generic AI UI. Realistic data from the API, every state the API implies, flows from the user stories, deterministic lint, and headless screenshots for Jarvis. Use when someone asks for a prototype, clickable mockup, demo, or "gambaran UI" from requirements.
---

# Prototype from a brief (Pandu)

## Inputs (any of these is enough)
PRD · one-pager · chat description · optional API (OpenAPI/Swagger file, Postman collection/connector, JSON examples).
No API → derive a minimal data model from the brief and list your assumptions in the handoff (chat), never in the UI.


## 0. Target popup (v1.0 — always first)
`AskUserQuestion`: "Prototype-nya mau dalam bentuk apa?" → **HTML (bisa dibuka di browser & HP)** (Recommended) · **Figma (klik antar
frame)** · **Keduanya**. Second question (multiSelect) when the brief mentions devices: "Perangkat?" → HP · HP landscape ·
Foldable (Fold/Flip) · Dual-screen (Duo). Default: HP only.

## Quality bar (the Manager's reference prototype)
One self-contained `index.html` (tokens block → kit → screens → one script), every screen of the flow with real data,
every state the PRD names (loading skeleton, empty, partial, error per API code, success), sheets and dialogs that animate,
hidden-values toggle, back navigation, and **a device viewer**: press **D** to cycle phone · landscape · fold cover · fold inner
(portrait/landscape) · flip · duo split (hinge never cuts text or a control), **T** toggles dark mode, **S** shows states.
Screens are `<template id="screen-<flow.context.state>">` so prototype IDs = Figma frame names = string key prefixes.

## Tokens from stored DS knowledge (no Figma calls)
`node ds-code-kit/scripts/proto-tokens.js --brand "<brand>" --out <flow>/tokens.css` (DS by default; other DS: `--ds
_ds/<slug>/ds-resolved.json`). Copy `kit.css` next to it. Fonts from Google Fonts only when the DS font is there.

## Screenshots (for review and the README of the flow)
Name shots `NN-<device>-<screen-id>[-<state>].png` (e.g. `03-phone-home.wallet.loading.png`) via headless Edge/Chrome:
`--window-size` per device and `index.html?device=<device>#/<screen>?state=<state>`. Max 4 for Fresh Eyes; full set only on request.

## Figma target
Wire the existing frames (`prototype-build`): navigation in flow order, overlays for sheets/dialogs, Smart Animate with the DS
motion tokens, starting points per flow named like the flow. Never add notes or arrows to the canvas.

## 1. Frame (no files yet, ≤ 25 lines to Jarvis)
- **Screen map:** numbered screens on the happy path + branches (error, empty, confirmation, success).
- **Data per screen:** endpoint (or assumed model) → fields shown → format (Rp, date, masked account).
- **States per screen:** loading · empty · error per API error code/validation · success · disabled with reason.
- **Priority guide per screen:** hero, primary action (exactly one), secondaries (≤ 3).
- Platform (mobile 390 / web 1440), Domain Pack, Style Pack, DS kit path. Missing kit → ask Jarvis to run Desi's `ds-code-kit` first.
Premium lane or unfamiliar domain → the domain designer writes this frame instead (Opus); Pandu builds.

## 2. Build (one folder per flow)
`agentic-designer-work/<project>/prototype/<flow>/` → copy `tokens.css` + `kit.css` from the kit and
`ds-code-kit/templates/prototype-shell.html` as `index.html`. Then:
- One `<template id="screen-…">` per screen; `data-api` on screens that load data; `data-state` blocks for every state.
- **Only kit classes and `--ad-*` roles.** Text uses `.t-*` classes from tokens.css. No raw hex, px, gradients, emoji icons,
  shadows, or fonts. Icons from the DS icon set only.
- `MOCK` mirrors the API: same field names and types, realistic Indonesian data (names, banks, Rp amounts with id-ID
  formatting, WIB times), and one entry per state (`default`, `empty`, `error` with the real error code).
- Real behavior where it matters: amount formatting while typing, validation messages, OTP/PIN entry, sheets, loading
  delays (~700 ms), retry, back navigation. Every screen has a way forward and back.
- Apply Domain Pack patterns (e.g. QRIS naming, fee before confirm, biometric with PIN fallback) and visual-craft rules.

## 3. Check (deterministic first)
1. `node ds-code-kit/scripts/proto-lint.js index.html` → fix every FAIL item (raw colors, missing states, slop, a11y).
2. Screenshots for Jarvis (max 4: default of the 2 key screens + hardest error + one sheet/success):
   - Windows: `"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --hide-scrollbars --window-size=460,900 --virtual-time-budget=3000 --screenshot="<abs>/shots/home.png" "file:///<abs>/index.html#/home?state=default"`
   - Mac: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless …` (same flags).
   Web prototypes: `--window-size=1440,900`.
3. Jarvis critiques from the screenshots (same critique protocol; golden screens apply if the DS has them).

## 4. Deliver (chat only)
Path to `index.html` (opens in any browser; press **S** to switch states), screen list, assumptions, open questions.
Optional on request: publish/share, or capture to Figma (Figma MCP `generate_figma_design`, if available) so designers can continue there.
