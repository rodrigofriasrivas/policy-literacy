export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "eplt-theme";
export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

export function readTheme(): Theme {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The current page still works when browser storage is unavailable.
  }
}

export function applyThemePreference(theme: Theme): void {
  // Phase 1 records the global preference without activating legacy .dark
  // tokens, which would change the existing appearance of some React routes.
  document.documentElement.dataset.theme = theme;
}

export function themeFromStorageEvent(event: StorageEvent): Theme | undefined {
  try {
    if (event.storageArea && event.storageArea !== window.localStorage) return;
  } catch {
    return;
  }
  if (event.key === null) return DEFAULT_THEME;
  if (event.key !== THEME_STORAGE_KEY) return;
  if (event.newValue === null) return DEFAULT_THEME;
  return isTheme(event.newValue) ? event.newValue : undefined;
}