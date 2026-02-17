
# Fix Navigation Menu: Right-Align + Consistent 14px

## Changes

### 1. `src/index.css`
- `.transparent-header`: remove `text-align: center`, add `padding: 16px 24px`
- `.home-nav`: change `justify-content: center` to `justify-content: flex-end`, keep font-size at 14px
- Mobile breakpoints: keep existing responsive adjustments

### 2. `src/components/layout/SiteHeader.tsx`
- **Transparent variant**: wrap nav in a full-width container so `justify-end` pushes links right
- **Solid variant**: already right-aligned, keep `text-sm` (14px) -- no change needed

### Result
- Menu right-aligned on all pages at 14px
- No changes to artefact, other pages, or dependencies
