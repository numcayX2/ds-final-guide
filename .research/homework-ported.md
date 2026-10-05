# Homework Solutions — Ported from Previous Project

Extracted from `C:\Users\Acer\Downloads\10301351_Data_Science_Lectures\docx-to-website\components\homework-solutions.tsx` (1058 lines).

**Important scope note:** the task brief said the old file "covers two problems". It actually covers **three**: HW#1 (Churn, 10 rows), HW#2 (Candidate Models A/B/C, 100 rows), and the K-Means exercise (which itself has two sub-questions, K=2 and K=3). All three are recorded below. HW#2 has no counterpart in the brief's verification list, so it is included verbatim and separately flagged.

All arithmetic below was independently recomputed in Python; recomputed values are marked. Slide images were read with vision to confirm each source.

---

## Homework 1 - Customer Churn (Lect 07)

### Source

- **Statement slide:** `lect07_p34_hw1.png` — slide titled "Homework#1", page 34.
- **Data slide:** `lect07_p26_churn_data.png` — page 26, embedded and repeated on page 34's left panel.

### Statement

> จากข้อมูล Customer Churn prediction ในหน้า 26 เขียนแสดงวิธีคำนวณ Evaluation metrics แบบเดียวกับหน้า 30

*(From the Customer Churn prediction data on page 26, write/show the method of calculating Evaluation metrics in the same way as page 30.)*

Page 30 is the FIFA W-Cup 2026 worked example the slide displays alongside the problem (Positive Class = play; TP=4, FN=2, FP=1, TN=3; Recall 4/(4+2)=0.67, Precision 4/(4+1)=0.80, Accuracy (4+3)/10=0.70, F1 8/(8+1+2)=0.73). Slide takeaway line: "Metric แต่ละตัวใช้ส่วนของ Confusion Matrix ต่างกัน จึงตอบคำถามต่างกัน".

The slide also states the positive-class definition explicitly: **Positive Class: Inactive = Yes**. Model context: "Classifier Model for Customer Inactivity Prediction".

### Given

Slide 26 table, headers `Customer | Actual: Inactive? | Predicted: Inactive?`:

| Customer | Actual | Predicted | Classification (derived) |
|---|---|---|---|
| 01 | Yes | Yes | TP |
| 02 | No | No | TN |
| 03 | Yes | No | FN |
| 04 | No | Yes | FP |
| 05 | Yes | Yes | TP |
| 06 | No | No | TN |
| 07 | No | Yes | FP |
| 08 | Yes | Yes | TP |
| 09 | No | No | TN |
| 10 | Yes | No | FN |

Confusion matrix (2x2):

| | Predicted Yes (Pos) | Predicted No (Neg) |
|---|---|---|
| **Actual Yes (Positive)** | TP = 3 | FN = 2 |
| **Actual No (Negative)** | FP = 2 | TN = 3 |

N = TP + FN + FP + TN = 3 + 2 + 2 + 3 = 10

### Solution

**1. Accuracy = (TP + TN) / (TP + TN + FP + FN)**
= (3 + 3) / (3 + 3 + 2 + 2)
= 6 / 10
= 0.60 = **60%**

**2. Precision = TP / (TP + FP)**
= 3 / (3 + 2)
= 3 / 5
= 0.60 = **60%**

**3. Recall = TP / (TP + FN)**
= 3 / (3 + 2)
= 3 / 5
= 0.60 = **60%**

**4. F1-Score = 2·TP / (2·TP + FP + FN)**
= (2 × 3) / (2 × 3 + 2 + 2)
= 6 / 10
= 0.60 = **60%**

The old file flags this as an exam trap: all four metrics are identical because TP = TN = 3 and FP = FN = 2 is perfectly symmetric, which makes students suspect their own arithmetic.

### Final answer

**TP = 3, TN = 3, FP = 2, FN = 2, N = 10**

