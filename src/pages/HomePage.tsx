import { Link } from "react-router-dom";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { useAsciiAnimation } from "@/hooks/useAsciiAnimation";
const metrics = [{
  value: "5,700+",
  label: "Academic papers"
}, {
  value: "125",
  label: "Terms"
}, {
  value: "25",
  label: "Topics"
}, {
  value: "40+",
  label: "Years of evolution"
}];
export default function HomePage() {
  const asciiWords = useAsciiAnimation();
  return <HomeLayout>
      <div className="ascii-container">
        {/* Animated ASCII Background with colored words */}
        <pre className="ascii-pre">
          {asciiWords.map((row, rowIndex) => <span key={rowIndex}>
              {row.map((word, wordIndex) => <span key={wordIndex} className={`ascii-word ascii-word--${word.colorClass}`}>
                  {word.text}
                </span>)}
              {"\n"}
            </span>)}
        </pre>

        {/* Hero Overlay with soft vignette */}
        <div className="hero-overlay">
          <h1 className="hero-title text-8xl font-serif">Enterprise Policy Literacy</h1>
          <p className="hero-subtitle">
            Mapping decades of entrepreneurship and enterprise policy research through advanced network visualization.
          </p>
          
          <div className="cta-container">
            <Link to="/evidence" className="cta-button">
              Explore the Evidence
            </Link>
            <Link to="/about" className="cta-secondary">
              About the project →
            </Link>
          </div>

          {/* Metric cards */}
          <div className="hero-metrics">
            {metrics.map(metric => <div key={metric.label} className="hero-metric">
                <div className="hero-metric-value">{metric.value}</div>
                <div className="hero-metric-label">{metric.label}</div>
              </div>)}
          </div>
        </div>
      </div>
    </HomeLayout>;
}