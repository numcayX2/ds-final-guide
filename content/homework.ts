import type { HomeworkProblem } from "./types";

/**
 * Homework solutions — P5.
 *
 * Four problems, all transcribed from the lecture slides and re-checked against
 * them. Every figure below is a slide figure; nothing is invented to fill a gap.
 *
 * Verified against the decks:
 *   Lect 07 slide 26 — confusion matrix exercise, Positive class = Inactive = Yes
 *   Lect 07 slide 30 — the metric method the homework must use
 *   Lect 07 slide 34 — Homework 1, "นับ TP, TN, FP และ FN"
 *   Lect 07 slide 35 — Homework 2, "เลือก Classifier Model สำหรับ Customer Inactivity"
 *   Lect 08 slide 44 — Homework K-Means (Q1: K=2 Manhattan, Q2: K=3 Euclidean)
 *
 * Key results worth memorising:
 *
 * 1. Problem 1 lands on four identical metrics (60.00% each). That is not a
 *    coincidence and not a typo — TP = FP = FN makes Accuracy, Precision, Recall
 *    and F1 collapse onto the same number. A student who assumes the four metrics
 *    always differ will think they mis-copied something.
 * 2. Problem 2 compares Models A/B/C: Model C has highest Accuracy (85%) and
 *    F1 (81%); Model B has highest Recall (90%); Model A has highest Precision (89%).
 * 3. Problem 3 uses Manhattan distance per in-lecture example. A5 is equidistant
 *    (2 and 2) and Greedy tie-breaking assigns it to C1.
 * 4. Problem 4 uses Euclidean distance with initial centroids A2, A5, A8 and converges
 *    at round 2 to (1.5, 3.5), (7, 4.3333), (3.6667, 9).
 */

