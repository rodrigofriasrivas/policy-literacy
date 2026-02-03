import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const evidenceTabs = [
  { path: "/evidence", label: "Evidence", exact: true },
  { path: "/evidence/field", label: "Field overview" },
  { path: "/evidence/papers", label: "Papers" },
  { path: "/evidence/temporal", label: "Temporal evolution" },
  { path: "/evidence/topic", label: "Topic exploration" },
];

export default function EvidencePage() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <nav className="border-b border-border">
        <ul className="flex gap-1">
          {evidenceTabs.map((tab) => {
            const isActive = tab.exact 
              ? location.pathname === tab.path
              : location.pathname.startsWith(tab.path);
            
            return (
              <li key={tab.path}>
                <Link
                  to={tab.path}
                  className={cn(
                    "inline-block px-4 py-3 text-sm transition-colors",
                    "hover:text-foreground",
                    isActive
                      ? "text-foreground border-b-2 border-foreground -mb-px font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Helper text */}
      <div className="text-sm text-muted-foreground">
        <p>
          Topics ordered by cumulative weight across the corpus. 
          Select a topic to explore its structure.
        </p>
      </div>

      {/* Placeholder content */}
      <div className="border border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground">
          Dashboard content — coming soon
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Select a tab above to explore different views of the evidence.
        </p>
      </div>
    </div>
  );
}
