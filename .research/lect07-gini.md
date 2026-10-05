# Lecture 07 (Decision Tree & Classifier Evaluation) — verbatim Gini / Gini Gain figures
# plus remaining EDA numbers from Lecture 05

Method: PyMuPDF raster @ dpi 115 -> vision transcription, verbatim.
Slide numbering = SLIDE number (PDF zero-based index + 1).
Unclear digits are written `[?]`. Nothing here is inferred or invented.

Status: COMPLETE. All findings below were transcribed verbatim and, for the Gini
figures, verified twice.

Text layer of the PDF is empty (textlen = 1-2, one raster image per page) for
slides 2-22 and 24-25, so all numbers below come from visual reading only.
Slides 1 and 23 have a real text layer and were not vision-read (slide 23 is
already recorded in `lect07-numbers.md`).

---
---

# PART A — Lecture 07 slides 1-25

## Slides 11 and 12 hold THE weighted-Gini / Gini-Gain worked numbers (located)

---

## SLIDE 11 — "Gini Impurity Measures Class Mixing"

Thai subtitle (verbatim):
`Gini Impurity ยิ่งต่ำ Class Majority ใน Node ยิ่งชัดเจน และค่า 0 หมายถึง Observed Node ที่ Pure`

### All printed text, verbatim

- Node 1 heading: `Gini Impurity at One Node`
  - `Example: 5 Active, 1 Inactive`
  - graphic: row of **5 blue circles** followed by **1 gray diamond**
- Node 2 (formula):
  - `Gini(t) = 1 - Σ p_k²`
  - `p_k = สัดส่วนของแต่ละ Class ใน Node`
  - `Gini = 1 - (5/6)² - (1/6)²`
  - yellow result box: `Gini = 0.278`
- Node 3 (interpretation):
  - heading `Interpretation`
  - scale bar: left endpoint blue circle labelled `0 = Pure`, right endpoint orange circle labelled `0.278`
  - `ค่าต่ำ = Class Majority ชัดเจน`
  - `ค่าสูงขึ้น = Class ผสมมากขึ้น`
- Bottom banner:
  - `Takeaway`
  - `Gini Impurity เปลี่ยนระดับการผสมของ Class ให้เป็นหลักฐานที่ Algorithm เปรียบเทียบได้`
  - page number `11`

### Formulas, verbatim
```
Gini(t) = 1 - Σ p_k²
Gini = 1 - (5/6)² - (1/6)²
Gini = 0.278
```

### Arithmetic as printed
The slide prints the substitution step and the final result but **no expanded
arithmetic**. Verbatim chain: `1 - (5/6)² - (1/6)²` → `0.278`.
Interpretation anchors printed: `0 = Pure` and `0.278`.

### Numbers printed on slide 11
`5`, `1` (example counts); `5/6`, `1/6` (substitution); `0.278` (result);
`0` (Pure anchor); `11` (page number).

### Diagram description
Three rounded rectangles in a horizontal row, joined by blue right-pointing arrows.
1. Left box: title `Gini Impurity at One Node`; text `Example: 5 Active, 1 Inactive`;
   dot row of 5 blue circles then 1 gray diamond.
2. Middle box: formula `Gini(t) = 1 - Σ p_k²`, Thai gloss for `p_k`, substituted
   line `Gini = 1 - (5/6)² - (1/6)²`, and a yellow box `Gini = 0.278`.
3. Right box: title `Interpretation`; horizontal scale from a blue circle labelled
   `0 = Pure` to an orange circle labelled `0.278`; below it the two Thai lines.
4. Bottom: dark `Takeaway` bar with the Thai sentence; `11` bottom-right.

UNCLEAR: none on this slide.

---

## SLIDE 12 — "Weighted Gini Compares Candidate Splits"  ← primary target

Thai subtitle (verbatim):
`Candidate ที่ควรเลือกให้ Weighted Gini ต่ำที่สุดและลด Impurity จาก Parent Node ได้มากที่สุด`

### All printed text, verbatim

- Root node:
  - `Parent Node`
  - `6 Active, 6 Inactive`
  - `Gini(parent) = 0.500`
  - graphic: **6 blue dots and 6 orange/yellow dots**
- Centre box (the formula, printed between the two candidates):
  - heading `Weighted Gini`
  - `Gini_split = (n_L/n) Gini(L) + (n_R/n) Gini(R)`
- Candidate A (left branch):
  - `Candidate A`
  - `days_since_last_purchase <= 45`
  - `Children: 5 Active, 1 Inactive / 1 Active, 5 Inactive`
  - left child box: `5 Active, 1 Inactive` — graphic 5 blue dots + 1 orange dot
  - right child box: `1 Active, 5 Inactive` — graphic 1 blue dot + 5 orange dots
  - `Weighted Gini(A) = 0.278`
  - `Gini Gain(A) = 0.222`
- Candidate B (right branch):
  - `Candidate B`
  - `purchases_last_90_days <= 2`
  - `Children: 2 Active, 4 Inactive / 4 Active, 2 Inactive`
  - left child box: `2 Active, 4 Inactive` — graphic 2 blue dots + 4 orange dots
  - right child box: `4 Active, 2 Inactive` — graphic 4 blue dots + 2 orange dots
  - `Weighted Gini(B) = 0.444`
  - `Gini Gain(B) = 0.056`
