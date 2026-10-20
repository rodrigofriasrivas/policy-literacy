import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ onDarkSurface = false }: { onDarkSurface?: boolean }) {
  const { theme, setTheme } = useTheme();
  const label = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={onDarkSurface ? "theme-toggle-dark-surface" : "shrink-0"}
      aria-label={label}
      title={label}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}