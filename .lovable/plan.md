

# Site-Wide Dark Glass Footer

## Overview
Create a shared footer component used across all four React pages (Home, About, Policy, Contact). The footer uses a dark glass aesthetic consistent with the artefact's visual language. It replaces the current simple footer in `HomeLayout`.

## Assets
- Copy the two uploaded Durham University logos into `src/assets/`:
  - `durham_logo_white_720_300_rodrigo_frias.png` (for the dark footer background)
  - `durham_logo_black_720_300_rodrigo_frias.png` (kept as fallback, though the footer is always dark)

Since the footer background is always dark (`rgba(10,10,10,0.7)`), the white logo will be used by default. The black variant is stored for future use if a light theme is ever added.

## New Component: `src/components/layout/SiteFooter.tsx`

Three-column layout on desktop, stacked on mobile.

**Left block** -- Durham University logo (white version), sized to roughly 120-140px wide.

**Middle block**:
- Disclaimer: "This artefact maps the research landscape; it does not evaluate, rank, or recommend evidence." (small, muted text)
- "Data sources" link pointing to `/about#data-sources` (React Router `Link`)
- Metadata: "Version: v1.2025 -- Last updated: Feb 2026"

**Right block** -- Mini navigation (smaller than header):
- "Network visualisation" as `<a href="/artefact/index.html">`
- "About the project" as `<Link to="/about">`
- "Policy engagement" as `<Link to="/policy">`
- "Contact" as `<Link to="/contact">`

**Bottom row** (full width, centered):
- "Research, design and programming by (c) Rodrigo Frias." (smallest text)

**Styling** (CSS in `src/index.css`):
- `background: rgba(10, 10, 10, 0.7)`
- `border-top: 1px solid rgba(255, 255, 255, 0.08)`
- `backdrop-filter: blur(18px)`
- Body text ~12-13px, muted at `rgba(255, 255, 255, 0.55-0.7)`
- Links slightly brighter, with hover effect matching the cyan accent

## Changes to Existing Files

### 1. `src/components/layout/HomeLayout.tsx`
- Remove the existing inline `<footer>` block
- Import and render `<SiteFooter />` instead

### 2. `src/pages/AboutPage.tsx`
- Add `id="data-sources"` to the paragraph that mentions data sources, so `/about#data-sources` scrolls to it
- Wrap the data-sources content in a `<section id="data-sources">` element

### 3. `src/pages/PolicyPage.tsx` and `src/pages/ContactPage.tsx`
- No changes needed -- they already use `HomeLayout` which will get the new footer automatically

### 4. `src/index.css`
- Replace the `.home-footer` styles with new `.site-footer` styles
- Add responsive rules: on mobile (<768px), stack the three columns vertically, center-align content

## Technical Details

```text
+-------------------------------------------------------+
| [Durham Logo]  |  Disclaimer text       |  Mini Nav   |
|   (white)      |  Data sources link     |  4 links    |
|                |  Version metadata      |  (vertical) |
+-------------------------------------------------------+
|   Research, design and programming by (c) Rodrigo...  |
+-------------------------------------------------------+
```

- Logo imported via ES module: `import logo from "@/assets/durham_logo_white_720_300_rodrigo_frias.png"`
- Footer is part of `HomeLayout`, so it appears on all four marketing pages automatically
- The `AppLayout` (used for evidence routes) is not affected -- those routes redirect to the artefact anyway
- No changes to the Antigravity artefact UI

