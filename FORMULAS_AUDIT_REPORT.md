# UX/UI Audit — `/formulas` (10301351 Data Science Final Study Guide)

**Auditor:** Senior EdTech UX/UI & Frontend QA Engineer  
**Target:** `http://localhost:4321/formulas` (Astro 5 / Tailwind v4 / GSAP + KaTeX)  
**Build Status:** ✅ `astro build` green (2.10s)  
**Data Integrity:** ✅ `npm run validate-formulas` — 14 formulas, 152 cells, 108 tokens, 0 errors  
**Inspection Date:** 2026-10-16

---

## 1. 🚨 Critical Friction & Annoying Flaws (P1)

### P1-1 — Ghost Clone Animation Targets Wrong Token (Core Feature Broken)
- **File / Element:** `src/components/player/morph-engine.ts:176`
- **Code:** `const targetToken = katexMount.querySelector<HTMLElement>(`[data-flip-id]`);`
- **What went wrong:** The selector grabs the **first** `data-flip-id` token in the KaTeX mount, ignoring `step.targetTokenIds`. If a step references `token-p1` and `token-p2`, both ghost clones fly to the same first token (`token-p1`). The second source cell flies to the wrong location or overlaps the first ghost.
- **Why it hurts study flow:** The pedagogical core — "data cell → formula token mapping" — is broken. Students see ghost clones landing on incorrect variables, destroying the link between raw evidence and derived metric.
- **Evidence:** Inspection of `gini-impurity` step 1 (`targetTokenIds: ['token-p1', 'token-p2']`, `sourceCellIds: ['cell-p-act', 'cell-p-inact']`). The loop runs twice; both iterations find the same first token.
- **Fix (concrete):**
```typescript
// In executeGhostClones — filter by token ID matching targetTokenIds
const targetId = step.targetTokenIds?.find((t) => katexMount.querySelector(`[data-flip-id="${t}"]`));
const targetToken = targetId ? katexMount.querySelector<HTMLElement>(`[data-flip-id="${targetId}"]`) : null;
```
Actually, the correct mapping is per-source: each `sourceCellIds` entry must pair with its corresponding `targetTokenIds` entry (same index). Add index-based pairing:
```typescript
step.sourceCellIds.forEach((sourceId, idx) => {
  const targetTokenId = step.targetTokenIds?.[idx];
  if (!targetTokenId) return;
  const targetToken = katexMount.querySelector<HTMLElement>(`[data-flip-id="${targetTokenId}"]`);
  // ... rest of ghost logic
});
```

---

### P1-2 — Orphaned Ghost DOM Elements on Rapid Interaction / Error
- **File:** `src/components/player/morph-engine.ts:183-191`
- **What went wrong:** The ghost element (`document.createElement('div')`) is appended to `document.body`. It is only removed inside `gsap.to(..., { onComplete: () => { ghost.remove(); } })`. If the user navigates away (filter change, scroll, or a JS error) before `onComplete`, the ghost stays permanently in the body (`position: fixed; z-index: 9999`). There is no cleanup mechanism.
- **Why it hurts:** Persistent floating black boxes block interaction and destroy visual cleanliness.
- **Fix:**
```typescript
// Before appending, register a cleanup handler on container
this.container.addEventListener('morph-cleanup', () => ghost.remove(), { once: true });
```
Or wrap in `try/finally` with a timeout guard, and add a `cleanupGhosts()` method called before `renderStep` and `stopAudio`.

---

### P1-3 — No Keyboard Navigation (Arrow Keys / Spacebar)
- **File:** `src/components/player/GsapMorphPlayer.astro:221-230`
- **What went wrong:** Only mouse click listeners (`addEventListener('click', ...)`) are attached. There are no `keydown` listeners for Left/Right arrows, Enter, or Spacebar.
- **Why it hurts:** Final exam students often study in focused sessions; keyboard navigation is faster and required by WCAG 2.1 Level A (keyboard operable). Students can't use arrow keys to step through derivations.
- **Fix:** Add a `keydown` listener on the player container:
```typescript
playerEl.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); engine.nextStep(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); engine.prevStep(); }
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); engine.playAudio(); }
});
// Add tabindex="0" to each player container
```

