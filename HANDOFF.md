# HANDOFF — 10301351 Data Science Final Exam Guide

Written by Hermes Agent, 2026-10-05. Handing over to Gemini.
Read this file completely before touching anything.
Last updated: 2026-10-06 (post-session: +6 commits since the OMP version).

---

## 1. What this project is

A Thai-language web study guide for the 10301351 Data Science final exam,
covering Lecture 05 to Lecture 09 only.

The hard rule that governs this entire codebase:

> **No number reaches the UI unless it was verified against the lecture slides.**
> Unverified content is either omitted or shipped with an explicit
> `needs-slide-check` flag the user can see.

This is not stylistic. Several blueprint figures were wrong, and several
figures were read from image-only slides that could not be extracted. The
verification field in `content/types.ts` exists to make guessing structurally
impossible.

---

## 2. Location and stack

```
E:\Code_projects\ds-final-guide
```

| Piece | Version |
|---|---|
| Next.js | 16.3.8 (App Router, Turbopack) |
| React | 19.2.8 |
| Tailwind | v4 |
| TypeScript | 5 |
| GSAP | 3.15 (installed, not yet used) |
| Lenis | 1.3.26 (installed, not yet used) |

Node v26.7.0 · npm 11.19.0 · git repo, 14 commits at last update.
Working tree is DIRTY (uncommitted): `app/globals.css` + `components/calculators.tsx`
(see §6 — the `--rule` decorative/control split). Commit or stash before big moves.

```bash
cd E:/Code_projects/ds-final-guide
npm install
npm run dev      # http://localhost:3000
npm run build    # must stay green
npx tsc --noEmit -p tsconfig.json
```

Note: a Next dev server was already running on port 3000 (PID 48048, started by
a subagent). Stop it before starting your own, or you will hit EADDRINUSE.

---

## 3. What exists and is verified working

Seven routes, all prerendered, all checked in a real browser:

| Route | Contents |
|---|---|
| `/` | Editorial home page |
| `/chapters` | **5 chapters, 73 content blocks** (Ch01/Ch02 are concepts-only — see §4) |
| `/formulas` | **15 formulas, ALL verified** (no `needs-slide-check` left) |
| `/player` | Thinking Player, **3 episodes (EP02/EP03/EP04)**, 19 steps |
| `/mock-test` | **10 Lect-09 questions**, timer + scoring + per-question slide refs |
| `/homework` | **3 problems**: churn metrics + slide-44 K-Means Q1 (K=2) + Q2 (K=3 Euclidean) |
| `/tools` | 2 interactive calculators |

```
content/
  types.ts        schema + the verification enum — read this first
  formulas.ts     15 formulas, all verified
  chapters.ts     Ch01–Ch05 — 73 blocks
  episodes.ts     EP02, EP03, EP04 — 19 steps, all verified
  mock-test.ts    10 Lect-09 questions (mockTestLect09) — Q11–30 NOT yet ported
  homework.ts     3 problems (hw1 churn, hw2 K=2, hw3 K=3 Euclidean)
components/
  site-header.tsx    sticky nav + theme toggle
  theme-toggle.tsx
  reveal.tsx         scroll reveal, respects prefers-reduced-motion
  content-blocks.tsx renders every ContentBlock kind, with a `never` exhaustiveness guard
  calculators.tsx    Tukey IQR + Confusion Matrix, client components
  episode-player.tsx step player with a real range input as the step rail
  mock-test-runner.tsx timer (role=timer, aria-live off) + radio groups + results
app/                routes + globals.css (the whole design system)
.research/           unverified-source material, NOT shipped content
```

### Verified behaviours, measured rather than assumed

- Both calculators reproduce the lecture figures exactly. Entering the FIFA
  World Cup 2026 case (TP=4 FP=1 FN=2 TN=3) yields Accuracy 70.00%,
  Precision 80.00%, Recall 66.67%, F1 72.73% — matching values derived by hand
  from the slide's own 10-row table.
- Tukey calculator: Q1=20 Q2=28 Q3=35 max=58 → IQR 15, upper fence 57.5,
  correctly reports outlier; max=50 correctly reports not-outlier.
