# Standalone global header alignment

## Changed files
- `public/artefact/index.html`: local semantic header colours, React-matched typography/spacing/selector, matching mobile menu with native keyboard-operable controls.
- `AGENTS.md`: independent standalone header/menu architecture rule.
- `roadmap.md`: alignment task completed; unrelated follow-ups remain separately scoped.
- `.lovable/artefact-header-alignment-report.md`: this verification report.
- Project memory: approved scope/preservation boundaries updated.

React files and `public/theme-preference.js` are unchanged. The selector still calls `EpltTheme.read/set` and observes the existing body class. Internal analytical navigation, rendering, simulation, datasets and calculations are unchanged.

## Verification
- Existing regression suite: 11/11 passed (two test files).
- Latest preview build: successful.
- Compared React About header and standalone global header in both themes at 1280, 768 and 375 pixels.
- Heights/padding match exactly: 1280 = 76px / 16px 24px; 768 = 84px / 16px 24px; 375 = 76px / 12px 0.
- Brand: Times New Roman 22px/400, 22px line height; navigation: Inter 14px/500, 21px line height, 32px desktop gaps.
- Selector uses matching 3px padding, 6px outer radius, 3px option radius and 36px desktop / 44px mobile option heights.
- No document horizontal overflow; brand/selector bounds remain nonoverlapping. Mobile links accessible in a dropdown with mouse, Enter and Escape; selector supports native Space activation and visible focus.
- Reload persistence, React → Artefact → React navigation, and native cross-tab synchronisation in both directions passed.
- Real enterprise search results, selected paper and zoom exercised; exact state snapshots retained through both theme changes after existing animations settled.
- Topics, Temporal Evolution (25 rendered trend lines), Papers pagination/expansion and Network exercised; state snapshots, node positions, selections, filters and chart geometry preserved through theme changes.
- No browser page errors observed.

## Screenshots and differences
Before/after Artefact and matching React header captures are supplied for both themes at all three widths, with mobile menu captures.

Remaining intentional differences: standalone selector uses native `aria-pressed` buttons while React uses Radix radio semantics; mobile close icon is a static equivalent rather than React's animated hamburger. React's mobile Light brand inherits its existing button/link-hover cascade (slightly softer grey); the standalone brand consistently uses the specified dark title token. The homepage itself omits the brand and Network link by its existing design; alignment uses the shared interior header seen on About/Contact. No React styling was changed to eliminate these differences.

Unknown-topic empty-card behaviour and development ref warnings remain unrelated, pre-existing follow-up items.