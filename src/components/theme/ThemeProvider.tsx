import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { applyThemePreference, readTheme, saveTheme, themeFromStorageEvent, type Theme } from "@/lib/themePreference";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, updateTheme] = useState<Theme>(readTheme);

  const setTheme = useCallback((nextTheme: Theme) => {
    applyThemePreference(nextTheme);
    updateTheme(nextTheme);
    saveTheme(nextTheme);
  }, []);

  useEffect(() => {
    const synchronise = (event: StorageEvent) => {
      const nextTheme = themeFromStorageEvent(event);
      if (!nextTheme) return;
      applyThemePreference(nextTheme);
      updateTheme(nextTheme);
    };
    window.addEventListener("storage", synchronise);
    // Re-read after subscribing so a change during mounting is not missed.
    const currentTheme = readTheme();
    applyThemePreference(currentTheme);
    updateTheme(currentTheme);
    return () => window.removeEventListener("storage", synchronise);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}