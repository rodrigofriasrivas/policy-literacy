

# Plan: Add Temporal Evolution Chart to Topic Exploration

## Overview
Add a simple area chart within the Topic Exploration view that visualizes how the selected topic has evolved over time. The chart will serve as a reading aid, allowing non-technical users to intuitively understand whether a topic is emerging, growing, stabilizing, or declining.

## Placement
The chart will appear as a new subsection directly below the topic title and definition, before the existing Key Bigrams and Temporal Trajectory cards. This ensures users see the temporal context immediately after understanding what the topic is about.

```text
┌────────────────────────────────────────────────────────────────┐
│ ← All topics                                                    │
├────────────────────────────────────────────────────────────────┤
│ Topic X: Topic Name                                             │
│ Definition text...                                              │
├────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────┐ │
│ │              ▄▄▄▄▄▄▄▄▄████████████████████                 │ │
│ │          ▄▄██████████████████████████████                  │ │
│ │      ▄▄████████████████████████████████████                │ │
│ │  ▄▄████████████████████████████████████████████████        │ │
│ └────────────────────────────────────────────────────────────┘ │
│ This timeline shows how this topic has evolved within the       │
│ research corpus over time.                                      │
├────────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐  ┌─────────────────┐                        │
│ │  Key Bigrams    │  │  Temporal       │                        │
│ │                 │  │  Trajectory     │                        │
│ └─────────────────┘  └─────────────────┘                        │
└────────────────────────────────────────────────────────────────┘
```

## Data Source
The chart will derive temporal data by counting papers linked to the selected topic per year:

```sql
SELECT year, COUNT(DISTINCT paper_id) as paper_count 
FROM topic_paper_links 
JOIN papers ON topic_paper_links.paper_id = papers.paper_id 
WHERE topic_id = [selected_topic] AND year IS NOT NULL 
GROUP BY year 
ORDER BY year
```

This uses existing tables (`topic_paper_links` and `papers`) with no new database changes required.

## Visual Design

| Element | Specification |
|---------|---------------|
| Chart type | Area chart with subtle fill |
| X-axis | Years (minimal tick marks, no label) |
| Y-axis | Hidden (no numerical labels) |
| Color | Neutral grey fill (`hsl(0 0% 50% / 0.2)`) with darker stroke |
| Height | Fixed, compact (approximately 120px) |
| Legends | None |
| Tooltips | Disabled (no interactivity needed) |
| Grid lines | Hidden |

The visual intent is a simple silhouette that shows the shape of change over time.

## Implementation Details

### New Hook
**File:** `src/hooks/useTopicTemporalData.ts`

A new hook that fetches paper counts by year for a given topic:

```typescript
export function useTopicTemporalData(topicId?: number) {
  return useQuery({
    queryKey: ["topic-temporal-data", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_paper_links")
        .select("paper_id, papers!inner(year)")
        .eq("topic_id", topicId!);
      
      if (error) throw error;
      
      // Deduplicate and count papers per year
      const yearCounts = new Map<number, Set<number>>();
      data.forEach((link) => {
        const year = link.papers?.year;
        if (year) {
          if (!yearCounts.has(year)) yearCounts.set(year, new Set());
          yearCounts.get(year)!.add(link.paper_id);
        }
      });
      
      return Array.from(yearCounts.entries())
        .map(([year, papers]) => ({ year, count: papers.size }))
        .sort((a, b) => a.year - b.year);
    },
    enabled: topicId !== undefined,
  });
}
```

### Chart Component
**File:** `src/components/TopicTemporalChart.tsx`

A minimal, self-contained component using recharts:

```typescript
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";

interface TopicTemporalChartProps {
  data: Array<{ year: number; count: number }>;
}

export function TopicTemporalChart({ data }: TopicTemporalChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="h-[120px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            interval="preserveStartEnd"
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="hsl(0 0% 50%)"
            fill="hsl(0 0% 50% / 0.2)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Integration in TopicExploration
**File:** `src/pages/TopicExploration.tsx`

Add the chart section between the topic header and the existing cards:

```typescript
// After the header section (line ~85), before isLoading check
{/* Temporal evolution chart */}
<section className="space-y-2">
  {temporalLoading ? (
    <Skeleton className="h-[120px]" />
  ) : temporalData && temporalData.length > 0 ? (
    <>
      <TopicTemporalChart data={temporalData} />
      <p className="text-xs text-muted-foreground">
        This timeline shows how this topic has evolved within the research corpus over time.
      </p>
    </>
  ) : null}
</section>
```

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/hooks/useTopicTemporalData.ts` | Create | Fetch paper counts by year for selected topic |
| `src/components/TopicTemporalChart.tsx` | Create | Minimal area chart component |
| `src/pages/TopicExploration.tsx` | Modify | Integrate chart section |

## What Will NOT Change

- Temporal Evolution page (global matrix view) - untouched
- Existing Key Bigrams and Temporal Trajectory cards - remain in place
- Database structure - no migrations needed
- Other views - Field Overview, Paper Listing unaffected

## Constraints Satisfied

| Requirement | How Addressed |
|-------------|---------------|
| Placement within Topic Exploration | Chart appears below title/definition |
| Not a new tab or page | Integrated as subsection |
| Uses existing Supabase data | Derives from topic_paper_links + papers |
| Simple visual (area chart) | AreaChart with minimal styling |
| X-axis: years | Year labels shown |
| Y-axis: no percentages | Y-axis completely hidden |
| No legends | None rendered |
| No multiple topic comparison | Single topic only |
| No weights/scores shown | Only visual shape, no numbers |
| Caption provided | Minimal explanatory text included |

## User Experience Outcome

A non-technical user viewing Topic 1: New Venture Creation will see:
- A chart rising from the 1980s through 2024
- Clear visual indication that this is a mature, established topic

A user viewing Topic 20: Digital Business Models will see:
- A chart starting around 2003 and rising steeply toward 2024
- Clear visual indication that this is an emerging topic

This enables immediate intuitive understanding without requiring statistical knowledge.