- Zero-denominator metrics render `หารไม่ได้` plus the reason. They never
  silently render 0.
- Zero horizontal overflow across 5 routes × 4 widths (375/768/1024/1440).
- Thai headings render `letter-spacing: normal`; Latin display headings render
  −0.03em. See the tracking trap in section 7.
- Keyboard: the player step rail is a real `<input type="range">`, so arrows,
  Home and End work natively. Verified with real CDP key events, not synthetic
  dispatch.

---

## 4. Content that is verified — do not re-derive, do not change

All of this was checked against slide images.

### Lect 07 — Confusion Matrix (slide 23) + Gini (slides 11–12) + churn HW (slide 26)
FIFA World Cup 2026, Positive class = Play. TP=4 TN=3 FP=1 FN=2 (10 rows).
Accuracy 70.00% · Precision 80.00% · Recall 66.67% · F1 72.73%.
Slide 30 writes F1 as `2TP/(2TP+FP+FN)` and rounds to 0.67/0.80/0.70/0.73 — quote
that form when the question hands it to you.
Slide 34 sets Homework#1, which reuses the churn dataset on slide 26.
Gini(t) = 1 − Σp_k². Parent 6/6 → 0.500. Candidate A (≤45 days, 5/1 | 1/5) →
Weighted Gini 0.278, Gain 0.222. Candidate B (≤2 purchases, 2/4 | 4/2) →
Weighted Gini 0.444, Gain 0.056. Slide picks A — the "highest Gini Gain wins"
rule is now verified against real figures. All 7 Gini numbers recomputed by hand.
Slide 15's Euclidean arithmetic (`0+25+10+5`) still contradicts its own vectors
(⟨2,10,5,3⟩ vs ⟨2,5,5,4⟩ give 26). Flagged, not reproduced.
Churn exercise (slide 26): Positive = Inactive=Yes, 10 rows →
TP=3 TN=3 FP=2 FN=2 → **all four metrics = 60.00%**. The identical-metrics
result IS the pedagogical point (students assume they must differ).

### Lect 08 — K-Means (slides 19–29)
Points A1(2,10) A2(2,5) A3(8,4) A4(5,8) A5(7,5) A6(6,4) A7(1,2) A8(4,9).
Initial centroids C1(2,10) C2(5,8) C3(1,2).
Hand metric is Manhattan: `|x1-y1| + |x2-y2| + ... + |xn-yn|`.
Iteration 1 distances to (C1,C2,C3) → cluster:
A1 0/5/9→C1 · A2 5/6/4→C3 · A3 12/7/9→C2 · A4 5/0/10→C2 ·
A5 10/5/9→C2 · A6 10/5/7→C2 · A7 9/10/0→C3 · A8 3/2/10→C2
Clusters: C1={A1} C2={A3,A4,A5,A6,A8} C3={A2,A7}
Centroid update: C1 unchanged (singleton) · C2=(6,6) · C3=(1.5,3.5)
Complexity O(tkn). Weaknesses: mean-only so categorical needs encoding
(Thin=1/Middle=2/Fat=3), local optimum, K must be specified in advance, poor
with noise and outliers.
CAREFUL: the in-lecture worked example (C1(2,10) C2(5,8) C3(1,2) → C2=(6,6),
C3=(1.5,3.5)) is NOT the homework. Slide 44 sets a DIFFERENT problem on the
same 8 points: Q1 is K=2 with C1=A3(8,4), C2=A6(6,4), no metric named (Manhattan
applied per the in-lecture example, stated on-page) → clusters C1={A3,A5},
C2={A1,A2,A4,A6,A7,A8} → round-2 centroids C1=(7.5,4.5), C2=(3.3333,6.3333).
Q2 is K=3, Euclidean, centroids A2(2,5) A5(7,5) A8(4,9) → clusters
{A2,A7} {A3,A5,A6} {A1,A4,A8} → round-2 (1.5,3.5) (7,4.3333) (3.6667,9).
Q1 has a greedy tie: A5 is equidistant (2/2), lowest-numbered cluster wins —
the rule decides the whole trajectory. Both shipped in homework.ts (hw2, hw3).
NOTE: slide 15's Euclidean arithmetic (`0+25+10+5`) contradicts its own vectors
⟨2,10,5,3⟩ and ⟨2,5,5,4⟩, which actually give 26. Flagged, not reproduced.