- Outcome box:
  - `Preferred Candidate: A`
  - `Weighted child impurity ต่ำกว่า และ Impurity reduction มากกว่า`
- Takeaway bar:
  - `Takeaway`
  - `Split ที่ดีปรับปรุงทั้งสอง Child Nodes โดยถ่วงน้ำหนักตามจำนวน Observations`
- page number `12`

### The exact printed figures (verbatim)

| Quantity | Printed value |
|---|---|
| Parent composition | `6 Active, 6 Inactive` |
| `Gini(parent)` | `0.500` |
| Candidate A branch condition | `days_since_last_purchase <= 45` |
| Candidate A left child | `5 Active, 1 Inactive` |
| Candidate A right child | `1 Active, 5 Inactive` |
| `Weighted Gini(A)` | `0.278` |
| `Gini Gain(A)` | `0.222` |
| Candidate B branch condition | `purchases_last_90_days <= 2` |
| Candidate B left child | `2 Active, 4 Inactive` |
| Candidate B right child | `4 Active, 2 Inactive` |
| `Weighted Gini(B)` | `0.444` |
| `Gini Gain(B)` | `0.056` |
| Preferred candidate | `A` |

### Formula, verbatim
```
Gini_split = (n_L/n) Gini(L) + (n_R/n) Gini(R)
```

### Arithmetic as printed
**No expanded arithmetic is printed on slide 12.** Only the finished values in the
table above appear — the weighted results and the gains are given as results, not
as a substitution chain. The only symbolic line is the `Gini_split` formula.

### Diagram description
A small decision-tree diagram: root at top, two candidate splits side by side below
it joined by downward arrows, a formula box centred between the branches, and two
conclusion boxes at the bottom.
1. Root box `Parent Node`, captioned `6 Active, 6 Inactive`, with
   `Gini(parent) = 0.500` and a dot graphic of 6 blue + 6 orange circles.
2. Left downward arrow to box `Candidate A`, split on
   `days_since_last_purchase <= 45`, summary line
   `Children: 5 Active, 1 Inactive / 1 Active, 5 Inactive`; two child boxes
   beneath it (`5 Active, 1 Inactive`, `1 Active, 5 Inactive`); beneath those,
   `Weighted Gini(A) = 0.278` and `Gini Gain(A) = 0.222`.
3. Right downward arrow to box `Candidate B`, split on
   `purchases_last_90_days <= 2`, summary line
   `Children: 2 Active, 4 Inactive / 4 Active, 2 Inactive`; two child boxes
   beneath it (`2 Active, 4 Inactive`, `4 Active, 2 Inactive`); beneath those,
   `Weighted Gini(B) = 0.444` and `Gini Gain(B) = 0.056`.
4. Centre box `Weighted Gini` carrying
   `Gini_split = (n_L/n) Gini(L) + (n_R/n) Gini(R)`.
5. Bottom-centre box `Preferred Candidate: A` with the Thai justification line.
6. Bottom-left `Takeaway` box with the Thai sentence; `12` bottom-right.

UNCLEAR: none on this slide. All values above are printed cleanly.

---

## SLIDE 10 — "Splits Change Child Class Distributions" (setup for slide 12)

Thai subtitle (verbatim):
`Split ที่มีประโยชน์สร้าง Child Nodes ที่มี Class Distribution ชัดเจนกว่า Parent Node`

### All printed text, verbatim
- `Before Split: Parent Node`
  - `6 Active, 6 Inactive`
  - `ทั้งสอง Class ผสมกัน`
- `Candidate Split`
  - `days_since_last_purchase <= 45?`
- `Left Child: Yes`
  - `5 Active, 1 Inactive`
  - `ส่วนใหญ่เป็น Active`
- `Right Child: No`
  - `1 Active, 5 Inactive`
  - `ส่วนใหญ่เป็น Inactive`
- `Takeaway`
  - `คุณค่าของ Split เห็นได้จาก Class Distribution ที่เกิดขึ้น`

### Numbers printed
`6`, `6` (parent), `45` (threshold), `5`, `1` (left child), `1`, `5` (right child).

### Arithmetic as printed
None — no Gini or arithmetic on this slide. It is the qualitative setup that
slide 12 then scores with Gini.

### Diagram description
1. Parent node, pale-blue rounded box on the left: label `Before Split: Parent Node`,
   distribution `6 Active, 6 Inactive`, Thai note `ทั้งสอง Class ผสมกัน`; symbols are
   six blue circles in an upper row and six gray diamonds in a lower row. A dark-blue
   right-pointing arrow leads to the candidate-split node.
2. Candidate-split node, white box with dark-blue border in the centre: label
   `Candidate Split`, condition `days_since_last_purchase <= 45?`. A bright-blue arrow
   leads up-right to `Left Child: Yes`; a gray arrow leads down-right to
   `Right Child: No`. No separate branch labels are printed on the arrows.
3. Upper-right node, light-blue box: `Left Child: Yes`, branch outcome `Yes`,
   `5 Active, 1 Inactive`, `ส่วนใหญ่เป็น Active`; symbols five blue circles + one
   gray diamond.
4. Lower-right node, pale-cream box: `Right Child: No`, branch outcome `No`,
   `1 Active, 5 Inactive`, `ส่วนใหญ่เป็น Inactive`; symbols one blue circle +
   five gray diamonds.
