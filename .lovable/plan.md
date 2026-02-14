

# Fix: About Page Text Invisible on Dark Background

## Problem
The About page content IS in the code (all seven paragraphs, subtitle, and Data sources section), but the text is invisible because the CSS uses **black text colours** (`rgba(0, 0, 0, ...)`) on a **dark background**. The text is literally there but cannot be seen.

## Root Cause
The `.placeholder-page`, `.placeholder-content`, and `.text-muted` styles in `src/index.css` (lines 395-426) use black-based colours:
- `h1`: `rgba(0, 0, 0, 0.9)` -- black on dark = invisible
- `p`: `rgba(0, 0, 0, 0.7)` -- black on dark = invisible
- `.text-muted`: `rgba(0, 0, 0, 0.5)` -- black on dark = invisible

## Fix
Update the placeholder page CSS colours to use **white-based values** that are visible on the dark background, consistent with the rest of the site:

### `src/index.css` (lines 409-426)
- `h1` colour: change to `rgba(255, 255, 255, 0.92)`
- `p` colour: change to `rgba(255, 255, 255, 0.7)`
- `.text-muted` colour: change to `rgba(255, 255, 255, 0.55)`

### `src/pages/AboutPage.tsx`
- Also change `text-align: center` on `.placeholder-content` to `text-align: left` so the long-form prose reads naturally (left-aligned). This can be done with an inline style override on the About page, or by updating the CSS class.

No new files, no new routes -- just a colour fix in the existing CSS.
