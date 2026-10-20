# Phase 2 implementation report

## Delivered
- Intentional Light Mode presentation for the complete homepage: animated term layers, reading gradients, heading/subtitle, CTA states, metrics, header/navigation, and footer branding.
- Compact labelled Light/Dark selector using the existing global preference and Radix single-selection primitive. Both options remain visible; keyboard focus, activation, and selected states are exposed accessibly.
- React About, Contact, Policy engagement, onboarding, and topic-view presentation adapted through semantic CSS tokens. Dark token values retained; no blanket activation of legacy `.dark` styles.
- Topic chart axes, grid, tooltip, legend, and series contrast adapted without changing chart calculations. Topic identities and categorical fills are unchanged; onboarding topic numbers use neutral light-mode text while existing coloured borders/dots retain differentiation.

## Application files changed
- `src/index.css`
- `src/pages/HomePage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/TopicExploration.tsx`
- `src/components/theme/ThemeToggle.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/topic/TopicSidebar.tsx`
- `src/components/topic/TopicInfoCard.tsx`
- `src/components/topic/BigramCards.tsx`
- `src/components/topic/BigramTrendsChart.tsx`
- `src/components/topic/PapersTable.tsx`
- `src/test/themePreference.test.tsx`

Documentation: `AGENTS.md`, `roadmap.md`, approved plan, and this report. No changes to the provider, preference utility, standalone bridge, artefact document, or datasets.

## Verification performed
- Theme test suite: **9/9 passed**, including all eight Phase 1 tests and a new concrete selector/state/persistence test.
- Latest preview build: successful.
- Desktop screenshots at 1280×1800: `/`, `/about`, `/contact`, `/policy`, `/intro/1`, `/intro/2`, `/intro/3`, and `/evidence/topic/14`, in both modes. No page runtime errors observed.
- Mobile checks at 375×812: homepage, About, onboarding 1/3, topic 14, and open/closed navigation. No document-level horizontal overflow observed. Light homepage title wrapping corrected after screenshot inspection.
- Browser keyboard check: arrow-key focus then Space activation; selected mode persisted after reload.
- Real same-origin tabs: native cross-tab synchronisation in both directions.
- Navigation: Start here to onboarding; Explore the field hard navigation to the artefact with preference retained.
- Topic data readback: Topics 1, 2, 14, and 25; embedded document receives both theme changes through its existing bridge.
- Paper expansion and pagination verified against real topic 14 data.
- Onboarding modal: CTA remains disabled initially and enabled after the existing 2.5-second delay.
- Settled CTA normal/hover and selector foreground/background colours checked. Light primary CTA uses white text on dark teal; active selector uses dark text on white.

## Findings and limits
- Browser inspection identified a clipped Light Mode mobile homepage heading, faint hamburger lines, and an overly dark About watermark; these were corrected in Phase 2.
- Dark desktop screenshots preserve existing composition and appearance apart from the requested selector. Dark colour values and animation behaviour retained; animated content prevents meaningful whole-image pixel equality.
- The original Dark Mode mobile homepage heading behaviour is deliberately retained rather than silently redesigned.
- Embedded network light-mode contrast and chat appearance remain the existing artefact implementation, pending Phase 3. No network layout, simulation, filters, zoom, or visualisation logic was changed.
- This is targeted Phase 2 validation, not the final exhaustive accessibility/contrast and functional Phase 4 matrix. Invalid topic IDs and all interactive artefact states remain in that later matrix.

## Approval boundary and rollback
Phase 2 is ready for review. Phase 3 has not begun and requires separate approval. Phase 4 retains `/evidence/topic/:topicId` in both themes, including valid/invalid IDs and paper navigation.

Rollback only the Phase 2 presentation and selector edits plus their new test. Keep Phase 1 architecture, storage key, native synchronisation, standalone bridge, datasets, and visualisation logic intact.