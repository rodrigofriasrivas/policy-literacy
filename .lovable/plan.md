

# Fix Corpus Growth Chart — Implementation Plan

## Diagnosis (confirmed)

The `fetchAndRenderCorpusGrowth()` function in `public/artefact/index.html` (lines 4432-4622) currently:
- Waits for `allData.papers` to load (the in-memory cache)
- That cache only contains papers matched via `topic_paper_links` (~3,500 papers)
- Deduplicates by ID and counts per year
- Result: **Y-axis = topic-linked papers per year**, not the full corpus

The view `v_chart1_corpus_growth` already exists and counts **all papers from the `papers` table** grouped by year (1980-2025), with zeros for missing years. It is granted to `anon`.

## Changes (single file: `public/artefact/index.html`)

### 1. Replace `fetchAndRenderCorpusGrowth()` body (lines 4432-4622)

Replace the entire 190-line function with ~30 lines:
- Fetch directly from `v_chart1_corpus_growth` using the existing `fetchFromSupabase()` helper
- Map rows to `{ year, count: row.papers_count }`
- Trim trailing zero-count years
- Log the data source and sample counts
- Call `renderCorpusChartD3(container, fullData)` (unchanged)

No polling loop, no `allData` dependency, no deduplication logic needed — the view handles it all.

### 2. Update the subtitle text (line 1480-1482)

Change from:
> "Shows how the volume of policy research has expanded over the analysis period."

To:
> "Shows the total number of papers in the corpus by year."

### What stays the same

- `renderCorpusChartD3()` function (lines 4624-4697) — untouched
- Chart container and visual style — untouched
- Emerging vs Declining Topics — untouched
- Bigram trends — untouched
- All other temporal sections — untouched

