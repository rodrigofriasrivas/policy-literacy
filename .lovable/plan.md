

# Update bar chart tooltip to show cumulative totals

## Change

In `src/pages/IntroModule2.tsx`, two modifications:

1. **Pre-compute cumulative totals** after data loads — create a `Map<number, number>` mapping each year to its running total.

2. **Update tooltip text** (around line 141) from `{d.year} — {d.count} papers` to `{d.year} — {d.count} papers that year · {cumulative.toLocaleString()} total to date`.

### Implementation detail

After `data` is set, derive cumulative map with `useMemo`:

```tsx
const cumulativeByYear = useMemo(() => {
  const map = new Map<number, number>();
  let running = 0;
  for (const d of data) {
    running += d.count;
    map.set(d.year, running);
  }
  return map;
}, [data]);
```

Then in the tooltip JSX (line ~141):
```tsx
<div className="m2-bar-tooltip">
  {d.year} — {d.count} papers that year · {cumulativeByYear.get(d.year)?.toLocaleString()} total to date
</div>
```

## Files changed
- `src/pages/IntroModule2.tsx`

