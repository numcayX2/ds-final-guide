import type { Metadata } from "next";
import { Inter_Tight, Prompt } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

/* Inter Tight Variable - the single family Bhagas uses, for Latin + numerals */
const interTight = Inter_Tight({
  variable: "--f-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

/* Prompt (Cadson Demak) - geometric Thai that matches Inter Tight's tightness */
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
  'if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      data-theme="light"
      suppressHydrationWarning
      className={`${interTight.variable} ${prompt.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
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
      </body>
    </html>
  );
}