### Lect 09 — Responsible Data Science (full 28 slides transcribed)
The most important figure: **SHAP values are percentage POINTS, not percent.**
Slide 9: Base Value 32%, contributions +29 / +12 / −8, Prediction 65%,
written on the slide as `32% + 29 + 12 − 8 = 65%`. Reading it as relative
percent would give 32 × 1.29 = 41.3%, which is wrong by 23.7 points.
Also verified: global vs local (p5), feature importance 0.42/0.33/0.25 (p6),
decision path for customer A (p7), model-specific vs agnostic, SHAP+LIME (p8),
historical bias 80%/20% contacted, predictions 70%/20% (p10), concept drift
Inactive 68%→31% after Subscription (p11), representation bias n=800 Recall 82%
CI 78–86 vs n=40 Recall 54% CI 39–69 (p12), proxy feature postal code 10110→42%
vs 94100→67% (p13), purpose limitation (p15), data minimisation (p16), and four
real cases: iTutorGroup (EEOC, >200 people, $365,000, 2023), Health-risk
algorithm (Obermeyer et al. Science 2019, 17.7% → 46.5%), Meta housing ads
($115,054, 2022), Rite Aid (FTC, 2012–2020, 5-year facial-recognition ban).

### Lect 05 / Lect 06 — concepts only, numbers NOT verified (CONFIRMED NEGATIVE)
Slide 17 confirms: "Fence เป็นเกณฑ์ ส่วน Whisker สิ้นสุดที่ค่ำจริงสุดท้ายซึ่งยังอยู่
ภายใน Fence". Slide 28: EDA "informs modeling decisions", it does not
"automatically select an algorithm". Slide 6 mean/median/mode, slide 7 variance
units, slide 2 EDA runs in Data Understanding and repeats after Data
Preparation. Lect 06: descriptive (description, association, clustering) vs
predictive (classification, estimation, prediction), and "Logic ของ ML มาจาก
ข้อมูล ไม่ใช่จาก Programmer".
IMPORTANT: the full Lect-05 deck was swept (slides 2–9, 12–16, 18–26, all read
via vision). Verdict recorded in `.research/lect05-final.md`: **the deck contains
NO worked numeric example anywhere** — no data set, no printed Q1/Median/Q3, no
IQR value, no fence value, only page numbers and one "50%". Two footnotes: slides
10–11 are about Group Comparisons/Responsible AI, not EDA (mixed deck); and the
blueprint's "`max_depth = 3` sweet spot" appears NOWHERE — slide 20 prints only
Low/Strong/Materially Lower. Ch01/Ch02 are written as concepts-only AND SAY SO
on-page; the Tukey formulas ship as standard definitions, not slide figures.

---

## 5. The locked theme contract

Do not renegotiate these without being asked. They are in `app/globals.css`.

Fonts: **Inter Tight Variable** (Latin, numeral) + **Prompt** (Thai, Cadson
Demak). Body 16px, Thai line-height 1.55.

| Token | Light | Dark |
|---|---|---|
| bg | `#F6F5F0` | `#0A181E` Black Stallion |
| surface | `#FDFCF8` | `#322628` Livid Brown |
| ink | `#171613` | `#E0E0E1` Wind Chime (13.7:1) |
| ink-muted | `#55534B` | `#A6A5A2` Smokey Wings (7.3:1) |
| ink-subtle | `#6B685E` | `#848685` (Smokey 78% + Black 22%, 4.9:1) |
| rule | `#DEDBD1` | `#2C373B` (Black 78% + Smokey 22%) |
| accent | `#E8490F` | `#D26E41` Fresh Acorn (5.2:1 on bg) |
| accent-ink | `#BF3A0B` (3.73:1 marker, text uses this) | `#D5835E` (5.0:1 on surface) |

Dark theme is built from the 6-anchor "warm black" palette:
`#0A181E` · `#322628` · `#655B55` Zinc Grey · `#A6A5A2` · `#D26E41` ·
`#E0E0E1`. Hover/raised/rule-strong are stated mixes of those anchors
(see the comments in `app/globals.css`).

