

# Fix: Hard navigation for "Explore the full field" buttons

## Current state

Two "Explore the full field" CTAs exist:

1. **Line 269**: `<a href="/artefact/index.html">` in the CTA block — plain anchor, should work but could be intercepted by React Router
2. **ModuleShell bottom bar** (line 96 in ModuleShell.tsx): Also uses `<a href>` when `nextIsExternal={true}` — same situation

## Fix

Change both to use `<button onClick={() => window.location.href = '/artefact/index.html'>` to guarantee hard navigation:

1. **IntroModule3.tsx line 269-274**: Replace `<a href>` with a `<button>` using `onClick={() => { window.location.href = '/artefact/index.html'; }}`
2. **ModuleShell.tsx line 87-90**: Replace the external `<a href>` with a `<button>` using `onClick={() => { window.location.href = nextPath; }}` when `nextIsExternal` is true

Both keep their existing className and id attributes for styling continuity.

## Files changed
- `src/pages/IntroModule3.tsx` — CTA block button
- `src/components/intro/ModuleShell.tsx` — bottom bar external CTA

