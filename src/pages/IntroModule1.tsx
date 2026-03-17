import { useAsciiAnimation } from "@/hooks/useAsciiAnimation";
import { ModuleShell } from "@/components/intro/ModuleShell";

export default function IntroModule1() {
  const asciiWords = useAsciiAnimation();

  return (
    <ModuleShell
      step={1}
      nextPath="/intro/2"
      nextLabel="See the field in time"
    >
      {/* Animated ASCII backdrop – reuses existing homepage animation */}
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
          {/* Module label */}
          <p className="m1-eyebrow">Step 1 of 3 — The Problem</p>

          <h1 className="m1-title">
            The evidence exists.<br />
            <span className="m1-title-accent">Finding your way through it is the challenge.</span>
          </h1>

          <p className="m1-lead">
            Entrepreneurship and enterprise policy has been studied for more than 40 years.
            Forty years of research have produced an excess of fragmented evidence spread across
            parallel research conversations that no single actor can navigate alone.
          </p>

          <div className="m1-body">
            <p>
              By the 1980s, enterprise policy had become closely associated with economic reform.
              Research expanded — and then fragmented. Innovation, ecosystems, finance, education,
              inclusion, sustainability, digital transformation: each opened its own strand.
              The result is a field that is rich in insights but difficult to orient within,
              even for those who study it.
            </p>
            <p>
              The limiting factor is <em>interpretability</em>, not volume.
              This artefact exists to address that structural gap: to make the landscape of
              a 40-year evidence base visible and navigable.
            </p>
            <blockquote className="m1-callout">
              "Enterprise policy" is written with one space between two words. But the gap
              it is expected to bridge is much larger than it looks.
            </blockquote>
            <p className="m1-caveat">
              This artefact orients — it makes the landscape visible and navigable so that
              evaluation, judgement, and contextual knowledge can do their work.
            </p>
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}
