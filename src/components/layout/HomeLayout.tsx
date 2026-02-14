import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

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
      {showFooter && <SiteFooter />}
    </div>
  );
}
