# Accessibility & UX Audit — ds-final-guide

**Date:** 2026-10-05
**Auditor:** independent second-pair-of-eyes review
**Target:** Next.js 16 / React 19 / Tailwind v4, Thai-language study guide
**Method:** live DOM inspection of `next dev` on http://localhost:3000 via Chrome DevTools Protocol. All values below were measured from computed styles and bounding boxes in the running app, not inferred from source. Chrome 126-class headless, `deviceScaleFactor=1`.

## Routes tested

| Route | HTTP | In scope |
|---|---|---|
| `/` | 200 | yes |
| `/chapters` | 200 | yes |
| `/formulas` | 200 | yes |
| `/tools` | 200 | yes |
| `/player` | 200 | **no** — a fifth route exists, is linked from the header on all four pages, but was not named in the audit brief. See "Untested" §U1. |

---

## Confirmed defects

### D1 — BLOCKER — Thai headings render with negative tracking, violating the locked type contract

**Routes:** `/`, `/chapters`, `/formulas`, `/tools` (every `h1.display`)
**Element:** `<h1 class="display tracking-reset">`

**Observed.** Computed `letter-spacing` on the Thai `h1` is **`-3.4074px` at `font-size: 113.58px`** (i.e. `-0.03em`), identical in both themes and on all four routes. Measured text includes Thai only, e.g. `คิด ทีละขั้น` (`/`), `เนื้อหาที่ยืนยัน` (`/chapters`), `สูตรที่ต้องจำ` (`/formulas`), `ลองคำนวณ ด้วยตัวเอง` (`/tools`). The element carries `class="display tracking-reset"` and `<html lang="th">`, so both intended zero-tracking mechanisms are present and both lose.

**Root cause — a cascade tie, not a missing class.** Enumerating every `letter-spacing` declaration in the loaded stylesheet gives four rules, all at equal specificity (0,1,0) or lower:

| Rule | Source order | Value |
|---|---|---|
| `:lang(th), .tracking-reset` | `globals.css:99` | `0` |
| `.display` | `globals.css:106` | `-0.03em` |
| `.index` | `globals.css:112` | `-0.03em` |
| `.meta-label` | `globals.css:122` | `-0.032em` |

`.display` is defined *after* the reset rule and, being a plain class, ties on specificity — later source order wins. The reset is therefore dead wherever `.display`, `.index` or `.meta-label` is also applied.

**Why it matters.** The design contract states Thai must be `letter-spacing: 0` because negative tracking collides Thai vowel and tone marks, which sit above and below the baseline. At `-0.03em` on a 113.58px display heading that is **3.4px of glyph overlap** — the marks are clipped by the line box (`line-height: 0.85`) and visually collide. This is the single most visible typographic defect on the site and it is present on every page.

**Fix.** Move the reset below the primitives so it wins on source order, and raise its specificity above the class rules:

```css
/* globals.css — place AFTER .display / .index / .meta-label */
:lang(th) .display,
:lang(th) .meta-label,
:lang(th) .index,
.display.tracking-reset,
.meta-label.tracking-reset { letter-spacing: 0; }
```

The `:lang(th)` prefix (specificity 0,2,0) beats the bare `.display` (0,1,0) regardless of order, so this is robust to reordering. Keep the Latin `-0.03em` on non-Thai runs by scoping the tight value to `:lang(en)` or a `.tracking-display` class that is not combined with a Thai ancestor.

---

### D2 — BLOCKER — Header overflows the viewport below ~500px, pushing the theme toggle off-screen

**Routes:** all four (shared `components/site-header.tsx`)
**Element:** `<header class="shell sticky top-0 z-50 …">` → `<nav class="flex items-center gap-6 sm:gap-8">`

**Observed.** Measured `scrollWidth` vs `clientWidth` on the header, and the theme toggle's box:

| Viewport | Document h-scroll | Header overflow | Nav width | Toggle `left…right` |
|---|---|---|---|---|
| 320px | **177px** | 177px | 418px | — |
| 375px | **122px** | 122px | 418px | **438…482px** |
| 768px | none | 0 | 638px | in view |
| 1024px | none | 0 | 727px | in view |
| 1440px | none | 0 | 790px | in view |

