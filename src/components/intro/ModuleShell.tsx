import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ModuleShellProps {
  children: ReactNode;
  step: 1 | 2 | 3;
  nextPath?: string;
  prevPath?: string;
  nextLabel?: string;
  /** If true, the next CTA is a hard navigation (external static file) */
  nextIsExternal?: boolean;
  /** Custom click handler for the next button (overrides navigation) */
  onNextClick?: () => void;
}

const STEPS = [
  { num: 1, label: "The problem" },
  { num: 2, label: "The field in time" },
  { num: 3, label: "The structure" },
];

export function ModuleShell({
  children,
  step,
  nextPath,
  prevPath,
  nextLabel = "Continue",
  nextIsExternal = false,
  onNextClick,
}: ModuleShellProps) {
  const navigate = useNavigate();

  return (
    <div className="module-shell">
      {/* Top bar: brand + nav */}
      <header className="module-header">
        <Link to="/" className="module-brand">
          Enterprise Policy Literacy
        </Link>
        <nav className="module-top-nav">
          <a href="/artefact/index.html" className="module-top-nav-link">Network visualisation</a>
          <Link to="/about" className="module-top-nav-link">About</Link>
          <Link to="/policy" className="module-top-nav-link">Policy engagement</Link>
          <Link to="/contact" className="module-top-nav-link">Contact</Link>
        </nav>
      </header>

      {/* Sequencer pill */}
      <div className="module-sequencer">
        {STEPS.map((s) => (
          <div
            key={s.num}
            className={`module-step ${s.num === step ? "is-active" : s.num < step ? "is-done" : "is-future"}`}
          >
            <span className="module-step-dot">
              {s.num < step ? "✓" : s.num}
            </span>
            <span className="module-step-label">{s.label}</span>
          </div>
        ))}
        <div className="module-step module-step--viz">
          <span className="module-step-dot">→</span>
          <span className="module-step-label">Full visualisation</span>
        </div>
      </div>

      {/* Page content — padding clears the fixed bottom bar */}
      <main className="module-main">
        {children}
      </main>

      {/* Fixed bottom bar: epistemic label + navigation */}
      <div className="module-footnav-bar">
        <div className="module-epistemic">
          <span className="module-epistemic-icon">⊗</span>
          This map reflects patterns in a sample of academic literature. It does not indicate hierarchy or recommendation.
        </div>
        <nav className="module-footnav">
          {prevPath ? (
            <button
              className="module-footnav-back"
              onClick={() => navigate(prevPath)}
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          {nextPath &&
            (nextIsExternal ? (
              <button onClick={() => { window.location.href = nextPath!; }} className="module-footnav-next" id={`module-cta-step-${step}`}>
                {nextLabel} →
              </button>
            ) : (
              <Link to={nextPath} className="module-footnav-next" id={`module-cta-step-${step}`}>
                {nextLabel} →
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );
}
