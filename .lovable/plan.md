

# Fix: Add missing `fetchAndRenderBigramTrends()` call

## Root cause

The function `fetchAndRenderBigramTrends()` is fully implemented (lines 5316-5600+) but is never invoked. The initialization code around lines 4395-4419 calls `fetchAndRenderCorpusGrowth()` and `fetchAndRenderTopicTrends()` but omits `fetchAndRenderBigramTrends()`.

## Fix

Add `fetchAndRenderBigramTrends();` to the temporal view initialization block, alongside the other chart calls. Two locations need it:

1. **Line 4397** (after `fetchAndRenderTopicTrends();`) — the primary temporal data load path
2. **Line 4416** (after `fetchAndRenderCorpusGrowth();`) — the fallback/independent load path

This is a one-line addition in each location. No other changes needed — the dropdown, data fetching, and chart rendering logic are already correctly implemented.

## Files changed

- `public/artefact/index.html` — add two calls to `fetchAndRenderBigramTrends()`

