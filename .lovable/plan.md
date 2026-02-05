
# Plan: Homepage with Animated ASCII Background

## Overview

Build a new homepage at "/" with an animated ASCII bigram background, transparent header navigation, and hero overlay. Create placeholder pages for /evidence, /about, /policy, /contact. The existing dashboard functionality moves to /evidence with sub-navigation tabs.

## Architecture Changes

### Routing Structure

| Route | Component | Layout |
|-------|-----------|--------|
| `/` | HomePage | HomeLayout (transparent header) |
| `/about` | AboutPage | HomeLayout |
| `/policy` | PolicyPage | HomeLayout |
| `/contact` | ContactPage | HomeLayout |
| `/evidence` | EvidencePage (placeholder with tabs) | AppLayout (existing) |
| `/evidence/field` | FieldOverview (existing) | AppLayout |
| `/evidence/papers` | PaperListing (existing) | AppLayout |
| `/evidence/temporal` | TemporalEvolution (existing) | AppLayout |
| `/evidence/topic/:topicId?` | TopicExploration (existing) | AppLayout |

## File Changes

### 1. `index.html`
- Add Google Fonts link for Lato (weights 300, 400, 600, 700)
- Update title and meta tags

### 2. `src/index.css`
- Add homepage-specific CSS variables and styles
- Homepage background color: #F4EFEB
- Pre element styling for ASCII animation
- Hero overlay styling
- Transparent header styles

### 3. `src/hooks/useAsciiAnimation.ts` (new)
Custom hook for the ASCII animation logic:
- Responsive rows/cols calculation based on viewport
- Wave + distance algorithm from user's JS
- 30fps throttling (every 2nd RAF frame)
- `prefers-reduced-motion` respect (static frame if true)
- Returns: `{ asciiText, preRef }`

### 4. `src/components/layout/HomeLayout.tsx` (new)
Layout for homepage and landing pages:
- Transparent header with centered nav
- Full viewport height (minus header/footer)
- Footer with version line
- Nav items: Explore the Data, About the project, Policy engagement, Contact

### 5. `src/pages/HomePage.tsx` (new)
Main homepage component:
- Uses HomeLayout
- ASCII container with animated pre element
- Hero overlay with:
  - Title: "ENTREPRENEURSHIP POLICY RESEARCH IN WORDS" (WORDS italic)
  - Subtitle with author attribution
  - CTA button linking to /evidence

### 6. `src/pages/AboutPage.tsx` (new)
Placeholder page with HomeLayout

### 7. `src/pages/PolicyPage.tsx` (new)
Placeholder page with HomeLayout

### 8. `src/pages/ContactPage.tsx` (new)
Placeholder page with HomeLayout

### 9. `src/pages/EvidencePage.tsx` (new)
Dashboard placeholder with:
- Horizontal sub-navigation showing future tabs (non-functional):
  - Evidence | Field overview | Papers | Temporal evolution | Experimental view
- Helper text: "Topics ordered by cumulative weight across the corpus..."
- Eventually will contain the dashboard content

### 10. `src/components/layout/AppLayout.tsx`
Update navigation items to reflect new structure:
- Remove "/" from nav (homepage is separate)
- Nav for dashboard pages under /evidence

### 11. `src/App.tsx`
Update routing:
- "/" -> HomePage (no AppLayout wrapper)
- "/about", "/policy", "/contact" -> respective pages
- "/evidence/*" routes -> existing dashboard pages with AppLayout

## Technical Implementation Details

### ASCII Animation Hook

```typescript
// src/hooks/useAsciiAnimation.ts
const bigrams = [
  "policy reform", "venture capital", "start up", ...
];

export function useAsciiAnimation() {
  const [asciiText, setAsciiText] = useState("");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  
  // Calculate responsive grid size
  const calculateGridSize = useCallback(() => {
    const charWidth = 7; // approximate for monospace at 11px
    const charHeight = 12;
    const cols = Math.floor(window.innerWidth / charWidth);
    const rows = Math.floor((window.innerHeight - 60) / charHeight);
    return { cols: Math.min(cols, 150), rows: Math.min(rows, 100) };
  }, []);
  
  // Generate ASCII frame
  const generateAscii = useCallback((frame: number, cols: number, rows: number) => {
    const centerX = 0.5;
    const centerY = 0.5;
    let result = "";
    
    for (let y = 0; y < rows; y++) {
      let row = "";
      for (let x = 0; x < cols; ) {
        const dx = x / cols - centerX;
        const dy = y / rows - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const wave = Math.sin(x / 3 + y / 5 + frame / 3000 + dist * 10)
                   + Math.cos(x / 4 - y / 3 - frame / 2000)
                   + Math.sin(frame / 1000 + (x / cols) * 2 * Math.PI);
        
        const bigramIndex = Math.floor(Math.abs((wave + 2) * 10 + dist * 5)) % bigrams.length;
        const bigram = bigrams[bigramIndex].padEnd(28).slice(0, 28);
        row += bigram;
        x += 28;
      }
      result += row + "\n";
    }
    return result;
  }, []);
  
  useEffect(() => {
    const { cols, rows } = calculateGridSize();
    
    // Static frame for reduced motion
    if (prefersReducedMotion) {
      setAsciiText(generateAscii(0, cols, rows));
      return;
    }
    
    // Animation loop with 30fps throttle
    let frame = 0;
    let lastUpdate = 0;
    let rafId: number;
    
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate >= 33) { // ~30fps
        setAsciiText(generateAscii(frame, cols, rows));
        frame++;
        lastUpdate = timestamp;
      }
      rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion, calculateGridSize, generateAscii]);
  
  return asciiText;
}
```

