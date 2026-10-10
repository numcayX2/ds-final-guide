"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/chapters", label: "บทเรียน", desc: "สรุปเนื้อหา Lect 05–09" },
  { href: "/formulas", label: "คลังสูตร", desc: "สูตร ตัวอย่าง และจุดที่มักผิด" },
  { href: "/player", label: "Thinking Player", desc: "ดูวิธีคิดทีละขั้น" },
  { href: "/tools", label: "เครื่องคิดเลข", desc: "Tukey, Confusion Matrix, Gini, K-Means" },
  { href: "/homework", label: "เฉลยการบ้าน", desc: "วิธีคิดทุกขั้นของการบ้าน" },
  { href: "/mock-test", label: "ข้อสอบจำลอง", desc: "โหมดฝึก และโหมดจับเวลา" },
] as const;

const MOBILE_NAV = [{ href: "/", label: "หน้าแรก", desc: "แผนทบทวน 3 วัน" }, ...NAV];

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is "open on this path": navigating anywhere closes it, no effect needed.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const activeItem = NAV.find((item) => isActive(item.href));
  const targetHref = hoveredHref ?? activeItem?.href ?? null;

  useEffect(() => {
    const navList = navListRef.current;
    if (!navList || !targetHref) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const targetEl = itemRefs.current.get(targetHref);
    if (!targetEl) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const navRect = navList.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    setIndicatorStyle({
      left: targetRect.left - navRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  }, [targetHref, pathname]);
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-5xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-semibold tracking-tight text-ink">DS Final Guide</span>
          <span className="hidden font-mono text-xs text-ink-subtle sm:inline">10301351</span>
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden lg:block">
          <ul
            ref={navListRef}
            onMouseLeave={() => setHoveredHref(null)}
            className="relative flex items-center gap-0.5"
          >
            {/* Sliding background highlight */}
            <li
              aria-hidden="true"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              className="pointer-events-none absolute inset-y-0 left-0 rounded-md bg-rule/80 transition-[transform,width,opacity] duration-200 ease-out"
            />

            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.href, el);
                    else itemRefs.current.delete(item.href);
                  }}
                  onMouseEnter={() => setHoveredHref(item.href)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 block rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150 ${
                      active ? "font-semibold text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-hover lg:hidden"
          >
            {open ? <Cross2Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="เมนูหลัก" className="border-t border-rule bg-paper lg:hidden">
          <ul className="mx-auto w-full max-w-5xl px-3 py-2 sm:px-6">
            {MOBILE_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenOn(null)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline justify-between gap-4 rounded-lg px-3 py-3 transition-colors ${
                      active ? "bg-surface-hover" : "hover:bg-surface-hover"
                    }`}
                  >
                    <span className={active ? "font-semibold text-ink" : "text-ink"}>{item.label}</span>
                    <span className="truncate text-xs text-ink-subtle">{item.desc}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
