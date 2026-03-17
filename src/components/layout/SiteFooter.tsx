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
        <p className="footer-content">
          <em className="footer-disclaimer">
            This artefact maps the research landscape; it does not evaluate, rank, or recommend evidence.
          </em>
          <span className="footer-sep">·</span>
          <Link to="/about#data-sources" className="footer-link">Data sources</Link>
          <span className="footer-sep">·</span>
          <span>Version: v1.2025</span>
          <span className="footer-sep">·</span>
          <span>Last updated: Feb 2026</span>
          <span className="footer-sep">·</span>
          <span>
            ©{" "}
            <a
              href="https://rodrigofrias.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Rodrigo Frías
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}