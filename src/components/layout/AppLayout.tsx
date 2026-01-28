import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Field Overview" },
  { path: "/temporal", label: "Temporal Evolution" },
  { path: "/topic", label: "Topic Exploration" },
  { path: "/papers", label: "Papers" },
];

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-xl font-normal tracking-tight text-foreground">
            Enterprise Policy Literacy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            A research artefact for navigating entrepreneurship policy scholarship
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "inline-block px-4 py-3 text-sm transition-colors",
                    "hover:text-foreground",
                    location.pathname === item.path
                      ? "text-foreground border-b-2 border-foreground -mb-px"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-muted-foreground">
            This artefact maps the structure and evolution of entrepreneurship policy research.
            It does not evaluate, rank, or recommend.
          </p>
        </div>
      </footer>
    </div>
  );
}