At a 375px viewport the theme toggle occupies x = 438→482 while the viewport ends at x = 360. It is **107px outside the viewport on first paint**. Same on all four routes. Root cause: the nav is a single non-wrapping flex row (`flex … gap-6`, no `flex-wrap`, no `overflow-x-auto`) holding 5 links + toggle, needing 418px inside a 320px content box (`.shell` padding-inline 20px at ≤768px). The `labelEn` spans are already `hidden md:inline`, so the row still cannot fit its Thai labels plus the "Thinking Player" Latin label, which has no Thai short form and never shrinks.

**Why it matters.** Two failures. (1) The horizontal scrollbar required to reach the toggle is suppressed by `body { overflow-x: hidden }` (`globals.css:88`) — I verified the page *does* scroll to `window.scrollX = 122`, so the content is reachable, but only by scrolling the entire document sideways, which also drags the sticky header and all page content out of view. On the `/chapters` route, scrolling right pushed the logo and the first nav links to x = -102…-14, i.e. off-screen left. (2) `overflow-x: hidden` is itself flagged by the design-intelligence search for `"table responsive overflow"` — *"Hidden overflow can clip important content … Don't: blindly apply overflow-hidden."* A theme toggle that requires document-level horizontal scrolling is unusable one-handed and confusing on mobile.

**Fix.** Below `md`, collapse the nav rather than letting it overflow. Cheapest correct change: allow the row to scroll within itself and hide the scrollbar, keeping document-level overflow at zero:

```tsx
<nav aria-label="หน้าหลัก"
     className="flex items-center gap-6 sm:gap-8 max-md:overflow-x-auto max-md:overscroll-x-contain">
```

Better, and preferred for a study guide where the four sections are the whole IA: hide the Latin `labelEn` below `md` (already done) **and** drop the "Thinking Player" row item below `md`, or replace the nav with a disclosure menu. Either way remove `overflow-x: hidden` from `body` once the overflow source is fixed, so genuine overflow bugs stay visible during development.

---

### D3 — MAJOR — Keyboard focus lands underneath the sticky header

**Routes:** `/tools` (measured), structurally applies to all four
**Element:** the 8 number inputs in the two calculators

**Observed.** The header is `position: sticky; top: 0` and measures **85px tall** at a 1440px viewport. `globals.css` sets **no** `scroll-padding-top` on `html` (computed value `auto`) and no `scroll-margin-top` on any focusable. Driving focus sequentially with real `Tab` key events:

```
tab3  Q3 ควอร์ไทล์อันดับสาม   top=517   headerBottom=85   inViewport=False
```

Scrolling that field to the top of the viewport — which is what sequential focus navigation does — puts it at `inputTop = -24px` with `headerBottom = 85px`: `obscured = true`, `ringFullyVisible = false`. The 2px focus ring plus its 3px offset are entirely hidden behind the header.

**Why it matters.** WCAG 2.2 **2.4.11 Focus Not Obscured (Minimum)** is AA. The design-intelligence search for `"keyboard focus order"` returns it as *Severity: High* with the exact remedy: *"Offset sticky UI with scroll-padding … Don't: let headers footers banners or chat widgets fully cover focus."* A keyboard user tabbing through a calculator cannot see which field they are in — the failure is silent because focus *is* moving.

**Fix.** Offset the scroll container by the header height:

```css
html { scroll-padding-top: 100px; }            /* 85px header + breathing room */
```

Prefer a custom property driven off the header so the two cannot drift:

```css
:root { --header-h: 85px; }
html { scroll-padding-top: calc(var(--header-h) + 16px); }
```

---

### D4 — MAJOR — Form errors are pre-rendered as `role="alert"` on load, before any input

**Route:** `/tools`
**Element:** all 8 inputs in both calculators

**Observed.** On a fresh load with no interaction, the DOM already contains **8 `role="alert"` nodes**, all reading `ยังไม่ได้กรอก` ("not filled in yet"), and **8 of 8 inputs carry `aria-invalid="true"`**:

```
fresh load -> alert nodes already in DOM: 8
fresh load -> aria-invalid count: 8 of 8
roleAlert: ["ยังไม่ได้กรอก", …8 identical…]
```

The reason is in `components/calculators.tsx:34-37`: empty input is classified as an *error*, and rendered through the same `role="alert"` branch as a genuine validation failure.

**Why it matters.** Two distinct problems, both confirmed:

