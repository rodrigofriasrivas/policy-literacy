# Fix: Network loses its viewport after visiting another section

## Confirmed root cause (reproduced in the running Preview)
Choosing a topic reloads the Artefact in topic mode (`?mode=topic&topicId=2`). In that mode the network is drawn inside the Topic View's own box (measured: 422 × 498 px), and the simulation is laid out for that size.

When you come back by clicking the **Network** tab, `switchView('network')` runs the Macro View path:
- it moves the canvas out of the Topic View box into the full-page network container, and
- resizes the canvas to the whole window (measured: 1182 × 1206 px),
- but the simulation's centre, the stored width/height and the zoom stay sized for the small 422 × 498 box, and the Topic View panel isn't shown again.

The result is what your screenshot shows: the topic network squeezed into the upper-left corner of a much larger, mostly empty canvas. It's a sizing mismatch, not a stale saved zoom, so the zoom value can read 100% or another number depending on what you did before. I reproduced the squeeze, but I didn't reproduce exactly 36%.

Answers to the brief's questions:
1. **Sized while hidden:** this is not the trigger here. Nothing measures the canvas while you're on Papers or Topics. One related risk: resizing the browser window while on another section in topic mode would measure a hidden box as 0 × 0.
2. **Stale zoom restored:** no zoom transform is restored.
3. **Fit runs too early:** there is no automatic fit-to-view. The topic layout is sized once, when the Topic View opens.
4. **Unintended restart:** returning does reheat the simulation (`resumeNetwork` → `alpha(1).restart()`). This was already the case and is not the cause. I'm leaving it as it is.
5. **Papers filter isolation:** this did not cause it. Hiding the sidebar on other sections didn't cause it either. The bug comes from the Network tab in topic mode taking the Macro View path.

## Minimal fix (only in `public/artefact/index.html`)
1. In `switchView`, when the page is in topic mode and the Network tab is chosen, show the Topic View instead of the Macro path. The canvas then stays in its Topic View box at its original size. Zoom, pan, node positions and the selected topic are all kept. The **Network** tab stays highlighted.
2. Keep the topic breadcrumb ("TOPIC 2: Academic Spin-offs") when returning. Its text is stored once, when the Topic View opens, and reapplied.
3. **Resizing while away.** If the window is resized while the Topic View box is hidden (it measures 0 × 0), the resize handler skips it and doesn't restart the simulation. When you return to Network in topic mode, a new step runs after the Topic View is visible again. It measures the box's current size, then updates the canvas and the stored width and height. It also shifts the pan by half the size change, so the network stays centred in the box. The step doesn't restart or rebuild the simulation, and node positions, zoom level and the selected topic stay the same. If the size hasn't changed, it does nothing. Resizing the window while the network is on screen works as it does today.

The following stay unchanged: data, links, forces, simulation settings, the Papers/Network filter separation, the selected topic, the header, the sidebar, the theme, other sections and the Macro View path. No fixed zoom levels or coordinates are added.

## Regression checks (Playwright, Light and Dark)
- Topic 1 → Papers → Network; Topic 2 → Topics → Network; Topic 14 → Temporal Evolution → Network; Topic 2 → My Reading List → Network.
- Macro View → Papers → Network.
- Topic 2 → Papers → resize the window (for example 1182 → 1440, then 1440 → 900) → Network. The canvas should match the Topic View box's new size, and the network should stay centred. Node positions and zoom stay the same, and the simulation doesn't restart. Repeat via Topics, Temporal Evolution and My Reading List.
- From topic mode, choose Macro View in the existing topic selector. The full-page network layout should come back normally.
- Repeat each sequence 3 times without reloading.
- For each one, compare the canvas parent, size and zoom with the values before leaving. They should match, and a screenshot should show the network filling its box.
- Zoom +/−, Reset View, hovering and clicking nodes, bookmarking from the hover card, and changing topic all still work. No page errors. All 26 tests pass.
- Add one AGENTS.md rule: in topic mode, the Network tab returns to the Topic View and never moves or resizes the canvas.
