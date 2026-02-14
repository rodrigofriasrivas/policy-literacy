import { Link } from "react-router-dom";

const navItems = [
  { path: "/about", label: "About the project" },
  { path: "/policy", label: "Policy engagement" },
  { path: "/contact", label: "Contact" },
  { path: "/artefact/index.html", label: "Explore the Data" },
];

interface SiteHeaderProps {
  variant?: "transparent" | "solid";
}

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  if (variant === "transparent") {
    return (
      <header className="transparent-header">
        <nav className="home-nav">
        {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="block">
            <h1 className="text-xl font-normal tracking-tight text-foreground">
              Enterprise Policy Literacy
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              A research artefact for navigating entrepreneurship policy scholarship
            </p>
          </Link>
          <nav className="flex gap-6">
          {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