5. Bottom `Takeaway` banner with the Thai sentence.

UNCLEAR: none on this slide.

---

## SLIDE 14 — "Recursive Splitting Grows the Tree"

Thai subtitle (verbatim):
`Decision Tree เติบโตเมื่อ Local Split Process เกิดซ้ำกับ Observations ที่มาถึงแต่ละ Child Node`

### All printed text, verbatim
- `First Local Split` / `Training Data แยกเป็นสอง Child Subsets`
- `Each Child Becomes a New Local Problem`
- `Left Child เรียนรู้จาก Observations ของตนเอง` / `อาจเลือก purchases_last_90_days`
- `Right Child เรียนรู้จาก Observations ของตนเอง` / `อาจเลือก spending_last_90_days`
- `Recursive Splitting` / `แต่ละ Branch เปรียบเทียบ Candidate Splits จากข้อมูลที่มาถึง Branch นั้น`
- `Takeaway` / `แต่ละ Branch เรียนรู้จาก Subset ของลูกด้าที่มาถึงตนเอง`

### Numbers printed
**No numeric figure carries any meaning here.** The only digits on the slide are
`90` inside the two feature names `purchases_last_90_days` and
`spending_last_90_days`, plus the page number `14`. There is **no table, no formula
and no numeric result** on this slide.

### Diagram description
Vertical flow: top split panel, a two-way connector, two side-by-side child panels,
a wide recursive-splitting panel, then the takeaway footer.
1. Top panel, rounded pale-blue, labelled `First Local Split` with the Thai line
   `Training Data แยกเป็นสอง Child Subsets`; contains blue circles, green triangles
   and purple squares as observation markers, and an unlabelled gray circular node at
   its lower centre carrying no text and no number.
2. A blue bracket-like connector with downward arrowheads, labelled
   `Each Child Becomes a New Local Problem`, feeding the left and right panels. No
   condition, threshold or yes/no label is printed on either branch.
3. Left panel, pale-blue with cyan outline: `Left Child เรียนรู้จาก Observations ของตนเอง`
   and `อาจเลือก purchases_last_90_days`; blue circular markers above an unlabelled
   gray node, which branches down to two more marker groups. No numbers or conditions.
4. Right panel, pale-green with green outline: `Right Child เรียนรู้จาก Observations ของตนเอง`
   and `อาจเลือก spending_last_90_days`; green triangular markers above an unlabelled
   gray node branching down to further marker groups. No numbers or conditions.
5. Wide pale-blue panel `Recursive Splitting` with the Thai line quoted above; no
   nodes, arrows, conditions or numbers.
6. Footer strip: `Takeaway` label, vertical separator, the Thai takeaway sentence,
   and `14` at the lower-right.

Note: the two feature names here are *candidate feature choices*, not complete split
rules — no threshold is printed for them.

UNCLEAR: none on this slide.

---

## SLIDE 17 — "A Decision Path Ends in a Leaf Prediction"  ← printed probability

Thai subtitle (verbatim):
`Observation ใหม่ตาม Learned Rules ไปยัง Leaf หนึ่งจุด ซึ่ง Training Class Distribution ภายใน Leaf สนับสนุน Model Output`

### All printed text, verbatim
- `New Customer`
  - `days_since_last_purchase = 70`
  - `purchases_last_90_days = 1`
- `Decision Path`
  - `days_since_last_purchase <= 45? ผล: ไม่ใช่`
  - `purchases_last_90_days <= 2? ผล: ใช่`
- `Reached Leaf`
  - `4 Inactive, 1 Active`
- `Model Output`
  - `Predicted Class: Inactive=Yes`
  - `Estimated P(Inactive) = 4/5 = 0.80`
- `Interpretation`
  - `0.80 มาจากสัดส่วน Training Samples ใน Leaf ที่ Customer เดินทางมาถึง`
  - `ไม่ใช่ Calibrated Confidence โดยอัตโนมัติ`
- `Takeaway`
  - `Prediction คือหนึ่ง Learned Path ที่จบด้วยหลักฐานภายใน Leaf`

### The printed arithmetic, verbatim
```
Estimated P(Inactive) = 4/5 = 0.80
```

### Numbers printed
`70` (feature value), `1` (feature value), `45` (split 1), `90` (in feature name),
`2` (split 2), `4` and `1` (leaf counts), `4/5` and `0.80` (probability).

### Diagram description
Four panels left to right: `New Customer` → `Decision Path` (tree) → `Reached Leaf`
→ `Model Output`, joined by blue arrows.
1. Root decision node (rounded rectangle, top):
   `days_since_last_purchase <= 45? ผล: ไม่ใช่` — result "not/No".
   - Left branch (gray arrow) to an intermediate gray circular node (left-middle),
     which splits via two gray downward arrows to two gray circular children
     (bottom left / centre-left).
   - Right branch (blue arrow, the taken path) to a second decision node (rounded
     rectangle, right-middle): `purchases_last_90_days <= 2? ผล: ใช่` — result "yes".
     - Left branch (blue arrow) to the highlighted leaf: a green circle with a dark
       outline (bottom centre-right).
     - Right branch (gray arrow) to a gray circular child (bottom right).
2. `Reached Leaf` panel (green-bordered box): top row three gray circles; bottom row
   one gray circle (left) and one green triangle (right); caption `4 Inactive, 1 Active`.

