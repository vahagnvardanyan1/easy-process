"use client";

import { useCallback, useState } from "react";

type ThemeMode = "dark" | "light";

const getInitialThemeMode = (): ThemeMode => {
  if (typeof document === "undefined") return "dark";
  const current = document.documentElement.dataset.theme;
  return current === "dark" || current === "light" ? current : "dark";
};

export const useThemeMode = () => {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialThemeMode());

  const setThemeMode = useCallback(({ mode: nextMode }: { mode: ThemeMode }) => {
    setMode(nextMode);
    document.documentElement.classList.toggle("dark", nextMode === "dark");
    document.documentElement.dataset.theme = nextMode;
    try {
      localStorage.setItem("theme", nextMode);
    } catch {
      // ignore
    }
  }, []);

  const toggleThemeMode = useCallback(() => {
    setThemeMode({ mode: mode === "dark" ? "light" : "dark" });
  }, [mode, setThemeMode]);

  return { mode, setThemeMode, toggleThemeMode };
};


