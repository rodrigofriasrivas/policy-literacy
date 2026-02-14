import { Link } from "react-router-dom";
import durhamLogo from "@/assets/durham_logo_white_720_300_rodrigo_frias.png";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        {/* Left: Logo */}
        <div className="site-footer-brand">
          <img
            src={durhamLogo}
            alt="Durham University"
            className="site-footer-logo"
          />
        </div>

        {/* Middle: Disclaimer + metadata */}
        <div className="site-footer-info">
          <p className="site-footer-disclaimer">
            This artefact maps the research landscape; it does not evaluate, rank, or recommend evidence.
          </p>
          <Link to="/about#data-sources" className="site-footer-link">
            Data sources
          </Link>
          <p className="site-footer-meta">
            Version: v1.2025 · Last updated: Feb 2026
          </p>
        </div>

        {/* Right: Mini nav */}
        <nav className="site-footer-nav">
          <a href="/artefact/index.html">Network visualisation</a>
          <Link to="/about">About the project</Link>
          <Link to="/policy">Policy engagement</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      {/* Bottom copyright */}
      <div className="site-footer-copyright">
        Research, design and programming by © Rodrigo Frías.
      </div>
    </footer>
  );
}
