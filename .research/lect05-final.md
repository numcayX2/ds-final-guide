# Lecture 05 — Final Numeric Sweep (slides 2–9)

Source PDF: `C:\Users\Acer\Downloads\10301351 DS 1-69 Lect05 ...pdf`
Method: vision transcription of already-rendered page PNGs (no re-render, no PDF parsing).
Rule: every number below is transcribed as printed. `[?]` = digit not legible. Nothing is inferred or supplied from outside the slides.

---

## Slide 2

**Heading (verbatim):** "Hero: The Complete CRISP-DS Workflow" / "Chapter 05: Exploratory Data Analysis"

**Content blocks (verbatim):**
- CRISP-DS Workflow: Business Understanding / Data Understanding / Data Preparation / Exploratory Data Analysis / Modeling / Evaluation / Deployment & Communication
- "Iterative Workflow"
- Right-margin Thai annotation (partially obscured by the curved arrow): "Initial EDA เริ่มต้น Data Understanding และทำซ้ำหลัง Data Preparationได้"
- "Exploratory Data Analysis (EDA) คือขั้นที่เชื่อมข้อมูลที่เตรียมแล้วไปสู่หลักฐาน แบบจำลอง การสื่อสาร และคุณค่า"
- "Takeaway: EDA เชื่อมข้อมูลที่เตรียมแล้วกับขั้นต่อไปของ Data Science Workflow"

**Every printed number, in reading order:** `05` (chapter number in title), `2` (page number, bottom right).

**Arithmetic shown:** none.

**Five-number summary / IQR / fences:** **NO.** Slide is a workflow diagram plus prose only.

**Charts or tables:** NONE (no chart, histogram, box plot, or table).

**UNCLEAR:** spacing/punctuation inside the right-margin Thai annotation block is partly hidden by the curved arrow arrowhead. No illegible digits; page number `2` is clear.

---

## Slide 3

**Heading (verbatim):** "EDA Is an Iterative Checkpoint" — Thai subtitle: EDA moves the workflow forward when evidence is clear, and sends it back for review when questions, ambiguous meanings, or problematic data appear.

**Content blocks (verbatim):**
- Centre box: "Exploratory Data Analysis" (magnifying-glass icon)
- Left green downward flow, label "เดินหน้า": "หลักฐานน่าเชื่อถือ" (shield/check), "Pattern และ Insight" (lightbulb), "การวิเคราะห์ขั้นต่อไป" (bar chart)
- Right red downward flow, label "ย้อนกลับไปทบทวน", into a dashed red box: "คำถามไม่ชัด" → "Analytical Question"; "ความหมายคลุมเครือ" → "Data Understanding"; "ข้อมูลหรือ Feature มีปัญหา" → "Data Preparation"
- Red loop arrow from the dashed box back to the central EDA box
- "Takeaway: เมื่อ EDA พบจุดอ่อน ต้องย้อนกลับก่อนเดินหน้าต่อ"

**Every printed number, in reading order:** `3` (page number, lower right). No other digits anywhere on the slide.

**Arithmetic shown:** none.

**Five-number summary / IQR / fences:** **NO.**

**Charts or tables:** NONE (flow diagram with icons only; no chart, no histogram, no box plot, no table).

**UNCLEAR:** nothing. All text and icons legible.

---

## Slide 4

**Heading (verbatim):** "Begin EDA with an Analytical Question" — Thai subtitle: the analytical question determines which variables to select, summarise, compare, and present as evidence.

**Content blocks (verbatim):**
- Green check: "เริ่มด้วย Analytical Question"
- Four-step green-bordered flowchart: "Analytical Question" (speech-bubble question icon) → "ตัวแปรที่เกี่ยวข้อง" (clipboard checklist icon) → "Summary และ Comparison" (table + bar-chart icons with double-headed arrows) → "Visualization ที่ตอบคำถาม" (bar chart + magnifier icons)
- Example question text inside box 1: "พฤติกรรมการซื้อแตกต่างกันระหว่างกลุ่มลูกค้าหรือไม่?"
- Red warning triangle: "อย่าเริ่มด้วย สร้างกราฟ แล้วค่อยหาว่าน่าสนใจอะไร"
- "Takeaway: อย่าเริ่ม EDA ด้วยกราฟ ให้เริ่มด้วยคำถาม"
- Bottom-right decorative row of chart-type icons (histogram, scatter, bar, box plot, line, pie, dots) with a grey right-arrow struck through by a grey diagonal line — decorative only, no axes or values