| Metric | Formula | Substitution | Value |
|---|---|---|---|
| Accuracy | (TP+TN)/N | (3+3)/10 | **0.60 (60.00%)** |
| Precision | TP/(TP+FP) | 3/(3+2) | **0.60 (60.00%)** |
| Recall | TP/(TP+FN) | 3/(3+2) | **0.60 (60.00%)** |
| F1 | 2TP/(2TP+FP+FN) | 6/(6+2+2) | **0.60 (60.00%)** |

### Notes

- **No disagreement.** The old file's row-by-row table, confusion matrix, and all four metric values match both the parent agent's independent derivation and my own recomputation exactly.
- Slide 26 carries four blank answer lines (TP/TN/FP/FN = ______), so the counting is the intended student work; the page-26 slide itself supplies no answers.
- The old file calls the exercise "Customer Churn"; the slides use "Customer Inactivity". Same concept, but the slide wording is Inactivity — worth matching if the Thai text is quoted.

---

## Homework 2 (extra) - Candidate Models A / B / C (Lect 07, slide 35)

**This section exists in the old file but was not in the brief's verification list. Numbers are slide-sourced and independently recomputed.**

### Source

`lect07_p35_hw2.png` — slide "Homework#2", page 35: "การบ้าน: เลือก Classifier Model สำหรับ Customer Inactivity".

### Statement

Slide: "Model ที่เหมาะสมขึ้นกับ Metric ที่สอดคล้องกับผลกระทบของ Retention Decision"

Analytics question: "ลูกค้าคนใดมีแนวโน้มจะ Inactive?" Positive Class: Customer Inactive = Yes. Same Evaluation Set: 100 Customers. Orange box: "ข้อมูลสมมติสำหรับการฝึกคำนวณ" (hypothetical data for practice).

Three required steps:
1. คำนวณ Metrics ของทุก Model — Accuracy, Precision, Recall และ F-measure (F1-score); แสดงสูตร การแทนค่า และผลลัพธ์ทศนิยมสองตำแหน่ง
2. เลือก Primary Metric — อธิบายผลกระทบของ False Positive และ False Negative ต่อ Retention Decision
3. เลือก Candidate Model — ใช้ Primary Metric ที่เลือกสนับสนุนคำตอบ

Footer: "คำตอบอาจต่างกันได้ แต่ Metric เหตุผล และ Model ต้องสอดคล้องกัน" (answers may differ, but metric, reasoning and model must be consistent).

### Given

Slide matrices, headers `Actual Class | Predicted: Yes | Predicted: No`:

| Model | Actual Yes | Actual No | Sum |
|---|---|---|---|
| A | TP = 24 | FN = 16 | |
| A | FP = 3 | TN = 57 | |
| B | TP = 36 | FN = 4 | |
| B | FP = 18 | TN = 42 | |
| C | TP = 32 | FN = 8 | |
| C | FP = 7 | TN = 53 | |

All three sum to 100.

### Solution

**Model A** (TP=24, FN=16, FP=3, TN=57, N=100)
- Accuracy = (24+57)/100 = 81/100 = **0.81**
- Precision = 24/(24+3) = 24/27 = 0.888... = **0.89**
- Recall = 24/(24+16) = 24/40 = **0.60**
- F1 = 48/(48+3+16) = 48/67 = 0.716... = **0.72**

**Model B** (TP=36, FN=4, FP=18, TN=42, N=100)
- Accuracy = (36+42)/100 = 78/100 = **0.78**
- Precision = 36/(36+18) = 36/54 = 0.666... = **0.67**
- Recall = 36/(36+4) = 36/40 = **0.90**
- F1 = 72/(72+18+4) = 72/94 = 0.766... = **0.77**

**Model C** (TP=32, FN=8, FP=7, TN=53, N=100)
- Accuracy = (32+53)/100 = 85/100 = **0.85**
- Precision = 32/(32+7) = 32/39 = 0.8205... = **0.82**
- Recall = 32/(32+8) = 32/40 = **0.80**
- F1 = 64/(64+7+8) = 64/79 = 0.810... = **0.81**

