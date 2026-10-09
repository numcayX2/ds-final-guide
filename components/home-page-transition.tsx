import type { ReactNode } from "react";

/** Plain main landmark with a quick fade-in. No click hijacking, no delayed navigation. */
export function HomePageTransition({ children }: { children: ReactNode }) {
  return (
    <main id="main" tabIndex={-1} className="page-in flex-1 focus:outline-none">
      {children}
    </main>
  );
}
