

# Add Temporary Audit Table Below Corpus Growth Chart

## What and where

Insert a compact HTML table directly after the `corpus-growth-chart` div (line 1484), inside the same `stitch-card`. The table will be populated by the same `fetchAndRenderCorpusGrowth()` function using the same `fullData` array.

## Changes

### 1. HTML: Add audit table container (after line 1484)

Add a `<div id="corpus-growth-audit">` placeholder right after the chart div, before the closing `</div>` of the card (line 1485).

### 2. JS: Render audit table from same data (in `fetchAndRenderCorpusGrowth`, after line 4466)

After `renderCorpusChartD3(container, fullData)`, build and inject a compact HTML table into `#corpus-growth-audit` using the same `fullData` array:
- Two columns: Year | Papers
- Final row: **Total** | sum
- Compact styling: small font, monospace numbers, border-collapse, themed colors via CSS variables
- Horizontal scroll wrapper if needed
- Inline styles using existing CSS variables (`--text-primary`, `--text-secondary`, `--input-bg`, `--input-border`)

### 3. No other changes

- Chart rendering untouched
- No other sections modified
- Temporary — clearly labeled as "Audit Table"