Business decision reasoning from the old file:

| Scenario | Choice | Reason |
|---|---|---|
| Balanced overall | **Model C** | Highest F1 (0.81) and highest Accuracy (0.85); Precision 0.82 and Recall 0.80 both strong with no weak side |
| Fear missing churners most | **Model B** | Recall 0.90 catches 90% of customers who will lapse; accepts 18 false positives (FP=18). Suits premium-membership businesses with severe missed-churn cost |
| Very high outreach cost | **Model A** | Precision 0.89: of 27 predicted Inactive, 24 correct. Suits high-FP-cost cases (e.g. expensive cash vouchers) |

### Final answer

| Model | TP | FN | FP | TN | N | Accuracy | Precision | Recall | F1 |
|---|---|---|---|---|---|---|---|---|---|
| A | 24 | 16 | 3 | 57 | 100 | 0.81 | **0.89 (highest)** | 0.60 (lowest) | 0.72 |
| B | 36 | 4 | 18 | 42 | 100 | 0.78 (lowest) | 0.67 (lowest) | **0.90 (highest)** | 0.77 |
| C | 32 | 8 | 7 | 53 | 100 | **0.85 (highest)** | 0.82 | 0.80 | **0.81 (highest)** |

Recommended: **Model C**.

### Notes

- All 12 metric values in the old file's comparison table match my independent recomputation. Slide values (24/16/3/57, 36/4/18/42, 32/8/7/53) confirmed from the slide image.
- The slide labels the model-recommendation answer as non-unique, so the old file's "recommend Model C" is a defensible reading of step 3, not the only valid answer.
- This exercise is not mentioned in the parent's verification list — flagged so the parent can decide whether to port it.

---

## Homework 3 - K-Means (Lect 08)

### Source

- **Statement slide:** `lect08_p44_hw_kmeans.png` — "การบ้าน", page 44.
- **Data slide:** `lect08_p25_points.png` — "Example: K-Mean Clustering", page 25 (data + scatter plots; p25 also carries the in-lecture example using k=3, c1(2,10), c2(5,8), c3(1,2) — that is the *lecture example*, not the homework, see Disagreements).
- Handwritten reference pages: `hw_kmeans_handwritten_q1.jpg`, `hw_kmeans_handwritten_q2.jpg` (student submission, cited in the old file as student ID 6704101410).

### Statement (slide 44, verbatim)

**ข้อ 1**
> จงใช้ข้อมูลในหน้า 25 ทำกระบวนการ K-mean Clustering ตามลำดับ เหมือนตัวอย่าง หน้า 25-31 ใหม่อีกครั้งหนึ่ง
> ให้จบหนึ่งรอบคำนวณ centroid ใหม่ และคำนวณ ตำแหน่ง centroid ใหม่ของรอบที่ 2 โดย กำหนดค่า K = 2 และให้ Centroid C1 คือ จุด A3 และ C2 คือ A6

*(Use the data on page 25 to redo the K-mean Clustering process in order, like the example on pages 25-31. Complete one round of computing the new centroid, and compute the new centroid position for round 2, with K = 2, Centroid C1 is point A3 and C2 is A6.)*

**ข้อ 2**
> จงใช้ข้อมูลในหน้า 25 ทำกระบวนการ K-mean Clustering ตามลำดับ เหมือนตัวอย่าง หน้า 25-31 ใหม่อีกครั้งหนึ่ง
> ให้จบหนึ่งรอบคำนวณ centroid ใหม่ และคำนวณ ตำแหน่ง centroid ใหม่ของรอบที่ 2 โดย กำหนดค่า K = 3 โดยใช้ Euclidean distance และให้ centroid ตั้งต้น คือ A2 A5 A8

*(... with K = 3 using Euclidean distance, and initial centroids A2, A5, A8.)*

