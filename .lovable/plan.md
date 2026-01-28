

# Plan: Multi-Line Bigram Temporal Chart

## Overview
Replace the current single-line temporal chart with a multi-line chart showing how each of the 5 bigrams associated with the selected topic evolves over time. This reveals the internal conceptual dynamics of each topic.

## Data Structure

Each topic has exactly 5 distinct bigrams. For each bigram, we need paper counts per year:

```text
Example for Topic 24 (Digital Economy):
- big_data: 2017→1, 2018→1, 2022→1, 2023→3, 2024→5
- digital_economy: 2020→1, 2022→2, 2023→4, 2024→9
- digital_transformation: 2019→1, 2022→1, 2023→6, 2024→18
- informal_entrepreneurship: 2012→3, 2014→3, 2016→1, ...
- technological_progress: 1994→1, 2004→1, 2009→1, ...
```

## Implementation Strategy

### Fixed X-Axis Range
All charts will use a fixed range of 1980–2025 (corpus spans 1981–2025). This ensures visual consistency across topics.

### Forward-Fill Missing Years
For years after a bigram's first appearance where no publications exist, extend the line horizontally using the last observed value. This prevents misleading "drops to zero" and shows persistence.

```text
Before (raw data):     After (forward-fill):
2020 → 2               2020 → 2
[no 2021]              2021 → 2  (carried forward)
2022 → 4               2022 → 4
[no 2023]              2023 → 4  (carried forward)
2024 → 6               2024 → 6
```

### Data Transformation
Transform bigram data into recharts format with all 5 bigrams as separate series:

```typescript
// Output structure for recharts
[
  { year: 1980, big_data: null, digital_economy: null, ... },
  { year: 1981, big_data: null, digital_economy: null, ... },
  ...
  { year: 2017, big_data: 1, digital_economy: null, ... },
  { year: 2018, big_data: 1, digital_economy: null, ... },
  ...
  { year: 2025, big_data: 5, digital_economy: 9, ... },
]
```

## Visual Design

| Element | Specification |
|---------|---------------|
| Chart type | Multi-line chart (5 lines maximum) |
| X-axis | Fixed range 1980–2025, minimal ticks |
| Y-axis | Hidden (no numerical labels) |
| Colors | 5 distinct neutral grey tones for each line |
| Height | Increased to ~180px (more lines need more space) |
| Legends | Simple legend showing bigram names below chart |
| Tooltips | Disabled (visual reading aid only) |
| Grid lines | Hidden |

### Color Palette (5 grey tones)
```text
Line 1: hsl(0 0% 20%)  - darkest
Line 2: hsl(0 0% 35%)
Line 3: hsl(0 0% 50%)  - mid
Line 4: hsl(0 0% 65%)
Line 5: hsl(0 0% 80%)  - lightest
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useTopicTemporalData.ts` | Update to fetch bigram-level data with forward-fill |
| `src/components/TopicTemporalChart.tsx` | Replace with multi-line chart |
| `src/pages/TopicExploration.tsx` | Update skeleton height (120px → 180px) |

## Hook Changes

**File:** `src/hooks/useTopicTemporalData.ts`

New query and transformation logic:

