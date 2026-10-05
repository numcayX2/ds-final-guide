# HANDOFF — 10301351 Data Science Final Exam Guide

Written by Hermes Agent, 2026-10-05. Handing over to OMP.
Read this file completely before touching anything.

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

Node v26.7.0 · npm 11.19.0 · git repo initialised, 8 commits, working tree clean
at the time of writing.

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

Five routes, all prerendered, all checked in a real browser:

| Route | Contents |
|---|---|
| `/` | Editorial home page |
| `/chapters` | 3 chapters, 52 content blocks |
| `/formulas` | 15 formulas |
| `/player` | Thinking Player, 2 episodes, 13 steps |
| `/tools` | 2 interactive calculators |

```
content/
  types.ts        schema + the verification enum — read this first
  formulas.ts     15 formulas (12 verified, 3 flagged)
  chapters.ts     Ch03, Ch04, Ch05 — 52 blocks
  episodes.ts     EP03, EP04 — 13 steps, all verified
components/
  site-header.tsx    sticky nav + theme toggle
  theme-toggle.tsx
  reveal.tsx         scroll reveal, respects prefers-reduced-motion
  content-blocks.tsx renders every ContentBlock kind, with a `never` exhaustiveness guard
  calculators.tsx    Tukey IQR + Confusion Matrix, client components
  episode-player.tsx step player with a real range input as the step rail
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

### Lect 07 — Confusion Matrix (slide 23)
FIFA World Cup 2026, Positive class = Play. TP=4 TN=3 FP=1 FN=2 (10 rows).
Accuracy 70.00% · Precision 80.00% · Recall 66.67% · F1 72.73%.
Slide 34 sets Homework#1, which reuses the churn dataset on slide 26.

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

### Lect 05 / Lect 06 — concepts only, numbers NOT verified
Slide 17 confirms: "Fence เป็นเกณฑ์ ส่วน Whisker สิ้นสุดที่ค่ำจริงสุดท้ายซึ่งยังอยู่
ภายใน Fence". Slide 28: EDA "informs modeling decisions", it does not
"automatically select an algorithm". Slide 6 mean/median/mode, slide 7 variance
units, slide 2 EDA runs in Data Understanding and repeats after Data
Preparation. Lect 06: descriptive (description, association, clustering) vs
predictive (classification, estimation, prediction), and "Logic ของ ML มาจาก
ข้อมูล ไม่ใช่จาก Programmer".
**Ch01 and Ch02 were deliberately not written**, because their worked numbers
are still unverified.

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

## 6. Known open defects — fix these first

From `.research/qa-audit.md`, an independent audit of the live pages. Two
blockers were already fixed; the rest are still open.

1. **`--rule` borders are 1.31:1 contrast.** WCAG 1.4.11 wants 3:1 for UI
   component boundaries. Darken `--rule` in both themes. Keep `--rule` for
   hairlines that are decorative only, and introduce a separate token for
   anything that conveys a boundary or a control edge.
2. **No skip link and no `<main>` landmark on 3 of 4 routes.** The player and
   chapter pages use `<main>`, the others do not.
3. **The player skips a heading level, H1 → H3.** Add a visually-hidden H2 or
   restructure.
4. **`role="alert"` is emitted on blur rather than only on a real failure.**
   The load-time flood is fixed with touched-state, but confirm blur on an
   untouched field still behaves.
5. **GSAP and Lenis are installed but unused.** The Thinking Player is built
   with a range input and IntersectionObserver, not scroll-driven GSAP. If you
   convert it to a scroll-pinned experience, keep the range input as the
   accessible path — a scroll-jacked player with no keyboard equivalent is a
   regression, and `prefers-reduced-motion` must render the final state without
   stranding content invisible.

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

### Unblocked — can be done immediately
- Turn `.research/homework-kmeans.md` (28KB, written and self-corrected by a
  subagent, **not yet parent-verified**) into typed content plus a `/homework`
  route. Re-check the arithmetic before shipping it.
- `.research/mock-test-draft.md` is **incomplete** — it carries only 7 status
  tags (4 FROM-SLIDE, 2 FROM-PRINCIPLE, 1 NEEDS-SLIDE-CHECK) against a target
  of 30 questions. Either finish it or re-dispatch with the verified figures
  from section 4 inlined. Then build `/mock-test` with a timer, scoring, and
  per-question explanations.
- Fix the five open defects in section 6.
- The 3 Gini formulas in `formulas.ts` carry `needs-slide-check`. Leave them
  flagged, or verify them.

### Blocked on reading image-only slides
- **Ch01 EDA** and **Ch02 Modeling** — no verified worked numbers.
- **Homework#1 churn dataset** (Lect 07 slide 26) and the metrics worked
  example (slide 30).
- **EP01** (IQR) and **EP02** (Gini) in the Thinking Player.

Vision via `vision_analyze` is pinned in Hermes config to
`google/gemma-4-31b-it:free` and was returning 429 from the shared upstream
pool for the whole session. Local fallbacks were ruled out: Ollama has only
text models (K2-Horizon-7B, spark-x2.5-4b), LM Studio port 1234 was down, no
tesseract, and Windows OCR has no `th`. Workaround used: the user transcribed
Lect 09 through the Antigravity GUI. Prompt files are in
`.research/ANTIGRAVITY_PROMPT*.txt` — one covering all three remaining decks,
one focused on Lect 05 + Lect 07.

The single highest-leverage unblock is **Lect 05**: it yields Ch01 and EP01 at
once.

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