**หมายเหตุ (tie-breaker, slide 44)**
> กรณีที่คำนวณ distance ได้เท่ากัน เลือกเข้าเป็นสมาชิกใน cluster ที่มี หมายเลขต่ำสุด (Greedy algorithm)
> เช่น เข้า Cluster1 หรือ Cluster2 ก็ได้ ให้เลือก เข้า Cluster 1

*(If computed distances are equal, assign to the cluster with the lowest number — e.g. either Cluster1 or Cluster2, choose Cluster 1.)*

Note: the slide says "ให้จบหนึ่งรอบ... และคำนวณตำแหน่ง centroid ใหม่ของรอบที่ 2" — one round of assignment, then compute round-2 centroids. The old file carries this past that point to full convergence, which is extra but not wrong.

### Given

Slide 25 data table (columns `ID | V1 | V2 | V3 | … | Vn`; only V1/V2 populated):

| Point | V1 (x) | V2 (y) |
|---|---|---|
| A1 | 2 | 10 |
| A2 | 2 | 5 |
| A3 | 8 | 4 |
| A4 | 5 | 8 |
| A5 | 7 | 5 |
| A6 | 6 | 4 |
| A7 | 1 | 2 |
| A8 | 4 | 9 |

Formulas used by the old file:
- Manhattan: `d = |x1 − y1| + |x2 − y2|`
- Euclidean: `d = √[(x1 − y1)² + (x2 − y2)²]`
- Centroid update: `Centroid_new = (Σx_i / m, Σy_i / m)` where m = number of members

### Solution — Question 1 (K = 2, Manhattan, C1 = A3(8,4), C2 = A6(6,4))

Note: slide 44 does not name a metric for question 1; it names Euclidean only for question 2. The old file uses Manhattan for Q1. This is an assumption, not a slide instruction.

**Round 1** — distances to C1(8,4) and C2(6,4):

| Point | Coord | d to C1 = \|x−8\| + \|y−4\| | d to C2 = \|x−6\| + \|y−4\| | Cluster |
|---|---|---|---|---|
| A1 | (2,10) | \|2−8\|+\|10−4\| = 6+6 = 12 | \|2−6\|+\|10−4\| = 4+6 = 10 | 2 |
| A2 | (2,5) | 6+1 = 7 | 4+1 = 5 | 2 |
| A3 | (8,4) | 0 (centroid) | \|8−6\|+\|4−4\| = 2 | 1 |
| A4 | (5,8) | 3+4 = 7 | 1+4 = 5 | 2 |
| A5 | (7,5) | 1+1 = 2 | 1+1 = 2 | **1 (tie → lowest number)** |
| A6 | (6,4) | \|6−8\|+0 = 2 | 0 (centroid) | 2 |
| A7 | (1,2) | 7+2 = 9 | 5+2 = 7 | 2 |
| A8 | (4,9) | 4+5 = 9 | 2+5 = 7 | 2 |

New centroids:
- Cluster 1 = [A3, A5]: (8+7)/2, (4+5)/2) = (15/2, 9/2) = **(7.50, 4.50)**
- Cluster 2 = [A1, A2, A4, A6, A7, A8]: ((2+2+5+6+1+4)/6, (10+5+8+4+2+9)/6) = (20/6, 38/6) = **(3.33, 6.33)**

**Round 2** — against C1(7.50, 4.50) and C2(3.33, 6.33):