accent is used only for: must-remember terms, exam pitfalls, formula results.
Never for body copy. `--accent-ink` exists because `#E8490F` on white is only
3.73:1, which is fine for a marker but fails AA for text.

Type: display `clamp(64px, 9vw, 140px)` weight 700 line-height 0.85.
Section index `.index` weight 300, tabular numerals. Metadata label 20px w300.
Spacing 80/120/160px. Full-bleed 12-column asymmetric grid, no max-width.
Both themes, defaulting to system preference, toggle persists to localStorage.

The style reference is bhagas-design.webflow.io — measured, not guessed: single
variable font, 201px H1 at weight 700 with −0.03em, 20px weight 300 metadata,
body 16px/1.25, no container max-width.

---

## 6. QA status — what was found, what is fixed, what is still open

An independent audit (`.research/qa-audit.md`, 1,382 elements sampled, 0 text-contrast
failures) found 2 blockers + 3 major + 2 minor. Current state:

FIXED: Thai tracking reset (was −3.41px on Thai h1) · header 122px overflow at
375px · load-time role=alert flood (8→0) · sticky-header focus cover
(scroll-padding-top) · theme-toggle accessible name (aria-pressed, not aria-label)
· `<main id="main" tabIndex={-1}>` added on `/tools` (fixing skip link and missing landmark)
· removed duplicate skip-link landmark from `/homework/page.tsx` (now clean single skip-link in `app/layout.tsx`).

CHANGED AND VERIFIED: `--rule` split into decorative hairline (`#E0E0E0` / `#26262A`)
vs control edge `--rule-strong` (`#6b6b6b` 5.33:1 / `#8a8a90` 5.77:1, clears 3:1);
calculator inputs, radio option labels, and table borders use `--rule-strong`.

VERIFIED: responsive floating glass navbar adapts Frontify's compact 14px link
targets to the site's palette; the desktop pill (1280px+) now carries all five
key routes — บทเรียน, คลังสูตร, Thinking Player, Mock Test, เครื่องคิดเลข —
with the redundant outlined/filled CTA pair removed; mobile chip/hamburger below,
with no horizontal overflow at 375/640/768/1024/1279/1280/1440.
Theme toggle is an unboxed native control with a 44px minimum hit target, avoiding
the Radix ghost-button frame inside the glass navbar.

VERIFIED: Thinking Player step navigation fix — `scrollToStep` immediately updates
`activeStep` and calculates the scroll target aligned with the focal trigger line
(`window.innerHeight * 0.45`), protected by an active-step programmatic scroll lock
with manual touch/wheel override and `md:pb-[65vh]` bottom clearance. The Next button
(`↓`) advances cleanly across all steps without freezing or requiring manual scroll help.

VERIFIED: Home page exit animation — `HomePageTransition` (`components/home-page-transition.tsx`)
animates outbound navigation (`opacity: 0, y: -22, scale: 0.985, blur(3px)` over 260ms)

VERIFIED: faded-crumble exit animation (`components/faded-crumble.tsx`,
`components/home-page-transition.tsx`, `app/globals.css`). On exit transitions,
elements physically deform (scale down to 0.92, compress `scaleY: 0.86`, tilt
`-1.2deg`/`+1.6deg`, blur 4-5px, and fade out downward). Standalone utility
`.faded-crumble-exit` / `.animate-faded-crumble` and container `.is-crumbling`
apply staggered physical crumble to child cards and buttons, fully disabled under
`prefers-reduced-motion`.

VERIFIED: faded-crumble scrolling exit-animation (`components/scroll-faded-crumble.tsx`,
`components/reveal.tsx`, `app/globals.css`). As elements scroll out past the top of the
viewport (`animation-range: exit 0% exit 100%`), they progressively scale down (0.86),
vertically compress (`scaleY: 0.76`), tilt slightly (-1.8°/+1.8°), blur (5px), and fade out.
Scrolling back down un-crumbles them smoothly into view. Supported via:
1. Native CSS scroll-driven animation (`@supports (animation-timeline: view())` classes:
   `.scroll-faded-crumble`, `.scroll-faded-crumble-alt`, `.scroll-crumble-exit`)
