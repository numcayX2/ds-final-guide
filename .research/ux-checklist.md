# UX / A11y QA Checklist — DS Final Guide

Audit target: Next.js 16.3.8 App Router + React 19.2.8 + Tailwind v4 + GSAP 3.15 + Lenis 1.3.
Scope: **quality only**. The visual design contract is locked and is not amended here.

## How to read the citations

- `[db: <domain> "<query>" → R#]` = a rule taken directly from a `ui-ux-pro-max` search result. `R#` is the result number in that query's output.
- `[best practice]` = no useful database hit; general/standards-derived rule. All such rules are listed in **§8 Non-matching queries** so you can audit the gaps yourself.

Contrast ratios below were **computed locally** (WCAG 2.x relative-luminance formula), not taken from the design brief, so they can be re-derived and differ from the brief in two places — see §1.1.

Two findings marked **DEFECT** are contradictions found in the current `app/globals.css`, not rules to add.

---

## 1. Contrast

### 1.1 Measured ratios (computed, both themes)

Computed against `--bg`: light `#FFFFFF`, dark `#0A0A0A`.

| Token | Light | Verdict | Dark | Verdict |
|---|---|---|---|---|
| `ink` `#161616` / `#F7F7F7` | **18.10:1** | AAA all sizes | **18.48:1** | AAA all sizes |
| `ink-muted` `#5C5C5C` / `#9A9A9F` | **6.69:1** | AAA normal text | **7.07:1** | AAA normal text |
| `ink-subtle` `#757575` / `#83838A` | **4.61:1** | AA normal text (margin 0.11) | **5.26:1** | AA normal text |
| `accent` `#FF4D00` | **3.33:1** | ⚠️ **fails 4.5 text; passes 3:1 non-text only** | **5.95:1** | AA normal text |
| `accent-ink` `#D93F00` / `#FF6A2B` | **4.51:1** | AA normal text (margin **0.01**) | **6.93:1** | AAA normal text |
| `rule` `#E0E0E0` / `#26262A` | **1.32:1** | ⚠️ fails 3:1 non-text | **1.31:1** | ⚠️ fails 3:1 non-text |
| `rule-strong` `#C9C9C9` / `#3A3A3F` | *(not in brief — measured 1.94:1 / 1.72:1)* | ⚠️ still fails 3:1 | | |

### 1.2 Which token is legal at which size

- `ink`, `ink-muted` — legal at **any** size, any weight. Default for all body and heading text in both themes.
- `ink-subtle` — legal for **normal text ≥4.5:1**, so it is legal at every size ≥ the 16px body floor. It is *not* legal for text below 24px if the size is rendered light (weight 300), because WCAG large-text is `≥18.66px bold / ≥24px regular`. Practical rule: `ink-subtle` at weight 300 must be used at ≥24px, otherwise use `ink-muted`.
- `accent-ink` (light `#D93F00`) — AA for **normal text only, at exactly 4.51:1**. The margin is 0.01, so it breaks under: any `opacity` < 1 on the text, subpixel antialiasing on light backgrounds, or a compressed screenshot/print pipeline. **Never use it as the sole text color for anything a student must read to answer an exam question.** Use it for links, active states, and emphasis adjacent to a readable duplicate.
- `accent-ink` (dark `#FF6A2B`) — AAA at 6.93:1. Legal everywhere including small `meta-label` text.
- `accent` `#FF4D00` — in **light mode this is not a text color at all.** Legal only for non-text UI: focus rings, borders, underline masks, chart strokes, focus-indicator perimeters — all of which have a 3:1 floor, and 3.33:1 clears it.
  - `[db: ux "keyboard focus modal" → R1]` — visible focus ring required on every interactive control; do not remove focus outline without replacement. Severity High. This makes the light-mode `accent` focus ring legitimate (3.33:1 ≥ 3:1), but see the `[db: ux "timed quiz countdown focus" → R1]` note on ring thickness below.
  - `[db: color "contrast ratio text" → Result 3]` corroborates the convention: the SaaS palette in the database pairs `Accent #EA580C` with `On Accent: #000000`, i.e. dark ink on orange rather than white text on orange. Measured locally, `#0A0A0A` on `#FF4D00` = **5.95:1**, consistent with that pairing.
