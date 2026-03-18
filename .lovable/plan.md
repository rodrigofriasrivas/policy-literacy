

# Round 11: Step 1 copy rewrite and gap animation

Two fixes in `IntroModule1.tsx` and `index.css` only.

## Fix 1 — Rewrite Step 1 copy

Replace the heading, paragraphs, blockquote, and caveat in `IntroModule1.tsx` with the exact copy provided. Structure:

- **Heading**: Single line "The field is large and hard to read." (remove the two-line heading and `.m1-title-accent` span)
- **Paragraph 1** (`.m1-lead`): Accumulated knowledge, uneven growth, no shared navigational structure
- **Paragraphs 2–3** (inside `.m1-body`): 1980s expansion + interpretability gap
- **Blockquote** (`.m1-callout`): Updated quote about four decades, 25 conversations, thousands of papers

Remove the `.m1-caveat` paragraph entirely.

## Fix 2 — Animated gap element

Add a new component below the blockquote in the JSX. Import `useState`, `useEffect` at the top.

### React logic
- `GAP_TERMS` array of 12 terms
- `useState` for `currentTermIndex` (starts at 0)
- `useEffect` with `setInterval(3000)` cycling through terms, showing 2 at a time (current and next)

### JSX (after blockquote, inside `.m1-body`)
```tsx
<div className="m1-gap-animation">
  <span className="m1-gap-word">Enterprise</span>
  <span className="m1-gap-terms" key={currentTermIndex}>
    <span className="m1-gap-term">{GAP_TERMS[currentTermIndex]}</span>
    <span className="m1-gap-term">{GAP_TERMS[(currentTermIndex + 1) % GAP_TERMS.length]}</span>
  </span>
  <span className="m1-gap-word">Policy</span>
</div>
```

### CSS (index.css)

```css
.m1-gap-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 0;
  animation: m1-gap-breathe 6s ease-in-out infinite;
}

.m1-gap-word {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: rgba(255,255,255,0.85);
}

.m1-gap-terms {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  animation: m1-terms-fade 3s ease-in-out infinite;
}

.m1-gap-term {
  font-size: 0.9rem;
  color: hsl(185 70% 45%);
  opacity: 0;
  animation: m1-term-appear 3s ease-in-out infinite;
  white-space: nowrap;
}

@keyframes m1-gap-breathe {
  0%, 100% { gap: 12px; }
  50% { gap: 80px; }
}

@keyframes m1-term-appear {
  0%, 100% { opacity: 0; transform: translateY(4px); }
  30%, 70% { opacity: 1; transform: translateY(0); }
}
```

Mobile (`@media (max-width: 768px)`): `.m1-gap-word` font-size `1.5rem`, breathe gap max `40px`.

Use `key={currentTermIndex}` on the terms container to restart fade animations on each cycle.

## Files changed
- `src/pages/IntroModule1.tsx`
- `src/index.css`

