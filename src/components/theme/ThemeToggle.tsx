import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ onDarkSurface = false }: { onDarkSurface?: boolean }) {
  const { theme, setTheme } = useTheme();
  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value === "light" || value === "dark") setTheme(value);
      }}
      aria-label="Colour theme"
      className={`theme-selector ${onDarkSurface ? "theme-selector-on-dark" : ""}`}
    >
      <ToggleGroupItem value="light" aria-label="Light Mode" className="theme-selector-option">
        <Sun aria-hidden="true" size={15} /> Light
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark Mode" className="theme-selector-option">
        <Moon aria-hidden="true" size={15} /> Dark
      </ToggleGroupItem>
    </ToggleGroup>
  );
}