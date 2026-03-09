

# Fix Bigram Trends Chart (Card 5) + Remove Emerging vs Declining (Card 3)

## Summary

Two changes to the Temporal Evolution view in `public/artefact/index.html`:

1. **Remove Card 3** (Emerging vs Declining Topics) — lines 1508-1517 (HTML) and the JS functions `fetchAndRenderEmergence` / `renderEmergenceTables` (lines 4577-4700+). Also remove any call to `fetchAndRenderEmergence()`.

2. **Rewrite Card 5** (Bigram trends over time) to use the validated paper-based data source and correct topic schema.

## Card 5 Problems (current)

- Fetches topics with `select=id,label,color` — the `topics` table uses `topic_id`, `topic_name` (no `id`, `label`, or `color` columns), so the dropdown likely returns empty/broken data
- Uses `v_chart5_bigram_trends` which has a `value` column (frequency-based, not paper-based)
- The validated Topic View uses `v_chart5_bigram_trends_corrected` with `unique_papers_count` (paper-based)

## Card 5 Fix

### Data source
- Topic dropdown: `topics?select=topic_id,topic_name&order=topic_id.asc`
- Chart data: `v_chart5_bigram_trends_corrected?topic_id=eq.${topicId}&order=year.asc`
- Y-axis metric: `unique_papers_count` (papers per year, not frequency)

### Dropdown
- Default: no topic selected, show placeholder: "Choose a topic to see how its five main bigrams evolve over time."
- On selection: fetch and render chart
- Display format: `Topic ${topic_id}: ${topic_name}`
- Reuse the same dropdown pattern already in Card 5 (trigger + menu), just fix the column references

### Chart rendering
- Reuse the same D3 line chart pattern from the existing `renderChart()` in Card 5
- Group data by `bigram`, use `unique_papers_count` for Y values
- Y-axis label: "Papers per year" (not "Frequency")
- Same 5-color palette, same hover interactions, same tooltip with stable bigram ordering
- Zero values rendered as zero (no forward-fill, matching Topic View behavior)
- 5-year X-axis ticks: 1980, 1985, ..., 2025

### What stays the same
- Card container HTML structure (id="bigram-trends-chart", id="chart5-topic-selector", id="bigram-trends-legend")
- D3 line rendering approach (monotone curve, hover fade, crosshair overlay)
- Legend rendering pattern
- Corpus Growth — untouched
- Topic Prevalence — untouched
- Topic trends (Card 4) — untouched

## Files changed

- `public/artefact/index.html` only

