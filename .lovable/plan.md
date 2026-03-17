

# Fix: Remove leftover code causing SyntaxError on line 4482

## Root cause

A previous edit intended to remove the "Emerging vs Declining Topics" (Card 3) only removed the function header and `try` block of `fetchAndRenderEmergence`, but left behind the `catch` block residue (lines 4476-4483) and the entire `renderEmergenceTables` function (lines 4485-4577). The orphaned `catch` block creates a **SyntaxError: Unexpected token '}'** at line 4482, which prevents the entire `<script>` from parsing — so `loadData()` is never defined and the network visualization never starts.

## Fix

Delete lines 4476-4577 in `public/artefact/index.html`. This removes:
- Line 4476: `// fetchAndRenderEmergence — removed` comment
- Lines 4477-4483: orphaned `catch` block / closing braces causing the syntax error
- Lines 4485-4577: the now-unused `renderEmergenceTables()` function

No other files are touched. The line immediately before (4474-4475) ends `renderCorpusGrowthChart`, and the line after (4578+) starts `renderTemporalChart` — both remain intact.

## Files changed

- `public/artefact/index.html` — delete lines 4476-4577