Note: the second split condition `purchases_last_90_days <= 2` is the **same
Candidate B threshold** used on slide 12.

UNCLEAR: none on this slide.

---

## SLIDE 18 — "Deeper Trees Fit Training Data More Closely"

Thai subtitle (verbatim):
`การเพิ่ม Tree Depth ช่วยให้ Training Fit ดีขึ้นได้ แต่ยังไม่แสดงว่า Model จะทำงานได้ดีกับ Unseen Customers`

### All printed text, verbatim
- Section heading: `Same Training Customers, More Tree Depth`
- `max_depth = 1` → `กฎน้อย Training fit ต่ำกว่า`
- `max_depth = 3` → `Branches เพิ่มขึ้น Training fit ใกล้ Known Examples มากขึ้น`
- `unrestricted` → `Leaves เฉพาะเจาะจงมากขึ้น Training Accuracy อาจถึง 100`
- `What Training Evidence Shows` → `Model จับรายละเอียดของ Known Examples ได้มากเพียงใด`
- `What Remains Unknown` → `Performance บน Unseen Customers`
- `Takeaway` → `Perfect Training fit อาจสะท้อนการจำรายละเอียด มากกว่าการเรียนรู้ที่นำไปใช้ได้`

### Numbers printed
`1`, `3` (max_depth settings), `100` (in the phrase `Training Accuracy อาจถึง 100`).
The `100` is a **projected maximum, not a measured accuracy** — it is qualified on
the slide by the Thai word `อาจ` ("may").

### Diagram description
Three side-by-side decision-tree panels under `Same Training Customers, More Tree
Depth`, linked by blue right-pointing arrows; each panel has an identical row of
eight training-example icons beneath it.
1. Panel `max_depth = 1`: root blue circle at top centre; left child blue circle
   (bottom left); right child green triangle (bottom right); gray arrows root→left and
   root→right. Below: a row of 8 icons — blue circle, blue circle, green triangle,
   blue circle, green triangle, blue circle, green triangle, blue circle.
2. Panel `max_depth = 3`: root blue circle; two blue-circle children in the middle
   row; bottom row has the left child's left child (blue circle), the left child's
   right child (green triangle), the right child's left child (blue circle), and the
   right child's right child (green triangle); gray arrows throughout. Below: the
   same 8-icon row.
3. Panel `unrestricted`: root blue circle near the top, multiple intermediate
   blue-circle nodes across deeper levels, green-triangle leaves at the bottom of the
   branches. Below: the same 8-icon row.
4. Below the panels: a left box `What Training Evidence Shows` with a document icon;
   a centre vertical dotted line carrying two gray circles each containing `?`; a
   right box `What Remains Unknown` with a gray `?` circle.
5. Bottom dark-blue `Takeaway` banner with a lightbulb icon.

UNCLEAR: none on this slide.

---

## SLIDE 19 — "Validation Evidence Selects Tree Complexity"

Thai subtitle (verbatim):
`Validation Evidence เป็นหลักในการเลือก Tree Complexity เพราะ Training score สูงสุดยังไม่ตอบเรื่อง Generalization`

### All printed text, verbatim
- `Model Development Roles`
  - `Training Data เรียนรู้ Candidate Tree แต่ละต้น`
  - `Validation Data เปรียบเทียบค่า max_depth`
- `Candidate Comparison`
  - `max_depth = 1` — `Validation result: low`
  - `max_depth = 3` — `Validation result: High`
  - `max_depth = 6` — `Validation result: lower`
  - `unrestricted` — `Validation result: materially lower`
- `Selected for Development`
  - `max_depth = 3`
  - `ให้ Validation result สูงที่สุดใน Candidates ที่เปรียบเทียบ`
- `Protect Final Evidence`
  - `Final Test Set ยังไม่ถูกใช้`
  - `ใช้ Final Test Set หลังจาก Modeling Choices คงที่แล้ว`
- `Takeaway`
  - `Validation ชี้นำ Model Choices ส่วน Test Evidence ต้องได้รับการปกป้องจนกว่าทางเลือกจะคงที่`

### The printed validation figures, verbatim (qualitative labels, not numbers)

| Candidate | Printed validation result |
|---|---|
| `max_depth = 1` | `Validation result: low` |
| `max_depth = 3` | `Validation result: High` |
| `max_depth = 6` | `Validation result: lower` |
| `unrestricted` | `Validation result: materially lower` |

Selected: `max_depth = 3`.

**No numeric validation score or accuracy percentage is printed on this slide** —
the results are the words `low`, `High`, `lower`, `materially lower`.

### Diagram description
Three vertical sections separated by dashed lines, plus a bottom banner.
1. Left section `Model Development Roles`: two stacked boxes — the upper with an icon
   of three human figures above stacked database cylinders, the lower with a document
   icon. Two blue arrows point right toward the centre.
2. Centre section `Candidate Comparison`: four tree diagrams left to right, each with
   a label below.
   - `max_depth = 1`: one root circle at top, two child circles at bottom left and
     bottom right. Result `low`.
   - `max_depth = 3`: one root circle, two middle-row circles, four bottom leaf
     circles (two under each middle node). **Enclosed in a green rounded rectangle.**
     Result `High`. A green downward arrow leads from it to the selection box.
   - `max_depth = 6`: root circle, intermediate levels, six bottom leaf circles.
     Result `lower`.
   - `unrestricted`: root circle, extensive branching, many small bottom leaf circles.
     Result `materially lower`.
   - Below the trees: a light-green rounded rectangle `Selected for Development`,
     containing `max_depth = 3` inside a blue rounded rectangle, and the Thai line
     `ให้ Validation result สูงที่สุดใน Candidates ที่เปรียบเทียบ`.
