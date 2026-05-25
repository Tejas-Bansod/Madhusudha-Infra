"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const savedTheme = localStorage.getItem("dashboard-theme") as Theme;
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
    } else {
      setThemeState("light");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("dashboard-theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prevent SSR flash / hydration mismatches by returning a default wrapper on server
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {}, setTheme: () => {} }}>
        <div className="light w-full h-full flex flex-col flex-1">
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={theme + " w-full h-full flex flex-col flex-1"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
