

# Ship the Split: Marketing Site + Dashboard Redirects

## Summary

Strip all dashboard routes from Lovable. Replace with backward-compatible redirects to `/dashboard/`. Update navigation and footer. Dashboard files stay on disk (cleanup deferred).

## Regarding `/dashboard/` in production

`window.location.replace("/dashboard/")` navigates the browser to that same-domain path. For this to work:

- Your web server / hosting platform must serve the Antigravity HTML app at the `/dashboard/` path
- The `?mode=topic&topicId=X` query params are passed through as-is in the URL -- the Antigravity app reads them from `window.location.search` on load
- This is a deployment concern outside of Lovable's React app

## Files to create

**`src/components/RedirectToExternal.tsx`** -- redirect utility with `useRef` guard against StrictMode double-fires, using `window.location.replace()`

## Files to modify

**`src/App.tsx`**
- Remove imports: `AppLayout`, `Navigate`, `FieldOverview`, `TemporalEvolution`, `TopicExploration`, `PaperListing`, `ExperimentalView`
- Add import: `RedirectToExternal`
- Keep marketing routes: `/`, `/about`, `/policy`, `/contact`, `*`
- Replace all `/evidence/*`, `/topic/*`, `/papers/*`, `/artefact/*` routes with `<RedirectToExternal>` pointing to `/dashboard/`
- Topic ID routes preserve params: `/dashboard/?mode=topic&topicId=:id`

**`src/components/layout/SiteHeader.tsx`**
- Replace navItems: remove "Network Visualisation", add "Explore the Data" pointing to `/dashboard/`
- Remove `external` flag and conditional `<a>` rendering -- all items use `<Link>`

**`src/pages/HomePage.tsx`**
- Change hero CTA from `<a href="/artefact/index.html">` to `<Link to="/dashboard/">Explore the Data</Link>`

**`src/components/layout/HomeLayout.tsx`**
- Append to footer: "The dashboard is an interactive research artefact hosted separately at /dashboard/."

**`src/pages/AboutPage.tsx`**
- Add paragraph with dashboard note and link

## Not changed (deferred cleanup)

All dashboard components, hooks, and pages remain on disk.

