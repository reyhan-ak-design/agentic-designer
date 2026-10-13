---
name: product-research
description: Pram's product and market research method — turn the Manager's context into research questions, then gather evidence from the web, regulators, app stores and reviews, competitor products, and Mobbin, within a budget; synthesize a sourced research brief (competitor matrix, user pain themes, market and regulatory facts, implications, recommendations) that Pram and the designers reuse. Use whenever someone asks to research a product, market, competitors, features, users' complaints, or regulations, or when a PRD or design needs grounding and no reference was given.
---

# Product Research (Pram)

The Manager gives context; you find the evidence. They should not need to hunt references.

## 1. Frame (no tools yet)
Write 3–6 research questions tied to the decision at hand (e.g. "How do leading Indonesian insurtech apps
handle claim submission?", "What do users complain about in e-wallet top-up?"). Note the market (default
Indonesia), segment, and time horizon.

## 2. Gather (budget: ~10 web searches/fetches + ≤ 2 Mobbin searches)
- **Competitors & products:** official sites, help centers, feature pages, pricing.
- **Users:** app store listings and review themes (Google Play / App Store pages via web), community threads only as secondary evidence.
- **Market & regulation:** regulator and government sources first (e.g. OJK, BI, Kominfo/Komdigi, BPOM, Kemenkes), reputable news second.
- **UI patterns:** Mobbin via `reference-research` (check `knowledge/patterns/` first).
Prefer primary sources and recent information; note dates.

## 3. Synthesize
Write `agentic-designer-work/<project>/research/<topic>.md` with the format below. Every factual claim
has a source link; separate facts from your inferences.

```
# Research — <topic> · <date> · Pram
Questions: Q1 … Qn
## Key findings (5–8 bullets, each with source)
## Competitor matrix
| Product | Target | Key features | Strengths | Weaknesses | Notable UX |
## User pain themes (from reviews)
| Theme | Frequency signal | Example (paraphrased) | Source |
## Market & regulatory notes (design/product implications only)
## Implications
- For product (scope, priorities) · For design (patterns to adopt/avoid) · For copy
## Recommendations (ranked) and open questions
## Sources
```
Keep it ≤ 2 pages. Pass the path to Jarvis; Pram and designers read it instead of re-researching.

## Rules
- No invented data, users, or quotes; paraphrase reviews.
- Mark uncertainty explicitly. If sources conflict, show both.
- Regulatory notes are product/design implications, not legal advice.
