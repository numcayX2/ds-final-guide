"use client";

import { useEffect, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";

type Theme = "light" | "dark";

const KEY = "ds-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    setTheme(attr === "dark" ? "dark" : "light");
    setReady(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: theme still applies for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle-control tap"
      aria-pressed={theme === "dark"}
    >
      <Flex align="center" gap="2">
        <Text size="1" weight="medium" className="meta-label text-xs hidden sm:inline">
          {ready ? (theme === "dark" ? "Light" : "Dark") : "Dark"}
        </Text>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false" fill="none">
          <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25" />
          <path d="M7 .75a6.25 6.25 0 0 0 0 12.5z" fill="currentColor" />
        </svg>
      </Flex>
    </button>
  );
}