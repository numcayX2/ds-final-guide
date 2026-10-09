"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookmarkIcon,
  SymbolIcon,
  PlayIcon,
  CheckCircledIcon,
  Pencil2Icon,
  MixerHorizontalIcon,
  HamburgerMenuIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  {
    href: "/",
    label: "หน้าแรก",
    labelEn: "Index",
    desc: "ภาพรวมคู่มือ & Roadmap 3 วัน",
    icon: HomeIcon,
  },
  {
    href: "/chapters",
    label: "บทเรียน",
    labelEn: "Chapters",
    desc: "Lect 05-09 สรุปเข้ม 5 หัวข้อ",
    icon: BookmarkIcon,
  },
  {
    href: "/formulas",
    label: "คลังสูตร",
    labelEn: "Formulas",
    desc: "15 สูตรคำนวณและจุดลวงข้อสอบ",
    icon: SymbolIcon,
  },
  {
    href: "/player",
    label: "Thinking Player",
    labelEn: "Player",
    desc: "Interactive Step-by-Step 6 ตอน",
    icon: PlayIcon,
  },
  {
    href: "/mock-test",
    label: "Mock Test",
    labelEn: "Mock",
    desc: "จำลองข้อสอบ 4 ชุด พร้อมโหมดฝึก",
    icon: CheckCircledIcon,
  },
  {
    href: "/homework",
    label: "การบ้าน",
    labelEn: "Homework",
    desc: "เฉลยวิธีคิดละเอียด HW02-04",
    icon: Pencil2Icon,
  },
  {
    href: "/tools",
    label: "เครื่องคิดเลข",
    labelEn: "Tools",
    desc: "4 เครื่องมือคำนวณสดในห้องสอบ",
    icon: MixerHorizontalIcon,
  },
];

const DESKTOP_NAV_ITEMS = NAV_ITEMS.filter(
  (item) => item.href !== "/mock-test" && item.href !== "/tools",
);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Track scroll position for dynamic glassmorphic elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      if (
        pathname === "/" &&
        href !== "/" &&
        !href.startsWith("#") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent("home-exit-navigation", { detail: { href } })
        );
      }
    },
    [pathname]
  );

  const currentItem = NAV_ITEMS.find((item) => isActive(item.href)) || NAV_ITEMS[0];

  return (
    <>
      {/* Mobile background backdrop dismiss */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/15 backdrop-blur-[2px] xl:hidden"
          onClick={() => {
            setMobileOpen(false);
            mobileMenuButtonRef.current?.focus();
          }}
          aria-hidden="true"
        />
      )}

      <header className="floating-nav-wrapper">
        <div className={`floating-nav-pill ${scrolled ? "is-scrolled" : ""}`}>
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 hover:opacity-95 transition-opacity shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-ink text-bg font-bold text-xs flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 active:scale-95 font-mono">
              DS
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-ink leading-tight">
                  Final Guide
                </span>
                <span className="hidden sm:inline text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent-ink border border-accent/25">
                  10301351
                </span>
              </div>
              <span className="text-[10px] text-ink-muted hidden sm:inline -mt-0.5 font-medium leading-tight">
                Data Science Exam Prep
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Centered Glass Pill Segment) */}
          <nav
            aria-label="เมนูหลัก"
            className="floating-nav-links hidden xl:flex items-center gap-1"
          >
            {DESKTOP_NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`floating-nav-link ${
                    active ? "is-active" : ""
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Current Page Chip (Mobile), ThemeToggle, Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop CTA pair — ghost + solid, Frontify-style */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link
                href="/tools"
                onClick={(e) => handleNavClick(e, "/tools")}
                aria-current={isActive("/tools") ? "page" : undefined}
                className="inline-flex items-center rounded-full border border-rule-strong px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                เครื่องคิดเลข
              </Link>
              <Link
                href="/mock-test"
                onClick={(e) => handleNavClick(e, "/mock-test")}
                aria-current={isActive("/mock-test") ? "page" : undefined}
                className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent-ink"
              >
                ทำ Mock Test
              </Link>
            </div>
            <span className="xl:hidden text-[11px] font-medium text-ink-muted bg-surface-hover/80 px-2.5 py-1 rounded-full border border-rule/40 max-w-[110px] sm:max-w-[140px] truncate">
              {currentItem.label}
            </span>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              ref={mobileMenuButtonRef}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="xl:hidden w-11 h-11 rounded-full hover:bg-surface-hover active:bg-surface-hover/90 text-ink transition-colors cursor-pointer border border-transparent hover:border-rule/60 flex items-center justify-center"
              aria-label={mobileOpen ? "ปิดเมนูการนำทาง" : "เปิดเมนูการนำทาง"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? (
                <Cross2Icon className="w-4 h-4" />
              ) : (
                <HamburgerMenuIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Glass Panel */}
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            aria-label="เมนูหลักบนมือถือ"
            className="floating-nav-dropdown mt-2 xl:hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3 p-2.5 rounded-xl transition-[background-color,color,transform] duration-200 ease-out motion-reduce:transition-none ${
                      active
                        ? "bg-ink text-bg font-semibold shadow-xs"
                        : "text-ink hover:bg-surface-hover/80"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        active
                          ? "bg-bg/20 text-bg"
                          : "bg-surface-raised border border-rule/60 text-ink-muted group-hover:text-ink"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">
                          {item.label}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider ${
                            active ? "text-bg/80" : "text-ink-subtle"
                          }`}
                        >
                          {item.labelEn}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] truncate ${
                          active ? "text-bg/80" : "text-ink-muted"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick footer bar in mobile dropdown */}
            <div className="mt-2 pt-2 border-t border-rule/60 flex items-center justify-between px-2 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-accent" />
                10301351 Data Science Final
              </span>
              <Link
                href="/mock-test"
                onClick={(e) => {
                  setMobileOpen(false);
                  handleNavClick(e, "/mock-test");
                }}
              >
                ทำ Mock Test ด่วน &rarr;
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
