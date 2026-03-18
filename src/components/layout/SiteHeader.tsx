import { useState } from "react";
import { NavLink as RouterNavLink, Link, useLocation } from "react-router-dom";

const homepageNavItems = [
  { path: "/about", label: "About the project", external: false },
  { path: "/contact", label: "Contact", external: false },
];

const interiorNavItems = [
  { path: "/artefact/index.html", label: "Network visualisation", external: true },
  { path: "/about", label: "About the project", external: false },
  { path: "/contact", label: "Contact", external: false },
];

interface SiteHeaderProps {
  variant?: "transparent" | "solid";
}

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderNavLink = (item: typeof navItems[0], onClick?: () => void) =>
    item.external ? (
      <a key={item.path} href={item.path} onClick={onClick}>
        {item.label}
      </a>
    ) : (
      <RouterNavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={onClick}
      >
        {item.label}
      </RouterNavLink>
    );

  if (variant === "transparent") {
    return (
      <header className="transparent-header">
        <Link to="/" className="home-brand">
          Enterprise Policy Literacy Tool
        </Link>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-icon ${menuOpen ? "hamburger-open" : ""}`} />
        </button>
        <nav className={`home-nav ${menuOpen ? "mobile-menu-open" : ""}`}>
          {navItems.map((item) => renderNavLink(item, () => setMenuOpen(false)))}
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
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <RouterNavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`
                  }
                >
                  {item.label}
                </RouterNavLink>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
