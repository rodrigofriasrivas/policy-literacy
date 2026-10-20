# Phase 2: React theme coverage

## Approval boundary
Phase 1 is complete. This plan incorporates the two additional Phase 2 requirements but does not authorise implementation. Await explicit approval before application changes. Phase 3 remains separately approval-gated. Figure Export Mode is excluded.

## 1. Complete homepage theme adaptation
Intentionally design Light Mode, rather than invert colours, while preserving the current Dark Mode appearance, composition, typography, animation behaviour, information hierarchy, and visual identity.

Cover every homepage element and state:
- Animated research-term background: surface, text colours, opacity, gradients, and readability.
- Main heading and subtitle.
- Primary and secondary CTAs, including hover, focus, and interactive states.
- Research metrics and labels.
- Global header, navigation, and footer, including branding and all interactive states.

Use incremental semantic tokens for light surfaces, foregrounds, subtle text, borders, animated-background layers, and controls. Preserve existing dark values and animation parameters.

## 2. Labelled global theme selector
Replace the shared React standalone icon control with a compact segmented selector: **☀ Light | ☾ Dark**.
- Keep both options visible in desktop and mobile navigation, including onboarding's shared navigation.
- Identify the active mode through a subtle contrasting background, clear text, and an accessible selected state.
- Follow the site's minimalist language: no oversized controls, heavy shadows, decorative 3D effects, or unnecessary animations.
- Use the supplied references for two-option behaviour only, not their skeuomorphic styling.
- Support keyboard selection and visible focus, with accessible group/option labels and selected states using existing accessible primitives.
- Reuse Phase 1's ThemeProvider, `eplt-theme` preference, and native cross-tab synchronisation. No second theme system.

## 3. Remaining React coverage
Retain the previously proposed Phase 2 coverage: About, Contact, Policy engagement, onboarding modules, topic/evidence views, shared layouts, navigation, footer, controls, and applicable charts. Adapt presentation incrementally without changing data, calculations, topic identities, filters, selection, navigation, or interaction behaviour. Check actual route coverage, including `/evidence/topic/:topicId`, rather than assuming every route renders a React view.

## Technical scope: files affected
- `src/index.css`: incremental semantic theme tokens and state styling, preserving existing dark values.
- `src/pages/HomePage.tsx`: homepage token adoption, including research-term background layers, CTAs, and metrics.
- `src/components/theme/ThemeToggle.tsx`: accessible labelled segmented selector using existing global state.
- `src/components/layout/SiteHeader.tsx`, `src/components/intro/ModuleShell.tsx`: compact desktop/mobile selector placement.
- `src/components/layout/SiteFooter.tsx`: theme-aware branding and footer contrast.
- Existing About, Contact, Policy engagement, onboarding, and topic-view presentation files as required by the React coverage audit.
- Existing theme tests and targeted regression checks: preserve Phase 1 storage contract and verify selector operation.

No changes to `public/artefact/index.html` visualisation styling or logic in Phase 2. Retain its existing Phase 1 preference bridge unchanged. Do not activate legacy `.dark` tokens indiscriminately: check each affected React surface against its existing baseline.

## Acceptance and regression checkpoints
1. Capture the existing Dark Mode baseline before edits; compare homepage and shared navigation after each change. Only the explicitly requested selector replacement may alter the dark header control.
2. Verify every homepage element in both modes on desktop and mobile: readability, contrast, gradients, animation, CTAs, metrics, branding, layout, hover, focus, and selected states.
3. Verify labelled options remain visible, keyboard-operable, and correctly selected across header/mobile/onboarding placements.
4. Re-run Phase 1 tests and verify direct updates, reload persistence, route changes, hard navigation to the artefact, and native cross-tab synchronisation in both directions.
5. Check React routes in both modes for mixed-theme surfaces and functional regressions, including the actual `/evidence/topic/:topicId` flow. Distinguish browser-confirmed issues from anticipated contrast risks.
6. Report changed files, tests, visual evidence, and unresolved issues; stop for approval before Phase 3.

## Risks and rollback
Main risks: light semantic defaults interacting with hardcoded dark surfaces, research-term layers becoming distracting or faint, selector overflow in mobile navigation, and accidental dark-mode or branding changes. Mitigate with incremental scoped tokens and route-by-route visual checks.

Rollback only Phase 2 presentation/selector edits and associated tests if acceptance fails. Preserve Phase 1's provider, storage key, standalone bridge, and synchronisation contract; leave analytical data and visualisation logic untouched.