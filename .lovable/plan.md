

# Remove Visible iframe -- Seamless Network Embed

## The Problem

The current implementation uses an `<iframe>` to embed the 5,000-line D3 network visualization artifact. You see a "page within a page" with duplicate headers, sidebars, and controls.

## Why Not Remove the iframe Entirely?

The network visualization (`public/artefact/index.html`) is a standalone 5,000-line file with:
- D3 force simulation with custom physics
- Canvas-based rendering with hit detection
- Complex hover/click interactions, search, zoom
- Multiple views (macro, micro, bigram network, temporal)

Rewriting this as a React component would be a very large effort (weeks of work) and would risk breaking the carefully tuned physics and interactions. Instead, we make the iframe **seamless** so it feels native.

## Plan

### 1. Add "embed mode" to the artifact

Modify `public/artefact/index.html` to detect a `?embed=true` query parameter. When present:
- Hide the artifact's own header bar (title, navigation tabs, breadcrumbs)
- Hide the artifact's left sidebar/control panel
- Make the background transparent so it blends with the parent page
- Auto-select the topic from `?topic=X` parameter
- The canvas fills the full area with no chrome

This is roughly 20-30 lines of JS/CSS added to the artifact.

### 2. Update NetworkEmbed component

Modify `src/components/topic/NetworkEmbed.tsx` to:
- Pass `?embed=true&topic=X` to the iframe URL
- Remove the visible border so the iframe blends seamlessly
- Set `frameBorder="0"` and transparent background
- The result looks like a native D3 canvas rendered directly in the page

### 3. Result

The network graph will appear as if it's rendered directly inside the Topic Page -- no duplicate header, no duplicate sidebar, no visible iframe border. The user sees only the force-directed graph canvas with its hover/click interactions.

## Files to Modify

| File | Change |
|------|--------|
| `public/artefact/index.html` | Add embed mode: read `?embed=true` param, hide header/sidebar/controls, transparent bg, auto-select topic |
| `src/components/topic/NetworkEmbed.tsx` | Update iframe URL to include `embed=true`, remove border styling |

## Technical Notes

- The artifact's own sidebar topic selection is hidden in embed mode -- the React sidebar handles topic switching by changing the iframe URL
- When the user clicks a different topic in the React sidebar, the iframe `src` updates with the new topic ID, causing the artifact to reload with that topic pre-selected
- No D3 code needs to be rewritten -- all physics, rendering, and interactions remain intact

