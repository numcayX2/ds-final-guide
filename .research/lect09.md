# Lecture 09 — Responsible Data Science: Explain, Evaluate & Communicate

Source: `C:\Users\Acer\Downloads\10301351 DS 1-69 Lect09 Responsible Data Science.pdf` (28 pages).
**Method note:** the PDF's embedded text layer is 218 characters total (title page + page numbers only);
every slide is a raster image. All content below was read visually from page renders at 140 dpi.
Page numbers cited are the **slide page number** (1-based) in the PDF.

Status: **BLOCKED — zero slide content could be read.** No content below is claimed from the slides,
because nothing was successfully read from them. See "Extraction attempts and blockers" at the end for
the full diagnostic trail. A blueprint assumption about the SHAP base value (+29% => 29 percentage
points) is **UNVERIFIED** — do not treat it as confirmed by this file.

## Extraction attempts and blockers (verified)

- **Page renders: DONE.** All 28 pages rasterised to 140 dpi PNG at
  `C:\Users\Acer\AppData\Local\Temp\lect09png\p01.png` .. `p28.png` (~49 MB total).
  The renders exist and are good quality; they are simply unreadable by the tools available.
- **Text layer: confirmed empty of content.** Both copies on disk
  (`10301351 DS 1-69 Lect09 ...pdf` and `10301351 DS 169 Lect09 ..._261003_153742.pdf`)
  are 28 pages and contain byte-identical text extraction of 218 characters:
  `"Data Science\n10301351 \nResponsible Data Science:\nExplain, Evaluate & Communicate\nอ.ดร.พาสน์ ปราโมกข์ชน\nวิทยากรคอมพิวเตอ..."` — i.e. title page plus page numbers only. The second
  copy is therefore no help; the slides are images in both.
- **vision_analyze: 6 attempts, 0 successes.** Every call returned
  `HTTP 429 — google/gemma-4-31b-it:free is temporarily rate-limited upstream ...
  limit_source: upstream_provider_shared_pool`. This is an upstream free-tier shared pool, so it is
  not fixed by retrying quickly; it needs a different/BYO vision provider or a wait.
- **No local vision model.** Ollama is running on :11434 with `hf.co/IFM/K2-Horizon-7B-GGUF:Q4_K_M`
  and `spark-x2.5-4b-q4:latest`; both are text/completion-only, no vision projector. LM Studio on
  :1234 is not responding.
- **No Thai OCR available.** `tesseract`, `pytesseract`, `easyocr`, `paddleocr` all absent. The
  Windows built-in OCR engine reports only `en-GB` and `en-US` recognizer languages — no `th` — so
  even working it would not read Thai body text (my PowerShell harness also failed on an unresolved
  `Windows.Graphics.Imaging.BitmapDecoder` type).
- **rapidocr-onnxruntime 1.4.4 installed OK** (PP-OCR based, multilingual-capable), but the run was
  **denied by the user**, so it is untested. It is the most promising remaining path and would need
  an approved run to determine whether it reads Thai at usable accuracy.


---

## Global vs local explainability — the slide's own wording

_To be filled from slide reads._

## Model-agnostic vs model-specific — the slide's own wording, with examples

_To be filled from slide reads._

## SHAP — base value, reading a contribution, percentage points vs percent

_To be filled from slide reads._

## Concept drift — definition, P(Y|X), types, worked figure

_To be filled from slide reads._

## Ethics and privacy — proxy features, purpose limitation, data minimisation

_To be filled from slide reads._

## Other examinable content

_To be filled from slide reads._

## Not readable

**All 28 pages are unreadable** (p01–p28). Not a single slide was successfully read, so nothing in
this file is sourced from the slides. Any blueprint content for this lecture is currently
unverified against the source.

To unblock, in order of expected value:
1. Approve a `rapidocr-onnxruntime` run over `C:\Users\Acer\AppData\Local\Temp\lect09png\*.png`
   (already installed; needs a Thai-capable model — confirm it loads a `th` PP-OCR model, else its
   output will be English-only and still miss the Thai).
2. Or point `vision_analyze` at a paid/BYO vision provider — the current free pool is returning 429
   on every call, so batching and retrying will not help.
3. Or install Tesseract with `tha` and `eng` traineddata and OCR the same PNGs.