**Every printed number, in reading order:** `4` (page number, bottom right). No other digits anywhere on the slide.

**Arithmetic shown:** none.

**Five-number summary / IQR / fences:** **NO.** Note: a box-plot *icon* appears in the decorative icon strip, but it carries no data, no axis, and no values.

**Charts or tables:** NONE (flowchart + decorative icons only; no data-bearing chart, histogram, box plot, or table).

**UNCLEAR:** nothing illegible.

---

## Slide 5

**Heading (verbatim):** "Inspect Data Context Before Summarizing" — Thai subtitle: "สถิติหรือกราฟจะมีความหมาย เมื่อเรารู้ว่าข้อมูลวัดอะไร วัดจากใคร ใช้หน่วยใด และมีข้อมูลที่ใช้ได้มากเพียงใด"

**Content blocks (verbatim):**
- Centre: "ก่อนสรุปข้อมูล ให้ตรวจ Data Context"
- Top-left box: "Observation" / "หนึ่งแถวแทน" / "ใครหรืออะไร?"
- Top-right box: "Meaning & Unit" / "ตัวแปรหมายถึงอะไร" / "และใช้หน่วยใด?"
- Bottom-left box: "Usable Data" / "มีข้อมูลทั้งหมด" / "ข้อมูลที่ใช้ได้" / "และ Missing เท่าไร?"
- Bottom-right box: "Relevant Groups" / "กลุ่มใดเกี่ยวข้องกับ" / "Analytical Question?"
- "Takeaway: รู้ว่าข้อมูลแทนอะไร ก่อนเชื่อสิ่งที่ข้อมูลสรุป"
- Central illustration: grid/table icon with person, shopping-cart, price-tag and gift-box icons, plus a shopping cart, a person and a heart icon — **no data values**

**Every printed number, in reading order:** `5` (page number, bottom right). No other digits anywhere on the slide.

**Arithmetic shown:** none.

**Five-number summary / IQR / fences:** **NO.**

**Charts or tables:** NONE (the grid icon is decorative and carries no readable values).

**UNCLEAR:** nothing.

---

## Slide 6

**Heading (verbatim):** "The Best Measure of Center Depends on the Evidence" — Thai subtitle: the right centre measure depends on Data Type, Distribution, outliers (ค่าผิดปกติ), and the Analytical Question.

**Content blocks (verbatim):**
- Centre box: "ค่าทั่วไปของข้อมูลคืออะไร?"
- Column **Mean**: right-skewed curve with green (Median) and blue (Mean) markers and trailing dots. Bullets: "ใช้ข้อมูลทุกค่า" / "เหมาะเมื่อค่าสุดขั้วไม่ครอบงำภาพรวม"
- Column **Median**: ordered dots with green centre dot/line. Bullets: "ค่ากึ่งกลางตามลำดับ" / "เหมาะเมื่อข้อมูลมีหรือมีค่าสุดขั้ว"
- Column **Mode**: assorted coloured shapes (circles, squares, triangles, stars, diamonds). Bullets: "ค่าหรือ Category ที่พบบ่อยที่สุด" / "เหมาะเมื่อสนใจสิ่งที่เกิดบ่อย"
- Selection strip: "เลือกจาก | Data Type + Distribution + Analytical Question"
- Takeaway: choose the centre measure that fits the evidence, not the most familiar one
- Footer: Mean → Quantitative Data; Median → ordered/numerical data; Mode → Categorical data

**Every printed number, in reading order:** `6` (page number, bottom right). No other digits anywhere on the slide.

**Arithmetic shown:** none. No mean/median/mode *value* is computed anywhere on this slide — only conceptual definitions.

**Five-number summary / IQR / fences:** **NO.** The slide references "ค่าสุดขั้ว" (outliers) only in prose, with no numeric fence calculation.

