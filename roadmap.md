# Theme roadmap

- [x] Restore opaque paper and key-term node information surfaces only; real node hover/selection, both themes, network-independent card pixels, dismissal and live state preservation verified; 11/11 existing tests passed.

- [x] Update Contact wording and About author credentials to the uploaded brief; contact links, both themes and 1280px/375px layouts verified without overflow or runtime errors; 11/11 regression tests passed. Only ContactPage.tsx and AboutPage.tsx changed in application code.
- [x] Phase 1: shared theme preference, React provider, existing artefact toggle bridge, shared header/onboarding toggle, persistence and synchronisation tests.
- [x] Phase 2: React visual Light Mode coverage, complete homepage adaptation and labelled segmented selector — accepted after user review.
- [x] Phase 3: Artefact presentation remediation completed; header/active-tab fixes, both-mode view captures, ten theme tests and targeted live-state regression checks passed; ready for user review.
- [x] Phase 4: full regression matrix including `/evidence/topic/:topicId` and React/Artefact preference round-trips — complete and accepted by user (20 Oct 2026).
- [x] Artefact header now has the labelled Light | Dark selector (legacy sidebar switch removed); headers otherwise remain separate by design.
- [x] Align standalone global header presentation with the React header; internal navigation and analytical state preserved; both themes verified at 1280/768/375px, cross-navigation and native synchronisation passed, 11/11 regression tests passed.
- [x] Topic View card alignment: removed the 1400px centered wrapper so the topic brief and network cards span the full section width and align with the sections below; cards stack below 768px; topics 1/2/14 verified in both themes at 1280px and 375px with no overflow; 11/11 regression tests passed.
- [x] Search & Reading List Stage 1: exact paper ID search (1618 / P1618, no substring matches), network-only scope explained; awaiting user approval.
- [x] Stage 2: Reading List (bookmarks in Papers + Topic tables, Reading List (n) view, shared versioned store, cross-tab sync, unreadable data preserved); awaiting user review.
- [x] Stage 3: bookmark on the existing paper hover card (shared store, 250 ms grace, card frozen while hovered); Macro + Topic View, both themes verified; awaiting user review.
- [x] My Reading List rename, Clear all, multi-select with Remove selected (temporary selection, inline confirmation); 120-paper list, both themes, cross-tab verified; awaiting user review.
- [ ] Follow-up: invalid topic route (`/evidence/topic/:topicId` with an unknown ID) shows the shell with an empty card instead of an explicit "topic not found" message — pre-existing behaviour, address separately.
- [ ] Follow-up: pre-existing React ref warnings in development console; non-blocking, no runtime errors — clean up separately.

Phase 1 must preserve existing rendering, dark appearance, navigation, data, and analytical logic. No export mode is in scope.
- [x] Copy for AI Assistant in My Reading List (selected or whole list, metadata only, approved wording); button renamed from "Copy for Simon" per user request.
- [x] Figure 3.2 (25 Research Conversations grid): larger topic cards and full-width layout in the standalone artefact, accepted by user; thesis figure supplied as a high-resolution Light Mode screenshot cropped to heading, description and 25 topic cards — no further platform changes required.
- [x] Figure 3.2 expanded topic cards: larger description (15.5 px), legible "Frequent terms" heading and term labels, cards grow to fit with no clipping, rows stay aligned; collapsed 5 × 5 unchanged; both themes verified with Topics 1-5 and the five longest descriptions; awaiting user review.

- [x] Figure 3.2 capture mode (`?figure=3.2`): sidebar/overlays hidden, Light Mode for that view only (saved preference untouched), Topics 1–5 expanded; PNG 2432 × 2546 delivered; awaiting user review.