3. Right section `Protect Final Evidence`: a shield-with-padlock icon and a stacked
   database cylinder icon above the two Thai lines.
4. Bottom dark-blue `Takeaway` banner with a lightbulb icon.

UNCLEAR: none on this slide.

---

## SLIDE 5 — "Final Decision Tree Mockup"  (the tree that slides 17 and 21 traverse)

Subtitle lines (verbatim):
- `Customer Inactivity Prediction (Churn Risk)`
- `ลูกค้าคนใดมีความเสี่ยงที่จะกลายเป็น Inactive?`
- `Decision Tree เปลี่ยนพฤติกรรมลูกค้าให้เป็น Learned Rules ที่มองเห็นเส้นทางสู่ Predicted Class ได้`

Legend (top right): blue circle = `Active`, orange triangle = `Inactive`.

### All printed text, verbatim (nodes and branch conditions)
- Root: `days_since_last_purchase <= 45?`
  - `ใช่ (≤ 45 วัน)` → left child
  - `ไม่ใช่ (> 45 วัน)` → right child
- Left child: `purchases_last_90_days <= 2?`
  - `ใช่ (≤ 2 ครั้ง)` → left-left child
  - `ไม่ใช่ (> 2 ครั้ง)` → leaf `Predicted: Inactive = No`
- Left-left child: `discount_use_rate <= 0.30?`
  - `ใช่` → leaf `Predicted: Inactive = Yes`
  - `ไม่ใช่` → leaf `Predicted: Inactive = No`
- Right child: `spending_last_90_days <= 1,500 บาท?`
  - `ใช่ (≤ 1,500 บาท)` → leaf `Predicted: Inactive = Yes`
  - `ไม่ใช่ (> 1,500 บาท)` → right-right child
- Right-right child: `customer_tenure <= 180 วัน?`
  - `ใช่` → leaf `Predicted: Inactive = Yes`
  - `ไม่ใช่` → leaf `Predicted: Inactive = No`
- Banner: `At-risk Leaves ช่วยให้ทีมเห็นว่า Customer Segments ใดควรได้รับ Retention Attention`

### The printed thresholds — the complete set
| Node | Condition |
|---|---|
| Root | `days_since_last_purchase <= 45` |
| Left child | `purchases_last_90_days <= 2` |
| Left-left child | `discount_use_rate <= 0.30` |
| Right child | `spending_last_90_days <= 1,500 บาท` |
| Right-right child | `customer_tenure <= 180 วัน` |

Note the two split thresholds `days_since_last_purchase <= 45` and
`purchases_last_90_days <= 2` are exactly Candidates A and B from slide 12.

### Diagram description
Tree flowing downward, six leaves. Each internal node box carries a small
proportional class bar (blue segment = Active, orange segment = Inactive).
1. Root `days_since_last_purchase <= 45?`; left branch `ใช่ (≤ 45 วัน)`, right branch `ไม่ใช่ (> 45 วัน)`.
2. Left child `purchases_last_90_days <= 2?`; left branch `ใช่ (≤ 2 ครั้ง)` continues deeper, right branch `ไม่ใช่ (> 2 ครั้ง)` terminates immediately at a leaf.
3. Left-left child `discount_use_rate <= 0.30?`; `ใช่` → orange-triangle leaf `Predicted: Inactive = Yes` (bar mostly orange, small blue left segment); `ไม่ใช่` → blue-circle leaf `Predicted: Inactive = No` (bar mostly blue, small orange right segment).
4. Leaf reached by `purchases > 2`: blue circle, `Predicted: Inactive = No`.
5. Right child `spending_last_90_days <= 1,500 บาท?`; `ใช่ (≤ 1,500 บาท)` → orange-triangle leaf `Predicted: Inactive = Yes`; `ไม่ใช่ (> 1,500 บาท)` → continues to the next node.
6. Right-right child `customer_tenure <= 180 วัน?`; `ใช่` → orange-triangle leaf `Predicted: Inactive = Yes`; `ไม่ใช่` → blue-circle leaf `Predicted: Inactive = No`.
7. Bottom banner with the `At-risk Leaves` sentence; page number `5`.

**No counts, class-distribution numbers or Gini values are printed on this slide** —
the bars are graphical, not labelled with numbers.

UNCLEAR: none on this slide.

---

## SLIDE 16 — "Tree Growth Needs a Stopping Rule"

Thai subtitle (verbatim):
`Tree Growth ต้องหยุด เพราะ Branches ที่เพิ่มขึ้นไม่ได้รับประกัน Prediction ที่ดีขึ้นบน Observations ใหม่`

### All printed text, verbatim
- `Primary Complexity Control` / `max_depth จำกัดจำนวน Split Levels ของ Tree`
- `max_depth`
- `Why Stop?`
  - `Branches ที่มากขึ้นเรียนรู้ รายละเอียดของ Training Data ได้มากขึ้น`
  - `Performance บน Observations ใหม่อาจไม่ดีขึ้น`
