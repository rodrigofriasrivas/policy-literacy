

# Remove White Shell + Add Navigation & Fix Scrolling

## Changes

### 1. `src/App.tsx` -- Unwrap topic routes from AppLayout

Remove `<AppLayout>` from the two topic routes:

```
Before:
<Route path="/evidence/topic" element={<AppLayout><TopicExploration /></AppLayout>} />
<Route path="/evidence/topic/:topicId" element={<AppLayout><TopicExploration /></AppLayout>} />

After:
<Route path="/evidence/topic" element={<TopicExploration />} />
<Route path="/evidence/topic/:topicId" element={<TopicExploration />} />
```

All other `/evidence/*` routes keep `AppLayout`.

### 2. `src/pages/TopicExploration.tsx` -- Full-screen dark layout with proper overflow

Change the outer wrapper from:
```
<div className="topic-dark-wrapper flex min-h-[600px] -mx-6 -my-8">
```
to:
```
<div className="topic-dark-wrapper flex h-screen overflow-hidden">
```

- `h-screen` fills the viewport since there is no outer shell consuming space.
- `overflow-hidden` on the outer wrapper prevents double scrollbars -- only the individual columns scroll.
- The main content column keeps `overflow-y-auto` so the iframe, bigrams, and papers table scroll naturally within it.

### 3. `src/components/topic/TopicSidebar.tsx` -- Add "Back to dashboard" + fix height

Add a "Back to dashboard" link at the top of the sidebar (navigates to `/evidence`), and adjust the ScrollArea height to fill the viewport now that there is no outer header.

Changes:
- Add a back button/link above the "Topics" heading, styled as a small muted link with a left-arrow icon.
- Update ScrollArea height from `calc(100vh - 280px)` to `calc(100vh - 110px)` to account for just the sidebar header area (back button + Topics heading).

The back link uses:
```
<Link to="/evidence" className="...flex items-center gap-1.5 text-[11px] text-[#a0a0a0] hover:text-white...">
  <ArrowLeft size={12} /> Back to dashboard
</Link>
```

## Files Modified

| File | Change |
|------|--------|
| `src/App.tsx` | Remove `<AppLayout>` wrapper from topic routes |
| `src/pages/TopicExploration.tsx` | `h-screen overflow-hidden` instead of `min-h-[600px] -mx-6 -my-8` |
| `src/components/topic/TopicSidebar.tsx` | Add "Back to dashboard" link, fix ScrollArea height |

## Result

- Topic page fills the full viewport with a dark background, no white shell
- Users can navigate back via the sidebar's "Back to dashboard" link
- No double scrollbars: outer wrapper clips, only the main content column scrolls
- All other `/evidence/*` routes remain unchanged

