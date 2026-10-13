"use client";

import { useEffect, useState } from "react";

export interface ToolNavProps {
  tools: {
    id: string;
    name: string;
    lectures: string;
  }[];
}

export function ToolsNav({ tools }: ToolNavProps) {
  const [activeId, setActiveId] = useState<string>(tools[0]?.id ?? "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerOffset = 140; // sticky header + nav offset

      for (let i = tools.length - 1; i >= 0; i--) {
        const el = document.getElementById(tools[i].id);
        if (el && el.offsetTop - headerOffset <= scrollY) {
          setActiveId(tools[i].id);
          return;
        }
      }
      if (tools.length > 0) {
        setActiveId(tools[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tools]);

  return (
    <nav
      aria-label="เครื่องคิดเลขทั้งหมด"
      className="sticky top-14 z-30 border-y border-rule bg-paper/95 py-2.5 backdrop-blur mt-8 -mx-4 px-4 sm:mx-0 sm:px-3 sm:rounded-xl sm:border"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink-subtle mr-1 hidden sm:inline">
          ข้ามไปยัง:
        </span>
        {tools.map((t, i) => {
          const isActive = activeId === t.id;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "border border-accent bg-accent-wash text-accent-ink shadow-xs"
                  : "border border-rule bg-surface text-ink-muted hover:border-rule-strong hover:text-ink"
              }`}
            >
              <span className="font-mono text-ink-subtle mr-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t.name}
              <span className="ml-1 text-[11px] text-ink-subtle font-mono hidden md:inline">
                ({t.lectures})
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
