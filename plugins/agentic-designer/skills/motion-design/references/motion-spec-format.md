# Motion spec format

```
MOTION SPEC — <screen/flow> — Pandu — v<n>
Personality: <crisp | calm | springy | elegant> · Style Pack: <name> · Domain: <name>

GATE LOG
| Candidate | Frequency | Purpose | Verdict |
| Sheet open (source picker) | occasional | spatial consistency | ANIMATE |
| Amount digit typing | 100+/day | — | NO MOTION |

MOTIONS
| ID | Trigger | Element | Property: from → to | Duration | Easing / spring | Delay | Reduced motion |
| M1 | Tap "Ganti sumber" | Bottom sheet | translateY 100% → 0; scrim opacity 0 → 0.4 | 350ms | cubic(0.32,0.72,0,1) | 0 | opacity only 200ms |
| M2 | Sheet dismiss (tap scrim / swipe) | Bottom sheet | translateY 0 → 100% | 250ms | ease-out strong | 0 | opacity only |
| M3 | Chip select | Chip | fill/stroke color crossfade; scale 0.97 → 1 | 150ms | ease | 0 | color only |

CHOREOGRAPHY (if grouped): order + stagger (e.g. header 0ms → list items +40ms each, max 5)
INTERRUPTION: <which motions must retarget mid-flight>
IMPLEMENTATION NOTES
- iOS (SwiftUI): <e.g. .spring(duration: 0.35, bounce: 0) / .easeOut(duration: 0.2)>
- Android (Compose): <tween(350, easing = CubicBezierEasing(0.32f,0.72f,0f,1f)) / spring(...)>
- Web (CSS): <transition: transform 350ms cubic-bezier(0.32,0.72,0,1)>
DS TOKENS: <duration/easing tokens used, or "none — proposed to Desi">
```
