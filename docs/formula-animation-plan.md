# Specification & Implementation Plan: Animated Formula Engine
## For Data Science Final Guide (`ds-final-guide`)

> **Context**: This document specifies the design, architecture, and implementation blueprint for an **Interactive Tokenized Formula Animation Engine** in the Data Science Final Exam Web App (`ds-final-guide`).  
> **Reference Style**: Inspired by educational explainer physics/math videos (e.g. `@kradardtod`), featuring clean UI surfaces, color-coded equation tokens, step-by-step number substitutions, and live parameter responsiveness.

---

## 1. Project Context & Tech Stack

- **Framework**: Next.js 16.3.8 (App Router, Turbopack)
- **UI & Runtime**: React 19.2.8, TypeScript 5
- **Styling**: Tailwind CSS v4, Radix UI Themes (`@radix-ui/themes`, `@radix-ui/react-icons`)
- **Animation**: `motion` (`motion/react` v14.0.0 / Framer Motion successor)
- **Charts / Visuals**: HTML5 Canvas 2D, SVG, Chart.js 4.5.1
- **Background Philosophy**: Clean modern web surface (`var(--bg)`, `var(--surface)`), **NO** simulated paper texture; focus 100% on pedagogical formula animation.

---

## 2. Core Concept: "Tokenized Animated Formula"

Instead of static math formulas rendered as plain text or images, equations are living, interactive components with **4 distinct animation phases**:

```
[Phase 1: Symbolic Form] ──► [Phase 2: Anatomy Breakdown] ──► [Phase 3: Live Substitution] ──► [Phase 4: Reduction & Result]
  Color-coded tokens            Token role & unit legend         Symbols morph into numbers       Step-by-step math + Answer badge
```

### Key Pillars:
1. **Tokenized Color-Coding**:
   - Every variable has a semantic color pill matching the accompanying diagram (e.g., $Q_3$ is Cyan, $IQR$ is Orange, $TP$ is Emerald, $FP$ is Rose).
2. **Variable Anatomy Breakdown**:
   - Interactive callout legend directly under the equation explaining symbol, unit, and physical intuition.
3. **Step-by-Step Morphing (`motion.dev` `layoutId`)**:
   - Variables smoothly transform from symbols (e.g., $Q_3$) into actual numerical values (e.g., `30.0`) using FLIP layout animations.
   - Fractions and operations reduce step-by-step down to the final highlighted result badge.
4. **Bidirectional Hover Linkage**:
   - Hovering over a token in the formula illuminates the corresponding element in the visual diagram (and vice-versa).
5. **Live Parameter Sensitivity**:
   - Users can tweak parameters (via sliders/steppers) to watch the formula values, intermediate arithmetic, and visual plot update in real time.

---

## 3. Data Science Equation Mapping (Lectures 05–09)

The engine applies directly to the 5 core exam formulas in `components/episode-player.tsx`:

### 1. Decision Tree Split (Gini Impurity — Lect 06-07)
- **Equation**:
  $$\text{Gini}(D) = 1 - \sum_{i=1}^{C} p_i^2$$
- **Tokens**:
  - $p_1 = \frac{|D_{\text{pass}}|}{|D|}$ (Emerald), $p_2 = \frac{|D_{\text{fail}}|}{|D|}$ (Rose)
- **Substitution Step**:
  $$1 - \left[\left(\frac{6}{10}\right)^2 + \left(\frac{4}{10}\right)^2\right] = 1 - [0.36 + 0.16] = \mathbf{0.48}$$
- **Weighted Split Reduction**:
  $$\text{Gini}_{\text{split}} = \frac{|D_L|}{|D|}\text{Gini}_L + \frac{|D_R|}{|D|}\text{Gini}_R$$

### 2. Tukey's Fences & Outliers (Lect 05)
- **Equation**:
  $$\text{IQR} = Q_3 - Q_1$$
  $$\text{Fences} = [Q_1 - 1.5 \times \text{IQR},\;\; Q_3 + 1.5 \times \text{IQR}]$$
- **Tokens**:
  - $Q_1$ (Blue), $Q_3$ (Cyan), $\text{IQR}$ (Amber), Constant $1.5$ (Purple)
- **Substitution Step**:
  $$\text{Upper Fence} = 30 + 1.5 \times (8) = 30 + 12 = \mathbf{42.0}$$
- **Diagram Link**: Values above $42.0$ trigger an alert badge and pulse as outliers on the boxplot.

### 3. Confusion Matrix Metrics (Lect 08)
- **Equations**:
  $$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}, \quad \text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}, \quad F_1 = 2 \times \frac{P \times R}{P + R}$$
- **Tokens**:
  - $\text{TP}$ (Emerald), $\text{FP}$ (Amber), $\text{FN}$ (Rose), $\text{TN}$ (Slate)
- **Live Link**: Moving the classification threshold changes cell counts and recalculates metric gauges live.

### 4. K-Means Clustering Distance (Lect 08-09)
- **Equations**:
  $$d(p, c) = \sqrt{(x_p - c_x)^2 + (y_p - c_y)^2}$$
  $$c_{\text{new}} = \left(\frac{1}{N}\sum x_i, \; \frac{1}{N}\sum y_i\right)$$
- **Tokens**:
  - Point coordinates $(x_p, y_p)$ (Blue), Centroid coordinates $(c_x, c_y)$ (Orange)
- **Live Link**: Dragging a data point on the canvas updates the coordinates inside the radical live.

---

## 4. Component Architecture Blueprint

### Target Component: `components/animated-formula.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export type FormulaPhase = "symbolic" | "breakdown" | "substituted" | "solved";

export interface FormulaToken {
  id: string;
  symbol: string;
  label: string;
  colorClass: string; // e.g., "bg-blue-500/15 text-blue-600 dark:text-blue-400"
  unit?: string;
  value?: number | string;
  roleDescription: string;
}

export interface AnimatedFormulaProps {
  title: string;
  tokens: FormulaToken[];
  symbolicExpr: React.ReactNode;
  substitutedExpr: React.ReactNode;
  reducedExpr?: React.ReactNode;
  finalResult: {
    label: string;
    value: string | number;
    badgeColor?: string;
  };
  onTokenHover?: (tokenId: string | null) => void;
  activeTokenId?: string | null;
}
```

### Lifecycle States & Animation Triggers:
1. **Symbolic Mode**:
   - Renders equation with `<motion.span>` tags for each token.
   - Click/hover triggers `onTokenHover(token.id)`.
2. **Breakdown Drawer**:
   - Grid of tokens showing what each variable means with badges and units.
3. **Substituted Mode**:
   - `motion.dev` transition smoothly animates tokens into their numeric representations.
4. **Solved Mode**:
   - Displays final answer with animated counting / highlight pulse.

---

## 5. Implementation Roadmap

1. **Phase 1: Foundation Component**
   - Create `components/animated-formula.tsx` with clean TypeScript types and smooth phase transitions using `motion/react`.
2. **Phase 2: Pilot Episode Integration**
   - Integrate into **EP 02 (Decision Tree / Gini)** or **EP 01 (Boxplot Outlier)** in `components/episode-player.tsx`.
3. **Phase 3: Bidirectional Diagram Sync**
   - Connect hover events so hovering a formula token highlights corresponding shapes/points in the SVG/Canvas viewer.
4. **Phase 4: Parameter Controls (Interactive Sliders)**
   - Allow users to tweak input numbers and see the entire substitution calculate in real time.
