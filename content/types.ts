/**
 * Content schema for DS Final Guide.
 *
 * These types are the contract between the verified lecture content (P1) and
 * every UI surface (P2-P5). They intentionally contain no values — no number
 * or formula string lives here. If a number is not confirmed against the
 * lecture slides it does not belong in this layer.
 *
 * Lecture scope: 10301351 Data Science, Lect 05 - Lect 09.
 */

export type LectureRef = "Lect 05" | "Lect 06" | "Lect 07" | "Lect 08" | "Lect 09";

/* ------------------------------------------------------------------ */
/* Shared primitives                                                    */
/* ------------------------------------------------------------------ */

/**
 * A block of teaching copy. `kind` lets the renderer pick a layout without
 * the content layer knowing anything about components.
 */
export type ContentBlock =
  | { kind: "prose"; text: string }
  /** A definition the lecturer gives. Rendered as a labelled definition. */
  | { kind: "definition"; term: string; text: string }
  /** A formula with its notation written out in full. */
  | { kind: "formula"; formulaId: string }
  /** An exam pitfall. Only place besides `marker` where accent colour appears. */
  | { kind: "pitfall"; title: string; text: string }
  /** A worked numeric example, with every intermediate step shown. */
  | { kind: "worked-example"; title: string; steps: string[]; answer: string }
  /** A key term that must be remembered. Accent-coloured. */
  | { kind: "marker"; text: string }
  | { kind: "table"; caption: string; headers: string[]; rows: string[][] }
  | { kind: "image"; src: string; alt: string; caption?: string };

/* ------------------------------------------------------------------ */
/* Chapters — P2                                                        */
/* ------------------------------------------------------------------ */

export interface Chapter {
  /** Display index, "01" - "05". */
  index: string;
  slug: string;
  /** Short English title used in the giant display heading. */
  title: string;
  /** Thai title. */
  titleTh: string;
  lectures: LectureRef[];
  /** One-sentence promise shown as the chapter standfirst. */
  standfirst: string;
  /** Key terms the student must memorise. Accent-coloured on render. */
  keyTerms: string[];
  /** Concepts, each with a heading and body copy. */
  sections: Array<{ heading: string; body: ContentBlock[] }>;
}

/* ------------------------------------------------------------------ */
/* Formulas — P4                                                       */
/* ------------------------------------------------------------------ */

export interface Formula {
  id: string;
  /** Whether this was checked against the lecture slides. See `Verification`. */
  verification: Verification;
  name: string;
  /** The expression exactly as the slides write it, in plain text. */
  expression: string;
  /** KaTeX expression for rich math rendering. */
  tex?: string;
  /** Each symbol and what it means. */
  symbols: Array<{ symbol: string; meaning: string }>;
  /** What the formula returns, in one line. */
  output: string;
  /**
   * A numeric example using real slide numbers.
   * Optional: a formula that generalises rather than computes (Minkowski, the
   * weighted split Gini) has nothing to drill, and forcing a made-up one would
   * put invented figures into the content layer.
   */
  example?: { given: string; steps: string[]; result: string };
  /** The trap a student falls into. */
  pitfall?: string;
  lectures: LectureRef[];
}

/* ------------------------------------------------------------------ */
/* Scrollytelling player — P3                                          */
/* ------------------------------------------------------------------ */

export type EpisodeId = "ep01" | "ep02" | "ep03" | "ep04" | "ep05" | "ep06";

export type EpisodeVisual =
  /** Sorted five-number summary with fences drawn. */
  | { kind: "boxplot"; min: number; q1: number; median: number; q3: number; max: number; lowerFence: number; upperFence: number; outliers: number[] }
  /** Decision tree with weighted Gini at the root. */
  | { kind: "decision-tree"; rootGini: number; splits: Array<{ feature: string; threshold: number; nLeft: number; nRight: number; giniLeft: number; giniRight: number; weightedGini: number; gain: number }> }
  /** 2x2 confusion matrix with all four metrics derived. */
  | { kind: "confusion-matrix"; tp: number; fp: number; fn: number; tn: number; positiveLabel: string; positiveLabelTh: string }
  /** Scatter with centroids, one step per algorithm iteration. */
  | { kind: "kmeans"; points: Array<{ id: string; x: number; y: number }>; initialCentroids: Array<{ id: string; x: number; y: number }>; metric: "manhattan" | "squared-euclidean" }
  /** SHAP force plot around a base value. */
  | { kind: "shap-force"; baseValue: number; prediction: number; contributions: Array<{ feature: string; value: number }> }
  /** Model accuracy decaying as the input distribution shifts. */
  | { kind: "concept-drift"; timeline: Array<{ t: number; accuracy: number; note?: string }> };

