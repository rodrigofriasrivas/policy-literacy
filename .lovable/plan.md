

# Step 3: Closing block removal and modal refinement

Two fixes in `IntroModule3.tsx` and `index.css`.

## Fix 1 — Remove closing banner, keep standalone CTA button

**IntroModule3.tsx** (lines 208–221): Remove the `.m3-cta-block` wrapper, heading, and body text. Replace with just the button, wrapped in a simple div for spacing:

```tsx
<div className="m3-standalone-cta">
  <button onClick={() => setModalOpen(true)} className="m3-cta-button" id="m3-cta-load-map">
    Load the map →
  </button>
</div>
```

**index.css**: Add `.m3-standalone-cta` with `margin-top: 3rem; text-align: center; padding-bottom: 40px;`. The existing `.m3-cta-block` styles can remain (harmless) or be removed.

## Fix 2 — Modal content and loading bar

### 2a — Replace modal body text (IntroModule3.tsx)

Update the modal body paragraphs:
- P1: "The visualisation displays 5,800 papers distributed across 25 research topics and 125 key terms, spanning four decades. Topics are arranged by co-occurrence patterns — proximity reflects shared vocabulary, not importance."
- P2: "Use the panel on the left to filter by topic, time period, or journal."

### 2b–2c — Loading bar with timed button enable (IntroModule3.tsx + index.css)

**State**: Add `const [buttonEnabled, setButtonEnabled] = useState(false);`. Reset both `buttonEnabled` to false when modal opens. Use `useEffect` watching `modalOpen` — when true, set a 2500ms timeout to enable the button; clear on unmount.

**JSX** (inside modal, between body and button): Add a loading bar div:
```tsx
<div className="m3-loading-bar-track">
  <div className={`m3-loading-bar-fill ${modalOpen ? "is-animating" : ""}`} />
</div>
```

Button gets `disabled={!buttonEnabled}` and conditional styling:
```tsx
<button
  onClick={() => { window.location.href = '/artefact/index.html'; }}
  className="m3-cta-button"
  disabled={!buttonEnabled}
  style={{ opacity: buttonEnabled ? 1 : 0.4, cursor: buttonEnabled ? 'pointer' : 'not-allowed' }}
>
```

**index.css**: Add loading bar styles:
```css
.m3-loading-bar-track {
  width: 100%; height: 4px; border-radius: 2px;
  background: rgba(255,255,255,0.1);
  margin: 24px 0;
  overflow: hidden;
}
.m3-loading-bar-fill {
  height: 100%; width: 0; border-radius: 2px;
  background: hsl(185 70% 45%);
}
.m3-loading-bar-fill.is-animating {
  animation: m3-bar-fill 2.5s ease-in-out forwards;
}
@keyframes m3-bar-fill {
  from { width: 0; }
  to { width: 100%; }
}
```

## Files changed
- `src/pages/IntroModule3.tsx`
- `src/index.css`

