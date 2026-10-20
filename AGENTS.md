# Architecture rules

- Keep global theme preference in a React context using `eplt-theme` (`dark` or `light`, default `dark`), with direct in-page updates and native cross-tab storage events; this avoids synthetic event coupling.
- Keep the standalone artefact preference bridge independent of React and cover its storage contract alongside React tests; the static document must work after hard navigation without changing visualisation logic.
- Phase 1 applies `data-theme` on the document root without activating legacy React `.dark` tokens; existing token defaults and hardcoded dark surfaces must remain visually unchanged until the approved visual coverage phases.