import { ReactNode } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { path: "/evidence", label: "Explore the Data" },
  { path: "/about", label: "About the project" },
  { path: "/policy", label: "Policy engagement" },
  { path: "/contact", label: "Contact" },
];

interface HomeLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function HomeLayout({ children, showFooter = true }: HomeLayoutProps) {
  return (
    <div className="home-page min-h-screen flex flex-col">
      {/* Transparent Header */}
      <header className="transparent-header">
        <nav className="home-nav">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="home-footer">
          Research project developed by Rodrigo Frías, Durham University Business School [v1.2025]
        </footer>
      )}
    </div>
  );
}
