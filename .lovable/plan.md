

# Plan: Fix Linked Papers Query and TypeScript Errors

## Problem Analysis

The frontend is trying to query `v_papers_by_topic` for individual paper details, but this view only contains aggregate data:

| Column | Type |
|--------|------|
| topic_id | integer |
| topic_name | varchar |
| paper_count | bigint |

To display linked papers for a specific topic, we need to query `topic_paper_links` joined with `papers`.

## Solution

### File 1: `src/hooks/usePapers.ts`

**Change:** Replace the `usePapersByTopicId` function to query `topic_paper_links` with a nested select to `papers`.

```typescript
interface PaperLink {
  paper_id: number;
  topic_id: number;
  frequency: number | null;
  pmi: number | null;
  papers: {
    paper_id: number;
    title: string;
    authors: string | null;
    year: number | null;
    journal: string | null;
  };
}

export function usePapersByTopicId(topicId?: number) {
  return useQuery({
    queryKey: ["papers-by-topic-id", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_paper_links")
        .select(`
          paper_id,
          topic_id,
          frequency,
          pmi,
          papers!inner(
            paper_id,
            title,
            authors,
            year,
            journal
          )
        `)
        .eq("topic_id", topicId!)
        .order("frequency", { ascending: false });

      if (error) throw error;
      
      // Deduplicate by paper_id (a paper may appear multiple times via different bigrams)
      const uniqueLinks = new Map<number, PaperLink>();
      (data as unknown as PaperLink[]).forEach((link) => {
        if (!uniqueLinks.has(link.paper_id)) {
          uniqueLinks.set(link.paper_id, link);
        }
      });
      
      return Array.from(uniqueLinks.values());
    },
    enabled: topicId !== undefined,
  });
}
```

### File 2: `src/pages/TopicExploration.tsx`

**Change:** Update the Linked Papers section to correctly access nested paper properties.

Lines 207-223 currently have:
```typescript
{papers.slice(0, 20).map((link) => {
  const paper = link.papers;  // expects nested object
  return (
    <Link
      key={link.paper_id}
      to={`/papers/${link.paper_id}`}
      ...
    >
      <p>{paper.title}</p>  // accesses nested properties
```

This structure is actually correct for the nested select approach. The component expects:
- `link.paper_id` - from the link row
- `link.papers.title`, `link.papers.authors`, etc. - from the nested papers object

The code at lines 207-223 is already correct for the new query structure. No changes needed here once the hook returns properly typed data.

## Summary of Changes

| File | Change |
|------|--------|
| `src/hooks/usePapers.ts` | Replace `v_papers_by_topic` query with `topic_paper_links` + nested `papers` select |

## What This Fixes

1. **TS2352 error** - Removes incorrect cast of `v_papers_by_topic` to `PaperByTopic[]`
2. **TS2339 errors** - The returned data now correctly has `paper_id` and nested `papers` object
3. **Empty Linked Papers** - Query now returns actual paper details instead of aggregate counts

## What Stays the Same

- `usePapers()` and `usePaper()` functions continue using `v_papers_unique` 
- Paper detail pages continue using `id` from `v_papers_unique`
- No database changes required
- The `topic_paper_links` table already has foreign key relationships set up

