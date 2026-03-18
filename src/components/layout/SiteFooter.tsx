import { Link } from "react-router-dom";
import durhamLogo from "@/assets/durham_logo_white_720_300_rodrigo_frias.png";

export function SiteFooter() {
  return (
    <footer className="site-footer px-8 py-6">
      <div className="footer-single-row">
        <img
          src={durhamLogo}
          alt="Durham University"
          className="footer-logo"
        />
        <div className="footer-text-stack">
          <p className="footer-line-1">
            This artefact maps the research landscape; it does not evaluate, rank, or recommend evidence.
          </p>
          <p className="footer-line-2">
            Artefact researched, designed and developed by{" "}
            <a
              href="https://rodrigofrias.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Rodrigo Frías
            </a>
            <span className="footer-sep">·</span>
            v1.2026
            <span className="footer-sep">·</span>
            March 2026
          </p>
        </div>
      </div>
    </footer>
  );
}