# Lect05 (EDA) — slides 18-26, verbatim visual read

Source PDF: `10301351 DS 1-69 Lect05 Exploratory Data Analysis (EDA).pdf`
Method: existing rendered PNGs in `.research/_pages/L05_pNN.png`, read one at a time
with `vision_analyze` using a verbatim-transcription prompt. No re-render, no PDF re-parse.
Page numbering below = SLIDE number.

Companion file `.research/lect05-numbers.md` is NOT modified by this file.

Transcript convention used throughout:
- `PRINTED:` = value is actually rendered as text/numbers on the slide.
- `INFERRED FROM PICTURE:` = my reading of a drawn shape, not a printed digit.
- `[?]` = a digit I could not read clearly.
- `UNCLEAR:` = explicit list of what I could not read.

---

## Slide 18 — "Investigate an Outlier Before Acting"

**No numeric content (only the slide number 18 is printed).**

Printed numbers: `18` (slide number only).

Formulas printed: `⚠ ผิดสังเกต ≠ ต้องลบ` (an observation problem ≠ must delete).
This is the only mathematical symbol on the slide; it carries no number.

Table of values: NONE.

Flow / labels on the slide:
- Title: "Investigate an Outlier Before Acting"
- Sub-line: "การจัดการ Outlier ต้องตามหลักฐานและ Domain Context ไม่ใช่ลบโดยอัตโนมัติ"
- "⚠ ผิดสังเกต ≠ ต้องลบ"
- Node 1: "Potential Outlier" -> contains a boxplot graphic
- Node 2: "Investigate" -> "ตรวจแหล่งที่มา ความหมาย และผลต่อการวิเคราะห์"
- "Outlier อาจเป็น" -> three items: "Data Error", "Influential Observation", "Rare but Valid Event"
- "เลือก Action ตามหลักฐาน" -> "Verify · Retain · Flag · Transform · Return to Data Preparation"
- Takeaway: "สืบค้นค่าที่ผิดสังเกตก่อนตัดสินใจว่าจะเปลี่ยนข้อมูลหรือไม่"

Boxplot in "Potential Outlier":
- Axis tick labels with digits: NONE PRINTED
- **QUARTILES NOT PRINTED, READ FROM PICTURE**
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR: NOT PRINTED
- Lower Fence / Upper Fence: NOT PRINTED
- Outlier points: three circular points drawn below the lower whisker. **INFERRED
  FROM PICTURE:** 3 outlier markers, no printed values, no numeric axis to read
  them against. No values recoverable.

Other graphics (decorative icons, all with no numeric axis):
- Scatter plot icon in "Influential Observation": no tick labels, no point values.
- Bar chart icon in the bottom middle: no tick labels, no bar values.

Raw data list: NONE.

UNCLEAR: nothing illegible — the slide genuinely contains no digits apart from
the slide number. Nothing to mark `[?]`.

---

## Slide 19 — Tableau "choose the right visualization" gallery

**Not EDA worked figures.** This slide is a 12-panel chart-chooser gallery
(screenshot examples). It carries many printed numbers, all of them Tableau
example values, not five-number-summary arithmetic. Transcribed in full because
they are printed, but flagged as a different data set from any boxplot work.

Printed numbers, by panel (all PRINTED, as read):
- Panel 1: `1`; X `0K 20K 40K 60K 80K`; Y categories `Furniture, Technology, Office Supplies`
- Panel 2: `2`; X `Jan Feb Mar Apr May Jun`; Y `0K 10K 20K 30K 40K`
- Panel 3: `3`; legend scale `0K 100K`
- Panel 4: `4`; `Technology 35%`, `Furniture 30%`, `Office Supplies 20%`, `Others 15%`
- Panel 5: `5`; `Consumer 40%`, `Corporate 25%`, `Home Office 20%`, `Others 15%`
- Panel 6: `6`; X `-10K -5K 0K 5K 10K`; Y `0K 20K 40K 60K 80K`
- Panel 7: `7`; columns `Jan..Jun`; rows `Furniture, Technology, Office Supplies`; colour bar `Low, High`
- Panel 8: `8`; table printed (see below)
- Panel 9: `9`; `Sales $1.82M`; `Profit $231K`; `9,874`
- Panel 10: `10`; `Technology 35%`, `Furniture 30%`, `Office Supplies 20%`, `Others 15%`
- Panel 11: `11`; X `Jan..Jun`; left Y `0K 20K 40K 60K`; right Y `-5K 0K 5K 10K`
- Panel 12: `12`; X `Consumer, Corporate, Home Office, Small Business`; Y `0 20K 40K 60K 80K`
- Slide number: `19`; one icon labelled `ML`

