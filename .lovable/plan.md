
# Plan: Normalize Topic Naming Format

## Overview
Add a reusable utility function and update all topic name displays to use the format **"Topic X: Topic Name"** (e.g., "Topic 1: New Venture Creation"). All existing elements including `topic_label` displays, layouts, and visualizations remain unchanged.

## Changes

### 1. Add Utility Function
**File:** `src/lib/utils.ts`

Add a helper function after the existing `cn` function:

```typescript
export function formatTopicName(topicId: number | null | undefined, topicName: string | null | undefined): string {
  if (topicId == null || !topicName) return topicName ?? "";
  return `Topic ${topicId}: ${topicName}`;
}
```

This centralizes the formatting logic for consistent use across all views.

---

### 2. Update Field Overview
**File:** `src/pages/FieldOverview.tsx`

| Line | Current | Updated |
|------|---------|---------|
| 91 | `{topic.topic_name}` | `{formatTopicName(topic.topic_id, topic.topic_name)}` |

Add import: `import { formatTopicName } from "@/lib/utils";`

The `topic_label` display on lines 93-97 remains unchanged.

---

### 3. Update Temporal Evolution
**File:** `src/pages/TemporalEvolution.tsx`

| Line | Current | Updated |
|------|---------|---------|
| 86 | `{topic.topic_name}` | `{formatTopicName(topic.topic_id, topic.topic_name)}` |
| 105 | `` `${topic.topic_name}: ${weight?.topic_weight ?? 0}` `` | `` `${formatTopicName(topic.topic_id, topic.topic_name)}: ${weight?.topic_weight ?? 0}` `` |

Add import: `import { formatTopicName } from "@/lib/utils";`

---

### 4. Update Topic Exploration
**File:** `src/pages/TopicExploration.tsx`

| Line | Current | Updated |
|------|---------|---------|
| 44 | `{t.topic_name}` | `{formatTopicName(t.topic_id, t.topic_name)}` |
| 76 | `{topic.topic_name}` | `{formatTopicName(numericTopicId, topic.topic_name)}` |

Add import: `import { formatTopicName } from "@/lib/utils";`

The `topic_label` display on lines 45-47 remains unchanged.

---

## Summary of Files

| File | Modification |
|------|--------------|
| `src/lib/utils.ts` | Add `formatTopicName` function |
| `src/pages/FieldOverview.tsx` | Add import, update 1 location (line 91) |
| `src/pages/TemporalEvolution.tsx` | Add import, update 2 locations (lines 86, 105) |
| `src/pages/TopicExploration.tsx` | Add import, update 2 locations (lines 44, 76) |

## What Remains Unchanged

- All `topic_label` displays
- Database queries and filtering logic
- Layout, ordering, and visualizations
- All other UI elements and styling