- `Other Stopping Signals`
  - `Node มีความ Pure เพียงพอ`
  - `ไม่มี Split ที่ให้ Improvement ที่มีประโยชน์`
  - `เหลือ Observations น้อยเกินไปสำหรับการ Split`
- `Takeaway` / `Tree ต้องมี Depth เพียงพอสำหรับเรียนรู้โครงสร้าง โดยไม่ใส่ตามทุกรายละเอียดของ Training Data`

### Numbers printed
**None.** No numeric value appears anywhere on this slide — `max_depth` is named
but never given a number here. The tree diagrams are unlabelled by depth.

### Diagram description
Two tree diagrams side by side, contrasting a shallow and a deeper tree.
1. Left tree: gray circular root; left branch to a green circle, right branch to a blue
   circle; the green circle splits into two green triangular leaf nodes, the blue
   circle splits into two blue circular leaf nodes. A vertical dashed double-headed
   arrow labelled `max_depth` runs alongside it, with dashed horizontal lines marking
   split levels. Below: a left cluster of scattered green triangles and a right cluster
   of scattered blue circles.
2. Right tree: gray circular root splitting to two level-1 nodes, each splitting to two
   level-2 nodes (four total), each splitting to two leaf nodes (eight blue-outlined
   circles at level 3). Below: scattered green triangles (left), blue circles (centre)
   and gray squares (right).

UNCLEAR: none on this slide.

---

## SLIDE 21 — "A New Customer Traverses the Final Decision Tree"  ← richest worked path

Second header line (verbatim): `Unknown Target at Prediction Time`
Thai subtitle (verbatim):
`Model อ่าน Feature ทีละ Node และพา Customer ไปตาม Learned Branches จนถึง Leaf ที่ให้ Predicted Class`
Note printed on the slide: `Illustrative Model Mockup — ใช้เพื่ออธิบาย Prediction Path`

### New Customer feature values, verbatim
```
days_since_last_purchase = 70 วัน
purchases_last_90_days = 1 ครั้ง
spending_last_90_days = 2,100 บาท
customer_tenure = 120 วัน
discount_use_rate = 0.20
```
Header: `Actual Target: Unknown`

### Full traversal, verbatim — conditions, branch labels and printed evaluations

**Node 1** — `days_since_last_purchase <= 45?`
- printed evaluation: `70 <= 45 ผล: ไม่ใช่`
- `ใช่ (≤ 45 วัน)` → Node (left, unused here)
- `ไม่ใช่ (> 45 วัน)` → **Node 2** (blue, the path taken)

**Node 2** — `spending_last_90_days <= 1,500 บาท?`
- printed evaluation: `2,100 <= 1,500 ผล: ไม่ใช่`
- `ใช่ (≤ 1,500 บาท)` → leaf `Predicted: Inactive = Yes` (orange triangle)
- `ไม่ใช่ (> 1,500 บาท)` → **Node 3** (blue, the path taken)

**Node 3** — `customer_tenure <= 180 วัน?`
- printed evaluation: `120 <= 180 ผล: ใช่`
- `ใช่ (≤ 180 วัน)` → **highlighted orange-bordered orange-triangle leaf** `Predicted: Inactive = Yes`
- `ไม่ใช่ (> 180 วัน)` → leaf `Predicted: Inactive = No` (blue circle)

**Unused left subtree** (from the `ใช่` side of Node 1):
- `purchases_last_90_days <= 2?`
  - `ใช่ (≤ 2 ครั้ง)` → `discount_use_rate <= 0.30?`
    - `ใช่` → leaf `Predicted: Inactive = Yes` (orange triangle)
    - `ไม่ใช่` → leaf `Predicted: Inactive = No` (blue circle)
  - `ไม่ใช่ (> 2 ครั้ง)` → leaf `Predicted: Inactive = No` (blue circle)

### The printed output, verbatim
- `Leaf Evidence: Inactive distribution เด่นกว่า Active`
- `Predicted Class: Inactive = Yes`
- `Retention Attention: ควรพิจารณากลุ่มความสำคัญ`
- `Actual Target ยังไม่ทราบจนกว่า Future Outcome Window จะสิ้นสุด`
- Banner: `Prediction ใช้ Features ที่ทราบ ณ เวลาทำนาย ส่วน Actual Target จะทราบภายหลัง`

### Arithmetic as printed
The three comparisons printed on the path are given verbatim as
`70 <= 45 ผล: ไม่ใช่`, `2,100 <= 1,500 ผล: ไม่ใช่`, `120 <= 180 ผล: ใช่`.
No further arithmetic appears.

### Diagram description
Left panel: a profile box listing the five feature values. Right: the tree, with the
taken path drawn in blue arrows and the untaken branches in gray arrows.
1. Root node, blue circle marked `1`: `days_since_last_purchase <= 45?`, evaluation
   `70 <= 45 ผล: ไม่ใช่`. Gray arrow down-left on `ใช่ (≤ 45 วัน)` to a gray box node
   `purchases_last_90_days <= 2?`; blue arrow down-right on `ไม่ใช่ (> 45 วัน)` to
   node 2.
2. From `purchases_last_90_days <= 2?`: gray arrow on `ใช่ (≤ 2 ครั้ง)` to a gray box
   node `discount_use_rate <= 0.30?`; gray arrow on `ไม่ใช่ (> 2 ครั้ง)` to a blue
   circle leaf `Predicted: Inactive = No`.
