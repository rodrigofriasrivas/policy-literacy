# Theme roadmap

- [ ] Update Contact wording and About author credentials to the uploaded brief; verify both themes and desktop/mobile without unrelated changes.
- [x] Phase 1: shared theme preference, React provider, existing artefact toggle bridge, shared header/onboarding toggle, persistence and synchronisation tests.
- [x] Phase 2: React visual Light Mode coverage, complete homepage adaptation and labelled segmented selector — accepted after user review.
- [x] Phase 3: Artefact presentation remediation completed; header/active-tab fixes, both-mode view captures, ten theme tests and targeted live-state regression checks passed; ready for user review.
- [x] Phase 4: full regression matrix including `/evidence/topic/:topicId` and React/Artefact preference round-trips — complete and accepted by user (20 Oct 2026).
- [x] Artefact header now has the labelled Light | Dark selector (legacy sidebar switch removed); headers otherwise remain separate by design.
- [x] Align standalone global header presentation with the React header; internal navigation and analytical state preserved; both themes verified at 1280/768/375px, cross-navigation and native synchronisation passed, 11/11 regression tests passed.
- [ ] Follow-up: invalid topic route (`/evidence/topic/:topicId` with an unknown ID) shows the shell with an empty card instead of an explicit "topic not found" message — pre-existing behaviour, address separately.
- [ ] Follow-up: pre-existing React ref warnings in development console; non-blocking, no runtime errors — clean up separately.

Phase 1 must preserve existing rendering, dark appearance, navigation, data, and analytical logic. No export mode is in scope.