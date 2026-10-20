import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyThemePreference, readTheme } from "@/lib/themePreference";

applyThemePreference(readTheme());
const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
