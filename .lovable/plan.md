

# Topic Page -- Network Visualisation Style

## Overview

Create a new Topic Page that replaces the current Topic Exploration view with a layout and aesthetic matching the Network Visualisation artifact (dark glass panels, same header structure, sidebar). The page is driven by the selected topic ID and presents topic metadata, bigrams, temporal chart, and a paginated papers table -- all in the dark/glass design language.

## Architecture

The page will remain a React component served at the existing `/evidence/topic/:topicId` route. Rather than duplicating the raw HTML artifact, we build React components that replicate the artifact's visual language (CSS variables, glass panels, dark backgrounds) while staying within the React/Tailwind stack.

## Layout Structure

```text
+----------------------------------------------------------+
| Top Nav Bar (SiteHeader - existing, solid variant)       |
+----------------------------------------------------------+
| Dashboard Sub-Nav (existing AppLayout tabs)              |
+--------+------------------------------------------------+
| Left   |  Main Content Area (dark bg)                    |
| Topic  |                                                 |
| Side-  |  +----------------------------------+  +------+ |
| bar    |  | Network Graph Embed (iframe)     |  | Info | |
| (320px)|  | filtered to selected topic       |  | Card | |
|        |  |                                  |  |(glass)| |
|        |  +----------------------------------+  +------+ |
|        |                                                 |
|        |  [ Bigram 1 ] [ Bigram 2 ] [ Bigram 3 ] ...     |
|        |                                                 |
|        |  +------------------------------------------+   |
|        |  | Bigram Trends Chart (1980-2025)           |   |
|        |  +------------------------------------------+   |
|        |                                                 |
|        |  +------------------------------------------+   |
|        |  | Papers Table (paginated, 50/page)         |   |
|        |  | Title | Authors | Year | Journal          |   |
|        |  | [accordion row -> abstract]               |   |
|        |  +------------------------------------------+   |
|        |                                                 |
|        |  [< Previous Topic]        [Next Topic >]       |
+--------+------------------------------------------------+
```

## Detailed Plan

### 1. Dark Theme Wrapper

Create a CSS class or wrapper component that applies the artifact's dark/glass design tokens to the main content area only (the AppLayout header and sub-nav remain as-is with their existing styling).

- Dark background (`#050505` or similar)
- Glass panel styles: `backdrop-filter: blur(20px)`, semi-transparent backgrounds, subtle borders
- Typography: Inter font, muted secondary text (`#a0a0a0`), white primary text

### 2. Enhanced Topic Sidebar (left panel)

Update the existing `TopicSidebar` component to match the artifact sidebar style:
- Darker background (`rgba(10, 10, 10, 0.95)`)
- 320px width (currently 240px)
- Same font sizes and hover states as the artifact
- Scrollable topic list with the same visual treatment

### 3. Network Graph Section (center-left)

Embed the existing network visualization artifact via an `<iframe>` pointing to `/artefact/index.html` with a query parameter to pre-select the topic (e.g., `?topic=1`). This avoids duplicating the D3 code.

- The iframe fills the main block area (~60-70% width)
- Fixed height (e.g., 500px)
- The artifact already supports topic selection via the sidebar dropdown -- we pass the topic ID as a URL parameter

**Note:** This requires a small addition to `public/artefact/index.html` to read a `topic` query parameter on load and auto-select that topic in the dropdown. This is a minor JS addition (~10 lines).

### 4. Right-side Info Card (glass panel)

A vertically stacked, semi-transparent card positioned to the right of the network graph (within a flex row):

- Glass effect: `background: rgba(20, 20, 20, 0.6)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.08)`, subtle shadow
- Content:
  - "Topic X: Name" title (using `formatTopicName`)
  - Topic definition from Supabase `topics.definition`
  - Fallback: "Description not available yet." if definition is null
- Width: ~280px, fixed position relative to the graph area

### 5. Top 5 Bigram Cards (below network section)

Five compact cards in a single responsive row:

