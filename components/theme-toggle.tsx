"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const KEY = "ds-theme";

function subscribe(callback: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(callback);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
      aria-pressed={isDark}
      aria-label={`สลับเป็นโหมด${isDark ? "สว่าง" : "มืด"}`}
      title={`สลับเป็นโหมด${isDark ? "สว่าง" : "มืด"}`}
      className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
    >
      <MoonIcon className="h-4 w-4 dark:hidden" aria-hidden />
      <SunIcon className="hidden h-4 w-4 dark:block" aria-hidden />
    </button>
  );
}
