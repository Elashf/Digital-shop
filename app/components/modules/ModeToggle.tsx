"use client";

import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="absolute right-0 top-2 m-2"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}