**Charts or tables:** NONE (schematic distribution/illustration graphics only — no axis, no scale, no data values).

**UNCLEAR:** nothing. All text and figures legible.

---

## Slide 7  ← closest approach so far, still no worked numbers

**Heading (verbatim):** "Spread Shows What the Center Leaves Out"
- "ข้อมูลสองกลุ่มอาจมีค่ากลางเท่ากัน แต่มีระดับและรูปแบบการกระจายต่างกันมาก"
- "ค่ากลางเท่ากัน ≠ ข้อมูลเหมือนกัน"

**Content blocks (verbatim):**
- "Customer Segment A" — "ค่าการซื้อกระจุกใกล้ค่ากลาง" — "Spread ต่ำ"
- "Customer Segment B" — "ค่าการซื้อกระจายกว้าง" — "Spread สูง"
- "Variance มีหน่วยยกกำลังสอง"
- "SD มีหน่วยเดียวกับข้อมูล"
- "มอง Spread ผ่าน"
  - "Range — ช่วงจาก Minimum ถึง Maximum"
  - "IQR — ช่วงของข้อมูลกึ่งกลาง 50%"
  - "Variance / Standard Deviation — การกระจายรอบ Mean"
- "Takeaway: | Center บอกค่าทั่วไป ส่วน Spread บอกว่าค่านั้นแทนข้อมูลได้สม่าเสมอเพียงใด"

**Every printed number, in reading order:** `50%` (in the IQR definition line), `7` (page number). No other digits anywhere on the slide.

**Arithmetic shown:** only the symbol `≠` (in "ค่ากลางเท่ากัน ≠ ข้อมูลเหมือนกัน"). No sum, product, subtraction or formula.

**Five-number summary / IQR / fences:** **NO worked example.** IQR is *defined* ("ช่วงของข้อมูลกึ่งกลาง 50%") but no Q1, Q3, minimum, maximum or computed IQR value appears. There is no `Q3 − Q1` line and no `Q1 − 1.5 × IQR` / `Q3 + 1.5 × IQR` fence line anywhere on the slide.

**Diagrams — every element and its label (all unlabelled numerically):**
- *Segment A bell curve*: horizontal spread axis (left/right arrows, **no tick values**); vertical density axis (**no tick values**); centre vertical dashed line (**value not shown**). Narrow spread.
- *Segment B bell curve*: same axes, same centre vertical dashed line (**value not shown**). Wide spread. Both segments draw the same centre — the point of the slide — but neither centre is given a number.
- *Range diagram*: horizontal line, left end tick labelled **Minimum** (no value), right end tick labelled **Maximum** (no value), centre dot (no value).
- *IQR diagram*: horizontal line with left and right end ticks, inner ticks, and a centre dot representing the median (**no value**). Only the word `50%` in the label.
- *Variance / Standard Deviation diagram*: horizontal dashed line with centre dot labelled **Mean** (no value), left/right dashed arrows for spread (no values), end ticks (no values).
- **Net: zero numeric data points on any axis or point on this slide.**

**UNCLEAR:** the takeaway reads "สม่าเสมอ" where "สม่ำเสมอ" may have been intended; transcribed as printed. All other text legible. No illegible digits.

---

## Slide 8

**Heading (verbatim):** "Distribution Shape Changes Interpretation" — Thai subtitle: "การเข้าใจค่าทั่วไปต้องเห็นว่า Observation กระจายตัวอย่างไร ไม่ใช่ดูเพียง Center และ Spread"

**Content blocks (verbatim):**
- Centre line: "Summary อาจคล้ายกัน แต่ Distribution Shape ต่างกัน"
- 2×2 grid of distribution illustrations:
  - **Symmetric** — bell curve — "ข้อมูลสมดุลรอบค่ากลาง"
  - **Skewed** — right-tailed curve — "หางยาวดิ่งค่ากลางบางชนิด"
  - **Multiple Peaks** — bimodal curve — "อาจมีหลายกลุ่มซ่อนอยู่"
  - **Gaps / Long Tail** — curve with a gap and a tail — "มีโครงสร้างหรือค่าที่ควรตรวจสอบ", "Gap อาจเกิดจากโครงสร้างกลุ่มหรือการเก็บข้อมูล", "Long Tail เป็นลักษณะการกระจาย"
