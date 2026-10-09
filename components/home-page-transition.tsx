"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export function HomePageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [reduce, setReduce] = useState(false);
  const exitingRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(media.matches);
    const listener = (e: MediaQueryListEvent) => setReduce(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const triggerExit = useCallback(
    (href: string) => {
      if (exitingRef.current) return;
      if (reduce) {
        router.push(href);
        return;
      }
      exitingRef.current = true;
      setIsExiting(true);
      setTimeout(() => {
        router.push(href);
      }, 320);
    },
    [router, reduce]
  );

  // Listen for navigation dispatched from global navbar when on home page
  useEffect(() => {
    const handleGlobalExit = (e: Event) => {
      const customEvent = e as CustomEvent<{ href: string }>;
      const href = customEvent.detail?.href;
      if (!href || href === "/" || href.startsWith("#")) return;
      triggerExit(href);
    };

    window.addEventListener("home-exit-navigation", handleGlobalExit);
    return () => window.removeEventListener("home-exit-navigation", handleGlobalExit);
  }, [triggerExit]);

  // Intercept clicks on links inside the home page
  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external URLs, protocols, target="_blank", modifier keys, or same-page anchors
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.getAttribute("target") === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        href === "/" ||
        href.startsWith("#")
      ) {
        return;
      }

      e.preventDefault();
      triggerExit(href);
    },
    [triggerExit]
  );

  return (
    <motion.main
      id="main"
      tabIndex={-1}
      onClick={handleContainerClick}
      initial={{ opacity: 0, y: 16 }}
      animate={
        isExiting
          ? {
              opacity: 0,
              y: 24,
              scale: 0.92,
              scaleY: 0.86,
              rotate: -1.2,
              filter: "blur(5px)",
              transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
            }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              scaleY: 1,
              rotate: 0,
              filter: "blur(0px)",
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }
      }
      className={`flex-1 ${isExiting ? "pointer-events-none is-crumbling" : ""}`}
    >
      {children}
    </motion.main>
  );
}
