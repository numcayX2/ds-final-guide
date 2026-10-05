import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/", label: "หน้าแรก", labelEn: "Index" },
  { href: "/chapters", label: "บทเรียน", labelEn: "Chapters" },
  { href: "/formulas", label: "คลังสูตร", labelEn: "Formulas" },
  { href: "/player", label: "Thinking Player", labelEn: "Player" },
  { href: "/mock-test", label: "Mock Test", labelEn: "Mock" },
  { href: "/homework", label: "การบ้าน", labelEn: "Homework" },
  { href: "/tools", label: "เครื่องคิดเลข", labelEn: "Tools" },
];

export function SiteHeader() {
  return (
    <header className="shell sticky top-0 z-50 border-b border-rule bg-bg/85 backdrop-blur-md">
      <div className="site-header__row flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="tap inline-flex items-baseline gap-3 hover:text-accent-ink transition-colors duration-200"
          >
            <span className="index text-xl font-bold tracking-tight text-accent-ink">
              10301351
            </span>
            <span className="meta-label tracking-display text-ink-muted hidden sm:inline text-sm font-mono">
              DATA_SCIENCE
            </span>
          </Link>

          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase border border-rule-strong/40 bg-accent-wash/30 text-accent-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-accent cyber-beacon" />
            SYS.ACTIVE // FINAL_GUIDE
          </span>
        </div>

        <nav
          aria-label="หน้าหลัก"
          className="site-header__nav flex items-center gap-3 sm:gap-5"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tap inline-flex items-baseline gap-1.5 hover:text-accent-ink transition-colors duration-200"
            >
              <span className="line-mask tracking-display text-sm font-medium">{item.label}</span>
              <span className="text-ink-subtle text-[11px] font-mono hidden xl:inline">
                {item.labelEn}
              </span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}