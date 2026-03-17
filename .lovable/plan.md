

# Restore Homepage at `/` and move Module 1 to `/intro/1`

## Changes

### 1. `src/App.tsx` — Update routes
- `/` → `HomePage` (was `IntroModule1`)
- `/intro/1` → `IntroModule1` (new route)
- Remove `/legacy-home` route

### 2. `src/pages/HomePage.tsx` — Fix "Start here" link
- Change `<Link to="/">` to `<Link to="/intro/1">` on the "Start here" CTA

### 3. `src/pages/IntroModule1.tsx` — No changes needed
- Already works as a standalone page via `ModuleShell`

### 4. `src/components/intro/ModuleShell.tsx` — Update back link for step 1
- The brand link `<Link to="/">` already points home, so no change needed
- The step 1 "← Back" button uses `prevPath` which IntroModule1 doesn't set, so no change needed

### Files changed
- `src/App.tsx`
- `src/pages/HomePage.tsx`

