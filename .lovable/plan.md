# Separate chat and network zoom controls

## Confirmed issue
The network zoom buttons are anchored 24px from the bottom-right edge. The chat launcher defaults to the same corner with a 56px button, causing the overlap shown in your screenshot.

## Planned changes
- Keep chat in the bottom-right corner and move the main network zoom controls to the bottom-left corner.
- Anchor both to the visible screen with consistent edge spacing and device safe-area allowances, reducing margins on smaller screens.
- Keep the chat panel within the available screen width and height, including short landscape screens; retain its existing full-screen behaviour on phones.
- While the phone chat is full-screen, keep network controls behind it; restore their availability when chat closes.
- Check the left-side network controls for collisions and adjust only the zoom placement if necessary.
- Preserve the existing zoom behaviour, chat service, colours, navigation, and other pages. No new dependencies.

## Technical scope
Changes are limited to `public/artefact/index.html`. Use narrowly scoped CSS for `#zoomControls` and the existing chat launcher/panel, with minimal integration code only if needed to identify the dynamically inserted panel. Preserve existing embed-mode control visibility and topic-network controls.

## Verification
Inspect the live network page at the screenshot dimensions (1007×687), desktop, narrow phone, and short landscape sizes. Test both zoom buttons and chat opening/closing, resize with chat open, and confirm no launcher/zoom overlap, clipped chat panel, or inaccessible close control.