- `rule` / `rule-strong` — **decorative only.** At 1.32:1 they fail the 3:1 non-text floor, so a control boundary drawn *only* in `--rule` is invisible to low-vision users and fails WCAG 1.4.11. Use `--rule` for separators between already-distinguishable blocks; use `accent` (or a `--rule-strong` raised to ≥3:1) for the border of any input, checkbox, radio, or select. `[best practice]` — the database's touch/focus rules require a *visible indicator* on interactive controls but never specify the border contrast ratio, so this is derived from WCAG 1.4.11 directly.
- Corroborating: `[db: typography "minimum font size mobile body text" → Result 3]` states accent color should be used "only on active labels or focus indicators" — i.e. the database agrees with restricting light-mode `accent` to non-text roles.

### 1.3 DEFECT — `::selection` fails AA

`app/globals.css` sets `::selection { background: var(--accent); color: var(--bg); }`.

- Light mode: `#FFFFFF` text on `#FF4D00` background = **3.33:1** — fails AA (4.5:1) for normal text.
- Selected body text is normal-size text a student may be mid-highlighting while reading. This is a real failure, and it is not in the brief's ratio table because it is a *pairing* the brief never measured.

Fix: `color: #0A0A0A` on the light `::selection` (measured 5.95:1), keeping `var(--bg)` only in dark mode. `[best practice]` (WCAG 1.4.3 applied to the selection pairing — no database result covers selection styling).

### 1.4 Documented value correction (not a defect in behavior)

`app/globals.css` comments dark `--accent-ink: #ff6a2b` as "5.96:1 on #0A0A0A". That figure is the ratio for **`--accent` `#FF4D00`**, not `#FF6A2B`. Measured `#FF6A2B` on `#0A0A0A` = **6.93:1** (matching the brief). The comment is mislabelled; the color is correct and better than documented. Fix the comment so a future editor doesn't "correct" a passing value downward.

---

## 2. Thai typography

### 2.1 What the tool actually returned — and what it didn't

`[db: typography "thai script tone mark vertical rhythm" → R1]` returned exactly one Thai-relevant record: pairing **"Thai Modern" = Noto Sans Thai / Noto Sans Thai**, keywords `thai, modern, readable, clean, multilingual, accessible`, notes "Clean Thai typography. Excellent readability." It is a *font-pairing* record — it contains **no** rule about tone-mark collisions, line-height, or tracking. R2/R3 were irrelevant (Wedding/Roboto, Handwritten/Quicksand).

`[db: typography "minimum font size mobile body text" → R1–R4]` returned four font *pairings*, not size rules. The only reusable numbers came from `[db: typography "minimum font size mobile body text" → Result 3]` (Neumorphism Mobile): body 16px / `lineHeight 1.4`, caption 12px, label 12px, and the explicit warning "Never use italic or thin weights — they lose legibility."

**Therefore every rule in §2.2 about tone marks, stacking, and Thai-specific tracking is `[best practice]`**, corroborated by the design brief and by the existing comment in `globals.css` ("Thai needs more leading than Latin: stacked vowels and tone marks"). It is not database-backed. That is worth stating plainly, because it is exactly the class of rule most likely to be silently wrong.

### 2.2 Rules

**Line height**
- Body Thai: `line-height: 1.55` (current) — **keep**. `[db: typography "minimum font size mobile body text" → R3]` supports ≥1.4 for body; 1.55 clears the Thai stacked-vowel requirement.
- Thai **headings** need **more** headroom than Latin, not less. Never reuse the display's `line-height: 0.85` on a string containing Thai. `[best practice]`
- `.display` (`clamp(64px, 9vw, 140px)`, `line-height: 0.85`, `letter-spacing: -0.03em`) is **Latin-only by construction.** If any episode title is Thai, it must not inherit `.display` unchanged — at 64–140px with 0.85 leading, a line containing `ำ` / `่` / `้` will clip. Route Thai display text through a `.display-thai` variant with `line-height: 1.0–1.1`, `letter-spacing: 0`, and verify with `overflow-wrap` + a visual overflow check on the tallest marks (`ปํ` , `ฟ้า`, `กํา`).
- `[db: typography "minimum font size mobile body text" → R3]` — no thin/italic Thai body. Weight 300 (`--font-display` at `.meta-label` and `.index`) is at risk: Prompt at weight 300 with Thai stacked marks loses mark legibility. Keep weight 300 for Latin numerals and Latin metadata only; Thai metadata should be ≥400.