2. Cross-browser React component `<ScrollFadedCrumble>` powered by Motion `useScroll` + `useTransform`
3. `<Reveal scrollCrumble>` prop directly available on all reveal containers
4. Disabled cleanly under `prefers-reduced-motion: reduce`.
on both in-page link clicks and navbar navigation from `/`, with instant navigation
and zero transform under `prefers-reduced-motion: reduce`.

VERIFIED: homepage IA overhaul — one main path, everything else secondary.
The 3-day plan is the centerpiece (`#plan`, `components/study-plan.tsx`):
horizontal timeline with a dashed rail between numbered day nodes, per-step
checkboxes, and a progress bar; completion persists in localStorage
(`ds-plan-done-v1`) via `useSyncExternalStore` (no setState-in-effect, no
hydration mismatch; server snapshot is always `[]`). Fast Track collapsed
from five large bento cards into a compact secondary strip
(`hub-icon` Radix icon tiles, one line each); the hero topic-tag cloud was
removed (duplicated the Course Roadmap anchors). All emojis (🔥💡📖📝🎬⏱️ etc.)
replaced by the Radix icon set and numbered badges. Hero copy shortened to one
line; section padding 3rem→4rem. Formula cards now render real math typesetting
via KaTeX 0.19 (`components/math-formula.tsx`, server-rendered,
`katex/dist/katex.min.css` imported in `app/layout.tsx`): F1 as a stacked
fraction, Gini with `(p±)²` superscripts, IQR/Tukey with subscripts.
Practice-mode explainer (instant feedback + Hints) added to the Fast Track
heading. Verified headless (Playwright): tick→67%→reload persists→all three
→100% + mint fill + "เสร็จสมบูรณ์" pill→reset clears storage; 0 console
errors.

VERIFIED IN THE UX/UI PASS: all 7 routes have no horizontal overflow at 375px;
`/chapters` has one h1 and 29 h2s; Prompt is the computed font for body and
Radix headings/components. Under reduced-motion preference, all 28 chapter
reveals render as static visible elements; normal motion mode retains the
scroll-reveal behavior.
Episode visualization toggles reset to their defaults when the active frame
changes in EP02 (Gain Chart), EP03 (Matrix), and EP04 (Chart).

---

## 7. Traps that already bit once — do not repeat them

**The tracking trap.** `<html lang="th">` means `:lang(th)` matches EVERY
element by inheritance, including Latin headings. A blanket Thai reset silently
strips −0.03em from Latin display type too. The working rule is inverted:
default `letter-spacing: 0`, and restore −0.03em only where a heading is
explicitly marked `lang="en"`. Both the Thai and the Latin case must be
re-measured after any change to these rules.

**The `overflow-x: hidden` trap.** It was masking a genuine 122px horizontal
overflow at 375px, which pushed the theme toggle off-screen. It was removed and
the real cause fixed instead. Do not reintroduce it as a way to make an overflow
check pass.

**The alert flood.** Rendering a `role="alert"` per empty required field made a
screen reader announce eight problems on page load. Errors now appear only after
a field is touched.

**The port collision.** Do not tell a subagent to run `npm run dev` on a port
another process already owns.

**The backdrop-filter twin trap.** Writing
`backdrop-filter` next to `-webkit-backdrop-filter` made the CSS
pipeline (Turbopack/Lightning CSS) emit ONLY the prefixed form,
which modern Chrome ignores — so the glass navbar never actually
blurred (translucency only). Source must carry the unprefixed
declaration alone; the pipeline re-adds the `-webkit-` line for
legacy Safari automatically. Verify blur with a real screenshot
(sharp-to-hazy seam at the pill edge), not just computed styles.

**Subagent output is a self-report.** Three of them were interrupted, and the
two that finished both needed verification before use: one corrected its own
arithmetic twice, and the other found two blockers in code I had written and
considered done. Re-derive any number you are about to ship.

---

## 8. What remains

