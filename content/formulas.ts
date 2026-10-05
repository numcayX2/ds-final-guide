import type { Formula } from "./types";

/**
 * Formula library.
 *
 * Every entry carries `verification`. `needs-slide-check` entries are real and
 * teachable, but their figures were not confirmed against the lecture slides —
 * the UI must show that state rather than presenting them as lecturer data.
 *
 * Verified against slides on 2026-10-05:
 *   Lect 07 p23  FIFA World Cup 2026 confusion matrix, Positive = Play
 *   Lect 08 p19-p29 K-Means Manhattan iteration
 *   Lect 08 p15 distance metric notation
 */

const VERIFIED = "verified-by-principle" as const;
const NEEDS_CHECK = "needs-slide-check" as const;

export const formulas: Formula[] = [
  /* ---------------- Lect 05 — EDA ---------------- */
  {
    id: "iqr",
    verification: VERIFIED,
    name: "IQR",
    expression: "Q3 - Q1",
    symbols: [
      { symbol: "Q3", meaning: "ควอร์ไทล์อันดับสาม" },
      { symbol: "Q1", meaning: "ควอร์ไทล์อันดับหนึ่ง" },
    ],
    output: "ความกว้างของช่วงกลางของข้อมูล ครอบคลุม 50% ของทั้งหมด",
    example: {
      given: "Q1 = 20, Q3 = 35",
      steps: ["IQR = Q3 - Q1", "IQR = 35 - 20", "IQR = 15"],
      result: "15",
    },
    pitfall: "IQR วัดความกระจายของข้อมูลครึ่งหนึ่งกลางๆ ไม่ใช่ความกระจายทั้งหมด จุดที่อยู่ไกลจากกลุ่มอาจไม่ทำให้ IQR ใหญ่เลย",
    lectures: ["Lect 05"],
  },
  {
    id: "lower-fence",
    verification: VERIFIED,
    name: "Lower Fence",
    expression: "Q1 - 1.5 x IQR",
    symbols: [
      { symbol: "Q1", meaning: "ควอร์ไทล์อันดับหนึ่ง" },
      { symbol: "IQR", meaning: "ผลต่างระหว่าง Q3 กับ Q1" },
    ],
    output: "เกณฑ์ล่าง ค่าที่ต่ำกว่านี้ถือเป็น outlier",
    example: {
      given: "Q1 = 20, Q3 = 35, IQR = 15",
      steps: ["Lower Fence = Q1 - 1.5 x IQR", "= 20 - 1.5 x 15", "= 20 - 22.5"],
      result: "-2.5",
    },
    pitfall: "Fence เป็นเพียงเกณฑ์ ไม่ใช่ค่าข้อมูลจริง ไม่มีจุดไหนที่ Whisker จะไปถึง Fence",
    lectures: ["Lect 05"],
  },
  {
    id: "upper-fence",
    verification: VERIFIED,
    name: "Upper Fence",
    expression: "Q3 + 1.5 x IQR",
    symbols: [
      { symbol: "Q3", meaning: "ควอร์ไทล์อันดับสาม" },
      { symbol: "IQR", meaning: "ผลต่างระหว่าง Q3 กับ Q1" },
    ],
    output: "เกณฑ์บน ค่าที่สูงกว่านี้ถือเป็น outlier",
    example: {
      given: "Q1 = 20, Q3 = 35, IQR = 15",
      steps: ["Upper Fence = Q3 + 1.5 x IQR", "= 35 + 1.5 x 15", "= 35 + 22.5"],
      result: "57.5",
    },
    pitfall: "จุดที่อยู่ระหว่าง Fence กับค่าจริงสูงสุด ไม่ใช่ outlier แม้จะห่างจากกลุ่มมากก็ตาม",
    lectures: ["Lect 05"],
  },

  /* ---------------- Lect 07 — Decision Tree & Evaluation ---------------- */
  {
    id: "gini",
    verification: NEEDS_CHECK,
    name: "Gini",
    expression: "Gini(D) = 1 - SUM(p_i^2)",
    symbols: [
      { symbol: "D", meaning: "ชุดข้อมูลที่พิจารณา" },
      { symbol: "p_i", meaning: "สัดส่วนของข้อมูลในคลาส i" },
    ],
    output: "ค่าความไม่บริสุทธิ์ของชุดข้อมูล ยิ่งต่ำยิ่งบริสุทธิ์",
    example: {
      given: "คลาส A 50 คน, คลาส B 50 คน",
      steps: ["p_A = 0.5, p_B = 0.5", "Gini = 1 - (0.5^2 + 0.5^2)", "Gini = 1 - 0.5"],
      result: "0.5",
    },
    lectures: ["Lect 07"],
  },
  {
    id: "gini-split",
    verification: NEEDS_CHECK,
    name: "Weighted Gini Split",
    expression: "(n_L / n) x Gini_L + (n_R / n) x Gini_R",
    symbols: [
      { symbol: "n_L, n_R", meaning: "จ านวนข้อมูลในฝั่งซ้ายและฝั่งขวา" },
      { symbol: "n", meaning: "จำนวนข้อมูลทั้งหมดในโหนดพ่อ" },
    ],
    output: "ค่า Gini ของโหนดลูก เมื่อถัวเฉลี่ยตามจำนวนข้อมูลแต่ละฝั่ง",
    lectures: ["Lect 07"],
  },
  {
    id: "gini-gain",
    verification: NEEDS_CHECK,
    name: "Gini Gain",
    expression: "Gini(Parent) - Gini(Split)",
    symbols: [{ symbol: "Gain", meaning: "ความดีของการแบ่ง เทียบกับก่อนแบ่ง" }],
    output: "Candidate Split ที่ได้ค่า Gain สูงสุด คือ split ที่ดีที่สุด",
    pitfall: "เลือก split ที่ได้ Gini Gain สูงสุดเสมอ ไม่ใช่ตัวที่ Gini ของฝั่งใดฝั่งหนึ่งต่ำที่สุด",
    lectures: ["Lect 07"],
  },
  {
    id: "accuracy",
    verification: VERIFIED,
    name: "Accuracy",
    expression: "(TP + TN) / (TP + TN + FP + FN)",
    symbols: [
      { symbol: "TP", meaning: "ทำนายว่าเป็น Positive และความจริงก็เป็น Positive" },
      { symbol: "TN", meaning: "ทำนายว่าเป็น Negative และความจริงก็เป็น Negative" },
    ],
    output: "สัดส่วนที่ทำนายถูกต้องทั้งหมด",
    example: {
      given: "TP=4, TN=3, FP=1, FN=2 (เคส FIFA World Cup 2026, Lect 07 p.23)",
      steps: ["Accuracy = (4 + 3) / (4 + 3 + 1 + 2)", "= 7 / 10"],
      result: "70.00%",
    },
    pitfall: "Accuracy ซ่อนความผิดพลาดได้มากเมื่อคลาสไม่สมดุล เช่น 99% เป็น Negative ก็ยังได้ 99% แม้จำแนกไม่ผิดเลยสักตัว",
    lectures: ["Lect 07"],
  },
  {
    id: "precision",
    verification: VERIFIED,
    name: "Precision",
    expression: "TP / (TP + FP)",
    symbols: [{ symbol: "FP", meaning: "ทำนายว่าเป็น Positive แต่ความจริงเป็น Negative" }],
    output: "จากที่ระบบบอกว่าเป็น Positive มีกี่คนที่พูดได้",
    example: {
      given: "TP=4, FP=1 (เคส FIFA World Cup 2026)",
      steps: ["Precision = 4 / (4 + 1)", "= 4 / 5"],
      result: "80.00%",
    },
    pitfall: "เลือกใช้เมื่อ False Positive แพงกว่า เช่น สแปมเมลหรือการแจ้งเหตุฉุกเฉิน",
    lectures: ["Lect 07"],
  },
  {
    id: "recall",
    verification: VERIFIED,
    name: "Recall",
    expression: "TP / (TP + FN)",
    symbols: [{ symbol: "FN", meaning: "ทำนายว่าเป็น Negative แต่ความจริงเป็น Positive" }],
    output: "จากความจริงที่เป็น Positive ระบบจับได้กี่คน",
    example: {
      given: "TP=4, FN=2 (เคส FIFA World Cup 2026)",
      steps: ["Recall = 4 / (4 + 2)", "= 4 / 6"],
      result: "66.67%",
    },
    pitfall: "เลือกใช้เมื่อ False Negative วิกฤต เช่น ปล่อยคนป่วยหลุดเครื่องตรวจ หรือลูกค้าหายไป",
    lectures: ["Lect 07"],
  },
  {
    id: "f1",
    verification: VERIFIED,
    name: "F1-Score",
    expression: "2 x (Precision x Recall) / (Precision + Recall)",
    symbols: [],
    output: "ค่าเดียวที่ถัวเฉลี่ย Precision กับ Recall ให้น้ำหนักเท่ากัน",
    example: {
      given: "Precision = 0.80, Recall = 0.6667",
      steps: ["F1 = 2 x (0.80 x 0.6667) / (0.80 + 0.6667)", "= 1.0667 / 1.4667"],
      result: "72.73%",
    },
    pitfall: "ใช้เมื่อ Precision กับ Recall ขัดกันและไม่อยากเลือกข้างใดข้างหนึ่ง",
    lectures: ["Lect 07"],
  },

  /* ---------------- Lect 08 — K-Means ---------------- */
  {
    id: "manhattan",
    verification: VERIFIED,
    name: "Manhattan Distance",
    expression: "Distance(A, Y) = |x1 - y1| + |x2 - y2| + ... + |xn - yn|",
    symbols: [
      { symbol: "A = <x1, x2, ...>", meaning: "เวกเตอร์ของจุดข้อมูล" },
      { symbol: "Y = <y1, y2, ...>", meaning: "เวกเตอร์ของจุดศูนย์กลาง" },
    ],
    output: "ระยะห่างแบบ L1 หรือ City-block distance ใช้คิดด้วยมือในข้อสอบ",
    example: {
      given: "A = (2, 10), C2 = (5, 8)",
      steps: [
        "= |2 - 5| + |10 - 8|",
        "= 3 + 2",
      ],
      result: "5",
    },
    pitfall: "นับแบบบวกล้วน ไม่มีรากที่สอง ต่างจาก Euclidean",
    lectures: ["Lect 08"],
  },
  {
    id: "euclidean",
    verification: VERIFIED,
    name: "Euclidean Distance",
    expression: "d(A, Y) = ROOT( SUM( (xi - yi)^2 ) )",
    symbols: [{ symbol: "n", meaning: "จำนวนตัวแปรของเวกเตอร์" }],
    output: "ระยะห่างแบบ L2 ความยาวเส้นตรงระหว่างสองจุด",
    example: {
      given: "X = <2, 10, 5, 3>, Y = <2, 5, 5, 4>",
      steps: [
        "SUM (xi - yi)^2 = 0 + 25 + 0 + 1",
      ],
      result: "ROOT(26) = 5.099",
    },
    pitfall:
      "หน้า 15 ของสไลด์เขียนผลเป็น 0 + 25 + 10 + 5 ซึ่งไม่ตรงกับเวกเตอร์ที่ให้มา ต้องยึดค่าที่คำนวณจากเวกเตอร์เสมอ",
    lectures: ["Lect 08"],
  },
  {
    id: "minkowski",
    verification: VERIFIED,
    name: "Minkowski Distance",
    expression: "d(x, y) = ( SUM |xi - yi|^p ) ^ (1/p)",
    symbols: [{ symbol: "p", meaning: "ค่า p กำหนดว่าเป็น Manhattan เมื่อ p = 1 และ Euclidean เมื่อ p = 2" }],
    output: "รูปทั่วไปของระยะห่างทั้งสองแบบ",
    lectures: ["Lect 08"],
  },
];
