import type { Metadata } from "next";
import { Inter_Tight, Prompt } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site-header";

/* SF Pro substitute: Inter Tight Variable for Latin + numerals with negative tracking */
const interTight = Inter_Tight({
  variable: "--f-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

/* Prompt (Cadson Demak) - geometric Thai typography */
const prompt = Prompt({
  variable: "--f-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "คู่มือเตรียมสอบ Final | 10301351 Data Science",
  description:
    "คู่มือเตรียมสอบ Final วิชา 10301351 Data Science ครอบคลุม Lect 05-09",
};

/* Resolve the theme before first paint so there is no flash of the wrong palette. */
const THEME_BOOT =
  '(function(){try{var t=localStorage.getItem("ds-theme");' +
  'if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);' +
  'document.documentElement.classList.toggle("dark",t==="dark");}}catch(e){}})();';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${interTight.variable} ${prompt.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Theme
          accentColor="orange"
          grayColor="sand"
          radius="medium"
          scaling="100%"
          appearance="inherit"
        >
          {/* First focusable element in the document: lets a keyboard user jump
              straight past the nav to the page content. Every page renders
              exactly one <main id="main">. */}
          <a href="#main" className="skip-link">
            ข้ามไปยังเนื้อหาหลัก
          </a>
          <div className="page-container">
            <SiteHeader />
            {children}
          </div>
        </Theme>
      </body>
    </html>
  );
}
