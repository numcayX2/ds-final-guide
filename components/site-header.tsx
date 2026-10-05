import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/", label: "หน้าแรก", labelEn: "Index" },
  { href: "/chapters", label: "บทเรียน", labelEn: "Chapters" },
  { href: "/formulas", label: "คลังสูตร", labelEn: "Formulas" },
  { href: "/player", label: "Thinking Player", labelEn: "Player" },
  { href: "/tools", label: "เครื่องคิดเลข", labelEn: "Tools" },
];

export function SiteHeader() {
  return (
    <header className="shell sticky top-0 z-50 border-b border-rule bg-bg">
      <div className="site-header__row flex items-center justify-between py-5">
        <Link
          href="/"
          className="tap inline-flex items-baseline gap-3 hover:text-accent-ink transition-colors duration-200"
        >
          <span className="index text-lg">10301351</span>
          <span className="meta-label tracking-display text-ink-muted hidden sm:inline">
            Data Science
          </span>
        </Link>

        <nav
          aria-label="หน้าหลัก"
          className="site-header__nav flex items-center gap-4 sm:gap-6"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tap inline-flex items-baseline gap-2 hover:text-accent-ink transition-colors duration-200"
            >
              <span className="line-mask tracking-display text-sm">{item.label}</span>
              <span className="text-ink-subtle text-xs hidden md:inline">{item.labelEn}</span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}