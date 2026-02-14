import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

interface HomeLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function HomeLayout({ children, showFooter = true }: HomeLayoutProps) {
  return (
    <div className="home-page min-h-screen flex flex-col">
      {/* Transparent Header */}
      <SiteHeader variant="transparent" />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="home-footer">
          <span>Research project developed by Rodrigo Frías, Durham University Business School [v1.2025]</span>
          <span className="block text-xs mt-1 opacity-70">
            The dashboard is an interactive research artefact hosted separately at{" "}
            <a href="/artefact/index.html" className="underline">/artefact/index.html</a>.
          </span>
        </footer>
      )}
    </div>
  );
}
