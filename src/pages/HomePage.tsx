import { Link } from "react-router-dom";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { useAsciiAnimation } from "@/hooks/useAsciiAnimation";

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

        {/* Hero Overlay */}
        <div className="hero-overlay">
          <h1 className="hero-title">
            ENTREPRENEURSHIP POLICY
            <br />
            RESEARCH IN <em>WORDS</em>
          </h1>
          <p className="hero-subtitle">
            By Rodrigo Frías, as part of PhD research at Durham University Business School
          </p>
          <div className="cta-container">
            <Link to="/evidence" className="cta-button">
              Explore the Evidence
            </Link>
            <Link to="/about" className="cta-secondary">
              About the project →
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
