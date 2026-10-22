# Stage 3 — Save papers from the network hover card

Only `public/artefact/index.html` changes (plus tests, AGENTS.md, roadmap.md). The shared store `public/reading-list.js`, the network data, simulation, header and theme system are not touched.

## What users will see

- The existing paper hover card gains a small bookmark button in its top row (beside the year tag). Outline = not saved, filled = saved. Label: "Save to Reading List" / "Remove from Reading List".
- Hover a paper, move the pointer onto the card, click the bookmark: it fills immediately and `Reading List (n)` updates. Leaving both node and card closes the card as today.
- The card shows the correct saved state every time it opens, matching the Papers table and Reading List view (same store, same paper IDs).
- Bigram and topic hover cards behave exactly as now (no button, still pass-through).
- Same behaviour in Macro View and Topic View (both use the same canvas and hover handler).

## How the hover-to-card transition works (smallest change)

The card currently has `pointer-events: none` and follows the cursor. Changes, paper cards only:

1. Card stays `pointer-events: none` except the bookmark button area, made clickable only while a paper card is shown. Bigram/topic cards stay fully pass-through.
2. Short grace period (about 250 ms) when the pointer leaves the paper node or the canvas: if the pointer enters the card within it, the card stays open; otherwise it closes. No grace for bigram/topic cards, so fast hover is unchanged.
3. While the pointer is over the card, the card is frozen: no repositioning, no content swap. Leaving the card closes it at once.
4. Bookmark click calls `window.EpltReadingList.toggle(id)` with `preventDefault`/`stopPropagation` on pointerdown, mousedown and click, so it never reaches the canvas (no drag, selection, pan, zoom or reset). The existing click-on-empty-space reset is not triggered because the event never hits the canvas.
5. Icon refreshes via the existing `EpltReadingList.subscribe` / storage-event path, so a save from another tab updates an open card too.

No changes to D3 handlers, zoom behaviour, simulation or node data. If the grace period proves unreliable without touching D3 drag/zoom handling, I will stop and report before trying anything broader.

## Visual and accessibility

- Reuses Stage 2 `.rl-btn` icon and tokens; opaque card backgrounds kept in both themes; dimensions/typography unchanged apart from the small icon.
- Native `<button>` with `aria-pressed`, aria-label, visible focus ring. If the stored list is unreadable, the button is disabled with the existing Stage 2 warning tooltip.

## Verification

- Playwright, Light and Dark, Macro View and Topic View: hover a paper, move into the card, save; counter +1; re-hover shows saved; unsave; counter −1; state matches Papers table and Reading List view.
- Before/after comparison of zoom transform, a sample of node coordinates, filters, active view/topic: unchanged after bookmarking.
- Bigram card still pass-through and dismisses immediately; moving off a paper without entering the card closes it within the grace period; no flicker; no page errors.
- `bunx vitest run` (18 tests) plus a small test that the network card uses the shared store key (no second storage).
- Screenshots: saved and unsaved card in both themes. Then stop for review.

## Limitations to expect

- Touch devices have no hover, so this entry point is mouse/trackpad only; tables remain the touch path.
- Keyboard users cannot reach a hover card on the canvas; the Papers table remains the keyboard path.
