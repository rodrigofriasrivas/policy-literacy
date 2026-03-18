import { useState, useEffect } from "react";
import { useAsciiAnimation } from "@/hooks/useAsciiAnimation";
import { ModuleShell } from "@/components/intro/ModuleShell";

const GAP_TERMS = [
  "ecosystems", "inclusion", "venture capital", "policy diffusion",
  "gender", "social entrepreneurship", "digital transformation",
  "family firms", "climate policy", "nascent entrepreneurs",
  "spin-offs", "informal economy",
];

export default function IntroModule1() {
  const asciiWords = useAsciiAnimation();
  const [currentTermIndex, setCurrentTermIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTermIndex((prev) => (prev + 1) % GAP_TERMS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ModuleShell
      step={1}
      nextPath="/intro/2"
      nextLabel="See the field in time"
    >
      {/* Animated ASCII backdrop */}
      <div className="m1-canvas">
        <pre className="ascii-pre m1-ascii">
          {asciiWords.map((row, rowIndex) => (
            <span key={rowIndex}>
              {row.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={`ascii-word ascii-word--${word.colorClass}`}
                >
                  {word.text}
                </span>
              ))}
              {"\n"}
            </span>
          ))}
        </pre>

        {/* Hero content centred over ASCII */}
        <div className="m1-hero">
          <p className="m1-eyebrow">Step 1 of 3 — The Problem</p>

          <h1 className="m1-title">
            The field is large and hard to read.
          </h1>

          <p className="m1-lead">
            Entrepreneurship and enterprise policy research has accumulated across four decades
            into a body of knowledge that policy actors cannot readily interpret as a field.
            Growth has been uneven, themes have been fragmented, producing a body of knowledge
            that has grown without a shared navigational structure.
          </p>

          <div className="m1-body">
            <p>
              By the 1980s, enterprise policy had become closely associated with economic reform.
              Research expanded and diversified — drawing in economics, management, sociology,
              and policy studies simultaneously. Innovation, ecosystems, finance, education,
              inclusion, sustainability, and digital transformation each opened distinct research
              strands. The evidence base grew faster than any synthesis approach could organise it.
            </p>
            <p>
              The structural problem is interpretability. This artefact addresses that gap
              directly: it makes the landscape of a 40-year evidence base visible and navigable.
            </p>
            <blockquote className="m1-callout">
              "Enterprise policy" is written with one space between two words. The field it
              describes spans four decades, 25 research conversations, and thousands of papers.
            </blockquote>

            <div className="m1-gap-animation">
              <span className="m1-gap-word">Enterprise</span>
              <span className="m1-gap-terms" key={currentTermIndex}>
                <span className="m1-gap-term">{GAP_TERMS[currentTermIndex]}</span>
                <span className="m1-gap-term">{GAP_TERMS[(currentTermIndex + 1) % GAP_TERMS.length]}</span>
              </span>
              <span className="m1-gap-word">Policy</span>
            </div>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}