---

### P1-4 — Touch Targets Below 44×44px (Mobile / Thumb Reachability)
- **File:** `src/components/player/GsapMorphPlayer.astro:148-160`
- **What went wrong:** Step scrubber dots (`w-7 h-7` = 28px²) and Prev/Next buttons (`text-xs` + `px-3 py-1.5` ≈ 32px height) fall well below WCAG 2.5.5 (Target Size Enhanced: 44×44px CSS pixels).
- **Why it hurts:** On mobile (375px viewport), students cannot reliably tap dots or buttons with their thumbs, especially during rapid review before an exam.
- **Fix:**
```html
<!-- Dots: -->
<button ... class="w-10 h-10 sm:w-11 sm:h-11 ...">
<!-- Controls: -->
<button ... class="px-4 py-3 ...">
```

---

### P1-5 — Audio Toggle Disconnected from Explanation Zone (Cognitive Friction)
- **File:** `src/components/player/GsapMorphPlayer.astro:30-37`
- **What went wrong:** The `data-audio-toggle` button sits in the top bar (Zone A / Technical Header), physically separated from the step explanation card (Zone B / right column) by ~200–300px vertically. The user must shift gaze from the explanation text to the header to play/pause audio.
- **Why it hurts:** During derivation study, the user's attention is anchored on the KaTeX formula and explanation. Moving the cursor/eyes upward breaks the reading flow. There's also no secondary play control near the explanation text.
- **Fix:** Duplicate a small audio control inside the explanation card, or relocate the toggle to the right-side explanation header:
```html
<div class="flex items-center gap-2 mb-1">
  ...
  <button data-audio-toggle ...>🎙️ ฟัง</button>
</div>
```

---

### P1-6 — No Focus Rings / `aria-pressed` / `aria-label` on Interactive Elements
- **File:** `GsapMorphPlayer.astro` controls, filter pills (`formulas.astro:44-93`), jump select (`formulas.astro:29-38`).
- **What went wrong:** The select uses `outline-none`. Buttons have no `:focus-visible` ring styles. The audio button has no `aria-pressed` state, no `aria-label`, and no visual focus indicator.
- **Why it hurts:** Screen-reader users and keyboard navigators cannot perceive focus position or audio playback state.
- **Fix:**
```css
/* Add to global.css or component */
button:focus-visible, select:focus-visible {
  outline: 2px solid #A3E635;
  outline-offset: 2px;
}
```
```html
<button data-audio-toggle aria-pressed="false" aria-label="Toggle Thai audio narration" ...>
```

---

## 2. ⚠️ Usability & Polish Issues (P2)

### P2-1 — Explanation Text Contrast Reduced (`opacity-90`)
- **File:** `GsapMorphPlayer.astro:112`
- **Code:** `<p data-step-explanation class="text-[#171719] opacity-90 ...">`
- **Fix:** Remove `opacity-90` or change to `opacity-100`. For clinical study readability, maximum contrast is preferred (`#171719` on `#F4F1EA` = 16.6:1).

---

### P2-2 — KaTeX Mount Fixed `min-h-[90px]` Could Clip Multi-Line Formulas
- **File:** `GsapMorphPlayer.astro:97`
- **Code:** `min-h-[90px]` on the `data-katex-mount` div.
- **Fix:** Change to `min-h-[100px]` and add `max-h-[320px] overflow-y-auto` so tall derivations (e.g., `silhouette-score` with long summations) don't overflow the card.

---

### P2-3 — Filter Pills Lack `aria-pressed` and Active Keyboard Navigation
- **File:** `formulas.astro:44-93`
- **Fix:** Add `aria-pressed={isActive}` and `tabindex="0"` to each pill, and handle `Enter`/`Space` activation.

---