1. **Over-announcement on load.** `role="alert"` is an implicit `aria-live="assertive"` region. A screen reader entering the page is queued eight assertive interruptions saying the user has failed to fill in fields they have not yet reached. `role="alert"` is the right tool for a *newly created* error, not for a persistent empty state — the search for `"form error announcement"` prescribes exactly this split: *"Use aria-live or role=alert for errors"* (Severity: High) versus its own *"Error Placement"* entry, which distinguishes inline field errors from top-level state.
2. **`aria-invalid="true"` is a false assertion.** Nothing is invalid yet. This misreports the field state to assistive tech and is a WCAG 4.1.2 / 3.3.1 concern.

A related positive finding: `aria-describedby` wiring is **correct**. Every input references its hint, adds its error id only while the error exists, and I found **0 dangling `aria-describedby` references** across the page. Inline errors do sit next to their own field, not at the top of the form — both match the *"Error Placement"* guidance verbatim.

**Fix.** Separate "empty" from "invalid". Render the empty state as a neutral hint with no live-region role, and reserve `role="alert"` for genuine validation:

```tsx
const touched = raw[f.key].trim() !== "";
{/* empty → plain hint, no role, no aria-invalid */}
{!touched && <p className="mt-2 text-sm text-ink-muted">{f.hint}</p>}

{/* real error → assertive */}
{touched && err && <p id={errId} role="alert" aria-live="assertive" className="…">{err}</p>}
```

and gate `aria-invalid` on `touched && err`. A `noValidate` form plus `onBlur` marking fields touched would also stop erroring while the user is still mid-typing, which the search's *"Inline Validation"* entry recommends (*"Validate on blur for most fields"*).

---

### D5 — MAJOR — Non-text contrast: `--rule` borders fail WCAG 1.4.11 at 1.31–1.32:1

**Routes:** all four, both themes
**Element:** every element using `border-rule` / `border-rule-strong` — input borders, header bottom rule, table row dividers, section separators

**Observed.** Computed from the live palette (`getComputedStyle` on rendered borders, cross-checked against the CSS custom properties):

| Token | Light on `#FFFFFF` | Dark on `#0A0A0A` | Required | Verdict |
|---|---|---|---|---|
| `--rule` | **1.32:1** | **1.31:1** | 3:1 | **FAIL** |
| `--rule-strong` | **1.66:1** | **1.75:1** | 3:1 | **FAIL** |
| `--accent` | 3.33:1 | 5.95:1 | 3:1 | pass |
| `--accent-ink` | 4.51:1 | 6.93:1 | 3:1 | pass |

The live input border computes to `rgb(224, 224, 224)` = `#E0E0E0` = `--rule`, at `1px`. This is not decorative: it is the **only** visual boundary of the form controls. The inputs also carry `outline-none`, so when unfocused the 1.32:1 border is all a user has.

**Why it matters.** WCAG 1.4.11 Non-text Contrast requires 3:1 for the visual boundaries of user-interface components. A form field boundary at 1.32:1 fails in both themes. The focus ring itself is fine (`--accent` at 3.33:1 light / 5.95:1 dark), so this is specifically about the resting state of controls, not focus.

**Fix.** Darken/lighten the rule tokens to clear 3:1 against their own background while keeping the hairline look:

```css
:root              { --rule: #949494;  --rule-strong: #767676; }  /* ≥3:1 on #FFF */
:root[data-theme=dark] { --rule: #5a5a60;  --rule-strong: #6e6e75; }  /* ≥3:1 on #0A0A0A */
```

Keep `--rule` for genuinely decorative separators (where 1.4.11 does not apply) and introduce a separate `--border-control` at ≥3:1 for input and interactive boundaries. This preserves the design's thin-rule aesthetic while fixing the AA failure.

---

### D6 — MINOR — Theme toggle's accessible name does not contain its visible label

**Routes:** all four
**Element:** `<button aria-pressed aria-label={theme === "dark" ? "สลับเป็นธีมสว่าง" : "สลับเป็นธีมมืด"}>` containing `<span>Light|Dark</span>`

**Observed.** In light theme the button renders visible text **`Dark`** while its accessible name is **`สลับเป็นธีมมืด`** ("switch to dark theme"). Sweeping every button, link and input on `/tools` for name/label mismatch returned exactly this one control; `visibleContainedInAcc: false`.

**Why it matters.** WCAG 2.5.3 **Label in Name** (AA) requires the accessible name to contain the visible label text, so voice-control users who say "click Dark" hit the control. Compounding it, the toggle signals state twice — `aria-pressed` flips (`false`→`true`) *and* the accessible name flips (`สลับเป็นธีมมืด`→`สลับเป็นธีมสว่าง`). I confirmed both move together via real clicks:

