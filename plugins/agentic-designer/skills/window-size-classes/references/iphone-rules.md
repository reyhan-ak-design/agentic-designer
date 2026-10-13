# iPhone / iPad rules (Apple) — used for the iOS half of /responsivemobile

Apple does not use Android dp breakpoints. iOS layout is decided by **size classes**: horizontal (H) and vertical (V),
each `compact` or `regular`. Verify current device sizes on the web at task time — models change.

| Situation | H × V | Layout |
|---|---|---|
| iPhone portrait (all models) | compact × regular | 1 column, tab bar (≤ 5 items), large title, full-width bottom CTA above home indicator |
| iPhone landscape (standard / Pro) | compact × compact | keep 1 column; shrink large title to inline; tab bar stays (short); hide tall heroes; sheets go full height |
| iPhone Plus / Pro Max landscape | **regular** × compact | may show 2 columns (list + detail / split view) when content benefits; otherwise same as landscape |
| iPad full screen (portrait or landscape) | regular × regular | sidebar or tab bar → sidebar, split view (list-detail), text max ≈ 680 pt, popovers instead of full sheets |
| iPad Split View 1/3, Slide Over | compact × regular | identical to iPhone portrait |
| iPad Split View 1/2 | compact or regular depending on model | design both: compact = iPhone layout, regular = split view |

Always:
- **Safe areas:** status bar / Dynamic Island on top, home indicator at bottom (≈ 34 pt in portrait), side insets in
  landscape around the Dynamic Island. Nothing interactive in the unsafe area.
- **Components are iOS ones:** tab bar (not navigation rail), navigation bar with back chevron + title, SF Symbols,
  sheets with grabber and detents (medium / large), action sheets, segmented controls, swipe actions, iOS switches.
- **Type:** Dynamic Type sizes (Large Title 34, Title 1 28, Body 17, Footnote 13 at default) unless the DS defines its own;
  layouts must survive larger accessibility sizes.
- **Touch targets** ≥ 44 × 44 pt. Back = left-edge swipe, never a bottom back button.
- **Rotation keeps state:** same item, scroll, and form input when rotating or entering Split View.

Dev handoff (iOS): `traitCollection.horizontalSizeClass / verticalSizeClass` (UIKit, update in
`traitCollectionDidChange` / `registerForTraitChanges`), SwiftUI `@Environment(\.horizontalSizeClass)`,
`NavigationSplitView` for list-detail on regular width, `ViewThatFits` for small reflows.
