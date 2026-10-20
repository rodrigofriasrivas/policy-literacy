import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { ThemeProvider, useTheme } from "@/components/theme/ThemeProvider";
import { DEFAULT_THEME, THEME_STORAGE_KEY, readTheme, themeFromStorageEvent } from "@/lib/themePreference";

function Probe() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme}</button>;
}

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.body.classList.remove("theme-light");
});

describe("global theme preference", () => {
  it("defaults to dark, including invalid saved preferences", () => {
    expect(DEFAULT_THEME).toBe("dark");
    expect(readTheme()).toBe("dark");
    localStorage.setItem(THEME_STORAGE_KEY, "system");
    expect(readTheme()).toBe("dark");
  });

  it("updates React state directly and persists without dispatching storage events", () => {
    const dispatch = vi.spyOn(window, "dispatchEvent");
    render(<ThemeProvider><Probe /></ThemeProvider>);
    act(() => screen.getByRole("button").click());
    expect(screen.getByRole("button").textContent).toBe("light");
    expect(localStorage.getItem("eplt-theme")).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(dispatch.mock.calls.some(([event]) => event.type === "storage")).toBe(false);
  });

  it("restores the preference after remounting", () => {
    const first = render(<ThemeProvider><Probe /></ThemeProvider>);
    act(() => screen.getByRole("button").click());
    first.unmount();
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(screen.getByRole("button").textContent).toBe("light");
  });

  it("handles native storage events without writing them back", () => {
    render(<ThemeProvider><Probe /></ThemeProvider>);
    const write = vi.spyOn(Storage.prototype, "setItem");
    // A synthetic event is used only to simulate a browser event in this test.
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: "eplt-theme", newValue: "light", storageArea: localStorage })));
    expect(screen.getByRole("button").textContent).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(write).not.toHaveBeenCalled();
  });

  it("ignores other keys and invalid values and resets removed preferences to dark", () => {
    expect(themeFromStorageEvent(new StorageEvent("storage", { key: "other", newValue: "light" }))).toBeUndefined();
    expect(themeFromStorageEvent(new StorageEvent("storage", { key: "eplt-theme", newValue: "invalid" }))).toBeUndefined();
    expect(themeFromStorageEvent(new StorageEvent("storage", { key: "eplt-theme", newValue: null }))).toBe("dark");
    expect(themeFromStorageEvent(new StorageEvent("storage", { key: null }))).toBe("dark");
    expect(themeFromStorageEvent(new StorageEvent("storage", { key: "eplt-theme", newValue: "light", storageArea: sessionStorage }))).toBeUndefined();
  });

  it("keeps in-page updates working when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    render(<ThemeProvider><Probe /></ThemeProvider>);
    act(() => screen.getByRole("button").click());
    expect(screen.getByRole("button").textContent).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("does not activate legacy React dark-token overrides", () => {
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});

describe("standalone artefact bridge", () => {
  it("uses the same key, applies saved light mode, and updates locally without synthetic events", () => {
    localStorage.setItem("eplt-theme", "light");
    const dispatch = vi.spyOn(window, "dispatchEvent");
    // Evaluate the exact served bridge, not a second implementation.
    const bridge = readFileSync("public/theme-preference.js", "utf8");
    window.eval(bridge);
    const api = (window as unknown as { EpltTheme: { read(): string; set(theme: string): void } }).EpltTheme;
    expect(api.read()).toBe("light");
    expect(document.body.classList.contains("theme-light")).toBe(true);
    api.set("dark");
    expect(localStorage.getItem("eplt-theme")).toBe("dark");
    expect(document.body.classList.contains("theme-light")).toBe(false);
    expect(dispatch).not.toHaveBeenCalled();
  });
});