- Box: "Interpret with Center + Spread + Shape + Context"
- "Takeaway: | เชื่อ Summary เมื่อเห็น Distribution ที่อยู่เบื้องหลัง"

**Every printed number, in reading order:** `8` (page number, lower right). No other digits anywhere on the slide.

**Arithmetic shown:** none. (`+` appears only in the word-list "Center + Spread + Shape + Context", not as arithmetic.)

**Five-number summary / IQR / fences:** **NO.**

**Charts — four distribution curves (Symmetric, Skewed, Multiple Peaks, Gaps / Long Tail). Data points: none.** All four are qualitative schematics with **no axis, no tick marks, no scale and no data values**. There is nothing to transcribe point-by-point.

**UNCLEAR:** nothing.

---

## Slide 9

**Heading (verbatim):** "Statistics and Visualizations Are Complementary Evidence"

**Content blocks (verbatim):**
- Left (raw-data icons: basket, lined document, checklist) →
- Centre box **Summary Statistics** (calculator icon, blue border): "สรุปขนาดและช่วยเปรียบเทียบอย่างแม่นยำ"
- Centre box **Visualization** (bell-curve icon, green border): "เผย Distribution Shape และสิ่งที่คาดตัวเลขอาจซ่อนไว้"
- Right box **Interpret Together** (magnifier/chart icon, purple border): "ตัวเลขบอกว่า "เท่าไร"" / "ภาพช่วยให้เห็นว่า "กระจายอย่างไร""
- "Takeaway: ใช้ Statistics เพื่อความแม่นยำ ใช้ Visualization เพื่อเห็นโครงสร้าง"

**Every printed number, in reading order:** `9` (page number, bottom right). No other digits anywhere on the slide.

**Arithmetic shown:** none.

**Five-number summary / IQR / fences:** **NO.**

**Charts or tables:** NONE. The bell-curve icon is decorative and carries no data.

**UNCLEAR:** nothing. All text and the page number fully legible.

---

## Task 2 — Lecture 07, slide 20

Source PDF: `C:\Users\Acer\Downloads\10301351 DS 1-69 Lect07 Decision Tree and Classifier Evaluation.pdf` (36 pages)
Page index 19 (0-based) = slide 20. Rendered at dpi 115, 1534 × 863 px.
Note: the `load_page` tool referenced in the task is not exposed in this session; the page was rendered with PyMuPDF at the same dpi 115 spec. The result was **md5-identical** (`bc4aeb5b6b270c5535a2c961e47b25dc`) to the pre-existing `.research\_pages\L07_p20.png`, which confirms the file on disk is exactly page index 19 at dpi 115.

**Heading (verbatim):** "Training and Validation Patterns Reveal Fit Problems"
Thai subtitle: "ความสัมพันธ์ระหว่าง Training และ Validation Performance ช่วยบอกว่า Tree เรียนรู้น้อยเกินไป เหมาะสม หรือจดจำรายละเอียดของ Training Data มากเกินไป"
Centre message: "Read the Pattern, Not One Score" — "เปรียบเทียบระดับ Performance และขนาดของ Train-Validation Gap"