### Homepage Layout Structure

```text
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (transparent, centered nav)                             │
│  Explore the Data | About the project | Policy engagement | ... │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ASCII ANIMATION (pre element, full viewport)              │  │
│  │                                                           │  │
│  │        ┌─────────────────────────────────┐                │  │
│  │        │ HERO OVERLAY                    │                │  │
│  │        │                                 │                │  │
│  │        │ ENTREPRENEURSHIP POLICY         │                │  │
│  │        │ RESEARCH IN WORDS               │                │  │
│  │        │                                 │                │  │
│  │        │ By Rodrigo Frías...             │                │  │
│  │        │                                 │                │  │
│  │        │ [Explore the Evidence]          │                │  │
│  │        └─────────────────────────────────┘                │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER: Research project... [v1.2025]                          │
└─────────────────────────────────────────────────────────────────┘
```

### Evidence Page Tab Preview

```text
┌─────────────────────────────────────────────────────────────────┐
│  Evidence | Field overview | Papers | Temporal evolution | Exp. │
│           ─────────────────                                     │
│  "Topics ordered by cumulative weight across the corpus.        │
│   Select a topic to explore its structure."                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Dashboard placeholder - coming soon]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## CSS Additions

```css
/* Homepage-specific styles */
.home-page {
  background: #F4EFEB;
  font-family: 'Lato', sans-serif;
  font-size: 11px;
  line-height: 1.1;
  overflow: hidden;
}

.ascii-pre {
  color: rgba(0, 0, 0, 0.25);
  margin: 0;
  padding: 20px;
  user-select: none;
  white-space: pre;
  pointer-events: none;
  font-family: monospace;
}

.ascii-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  width: 100vw;
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
}

.hero-title {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 56px;
  color: rgba(0, 0, 0, 0.9);
  letter-spacing: 2px;
  line-height: 1.3;
}

.hero-subtitle {
  font-size: 25px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 18px;
}

.cta-button {
  display: inline-block;
  padding: 12px 28px;
  background: #000;
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #B2BEB5;
  color: #000;
}

.transparent-header {
  background: transparent;
  padding: 8px 0;
  text-align: center;
}

.home-nav {
  display: flex;
  justify-content: center;
  gap: 28px;
  font-size: 18px;
  font-weight: 600;
}

.home-nav a {
  color: #222;
  opacity: 0.8;
}

.home-nav a:hover {
  opacity: 1;
}

.home-footer {
  text-align: center;
  font-size: 13px;
  color: #555;
  padding: 8px 0;
  border-top: 1px solid #ddd;
}
```

## Performance Optimizations

1. **Responsive grid**: Calculate rows/cols based on viewport size, capped at reasonable maximums
2. **30fps throttle**: Only update every ~33ms instead of every RAF frame
3. **Reduced motion**: Single static frame when `prefers-reduced-motion` is enabled
4. **Pointer events disabled**: ASCII pre element cannot capture clicks

## Summary of New Files

| File | Purpose |
|------|---------|
| `src/hooks/useAsciiAnimation.ts` | Animation logic hook |
| `src/components/layout/HomeLayout.tsx` | Layout for landing pages |
| `src/pages/HomePage.tsx` | Main homepage with animation |
| `src/pages/AboutPage.tsx` | Placeholder |
| `src/pages/PolicyPage.tsx` | Placeholder |
| `src/pages/ContactPage.tsx` | Placeholder |
| `src/pages/EvidencePage.tsx` | Dashboard entry with tab preview |

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add Lato font, update title |
| `src/index.css` | Add homepage CSS |
| `src/App.tsx` | Update routing structure |
| `src/components/layout/AppLayout.tsx` | Update nav for dashboard context |
