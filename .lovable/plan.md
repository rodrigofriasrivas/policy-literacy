

# Round 6: Homepage CTAs, Step 1 cleanup, Step 3 modal transition

Three fixes across `HomePage.tsx`, `IntroModule1.tsx`, `IntroModule3.tsx`, and `index.css`.

## Fix 1 — Homepage metrics and CTA buttons

### 1a — Metrics (HomePage.tsx)
Update the `metrics` array: remove `prefix` field, change `"Topics"` label to `"Research topics"`. All four items become simple value+label pairs.

### 1b — CTA buttons (HomePage.tsx)
Restructure both CTA buttons so subtext is inside the button element (not below it). Remove the `<span className="homepage-cta-sub">` elements. Remove arrow from "Start here". Each button renders:
```tsx
<Link to="/intro/1" className="cta-button homepage-cta-primary">
  <span className="cta-main-label">Start here</span>
  <span className="cta-sub-label">Recommended for first-time visitors</span>
</Link>
```
Same pattern for the secondary button (using `<a>` for hard nav).

Remove the `.homepage-cta-item` wrapper divs — buttons are direct children of `.homepage-cta-group`.

### 1c — Button width and styling (index.css)
- Remove `.homepage-cta-item` and `.homepage-cta-sub` styles
- Update `.homepage-cta-primary` and `.homepage-cta-secondary` to: `min-width: 260px`, `flex-direction: column`, `display: inline-flex`, `align-items: center`, `text-align: center`
- Add `.cta-sub-label`: `font-size: 11px; opacity: 0.5; margin-top: 4px; font-weight: 400;`
- Remove `.hero-metric-prefix` style (no longer needed)

## Fix 2 — Step 1 cleanup (IntroModule1.tsx + index.css)

### 2a — Remove metrics (IntroModule1.tsx)
Delete the `FIELD_FACTS` array and the `<div className="m1-metrics">...</div>` block (lines 4-9, 77-85).

### 2b — Increase content width (index.css)
Change `.m1-hero` max-width from `720px` to `820px` (line 1288).

## Fix 3 — Step 3 modal transition (IntroModule3.tsx + index.css)

### 3a — Add modal state (IntroModule3.tsx)
Add `const [modalOpen, setModalOpen] = useState(false);` state.

### 3b — Replace closing CTA block
Replace the current CTA block content with:
- Heading: "You have seen the field."
- Body: "Now load the map and explore it directly."
- Button: "Load the map →" — opens modal via `setModalOpen(true)` instead of navigating

### 3c — Add modal overlay (IntroModule3.tsx)
Render a modal when `modalOpen` is true — a `<div>` overlay with `onClick` on the backdrop to close:
```tsx
{modalOpen && (
  <div className="m3-modal-overlay" onClick={() => setModalOpen(false)}>
    <div className="m3-modal-card" onClick={e => e.stopPropagation()}>
      <h2>The map is ready.</h2>
      <p>The network connects 25 research conversations...</p>
      <p>Understanding the shape and evolution...</p>
      <button onClick={() => { window.location.href = '/artefact/index.html'; }}>
        Explore the full field →
      </button>
    </div>
  </div>
)}
```

### 3d — Modal styles (index.css)
```css
.m3-modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.85);
  display: flex; align-items: center; justify-content: center;
}
.m3-modal-card {
  background: #1a1a2e; color: #fff;
  max-width: 640px; width: 90%;
  padding: 48px 40px; border-radius: 12px;
  text-align: center;
}
```
The modal CTA button reuses `.m3-cta-button` style.

## Files changed
- `src/pages/HomePage.tsx` — metrics, CTA restructure
- `src/pages/IntroModule1.tsx` — remove metrics, keep everything else
- `src/pages/IntroModule3.tsx` — modal state, new CTA block, modal overlay
- `src/index.css` — button widths, remove prefix style, m1-hero width, modal styles

