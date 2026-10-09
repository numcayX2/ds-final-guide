"use client";

import { useRef, useEffect, useState, type ElementType, type ReactNode } from "react";
import { motion, useScroll, useTransform, type HTMLMotionProps } from "motion/react";

interface ScrollFadedCrumbleProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  alt?: boolean;
  disabled?: boolean;
  className?: string;
  as?: ElementType;
}

/**
 * ScrollFadedCrumble
 *
 * Drives a tactile faded-crumble exit animation as the element scrolls out
 * of the top of the viewport.
 * - When in normal view: 100% visible, crisp, interactive.
 * - As it exits out the top: scales down, squashes vertically (scaleY), tilts,
 *   blurs, and fades out.
 * - Scrolling back down smoothly un-crumbles it back into place.
 * - Respects `prefers-reduced-motion: reduce`.
 */
export function ScrollFadedCrumble({
  children,
  alt = false,
  disabled = false,
  className = "",
  as: Tag = "div",
  ...props
}: ScrollFadedCrumbleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(media.matches);
    const listener = (e: MediaQueryListEvent) => setReduce(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Track the scroll exit window:
  // "start start": top of element reaches top of viewport (exit begins)
  // "end start": bottom of element reaches top of viewport (exit completes)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [1, 0.85, 0.35, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [1, 0.96, 0.91, 0.86], { clamp: true });
  const scaleY = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [1, 0.94, 0.86, 0.76], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [0, -8, -18, -28], { clamp: true });
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8, 1],
    [0, alt ? 0.7 : -0.7, alt ? -1.3 : 1.3, alt ? 1.8 : -1.8],
    { clamp: true }
  );
  const filter = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8, 1],
    ["blur(0px)", "blur(0.5px)", "blur(2px)", "blur(5px)"],
    { clamp: true }
  );

  if (disabled || reduce) {
    const TagComponent = Tag;
    return (
      <TagComponent className={className} {...props}>
        {children}
      </TagComponent>
    );
  }

  const Component = motion.create(Tag);

  return (
    <Component
      ref={ref}
      style={{
        opacity,
        scale,
        scaleY,
        y,
        rotate,
        filter,
        transformOrigin: "center bottom",
      }}
      className={`scroll-faded-crumble ${alt ? "scroll-faded-crumble-alt" : ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