Panel 8 printed table (the only tabular data on the slide):
| Sub-Category | Sales | Profit |
|---|---|---|
| Phones | 43,218 | 6,915 |
| Chairs | 23,504 | 2,523 |
| Tables | 17,725 | -1,788 |
| Binders | 12,486 | 2,109 |
| Storage | 9,852 | 1,605 |

Formulas / arithmetic shown: NONE PRINTED. No subtraction, no IQR, no fence.

Panel 12 boxplot ("Sales Distribution by Segment", "Show distribution using
five-number summary"):
- **QUARTILES NOT PRINTED, READ FROM PICTURE**
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR value and subtraction: NOT PRINTED
- Lower Fence value and arithmetic: NOT PRINTED
- Upper Fence value and arithmetic: NOT PRINTED
- Outlier points and printed values: NO OUTLIER VALUES PRINTED
- Legend labels PRINTED: `Upper Whisker`, `Q3`, `Median`, `Q1`, `Lower Whisker`
  (labels only — no numbers behind them are printed)

Caption line PRINTED: "Tip: Choose the right visualization to reveal insights and
tell your data story!"

UNCLEAR: none. Every digit above was read as printed. Tick labels inside the 12
small panel screenshots are low-resolution; if a specific tick is later needed it
should be re-cropped, but no `[?]` was required at this resolution.

---

## Slide 20 — "Choose a Chart by the Analytical Question"

**No numeric content (only the slide number 20 is printed).**

Printed numbers: `20` (slide number only).

Formulas / arithmetic shown: NONE PRINTED.

Table of values: NONE. Raw data list: NONE.

Five question-to-chart routes printed (text only, no numbers on any icon):
- "เริ่มจากคำถาม: ต้องการให้ผู้ชมเห็นอะไร?"
- `Distribution` — "ข้อมูลกระจายอย่างไร?" → Histogram / Boxplot
- `Comparison` — "กลุ่มแตกต่างกันอย่างไร?" → Bar / Dot Plot
- `Relationship` — "Variables เคลื่อนไปด้วยกันอย่างไร?" → Scatterplot
- `Composition` — "ส่วนย่อยประกอบเป็นภาพรวมอย่างไร?" → Stacked Bar
- `Time` — "ค่าเปลี่ยนตามลำดับเวลาอย่างไร?" → Line Chart
- Takeaway: "เลือก Chart ที่เผยความสัมพันธ์ซึ่งคำถามต้องการคำตอบ"

Boxplot (in the Distribution row):
- **QUARTILES NOT PRINTED, READ FROM PICTURE**
- Axis tick labels: NONE PRINTED
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR: NOT PRINTED; Lower Fence / Upper Fence: NOT PRINTED
- Outlier points and printed values: NONE PRINTED

Other chart icons (Bar/Dot Plot, Scatterplot, Stacked Bar, Line Chart): no tick
labels, no data values printed — decorative.

UNCLEAR: nothing illegible. The slide contains no digits other than the slide
number, so nothing to mark `[?]`.

---

## Slide 21 — "Chart Candidates Are Starting Points, Not Rules"

**No numeric content (only the slide number 21 is printed).**

Printed numbers: `21` (slide number only).

Formulas / arithmetic shown: NONE PRINTED.

Table of values: NONE. Raw data list: NONE.

**No boxplot on this slide.** There is no five-number-summary material here.

Flow printed:
- Sub-line: "★ รายชื่อ Chart ช่วยสร้างทางเลือก แต่การตัดสินใจต้องตรวจ Question, Data Structure, Audience และ Context"
- "เลือก Candidate แล้วต้องตรวจความเหมาะสม"
- Checklist box PRINTED: `✓ Question`, `✓ Data Structure`, `✓ Audience`, `✓ Context`

Four panels, text only:
- Panel 1 `Map` — "ใช้เมื่อ Geography เป็นส่วนหนึ่งของคำถาม"
- Panel 2 `Part-to-whole` — "Pie · Treemap · Packed Bubbles" / "อ่านค่าที่ใกล้กันได้ยาก"
- Panel 3 `Dual Axis Chart` — "แสดง Scale และ Unit อย่างโปร่งใส"
- Panel 4 `Dashboard` — "หลาย Views ที่ทำงานร่วมกัน ไม่ใช่ Chart เดียว"
- Takeaway: "Chart Candidate คือจุดเริ่มต้น ไม่ใช่คำตอบอัตโนมัติ"

Chart icons present (bar, line-with-dots, scatter, pie, treemap, packed bubbles,
combo, table) all decorative:
- Axis tick labels: NONE PRINTED on any icon
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR: NOT PRINTED; Lower Fence / Upper Fence: NOT PRINTED
- Outlier points and printed values: NONE PRINTED
- **QUARTILES NOT PRINTED, READ FROM PICTURE** — no boxplot exists to read

UNCLEAR: nothing illegible. The ruler icon under "Dual Axis Chart" has tick
marks but no printed digits; the slide's only digit is the slide number `21`.

---

## Slide 22 — "Honest Visual Encoding Protects Meaning"

**No numeric content (only the slide number 22 is printed).**

Printed numbers: `22` (slide number only).

Formulas / arithmetic shown: NONE PRINTED.

Table of values: NONE. Raw data list: NONE.

**No boxplot on this slide** — the two charts are bar charts, deliberately
mis-encoded to illustrate honest vs dishonest axis handling.

Printed text:
- Top bar: "Visualization ที่ดีเท่าไหร่ การเปรียบเทียบ ข้อมูลโดยไม่บิดเบือน ข้อมูล หรือแตกต่างจนหลักฐานเปลี่ยนความหมาย"
- Upper-left box (people icon): "ข้อมูลเดียวกัน อาจสร้างความเข้าใจต่างกัน"
- Upper-right box (shield-check icon): "ตรวจ Visual Encoding ก่อนสื่อสาร"
- Heading between charts: "Before vs After"
- Bottom-centre box (target-arrow icon): "เป้าหมาย: ชัดเจน ไม่สร้าง Drama"
- Bottom bar: "Takeaway: Chart ที่ชัดเจนปกป้องหลักฐาน แทนที่จะขยายความน่าตื่นเต้น"

"Before vs After" — two side-by-side bar charts:
- Left bar chart: 6 vertical blue bars, heights descending left to right.
  Y-axis tick marks visible, **NO PRINTED NUMBERS OR LABELS**. X-axis tick marks
  visible, no labels. No values printed on bars.
- Right bar chart: 6 vertical bars (5 solid blue, 1 hatched/diagonal-striped blue,
  approximately 3rd from left). Y-axis tick marks visible, **NO PRINTED NUMBERS OR
  LABELS**. X-axis tick marks visible, no labels. Two black dots in the plot area
  (one near upper left, one near lower centre beside the hatched bar), **no
  printed values associated with them**. **INFERRED FROM PICTURE:** the truncated
  y-axis is the "After" distortion the slide warns about, but no start value or
  tick number is printed anywhere.
- Annotation boxes (right side, with pointer lines): `Context` — Title · Labels ·
  Units; `Comparison` — Baseline · Scale · Ordering; `Emphasis` — Color ·
  Annotation.

Boxplot statistics: none exist here.
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR: NOT PRINTED; Lower Fence / Upper Fence: NOT PRINTED
- Outlier points: points are marked (2 black dots) but **values NOT PRINTED**
- **QUARTILES NOT PRINTED, READ FROM PICTURE** — no boxplot exists to read

UNCLEAR: nothing illegible. The slide's only digit is the slide number `22`; the
bar heights are drawn, not labelled, so no bar value can be recovered.

---

## Slide 23 — "Choose Color by Data Meaning"

**No numeric content (only the slide number 23 is printed).**

Printed numbers: `23` (slide number only).

Formulas / arithmetic shown: NONE PRINTED.

Table of values: NONE. Raw data list: NONE.

**No boxplot and no axis-bearing chart on this slide.**

Printed text:
- Sub-line: "เลือก Color Palette จากความหมายและโครงสร้างของข้อมูล ไม่ใช่จากความสวยงามเพียงอย่างเดียว"
- Box: "เริ่มจากถามว่า สีต้องแทนอะไร?"
- Left panel `Category` — `Qualitative Palette` — "แยกกลุ่มที่ไม่มีลำดับ"
- Centre panel "ต่ำ → สูง" — `Sequential Palette` — "แสดงลำดับบน Scale เดียวกัน"
- Right panel "เบี่ยงจากค่ากลาง" — `Diverging Palette` — "เปรียบเทียบรอบ Meaningful Midpoint"
- Bottom banner: "Takeaway: ความหมายของข้อมูลเป็นผู้กำหนด Palette"

Boxplot statistics:
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR: NOT PRINTED; Lower Fence / Upper Fence: NOT PRINTED
- Outlier points and printed values: NONE PRINTED
- **QUARTILES NOT PRINTED, READ FROM PICTURE** — no boxplot exists to read
- The "ต่ำ → สูง" and "เบี่ยงจากค่ากลาง" labels are directional words, not
  printed values; the swatch strips carry no scale numbers.

UNCLEAR: nothing illegible. The slide's only digit is the slide number `23`.

---

## Slide 24 — "Use Color to Guide Attention"

**No numeric content (only the slide number 24 is printed).**

Printed numbers: `24` (slide number only).

Formulas printed (word forms, no digits):
- "สีเดียวกัน = ความหมายเดียวกัน" (same colour = same meaning)
- "สีบอกผู้ชมว่า 'ควรมองตรงไหน'"
- No arithmetic with digits anywhere on the slide.

Table of values: NONE. Raw data list: NONE.

**No boxplot.** Two bar charts illustrate colour-emphasis technique.

Printed text:
- Sub-line: "ใช้สีเพื่อจัดลำดับความสนใจของผู้ชม โดยให้ Context ถอยลงและ Evidence สำคัญโดดเด่นขึ้น"
- `Context` — "ใช้ Gray ลดน้ำหนักลงประกอบ"
- `Evidence` — "ใช้ Accent Color เน้นสิ่งสำคัญ"
- `Consistency` — "สีเดียวกัน = ความหมายเดียวกัน"
- "อธิบายสีด้วย Label หรือ Legend เมื่อจำเป็น"
- Takeaway: "ใช้สีให้น้อย แต่ใช้ทุกสีอย่างตั้งใจ"

Left bar chart:
- Axis tick labels: NONE PRINTED
- Bars (7, no data labels), colour order: blue, green, purple, yellow/gold, teal, red, brown/tan
- **INFERRED FROM PICTURE:** every bar is a different colour, i.e. the
  "rainbow" anti-pattern the slide warns against. No heights readable against a scale.

Right bar chart:
- Axis tick labels: NONE PRINTED
- Bars (7, no data labels), colour order: dark gray, medium gray, light gray,
  orange (tallest, carries a small orange dot on the bar), gray, gray, gray
- **INFERRED FROM PICTURE:** the single orange bar is the "Evidence" emphasis.
- No heights readable against a scale.

Boxplot statistics — none exist on either chart:
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR value and subtraction: NOT PRINTED
- Lower Fence value and arithmetic: NOT PRINTED
- Upper Fence value and arithmetic: NOT PRINTED
- Outlier points: an orange dot is drawn on the tallest orange bar, **value NOT PRINTED**
- **QUARTILES NOT PRINTED, READ FROM PICTURE** — no boxplot exists to read

UNCLEAR: nothing illegible. The slide's only digit is the slide number `24`.

---

## Slide 25 — "Never Rely on Color Alone"

**No numeric content (only the slide number 25 is printed).**

Printed numbers: `25` (slide number only).

Formulas / arithmetic shown: NONE PRINTED.

Table of values: NONE. Raw data list: NONE.

**No boxplot, no axis-bearing chart, no data values.**

Printed text:
- Sub-line: "Visualization ที่เข้าถึงได้ต้องสื่อความหมายด้วยนากกว่าสีเพียงอย่างเดียว"
- "ถ้าสีหายไป ความหมายต้องยังอยู่"
- Three renderings of the same bar set, PRINTED labels:
  `Full Color ✓` -> `Color Vision Deficiency Simulation ✓` -> `Grayscale ✓`
- Heading: `Redundant Encoding`
- `Color + Label` — sample glyph row (solid bar, dashed bar, dotted bar)
- `Color + Shape` — `●`, `■`, `▲`
- `Color + Pattern หรือ Line Style` — solid / dashed / dotted line samples
- Heading: `Accessibility Check`
- `✓ ตรวจ Color Vision Deficiency`
- `✓ ทดสอบ Grayscale`
- Takeaway: "สีช่วยเสริมหลักฐาน แต่ต้องไม่เป็นหลักฐานเพียงอย่างเดียว"

Boxplot statistics: none exist on this slide.
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR: NOT PRINTED; Lower Fence / Upper Fence: NOT PRINTED
- Outlier points and printed values: NONE PRINTED
- **QUARTILES NOT PRINTED, READ FROM PICTURE** — no boxplot exists to read
- The bar sets are a repeating 3-bar sample (solid / dashed / dotted) with no
  scale, so no bar value can be recovered.

UNCLEAR: nothing illegible. The slide's only digit is the slide number `25`.

---

## Slide 26 — "Exploratory and Explanatory Visualizations Serve Different Purposes"

**No numeric content (only the slide number 26 is printed).**

Printed numbers: `26` (slide number only).

Formulas / arithmetic shown: NONE PRINTED.

Table of values: NONE. Raw data list: NONE.

**No boxplot on this slide.** Four charts, none with a printed numeric axis.

Printed text:
- Sub-line: "Exploration ค้นหาหลักฐานอย่างกว้าง ส่วน Explanation เลือกหลักฐานที่เกี่ยวข้องมาสื่อสารอย่างชัดเจนและมี Context"
- "ข้อมูลเดียวกัน เป้าหมายต่างกัน"
- `Exploratory Visualization` — "สำหรับ Analyst" — "หลายคำถาม · หลายมุมมอง · รายละเอียดมาก"
- "ค้นหา Candidate Evidence" — "จาก Explore สู่ Explain"
- Pipeline PRINTED: `Select →` `Simplify →` `Contextualize →` `Refine`
- `Explanatory Visualization` — "สำหรับ Audience" — "หนึ่งข้อความหลัก · หลักฐานที่เลือก · Context ที่จำเป็น"
- "สื่อสารสิ่งที่สำคัญอย่างชัดเจน"
- Takeaway: "สำรวจอย่างกว้างเพื่อตนเอง แล้วอธิบายอย่างเลือกสรรเพื่อ Audience"

Charts:
- Left chart (Exploratory): dot plot with blue circles, orange hatched squares,
  green triangles. Axis tick labels: NONE PRINTED. Point values: NONE PRINTED.
- Middle chart (Exploratory): density curves (blue solid, orange dashed, green
  dashed) with a bottom legend. Axis tick labels: NONE PRINTED. No printed values.
- Right chart (Exploratory): scatter plot, same three marker types. Axis tick
  labels: NONE PRINTED. Point values: NONE PRINTED.
- Right chart (Explanatory): scatter plot, same three marker types, with one
  green triangle circled and labelled `A'`. Axis tick labels: NONE PRINTED.
  `A'` is the only printed data label on the slide and it carries **no number**.

Boxplot statistics: none exist.
- Min / Q1 / Median / Q3 / Max: NOT PRINTED
- IQR: NOT PRINTED; Lower Fence / Upper Fence: NOT PRINTED
- Outlier points: one circled marker labelled `A'`, **no numeric value printed**
- **QUARTILES NOT PRINTED, READ FROM PICTURE** — no boxplot exists to read

UNCLEAR: nothing illegible. The slide's only digit is the slide number `26`.

---

## Coverage index for slides 18-26

All nine pages were read individually with `vision_analyze`. No page failed and
no rate-limit error occurred, so no `[?]` digit was ever needed.

| Slide | Title | Printed numbers present | Numeric-content verdict |
|---|---|---|---|
| 18 | Investigate an Outlier Before Acting | slide no. only | NO numeric content |
| 19 | (Tableau visualization gallery) | yes — many, see above | Numbers, but **not** EDA figures |
| 20 | Choose a Chart by the Analytical Question | slide no. only | NO numeric content |
| 21 | Chart Candidates Are Starting Points, Not Rules | slide no. only | NO numeric content |
| 22 | Honest Visual Encoding Protects Meaning | slide no. only | NO numeric content |
| 23 | Choose Color by Data Meaning | slide no. only | NO numeric content |
| 24 | Use Color to Guide Attention | slide no. only | NO numeric content |
| 25 | Never Rely on Color Alone | slide no. only | NO numeric content |
| 26 | Exploratory and Explanatory Visualizations Serve Different Purposes | slide no. only | NO numeric content |

**Slides with no numeric content: 18, 20, 21, 22, 23, 24, 25, 26** (eight of nine).
Only **slide 19** carries printed figures, and they are Tableau gallery example
values, not five-number-summary / IQR / fence arithmetic.

### Negative findings relevant to the parent task

The EDA worked figures the guide needs — a concrete data set, Min / Q1 / Median /
Q3 / Max, IQR with its subtraction, Lower Fence, Upper Fence, and named outlier
values — **do not exist anywhere in slides 18-26.** Nothing in that range prints
an IQR value, a fence value, or a `Q1 - 1.5 × IQR` style formula. Every boxplot in
this range is either a decorative icon (slides 18, 20) or a tiny Tableau
screenshot with legend words but no numbers (slide 19 panel 12).

Every boxplot encountered was recorded as **QUARTILES NOT PRINTED, READ FROM
PICTURE**, with the reading marked as inferred from the drawing where a shape
could be counted (e.g. 3 outlier markers on slide 18, 2 unlabelled dots on
slide 22). No picture reading was promoted to a printed number.

If the five-number-summary / IQR / fence arithmetic is needed for the guide, it
must come from **slides 10-16**, which are outside the range read here and which
`lect05-numbers.md` lists as still unread.