### Completed in this handover
- **Ported Q11–30 into `content/mock-test.ts`**:
  - Q11–14 (Lect 05 EDA: Fence vs Whisker, Mean/Median/Mode, Variance vs SD, EDA in CRISP-DS)
  - Q15–16 (Lect 06 Modeling: Descriptive vs Predictive, Logic comes from Data not Programmer)
  - Q17–20 (Lect 07 Trees & Metrics: Gini impurity calculation, Gini Gain split selection, World Cup 2026 metrics, Churn all-60% metrics)
  - Q21–30 (Lect 08 K-Means: Manhattan hand-metric, Distance calculations, Cluster assignment, Centroid updates (6,6) and (1.5,3.5), Immobile C1, Stopping criteria, Weaknesses, Manhattan vs Euclidean √25=5, WCSS/Inertia Squared Euclidean)
- **Built Multi-Paper Mock Test Runner**:
  - `mockTestFull`: Comprehensive 30-question final simulation (45 minutes)
  - `mockTestLect0507`: 10-question drill on EDA, Modeling & Trees (15 minutes)
  - `mockTestLect08`: 10-question drill on K-Means (15 minutes)
  - `mockTestLect09`: 10-question drill on Responsible Data Science (15 minutes)
  - Interactive tabs, timer with warnings, question progress rail, lecture badges, kind labels, detailed explanations, trap/distractor notes, and slide citations.
- **Ported Homework Problem from Slide 35**:
  - Candidate Models A/B/C on 100 customers: TP/FP/FN/TN, Accuracy (81%/78%/85%), Precision (89%/67%/82%), Recall (60%/90%/80%), F1 (72%/77%/81%), retention trade-off analysis, and recommendation.
