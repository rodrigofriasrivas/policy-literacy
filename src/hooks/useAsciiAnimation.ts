import { useState, useEffect, useCallback, useRef } from "react";

const bigrams = [
  "policy reform", "venture capital", "start up", "innovation policy", "public funding",
  "economic development", "enterprise support", "regional growth", "skills training", "technology transfer",
  "entrepreneurial ecosystem", "social enterprise", "regulatory framework", "business model", "access finance",
  "job creation", "knowledge spillover", "university spinout", "tax incentive", "market failure",
  "risk capital", "seed funding", "institutional void", "startup accelerator", "governance structure",
  "policy learning", "inclusive growth", "ecosystem building", "investment readiness", "entrepreneurial finance",
  "smart specialisation", "cluster policy", "industrial strategy", "rural entrepreneurship", "youth entrepreneurship",
  "digital transformation", "public private", "evidence policy", "impact measurement", "regional disparity",
  "scaling up", "entrepreneur support", "informal economy", "creative industries", "research commercialisation",
  "unicorn startups", "public procurement", "administrative burden", "entrepreneurial failure", "incubator program",
  "platform economy", "early stage", "network capital", "internationalisation support", "investment funds",
  "gender entrepreneurship", "minority founders", "entrepreneurial resilience", "green innovation", "deep tech",
  "soft landing", "policy coordination", "spillover effects", "accelerator effectiveness", "cross-border scaling",
  "mission economy", "entrepreneur policy", "entrepreneurial regions", "knowledge economy", "policy logic",
  "subsidy dependence", "entrepreneurial state", "academic spinout", "ecosystem mapping", "microbusiness policy",
  "venture debt", "entrepreneurial mobility", "policy layering", "governance fragmentation", "transversal skills",
  "entrepreneurial orientation", "second chance", "evidence gaps", "startup visa", "entrepreneurial discovery",
  "procurement innovation", "startup diplomacy", "public risk", "early validation", "civic tech",
  "university industry", "distributed incubation", "data driven", "experimental policy", "investment incentives",
  "entrepreneurial intention", "community engagement", "entrepreneurial mindset", "design policy", "local capability",
  "entrepreneurial agency", "scaling barriers", "funding gaps", "regional strategy", "bottom up",
  "policy incoherence", "policy narratives", "startup myths", "entrepreneurial learning", "soft skills",
  "sector coupling", "institutional support", "innovation districts", "fiscal incentives", "strategic ambiguity",
  "startup ecosystem", "evidence fragmentation", "AI startups", "entrepreneurial culture", "spin-off policy"
];

// Sphere palette color classes matching network visualization
const colorClasses = ["cyan", "purple", "magenta", "amber", "green"];

export interface AsciiWord {
  text: string;
  colorClass: string;
}

export function useAsciiAnimation() {
  const [asciiWords, setAsciiWords] = useState<AsciiWord[][]>([]);
  const gridRef = useRef({ cols: 120, rows: 60 });
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  // Calculate responsive grid size
  const calculateGridSize = useCallback(() => {
    if (typeof window === "undefined") return { cols: 120, rows: 60 };
    
    const charWidth = 7;
    const charHeight = 12;
    const cols = Math.floor(window.innerWidth / charWidth);
    const rows = Math.floor((window.innerHeight - 60) / charHeight);
    return { 
      cols: Math.min(Math.max(cols, 80), 200), 
      rows: Math.min(Math.max(rows, 40), 120) 
    };
  }, []);

  // Generate ASCII frame with colored words
  const generateAscii = useCallback((frame: number, cols: number, rows: number): AsciiWord[][] => {
    const centerX = 0.5;
    const centerY = 0.5;
    const result: AsciiWord[][] = [];

    for (let y = 0; y < rows; y++) {
      const row: AsciiWord[] = [];
      for (let x = 0; x < cols; ) {
        const dx = x / cols - centerX;
        const dy = y / rows - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const wave = Math.sin(x / 3 + y / 5 + frame / 3000 + dist * 10)
                   + Math.cos(x / 4 - y / 3 - frame / 2000)
                   + Math.sin(frame / 1000 + (x / cols) * 2 * Math.PI);

        const bigramIndex = Math.floor(Math.abs((wave + 2) * 10 + dist * 5)) % bigrams.length;
        const bigram = bigrams[bigramIndex].padEnd(28).slice(0, 28);
        
        // Assign color based on position and wave for organic variation
        const colorIndex = Math.floor(Math.abs(wave * 2 + x / 20 + y / 15)) % colorClasses.length;
        
        row.push({
          text: bigram,
          colorClass: colorClasses[colorIndex]
        });
        x += 28;
      }
      result.push(row);
    }
    return result;
  }, []);

  useEffect(() => {
    const { cols, rows } = calculateGridSize();
    gridRef.current = { cols, rows };

    // Static frame for reduced motion
    if (prefersReducedMotion) {
      setAsciiWords(generateAscii(0, cols, rows));
      return;
    }

    // Animation loop with ~30fps throttle
    let frame = 0;
    let lastUpdate = 0;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate >= 33) { // ~30fps
        setAsciiWords(generateAscii(frame, gridRef.current.cols, gridRef.current.rows));
        frame++;
        lastUpdate = timestamp;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      const { cols, rows } = calculateGridSize();
      gridRef.current = { cols, rows };
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion, calculateGridSize, generateAscii]);

  return asciiWords;
}
