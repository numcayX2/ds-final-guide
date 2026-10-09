"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
/**
 * Scroll-triggered reveal powered by motion.dev.
 * Under prefers-reduced-motion, render static content without
 * opacity or transform styles so offscreen content is never hidden.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(media.matches);
    const listener = (e: MediaQueryListEvent) => setReduce(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }
  const Component = motion.create(Tag);

  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`reveal-motion ${className}`}
    >
      {children}
    </Component>
  );
}