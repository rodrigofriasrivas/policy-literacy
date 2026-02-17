

# Add "Enterprise Policy Literacy Tool" Branding to Transparent Header

## Problem
The transparent header (used on About, Policy, Contact pages) only shows the right-aligned navigation links. It's missing the "Enterprise Policy Literacy Tool" title on the left side, which is present in the artefact header (first screenshot).

## Change

### `src/components/layout/SiteHeader.tsx` -- Transparent variant
Update the transparent header to include a left-aligned "Enterprise Policy Literacy Tool" link to `/`, with the nav links on the right. Use `justify-between` layout matching the solid header's structure.

### `src/index.css` -- `.transparent-header` / `.home-nav`
Update styles so `.transparent-header` uses a flex layout with `justify-content: space-between` (brand left, nav right). The `.home-nav` no longer needs `justify-content: flex-end` since the parent handles positioning.

### Result
- "Enterprise Policy Literacy Tool" appears on the left of all internal pages, linked to `/`
- Navigation links remain right-aligned at 14px
- Consistent with the artefact header layout shown in the first screenshot
