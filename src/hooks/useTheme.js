import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    setTheme(saved);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (value) => {
      if (value === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(isDark ? "dark" : "light");
    } else {
      applyTheme(theme);
    }

    // Jika "system", dengarkan perubahan preferensi OS
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      if (theme === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [theme]);

  const toggleTheme = (value) => {
    localStorage.setItem("theme", value);
    setTheme(value);
  };

  return { theme, toggleTheme };
};
