

# Fix remaining /dashboard/ references

## Problem
`App.tsx`, `SiteHeader.tsx`, and `HomePage.tsx` are already correctly pointing to `/artefact/index.html`. However, two files still contain `/dashboard/` links that lead to 404:

1. `src/components/layout/HomeLayout.tsx` (footer)
2. `src/pages/AboutPage.tsx` (dashboard note)

## Changes

### 1. `src/components/layout/HomeLayout.tsx`
Update footer link from `/dashboard/` to `/artefact/index.html`:
```
The dashboard is an interactive research artefact hosted separately at /artefact/index.html.
```

### 2. `src/pages/AboutPage.tsx`
Update dashboard note link from `/dashboard/` to `/artefact/index.html`:
```
The interactive dashboard is a research artefact hosted separately at /artefact/index.html.
```

## No changes needed
- `src/App.tsx` -- all redirects already point to `/artefact/index.html`
- `src/components/layout/SiteHeader.tsx` -- already uses `<a href="/artefact/index.html">`
- `src/pages/HomePage.tsx` -- CTA already uses `<a href="/artefact/index.html">`

## Summary
Two-line fix replacing the last `/dashboard/` references with `/artefact/index.html`.
