

# Plan: Topic Temporal Chart (Final Update)

## Overview
This update finalizes the Topic Exploration temporal chart to support responsible policy literacy by adding explicit axis labels, improved tick intervals, enhanced line contrast, and a mandatory interpretive text block that removes ambiguity for readers.

## Changes Summary

### A. X-Axis Updates
- Expand ticks to show every 5 years: `[1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]`
- Maintain numeric axis with fixed domain 1980-2025
- All ticks visible even when topic has no data in early years

### B. Y-Axis Addition
- Add visible YAxis component with label: "Number of papers containing the bigram (per year)"
- Light tick styling (low visual weight)
- Numerically explicit values
- Increase left margin to accommodate label

### C. Line Styling Enhancement
- Maintain strokeWidth at 2.5 (already compliant)
- Darken grey palette slightly for better contrast
- Keep existing 5-line structure and tooltip

### D. Interpretive Text Block
Replace current caption with a structured "How to read this visual" block containing:
- Plain language explanation of what each line represents
- Explanation of horizontal axis (years)
- Explanation of vertical axis (paper counts)
- Disclaimer about what the chart does NOT measure
- Statement of intended purpose

## File Changes

| File | Changes |
|------|---------|
| `src/components/TopicTemporalChart.tsx` | Add YAxis, update X ticks, adjust margins, darken colors |
| `src/pages/TopicExploration.tsx` | Replace caption with interpretive text block |

---

## Technical Details

### TopicTemporalChart.tsx Changes

**Imports:** Add `YAxis` from recharts

**Colors:** Adjust to slightly darker greys:
```typescript
const COLORS = [
  "hsl(0 0% 10%)",   // darkest (was 15%)
  "hsl(0 0% 25%)",   // (was 30%)
  "hsl(0 0% 40%)",   // (was 45%)
  "hsl(0 0% 50%)",   // (was 55%)
  "hsl(0 0% 60%)",   // lightest (was 65%)
];
```

**Chart Height:** Increase from 180px to 220px to accommodate Y-axis label

**Margins:** Adjust left margin for Y-axis label: `{ top: 10, right: 15, bottom: 5, left: 60 }`

**X-Axis Ticks:**
```typescript
ticks={[1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]}
```

**Y-Axis Addition:**
```typescript
<YAxis
  axisLine={false}
  tickLine={false}
  tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
  width={50}
  label={{
    value: "Number of papers containing the bigram (per year)",
    angle: -90,
    position: "insideLeft",
    style: { 
      fontSize: 9, 
      fill: "hsl(var(--muted-foreground))",
      textAnchor: "middle"
    },
    offset: 0
  }}
/>
```

### TopicExploration.tsx Changes

**Replace caption (lines 99-102)** with the interpretive text block:

```tsx
<div className="mt-4 p-4 bg-muted/30 rounded border border-border">
  <p className="text-xs font-medium text-foreground mb-2">
    How to read this visual
  </p>
  <div className="space-y-2 text-xs text-muted-foreground">
    <p>
      Each line represents how often a key concept (bigram) appears in 
      the research corpus over time.
    </p>
    <p>
      The horizontal axis shows years (1980–2025).
    </p>
    <p>
      The vertical axis shows the number of papers in which the concept 
      appears in a given year.
    </p>
    <p className="pt-2 border-t border-border">
      This chart does not measure importance, quality, or impact of research. 
      It shows patterns of attention within the literature, helping compare 
      how concepts emerge, persist, or fade over time.
    </p>
  </div>
</div>
```

**Update skeleton height** to match new chart height: `h-[220px]`

---

## Visual Result

The updated chart will display:

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│ N │    ▄▄                                                       │
│ u │   ████▄▄                                                    │
│ m │  █████████▄▄▄                                               │
│ b │ ██████████████████▄▄▄▄▄                                     │
│ e │████████████████████████████████████████                     │
│ r │                                                             │
│   └────┬────┬────┬────┬────┬────┬────┬────┬────┬────→           │
│      1980 1985 1990 1995 2000 2005 2010 2015 2020 2025          │
│                                                                 │
│ ─── bigram 1  ─── bigram 2  ─── bigram 3  ─── bigram 4  ─── 5   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ How to read this visual                                         │
│                                                                 │
│ Each line represents how often a key concept (bigram) appears   │
│ in the research corpus over time.                               │
│                                                                 │
│ The horizontal axis shows years (1980–2025).                    │
│                                                                 │
│ The vertical axis shows the number of papers in which the       │
│ concept appears in a given year.                                │
│ ─────────────────────────────────────────────────────────────── │
│ This chart does not measure importance, quality, or impact of   │
│ research. It shows patterns of attention within the literature, │
│ helping compare how concepts emerge, persist, or fade over time.│
└─────────────────────────────────────────────────────────────────┘
```

## Design Principles Applied

| Principle | Implementation |
|-----------|----------------|
| No free interpretation | Explicit Y-axis label with full description |
| Plain language | "Number of papers" not "frequency" or "weight" |
| Epistemic integrity | Disclaimer about what chart does NOT measure |
| Reusable standard | Interpretive block can be adapted for future visuals |
| Low cognitive load | Light tick styling, clear structure |

## What Does NOT Change

- Multi-line structure (5 bigrams per topic)
- Tooltip functionality (already working)
- Forward-fill logic in data hook
- Legend at bottom
- Fixed X-axis domain 1980-2025
- Temporal Evolution tab (global view) - untouched

