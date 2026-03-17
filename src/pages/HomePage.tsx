import { Link } from "react-router-dom";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { useAsciiAnimation } from "@/hooks/useAsciiAnimation";
const metrics = [
  {
    value: "5,800",
    label: "Academic papers",
  },
  {
    value: "125",
    label: "Terms",
  },
  {
    value: "25",
    label: "Topics",
  },
  {
    value: "40+",
    label: "Years of evolution",
  },
];
export default function HomePage() {
  const asciiWords = useAsciiAnimation();
  return (
    <HomeLayout>
      <div className="ascii-container">
        {/* Animated ASCII Background with colored words */}
        <pre className="ascii-pre">
          {asciiWords.map((row, rowIndex) => (
            <span key={rowIndex}>
              {row.map((word, wordIndex) => (
                <span key={wordIndex} className={`ascii-word ascii-word--${word.colorClass}`}>
                  {word.text}
                </span>
              ))}
              {"\n"}
            </span>
          ))}
        </pre>

        {/* Hero Overlay with soft vignette */}
        <div className="hero-overlay">
          <h1 className="hero-title font-serif whitespace-nowrap" style={{ fontSize: "clamp(2rem, 5.5vw, 6rem)" }}>
            Enterprise Policy Literacy
          </h1>
          <p className="hero-subtitle">
            Mapping decades of entrepreneurship and enterprise policy research through advanced network visualization.
          </p>
          <div className="homepage-cta-group">
            <div className="homepage-cta-item">
              <Link to="/" className="cta-button homepage-cta-primary" id="hp-cta-start">
                Start here →
              </Link>
              <span className="homepage-cta-sub">Recommended for first-time visitors</span>
            </div>
            <div className="homepage-cta-item">
              <a href="/artefact/index.html" className="cta-secondary homepage-cta-secondary" id="hp-cta-explore">
                Explore the field
              </a>
              <span className="homepage-cta-sub">Go straight to the visualisation</span>
            </div>
          </div>

          {/* Metric cards */}
          <div className="hero-metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="hero-metric">
                <div className="hero-metric-value">{metric.value}</div>
                <div className="hero-metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
