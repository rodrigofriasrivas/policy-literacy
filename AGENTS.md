# Architecture rules

- Keep global theme preference in a React context using `eplt-theme` (`dark` or `light`, default `dark`), with direct in-page updates and native cross-tab storage events; this avoids synthetic event coupling.
- Keep the standalone artefact preference bridge independent of React and cover its storage contract alongside React tests; the static document must work after hard navigation without changing visualisation logic.
- Phase 1 applies `data-theme` on the document root without activating legacy React `.dark` tokens; existing token defaults and hardcoded dark surfaces must remain visually unchanged until the approved visual coverage phases.
- React presentation uses paired semantic CSS tokens with light overrides scoped to root `data-theme`; preserve dark values and leave the standalone artefact stylesheet independent to avoid altering analytical rendering.
- Shared React theme selectors use the existing Radix single-selection primitive and ThemeProvider; this keeps keyboard selection and persisted state on one contract.
- Standalone Artefact presentation uses paired CSS tokens and a class-observed canvas paint cache; theme changes must never reinitialise views, charts, selections or physics, preserving live analytical state.
- Keep standalone global-header styling and its mobile menu local to the static document, mirroring React header metrics without importing React or changing the shared preference bridge; this preserves independent hard-navigation rendering.- The Artefact Reading List has one store, `public/reading-list.js` (`window.EpltReadingList`, versioned `eplt-reading-list` key holding paper IDs with `savedAt`); every entry point, including future network cards, must use it, and unreadable data is never overwritten.

- "Copy for Simon" text is built only by `public/simon-copy.js` (`window.EpltSimonCopy`) from bibliographic metadata; never include abstracts or invented fields, so output stays consistent and testable.
