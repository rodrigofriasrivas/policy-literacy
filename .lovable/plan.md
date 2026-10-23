# Temporal Evolution: full-width 2 × 2 chart layout

## The four charts (current order, kept)

```text
Desktop (> 1100px wide content)
+-----------------------------+-----------------------------+
| 1. Corpus Growth (annual)   | 2. Topic distribution       |
|    bar chart                |    across the corpus        |
+-----------------------------+-----------------------------+
| 3. Topic Prevalence Over    | 4. Topic trends over time   |
|    Time (+ expand, legend)  |    (selector, tags, legend) |
+-----------------------------+-----------------------------+
Tablet / mobile: one column, same order 1 → 4.
```

Cards in the same row stretch to equal height; all titles, subtitles, legends, the expand button, the topic selector and tooltips stay as they are.

## Changes (only `public/artefact/index.html`)

1. **Sidebar:** add `'temporal'` to the existing Topics rule in `switchView`, so Temporal Evolution gets `is-hidden-sidebar` (fully removed, no "Controls disabled" box). Papers and My Reading List keep the greyed state; both classes stay toggled per view, so Network/Topic Detail restore the sidebar as today.
2. **Grid:** replace the inline `max-width: 900px` wrapper with a class `temporal-grid` — `max-width: 1560px`, centered, `padding: 8px 32px 32px` (same as Topics), CSS grid with 2 columns and 24px gap; collapses to 1 column below ~1100px content width. Card bottom margins inside the grid set to 0 so spacing comes from the gap.
3. **Chart sizing:** the charts measure their container width once when drawn and the data is loaded once. Two safe steps:
   - The sidebar class is applied before `loadTemporalView()` runs, so the first draw already uses the new card width.
   - Add a small debounced ResizeObserver on the four chart containers that re-calls the existing render functions with the already-loaded data (no refetch), keeping the Chart 4 topic selection. This also fixes resizing on window changes. If a chart's current selection can't be preserved by its existing render function, I'll skip re-render for that chart and report it instead.
4. Chart heights unchanged (200 / 520 / prevalence default / 400), so labels keep their current size; Chart 2's 520px card will set the first row's height and Card 1 will show extra space below its chart — acceptable, or I can vertically center it.

## Not touched

Chart data, scales, colours, ordering, tooltips, the expand modal, the network/D3 simulation, header, navigation, theme system, Topics/Papers/Reading List/Topic Detail views, and `?figure=3.2` / `?figure=3.3`.

## Verification

- 1440px and 1280px: 2 × 2 grid, no sidebar, no clipping, tooltips and Chart 4 selector work, expand modal opens.
- 1024px and 390px: single column, no horizontal overflow.
- Light and Dark.
- Network restores the sidebar after Temporal; Papers / Reading List still greyed; Topics unchanged; figure modes unchanged.
- 26 automated tests pass.
