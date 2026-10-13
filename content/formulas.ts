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

const VERIFIED_BY_PRINCIPLE = "verified-by-principle" as const;
const VERIFIED = "verified-by-principle" as const;

export const formulas: Formula[] = [
  /* ---------------- Lect 05 — EDA ---------------- */
  {
    id: "iqr",
    // Lect 05 p.17 prints IQR = Q3 - Q1 ("ช่วงของข้อมูลกึ่งกลาง 50%") and the
    // 1.5 x IQR fence rules. The deck still works no numeric example, so the
    // worked figures below are illustrative, not slide data.
    verification: VERIFIED_BY_PRINCIPLE,
    name: "IQR",
    expression: "Q3 - Q1",
    symbols: [
      { symbol: "Q3", meaning: "ควอร์ไทล์อันดับสาม" },
      { symbol: "Q1", meaning: "ควอร์ไทล์อันดับหนึ่ง" },
    ],
    output: "ความกว้างของช่วงกลางของข้อมูล ครอบคลุม 50% ของทั้งหมด",
    example: {
      given: "Q1 = 20, Q3 = 35 (ตัวเลขสมมติ สไลด์ไม่มีตัวอย่างเลข)",
      steps: ["IQR = Q3 - Q1", "IQR = 35 - 20", "IQR = 15"],
      result: "15",
    },
    pitfall: "IQR วัดความกระจายของข้อมูลครึ่งกลาง ไม่ใช่ทั้งหมด จุดไกลๆ ไม่ทำให้ IQR ใหญ่ขึ้น (Lect 05 p.17)",
    lectures: ["Lect 05"],
  },
  {
    id: "lower-fence",
    // Lect 05 p.17 "กฎที่ใช้บ่อยสำหรับการ Flag": Lower Fence = Q1 - 1.5 x IQR.
    // Numbers below are illustrative; the deck has no numeric example.
    verification: VERIFIED_BY_PRINCIPLE,
    name: "Lower Fence",
    expression: "Q1 - 1.5 x IQR",
    symbols: [
      { symbol: "Q1", meaning: "ควอร์ไทล์อันดับหนึ่ง" },
      { symbol: "IQR", meaning: "ผลต่างระหว่าง Q3 กับ Q1" },
    ],
    output: "เกณฑ์ล่าง ค่าที่ต่ำกว่านี้ถือเป็น outlier",
    example: {
      given: "Q1 = 20, Q3 = 35, IQR = 15 (ตัวเลขสมมติ)",
      steps: ["Lower Fence = Q1 - 1.5 x IQR", "= 20 - 1.5 x 15", "= 20 - 22.5"],
      result: "-2.5",
    },
    pitfall: "Fence เป็นเกณฑ์ ไม่ใช่ค่าข้อมูลจริง Whisker จบที่ค่าจริงสุดท้ายที่ยังอยู่ใน Fence และค่านอก Fence เป็น Potential Outlier ซึ่งไม่เท่ากับ Error (Lect 05 p.17)",
    lectures: ["Lect 05"],
  },
  {
    id: "upper-fence",
    // Lect 05 p.17 "กฎที่ใช้บ่อยสำหรับการ Flag": Upper Fence = Q3 + 1.5 x IQR.
    // Numbers below are illustrative; the deck has no numeric example.
    verification: VERIFIED_BY_PRINCIPLE,
    name: "Upper Fence",
    expression: "Q3 + 1.5 x IQR",
    symbols: [
      { symbol: "Q3", meaning: "ควอร์ไทล์อันดับสาม" },
      { symbol: "IQR", meaning: "ผลต่างระหว่าง Q3 กับ Q1" },
    ],
    output: "เกณฑ์บน ค่าที่สูงกว่านี้ถือเป็น outlier",
    example: {
      given: "Q1 = 20, Q3 = 35, IQR = 15 (ตัวเลขสมมติ)",
      steps: ["Upper Fence = Q3 + 1.5 x IQR", "= 35 + 1.5 x 15", "= 35 + 22.5"],
      result: "57.5",
    },
    pitfall: "ค่านอก Fence คือ Potential Outlier ที่ต้องตรวจสอบต่อ ไม่ใช่ Error และไม่ต้องลบเสมอไป Outlier Detection ตั้งคำถาม ไม่ได้ตัดสินคำตอบ (Lect 05 p.17-18)",
    lectures: ["Lect 05"],
  },

  /* ---------------- Lect 07 — Decision Tree & Evaluation ---------------- */
  {
    id: "gini",
    verification: VERIFIED,
    name: "Gini",
    expression: "Gini(t) = 1 - SUM(p_k^2)",
    symbols: [
      { symbol: "t", meaning: "โหนดที่พิจารณา" },
      { symbol: "p_k", meaning: "สัดส่วนของข้อมูลในคลาส k" },
    ],
    output: "ค่าความไม่บริสุทธิ์ของโหนด ยิ่งต่ำยิ่งบริสุทธิ์",
    example: {
      given: "5 Active, 1 Inactive (Lect 07 p.11)",
      steps: ["Gini = 1 - (5/6)^2 - (1/6)^2", "= 1 - (25/36 + 1/36)", "= 1 - 0.7222"],
      result: "0.278",
    },
    lectures: ["Lect 07"],
  },
  {
    id: "gini-split",
    verification: VERIFIED,
    name: "Gini Split",
    expression: "Gini_split = (n_L / n) x Gini(L) + (n_R / n) x Gini(R)",
    symbols: [
      { symbol: "n_L, n_R", meaning: "จำนวนข้อมูลในฝั่งซ้ายและฝั่งขวา" },
      { symbol: "n", meaning: "จำนวนข้อมูลทั้งหมดในโหนดพ่อ" },
    ],
    output: "ค่า Gini ของโหนดลูก เมื่อถัวเฉลี่ยตามจำนวนข้อมูลแต่ละฝั่ง",
    example: {
      given: "Candidate A: <= 45 วัน แบ่งเป็น 5/1 และ 1/5 (Lect 07 p.12)",
      steps: [
        "Gini(L) = Gini(R) = 0.278",
        "Gini_split = (6/12) x 0.278 + (6/12) x 0.278",
      ],
      result: "0.278",
    },
    lectures: ["Lect 07"],
  },
  {
    id: "gini-gain",
    verification: VERIFIED,
    name: "Gini Gain",
    expression: "Gini Gain = Gini(Parent) - Gini(Split)",
    symbols: [{ symbol: "Gain", meaning: "ความดีของการแบ่ง เทียบกับก่อนแบ่ง" }],
    output: "Candidate Split ที่ได้ค่า Gain สูงสุด คือ split ที่ดีที่สุด",
    example: {
      given: "Parent 6 Active + 6 Inactive = 0.500; Candidate A = 0.278, Candidate B = 0.444 (Lect 07 p.12)",
      steps: [
        "Gini Gain(A) = 0.500 - 0.278 = 0.222",
        "Gini Gain(B) = 0.500 - 0.444 = 0.056",
        "0.222 > 0.056 จึงเลือก Candidate A",
      ],
      result: "เลือก A ที่ Gain 0.222",
    },
    pitfall: "เลือก split ที่ได้ Gini Gain สูงสุดเสมอ ในเคสนี้ A แยกกลุ่มได้ดีกว่า B แม้ B จะดูสมดุลขึ้นก็ตาม",
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
    // The slide writes it the other way round: 2TP / (2TP + FP + FN).
    // Both forms are identical; quote whichever the question hands you.
    expression: "2 x (Precision x Recall) / (Precision + Recall)  =  2TP / (2TP + FP + FN)",
    symbols: [],
    output: "ค่าเดียวที่ถัวเฉลี่ย Precision กับ Recall ให้น้ำหนักเท่ากัน",
    example: {
      given: "Precision = 0.80, Recall = 0.6667",
      steps: ["F1 = 2 x (0.80 x 0.6667) / (0.80 + 0.6667)", "= 1.0667 / 1.4667"],
      result: "72.73%",
    },
    pitfall:
      "ใช้เมื่อ Precision กับ Recall ขัดกันและไม่อยากเลือกข้างใดข้างหนึ่ง สไลด์ปัดเป็นทศนิยมสองตำแหน่ง 0.67 และ 0.73 ให้เขียนตามสไลด์เมื่อคำนวณในข้อสอบ",
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
  {
    id: "inertia",
    verification: VERIFIED,
    name: "Inertia / WCSS",
    expression: "Inertia = SUM( || x_i - Centroid_c(i) ||^2 )",
    tex: "\\text{Inertia} = \\sum_{i=1}^{n} \\lVert x_i - C_{c(i)} \\rVert^2",
    symbols: [
      { symbol: "x_i", meaning: "จุดข้อมูลที่ i" },
      { symbol: "C_c(i)", meaning: "จุดศูนย์กลางของกลุ่มที่จุด i ถูกจัดเข้าไป" },
    ],
    output: "ผลรวมระยะยกกำลังสองจากแต่ละจุดถึง centroid ของมัน ยิ่งต่ำยิ่งกระชับ",
    example: {
      given: "กลุ่ม C3 = {A2(2,5), A7(1,2)} centroid (1.5, 3.5) (Lect 08 p.35 สูตร, ตัวเลขจากตารางรอบที่ 2)",
      steps: [
        "A2: (2-1.5)^2 + (5-3.5)^2 = 0.25 + 2.25 = 2.5",
        "A7: (1-1.5)^2 + (2-3.5)^2 = 0.25 + 2.25 = 2.5",
        "Inertia ของกลุ่ม C3 = 2.5 + 2.5",
      ],
      result: "5.0",
    },
    pitfall:
      "Inertia ใช้ Squared Euclidean ไม่ใช่ Manhattan ที่ใช้จัดกลุ่มด้วยมือ และ Inertia ต่ำสุดไม่ได้บอก K ที่ดีที่สุด เพราะเพิ่ม K แล้วค่าลดลงเสมอ (Lect 08 p.35, p.37)",
    lectures: ["Lect 08"],
  },
  {
    id: "silhouette",
    verification: VERIFIED,
    name: "Silhouette Score",
    expression: "s(i) = (b(i) - a(i)) / max(a(i), b(i))",
    tex: "s(i) = \\frac{b(i) - a(i)}{\\max\\bigl(a(i),\\, b(i)\\bigr)}",
    symbols: [
      { symbol: "a(i)", meaning: "ระยะเฉลี่ยจากจุด i ไปยังจุดอื่นในกลุ่มเดียวกัน (Compactness)" },
      { symbol: "b(i)", meaning: "ระยะเฉลี่ยไปยังกลุ่มที่ใกล้ที่สุดรองลงมา (Separation)" },
    ],
    output: "ค่าในช่วง -1 ถึง +1 ใกล้ +1 คือกลุ่มดี ใกล้ -1 คือจัดกลุ่มไม่ดี",
    example: {
      given: "a(i) = 2, b(i) = 6 (ตัวเลขสมมติเพื่อฝึกคำนวณ ไม่ใช่ตัวเลขในสไลด์)",
      steps: ["s(i) = (6 - 2) / max(2, 6)", "= 4 / 6"],
      result: "0.667",
    },
    pitfall:
      "ตัวส่วนคือค่าที่มากกว่าระหว่าง a กับ b ไม่ใช่ a + b จึงไม่เกิน 1 และ Best K ต้องดู Inertia, Silhouette, Stability, Simplicity และความหมายทางธุรกิจร่วมกัน (Lect 08 p.36, p.38)",
    lectures: ["Lect 08"],
  },

  /* ---------------- Lect 09 - Responsible Data Science ---------------- */
  {
    id: "shap-prediction",
    verification: VERIFIED,
    name: "SHAP Prediction",
    expression: "Prediction = Base Value + SUM(SHAP values)",
    symbols: [
      { symbol: "Base Value", meaning: "ความน่าจะเป็นเฉลี่ยที่โมเดลให้กับข้อมูลทั่วไป" },
      { symbol: "SHAP value", meaning: "จุดเปอร์เซ็นต์ที่ Feature นั้นผลักค่าความน่าจะเป็น" },
    ],
    output: "ความน่าจะเป็นที่อธิบายได้ของรายนั้น",
    example: {
      given: "Base Value = 32%, ไม่ซื้อนาน +29, อายุสมาชิกสั้น +12, ยอดใช้จ่ายสูง -8 (Lect 09 p.9)",
      steps: ["Prediction = 32% + 29 + 12 - 8", "= 32% + 33", "= 65%"],
      result: "65%",
    },
    pitfall:
      "ค่า SHAP วัดเป็นจุดเปอร์เซ็นต์ ไม่ใช่เปอร์เซ็นต์เชิงสัมพัทธ์ ถ้าคูณ 1.29 จะได้ 41.3% ซึ่งไม่ใช่คำตอบ",
    lectures: ["Lect 09"],
  },
  {
    id: "positive-class-cost",
    verification: VERIFIED,
    name: "Choosing a Metric by Error Cost",
    expression: "FP แพง -> Precision สูงกว่า Recall  |  FN วิกฤต -> Recall สูงกว่า Precision",
    symbols: [],
    output: "ตัวเลือกมาตรวัดที่ตรงกับต้นทุนของงาน",
    example: {
      given: "สไลด์ให้เปรียบเทียบ Accuracy 84% กับ Recall ลูกค้ากลุ่มใหม่ 54% (Lect 09 p.4)",
      steps: [
        "Accuracy รวม 84% ดูดี แต่ Recall ลูกค้ากลุ่มใหม่มีเพียง 54%",
        "คะแนนรวมเป็นเพียงหลักฐานหนึ่งในแฟ้มตัดสินใจ ไม่ใช่คำตอบว่าโมเดลพร้อมใช้",
      ],
      result: "ต้องดูทั้งสองด้ายก่อนตัดสินใจ",
    },
    pitfall:
      "อย่าใช้ Accuracy เป็นตัวเดียวที่ตัดสิน เพราะคะแนนรวมสามารถซ่อนกลุ่มที่ทำได้แย่ได้ทั้งก้อน",
    lectures: ["Lect 07", "Lect 09"],
  },
];