```
light: name='สลับเป็นธีมมืด'  pressed='false'   data-theme=light
dark : name='สลับเป็นธีมสว่าง'  pressed='true'    data-theme=dark   body bg=rgb(10,10,10)
```

A screen reader announces "สลับเป็นธีมสว่าง, toggle button, pressed" — a label describing an *action* attached to a state that says *already on*. The two channels contradict each other semantically.

**Fix.** Keep one stable name that describes the control, and let `aria-pressed` carry state:

```tsx
<button aria-pressed={theme === "dark"} aria-label="โหมดมืด">
  <span aria-hidden="true">{theme === "dark" ? "Light" : "Dark"}</span>
</button>
```

If the visible word must stay in the name, make it `aria-label="Dark"` with the Thai detail moved into a `title` or visible sub-label.

---

### D7 — MINOR — No skip link, and three of four routes have no `<main>` landmark

**Routes:** `/chapters`, `/formulas`, `/tools`
**Element:** document structure

**Observed.**

| Route | `<main>` | skip link | focusable elements |
|---|---|---|---|
| `/` | 1 | 5 | 13 |
| `/chapters` | **0** | **0** | 7 |
| `/formulas` | **0** | **0** | 7 |
| `/tools` | **0** | **0** | 15 |

`/chapters` renders 20 `<h2>` sections and `/formulas` 15, all inside bare `<section>`/`<div>` with no `main` wrapper. Note the five `href="#…"` links on `/` are in-page content anchors, not a bypass mechanism.

**Why it matters.** WCAG 2.4.1 **Bypass Blocks** (AA). Practical impact is moderate here because the focusable count is low (7–15) and tab order is correct — but on `/chapters` a keyboard user must traverse the full 20-section heading list to reach the calculator, and has no landmark to jump to. The design-intelligence search for `"keyboard focus order"` rates *"Keep tab order aligned with visual order and test every action without a pointer"* as Severity: High; landmarks are the standard mechanism for the skip affordance.

**Fix.** Wrap each page's content in `<main id="main">`, then add one shared skip link at the top of `layout.tsx`:

```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:p-4">ข้ามไปเนื้อหาหลัก</a>
```

The existing `:focus-visible` rule in `globals.css:189` will make it visible on focus with no extra styling.

---

## Verified as passing

These were tested and are **not** defects. Recording them so they are not re-litigated.

**Text contrast — all four routes, both themes.** Swept every element with a direct text node (42 on `/`, 340 on `/chapters`, 259 on `/formulas`, 50 on `/tools`), resolving effective foreground through alpha compositing and stacking contexts, and applying the correct threshold per size/weight (3:1 ≥24px, or ≥18.66px bold; else 4.5:1). **Zero failures.** Worst measured values: light `--ink-subtle #757575` at **4.61:1** and `--accent-ink #D93F00` at **4.51:1** (both ≥4.5 even at 12px); dark `--ink-subtle #83838A` at **5.26:1** and `--accent-ink #FF6A2B` at **6.93:1**. Body ink is 18.1:1 light / 18.48:1 dark. Both themes pass 4.5:1 for normal text at every size actually used, as the contract requires.

**Base typography.** `body` computes to `font-size: 16px`, `line-height: 1.55`, `font-family` = Prompt with Inter Tight fallback, per contract.

**Keyboard reachability and focus visibility.** Real `Tab` traversal from `/tools` visits, in DOM order: logo → หน้าแรก → บทเรียน → คลังสูตร → Thinking Player → เครื่องคิดเลข → theme toggle → all 8 calculator inputs. No traps, no skipped stops, no positive `tabindex`. Every stop computes to `outline: 2px solid` — on the inputs this survives the `outline-none` class because `globals.css` sets `:focus-visible` at source order after Tailwind's reset; I confirmed the input's computed outline is `rgb(255, 77, 0) solid 2px` with `outline-offset: 3px`, not `none`. The toggle, reached by real Tab, reports `matches(':focus-visible') = true`. This matches the search's Severity-High *"Focus States"* rule: *"Use a visible focus ring on every interactive control."*

**Theme toggle operates without a mouse.** Reached by Tab (stop 7 on `/`), activated by both `Enter` and `Space`; `data-theme` flips, `document.body` background changes `#FFFFFF`↔`rgb(10, 10, 10)`, `localStorage["ds-theme"]` persists, and focus is retained on the control. *(Method note: my first `Enter` press appeared to fail. A control test with a plain injected `<button>` failed identically, proving the fault was my synthetic `rawKeyDown` omitting the text payload, not the app. With `keyDown` + `text="\r"` the toggle fires correctly. Reported as a harness artifact, not a defect.)*

