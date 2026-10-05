# Lect07 (Decision Tree & Classifier Evaluation) — recovered worked numbers

Source: `10301351 DS 1-69 Lect07 Decision Tree and Classifier Evaluation.pdf` (36 slides)
Method: PyMuPDF page raster -> vision. Page numbering below = SLIDE number (PDF index + 1).
36 slides, page size 960x540 pt.

## STATUS: INCOMPLETE — slides 26 and 30 not read; Homework#1 not answerable

## Verified from the existing text layer

### Slide 23 — FIFA World Cup 2026 example
Class labels: **C1 = play** (good form, ready to play), **C2 = rest** (should rest).
10 instances, Positive class = **play**.

| Instance | Actual | Predicted |
|---|---|---|
| 1 | rest | rest |
| 2 | rest | rest |
| 3 | play | rest |
| 4 | play | play |
| 5 | play | rest |
| 6 | rest | play |
| 7 | play | play |
| 8 | rest | rest |
| 9 | play | play |
| 10 | play | play |

TP = 4, TN = 3, FP = 1, FN = 2.
Accuracy 70.00%, Precision 80.00%, Recall 66.67%, F1 72.73%.
(Arithmetic check, consistent with the slide: (4+3)/10 = 70.00%;
4/(4+1) = 80.00%; 4/(4+2) = 66.67%; F1 = 2*(.80*.667)/(.80+.667) = 72.73%.)

### Slide 34 — Homework#1
"จากข้อมูล Customer Churn prediction ในหน้า26 เขียนแสดงวิธีคำนวณ Evaluation
metrics แบบเดียวกับ หน้า30"
— *From the Customer Churn prediction data on page 26, show the calculation of
the evaluation metrics in the same way as on page 30.*

Slide 34 also carries the labels "การค านวณ Evaluation Metrics หน้า 30"
(computing evaluation metrics, page 30) and "ข้อมูลหน้า26" (the data, page 26).

## NOT READABLE in this session

- **Slide 26 — Customer Churn dataset:** every data row. NOT READABLE.
- **Slide 30 — evaluation-metrics worked example:** the exact arithmetic layout
  that Homework#1 says to copy. NOT READABLE.
- **Weighted Gini / Gini Gain worked numbers:** not located. NOT READABLE.
  Candidate slides in the decision-tree region (9-22) were not visually read.

## Partial visual read — slide 26 (one successful call, summary only)

A single vision call on slide 26 returned **a slide description, not a row-level
transcription**:

> "This slide presents a customer inactivity prediction model's performance,
> illustrating True Positives (TP), True Negatives (TN), False Positives (FP),
> and False Negatives (FN) based on a table comparing actual vs. predicted
> inactivity status for 10 customers."

So slide 26 appears to hold a **10-customer table of actual vs. predicted
inactivity/churn status**, organised into the four TP/TN/FP/FN categories.

**The individual cell values were not captured.** No per-customer rows, no
positive-class definition for the churn task, and no per-category counts were
recovered. The "10 customers" figure above is a slide-description claim, not a
verified cell count, and is **not** sufficient to build a confusion matrix.

## Homework#1 viability

**Not viable from this session — verdict: the churn dataset on slide 26 is NOT
legible enough to compute metrics from.**

Concretely, three things are missing, each independently blocking:

1. **No cell values.** The 10 churn rows are image-only (`textlen = 2`,
   `imgs = 1`) and were never transcribed. Without actual-vs-predicted pairs
   there is nothing to count.
2. **No confirmed positive class.** Slide 23 defines Positive = play for the
   football case, but for the churn task the positive class is *No* (retained
   customer) in the usual framing. Nothing on slide 26 was read that settles
   it. TP/TN/FP/FN flip entirely with this choice, so the metrics are ambiguous
   until it is fixed.
3. **No reference arithmetic.** Slide 30, the template the homework says to
   mirror, was not read, so the expected presentation of the four metrics is
   unknown.

**Therefore no confusion matrix and no metrics are given here.** Supplying a
TP/TN/FP/FN split for the churn table would mean inventing ten data rows and
four counts, which is exactly what must not be done.

### What would make it solvable

Read slides 26 and 30 visually and record, per slide:

- Slide 26: every row's actual label and predicted label, plus which label is
  the positive class.
- Slide 30: the metric formulas and the arithmetic layout used.

Then the metrics follow mechanically:

```
Accuracy  = (TP + TN) / (TP + TN + FP + FN)
Precision = TP / (TP + FP)
Recall    = TP / (TP + FN)
F1        = 2 * (Precision * Recall) / (Precision + Recall)
```

Applied to a 10-row table the denominator is 10, matching the football example.

## Blocker detail

Vision is pinned in Hermes config to a free model
(`auxiliary.vision.provider: openrouter`, `model: google/gemma-4-31b-it:free`)
which returned `429 temporarily rate-limited upstream` on every attempt. No local
OCR is available: `tesseract` and `pytesseract` are both absent, and the local
Ollama server serves text-only models. Slide content is a single 1672x941 px
raster per page, so PyMuPDF rendering at 150-200 dpi already reproduces native
resolution and higher dpi adds nothing.

An alternate API route to a non-free vision model did answer (it produced the
slide 26 description above), but the scripted batch reader needed to cover the
remaining pages was **denied by the operator**, so it was not run.

## How to finish this

```
python -c "import pymupdf; d=pymupdf.open(r'<pdf>'); [d.load_page(n-1).get_pixmap(dpi=200).save(r'<out>_p%02d.png'%n) for n in [26,30]]"
```

Add the weighted-Gini/Gini-Gain slides (decision-tree region, slides 9-22) to
the same batch. Read 2-4 pages per batch and append each page's numbers to this
file immediately, so rate limiting cannot discard completed work.