export interface EpisodeStep {
  /** 1-based position. */
  n: number;
  /**
   * Whether the numbers shown at this step were checked against the slides.
   * A step may render fine but still teach an unverified figure, so this
   * travels with the step rather than only with the episode.
   */
  verification: Verification;
  /** Under ~8 words — SplitText animates this and long headlines break it. */
  headline: string;
  /** 2-3 sentences, teaching voice, Thai. */
  body: string;
  /** What the panel shows at this step. */
  visual: EpisodeVisual;
  /** Present only where a number must be shown verbatim. */
  numbers?: string[];
}

export interface Episode {
  id: EpisodeId;
  index: string;
  title: string;
  titleTh: string;
  lectures: LectureRef[];
  steps: EpisodeStep[];
}

/* ------------------------------------------------------------------ */
/* Calculators — P4                                                     */
/* ------------------------------------------------------------------ */

export type CalculatorId = "tukey-iqr" | "confusion-matrix";

export interface Calculator {
  id: CalculatorId;
  name: string;
  nameTh: string;
  description: string;
  lectures: LectureRef[];
}

/* ------------------------------------------------------------------ */
/* Homework solutions — P5                                              */
/* ------------------------------------------------------------------ */

export interface HomeworkProblem {
  id: string;
  lectures: LectureRef[];
  /** Where the statement comes from, e.g. "Lect 07 p.34". */
  source: string;
  /** Source image, if the statement is a photo of a slide. */
  imageSrc?: string;
  statement: string;
  given: Array<{ label: string; value: string }>;
  /** Every arithmetic step, with the formula named. */
  solutionSteps: string[];
  answer: string;
  /** Ambiguity found while transcribing the slide. */
  transcriptionNote?: string;
}

/* ------------------------------------------------------------------ */
/* Mock test — P5                                                       */
/* ------------------------------------------------------------------ */

export type QuestionKind = "numeric" | "interpretation" | "scenario" | "true-false" | "essay";
export type QuestionOption = { label: string; text: string; correct: boolean };

/**
 * How a question's answer was established. Surfaced in the UI so a student
 * can tell a definition-backed answer from one that still needs checking
 * against a lecture-specific figure.
 */
export type Verification = "verified-by-principle" | "needs-slide-check";

export interface Question {
  n: number;
  kind: QuestionKind;
  lectures: LectureRef[];
  /** Thai question text. */
  prompt: string;
  options?: QuestionOption[];
  /** Why the correct answer is correct, step by step. */
  explanation: string;
  /** The trap, and why a student would fall into it. */
  distractor?: string;
  /**
   * Where to look to check this question. Optional, but when present it must
   * point at the page actually verified in this deck version — a stale page
   * number is worse than none, because it sends a student to the wrong slide.
   */
  slideRef?: string;
  verification: Verification;
}

export interface MockTest {
  id?: string;
  title: string;
  titleTh: string;
  description?: string;
  /** Suggested seconds for the whole paper. */
  timeLimitSeconds: number;
  questions: Question[];
}

/* ------------------------------------------------------------------ */
/* Retrieval corpus — reserved for the AI Tutor (P7, not yet wired)     */
/* ------------------------------------------------------------------ */

export interface TutorCorpusChunk {
  id: string;
  lecture: LectureRef;
  /** The passage the tutor is allowed to ground an answer in. */
  text: string;
  /** Where it came from, shown to the student as a citation. */
  source: string;
}