| Point | Coord | d to C1 | d to C2 | Cluster |
|---|---|---|---|---|
| A1 | (2,10) | \|2−7.5\|+\|10−4.5\| = 5.5+5.5 = 11.00 | \|2−3.33\|+\|10−6.33\| = 1.33+3.67 = 5.00 | 2 |
| A2 | (2,5) | 5.5+0.5 = 6.00 | 1.33+1.33 = 2.67 | 2 |
| A3 | (8,4) | 0.5+0.5 = 1.00 | 4.67+2.33 = 7.00 | 1 |
| A4 | (5,8) | 2.5+3.5 = 6.00 | 1.67+1.67 = **3.33** | 2 |
| A5 | (7,5) | 0.5+0.5 = 1.00 | 3.67+1.33 = 5.00 | 1 |
| A6 | (6,4) | **1.5+0.5 = 2.00** | 2.67+2.33 = 5.00 | **1 (switches — 2.00 < 5.00)** |
| A7 | (1,2) | 6.5+2.5 = 9.00 | 2.33+4.33 = 6.67 | 2 |
| A8 | (4,9) | 3.5+4.5 = 8.00 | 0.67+2.67 = **3.33** | 2 |

New centroids:
- Cluster 1 = [A3, A5, A6]: ((8+7+6)/3, (4+5+4)/3) = (21/3, 13/3) = **(7.00, 4.33)**
- Cluster 2 = [A1, A2, A4, A7, A8]: ((2+2+5+1+4)/5, (10+5+8+2+9)/5) = (14/5, 34/5) = **(2.80, 6.80)**

**Round 3 check:** against C1(7.00, 4.33) and C2(2.80, 6.80), membership is unchanged — Cluster 1 = [A3, A5, A6], Cluster 2 = [A1, A2, A4, A7, A8]. Centroids reproduce exactly → **converged**.

### Final answer — Question 1

| | Round 1 | Round 2 (converged) |
|---|---|---|
| Cluster 1 | {A3, A5} | **{A3, A5, A6}** |
| Cluster 2 | {A1, A2, A4, A6, A7, A8} | **{A1, A2, A4, A7, A8}** |
| Centroid 1 | (7.50, 4.50) | **(7.00, 4.33)** |
| Centroid 2 | (3.33, 6.33) | **(2.80, 6.80)** |

Key event: **A6 switches from Cluster 2 to Cluster 1 at round 2**. Convergence at round 3.

### Solution — Question 2 (K = 3, Euclidean, C1 = A2(2,5), C2 = A5(7,5), C3 = A8(4,9))

**Round 1:**

| Point | Coord | d to C1(2,5) | d to C2(7,5) | d to C3(4,9) | Cluster |
|---|---|---|---|---|---|
| A1 | (2,10) | 5.00 | 7.07 | **2.24** | 3 |
| A2 | (2,5) | **0.00** | 5.00 | 4.47 | 1 |
| A3 | (8,4) | 6.08 | **1.41** | 6.40 | 2 |
| A4 | (5,8) | 4.24 | 3.61 | **1.41** | 3 |
| A5 | (7,5) | 5.00 | **0.00** | 5.00 | 2 |
| A6 | (6,4) | 4.12 | **1.41** | 5.39 | 2 |
| A7 | (1,2) | **3.16** | 6.71 | 7.62 | 1 |
| A8 | (4,9) | 4.47 | 5.00 | **0.00** | 3 |

New centroids:
- Cluster 1 = [A2, A7]: ((2+1)/2, (5+2)/2) = (3/2, 7/2) = **(1.50, 3.50)**
- Cluster 2 = [A3, A5, A6]: ((8+7+6)/3, (4+5+4)/3) = (21/3, 13/3) = **(7.00, 4.33)**
- Cluster 3 = [A1, A4, A8]: ((2+5+4)/3, (10+8+9)/3) = (11/3, 27/3) = **(3.67, 9.00)**

**Round 2** — against C1(1.50, 3.50), C2(7.00, 4.33), C3(3.67, 9.00):