**Tracking**
- Contract rule is correct and load-bearing: `:lang(th), .tracking-reset { letter-spacing: 0 }`. **Keep it, and verify it wins.**
  - `[best practice]` — negative tracking does not just look tight on Thai; it closes the horizontal advance between a base consonant and a stacked vowel cluster, which produces overlapping ink at small sizes and breaks Thai word-shape recognition.
  - **Audit risk:** `.meta-label` sets `letter-spacing: -0.032em` (line ~117 of `globals.css`) with **no** `:lang(th)` override and no `.tracking-reset` on the element. If a `meta-label` ever contains Thai (e.g. `สูตรที่ 3`), it inherits -0.032em and collides. Add `:lang(th)` to the selector list or add `.tracking-reset` at the call site.
  - **Audit risk:** `body` sets `font-family: var(--font-thai)` but the Thai-reset rule is keyed on `:lang(th)` / `.tracking-reset`, **not** on `font-family`. Every Thai string must therefore be inside a `:lang(th)` subtree. Set `<html lang="th">` so the selector matches by default, and do not strip `lang` from Thai containers. Verify with a DOM check that `document.documentElement.lang === 'th'`.
- Latin display keeps `-0.03em`. `[db: typography "thai script tone mark vertical rhythm" → R1]`'s "multilingual, accessible" keyword set supports running a genuine dual-script stack rather than pretending one font covers both.

**Font-size floors**
- Body floor **16px** (current `body { font-size: 16px }`). `[db: typography "minimum font size mobile body text" → R3]` gives body 16px, caption/label 12px.
- `[db: web "font loading flash invisible text" → R1]` states "Body text must be readable… at least 14–16pt base… Don't render critical text below 12pt" (severity High). That record is platform-scoped to iOS/Android/React Native, so it is **not directly applicable** — treat the 16px floor as consistent-with rather than sourced-from.
- Floor for **Thai** is 16px body, **18px for Thai inside any `meta-label`/`index` treatment**, and 16px for the smallest quiz option label. Nothing Thai below 16px anywhere.
- `clamp(64px, 9vw, 140px)` display is safe (min 64px) but see the Thai heading override above.

**Where tone marks collide (audit targets, all `[best practice]`)**
1. Stacked marks over a tall ascender (`ำ`, `้`, `่`, `็`) inside a fixed line-height box → vertical clipping. Check every Thai heading against `line-height < 1.2`.
2. Line-mask underlines: `.line-mask::after { bottom: -0.1em; height: 1px }` — a Thai underline placed at `-0.1em` **will strike through descender-range tone marks** that hang below the baseline (`ู`, `่` on tall stacks). Add a Thai variant with `bottom: -0.25em`, or verify the underline is only used on Latin-only labels.
3. The reveal transform `translateY(24px)` — combined with a 600ms transition and a Thai line whose marks extend above the line box, the top mark can visually collide with the preceding paragraph mid-transition. Not a static-overlap bug; check it looks clean at the animation midpoint.
4. Table-like content (12 formulas): any `vertical-align: middle` in a cell whose line-height is tight will overlap the neighboring row's tone marks. Give formula rows the 1.55 body leading, not the tight display leading.
5. Punctuation `ๆ` and `ฯ` sit high and can clip against a previous line's descenders at tight leading.

### 2.3 Font loading (tool-verified, important here)

`[db: google-fonts "Prompt Inter Tight variable" → R3]` — **Prompt**: subsets `latin | latin-ext | thai | vietnamese`, **no variable axes** (static 100–900, 9 files).
`[db: google-fonts "Prompt Inter Tight variable" → R1]` — **Inter Tight**: variable axis `wght: 100..900`, subsets `cyrillic | cyrillic-ext | greek | greek-ext | latin | latin-ext | vietnamese` — **`thai` is absent.**

