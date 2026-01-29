

# Plan: Fix Topic Exploration Multi-Line Bigram Temporal Chart

## Issues Identified

1. **X-axis not numeric**: The current XAxis is categorical (default), so `domain={[1980, 2025]}` is ignored
2. **Missing 2025 in ticks**: The ticks array stops at 2020, missing the end of the range
3. **Lines too faint**: Current strokeWidth of 1.5 and light grey colors disappear on light backgrounds
4. **No tooltip**: Tooltip was removed, making it impossible to see actual values
5. **Forward-fill working**: The hook already implements forward-fill correctly, but the chart may not be rendering it properly due to the categorical x-axis issue

## Solution

### File 1: `src/components/TopicTemporalChart.tsx`

Replace the current implementation with a fixed version:

**Changes:**
- Add `type="number"` to XAxis to make it truly numeric
- Add `allowDataOverflow={true}` to respect the domain
- Update ticks to `[1980, 1990, 2000, 2010, 2020, 2025]` (include both ends)
- Increase strokeWidth from 1.5 to 2.5 for better readability
- Adjust color palette to use darker, higher-contrast greys
- Add subtle CartesianGrid for visual reference
- Add Tooltip component with clean formatting

**New implementation:**

```typescript
import { LineChart, Line, XAxis, ResponsiveContainer, Legend, Tooltip, CartesianGrid } from "recharts";

const COLORS = [
  "hsl(0 0% 15%)",   // darkest
  "hsl(0 0% 30%)",
  "hsl(0 0% 45%)",
  "hsl(0 0% 55%)",
  "hsl(0 0% 65%)",   // lightest (still readable)
];

interface TopicTemporalChartProps {
  data: Array<Record<string, number | null>>;
  bigrams: string[];
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-background border border-border rounded px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-foreground mb-1">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-xs text-muted-foreground">
          <span style={{ color: entry.stroke }}>●</span>{" "}
          {entry.dataKey.replace(/_/g, " ")}: {entry.value ?? "—"}
        </p>
      ))}
    </div>
  );
};

export function TopicTemporalChart({ data, bigrams }: TopicTemporalChartProps) {
  if (!data || data.length === 0 || !bigrams || bigrams.length === 0) {
    return null;
  }

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            type="number"
            dataKey="year"
            domain={[1980, 2025]}
            allowDataOverflow={true}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            ticks={[1980, 1990, 2000, 2010, 2020, 2025]}
          />
          <Tooltip content={<CustomTooltip />} />
          {bigrams.map((bigram, index) => (
            <Line
              key={bigram}
              type="monotone"
              dataKey={bigram}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2.5}
              dot={false}
              connectNulls={false}
            />
          ))}
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="line"
            formatter={(value) => (
              <span style={{ fontSize: 10, color: "hsl(var(--muted-foreground))" }}>
                {value.replace(/_/g, " ")}
              </span>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### File 2: `src/hooks/useTopicTemporalData.ts`

The forward-fill logic is already correct, but ensure year values are always numbers:

**Minor adjustment:** Explicitly cast year to number when building the row to guarantee numeric type:

```typescript
const chartData = years.map((year) => {
  const row: Record<string, number | null> = { year: Number(year) };
  // ... rest unchanged
});
```

This is already correct in the current implementation (years array contains numbers from the start).

## Summary of Changes

| Issue | Fix |
|-------|-----|
| X-axis categorical | Add `type="number"` to XAxis |
| Domain ignored | Add `allowDataOverflow={true}` |
| Missing 2025 tick | Add 2025 to ticks array |
| Lines too faint | Increase strokeWidth to 2.5, use darker greys |
| No visual grid | Add subtle horizontal CartesianGrid |
| No tooltip | Add Tooltip with CustomTooltip component |

## Visual Result

The chart will now:
- Show a fixed range from 1980 to 2025 for every topic
- Display 5 distinct lines with better contrast
- Include a subtle horizontal grid for easier reading
- Show a tooltip on hover with year and bigram counts
- Properly forward-fill missing years (lines stay flat, never drop to zero)