**Calculator label association — complete.** All 8 inputs have `input.labels.length ≥ 1` with real Thai label text, plus `type="number"`, `inputMode` (`decimal` / `numeric`), `min={0}` / `step={1}` on the confusion-matrix cells, and unique `useId`-derived ids. Matches the search's Severity-High *"Form Labels"* rule. Every `<label>` carries `tracking-reset`, and the *labels* do compute to `letter-spacing: normal` — but see D1: `meta-label`'s own `-0.032em` still wins, so they measure `-0.64px` on the live DOM.

**Results are announced on change.** Each calculator wraps its result panel in `aria-live="polite"`, and I verified the live region content actually changes as inputs are filled (placeholder `กรอกให้ครบ…` → full result block). The announcement is a single coherent unit rather than a competing set of regions, consistent with the search's *"Contextual Live Badge Updates"* guidance against *"making every badge a competing live region."* Minor caveat below.

**Divide-by-zero is communicated clearly, not silently as zero.** This is a genuine strength. `components/calculators.tsx:237-243` guards the denominator, and I confirmed the behaviour live:

- `TP=0, FP=0, FN=0, TN=10` → Precision, Recall and F1 all render **`หารไม่ได้`** ("cannot divide"), each followed by the arithmetic, e.g. `= Precision เมื่อ TP + FP = 0 ซึ่งเป็นศูนย์`, plus an explicit prose note explaining that no case was predicted positive so Precision and F1 are meaningless.
- `TP=FP=FN=TN=0` → Accuracy also degrades to `หารไม่ได้` with `= … = 0 ซึ่งเป็นศูนย์`, rather than printing a false `0.00%`.
- Negative and non-integer confusion-matrix input is rejected with `ต้องเป็นจำนวนเต็มที่ไม่ติดลบ`; `TP=-5` is retained in the field with the error shown rather than silently clamped.

Arithmetically correct for a textbook: `TP=5, FP=0, FN=0, TN=95` → Accuracy/Precision/Recall/F1 all `100.00%`, total `100`.

**Touch targets — 44×44 on both axes.** Swept every visible `a[href]`, `button`, `input` at 375, 768, 1024 and 1440px. **Zero failures.** All nav links and the toggle measure exactly 44px tall; widths are 44–70px; inputs are 51px tall. (This clears the stricter house rule of 44×44, and also WCAG 2.2's 24×24 minimum — the search's *"Target Size (Minimum)"* entry is explicit that *"Assume native 44pt or 48dp guidance defines web conformance"* is the wrong read for web.)

**Heading hierarchy — no skipped levels.** Every route has exactly one `<h1>` and uses only `h2` beneath it: `/` 1×h1 + 4×h2; `/chapters` 1×h1 + 20×h2; `/formulas` 1×h1 + 15×h2; `/tools` 1×h1 + 2×h2. Programmatic level-diff found **no skips** on any of the three multi-section routes. Matches the search's *"Heading Hierarchy"* rule (*"Don't: skip heading levels"*).

**Tables — correct semantics and correct overflow handling.** All 10 tables on `/chapters` have a `<caption>`, `<th scope="col">` headers, and an `overflow-x: auto` wrapper. At 320 and 375px exactly one table scrolls *within its own wrapper* (`scrollWidth 374` vs `clientWidth 320`) rather than pushing the page — the precise remedy the search prescribes for *"table responsive overflow"* (*"Use horizontal scroll or card layout … Don't: wide tables breaking layout"*). No Thai text is truncated anywhere: a sweep of all `p/h1/h2/li/dd/dt` for `scrollWidth > clientWidth` returned **0** clipped elements at 375px.

**`prefers-reduced-motion` is honoured — content is never left invisible.** With CDP media emulation `prefers-reduced-motion: reduce`, `/chapters` reports `matchMedia(...).matches = true` and **all 20 `.reveal` blocks compute to `opacity: 1`, `data-shown="true"`, `transition-duration: 0s`, `transform: none`** — before any scrolling, and still 20/20 after scrolling the full page. Control run with `no-preference` on a fresh load leaves 17 of 20 below the fold at `opacity: 0`, proving the probe distinguishes the two states. Both layers of defence work: `reveal.tsx:27-31` short-circuits to `setShown(true)` when the media query matches, and `globals.css:175-185` independently forces `opacity: 1; transition: none`. This satisfies WCAG 2.3.3 Animation from Interactions.