### P2-4 — Ghost Clone Color Mapping Not Matched to Source Semantic
- **File:** `morph-engine.ts:184`
- **What went wrong:** The ghost clone always uses `bg-[#171719] text-[#A3E635]`. The source data cell may have semantic status `tp` (green), `caution` (amber), `invalid` (red), or `success`. There's no visual bridge showing which semantic category is being animated.
- **Fix:** Map ghost background to the source cell's highlight color:
```typescript
const semanticColors: Record<string, string> = {
  'tp': 'bg-[#A3E635] text-[#171719]',
  'caution': 'bg-[#F59E0B] text-[#171719]',
  'invalid': 'bg-[#E11D48] text-white',
  'success': 'bg-[#A3E635] text-[#171719]',
  'neutral': 'bg-[#171719] text-[#A3E635]',
};
ghost.className = `... ${semanticColors[status] || semanticColors.neutral}`;
```

---

### P2-5 — Trap Warning Appears Abruptly (`hidden`/`remove('hidden')`)
- **File:** `GsapMorphPlayer.astro:117-123`, `morph-engine.ts:198-205`
- **Fix:** Add a subtle GSAP fade-in (`opacity: 0 → 1`, `duration: 0.2`) when the trap box appears, instead of an instant class toggle.

---

### P2-6 — Audio Player Has No Visual Loading / Error State
- **File:** `morph-engine.ts:222-237`
- **What went wrong:** If `.play()` fails (file missing or CORS), `.catch()` triggers `fallbackWebSpeech()` silently. The user sees no message. If `speechSynthesis` also fails or is unsupported, nothing indicates failure.
- **Fix:** Add a `data-audio-status` text element that updates to `"กำลังเล่น..."`, `"ไม่พบเสียง (ใช้ TTS แทน)"`, or `"ไม่สามารถเล่นเสียงได้"`.

---

