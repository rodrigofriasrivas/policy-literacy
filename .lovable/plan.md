# Stage 2 — My Reading List

All changes stay inside the standalone Artefact (`public/artefact/index.html`). The network, its hover cards, the global header, the theme system and the React site are not touched.

## What users will see

1. **Bookmark button on every paper row** in:
   - Papers (main library, all 5,799 papers, connected and not connected)
   - Topic View "Papers informing this topic" table
   A small outline bookmark icon sits in the row's action cell beside the existing expand arrow. It fills in when saved. Clicking it does not expand the row or change pagination, sort, search or filters. Labels read "Save to Reading List" / "Remove from Reading List".
2. **"Reading List (n)" link** added at the end of the secondary navigation (Network | Topics | Temporal Evolution | Papers | Reading List (n)). The count updates instantly.
3. **Reading List view**:
   - Short note: "Saved in this browser only. Clearing browser data will remove your list."
   - Saved papers shown newest-saved first with ID, year, title, authors, journal and connected/not connected status (only existing metadata).
   - Expand to read the existing abstract text on screen (no export).
   - "Remove" per paper, plus an empty state explaining how to save papers.
4. Saving in one tab updates bookmark icons, the count and the Reading List in every open tab.

## Out of scope (Stage 2)

Network hover-card bookmark (Stage 3), DOI enrichment, Simon integration, PDF/CSV/BibTeX or any export, Supabase changes.

## Technical details

- Storage: localStorage key `eplt-reading-list`, value `{ "version": 1, "items": [{ "id": <paper_id>, "savedAt": <ms> }] }`. Deduplicated by numeric `paper_id`; malformed or unknown-version data is ignored safely (treated as empty, never thrown).
- A small local module in the artefact script (`ReadingList.has/toggle/remove/list/subscribe`) owns read/write; UI refresh is driven by its subscribers plus the native `storage` event for cross-tab sync (no synthetic events, matching the theme pattern).
- Rows render the button via the existing row templates (library ~line 7100, topic table ~line 6240); click handler calls `stopPropagation`. Refresh only toggles `aria-pressed`/icon state on visible buttons — tables are not re-rendered, so page, sort, search and expansion state are preserved.
- Reading List view uses `switchView('reading-list')` with a new nav link and breadcrumb label, following existing view conventions; papers are resolved from `allData.libraryPapers` (full corpus).
- Styling uses existing paired tokens (`--text-primary`, `--text-secondary`, `--chart-row-border`, `--surface-abstract`, `--accent-color`) so Light and Dark both work; native `<button>` with `aria-pressed` and visible focus.
- Add a new AGENTS.md rule describing the reading-list storage contract.

## Verification

- Playwright, Light and Dark: save from Papers (connected and not-connected paper) and from Topic View; count updates; Reading List lists them; remove works; duplicates impossible; reload persists; second tab syncs both directions.
- Confirm page number, search text, sort and filters unchanged after bookmarking; network view, theme selector and navigation unaffected; no page errors.
- Vitest suite (11/11) plus new tests covering the storage contract (versioning, dedupe, malformed data).
- Screenshots: bookmark buttons in both tables and the Reading List view, both themes. Then stop for approval before Stage 3.
