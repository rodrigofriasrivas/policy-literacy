import { Link } from "react-router-dom";
import durhamLogo from "@/assets/durham_logo_white_720_300_rodrigo_frias.png";

export function SiteFooter() {
  return (
    <footer className="site-footer px-8 py-8">
      {/* Row 1: Three-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] items-start gap-10 max-w-[1100px] mx-auto">
        {/* Col 1: Logo */}
        <div>
          <img
            src={durhamLogo}
            alt="Durham University"
            className="w-[130px] h-auto opacity-85" />

        </div>

        {/* Col 2: Disclaimer + data sources + version */}
        <div className="space-y-2">
          <p className="text-xs text-white/55 leading-relaxed m-0">
            This artefact maps the research landscape; it does not evaluate, rank, or recommend evidence.
          </p>
          <Link
            to="/about#data-sources"
            className="text-xs text-white/75 hover:text-[hsl(185_70%_55%)] transition-colors no-underline block">

            Data sources
          </Link>
          <p className="text-[11px] text-white/40 m-0">
            Version: v1.2025 · Last updated: Feb 2026
          </p>
        </div>

        {/* Col 3: Mini nav */}
        <nav className="space-y-2 md:text-right">
          <a href="/artefact/index.html" className="block text-xs text-white/60 hover:text-[hsl(185_70%_55%)] transition-colors no-underline">
            Network visualisation
          </a>
          <Link to="/about" className="block text-xs text-white/60 hover:text-[hsl(185_70%_55%)] transition-colors no-underline">
            About the project
          </Link>
          <Link to="/policy" className="block text-xs text-white/60 hover:text-[hsl(185_70%_55%)] transition-colors no-underline">
            Policy engagement
          </Link>
          <Link to="/contact" className="block text-xs text-white/60 hover:text-[hsl(185_70%_55%)] transition-colors no-underline">
            Contact
          </Link>
        </nav>
      </div>

      {/* Row 2: Copyright below the grid */}
      <p className="text-white/55 mt-6 pt-4 border-t border-white/[0.06] text-sm text-center">
        Research, design and programming by ©{" "}
        <a
          href="https://rodrigofrias.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/75 hover:text-[hsl(185_70%_55%)] transition-colors no-underline">

          Rodrigo Frías
        </a>
        .
      </p>
    </footer>);

}