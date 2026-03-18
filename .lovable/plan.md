

# Y-axis ticks and label fix for IntroModule2

## Changes

### IntroModule2.tsx

1. **Compute Y-axis ticks** — derive ~5 evenly spaced tick values from 0 to `maxCount` (rounded to nearest 50 or 100).

2. **Restructure chart layout** — wrap the chart area in a flex container with two children:
   - Left: a `.m2-yaxis` column containing the rotated label and tick marks
   - Right: the existing chart content (period bands + bars)

3. **JSX structure:**
```tsx
<div className="m2-chart-outer" ref={chartRef}>
  {!loading && (
    <div className="m2-yaxis">
      <span className="m2-yaxis-label">Papers published per year</span>
      <div className="m2-yaxis-ticks">
        {yTicks.map(tick => (
          <span key={tick} className="m2-yaxis-tick"
            style={{ bottom: `${(tick / maxCount) * 100}%` }}>
            {tick}
          </span>
        ))}
      </div>
    </div>
  )}
  <div className="m2-chart-canvas">
    {/* existing period bands, bars, loading state */}
  </div>
</div>
```

4. **Tick computation** (using `useMemo`): calculate a nice interval (e.g. round `maxCount / 5` up to nearest 50), generate array `[0, interval, 2*interval, ...]` up to maxCount.

### index.css

1. **`.m2-chart-outer`** — change to `display: flex; align-items: stretch` with the existing height.

2. **`.m2-yaxis`** — fixed width (~48px), `position: relative`, holds both label and ticks.

3. **`.m2-yaxis-label`** — `position: absolute`, rotated 90° counter-clockwise, vertically centred within the axis column using `top: 50%; transform: rotate(-90deg) translateY(-50%)`, `transform-origin: center center`.

4. **`.m2-yaxis-ticks`** — `position: relative; height: 100%` container for absolute-positioned tick values.

5. **`.m2-yaxis-tick`** — `position: absolute; right: 0; font-size: 9px; color: rgba(255,255,255,0.3); transform: translateY(50%)` to align baseline with gridline.

6. **`.m2-chart-canvas`** — `flex: 1; position: relative; height: 100%` (takes over the role previously held by `.m2-chart-outer` for positioning bands/bars).

7. Update `.m2-bars`, `.m2-period-bands` parent references if needed (they use `position: absolute` relative to their container — now `.m2-chart-canvas`).

8. Remove duplicate `.m2-yaxis-label` declarations. On mobile, hide the Y-axis column entirely.

## Files touched
- `src/pages/IntroModule2.tsx`
- `src/index.css`

