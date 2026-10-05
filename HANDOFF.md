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
| bg | `#FFFFFF` | `#0A0A0A` |
| ink | `#161616` | `#F7F7F7` |
| ink-muted | `#5C5C5C` | `#9A9A9F` |
| ink-subtle | `#757575` | `#83838A` |
| rule | `#E0E0E0` | `#26262A` |
| accent | `#FF4D00` | `#FF4D00` |
| accent-ink | `#D93F00` (4.51:1) | `#FF6A2B` (6.93:1) |

accent is used only for: must-remember terms, exam pitfalls, formula results.
Never for body copy. `--accent-ink` exists because `#FF4D00` on white is only
3.33:1, which is fine for a marker but fails AA for text.

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
