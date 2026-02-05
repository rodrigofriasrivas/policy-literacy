import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SiteHeader } from "./SiteHeader";

const dashboardTabs = [
  { path: "/evidence/topic", label: "Evidence" },
  { path: "/evidence/field", label: "Field overview" },
  { path: "/evidence/papers", label: "Papers" },
  { path: "/evidence/temporal", label: "Temporal evolution" },
  { path: "/evidence/experimental", label: "Experimental view" },
];

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    // Handle prefix match for nested routes
    if (path === "/evidence/topic") {
      return location.pathname.startsWith("/evidence/topic");
    }
    if (path === "/evidence/papers") {
      return location.pathname.startsWith("/evidence/papers");
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Site Header */}
      <SiteHeader variant="solid" />

      {/* Dashboard Sub-Navigation */}
      <nav className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex gap-1">
            {dashboardTabs.map((tab) => (
              <li key={tab.path}>
                <Link
                  to={tab.path}
                  className={cn(
                    "inline-block px-4 py-3 text-sm transition-colors",
                    "hover:text-foreground",
                    isActive(tab.path)
                      ? "text-foreground border-b-2 border-foreground -mb-px font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {tab.label}
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