```typescript
export function useTopicTemporalData(topicId?: number) {
  return useQuery({
    queryKey: ["topic-temporal-data", topicId],
    queryFn: async () => {
      // Fetch bigram-paper-year associations
      const { data, error } = await supabase
        .from("topic_paper_links")
        .select("paper_id, bigram, papers!inner(year)")
        .eq("topic_id", topicId!)
        .not("bigram", "is", null);

      if (error) throw error;

      // 1. Count papers per bigram per year
      const bigramYearCounts = new Map<string, Map<number, Set<number>>>();
      
      data.forEach((link) => {
        const bigram = link.bigram;
        const year = link.papers?.year;
        if (!bigram || !year) return;
        
        if (!bigramYearCounts.has(bigram)) {
          bigramYearCounts.set(bigram, new Map());
        }
        const yearMap = bigramYearCounts.get(bigram)!;
        if (!yearMap.has(year)) {
          yearMap.set(year, new Set());
        }
        yearMap.get(year)!.add(link.paper_id);
      });

      // 2. Get all unique bigrams
      const bigrams = Array.from(bigramYearCounts.keys()).sort();

      // 3. Build chart data with fixed x-axis 1980-2025
      const years = Array.from({ length: 46 }, (_, i) => 1980 + i);
      
      const chartData = years.map((year) => {
        const row: Record<string, number | null> = { year };
        
        bigrams.forEach((bigram) => {
          const yearMap = bigramYearCounts.get(bigram);
          const count = yearMap?.get(year)?.size ?? null;
          row[bigram] = count;
        });
        
        return row;
      });

      // 4. Forward-fill: carry last value forward for each bigram
      bigrams.forEach((bigram) => {
        let lastValue: number | null = null;
        let hasStarted = false;
        
        chartData.forEach((row) => {
          if (row[bigram] !== null) {
            lastValue = row[bigram] as number;
            hasStarted = true;
          } else if (hasStarted && lastValue !== null) {
            row[bigram] = lastValue;
          }
        });
      });

      return { chartData, bigrams };
    },
    enabled: topicId !== undefined,
  });
}
```

## Chart Component Changes

**File:** `src/components/TopicTemporalChart.tsx`

Replace with multi-line chart:

```typescript
import { LineChart, Line, XAxis, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "hsl(0 0% 20%)",
  "hsl(0 0% 35%)",
  "hsl(0 0% 50%)",
  "hsl(0 0% 65%)",
  "hsl(0 0% 80%)",
];

interface TopicTemporalChartProps {
  data: Array<Record<string, number | null>>;
  bigrams: string[];
}

export function TopicTemporalChart({ data, bigrams }: TopicTemporalChartProps) {
  if (!data || data.length === 0 || !bigrams || bigrams.length === 0) {
    return null;
  }

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            domain={[1980, 2025]}
            ticks={[1980, 1990, 2000, 2010, 2020]}
          />
          {bigrams.map((bigram, index) => (
            <Line
              key={bigram}
              type="monotone"
              dataKey={bigram}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={1.5}
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

## Integration Update

**File:** `src/pages/TopicExploration.tsx`

Update the chart section to pass new props:

```typescript
{/* Temporal evolution chart */}
<section className="space-y-2">
  {temporalLoading ? (
    <Skeleton className="h-[180px]" />
  ) : temporalData?.chartData && temporalData.chartData.length > 0 ? (
    <>
      <TopicTemporalChart 
        data={temporalData.chartData} 
        bigrams={temporalData.bigrams} 
      />
      <p className="text-xs text-muted-foreground">
        This timeline shows how the internal concepts of this topic have evolved 
        within the research corpus over time.
      </p>
    </>
  ) : null}
</section>
```

## What Changes

| Aspect | Before | After |
|--------|--------|-------|
| Chart type | Single area (paper count) | 5 separate lines (per bigram) |
| X-axis | Dynamic range | Fixed 1980–2025 |
| Height | 120px | 180px |
| Legend | None | Shows 5 bigram names |
| Data source | Paper count per year | Bigram paper count per year |
| Missing years | Gaps | Forward-filled |

## What Does NOT Change

- Temporal Evolution tab (global matrix view) - untouched
- Other views (Field Overview, Paper Listing) - untouched
- Key Bigrams and Temporal Trajectory cards - remain in place
- Database structure - no migrations needed
- No weights, percentages, or statistical explanations displayed

## User Experience Outcome

A user viewing Topic 24: Digital Economy will see:
- 5 distinct lines representing: big_data, digital_economy, digital_transformation, informal_entrepreneurship, technological_progress
- technological_progress starting earliest (1994) as a persistent baseline
- digital_transformation emerging later (2019) with steep recent growth
- Clear visual indication of which concepts are emerging vs. established within the topic

This enables intuitive understanding of topic internal dynamics without statistical knowledge.