3. From `discount_use_rate <= 0.30?`: down arrow to an orange triangle leaf
   `Predicted: Inactive = Yes` (branch `ใช่`); down arrow to a blue circle leaf
   `Predicted: Inactive = No` (branch `ไม่ใช่`).
4. Node 2, blue circle marked `2`: `spending_last_90_days <= 1,500 บาท?`, evaluation
   `2,100 <= 1,500 ผล: ไม่ใช่`. Down arrow on `ใช่ (≤ 1,500 บาท)` to an orange triangle
   leaf `Predicted: Inactive = Yes`; blue arrow on `ไม่ใช่ (> 1,500 บาท)` to node 3.
5. Node 3, blue circle marked `3`: `customer_tenure <= 180 วัน?`, evaluation
   `120 <= 180 ผล: ใช่`. Blue arrow on `ใช่ (≤ 180 วัน)` to the highlighted
   orange-bordered orange triangle leaf `Predicted: Inactive = Yes`; gray arrow on
   `ไม่ใช่ (> 180 วัน)` to a blue circle leaf `Predicted: Inactive = No`.
6. Bottom-right orange-bordered box with the four output lines quoted above.

UNCLEAR: none on this slide.

---
---

# PART B — Lecture 05 slides 12-16: NO EDA figures

## Plain statement

**Lecture 05 slides 12 to 16 contain no EDA numbers.** There is no mean, median,
standard deviation, correlation coefficient, sample size, range, count, percentage or
formula anywhere in this block. Every figure on these five slides is a **page number**
only: `12`, `13`, `14`, `15`, `16`. The block is conceptual — relationships,
correlation vs. causation, time patterns, candidate-vs-defensible insight, and
confirmation bias — not quantitative. Nothing here is usable as a verified EDA
statistic for the study guide.

Per-slide detail (all titles verbatim from the vision read):

### SLIDE 12 — "Relationships Reveal How Variables Move Together"
Thai subtitle: `Relationship คือหลักฐานการเปลี่ยนแปลงร่วมกัน ซึ่งต้องบรรยายให้ชัดก่อนอธิบายว่าเกิดจากอะไร`
Banner: `ก่อนถามว่า "ทำไม" ให้บรรยายก่อนว่า "เห็นอะไร"`
Four boxes: `Direction` / `Strength` / `Form` / `Unusual Cases`.
Numbers: **only `12`** (page number).
Diagram: scatter plot, x-axis `Website Activity`, y-axis `Purchase Frequency`; blue
dots in an upward linear band between two dashed diagonal lines; one point circled
as an outlier. **No axis tick values and no data labels are printed.**

### SLIDE 13 — "Correlation Is Association, Not Causation"
Thai subtitle: `Correlation บอกว่า Variables สัมพันธ์กันอย่างไร แต่ไม่ยืนยันว่าเหตุใดความสัมพันธ์นั้นจึงเกิดขึ้น`
Left panel: `Association`, axes `Customer Spending` / `Website Activity`.
Right panel: `X` → struck-through arrow → `Y`, with `X causes Y` struck through in red.
`Confounding • Reverse Direction • Selection Effects • Coincidence`.
Numbers: **only `13`** (page number). **No correlation coefficient (r) is printed.**

### SLIDE 14 — "Time Order Reveals Trends and Change"
Thai subtitle: `Pattern ตามเวลาต้องรักษาลำดับ และตีความร่วมกับ Seasonality, Context และ Data Collection`
Labels: `Trend`, `Seasonality`, `Shift`, `Unusual Period`; chart caption
`Monthly E-commerce Orders`.
Numbers: **only `14`** (page number).
Diagram: line chart of Monthly E-commerce Orders, generally rising with oscillations;
annotations mark Trend (arrow), Seasonality (dashed ellipse), Shift (dashed vertical
line at a step-up), Unusual Period (circle around a sharp dip).
**No axis ticks, axis titles or data-point values are printed.**

### SLIDE 15 — "An Interesting Pattern Is Only a Candidate Insight"
Thai subtitle: `Pattern จะเป็น Insight ที่น่าเชื่อถือ เมื่อผ่านการตรวจข้อจำกัดของข้อมูลและคำอธิบายทางเลือกแล้ว`
Header line: `เห็น Pattern ≠ ได้ Insight`
Checklist: `Data Quality & Missingness`, `Sample Size`, `Group Composition`,
`Scale & Data Collection`, `Alternative Explanations`.
Numbers: **only `15`** (page number). Note `Sample Size` appears as a *checklist item*,
with **no size value printed**.
Diagram: three-panel flow — `Interesting Pattern` → `Investigate` (central circle,
magnifying glass) → `Defensible Insight`.

### SLIDE 16 — "Confirmation Bias Can Turn Patterns into Conclusions"
Thai subtitle: `การเลือกเฉพาะ Pattern ที่ตรงกับความคาดหวัง ทำให้ EDA กลายเป็นการยืนยันความเชื่อแทนการตรวจหลักฐาน`
Header line: `พบสิ่งที่คาดไว้ ≠ ตรวจสอบครบแล้ว`
Four cards: `Question First`, `Seek Contrary Evidence`, `Check Stability`,
`Report Honestly`.
Numbers: **only `16`** (page number).
Diagram: icon-only montage — six mini chart icons, four stacked thumbnails, two
red-bordered scatter/line boxes with a red warning triangle, and the four cards.
**No axis values or data labels are legible in any mini chart.**