- Glass card styling matching the artifact
- Each card shows:
  - Bigram name (underscores replaced with spaces for display)
  - Frequency sum and normalized frequency as percentage
- Data source: existing `useTopBigramsByTopic` hook (already queries `v_top_bigrams_by_topic`)

### 6. Bigram Trends Chart (1980-2025)

A line chart showing temporal evolution of the top 5 bigrams:

- Title: "Bigram trends over time (Topic X)"
- Data source: `v_chart5_bigram_trends` view (already exists in DB with `year`, `bigram`, `papers_count` columns filtered by `topic_id`)
- New hook: `useBigramTrends(topicId)` querying `v_chart5_bigram_trends`
- Reuse Recharts (`LineChart`) with dark-themed styling (white/grey lines on dark background)
- X-axis: 1980-2025, Y-axis: papers count
- Legend with bigram names (spaces instead of underscores)

### 7. Papers Table (paginated, 50 per page)

Replace the current simple list with a proper paginated table:

- Columns: Title, Author(s), Year, Journal
- Server-side pagination using Supabase `.range()` -- 50 rows per page
- New hook: `usePaginatedPapersByTopic(topicId, page)` with `.range(from, to)` and count query
- Each row has an accordion trigger to expand/collapse the abstract inline
- Abstract fetched on demand or included in the initial query (the `papers` table has an `abstract` column)
- Loading and empty states: "Loading papers..." / "No papers found for this topic."
- Glass-styled table with dark theme

### 8. Previous / Next Topic Navigation

Two buttons at the bottom:

- "Previous Topic" and "Next Topic"
- Navigate by `topic_id` sequentially (1-25)
- Disabled state: Topic 1 has no previous, Topic 25 has no next
- Uses `useNavigate` to go to `/evidence/topic/{id-1}` or `/evidence/topic/{id+1}`
- Styled as glass buttons matching the artifact `.btn` class

## Files to Create / Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/TopicExploration.tsx` | Modify | New layout with dark theme wrapper, all sections |
| `src/components/topic/TopicSidebar.tsx` | Modify | Dark theme styling, wider (320px) |
| `src/components/topic/TopicInfoCard.tsx` | Create | Glass info card (right side) |
| `src/components/topic/BigramCards.tsx` | Create | Row of 5 bigram cards |
| `src/components/topic/BigramTrendsChart.tsx` | Create | Line chart for bigram trends |
| `src/components/topic/PapersTable.tsx` | Create | Paginated table with accordion abstracts |
| `src/components/topic/TopicNavigation.tsx` | Create | Previous/Next topic buttons |
| `src/components/topic/NetworkEmbed.tsx` | Create | Iframe wrapper for network viz |
| `src/components/topic/index.ts` | Modify | Export new components |
| `src/hooks/useBigramTrends.ts` | Create | Hook for `v_chart5_bigram_trends` |
| `src/hooks/usePaginatedPapers.ts` | Create | Hook with server-side pagination |
| `public/artefact/index.html` | Modify | Read `?topic=X` param to auto-select topic |
| `src/index.css` | Modify | Add dark/glass utility classes |

## Data Sources (all existing)

- **Topic metadata**: `topics` table (topic_id, topic_name, definition)
- **Ranked topics list**: `v_topics_ranked` view
- **Top 5 bigrams**: `v_top_bigrams_by_topic` view
- **Bigram trends**: `v_chart5_bigram_trends` view (year, bigram, papers_count by topic)
- **Papers**: `topic_paper_links` joined with `papers` (paper_id, title, authors, year, journal, abstract)

No new database views or migrations are needed. All required data already exists.

## Technical Notes

- The dark theme is scoped to the topic page content area only -- the AppLayout header and sub-nav keep their existing styling
- Server-side pagination uses Supabase's `.range(from, to)` with a count header for total pages
- The iframe network embed communicates via URL parameters only (no postMessage needed for MVP)
- All components follow the existing pattern of loading skeletons and graceful empty states
- Dark/light mode: the dark theme is the primary design for this page, matching the artifact. Light mode support can be added later if needed

