
# Plan: Add Topic Tags to Papers List View

## Overview
Add topic tags to each paper in the Papers list view using existing data access patterns. Tags will follow the "Topic X: Topic Name" format and serve as orientation labels. Implementation will be minimal, contained to a single file, and reversible.

## Approach
Use inline `useQuery` directly in the PaperList component to fetch topic associations, avoiding new hook files. Client-side deduplication and grouping will attach topics to papers for display.

## Changes

### File: `src/pages/PaperListing.tsx`

#### New Imports
```typescript
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { formatTopicName } from "@/lib/utils";
```

#### Data Fetching (inside PaperList component)
Add a second query to fetch all topic-paper associations:

```text
useQuery: "paper-topic-associations"
  - Fetch from topic_paper_links joined with topics
  - Select: paper_id, topic_id, topic_name
  - No limit (need all associations for the displayed papers)
```

#### Client-Side Processing
1. Deduplicate topic-paper links (multiple rows exist per paper-topic due to bigrams)
2. Group topics by paper_id into a Map for O(1) lookup
3. Sort topics by topic_id (ascending) within each paper

#### Sorting Papers
Sort the papers array client-side:
- Primary: Year (descending)
- Secondary: Title (A-Z ascending)

#### Rendering Topic Tags
For each paper, look up its topics from the Map and render Badge components:

```text
┌─────────────────────────────────────────────────────────────┐
│ Paper Title                                                  │
│ Authors · Year · Journal                                     │
│ ┌──────────────────┐ ┌──────────────────┐ ┌───────────────┐ │
│ │Topic 3: Gender...│ │Topic 7: Policy...│ │Topic 15: ...  │ │
│ └──────────────────┘ └──────────────────┘ └───────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

Badges will use `variant="outline"` for a neutral, minimal appearance.

## Implementation Details

### Topic Association Query
```typescript
const { data: topicLinks } = useQuery({
  queryKey: ["paper-topic-associations"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("topic_paper_links")
      .select("paper_id, topic_id, topics!inner(topic_id, topic_name)");
    if (error) throw error;
    return data;
  },
});
```

### Deduplication and Grouping
```typescript
// Create Map: paper_id -> [{ topic_id, topic_name }, ...]
const topicsByPaper = useMemo(() => {
  if (!topicLinks) return new Map();
  const map = new Map<number, Array<{ topic_id: number; topic_name: string }>>();
  
  topicLinks.forEach((link) => {
    const paperId = link.paper_id;
    const topic = { topic_id: link.topics.topic_id, topic_name: link.topics.topic_name };
    
    if (!map.has(paperId)) {
      map.set(paperId, []);
    }
    // Deduplicate by checking if topic_id already exists
    const existing = map.get(paperId)!;
    if (!existing.some(t => t.topic_id === topic.topic_id)) {
      existing.push(topic);
    }
  });
  
  // Sort topics by topic_id within each paper
  map.forEach((topics) => topics.sort((a, b) => a.topic_id - b.topic_id));
  
  return map;
}, [topicLinks]);
```

### Paper Sorting
```typescript
const sortedPapers = useMemo(() => {
  if (!papers) return [];
  return [...papers].sort((a, b) => {
    // Primary: year descending
    const yearDiff = (b.year ?? 0) - (a.year ?? 0);
    if (yearDiff !== 0) return yearDiff;
    // Secondary: title ascending
    return (a.title ?? "").localeCompare(b.title ?? "");
  });
}, [papers]);
```

### Tag Rendering
```typescript
{topicsByPaper.get(paper.paper_id)?.map((topic) => (
  <Badge key={topic.topic_id} variant="outline" className="text-xs">
    {formatTopicName(topic.topic_id, topic.topic_name)}
  </Badge>
))}
```

## What Changes

| Aspect | Change |
|--------|--------|
| Papers list | Shows topic tags below metadata |
| Sorting | Year (desc), then Title (A-Z) |
| Header text | Updated to reflect sorting order |

## What Does NOT Change

- PaperDetail component (no changes)
- No new hook files created
- No changes to existing hooks
- No changes to other views
- No weights, rankings, or metrics displayed
- Database queries unchanged

## Summary

Single file modification (`src/pages/PaperListing.tsx`) that:
1. Adds inline query for topic associations
2. Client-side deduplication and grouping
3. Sorts papers by year (desc), title (asc)
4. Renders topic tags as neutral Badge components
5. Uses existing `formatTopicName` utility for consistent naming