**Reflow at ≥768px.** No horizontal document scroll at 768, 1024 or 1440px on any route; zero offending elements. D2 is confined to ≤375px.

---

## Untested / out of scope

Explicitly **not** verified. These are gaps in the audit, not passes.

- **U1 — `/player`.** A fifth route returns 200 and is linked from the header on all four audited pages, but the brief named four routes. I did not audit it. One observation made in passing: its heading outline is `H1` → `H3` (`คิดทีละขั้น` → `กำหนด Positive ก่อนเสมอ`), a skipped level, and it shows the same 122px header overflow at 375px. Both need a proper pass. **Recommend extending scope to include it.**
- **U2 — Real screen-reader behaviour.** All ARIA findings (D4, D6, and the passing live-region result) are derived from the accessibility tree (`Accessibility.getFullAXTree`) and DOM semantics. No NVDA/JAWS/VoiceOver run was performed, so actual announcement *wording and timing* — particularly whether the 8 load-time `role="alert"` nodes queue as I predict, and how verbose the result-region announcement is — is inferred, not observed. The direction of D4 is well-supported but the severity of the interruption should be confirmed with a real AT.
- **U3 — Windows High Contrast / forced-colors mode.** Not tested. D5's failure would likely worsen or change character under forced colors, since borders often collapse to system colors.
- **U4 — Browser zoom to 400%** (WCAG 1.4.10 Resize Text). Tested only via viewport-width emulation at fixed DPR, which approximates but does not equal browser zoom. Reflow at 320px *is* covered by D2 and does fail.
- **U5 — RTL and locale switching.** Out of scope for a single-locale study guide.
- **U6 — Cross-browser.** Chrome only. `position: sticky`, `IntersectionObserver` behaviour and `:focus-visible` are all well-supported, but Safari and Firefox were not exercised. The `overflow-x: hidden` + sticky-header interaction in D2 is known to differ on iOS Safari and deserves a device check.
- **U7 — Print stylesheet.** Not present, not tested.
- **U8 — Performance of the scroll-reveal.** Animation smoothness and frame timing were not measured; this audit covers accessibility and UX defects only.

---

## Summary

| ID | Severity | Route | Issue |
|---|---|---|---|
| D1 | **blocker** | all 4 | Thai `h1` renders at `letter-spacing: -3.4px`; cascade tie in `globals.css` |
| D2 | **blocker** | all 4 | Header overflows below ~500px; theme toggle 107px off-screen; `overflow-x: hidden` masks it |
| D3 | major | `/tools`, all 4 | Sticky header (85px) obscures keyboard focus; no `scroll-padding-top` |
| D4 | major | `/tools` | 8 `role="alert"` + `aria-invalid="true"` pre-rendered on page load |
| D5 | major | all 4 | `--rule` borders at 1.31–1.32:1 fail WCAG 1.4.11 (3:1) in both themes |
| D6 | minor | all 4 | Theme toggle: visible "Dark" not in accessible name; state signalled twice |
| D7 | minor | 3 of 4 | No skip link; no `<main>` on `/chapters`, `/formulas`, `/tools` |

**Two blockers, three major, two minor.** D1 and D2 are visible on every page at every width below 500px and should be fixed first; both are small, local CSS changes. D3–D5 are AA conformance failures with one-to-three-line fixes each.

The calculators themselves are in good shape: label association is complete and error-free, results are announced, and divide-by-zero is handled with genuine pedagogical care — `หารไม่ได้` plus the arithmetic plus a prose explanation, rather than a silent `0`. That is better than most reference implementations and should be preserved through any refactor.

**Methodology notes.** Every value in this report was measured from the live DOM via CDP; nothing is inferred from source reading, and the two source citations (`globals.css:99-122`, `calculators.tsx:34-37`) are given only to explain *why* a measured defect occurs. Selector targets were verified via `outerHTML` dumps before geometry was trusted. Mid-animation elements (`opacity < 0.999`) were excluded from contrast sampling so reveal transitions could not distort colour readings, and every measurement was taken after a full-page scroll so below-the-fold content was included. The one apparent defect that proved to be a harness artifact — synthetic `Enter` not activating the theme toggle — was caught by a control test and is documented under the passing results rather than reported as a bug.
