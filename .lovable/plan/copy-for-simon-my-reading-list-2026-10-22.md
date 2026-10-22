# Copy for Simon (My Reading List)

## What the user gets
- A discreet **Copy for Simon** button in the My Reading List action row, next to Remove selected / Clear all.
- With papers ticked it copies only those; with none ticked it copies the whole list (newest-saved first, matching the on-screen order).
- Disabled when the list is empty (the action row is already hidden in that case; the button also carries `disabled`).
- After a successful copy, brief inline feedback "Copied! Paste into Simon's chat to explore these papers." (announced to screen readers; the button label stays "Copy for Simon"; Simon is not opened automatically). On clipboard failure: "Couldn't copy — your browser blocked clipboard access" (no modal).
- Copying never changes saved papers, ticks, the open abstracts or navigation.

## Copied text (plain text)
```text
Papers selected from the Enterprise Policy Literacy corpus
Number of papers: N
Note: paper IDs are internal corpus identifiers, not DOIs.

1. [P1618] Full title
   Authors: ...
   Year: 2024 | Journal: ...
2. ...

Suggested request:
Based on the bibliographic metadata provided, help me explore potential thematic connections between these papers, identify questions worth investigating, and suggest possible implications for enterprise policy that would require verification through further reading.

Please analyse this selection using only the bibliographic metadata provided ... This is not a full-text literature review.
```
(The accuracy instruction is included verbatim.) Missing fields are written as "not recorded" — never guessed. No abstracts. Each paper appears exactly once; IDs not found in the corpus are skipped and the count reflects only included papers.

## Technical details
- New `public/simon-copy.js` exposing `window.EpltSimonCopy.buildMessage(papers)` — a pure formatter, independent of React, so it can be unit-tested.
- `public/artefact/index.html`: include the script; add `<button id="rl-copy-simon" class="rl-link-btn">` with an aria-label and an `aria-live` status span; click handler resolves IDs from `rlSelection` (or `EpltReadingList.list()`) against `allData.libraryPapers`, writes via `navigator.clipboard.writeText` with a hidden-textarea `execCommand('copy')` fallback, then shows feedback. `rlUpdateToolbar` also sets the button's disabled state.
- `public/reading-list.js` (storage) is not modified.
- New `src/test/simonCopy.test.ts`: count, exactly-once, no abstract text, verbatim limitation text, "not recorded" for missing metadata.
- AGENTS.md: one rule that Simon export text is built only by the shared formatter.

## Verification
Playwright in Light and Dark: empty list (disabled), 1 paper, 3 ticked, none ticked (full list), 120 saved papers — read the clipboard and check the IDs, metadata and absence of abstracts. For 120 papers, confirm the full text is copied without truncation (last entry and closing limitation present) and the stated count equals the number of listed records. Keyboard: Tab to the button, Enter/Space copies. Clipboard denied → the failure message shows and nothing else changes. Run vitest; report files changed and stop for review.

## Not changed
Simon's widget, Supabase, corpus, D3, tooltips, zoom, theme system, bookmark storage; no DOI enrichment or exports.
