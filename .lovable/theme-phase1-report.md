# Phase 1 — global theme foundation and storage synchronisation

## Implemented

- React ThemeProvider owns the current preference and updates state directly.
- Shared `eplt-theme` preference accepts `dark` and `light`, defaults to dark, survives reload and hard navigation, and synchronises via native cross-tab storage events only.
- Shared header and onboarding controls use the provider. The existing artefact switch uses a small independent bridge with the same contract.
- Root `data-theme` carries the selected preference across all React routes and the standalone artefact. No new routes or dependencies.
- Blocked storage falls back safely; in-page changes still work. Removed preferences reset to dark; malformed values are ignored during synchronisation.

## Changed files

Application: `src/App.tsx`, `src/main.tsx`, `src/components/layout/SiteHeader.tsx`, `src/components/intro/ModuleShell.tsx`, `src/components/ui/sonner.tsx`, `src/index.css`, `public/artefact/index.html`.

New foundation: `src/lib/themePreference.ts`, `src/components/theme/ThemeProvider.tsx`, `src/components/theme/ThemeToggle.tsx`, `public/theme-preference.js`.

Tests and project documentation: `src/test/themePreference.test.tsx`, `AGENTS.md`, `roadmap.md`, this report.

## Verified checks

- Eight focused automated tests: defaults/invalid values, direct state update without dispatched storage events, remount persistence, storage-event handling without write-back, unrelated keys/session storage/removal, blocked storage, unchanged legacy token activation, and the exact served artefact bridge.
- Chromium end-to-end: preference survives refresh, Start here navigation, and React-to-artefact hard navigation; real tabs synchronise in both directions using actual browser storage events. No runtime errors observed.
- Route checks: `/`, `/intro/1`, `/intro/2`, `/intro/3`, `/about`, `/policy`, `/contact`, `/artefact/index.html`, `/evidence/topic/14`.
- Before/after screenshots captured for homepage, About, onboarding and artefact. Body colours and existing token values compared against the baseline, unchanged.
- Preview build log reports build OK. No network rendering, simulation, data, charts, filters, or analytical logic changed.

## Existing issue and deliberate boundary

The React app previously rendered without `.dark` while combining light semantic token defaults with hardcoded dark page surfaces. Activating its legacy `.dark` tokens now would change existing appearance. Phase 1 therefore records `data-theme` without activating those overrides. Selecting Light Mode saves and synchronises the preference, but full React visual coverage is deferred to Phase 2. The artefact continues using its existing light rendering; its previously audited contrast shortcomings remain for Phase 3. This is not a claim of completed visual Light Mode coverage.

## Regression and rollback boundaries

No chart, filter, simulation or data regression is claimed beyond unchanged source and successful route loading; the full matrix remains Phase 4. It explicitly includes `/evidence/topic/:topicId`, both themes, valid/invalid IDs, topic data and charts, paper navigation, reload, and cross-route preference persistence.

Rollback should revert only these Phase 1 additions and integrations, restoring the previous artefact listener. Keep all dataset corrections and existing visualisation code unchanged. The unused `eplt-theme` key can safely remain in browser storage.

Phases 2–4 remain gated on explicit approval. No automatic continuation.