| Point | Coord | d to C1 | d to C2 | d to C3 | Cluster |
|---|---|---|---|---|---|
| A1 | (2,10) | 6.52 | 7.56 | **1.94** | 3 (unchanged) |
| A2 | (2,5) | **1.58** | 5.04 | 4.33 | 1 (unchanged) |
| A3 | (8,4) | 6.52 | **1.05** | 6.62 | 2 (unchanged) |
| A4 | (5,8) | 5.70 | **4.18** | 1.67 | 3 (unchanged) |
| A5 | (7,5) | 5.70 | **0.67** | 5.21 | 2 (unchanged) |
| A6 | (6,4) | 4.53 | **1.05** | 5.52 | 2 (unchanged) |
| A7 | (1,2) | **1.58** | **6.44** | 7.49 | 1 (unchanged) |
| A8 | (4,9) | 6.04 | 5.55 | **0.33** | 3 (unchanged) |

No point changes cluster and the recomputed centroids are identical to round 1 → **converged at round 2**.

### Final answer — Question 2

| Cluster | Members (final) | Centroid |
|---|---|---|
| 1 | **{A2, A7}** | **(1.50, 3.50)** |
| 2 | **{A3, A5, A6}** | **(7.00, 4.33)** |
| 3 | **{A1, A4, A8}** | **(3.67, 9.00)** |

Convergence after round 1 assignment — round 2 changes nothing.

### Notes