### P2-7 — No Speed / Replay Control for Ghost Animation
- **Fix:** Add a subtle "Replay Step" or "Slow Mode" toggle, or at minimum document that users can click dots to replay any step (which works, but isn't signaled).

---

## 3. 💡 High-Impact Refinement Suggestions (Quick Wins & Concrete Tweaks)

### Refinement A — Fix Ghost Clone Token Matching (P1-1)
**File:** `src/components/player/morph-engine.ts` (line 168–211)  
**Action:** Pair `sourceCellIds` and `targetTokenIds` by array index. Filter target query by `data-flip-id="${targetTokenIds[idx]}"`.

```typescript
step.sourceCellIds.forEach((sourceId, idx) => {
  const targetTokenId = step.targetTokenIds?.[idx];
  if (!targetTokenId) return;
  const targetToken = katexMount.querySelector<HTMLElement>(`[data-flip-id="${targetTokenId}"]`);
  // ... proceed with ghost using targetToken
});
```

---

### Refinement B — Prevent Orphaned Ghosts (P1-2)
**File:** `morph-engine.ts`  
**Action:** Before each new animation, call `this.cleanupGhosts()` which removes any `.ghost-clone-element` from `document.body`. Call it at the top of `goToStep()`.

---

### Refinement C — Keyboard Navigation (P1-3)
**File:** `GsapMorphPlayer.astro:171-235`  
**Action:** Add to the `<script>` block:
```typescript
playerEl.setAttribute('tabindex', '0');
playerEl.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); engine.nextStep(); }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); engine.prevStep(); }
  if (e.code === 'Space')     { e.preventDefault(); engine.playAudio(); }
});
```

---

### Refinement D — Enlarge Touch Targets (P1-4, P2-4)
**File:** `GsapMorphPlayer.astro`  
**Action:**
```html
<!-- Dots -->
<button ... class="w-10 h-10 text-xs ...">
<!-- Prev -->
<button ... class="px-4 py-3 ...">
```

---

### Refinement E — Audio Toggle Near Explanation (P1-5)
**File:** `GsapMorphPlayer.astro:102-124`  
**Action:** Insert a secondary toggle inside the explanation header:
```html
<div class="flex items-center gap-2 mb-1">
  <span>...</span>
  <h4 ...>...</h4>
  <button data-audio-toggle-secondary ... class="ml-auto ...">🎙️</button>
</div>
```
Then wire `data-audio-toggle-secondary` to the same `engine.playAudio()` in the script.

---

### Refinement F — Focus Styles & ARIA (P1-6)
**File:** `src/styles/global.css`  
**Action:**
```css
button:focus-visible, [data-audio-toggle]:focus-visible {
  outline: 2px solid #A3E635;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #171719, 0 0 0 4px #A3E635;
}
```
Add `aria-pressed` updates in `updateAudioButtonState()`.

---

## 4. 📱 Mobile & Responsive Observations

### Responsive Behavior
- **Desktop (1440px):** `lg:grid-cols-12` (5/7 split) works well. Tables have `overflow-x-auto`. KaTeX mount has `overflow-x-auto`. Good.
- **Laptop/Tablet (1024px / 768px):** The `lg:` breakpoint activates at 1024px. Below that, columns stack vertically. The data table remains scrollable horizontally. The explanation card spans full width, which improves readability.
- **Mobile (375px):**
  - **Good:** Stacked layout prevents horizontal overflow of the entire page. `select-none` on container prevents accidental text selection.
  - **Bad:** Step dots (`w-7 h-7`) and control buttons (`text-xs`, `px-3 py-1.5`) are too small for reliable thumb tapping. Recommendation: `w-11 h-11` for dots, `px-4 py-3` for buttons.
  - **Bad:** The top-bar header (`flex-wrap`) wraps the audio toggle to a new line on very narrow screens, pushing it away from the formula title. Fine functionally, but slightly disjointed.
- **Formula overflow on mobile:** Some derivations (e.g., `kmeans-distance-centroid` with 8 rows and long Manhattan distance expressions) may cause the KaTeX mount to overflow horizontally despite `overflow-x-auto`. The `min-h-[90px]` can also make the mount feel cramped. Recommendation: `min-h-[120px]` and allow vertical scroll inside the mount (`max-h-[280px] overflow-y-auto`) if needed.

---

## 5. ⭐ Overall Score & Readiness (1–10)

**Score: 5.5 / 10** (Not ready for final exam study without fixes.)

**Reasoning:**
- **Design / Editorial:** 9/10. The Dual-Zoning philosophy (Zone A header vs. Zone B clinical grid) is clearly implemented. Typography (`Space Grotesk`, `JetBrains Mono`), brutalist shadow tokens (`shadow-[4px_4px_0px_#171719]`), `tabular-nums`, and `#171719` / `#A3E635` palette create a cohesive, high-contrast clinical study environment.
- **Data Integrity:** 10/10. All 14 formulas pass validation. Source cell IDs, target token IDs, and dataset rows are fully consistent.
- **Core Animation (GSAP Ghost Clone):** 2/10. The `executeGhostClones()` bug (P1-1) breaks the fundamental pedagogical mechanism. Until fixed, students are misled by incorrect visual mappings.
- **Accessibility / Ergonomics:** 3/10. No keyboard navigation, undersized touch targets, missing focus rings, and disconnected audio control severely limit usability for students with disabilities or mobile-only study setups.
- **Polish / Micro-interactions:** 6/10. Trap warnings, step indicators, filter pills, and jump select work functionally. Missing: smooth transitions for traps, semantic color mapping, audio status feedback, and animation replay controls.

**Readiness Verdict:**  
✅ Safe for **static review** of formula definitions and dataset tables.  
❌ **Not safe** for interactive derivation study or exam prep until P1-1 (ghost clone token mapping) and P1-3 (keyboard navigation) are resolved. Once those are fixed and touch targets enlarged, the score rises to **8.5/10**.

---

*End of Audit. Evidence derived from direct source inspection (`morph-engine.ts`, `GsapMorphPlayer.astro`, `formulas.astro`, `global.css`, `data/formulas/`), build output (`astro build`), and validation script (`npm run validate-formulas`). Browser relay was unavailable (`port 9224` timeout), so visual verification relied on rendered HTML output and CSS inspection.*
