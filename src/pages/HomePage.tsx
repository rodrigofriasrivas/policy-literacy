import { Link } from "react-router-dom";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { useAsciiAnimation } from "@/hooks/useAsciiAnimation";

export default function HomePage() {
  const asciiText = useAsciiAnimation();

  return (
    <HomeLayout>
      <div className="ascii-container">
        {/* Animated ASCII Background */}
        <pre className="ascii-pre">{asciiText}</pre>

        {/* Hero Overlay */}
        <div className="hero-overlay">
          <h1 className="hero-title">
            ENTREPRENEURSHIP POLICY RESEARCH
            <br />
            IN <em>WORDS</em>
          </h1>
          <p className="hero-subtitle">
            <strong>By Rodrigo Frías</strong>, as part of PhD research project at Durham University Business School
          </p>
          <div className="cta-container">
            <Link to="/evidence" className="cta-button">
              Explore the Evidence
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
