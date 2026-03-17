

# Homepage fixes, footer, metrics, and responsive menu

Five fixes across `HomePage.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, and `index.css`.

## Fix 1 — Homepage subtitle (HomePage.tsx)

Line 47: Replace subtitle text with `"A navigational map of 40 years of enterprise policy research."`

## Fix 2 — Key metrics copy (HomePage.tsx)

Replace the `metrics` array and rendering. The "25 TOPICS" card needs a special "Structured in" prefix line above the number. Approach:

- Add an optional `prefix` field to metrics data
- Update the metrics array:
  - `{ value: "5,800", label: "Papers analysed" }`
  - `{ value: "125", label: "Key terms mapped" }`
  - `{ value: "25", label: "Topics", prefix: "Structured in" }`
  - `{ value: "40+", label: "Years of research" }`
- In the JSX, render `prefix` as a small muted line above the value when present:
  ```tsx
  {metric.prefix && <div className="hero-metric-prefix">{metric.prefix}</div>}
  ```
- Add `.hero-metric-prefix` style in `index.css`: `font-size: 11px; color: var(--home-muted2); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;`

## Fix 3 — CTA spacing (index.css)

Add `margin-top: 2.5rem` to `.homepage-cta-group` (line 342 block).

## Fix 4 — Footer visibility (index.css)

The ASCII container is `height: calc(100vh - 60px)` (line 204), making it nearly full viewport. Change to `height: calc(100vh - 260px)` to leave ~200px for the footer. The hero overlay remains centered within this reduced container via its existing `top: 50%; transform: translate(-50%, -50%)`.

Also add a mobile adjustment: at `max-width: 768px`, set `.ascii-container` height to `auto; min-height: 70vh` to avoid cutting content on small screens.

## Fix 5 — Responsive hamburger menu (SiteHeader.tsx + index.css)

**SiteHeader.tsx** (transparent variant only — homepage uses this):
- Import `useState` from React
- Add `menuOpen` state
- Add a hamburger button visible only on mobile (class `mobile-menu-toggle`, hidden on desktop via CSS)
- Wrap nav links in a container that gets class `mobile-menu-open` when state is true
- Close menu on link click

**index.css**:
- `.mobile-menu-toggle`: hidden by default (`display: none`), shown at `max-width: 767px` as a simple hamburger icon button (three lines via CSS borders/pseudo-elements or inline SVG)
- `.home-nav` at `max-width: 767px`: hidden by default, shown as vertical dropdown when `.home-nav.mobile-menu-open` is applied — dark background, full-width, stacked links
- Remove the existing `home-nav` flex-wrap/small-font rules at 768px and 480px breakpoints (replaced by hamburger)

## Files changed
- `src/pages/HomePage.tsx` — subtitle text, metrics data + prefix rendering
- `src/components/layout/SiteHeader.tsx` — hamburger menu state + toggle button
- `src/index.css` — CTA spacing, ASCII container height, metric prefix style, hamburger menu styles
- `src/components/layout/SiteFooter.tsx` — no changes needed

