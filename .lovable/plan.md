
# Plan: Evidence Dashboard (Topic Exploration Redesign)

## Overview

Transform the existing Topic Exploration page into the Evidence Dashboard layout shown in the wireframe. This involves restructuring the page to have a persistent left sidebar with all topics, while the main panel displays the selected topic's details.

**No new routes or menu items required** — the existing `/topic` and `/topic/:topicId` routes will be updated.

---

## Layout Structure

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  Header (existing AppLayout)                                            │
├─────────────────────────────────────────────────────────────────────────┤
│  Navigation (existing: Field Overview | Temporal | Topic | Papers)      │
├──────────────────┬──────────────────────────────────────────────────────┤
│                  │                                                      │
│   LEFT SIDEBAR   │            MAIN PANEL                                │
│   (Topics List)  │                                                      │
│                  │  ┌─────────────────────────────────────────────────┐ │
│   Topic 1        │  │ TOPIC HEADER                                    │ │
│   Topic 2   ◄────│  │ Name + Description + Action Buttons             │ │
│   Topic 3        │  └─────────────────────────────────────────────────┘ │
│   ...            │                                                      │
│   Topic 25       │  ┌─────────────────────────────────────────────────┐ │
│                  │  │ NETWORK VISUALIZATION (placeholder)             │ │
│                  │  └─────────────────────────────────────────────────┘ │
│                  │                                                      │
│                  │  ┌─────────────────────────────────────────────────┐ │
│                  │  │ TOP 5 TERMS (bigrams with %)                    │ │
│                  │  └─────────────────────────────────────────────────┘ │
│                  │                                                      │
│                  │  ┌─────────────────────────────────────────────────┐ │
│                  │  │ TEMPORAL EVOLUTION (chart + explanation)        │ │
│                  │  └─────────────────────────────────────────────────┘ │
│                  │                                                      │
│                  │  ┌─────────────────────────────────────────────────┐ │
│                  │  │ RESEARCH PAPERS (linked papers list)            │ │
│                  │  └─────────────────────────────────────────────────┘ │
│                  │                                                      │
└──────────────────┴──────────────────────────────────────────────────────┘
```

---

## File Changes

### File 1: `src/pages/TopicExploration.tsx`

Complete restructure of the page layout.

**Changes:**

1. **New layout with sidebar**: Use CSS Grid or Flexbox to create a two-column layout
   - Left: Fixed-width sidebar (240px) with scrollable topic list
   - Right: Main content panel with all topic details

2. **Remove conditional rendering**: Currently the page shows either a topic list OR topic details. Change to always show both side-by-side.

3. **Auto-select first topic**: When no topic is selected (`/topic`), automatically select Topic 1 or the first available topic.

4. **Topic Header section**: 
   - Topic name (larger font)
   - Definition/description below
   - Two placeholder buttons: "View Research" and "Learn More"

5. **Network Visualization placeholder**:
   - New section with placeholder text
   - Message: "Interact with the academic papers network. Hover over papers to find out more."

6. **Top 5 Terms section**:
   - Title: "Top 5 terms"
   - Subtitle: "Main bigrams (two-words combined)"
   - Display top 5 bigrams in a horizontal grid
   - Show `normalized_frequency` as percentage (e.g., "7.5%")

7. **Temporal Evolution section**:
   - Reorder to match wireframe position
   - Keep existing chart and "How to read this visual" block
   - Update title to "Temporal Evolution of the Topic"
   - Add subtitle: "Number of papers published per year."

8. **Research Papers section**:
   - Title: "Research Papers"
   - Subtitle: "A traceable list of selected academic papers."
   - Each paper shows icon, title, and "Link to Paper" action
   - Links to existing paper detail page

---

## Technical Implementation

### Imports to add:
```typescript
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ExternalLink } from "lucide-react";
```

### Layout structure:
```tsx
<div className="flex gap-6 min-h-[600px]">
  {/* Left Sidebar */}
  <aside className="w-60 shrink-0 border-r border-border">
    <ScrollArea className="h-[calc(100vh-200px)]">
      {/* Topic list */}
    </ScrollArea>
  </aside>
  
  {/* Main Panel */}
  <main className="flex-1 space-y-8">
    {/* Topic Header */}
    {/* Network Visualization */}
    {/* Top 5 Terms */}
    {/* Temporal Evolution */}
    {/* Research Papers */}
  </main>