UNCLEAR (L05): no printed digit is illegible. The miniature chart icons inside
slides 15 and 16 contain axis ticks and plotted values that are too small to read at
dpi 115, but these are decorative icon graphics, not printed statistics.

---
---

# PART C — Slide coverage

## Lecture 07 — slides 1 to 25

### Fully vision-read, verbatim transcription in this file
| Slide | Title (verbatim) | Carries figures? |
|---|---|---|
| 5 | Final Decision Tree Mockup | Yes — 5 split thresholds |
| 10 | Splits Change Child Class Distributions | Yes — parent/child class counts |
| 11 | Gini Impurity Measures Class Mixing | **Yes — Gini formula + 0.278** |
| 12 | Weighted Gini Compares Candidate Splits | **Yes — Weighted Gini + Gini Gain** |
| 14 | Recursive Splitting Grows the Tree | No meaningful figure |
| 16 | Tree Growth Needs a Stopping Rule | No figure |
| 17 | A Decision Path Ends in a Leaf Prediction | Yes — `4/5 = 0.80` |
| 18 | Deeper Trees Fit Training Data More Closely | Yes — max_depth 1/3, `100` |
| 19 | Validation Evidence Selects Tree Complexity | Yes — max_depth 1/3/6 (labels only) |
| 21 | A New Customer Traverses the Final Decision Tree | Yes — full worked traversal |

### Title-level triage only (contact-sheet read, no verbatim transcription)
Slides **1, 2, 3, 4, 6, 7, 8, 9, 13, 15, 20, 22, 24, 25** were identified from a
contact sheet. Titles as read:

| Slide | Title (verbatim) | Numbers per triage |
|---|---|---|
| 1 | Data Science: Decision Tree Classifier And Evaluation | no (title slide) |
| 2 | Hero: The Complete CRISP-DS Workflow | no |
| 3 | Modeling and Evaluation Form a Feedback Loop | no |
| 4 | The Customer Inactivity Decision | no |
| 6 | Prediction-Time Features and the Future Target | no |
| 7 | Training, Validation, and Test Roles | no |
| 8 | A Human Threshold as a Starting Hypothesis | no |
| 9 | A Decision Node Uses One Feature and Threshold | no |
| 13 | Greedy Learning Selects the Current Best Split | no |
| 15 | Decision Tree Anatomy | no |
| 20 | Training and Validation Patterns Reveal Fit Problems | no |
| 22 | Evaluation Begins with Actual and Predicted Classes | no |
| 24 | The Positive Class Gives Errors Meaning | no |
| 25 | The Confusion Matrix Organizes Prediction Outcomes | no |

Every one of these was triaged as carrying **no numeric table, formula or figure**, so
none was transcribed verbatim. The Gini/Gini-Gain search target was **not** among
them: it was located at slides 11-12.

### Not covered
- **Slide 23** — skipped per instructions; already transcribed from the PDF text layer
  in `lect07-numbers.md` (football WC 2026 example, 10 instances, TP=4 TN=3 FP=1
  FN=2, Accuracy 70.00%, Precision 80.00%, Recall 66.67%, F1 72.73%).
- **Slide 26** — skipped per instructions.
- **Slide 30** — skipped per instructions.
- **Slides 27-36** — outside the requested range 1-25.

## Lecture 05 — slides 12 to 16
All five **fully vision-read**: 12, 13, 14, 15, 16. All five carry page numbers only
and no EDA statistics. See Part B.

---

# PART D — The Gini figures in one place (verified)

Every value below was read twice: once in the full-slide pass and once in a
zoom-cropped pass that spelled out each digit individually. Both passes agreed.

```
Slide 11
  Gini(t) = 1 - Σ p_k²
  Gini    = 1 - (5/6)² - (1/6)²
  Gini    = 0.278                       (example: 5 Active, 1 Inactive)

Slide 12
  Gini_split = (n_L/n) Gini(L) + (n_R/n) Gini(R)

  Parent Node     6 Active, 6 Inactive      Gini(parent)     = 0.500

  Candidate A     days_since_last_purchase <= 45
                  5 Active, 1 Inactive | 1 Active, 5 Inactive
                  Weighted Gini(A)        = 0.278
                  Gini Gain(A)            = 0.222

  Candidate B     purchases_last_90_days <= 2
                  2 Active, 4 Inactive | 4 Active, 2 Inactive
                  Weighted Gini(B)        = 0.444
                  Gini Gain(B)            = 0.056

  Preferred Candidate: A
```

Digit-by-digit confirmation from the zoom pass:
`0.500` = zero, point, five, zero, zero · `0.278` = zero, point, two, seven, eight ·
`0.222` = zero, point, two, two, two · `0.444` = zero, point, four, four, four ·
`0.056` = zero, point, zero, five, six.

**Important caveat for the study guide:** slide 12 prints these five results as
finished values. It prints **no expanded substitution arithmetic** for either
candidate, and it prints **no explicit Gini Gain formula** — only the
`Gini_split` weighted-impurity formula. If the guide wants to show the working, that
substitution must be added as the guide's own derivation and labelled as such, not
presented as a printed slide figure.

---