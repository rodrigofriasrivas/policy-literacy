

# Step 3 layout, width, and disclaimer cleanup

Four fixes across `IntroModule3.tsx` and `src/index.css`.

## Fix 1 — Use full width in Step 3 (index.css)

Keep `.m3-page` at `max-width: 1040px` (no change). The inner text elements `.m3-subtitle`, `.m3-lead`, and `.m3-body` each have `max-width: 720px` constraining their width. Remove those three `max-width` declarations so text fills the full 1040px container.

- Line 1652: remove `max-width: 720px` from `.m3-subtitle`
- Line 1660: remove `max-width: 720px` from `.m3-lead`
- Line 1668: remove `max-width: 720px` from `.m3-body`

## Fix 2 — Topic grid: 5 columns on wide screens (index.css)

Add after the `.m3-grid` block:
```css
@media (min-width: 1025px) {
  .m3-grid { grid-template-columns: repeat(5, 1fr); }
}
```

## Fix 3 — Remove redundant epistemic disclaimers (IntroModule3.tsx)

- Remove the `<p className="m3-epistemic-note">` italic line (~line 135)
- Remove the `<p className="m3-cta-note">` at bottom of CTA block (~line 276)
- Keep the orientation aids disclaimer and the ModuleShell footer

## Fix 4 — Replace CTA block text (IntroModule3.tsx)

Replace CTA body with two paragraphs:
1. "The network connects 25 research conversations, 125 key terms, and the papers behind them across four decades. The view is dense — that density reflects the field. Enterprise policy has never been a single conversation."
2. "Understanding the shape and evolution of this field is a starting point — whether you are designing a policy, building a programme, or simply trying to understand what the research actually covers."

Keep heading and button unchanged.

## Files changed
- `src/pages/IntroModule3.tsx`
- `src/index.css`