- **All routes verified green with `npm run build` and `npx tsc --noEmit`**.
- **UX overhaul of `/chapters` (2026-10-12)** — full rewrites of
  `app/chapters/page.tsx` (now `"use client"`) and `components/content-blocks.tsx`:
  - ScrollSpy desktop TOC (rAF-throttled, nested section links, `aria-current="location"`,
    percent progress bar), sticky mobile chapter nav with active pill + progress line,
    hero read-progress badge, back-to-top FAB (appears after 480px).
  - In-page quick search (`#ch-q`: chapter meta, headings, key terms, block text,
    estimate focus, bridge labels) with `<mark>` highlights, block-kind filter chips
    (`aria-pressed`), `role="status"` result line, empty state with clear button,
    Escape clears the query.
  - Contextual bridge cards per chapter + `[WARN] นำเครื่องคิดเลขเข้าห้องสอบ`
    badge on ch01–04. Spec anchors corrected to real repo ids:
    `/tools#gini-gain` (spec's `gini-splitter` does not exist) and
    `/homework#hw-hw1-customer-churn-metrics` (spec's id is missing the `hw1-`).
  - Mark-as-read per chapter, persisted in `localStorage` key `ds-ch-read-v1`
    via `useSyncExternalStore` (cross-tab `storage` + custom event).
  - Block polish: definition card with นิยาม tag, `[WARN]` pitfall box
    (border-l-4 warn tokens), numbered step-by-step worked examples with answer
    footer, zebra tables in a keyboard-scrollable `role="region"`.
- **`/player?ep=ep03` deep link**: mount effect in `components/episode-player.tsx`
  reads `?ep=` and preselects the episode (needed by the bridge URLs).
- Known pre-existing (untouched): `.eyebrow`, `.index`, `.bento-pill`,
  `.tactile-btn` are used site-wide but have no definition in `app/globals.css`
  — they render unstyled everywhere; `/chapters` keeps them for consistency.
- Verified in-browser on a fresh `next start` (desktop 1440, 375px, light + dark):
  search (Gini/IQR/Confusion Matrix/K-Means), chips, ScrollSpy, progress bars,
  read-state persistence across reload, bridge click-through to
  `/tools#tukey-iqr`, `/player?ep=ep03` → EP03 `aria-current="page"`,
  no horizontal overflow, 0 console/page errors.

---

## 9. Working agreements on this project

- Thai learner-facing copy, English for structural headings and code.
- Thai text never gets negative letter-spacing.
- Accent colour stays rare. If it appears on every heading it stops meaning
  anything.
- Errors sit next to their own field, never in a block at the top of the form.
- `prefers-reduced-motion` must be honoured, and must render the readable final
  state rather than hiding content.
- Minimum 44×44px touch targets; verified visually hidden rather than asserted.
- When you verify a number, recompute it yourself before writing it down.

---

## 10. External UX audit fixes (2026-10-14, uncommitted)

- 24-item external audit against the Vercel site. 18 true and implemented,
  6 false/already-satisfied and reported with evidence (F-02 review toggle
  already in all modes; C-03 `ds-ch-read-v1` already drives the counter;
  T-03 no clipping at 375px measured; Tool 04 has no coordinate inputs;
  P-02 label toggle pre-existed; mono-stack premise fixed at the root).
- Global: `--font-mono` now falls back to Plex Thai after Plex Mono
  (G-01/L-01/H-03/F-03 root cause); coarse-pointer 44px sizing for
  `.chip`/`.field-sm`/new `.touch-target` (G-03); header `10301351` badge
  is now a link labelled `วิชา 10301351` to `/#exam-notice` (G-02).
- Mock test: `allQuestions` sorted by `n` (E-01 was real: grid read
  1–10, 35, 11–20 …); `mockTestLect0507` label fixed 14 → 13 ข้อ;
  retry-incorrect subset quiz with scaled time limit (E-02); pause/resume
  with exact residual re-anchor + amber/red two-tier low-time cue (E-03);
  real focus-trapped `ConfirmDialog` with jumping pills replacing the inline
  alert (E-04).
- Player: new shared `components/range-field.tsx` (numeric input + ticks +
  `aria-valuetext`) drives all 5 sliders in showcase/workbench (P-01);
  0.5×/1×/1.5× speed pills, speed-blind typewriter fixed (P-02); slider and
  meter label rows un-crowded at 320px (P-03).
- Formulas: practice mode is now a real answer form with tolerance
  `max(0.01, 1%)` and never-leaking verdicts (F-01); saved-formula store
  hardened to `useSyncExternalStore` + JSON validation (F-02 was false).
- Tools: Tukey order errors name the pair + `aria-live` banner, blank-field
  blame fixed (T-01); count inputs reject non-integer/negative keystrokes
  (T-02); boxplot `PAD` 24 → 34 fixes 5-digit fence-label clipping (T-03
  otherwise measured clean).
- Chapters: filter chips + clear-all + named empty state (C-01);
  IntersectionObserver spy over chapters AND sections + mobile `สารบัญ`
  drawer with Lenis-offset anchor jumps (C-02; drawer is NEW UI — confirm);
  C-03 already satisfied, untouched.
- Homework: per-problem bottom prev/next nav (H-01); one always-visible
  expand/collapse-all disclosure working in review mode too (H-02 was
  partial); Thai off `font-mono` in live segments (H-03).
- Lab: `CodeSnippet` rewritten — line numbers, data-driven `params`
  highlight (quote-aware, no comment false-positives), measured overflow
  fade, `<kbd>` tips; dead `highlightLines` prop removed (L-01..L-03).
- Verified on `next start` + Chromium: tsc clean, build clean, 0 console
  errors and 0 page-level overflow on all 8 routes at 1440; behaviour
  exercised at 375 — grid 1→35, timer 44:59→freeze→resume,
  submit dialog with 37 pills + Escape, M-01 undo, F-01 wrong/right
  verdicts, P-01 slider↔input sync, drawer open/select/close, lab
  highlights, homework nav links.
- NOT in this commit (left in the tree, yours): `content/chapters.ts`,
  `content/episodes.ts`, `content/homework.ts` rewrites; `app/homework/page.tsx`
  (your study-mode work + H-items on top — merge carefully);
  `components/homework-workbench.tsx` (orphan, nothing imports it).
- Open findings for you: `.eyebrow`/`.index` dead classes (FormulasRoute
  patched its page locally to `.num`); most of `homework-step-item.tsx`
  card parsers never match current content prefixes (22/34 steps fall to
  `MultiSegmentCard`, 12 to plain fallback); Tukey preset/keystroke console
  error from the earlier session STILL reproduces on the base content and is
  unrelated to this change set — needs its own bug pass.
