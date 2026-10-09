"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";

/**
 * Faded-crumble exit animation variants for Framer Motion / Motion.dev.
 * Elements compress, rotate slightly, disperse blur, and fade downward.
 */
export const fadedCrumbleVariants = {
  initial: {
    opacity: 1,
    scale: 1,
    scaleY: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    scaleY: 0.86,
    y: 22,
    rotate: -1.4,
    filter: "blur(4px)",
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exitAlt: {
    opacity: 0,
    scale: 0.91,
    scaleY: 0.85,
    y: 24,
    rotate: 1.6,
    filter: "blur(4px)",
    transition: {
      duration: 0.34,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

interface FadedCrumbleProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  isExiting?: boolean;
  alt?: boolean;
  className?: string;
  as?: ElementType;
}

/**
 * Reusable wrapper that plays a physical faded-crumble exit animation
 * when isExiting is true.
 */
export function FadedCrumble({
  children,
  isExiting = false,
  alt = false,
  className = "",
  as: Tag = "div",
  ...props
}: FadedCrumbleProps) {
  const Component = motion.create(Tag);
  return (
    <Component
      initial="initial"
      animate={isExiting ? (alt ? "exitAlt" : "exit") : "initial"}
      variants={fadedCrumbleVariants}
      className={`faded-crumble ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export { ScrollFadedCrumble } from "./scroll-faded-crumble";
