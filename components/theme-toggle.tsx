"use client";

import { useEffect, useState } from "react";

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
      className="tap inline-flex items-center gap-3 text-left text-ink hover:text-accent-ink transition-colors duration-200"
      aria-pressed={theme === "dark"}
    >
      {/* The visible label is part of the accessible name. Overriding it with
          aria-label would hide "Dark"/"Light" from assistive tech while it stays
          visible on screen, so state is carried by aria-pressed instead. */}
      <span className="meta-label tracking-display">
        {ready ? (theme === "dark" ? "Light" : "Dark") : "Dark"}
      </span>
      {/* Decorative: the button already carries an accessible label */}
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false" fill="none">
        <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25" />
        <path d="M7 .75a6.25 6.25 0 0 0 0 12.5z" fill="currentColor" />
      </svg>
    </button>
  );
}