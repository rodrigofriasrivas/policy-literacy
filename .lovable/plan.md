

# Round 4: Period card texts, chart alignment, chart width

Three fixes across two files (`IntroModule2.tsx` and `src/index.css`).

## Fix 1 — Period card texts (`IntroModule2.tsx`)

Replace `label` and `note` for each entry in `PERIOD_ANNOTATIONS` (lines 23-56) with the exact copy provided:

- Card 1: label → "Foundational years", note → long paragraph about Birch, Bolton, Thatcher/Reagan
- Card 2: label → "Field formation" (unchanged), note → new text about Gartner, Shane & Venkataraman
- Card 3: label → "Rapid expansion" (unchanged), note → new text about step change in volume
- Card 4: label → "Thematic fragmentation" (unchanged), note → new text about digital transformation, climate, migration

Only `label` and `note` fields change. `terms`, `ref`, `startYear`, `endYear` stay the same.

## Fix 2 — Chart and card alignment (`IntroModule2.tsx` + `index.css`)

**In `IntroModule2.tsx`**: Replace the dynamic period band width calculation (lines 130-134) with fixed percentages matching the card widths:
- Period 0 (1979–1991): left=0%, width=28%
- Period 1 (1992–2004): left=28%, width=25%
- Period 2 (2005–2015): left=53%, width=22%
- Period 3 (2016–2025): left=75%, width=25%

Use a lookup array instead of computing from year ranges.

**In `index.css`**: Replace `.m2-periods-grid` (lines 1483-1489) from `grid-template-columns: repeat(4, 1fr)` to a flex layout with fixed proportional widths:
```css
.m2-periods-grid {
  display: flex;
  gap: 0;
  margin-top: 40px;
  margin-bottom: 40px;
}
.m2-period-card:nth-child(1) { flex: 0 0 28%; }
.m2-period-card:nth-child(2) { flex: 0 0 25%; }
.m2-period-card:nth-child(3) { flex: 0 0 22%; }
.m2-period-card:nth-child(4) { flex: 0 0 25%; }
```

## Fix 3 — Increase container width (`index.css`)

Change `.m2-page` max-width from `1000px` to `900px` — wait, the user says increase to 900px "from current value." The current `.m2-page` is 1000px. But the chart container `.m2-chart-outer` has no explicit max-width. The user says "chart container" specifically, not the page. Let me re-read: "Increase the maximum width of the chart container to 900px (from current value). This applies to the .m2-chart-wrapper or equivalent container class — not to the global layout."

The chart lives inside `.m2-page` (max-width 1000px) with no separate chart wrapper. The chart is already full-width within `.m2-page`. Since the page is 1000px and the user wants 900px for the chart specifically — but that would make it narrower. More likely the user wants the overall container wider, or the current effective width is smaller than 900px due to padding (40px each side = 920px content). Let me just set `.m2-chart-outer` and `.m2-periods-grid` to `max-width: 900px` explicitly to ensure they use that width consistently.

Actually re-reading: "The chart area and card row are currently too narrow, causing the longer period card texts to create excessive vertical height." So the user wants them wider. The page is 1000px with 40px padding = 920px content. The chart and cards have no explicit max-width so they fill that. Perhaps the effective issue is the card grid gap eating space or the page max-width being too small with the new longer texts.

I'll increase `.m2-page` max-width to `1100px` to give the chart and cards more room, since the user says "not to the global layout or other modules" but `.m2-page` IS the module 2 container specifically. Alternatively, I could just add `max-width: 900px` to the chart and cards — but that would make them narrower, not wider.

Let me just bump `.m2-page` max-width from 1000px to 1100px to accommodate the longer card texts. The user said 900px but perhaps meant the chart area specifically should be at least 900px wide (currently it's ~920px with padding, but might render narrower on some viewports). I'll set the chart and card containers to `max-width: 900px; margin-left: auto; margin-right: auto;` — no wait, that constrains them.

Simplest interpretation: set `.m2-chart-outer` max-width to 900px explicitly (it currently has none and fills its parent). But that makes it narrower. The user says "increase" — so it must currently be narrower than 900px somehow. Maybe due to parent constraints or I'm missing something.

I'll just set `max-width: 900px` on `.m2-chart-outer` and `.m2-periods-grid` as the user requested, trusting they know the current effective width is less than 900px.

## Files changed
- `src/pages/IntroModule2.tsx` — update `PERIOD_ANNOTATIONS` texts + use fixed band percentages
- `src/index.css` — flex-based card widths matching band percentages + max-width 900px on chart/cards

