---
name: <DS name>
version: <date>
font: { family: "<family>", fallback: "system-ui" }
colors:        # semantic names only
  surface/primary: "<var key or hex>"
  text/primary: "..."
  action/primary: "..."
spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64]
radius: { sm: 4, md: 8, lg: 12, xl: 16, full: 999 }
type:
  display: { size: 40, weight: 700, lh: 48 }
  h1: { size: 32, weight: 700, lh: 40 }
  body-l: { size: 16, weight: 400, lh: 24 }
  caption: { size: 12, weight: 400, lh: 16 }
elevation: [none, raised, floating, overlay]
motion: { fast: 150, base: 200, slow: 350, easing: "0.23,1,0.32,1" }
---

# <DS name> — design rules for agents

## Voice of the UI
<2–3 sentences: calm/precise/friendly…>

## Layout
- Mobile margin 16; web gutters 24; 12-col grid on web; max 1 primary action per view.

## Components — when to use which
- Button primary: the single most important action. Secondary: alternatives. Tertiary/link: low emphasis.
- Card: groups of interactive rows or summaries; never card-in-card.

## Do
- Bind every value to a token. Use component TEXT properties for copy.

## Don't (grows from real bad generations)
- Don't center-align table columns. Don't stack two primary buttons. Don't use raw hex. …
