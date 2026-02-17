
# Match Branding Font to Artefact/Dashboard

## Problem
The "Enterprise Policy Literacy" branding on internal pages (About, Policy, Contact) uses Inter sans-serif at 14px, while the artefact/dashboard uses Times New Roman serif at 22px. They need to match.

## Change

### `src/index.css` -- `.home-brand`
Update the font styling to match the artefact's `.stitch-brand`:
- `font-family: 'Times New Roman', serif` (instead of Inter/sans-serif)
- `font-size: 22px` (instead of 14px)
- `letter-spacing: -0.01em`
- `line-height: 1`
- Keep existing color and hover transitions

```css
.home-brand {
  font-family: 'Times New Roman', serif;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  letter-spacing: -0.01em;
  line-height: 1;
  transition: color 0.2s ease;
  white-space: nowrap;
}
```

### Also update the text in `SiteHeader.tsx`
Change "Enterprise Policy Literacy" to "Enterprise Policy Literacy Tool" to match the artefact exactly.

### Result
- Branding on all pages matches the artefact's serif style at 22px
- Title text matches: "Enterprise Policy Literacy Tool"
