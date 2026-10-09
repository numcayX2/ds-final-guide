"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const KEY = "ds-theme";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: applies for this session only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="สลับโหมดสว่าง / มืด"
      title="สลับโหมดสว่าง / มืด"
      className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
    >
      <MoonIcon className="h-4 w-4 dark:hidden" aria-hidden />
      <SunIcon className="hidden h-4 w-4 dark:block" aria-hidden />
    </button>
  );
}
