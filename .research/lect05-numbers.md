# Lect05 (EDA) — recovered worked numbers

Source: `10301351 DS 1-69 Lect05 Exploratory Data Analysis (EDA).pdf` (28 slides)
Method: PyMuPDF page raster -> vision. Page numbering below = SLIDE number (PDF index + 1).
28 slides, page size 960x540 pt.

## STATUS: INCOMPLETE — no slide images were successfully read

No numbers were recovered from slides 10-16 or 18-26. Nothing in this file is
inferred, estimated, or reconstructed from general EDA knowledge. Every slide
listed below is **NOT READABLE** in this session.

### Why (blocker, not a data problem)

1. **Vision tool rate-limited.** Every `vision_analyze` call failed with
   `429 - google/gemma-4-31b-it:free is temporarily rate-limited upstream`
   (shared upstream pool, not a per-user limit). 4 of 4 attempts failed.
2. **No local OCR fallback.** `tesseract` is not installed; `pytesseract` is not
   installed. Local Ollama serves only text-only models
   (`hf.co/IFM/K2-Horizon-7B-GGUF:Q4_K_M`, `spark-x2.5-4b-q4:latest`), so
   local inference cannot read the images either.
3. **The slides genuinely have no usable text layer.** Verified with PyMuPDF:
   pages 10-16 and 18-26 each return `textlen = 2` (just the page number) and
   `imgs = 1`. The content is a single raster image of
   **1672x941 px DeviceRGB**, i.e. the pixels are the only source. PyMuPDF at
   150-200 dpi reproduces native resolution exactly; higher dpi adds no
   information.

An alternate API route to a non-free vision model did answer successfully for
one probe, but the scripted batch reader needed to drive the remaining pages was
**denied by the operator**, so it was not run and no further pages were read.

## Verified from the existing text layer

- **Slide 17:** "Fence เป็นเกณฑ์ ส่วน Whisker สิ้นสุดที่ค่ำจริงสุดท้ายซึ่งยังอยู่ภายใน Fence"
  — Fence is the criterion; the whisker ends at the last *actual* data value
  that still lies inside the fence. (Concept only; no numbers on this slide.)

## Pages still needing a visual read

| Slides | Expected content (inferred from lecture sequence, NOT from the slides) |
|---|---|
| 10-16 | five-number summary, quartiles, IQR, fence rules, boxplot diagrams |
| 18-26 | boxplot / outlier worked examples |

**Every number sought — concrete data set values, Q1, median, Q3, IQR, lower
fence, upper fence, marked outlier values — is NOT READABLE from this session.**

## How to finish this

Rerun with vision capacity available. Rasterise and read, e.g.:

```
python -c "import pymupdf; d=pymupdf.open(r'<pdf>'); [d.load_page(n-1).get_pixmap(dpi=200).save(r'<out>_p%02d.png'%n) for n in [10,11,12,13,14,15,16,18,19,20,21,22,23,24,25,26]]"
```

Then one vision call per PNG, writing each page's findings to this file
immediately after it is read (2-4 pages per batch), so rate limiting cannot
discard completed work. Cropping to the numeric region of each slide at
dpi 200+ will help on the boxplot axis-label pages.
