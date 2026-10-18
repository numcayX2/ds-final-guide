# Design — 10301351 Data Science Exam Guide

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
modern-minimal

## Macrostructure family
- Hub / Curriculum pages (`index.astro`): Bento Grid (asymmetric hero lead, prioritized Final Core L05–10 bento cards, compact L01–04 index)
- Interactive Labs & Diagnostic tools (`business-lab.astro`, `exam.astro`, `dashboard.astro`): Workbench (single containment layer, tactile controls, no card-in-card nesting, tabular telemetry)
- Derivation & Specimen pages (`formulas.astro`): Component Playground / Derivation Specimen (equation morphing stage, hairline parameter legend)

## Theme
- `--color-paper`:      oklch(99% 0.004 240)  /* #F8FAFC canvas */
- `--color-paper-2`:    oklch(97% 0.006 240)  /* #F1F5F9 card surface */
- `--color-paper-card`: #FFFFFF               /* Pure white base surface */
- `--color-ink`:        oklch(20% 0.02 260)   /* #0F172A deep navy text */
- `--color-ink-2`:      oklch(45% 0.02 250)   /* #475569 slate secondary */
- `--color-ink-muted`:  oklch(65% 0.015 250)  /* #94A3B8 muted tertiary */
- `--color-rule`:       oklch(90% 0.008 240)  /* #E2E8F0 hairline divider */
- `--color-accent`:     oklch(55% 0.16 250)   /* #2563EB academic cobalt (≤ 5% viewport) */
- `--color-accent-live`:oklch(75% 0.18 160)   /* #34D399 emerald dot with soft halo (live focus only) */
- `--color-focus`:      oklch(60% 0.15 250)   /* Instant focus outline */

## Typography
- Display: 'Space Grotesk', sans-serif, weight 600/700, tracking -0.02em
- Body: 'Google Sans Thai', 'Google Sans', sans-serif, weight 400/500/600
- Mono / Metrics: 'JetBrains Mono', monospace, tabular-nums
- Type scale anchor:
  - text-2xl: clamp(1.75rem, 3vw, 2.25rem)
  - text-xl:  clamp(1.35rem, 2.2vw, 1.65rem)
  - text-md:  1rem
  - text-sm:  0.875rem
  - text-xs:  0.75rem

## Spacing & Radius
- Controls / Buttons / Inputs: rounded-lg (8px)
- Containers / Panels: rounded-2xl (16px)
- Circular Indicators / Status Dots: rounded-full (strictly prohibited on wide action buttons)
- Spacing scale:
  - --space-3xs: 0.25rem; --space-2xs: 0.5rem; --space-xs: 0.75rem;
  - --space-sm: 1rem; --space-md: 1.5rem; --space-lg: 2rem;
  - --space-xl: 3rem; --space-2xl: 4.5rem;

## Motion & Transitions
- Easings: cubic-bezier(0.16, 1, 0.3, 1) named `--ease-out`
- Durations: `--dur-fast`: 150ms, `--dur-med`: 250ms
- Rule: Explicit property transitions only (`transition: color 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out`). Blanket `transition-all` is prohibited.
- Reduced-motion: opacity-only, instant or ≤ 150ms.

## Microinteractions Stance
- Instant focus rings: outline-2 outline-offset-2 outline-slate-900 (no fade-in)
- Hover affordances: explicit 1px translate or subtle border/color shift (no bouncy transforms)
- Numerical changes: font-variant-numeric: tabular-nums on all metrics, ratios, and timers
- Icons: Monochromatic inline SVGs (stroke 1.75px) — raw OS emojis are strictly prohibited

## CTA & Button Voice
- Primary Action: Solid navy (`#0F172A`), text-white, rounded-lg, font-mono or font-medium text-xs tracking-wide
- Secondary / Filter: White background, hairline border (`#E2E8F0`), hover:bg-slate-50, text-slate-700, rounded-lg
- Focus Mode Indicator: Status dot (`w-1.5 h-1.5 rounded-full`) + data-active driving CSS

## Per-page Allowances & Hierarchy
- Hub (`index.astro`): Asymmetric split hero; Bento grid separating L05–10 (Final Core) from L01–04 (Foundation Index); flat containment without nested cards.
- Workbench (`business-lab`, `exam`, `dashboard`): Single card containment layer; tactile input panels; clean status indicators; no uppercase mono pill eyebrows.
- Specimen (`formulas`): KaTeX animated morphing player with inline step indicator and parameter legend.

## Exports

### tokens.css
```css
/* Hallmark · genre: modern-minimal · design-system: design.md · designed-as-app */
:root {
  --color-paper: oklch(99% 0.004 240);
  --color-paper-2: oklch(97% 0.006 240);
  --color-paper-card: #FFFFFF;
  --color-ink: oklch(20% 0.02 260);
  --color-ink-2: oklch(45% 0.02 250);
  --color-ink-muted: oklch(65% 0.015 250);
  --color-rule: oklch(90% 0.008 240);
  --color-accent: oklch(55% 0.16 250);
  --color-accent-live: oklch(75% 0.18 160);
  --color-focus: oklch(60% 0.15 250);

  --font-display: 'Space Grotesk', -apple-system, sans-serif;
  --font-body: 'Google Sans Thai', 'Google Sans', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 150ms;
  --dur-med: 250ms;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;    /* 8px - controls */
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;     /* 16px - containers */
  --radius-dot: 9999px;  /* indicators only */
}
```