**Every printed number:** **none.** No printed digits, page numbers, percentages, axis values or numeric labels appear anywhere on this slide. (This deck's other slides do carry page numbers; this one does not, per the transcription.)

**Arithmetic shown:** none.

**Panel content (verbatim, with every plotted element):**
- Shared y-axis: a bare upward arrow at far left over a horizontal baseline. **No axis title, no tick marks, no numeric labels, no grid values.** A dedicated zoom pass over the full diagram band confirmed zero digits, zero percent signs and no hidden annotations between panels.
- **Panel 1** — x-label "Low Training + Low Validation": Training = solid dark-blue circle, positioned **Low**; Validation = hollow blue-outlined circle with a short dashed vertical drop, positioned **Low**, just below Training. → green banner "Likely Underfitting" → "Tree อาจง่ายเกินไป ควรตรวจสอบ Complexity หรือ Features"
- **Panel 2** — x-label "Strong Training + Similar Validation": Training = solid dark-blue circle at **Strong/High**; Validation = hollow circle with a small dashed drop at **Strong/High**, nearly equal. → green banner "Likely Appropriate Fit" → "Model เรียนรู้ Pattern ที่นำไปใช้กับข้อมูลใหม่ได้"
- **Panel 3** — x-label "Strong Training + Materially Lower Validation": Training = solid dark-blue circle at **Strong/High** (highest); Validation = hollow circle far below, with a long dashed line and a **double-headed vertical arrow** marking the gap. → green banner "Likely Overfitting" → "Tree อาจจำ Training Details มากเกินไป ควรตรวจสอบการลด Complexity"

**Data points with values:** none — all three panels plot *relative* positions only. The Training/Validation levels are described in words (Low / Strong / Materially Lower), never as numbers, and the Train-Validation Gap is shown as an unlabelled arrow.

**Tables:** none. Confusion matrix absent.

**Evidence Boundary box** (shield icon): "Score Pattern สนับสนุนการวินิจฉัย แต่ยังไม่ใช่ข้อพิสูจน์เพียงอย่างเดียว"
**Takeaway box** (lightbulb icon): "วินิจฉัย Overfitting จากหลักฐานเปรียบเทียบ ไม่ใช่ Training Accuracy เพียงค่าเดียว"

**UNCLEAR:** nothing. All text, icons and diagram elements legible.

---

# VERDICT

## Question: does Lecture 05 contain a worked five-number summary, IQR, or outlier-fence example that can be published?

# **NO.**

Not one publishable number exists anywhere in the slides examined. Specifically:

- **No five-number summary.** No slide prints a minimum, Q1, median, Q3 or maximum *value*. The words "Minimum" and "Maximum" appear on slide 7 only as the two ends of an unlabelled Range diagram; no number is attached to either tick.
- **No IQR arithmetic.** "IQR" appears on slide 7 once, inside the Thai definition "IQR — ช่วงของข้อมูลกึ่งกลาง 50%". The only digit on that line is `50%`, which is part of the *definition* of IQR (the middle 50% of data), **not** a computed IQR. There is no `Q3 − Q1` line and no resulting IQR value anywhere in slides 2–9.
- **No outlier fences.** No `Q1 − 1.5 × IQR` / `Q3 + 1.5 × IQR` expression, and no fence values, appear on any slide examined. The concept of outliers ("ค่าสุดขั้ว") is discussed in prose on slide 6 and slide 7, with zero numeric illustration.
- **No chart carries data.** Every distribution, range, IQR and box-plot graphic on slides 7 and 8 is an unlabelled schematic: bare arrow axes, no ticks, no scale, no data points. The box-plot symbol on slide 4 is a decorative icon in a struck-through icon strip.

**Slides examined to reach this conclusion (Lecture 05):** 2, 3, 4, 5, 6, 7, 8, 9 — all eight, read individually by vision transcription.
Previously covered by earlier sweeps (per task brief): 12–16 (conceptual only, no figures) and 18–26 (no five-number summary, no IQR, no fences; only digits were an unrelated Tableau gallery on slide 19).

**Complete inventory of every digit printed on slides 2–9:** `05` (chapter number, slide 2), `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` (page numbers, one per slide), and `50%` (slide 7, inside the IQR definition). That is the entire set. Every one is either a page number or part of a definition — none is a data value.

## Question: does Lecture 07 slide 20 contain figures to transcribe?

# **NO.**

Slide 20 is a qualitative three-panel conceptual diagram of train-vs-validation patterns (underfitting / appropriate fit / overfitting). It contains **zero printed numbers**, and the confirming zoom pass over the diagram band found no tick labels, no percentages and no axis scale. There is nothing to transcribe.

**Slide 20 examined:** 1 page, page index 19 of 36, rendered at dpi 115 and read twice (full slide, then a zoomed numeric audit of the chart region). Render verified byte-identical to the on-disk PNG.
