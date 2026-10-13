# Motion token template (proposal starting point for `-> Animation`)

Values follow `motion-design` budgets. Store durations as FLOAT **milliseconds** (Figma Motion
consumes seconds — divide by 1000 when applying). Easing is stored as STRING `x1,y1,x2,y2` because
Figma has no easing variable type. Add a description to every variable (usage + platform mapping).

## Duration (`motion/duration/*`, FLOAT, ms)
| Token | Value | Use |
|---|---|---|
| instant | 0 | state changes that must not animate |
| fast | 150 | press feedback, chip/toggle, color changes |
| base | 200 | tooltips, small popovers, fades |
| moderate | 250 | dropdowns, inline expand, sheet dismiss |
| slow | 350 | bottom sheet / modal open, screen push |
| slower | 500 | large surfaces, onboarding steps |
| celebratory | 800 | rare success moments (total choreography) |

## Easing (`motion/easing/*`, STRING)
| Token | Value | Use |
|---|---|---|
| standard-out | `0.23,1,0.32,1` | enter / exit |
| standard-in-out | `0.77,0,0.175,1` | on-screen movement / morph |
| sheet | `0.32,0.72,0,1` | sheets, drawers (iOS feel) |
| linear | `0,0,1,1` | progress, loaders |

## Spring (`motion/spring/*`, FLOAT)
| Token | Value | Use |
|---|---|---|
| bounce-none | 0 | default UI |
| bounce-subtle | 0.15 | drag-to-dismiss, gestures |
| bounce-playful | 0.3 | playful brands, rare delight only |

## Stagger (`motion/stagger/*`, FLOAT, ms)
| Token | Value |
|---|---|
| tight | 30 |
| base | 50 |
| loose | 80 |

## Modes
Single mode by default. Optional second mode **Reduced** where all translation-heavy durations
map to `base` and bounces to 0 — propose only if the Manager wants it.

Also propose a documentation frame on the DS file's foundations page showing each token with a
one-line usage note (created only after approval).
