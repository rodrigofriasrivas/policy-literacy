# Figure 3.2 — Thesis screenshot mode (Topics overview only)

Note: earlier work ruled out a "Figure Export Mode". This brief now asks for one explicitly, so it is scoped narrowly: a capture-only switch that never affects the normal interface.

## What you will get
- Opening `/artefact/index.html?figure=3.2` shows the Topics overview in a clean capture layout. Without the parameter, everything looks and behaves exactly as today.
- In this mode:
  - The left sidebar is hidden and the topic grid uses the full width.
  - The global header and Topics sub-navigation stay visible.
  - The floating chat button and the zoom controls are hidden.
  - Light Mode is shown for this page view only. Your saved theme preference is not changed.
  - Topics 01–05 open automatically; Topics 06–25 stay closed. Clicking cards still works as normal.
  - Outer padding is reduced, the grid keeps 5 equal columns, and the first row uses the wider space so descriptions wrap less.
- One high-resolution PNG (2x pixel density) of the heading, description and all 25 cards, plus a report on dimensions and A4 legibility.

## Not changed
Topic data, descriptions, terms, numbering, colours, expand logic, network, theme system, Reading List, other views and the normal Topics layout.

## Verification
- Normal view checked in both themes to confirm it is unchanged (before/after compare).
- Capture mode: all 25 cards present, no clipped text, 5 columns, cards 1–5 open.
- A4 check: work out the effective point size of titles, descriptions and terms when scaled to about 16 cm usable width, and report any remaining limits.
- 26 existing tests run; stop for your review.

## Technical details
- `public/artefact/index.html` only: read `URLSearchParams` on load; if `figure=3.2`, add the class `figure-capture` to `<html>`, switch to the field-structure view and set expanded state for topics 1–5 through the existing expand function. Apply `data-theme="light"` without writing `eplt-theme`.
- CSS scoped under `html.figure-capture`: hide sidebar, `#zoomControls`, SimonThinks widget container; widen `#view-field-structure .topic-overview-wrap` (max-width none, slimmer padding); keep `grid-template-columns: repeat(5, 1fr)`.
- Capture with Playwright at about 1800px wide, device scale factor 2, cropped to the overview wrapper; saved to `/mnt/documents/figure-3-2/figure_3_2_capture_mode.png`.
