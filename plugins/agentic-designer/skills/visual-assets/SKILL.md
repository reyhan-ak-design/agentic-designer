---
name: visual-assets
description: How designers get and place real imagery in Figma — photos, illustrations, 3D, product shots — so finals never ship grey placeholder boxes. Source order (Manager uploads in _assets/, Unsplash, DS illustrations, optional AI generation via Figma Weave with cost approval), art direction from the Style Pack, placing images with Figma upload_assets, crops, overlays for legibility, and license notes. Use whenever a screen has hero images, cards with media, avatars, banners, empty states, onboarding, or promos.
---

# Visual assets

**Rule:** no paid APIs, and **never plain grey boxes**. Use real images when available; otherwise a **designed placeholder**:
- correct aspect ratio and crop for the final image · brand tint or subtle pattern · a subject icon ·
- layer name for developers: `IMG · <subject> · <ratio> · max <width>` (e.g. `IMG · hero-food · 4:3 · max 560`).
Designed placeholders are acceptable finals for tests and handoff; real photos are preferred for pitches.

## Source order (stop at the first that fits)
1. **Manager uploads** — `agentic-designer-work/_assets/<project>/` (brand photos, product shots, mascots). Always first.
2. **Unsplash (free)** — search unsplash.com, download from `images.unsplash.com` (allowed in the workspace settings)
   with `curl`, then upload to Figma (Unsplash License: free for commercial use, no attribution required; do not imply endorsement by people shown).
3. **DS illustrations / icon set** — the illustration library or empty-state art in the design system (manifest).
4. **Designed placeholder** (above) — the default when no free image fits.
5. **AI generation** — not used (paid). Only if the Manager explicitly asks for Figma Weave, and then with its cost shown first.
Record every asset in the handoff: source, link/file, license.

## Art direction (read the Style Pack's "Imagery" section)
- One consistent treatment per screen: same light, tone, and crop logic across images.
- Subjects fit the audience and market (Indonesian people, places, products, prices where relevant).
- Crops: faces and focal points on thirds; never crop through eyes or product logos; leave text-safe areas.
- Text on images: use a DS overlay token (scrim/gradient from the DS) or a surface card — contrast must pass.
- Food, travel, property, commerce: image quality is the product — use the best available, large, and uncluttered.
- Finance, B2B: prefer illustration, abstract brand shapes, or product UI over stock-photo cliché (handshakes, piggy banks).

## Placing images in Figma
- Create or pick the target frame/rectangle first (DS image/avatar component when it exists), then
  `upload_assets` (Figma MCP) with `nodeIds` = targets and `scaleMode: "FILL"`; POST the image bytes to the returned URLs.
- Keep images ≤ 2× display size; one upload call per batch (≤ 10 images).
- Never use images as the only carrier of meaning; add alt text in the handoff for dev.
