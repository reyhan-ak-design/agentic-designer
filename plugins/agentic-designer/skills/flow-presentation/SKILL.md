---
name: flow-presentation
description: The team's standard for presenting multi-screen flows in Figma, learned from the Manager's own example — dark section canvas, module headers, step labels, happy path left-to-right, error branches below, decision diamonds, connectors with labels, and small annotations, all built with the design system's Screen Name, Annotation, and Mobile App Layout components. Use whenever a task covers more than one screen or a user flow; not for single screens.
---

# Flow Presentation

Reference layout: page "Example" in the Claude Agent Learning file (read it once if unsure;
never copy its content).

## Structure
- **One section per theme mode**, name `<Flow> - Light Mode`; fill `#444444`. Dark-mode section only when the Manager asks.
- **Module header:** `Screen Name` with `➜ Flow=True`, height 96, spanning all screens of that module (e.g. "Entry Point", "Select Bank", "Credit Card").
- **Step label:** `Screen Name` default (green) above each step group, spanning the group's screens (375 per screen + gaps). Error steps use `➜ Danger=True` (red); neutral notes use `➜ Neutral=True`.
- **Screens:** `Mobile App Layout` template instances, 375×812, **gap 50** between screens of one step; states of the same step sit side by side (loading → filled → valid).
- **Rows:** happy path left→right on the top row; error/alternate branches on a lower row directly under the step they branch from.
- **Decisions:** `Annotation` `Type=Decision` diamond (≈98×100) between steps; connectors labeled Yes/No.
- **Connectors:** elbowed, end cap arrow, stroke 4, optional short label (e.g. "Credit Card"). If `figma.createConnector` is unavailable, clone a connector from the reference page.
- **No note boxes.** Do not place `Annotation` notes or explanation text; the flow shows screens, step labels, decisions, and connectors only. Explanations go to Jarvis's chat summary.

## Rules
- Screens in a flow are instances of the project's built screens/compositions — never redrawn.
- The flow map lives as text in the plan first (numbered steps + branches); build it in Figma only for multi-screen deliveries.
- Decision diamonds only where the flow actually branches.