Consequences, both verified from the font metadata:
- **Inter Tight has no Thai glyphs at all.** Any character it doesn't cover must fall through to Prompt. The stack `--font-display: var(--f-inter-tight), var(--f-prompt), sans-serif` is therefore load-order-critical: if Prompt resolves after Inter Tight in the network waterfall, Thai glyphs are invisible until it lands. This is a FOIT risk specific to this pairing. `[db: ux "math notation formula rendering accessibility" → R1]` — "Use `font-display: swap` or `optional`; **Don't**: Invisible text during font load; Code Example Bad: FOIT (Flash of Invisible Text)." Severity Medium. **Enforce `display: swap` on both families.**
- **Prompt is a static-weight font, not variable.** `weight 300` used for `.meta-label`/`.index` triggers a 300-weight Prompt file fetch. Confirm all four Prompt weights actually used (400/500/700 + whatever) are preloaded, or accept a late swap.
- Preload both families' primary weights in `<head>`; the Thai body face is the LCP text face on this site.

---

## 3. Scrollytelling

The site has a 6-episode scroll-driven step player using GSAP ScrollTrigger + Lenis. Audit each requirement below.

### 3.1 Structure and semantics

- The player must be **real document content**, not a canvas or a set of `<div>`s swapped by scroll position. `[db: ux "live region screen reader timer" → R1]` (Category Accessibility, severity Medium): "Content should make sense when read aloud. **Do**: Use semantic HTML and ARIA properly. **Don't**: Div soup with no semantics." Good: `<nav><main><article>`. Bad: `<div>` for everything.
- All six episode steps' text must exist in the DOM **at initial render**. A screen reader user who never scrolls must still reach every episode's content. Do not mount a step's text only when its ScrollTrigger fires.
- Heading hierarchy must be sequential across the whole player. `[db: ux "live region screen reader timer" → R3]` (severity Medium): "Screen readers use headings for navigation. **Do**: Use sequential heading levels h1-h6. **Don't**: Skip heading levels or misuse for styling." Good: h1 then h2 then h3. Bad: h1 then h4. Verify the 6 episodes are all the same level under one h1 — a step player that jumps h2 → h3 → h2 per step breaks the outline.
- `[db: ux "skip link landmark navigation" → R1]` (severity Medium): "Provide skip to main content link. **Don't**: No skip link on nav-heavy pages. Bad: 100 tabs to reach content." Add a skip link that jumps past the entire pinned player — the player is exactly the "100 tabs" case.
- `[db: ux "progress indicator stepper" → R1]` (severity Medium): "Show progress for multi-step processes. **Do**: Step indicators or progress bar. Bad: No step information." The player needs a visible and textual step indicator. Text form per R1's own example: **"Step 2 of 4"** — here "Episode 3 of 6" (ขั้นตอนที่ 3 จาก 6).

### 3.2 Keeping keyboard and screen-reader users in sync with the current step

This is the hardest requirement, because scroll position is the source of truth and neither keyboards nor screen readers scroll.

- **Drive the step index from a single source of truth.** One state variable, e.g. `activeStep: 0..5`. The ScrollTrigger writes to it; the step indicator, the keyboard controls, and the live region all read from it. Never let the visual layer and the a11y layer keep separate counters.
- **Expose the index as an ARIA live region, and never move focus on scroll.** `[db: gsap "timeline cleanup revert" → R3]` (Carousel / Auto-Rotation, severity High) is the closest database match and states both halves of the rule: "**Do**: Provide previous/next and play/pause controls; **announce the current slide without moving focus**." and "**Don't**: Don't auto-advance without a visible stop control or continue while focus is inside." Scroll-driven steps are auto-advancing by definition, so the *stop control* obligation applies directly.
  - Implementation: `<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">` containing `Episode 3 จาก 6: {step title}`. Poll on step *change* only, never on scroll tick.
  - **Never** call `.focus()` in response to a scroll event. Focus must stay where the user put it.
