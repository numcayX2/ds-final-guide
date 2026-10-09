import type { ReactNode } from "react";

export function Reveal({
  children,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "article";
  className?: string;
  delay?: number;
  scrollCrumble?: boolean;
  alt?: boolean;
}) {
  return <Tag className={className}>{children}</Tag>;
}