export const homeworkProblems: HomeworkProblem[] = [
  /* ------------------------------------------------------------------ */
  /* Homework 1 — confusion matrix metrics, Lecture 07                  */
  /* ------------------------------------------------------------------ */
  {
    id: "hw1-customer-churn-metrics",
    lectures: ["Lect 07"],
    source: "Lect 07 slide 26 (แบบฝึกหัด), กำหนดเป็นการบ้านข้อ 1 ที่ slide 34, วิธีคำนวณตาม slide 30",
    statement:
      "จากตารางสับสนของโมเดลทำนายการยกเลิกบริการของลูกค้า ให้นับ TP, TN, FP และ FN จากข้อมูล 10 แถวที่โจทย์ให้มา แล้วคำนวณ Accuracy, Precision, Recall และ F1 ตามวิธีที่สไลด์กำหนด — คลาสบวกของโจทย์นี้คือ Inactive = Yes",
    given: [
      { label: "คลาสบวก (Positive class)", value: "Inactive = Yes" },
      { label: "จำนวนข้อมูลทั้งหมด", value: "10 แถว" },
      { label: "แถวที่ 01", value: "จริง = Yes · ทำนาย = Yes" },
      { label: "แถวที่ 02", value: "จริง = No · ทำนาย = No" },
      { label: "แถวที่ 03", value: "จริง = Yes · ทำนาย = No" },
      { label: "แถวที่ 04", value: "จริง = No · ทำนาย = Yes" },
      { label: "แถวที่ 05", value: "จริง = Yes · ทำนาย = Yes" },
      { label: "แถวที่ 06", value: "จริง = No · ทำนาย = No" },
      { label: "แถวที่ 07", value: "จริง = No · ทำนาย = Yes" },
      { label: "แถวที่ 08", value: "จริง = Yes · ทำนาย = Yes" },
      { label: "แถวที่ 09", value: "จริง = No · ทำนาย = No" },
      { label: "แถวที่ 10", value: "จริง = Yes · ทำนาย = No" },
    ],
    solutionSteps: [
      "นับจากตาราง: TP = 3 (แถว 01, 05, 08) · TN = 3 (แถว 02, 06, 09) · FP = 2 (แถว 04, 07) · FN = 2 (แถว 03, 10) · รวม 3 + 3 + 2 + 2 = 10 แถว",
      "Accuracy = (TP + TN) / ทั้งหมด = (3 + 3) / 10 = 6/10 = 0.60 = 60.00%",
      "Precision = TP / (TP + FP) = 3 / (3 + 2) = 3/5 = 0.60 = 60.00%",
      "Recall = TP / (TP + FN) = 3 / (3 + 2) = 3/5 = 0.60 = 60.00%",
      "F1 = 2 x TP / (2 x TP + FP + FN) = 2 x 3 / (2 x 3 + 2 + 2) = 6/10 = 0.60 = 60.00%",
      "ทั้งสี่มาตรวัดได้เท่ากันเพราะข้อมูลชุดนี้ TP = FP = FN = ไม่ใช่เพราะคำนวณผิด นักเรียนที่คิดว่ามาตรวัดทั้งสี่ต้องไม่เท่ากันเลยจะเข้าใจว่าตัวเองนับพลาด",
    ],
    answer:
      "TP = 3 · TN = 3 · FP = 2 · FN = 2 (รวม 10) — Accuracy = 60.00% · Precision = 60.00% · Recall = 60.00% · F1 = 60.00%",
    transcriptionNote:
      "สไลด์ 26 เขียนว่า แบบฝึกหัด: นับ TP, TN, FP และ FN โดยไม่ได้บอกคลาสบวกซ้ำในบรรทัดนั้น ต้องย้อนไปใช้คลาสบวกที่ประกาศไว้ในเด็คคือ Inactive = Yes ถ้าสลับคลาสบวกโดยไม่ตั้งใจ ตัวเลข TP จะกลายเป็น TN และคำตอบทั้งสี่จะเปลี่ยนไปทั้งชุด",
  },

  /* ------------------------------------------------------------------ */
  /* Homework 2 — Candidate Models A/B/C, Lecture 07 slide 35          */
  /* ------------------------------------------------------------------ */
  {
    id: "hw2-candidate-models-slide35",
    lectures: ["Lect 07"],
    source: "Lect 07 slide 35 (Homework#2) — การบ้าน: เลือก Classifier Model สำหรับ Customer Inactivity",
    statement:
      "จากโจทย์ Customer Inactivity บน Evaluation Set ลูกค้า 100 ราย กำหนดคลาสบวกคือ Inactive = Yes ให้คำนวณ Metrics ทั้งสี่ (Accuracy, Precision, Recall, F1) ของ Candidate Models ทั้งสามตัว (A, B, C) และอธิบายผลกระทบของ False Positive กับ False Negative เพื่อเลือก Primary Metric และเสนอแนะ Model ที่เหมาะสมตามผลกระทบทางธุรกิจ",
    given: [
      { label: "คลาสบวก (Positive class)", value: "Customer Inactive = Yes" },
      { label: "Evaluation Set", value: "ลูกค้า 100 รายเท่ากันทั้ง 3 โมเดล" },
      { label: "Model A: Actual Yes", value: "TP = 24 · FN = 16" },
      { label: "Model A: Actual No", value: "FP = 3 · TN = 57" },
      { label: "Model B: Actual Yes", value: "TP = 36 · FN = 4" },
      { label: "Model B: Actual No", value: "FP = 18 · TN = 42" },
      { label: "Model C: Actual Yes", value: "TP = 32 · FN = 8" },
      { label: "Model C: Actual No", value: "FP = 7 · TN = 53" },
    ],
    solutionSteps: [
      "คำนวณ Model A (TP=24, FN=16, FP=3, TN=57, N=100): Accuracy = (24+57)/100 = 0.81 (81.00%) · Precision = 24/(24+3) = 24/27 ≈ 0.89 (88.89%) · Recall = 24/(24+16) = 24/40 = 0.60 (60.00%) · F1 = 2(24)/(2(24)+3+16) = 48/67 ≈ 0.72 (71.64%)",
      "คำนวณ Model B (TP=36, FN=4, FP=18, TN=42, N=100): Accuracy = (36+42)/100 = 0.78 (78.00%) · Precision = 36/(36+18) = 36/54 ≈ 0.67 (66.67%) · Recall = 36/(36+4) = 36/40 = 0.90 (90.00%) · F1 = 2(36)/(2(36)+18+4) = 72/94 ≈ 0.77 (76.60%)",
      "คำนวณ Model C (TP=32, FN=8, FP=7, TN=53, N=100): Accuracy = (32+53)/100 = 0.85 (85.00%) · Precision = 32/(32+7) = 32/39 ≈ 0.82 (82.05%) · Recall = 32/(32+8) = 32/40 = 0.80 (80.00%) · F1 = 2(32)/(2(32)+7+8) = 64/79 ≈ 0.81 (81.01%)",
      "วิเคราะห์ผลกระทบต่อ Retention Decision: (1) False Positive (FP) หมายถึง ลูกค้ายังไม่คิดจะเลิก แต่โมเดลทำนายว่าจะเลิก ผลกระทบคือสูญใส่งบประมาณส่งโปรโมชั่น/ข้อเสนอรักษาลูกค้าโดยไม่จำเป็น (2) False Negative (FN) หมายถึง ลูกค้ากำลังจะยกเลิกจริง แต่โมเดลทำนายว่าไม่เลิก ผลกระทบคือธุรกิจไม่ได้เข้าไปดูแลและสูญเสียลูกค้ารายนั้นไปอย่างถาวร",
      "การเลือก Primary Metric และ Model: (1) หากต้องการโมเดลที่สมดุลที่สุด แนะนำ Model C เพราะได้ Accuracy สูงสุด (85%) และ F1 สูงสุด (0.81) โดยมี Precision 82% และ Recall 80% สูงทั้งสองด้าน (2) หากธุรกิจกลัวลูกค้าหลุดที่สุด (ต้นทุนเสียลูกค้าสูงมาก) แนะนำ Model B เพราะได้ Recall สูงสุดถึง 90% (3) หากงบประมาณแคมเปญจำกัดมาก (ต้นทุนต่อคนสูง) แนะนำ Model A เพราะได้ Precision สูงสุดถึง 89%",
    ],
    answer:
      "Model A: Acc 81% · Prec 89% · Rec 60% · F1 72% | Model B: Acc 78% · Prec 67% · Rec 90% · F1 77% | Model C: Acc 85% · Prec 82% · Rec 80% · F1 81% — แนะนำ Model C สำหรับกรณีสมดุล (Accuracy และ F1 สูงสุด) หรือ Model B หากเน้นลดการสูญเสียลูกค้า (Recall สูงสุด 90%)",
    transcriptionNote:
      "สไลด์ 35 ระบุว่า 'คำตอบอาจต่างกันได้ แต่ Metric เหตุผล และ Model ต้องสอดคล้องกัน' ดังนั้นการเลือกโมเดลจึงขึ้นอยู่กับบริบททางธุรกิจที่เลือกอ้างอิง แต่ตัวเลขทั้ง 12 ค่าของทั้ง 3 โมเดลต้องคำนวณถูกต้องตามนี้",
  },

  /* ------------------------------------------------------------------ */
  /* Homework 3 — K-Means by hand (K=2), Lecture 08 slide 44            */
  /* ------------------------------------------------------------------ */
  {
    id: "hw2-kmeans-slide44",
    lectures: ["Lect 08"],
    source:
      "Lect 08 slide 44 (การบ้าน) — ใช้ข้อมูลในหน้า 25 ทำตามตัวอย่างหน้า 25-31 อีกครั้งหนึ่ง",
    statement:
      "ข้อ 1: ใช้ข้อมูลในหน้า 25 ทำกระบวนการ K-Means ตามลำดับเหมือนตัวอย่างหน้า 25-31 ใหม่อีกครั้งหนึ่ง ให้จบหนึ่งรอบคำนวณ centroid ใหม่ และคำนวณตำแหน่ง centroid ใหม่ของรอบที่ 2 โดยกำหนดค่า K = 2 และให้ Centroid C1 คือจุด A3 และ C2 คือ A6",
    given: [
      { label: "จุดข้อมูล 8 จุด (หน้า 25)", value: "A1(2,10) A2(2,5) A3(8,4) A4(5,8) A5(7,5) A6(6,4) A7(1,2) A8(4,9)" },
      { label: "ค่า K", value: "2" },
      { label: "Centroid เริ่มต้น C1", value: "จุด A3 = (8, 4)" },
      { label: "Centroid เริ่มต้น C2", value: "จุด A6 = (6, 4)" },
    ],
    solutionSteps: [
      "สไลด์ไม่ได้ระบุมาตรวัดระยะห่างสำหรับข้อนี้ แต่ตัวอย่างในหน้า 25-31 ใช้ Manhattan จึงใช้ Manhattan ตามตัวอย่าง",
      "A1(2,10) ถึง C1 = |2-8| + |10-4| = 6+6 = 12 · ถึง C2 = |2-6| + |10-4| = 4+6 = 10 → ต่ำสุด 10 → C2",
      "A2(2,5) ถึง C1 = |2-8| + |5-4| = 6+1 = 7 · ถึง C2 = |2-6| + |5-4| = 4+1 = 5 → ต่ำสุด 5 → C2",
      "A3(8,4) ถึง C1 = |8-8| + |4-4| = 0+0 = 0 · ถึง C2 = |8-6| + |4-4| = 2+0 = 2 → ต่ำสุด 0 → C1",
      "A4(5,8) ถึง C1 = |5-8| + |8-4| = 3+4 = 7 · ถึง C2 = |5-6| + |8-4| = 1+4 = 5 → ต่ำสุด 5 → C2",
      "A5(7,5) ถึง C1 = |7-8| + |5-4| = 1+1 = 2 · ถึง C2 = |7-6| + |5-4| = 1+1 = 2 → เท่ากัน ใช้กฎ Greedy เข้า C1",
      "A6(6,4) ถึง C1 = |6-8| + |4-4| = 2+0 = 2 · ถึง C2 = |6-6| + |4-4| = 0+0 = 0 → ต่ำสุด 0 → C2",
      "A7(1,2) ถึง C1 = |1-8| + |2-4| = 7+2 = 9 · ถึง C2 = |1-6| + |2-4| = 5+2 = 7 → ต่ำสุด 7 → C2",
      "A8(4,9) ถึง C1 = |4-8| + |9-4| = 4+5 = 9 · ถึง C2 = |4-6| + |9-4| = 2+5 = 7 → ต่ำสุด 7 → C2",
      "รอบที่ 1: C1 = {A3, A5} · C2 = {A1, A2, A4, A6, A7, A8}",
      "C1 ใหม่ = ((8+7)/2, (4+5)/2) = (15/2, 9/2) = (7.5, 4.5)",
      "C2 ใหม่ = ((2+2+5+6+1+4)/6, (10+5+8+4+2+9)/6) = (20/6, 38/6) = (3.3333, 6.3333)",
    ],
    answer: "รอบที่ 2: C1 = (7.5, 4.5) · C2 = (3.3333, 6.3333)",
    transcriptionNote:
      "A5 อยู่ห่างจาก C1 และ C2 เท่ากันพอดี คือ 2 ทั้งคู่ กฎ Greedy ที่สไลด์ระบุว่าให้เข้ากลุ่มที่มีหมายเลขต่ำสุด จึงเข้า C1 ถ้าไม่ใช้กฎนี้เส้นทางของทั้งข้อจะเปลี่ยน",
  },
  {
    id: "hw3-kmeans-slide44-euclidean",
    lectures: ["Lect 08"],
    source: "Lect 08 slide 44 (การบ้าน) ข้อ 2",
    statement:
      "ข้อ 2: ใช้ข้อมูลในหน้า 25 ทำกระบวนการ K-Means ตามลำดับเหมือนตัวอย่างหน้า 25-31 ใหม่อีกครั้งหนึ่ง ให้จบหนึ่งรอบคำนวณ centroid ใหม่ และคำนวณตำแหน่ง centroid ใหม่ของรอบที่ 2 โดยกำหนดค่า K = 3 โดยใช้ Euclidean distance และให้ centroid ตั้งต้นคือ A2 A5 A8",
    given: [
      { label: "จุดข้อมูล 8 จุด (หน้า 25)", value: "A1(2,10) A2(2,5) A3(8,4) A4(5,8) A5(7,5) A6(6,4) A7(1,2) A8(4,9)" },
      { label: "ค่า K", value: "3" },
      { label: "มาตรวัดระยะ", value: "Euclidean distance" },
      { label: "Centroid เริ่มต้น", value: "A2 = (2,5) · A5 = (7,5) · A8 = (4,9)" },
    ],
    solutionSteps: [
      "A1(2,10) ถึง A2 = 5.00 · ถึง A5 = 7.07 · ถึง A8 = 2.24 → ต่ำสุด → A8",
      "A2(2,5) ถึง A2 = 0.00 · ถึง A5 = 5.00 · ถึง A8 = 4.47 → ต่ำสุด → A2",
      "A3(8,4) ถึง A2 = 6.08 · ถึง A5 = 1.41 · ถึง A8 = 6.40 → ต่ำสุด → A5",
      "A4(5,8) ถึง A2 = 4.24 · ถึง A5 = 3.61 · ถึง A8 = 1.41 → ต่ำสุด → A8",
      "A5(7,5) ถึง A2 = 5.00 · ถึง A5 = 0.00 · ถึง A8 = 5.00 → ต่ำสุด → A5",
      "A6(6,4) ถึง A2 = 4.12 · ถึง A5 = 1.41 · ถึง A8 = 5.39 → ต่ำสุด → A5",
      "A7(1,2) ถึง A2 = 3.16 · ถึง A5 = 6.71 · ถึง A8 = 7.62 → ต่ำสุด → A2",
      "A8(4,9) ถึง A2 = 4.47 · ถึง A5 = 5.00 · ถึง A8 = 0.00 → ต่ำสุด → A8",
      "รอบที่ 1: กลุ่ม A2 = {A2, A7} · กลุ่ม A5 = {A3, A5, A6} · กลุ่ม A8 = {A1, A4, A8}",
      "C(A2) = ((2+1)/2, (5+2)/2) = (3/2, 7/2) = (1.5, 3.5)",
      "C(A5) = ((8+7+6)/3, (4+5+4)/3) = (21/3, 13/3) = (7, 4.3333)",
      "C(A8) = ((2+5+4)/3, (10+8+9)/3) = (11/3, 27/3) = (3.6667, 9)",
    ],
    answer: "รอบที่ 2: A2 = (1.5, 3.5) · A5 = (7, 4.3333) · A8 = (3.6667, 9)",
  },
];
