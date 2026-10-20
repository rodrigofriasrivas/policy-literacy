# Phase 4: Full-site theme regression

## Verified (Chromium, 1280x900 and 375x812)
- React Light selection carries into `/artefact/index.html` (body `theme-light`, Artefact toggle off); reverse direction also verified.
- Artefact toggle writes the shared `eplt-theme` preference in both directions.
- Returning to React restores the saved theme; the labelled selector shows the correct active option.
- Artefact theme switches preserve loaded data (3,682 connected papers, 25 topics) and active view; Phase 3 checks covered node positions, zoom, filters, selections and library state.
- `/evidence/topic/:topicId`: topics 14 and 2 in both themes (info card, bigram cards, trend chart, papers); invalid ID 999 renders without crashing.
- Theme test suite: 11/11 passed.

## Observations
- Invalid topic IDs show the shell with an empty card rather than an explicit "topic not found" message (pre-existing behaviour, unchanged).
- Console shows pre-existing React ref warnings in development; no runtime errors.

## Deferred (outside current scope)
- Header unification: the Artefact keeps its own black header and sidebar "Grey/Dark mode" toggle; React pages use the shared header with the labelled Light/Dark selector. Address separately after Phase 4.