- **Debounce/throttle the live-region writes.** A scrubbed ScrollTrigger can fire dozens of step-change candidates per second; announcing each produces speech spam. Only commit when the settled index changes, and guard with a ref so the same index never re-announces (e.g. reversing direction across a boundary).
- **Give keyboard users real step controls.** A prev/next pair (`<button>`) that calls `scrollTo()` the same ScrollTrigger targets, so keyboard and scroll converge on one code path. Bind `ArrowRight`/`ArrowLeft` (and `PageDown`/`PageUp`) only when focus is inside the player region, not globally — a global arrow-key handler would fight the mock test's radio group and the calculator inputs. `[db: ux "keyboard focus modal" → R4]` (severity High): "complete keyboard navigation with visible focus on every operable control… **Don't**: keyboard traps or illogical tab order."
- **Do not scroll-jack.** `[db: ux "reduced motion scroll animation" → R2]` (severity High): "Parallax/Scroll-jacking causes nausea. **Do**: Honor prefers-reduced-motion and present the final readable state without parallax or scroll-jacking. **Don't**: Force scroll effects. Code Example Bad: `ScrollTrigger.create()`." Under reduced motion the player must degrade to plain sequential sections with no pinning — the student scrolls and reads. This is also the natural fallback for keyboard users.
- Lenis smooth-scroll must be **disabled under `prefers-reduced-motion`**, not just the animations. Smooth-scroll interception is itself the scroll-jacking the rule above prohibits. Note `globals.css` already sets `scroll-behavior: auto !important` in the reduced-motion block, but Lenis overrides scroll behavior in JS — the CSS rule is insufficient on its own.
- Pin the player only if needed, and only once. `[db: gsap "scrub scroll trigger" → R1]` (severity High path): "**Don't**: Don't pin more than 1-2 sections per page; excessive pinning fights native scroll feel and hurts mobile UX." Six episodes is six candidate pins — cap it at one pinned region and let the rest scroll normally.

### 3.3 GSAP requirements

- **Register the plugin once.** `[db: gsap "scroll reveal stagger" → R2]`: "Requires the ScrollTrigger plugin registered once via `gsap.registerPlugin(ScrollTrigger)`."
- **Use `useGSAP` with a scope for React.** `[db: gsap "scroll reveal stagger" → R4]` (severity High path): "In React use `useGSAP(() => {...}, { scope: containerRef })` from `@gsap/react` to auto-cleanup on unmount." Also from R4: "**Do**: Scope the ScrollTrigger to the section container so it doesn't re-scan the whole page"; "**Don't**: Don't stagger more than ~8 children"; "Set `scroller/markers: false` in production; `markers` is dev-only."
- **Deterministic height + `refresh()`.** `[db: gsap "scrub scroll trigger" → R1]`: "Pinning needs the section to have deterministic height; recalc `ScrollTrigger.refresh()` after images/fonts load." Given §2.3 — two webfonts, one of them a 9-file static family with no Thai coverage in Inter Tight — an explicit refresh after `document.fonts.ready` is mandatory, not optional. Otherwise pinned height is computed against fallback metrics and steps land at the wrong scroll offsets.
- **Scrub smoothing.** `[db: gsap "scrub scroll trigger" → R1]`: "**Do**: Use `scrub: true` or a small number (0.5-1.5) instead of instant jumps so it feels tied to the scrollbar."
- **Parallax limits.** `[db: gsap "scrub scroll trigger" → R3]` (Parallax Scroll): "Apply parallax to background/decorative layers only, **never to text or interactive controls**"; "Keep the `yPercent` delta small (5-15)"; "Don't parallax body copy; it hurts reading comfort and can trigger motion sickness"; "`will-change: transform` on the parallax layer only; remove it after scroll settles to free GPU memory."
- **Reduced motion via `gsap.matchMedia`.** Every GSAP motion block, per `[db: gsap "scrub scroll trigger" → R1]` Framework Notes, `[db: gsap "scroll reveal stagger" → R2]` and R4: "Use `matchMedia('(prefers-reduced-motion: reduce)')` to skip non-essential motion and **render the final state immediately**." `[db: ux "reduced motion scroll animation" → R1]` (severity High): "**Do**: Check `prefers-reduced-motion` media query; **Don't**: Ignore accessibility motion settings." Note the existing `components/reveal.tsx` gets this right — it sets `setShown(true)` and returns early when reduced motion matches. Hold the *player* to the same standard.
- **Budget the motion.** `[db: ux "reduced motion scroll animation" → R3]` (severity High): "Too many animations cause distraction and motion sickness. **Do**: Animate **1-2 key elements per view maximum**. Bad: `animate-bounce` on 5+ elements." Six episodes × title + formula + illustration must not all animate at once.

### 3.4 Cleanup obligations (the part that breaks in Next.js)

- **Return a cleanup from every effect that creates a GSAP object, listener, or observer.** `[db: gsap "timeline cleanup revert" → R1]` states the pattern precisely: "Keep a **stable named** pointer handler so cleanup removes the same function; in React