</div>
```

### Topic sidebar item styling:
```tsx
<Link
  to={`/topic/${t.topic_id}`}
  className={cn(
    "block px-3 py-2 text-sm rounded transition-colors",
    numericTopicId === t.topic_id
      ? "bg-secondary text-foreground font-medium"
      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
  )}
>
  Topic {t.topic_id}: {t.topic_name}
</Link>
```

### Top 5 Terms grid:
```tsx
<div className="grid grid-cols-5 gap-4">
  {bigrams?.slice(0, 5).map((b) => (
    <div key={b.bigram} className="text-center p-4 border border-border rounded">
      <p className="text-xs text-muted-foreground mb-1">{b.bigram}</p>
      <p className="text-lg font-medium">
        {((b.normalized_frequency || 0) * 100).toFixed(1)}%
      </p>
    </div>
  ))}
</div>
```

### Research Papers list:
```tsx
<div className="space-y-3">
  {papers?.slice(0, 10).map((link) => (
    <div key={link.paper_id} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm">{link.papers.title}</span>
      </div>
      <Link to={`/papers/${link.paper_id}`} className="text-sm hover:underline">
        Link to Paper
      </Link>
    </div>
  ))}
</div>
```

---

## Data Sources (all existing)

| Section | Hook | Source |
|---------|------|--------|
| Topic List | `useTopicsRanked()` | `v_topics_ranked` |
| Topic Details | `useTopic(topicId)` | `topics` table |
| Top 5 Terms | `useTopBigramsByTopic(topicId)` | `v_top_bigrams_by_topic` |
| Temporal Chart | `useTopicTemporalData(topicId)` | `topic_paper_links` + `papers` |
| Research Papers | `usePapersByTopicId(topicId)` | `topic_paper_links` + `papers` |

No new hooks or database queries required.

---

## Navigation Behavior

| Current Route | New Behavior |
|---------------|--------------|
| `/topic` | Show sidebar + auto-select first topic (Topic 1) |
| `/topic/:topicId` | Show sidebar + selected topic highlighted + main panel shows topic details |

The "Topic Exploration" nav item remains unchanged.

---

## Sections Detail

### 1. Topic Header
- Large topic name: `Topic {id}: {name}`
- Definition text below (if available)
- Two buttons (placeholders): "View Research" / "Learn More"

### 2. Network Visualization (Placeholder)
- Title: "Network Visualization"
- Subtitle: "Interact with the academic papers network. Hover over papers to find out more."
- Empty bordered area (reserved for future implementation)

### 3. Top 5 Terms
- Title: "Top 5 terms"
- Subtitle: "Main bigrams (two-words combined)"
- 5-column grid with:
  - Bigram name (small text)
  - Percentage value (from `normalized_frequency`)

### 4. Temporal Evolution
- Title: "Temporal Evolution of the Topic"
- Subtitle: "Number of papers published per year."
- Existing chart component (`TopicTemporalChart`)
- Existing "How to read this visual" block

### 5. Research Papers
- Title: "Research Papers"
- Subtitle: "A traceable list of selected academic papers."
- List of papers with:
  - File icon
  - Paper title
  - "Link to Paper" action

---

## What Stays the Same

- All existing hooks and data fetching logic
- `TopicTemporalChart` component
- Paper detail navigation (`/papers/:paperId`)
- Other pages (Field Overview, Temporal Evolution, Papers)
- App navigation structure
- Footer disclaimer

## What Changes

- Topic Exploration page layout (sidebar + main panel)
- Removal of "back to all topics" link (sidebar always visible)
- Addition of placeholder sections (Network Visualization, action buttons)
- Restructured bigrams display (Top 5 grid with percentages)
- Restructured papers display (simpler list with icons)

---

## Design Principles

- **No evaluation language**: Labels describe structure, not quality
- **Reuse existing components**: ScrollArea, Button, Card from shadcn/ui
- **Maintain neutral aesthetic**: Greyscale palette, minimal styling
- **Clear interpretive guidance**: "How to read this visual" block remains