- The **dataset coordinates are confirmed exactly** against slide 25: A1(2,10) A2(2,5) A3(8,4) A4(5,8) A5(7,5) A6(6,4) A7(1,2) A8(4,9). No disagreement.
- **The old file's Q1 initial centroids (A3, A6) and Q2 initial centroids (A2, A5, A8) both match slide 44 exactly.** No disagreement.
- **Q1 metric is an assumption.** Slide 44 names Euclidean only for question 2; it is silent on question 1's metric. The old file uses Manhattan. The lecture example on p25-31 is the authority the slide points to, and that page was not provided as an image.
- **Q2 has no ties** in round 1, so the greedy tie-breaker note never actually fires in this exercise. The tie-breaker *does* matter in Q1: **A5 is equidistant (2 and 2) from both centroids at round 1** and goes to Cluster 1 per the rule. Missing this rule changes Q1's whole trajectory.
- **The homework only asks for one round** ("ให้จบหนึ่งรอบคำนวณ centroid ใหม่ และคำนวณตำแหน่ง centroid ใหม่ของรอบที่ 2"). Rounds beyond that in the old file are extra work, harmless but beyond the question.
- **Handwritten images are largely unreliable as reference answers.** The vision reads of both jpg files show a *different* dataset than slide 25 (q1 shows points A1–A9 with different coordinates and writes both initial centroids as "(6,4)"; q2's header reads "k=3, c1=A1(2,5), c2=A6(7,5), c3=A4(4,4)" and its point list includes A5(7,6)). Neither matches the slide-25 data or the slide-44 centroid assignments. The q2 page is also partly covered by a white object at the top. Treat these as illustration only, never as answer keys.
- The old file attributes the handwritten pages to student ID 6704101410. That ID is **not verifiable** from the images themselves.

---

## DISAGREEMENTS WITH INDEPENDENT DERIVATION

The parent agent's K-Means verification values **are not the homework on slide 44**. They describe the *in-lecture worked example* on page 25, not either homework sub-question. Recorded, not corrected.

### D1 — Which problem the K-Means figures belong to (structural, not an error)

| | Parent's derivation | Old file (and slide 44) |
|---|---|---|
| K | 3 | 3 (Q2) / 2 (Q1) |
| Metric | Manhattan | Euclidean (Q2); Manhattan assumed (Q1) |
| Initial centroids | C1(2,10), C2(5,8), C3(1,2) | Q1: A3(8,4), A6(6,4) · Q2: A2(2,5), A5(7,5), A8(4,9) |

The parent's initial centroids are **exactly the c1(2,10), c2(5,8), c3(1,2) listed on slide 25** as the in-lecture k=3 example ("ตั้งต้น k ค่า... สมมติ k = 3, ให้ c1(2,10), c2(5,8), c3(1,2)"). They are *not* the homework centroids from slide 44, which says "ให้ centroid ตั้งต้น คือ A2 A5 A8" for question 2.

So: **no numeric conflict with the old file — the parent solved a different problem.** The old file's values are slide-44-correct. Both values are recorded here; the parent should confirm which exercise the new guide intends to present.

### D2 — Three distance values in Q1 round 2 are rounded the wrong way

The old file writes `|5−3.33| + |8−6.33| = 1.67 + 1.67 = 3.34` (A4 → C2). Exact: |5−20/6| + |8−38/6| = 1.6667 + 1.6667 = 3.3333 → **3.33**, not 3.34.

Same for A8 → C2: `|4−3.33| + |9−6.33| = 0.67 + 2.67 = 3.34`. Exact: 0.6667 + 2.6667 = 3.3333 → **3.33**.

Both are ceiling errors on a repeating decimal. Cluster assignment is unaffected. **Old file: 3.34. Correct: 3.33.**

### D3 — Two distance values in Q2 round 2 are wrong

| Point | Old file | Recomputed (exact) |
|---|---|---|
| A4 → C2 | 4.14 | **4.18** |
| A7 → C2 | 6.40 | **6.44** |

Not a rounding artifact: using the exact centroid C2 = (7.00, 13/3) gives √(4 + 13.444) = 4.18 and √(36 + 5.444) = 6.44. The old values appear to come from a mis-substitution of the centroid's Y-coordinate. Cluster assignment is unaffected (both points still clearly nearest to C1/C2 respectively). **Old file: 4.14 and 6.40. Correct: 4.18 and 6.44.**

### Confirmed as agreeing

- HW#1 churn: all 10 rows, TP=3, TN=3, FP=2, FN=2, and all four metrics = 60.00% — old file, slide image, parent derivation, and my recomputation all match exactly. **No disagreement.**
- K-Means dataset coordinates — all 8 points match slide 25 exactly. **No disagreement.**
- K-Means final cluster memberships and final centroids for both Q1 and Q2 — my independent implementation reproduces the old file's results exactly, including the A6 switch and the convergence rounds. **No disagreement.**
- HW#2 (slide 35) all 12 metric values — match recomputation exactly. **No disagreement.**

---

## Figures

| File | Contents |
|---|---|
| `lect07_p26_churn_data.png` | Slide 26, "แบบฝึกหัด: นับ TP, TN, FP และ FN" — the 10-row Customer Inactive table (Actual/Predicted Yes-No) with "Positive Class: Inactive = Yes" and blank TP/TN/FP/FN answer lines |
| `lect07_p34_hw1.png` | Slide 34, "Homework#1" — the homework statement, page-26 data panel on the left, and the FIFA W-Cup 2026 page-30 metric worked example (TP=4, FN=2, FP=1, TN=3) on the right |
| `lect07_p35_hw2.png` | Slide 35, "Homework#2" — three confusion matrices for Candidate Models A/B/C on the same 100-customer evaluation set, with the three required steps |
| `lect08_p25_points.png` | Slide 25, "Example: K-Mean Clustering" — the A1–A8 point table (V1, V2) plus two scatter plots, the second marking the in-lecture k=3 centroids c1(2,10), c2(5,8), c3(1,2) |
| `lect08_p44_hw_kmeans.png` | Slide 44, "การบ้าน" — the K-Means homework: question 1 (K=2, C1=A3, C2=A6) and question 2 (K=3, Euclidean, initial centroids A2 A5 A8), plus the greedy tie-breaker note |
| `hw_kmeans_handwritten_q1.jpg` | Handwritten K=2 / Manhattan student page (cited as student 6704101410) — its own dataset (A1–A9) does **not** match slide 25; illustration only, partly illegible |
| `hw_kmeans_handwritten_q2.jpg` | Handwritten K=3 / Euclidean student page — header reads initial centroids A1(2,5), A6(7,5), A4(4,4) and a point list including A5(7,6), neither matching slide 25; top of page partly covered by a white object; illustration only, partly illegible |