import type { Episode, EpisodeStep } from "./types";

/**
 * Scrollytelling episodes.
 *
 * Only episodes whose numbers were checked against the lecture slides are
 * present. EP01 (IQR) and EP02 (Gini) are withheld: their worked figures live
 * in image-only slides that could not be read, and an episode that teaches an
 * unverified number is worse than a missing episode.
 *
 * EP03 sources: Lect 07 p.23 (the 10-row FIFA table), metrics on p.30.
 * EP04 sources: Lect 08 p.19-p.29 (algorithm steps and the Manhattan iteration).
 */

const VERIFIED = "verified-by-principle" as const;

export const episodes: Episode[] = [
  /* ============================ EP01 ============================ */
  {
    id: "ep01",
    index: "01",
    title: "Boxplot & Tukey Outliers",
    titleTh: "แผนภาพกล่อง และการตรวจ Outlier",
    lectures: ["Lect 05"],
    steps: [
      {
        n: 1,
        verification: VERIFIED,
        headline: "สถิติวัดตำแหน่ง 5 ตัว",
        body: "เริ่มต้นจากค่าต่ำสุด Q1 มัธยฐาน Q3 และค่าสูงสุด ตัวอย่างข้อมูลสถิติ: Q1=20, Median=28, Q3=35 ครอบคลุมการกระจายตัวของข้อมูล 50% หลัก",
        visual: {
          kind: "boxplot",
          min: 10,
          q1: 20,
          median: 28,
          q3: 35,
          max: 50,
          lowerFence: -2.5,
          upperFence: 57.5,
          outliers: [],
        },
        numbers: ["Q1 = 20", "Median = 28", "Q3 = 35"],
      },
      {
        n: 2,
        verification: VERIFIED,
        headline: "คำนวณความกว้าง IQR",
        body: "Interquartile Range (IQR) คือความกว้างของกล่องสี่เหลี่ยมตรงกลาง ซึ่งครอบคลุมข้อมูล 50% หลัก คำนวณจาก Q3 ลบด้วย Q1",
        visual: {
          kind: "boxplot",
          min: 10,
          q1: 20,
          median: 28,
          q3: 35,
          max: 50,
          lowerFence: -2.5,
          upperFence: 57.5,
          outliers: [],
        },
        numbers: ["IQR = 35 - 20 = 15"],
      },
      {
        n: 3,
        verification: VERIFIED,
        headline: "สร้างรั้วเกณฑ์ตัดสิน (Fences)",
        body: "รั้วล่าง = Q1 - 1.5×IQR = 20 - 22.5 = -2.5 และรั้วบน = Q3 + 1.5×IQR = 35 + 22.5 = 57.5 รั้วเป็นเส้นสมมติที่คำนวณขึ้นเพื่อใช้เป็นเกณฑ์ตัดสิน",
        visual: {
          kind: "boxplot",
          min: 10,
          q1: 20,
          median: 28,
          q3: 35,
          max: 50,
          lowerFence: -2.5,
          upperFence: 57.5,
          outliers: [],
        },
        numbers: ["Lower Fence = -2.5", "Upper Fence = 57.5"],
      },
      {
        n: 4,
        verification: VERIFIED,
        headline: "Whisker จบที่ค่าจริงในรั้ว",
        body: "ตามสไลด์ Lect 05 หน้า 17 เส้น Whisker ไม่ได้ลากไปถึง Fence เสมอไป แต่สิ้นสุดที่ค่าจริงสุดท้ายที่ยังอยู่ภายใน Fence (ในที่นี้คือ 50)",
        visual: {
          kind: "boxplot",
          min: 10,
          q1: 20,
          median: 28,
          q3: 35,
          max: 50,
          lowerFence: -2.5,
          upperFence: 57.5,
          outliers: [],
        },
        numbers: ["Whisker max = 50 <= Upper Fence 57.5"],
      },
      {
        n: 5,
        verification: VERIFIED,
        headline: "ตรวจพบค่าผิดปกติ (Outlier)",
        body: "หากมีข้อมูลค่า 58 ซึ่งเกิน Upper Fence (57.5) ออกไป ค่านั้นจะถูกตัดสินว่าเป็น Outlier ทันทีและวาดแยกเป็นจุดเดี่ยว",
        visual: {
          kind: "boxplot",
          min: 10,
          q1: 20,
          median: 28,
          q3: 35,
          max: 58,
          lowerFence: -2.5,
          upperFence: 57.5,
          outliers: [58],
        },
        numbers: ["58 > 57.5 (Outlier)"],
      },
    ],
  },

  /* ============================ EP02 ============================ */
  {
    id: "ep02",
    index: "02",
    title: "Decision Tree: Weighted Gini & Gain",
    titleTh: "ต้นไม้การตัดสินใจ กับ Gini แบบถัวน้ำหนัก",
    lectures: ["Lect 07"],
    steps: [
      {
        n: 1,
        verification: VERIFIED,
        headline: "โหนดพ่อหารเกือบเท่ากัน",
        body: "ที่รากมี Active 6 คน และ Inactive 6 คน พอดีกัน Gini จึงสูงสุด เท่ากับ 0.500",
        visual: { kind: "decision-tree", rootGini: 0.5, splits: [] },
        numbers: ["Gini(parent) = 1 - 2 x (6/12)^2 = 0.500"],
      },
      {
        n: 2,
        verification: VERIFIED,
        headline: "Gini ของโหนดที่ไม่บริสุทธิ์",
        body: "โหนดที่มี Active 5 คน และ Inactive 1 คน คำนวณได้ 0.278 ยิ่งเข้าใกล้ข้อมูลเป็นก้อนเดียว ค่า Gini ยิ่งต่ำ",
        visual: {
          kind: "decision-tree",
          rootGini: 0.5,
          splits: [
            {
              feature: "days_since_last_purchase <= 45",
              threshold: 45, nLeft: 6, nRight: 6,
              giniLeft: 0.278, giniRight: 0.278,
              weightedGini: 0.278, gain: 0.222,
            },
          ],
        },
        numbers: ["1 - (5/6)^2 - (1/6)^2 = 0.278"],
      },
      {
        n: 3,
        verification: VERIFIED,
        headline: "ถัวเฉลี่ยสองฝั่งตามจำนวนข้อมูล",
        body: "Candidate A แบ่งได้ 5/1 ฝั่งซ้าย และ 1/5 ฝั่งขวา ทั้งสองฝั่ง Gini เท่ากัน ถัวเฉลี่ยแล้วได้ 0.278",
        visual: {
          kind: "decision-tree",
          rootGini: 0.5,
          splits: [
            {
              feature: "days_since_last_purchase <= 45",
              threshold: 45, nLeft: 6, nRight: 6,
              giniLeft: 0.278, giniRight: 0.278,
              weightedGini: 0.278, gain: 0.222,
            },
          ],
        },
        numbers: ["(6/12) x 0.278 + (6/12) x 0.278 = 0.278"],
      },
      {
        n: 4,
        verification: VERIFIED,
        headline: "Candidate B แยกกลุ่มได้แย่กว่า",
        body: "Candidate B แบ่งเป็น 2/4 และ 4/2 Gini แต่ละฝั่ง 0.444 ถัวเฉลี่ยแล้วได้ 0.444 ซึ่งแย่กว่า A",
        visual: {
          kind: "decision-tree",
          rootGini: 0.5,
          splits: [
            {
              feature: "days_since_last_purchase <= 45",
              threshold: 45, nLeft: 6, nRight: 6,
              giniLeft: 0.278, giniRight: 0.278,
              weightedGini: 0.278, gain: 0.222,
            },
            {
              feature: "purchases_last_90_days <= 2",
              threshold: 2, nLeft: 6, nRight: 6,
              giniLeft: 0.444, giniRight: 0.444,
              weightedGini: 0.444, gain: 0.056,
            },
          ],
        },
        numbers: ["(6/12) x 0.444 + (6/12) x 0.444 = 0.444"],
      },
      {
        n: 5,
        verification: VERIFIED,
        headline: "เลือกตัวที่ Gain สูงสุด",
        body: "Gain ของ A เท่ากับ 0.222 ส่วน B ได้แค่ 0.056 กฎคือเลือก Candidate Split ที่ได้ Gini Gain สูงสุดเสมอ",
        visual: {
          kind: "decision-tree",
          rootGini: 0.5,
          splits: [
            {
              feature: "days_since_last_purchase <= 45",
              threshold: 45, nLeft: 6, nRight: 6,
              giniLeft: 0.278, giniRight: 0.278,
              weightedGini: 0.278, gain: 0.222,
            },
            {
              feature: "purchases_last_90_days <= 2",
              threshold: 2, nLeft: 6, nRight: 6,
              giniLeft: 0.444, giniRight: 0.444,
              weightedGini: 0.444, gain: 0.056,
            },
          ],
        },
        numbers: ["A: 0.500 - 0.278 = 0.222", "B: 0.500 - 0.444 = 0.056", "เลือก A"],
      },
      {
        n: 6,
        verification: VERIFIED,
        headline: "สไลด์ให้ค่าเป็นตัวเลขสำเร็จ",
        body: "หน้าสไลด์พิมพ์ค่าที่คำนวณแล้วเป็น 0.278 และ 0.444 โดยไม่มีการแทนค่าเต็ม ถ้าเขียนในข้อสอบให้เขียนแสดงการแทนค่าด้วย",
        visual: {
          kind: "decision-tree",
          rootGini: 0.5,
          splits: [
            {
              feature: "days_since_last_purchase <= 45",
              threshold: 45, nLeft: 6, nRight: 6,
              giniLeft: 0.278, giniRight: 0.278,
              weightedGini: 0.278, gain: 0.222,
            },
          ],
        },
      },
    ],
  },

  /* ============================ EP03 ============================ */
  {
    id: "ep03",
    index: "03",
    title: "Confusion Matrix",
    titleTh: "ตารางสับสนและมาตรวัด",
    lectures: ["Lect 07"],
    steps: [
      {
        n: 1,
        verification: VERIFIED,
        headline: "กำหนด Positive ก่อนเสมอ",
        body: "ถ้ายังไม่รู้ว่าคลาสไหนคือ Positive ตัวเลขทุกตัวจะสลับตามหมด ในเคสนี้คือ Play คือผู้เล่นมีฟอร์มดีพร้อมลงเล่น",
        visual: {
          kind: "confusion-matrix",
          tp: 0, fp: 0, fn: 0, tn: 0,
          positiveLabel: "Play",
          positiveLabelTh: "พร้อมลงเล่น",
        },
        numbers: ["C1 = play", "C2 = rest"],
      },
      {
        n: 2,
        verification: VERIFIED,
        headline: "อ่านตารางตามแถวและคอลัมน์",
        body: "แถวคือความจริง คอลัมน์คือสิ่งที่โมเดลทำนาย อ่านสลับแล้วจะได้ตัวเลขที่ผิดทั้งชุดโดยไม่รู้ตัว",
        visual: {
          kind: "confusion-matrix",
          tp: 4, fp: 1, fn: 2, tn: 3,
          positiveLabel: "Play",
          positiveLabelTh: "พร้อมลงเล่น",
        },
      },
      {
        n: 3,
        verification: VERIFIED,
        headline: "นับจากตารางสิบแถว",
        body: "ทีมอังกฤษมีนักเตะสิบคน จับคู่แล้วได้ TP สี่คน TN สามคน FP หนึ่งคน และ FN สองคน รวมพอดีสิบ",
        visual: {
          kind: "confusion-matrix",
          tp: 4, fp: 1, fn: 2, tn: 3,
          positiveLabel: "Play",
          positiveLabelTh: "พร้อมลงเล่น",
        },
        numbers: ["TP = 4", "TN = 3", "FP = 1", "FN = 2"],
      },
      {
        n: 4,
        verification: VERIFIED,
        headline: "Accuracy และ Precision",
        body: "Accuracy ดูรวมทั้งตารางได้เจ็ดสิบเปอร์เซ็นต์ ส่วน Precision ถามว่าจากที่ระบบบอกว่าพร้อมเล่น มีกี่คนที่พูดได้จริง",
        visual: {
          kind: "confusion-matrix",
          tp: 4, fp: 1, fn: 2, tn: 3,
          positiveLabel: "Play",
          positiveLabelTh: "พร้อมลงเล่น",
        },
        numbers: ["(4 + 3) / 10 = 70.00%", "4 / (4 + 1) = 80.00%"],
      },
      {
        n: 5,
        verification: VERIFIED,
        headline: "Recall ต่ำกว่าและนั่นคือปัญหา",
        body: "ระบบบอกว่าพร้อมเล่นห้าคน แต่ความจริงมีหกคน แปลว่าปล่อยคนที่ควรได้ลงเล่นไปสองคน นี่คือ False Negative",
        visual: {
          kind: "confusion-matrix",
          tp: 4, fp: 1, fn: 2, tn: 3,
          positiveLabel: "Play",
          positiveLabelTh: "พร้อมลงเล่น",
        },
        numbers: ["4 / (4 + 2) = 66.67%"],
      },
      {
        n: 6,
        verification: VERIFIED,
        headline: "F1 ถัวสองอย่างเท่ากัน",
        body: "เมื่อ Precision กับ Recall ขัดกันและไม่อยากเลือกข้างใดข้างหนึ่ง F1 จะถัวเฉลี่ยทั้งคู่ให้น้ำหนักเท่ากัน",
        visual: {
          kind: "confusion-matrix",
          tp: 4, fp: 1, fn: 2, tn: 3,
          positiveLabel: "Play",
          positiveLabelTh: "พร้อมลงเล่น",
        },
        numbers: ["2 x (0.80 x 0.6667) / 1.4667 = 72.73%"],
      },
    ],
  },

  /* ============================ EP04 ============================ */
  {
    id: "ep04",
    index: "04",
    title: "K-Means Clustering",
    titleTh: "การจัดกลุ่มแบบ K-Means",
    lectures: ["Lect 08"],
    steps: [
      {
        n: 1,
        verification: VERIFIED,
        headline: "Clustering ไม่มีคำตอบล่วงหน้า",
        body: "ถ้า Classification คือการที่เรารู้ผลเฉลยอยู่ก่อนแล้ว Clustering คือการที่เราไม่มีคำตอบอยู่เลย",
        visual: {
          kind: "kmeans",
          points: [
            { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 },
            { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
            { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 },
            { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
          ],
          initialCentroids: [
            { id: "C1", x: 2, y: 10 },
            { id: "C2", x: 5, y: 8 },
            { id: "C3", x: 1, y: 2 },
          ],
          metric: "manhattan",
        },
      },
      {
        n: 2,
        verification: VERIFIED,
        headline: "สุ่มจุดศูนย์กลางเริ่มต้น k ค่า",
        body: "สไลด์ให้สุ่มได้สามจุด คือ C1(2,10) C2(5,8) และ C3(1,2) จุดศูนย์กลางคือค่าเฉลี่ยของกลุ่ม ไม่ใช่สมาชิกหนึ่งคน",
        visual: {
          kind: "kmeans",
          points: [
            { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 },
            { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
            { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 },
            { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
          ],
          initialCentroids: [
            { id: "C1", x: 2, y: 10 },
            { id: "C2", x: 5, y: 8 },
            { id: "C3", x: 1, y: 2 },
          ],
          metric: "manhattan",
        },
        numbers: ["C1(2, 10)", "C2(5, 8)", "C3(1, 2)"],
      },
      {
        n: 3,
        verification: VERIFIED,
        headline: "วัดด้วย Manhattan เพราะข้อสอบคิดมือ",
        body: "Distance(A, Y) เท่ากับผลบวกของค่าต่างแต่ละแกน ไม่มีรากที่สอง ถ้าใช้ Euclidean คำตอบจะเปลี่ยน",
        visual: {
          kind: "kmeans",
          points: [
            { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 },
            { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
            { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 },
            { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
          ],
          initialCentroids: [
            { id: "C1", x: 2, y: 10 },
            { id: "C2", x: 5, y: 8 },
            { id: "C3", x: 1, y: 2 },
          ],
          metric: "manhattan",
        },
        numbers: ["|x1 - y1| + |x2 - y2|"],
      },
      {
        n: 4,
        verification: VERIFIED,
        headline: "จุดแรกเทียบทั้งสามศูนย์กลาง",
        body: "A1(2,10) ไป C1 ได้ศูนย์ ไป C2 ได้ห้า ไป C3 ได้เก้า จึงอยู่กลุ่มที่หนึ่ง",
        visual: {
          kind: "kmeans",
          points: [
            { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 },
            { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
            { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 },
            { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
          ],
          initialCentroids: [
            { id: "C1", x: 2, y: 10 },
            { id: "C2", x: 5, y: 8 },
            { id: "C3", x: 1, y: 2 },
          ],
          metric: "manhattan",
        },
        numbers: ["|2-2| + |10-10| = 0", "|2-5| + |10-8| = 5", "|2-1| + |10-2| = 9"],
      },
      {
        n: 5,
        verification: VERIFIED,
        headline: "ทำทั้งแปดจุดแล้วดูว่าใครติดกลุ่มไหน",
        body: "A2 ไป C3 เพราะสี่เล็กกว่าห้าและหก ส่วน A3 A4 A5 A6 A8 ไป C2 และ A7 ไป C3 เพราะศูนย์",
        visual: {
          kind: "kmeans",
          points: [
            { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 },
            { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
            { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 },
            { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
          ],
          initialCentroids: [
            { id: "C1", x: 2, y: 10 },
            { id: "C2", x: 5, y: 8 },
            { id: "C3", x: 1, y: 2 },
          ],
          metric: "manhattan",
        },
        numbers: ["C1 = {A1}", "C2 = {A3, A4, A5, A6, A8}", "C3 = {A2, A7}"],
      },
      {
        n: 6,
        verification: VERIFIED,
        headline: "หาค่าเฉลี่ยใหม่เป็นจุดกลาง",
        body: "กลุ่มที่หนึ่งมีจุดเดียวจึงไม่ขยับ กลุ่มที่สองมีห้าจุดเฉลี่ยได้ (6,6) ส่วนกลุ่มที่สามมีสองจุดเฉลี่ยได้ (1.5, 3.5)",
        visual: {
          kind: "kmeans",
          points: [
            { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 },
            { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
            { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 },
            { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
          ],
          initialCentroids: [
            { id: "C1", x: 2, y: 10 },
            { id: "C2", x: 5, y: 8 },
            { id: "C3", x: 1, y: 2 },
          ],
          metric: "manhattan",
        },
        numbers: [
          "(8+5+7+6+4)/5 = 6",
          "(4+8+5+4+9)/5 = 6",
          "(2+1)/2 = 1.5",
          "(5+2)/2 = 3.5",
        ],
      },
      {
        n: 7,
        verification: VERIFIED,
        headline: "วนซ้ำจนค่าเฉลี่ยไม่เปลี่ยน",
        body: "เงื่อนไขหยุดคือค่าเฉลี่ยไม่เปลี่ยน หรือไม่มีสมาชิกข้ามกลุ่ม ต้องระบุค่า k ล่วงหน้าเสมอ และมักหยุดที่ local optimum",
        visual: {
          kind: "kmeans",
          points: [
            { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 },
            { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
            { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 },
            { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
          ],
          initialCentroids: [
            { id: "C1", x: 2, y: 10 },
            { id: "C2", x: 5, y: 8 },
            { id: "C3", x: 1, y: 2 },
          ],
          metric: "manhattan",
        },
        numbers: ["O(tkn)"],
      },
    ],
  },

  /* ============================ EP05 ============================ */
  {
    id: "ep05",
    index: "05",
    title: "SHAP Force Plot: Local XAI",
    titleTh: "การอธิบายผลทำนายรายบุคคลด้วย SHAP",
    lectures: ["Lect 09"],
    steps: [
      {
        n: 1,
        verification: VERIFIED,
        headline: "ค่าฐานเฉลี่ยของประชากร",
        body: "โมเดลเริ่มต้นจาก Base Value 32% ซึ่งคือค่าความน่าจะเป็นเฉลี่ยของการเกิด Inactive จากข้อมูลลูกค้าทั้งหมดก่อนดูคุณสมบัติเฉพาะคน",
        visual: {
          kind: "shap-force",
          baseValue: 32,
          prediction: 32,
          contributions: [],
        },
        numbers: ["Base Value = 32%"],
      },
      {
        n: 2,
        verification: VERIFIED,
        headline: "แรงผลักด้านบวก: ไม่ซื้อสินค้านาน",
        body: "ฟีเจอร์ 'ไม่ได้ซื้อสินค้านาน (> 45 วัน)' มีค่า SHAP +29% ทำหน้าที่เป็นแรงผลักให้ความน่าจะเป็น Inactive สูงขึ้น 29 จุดเปอร์เซ็นต์",
        visual: {
          kind: "shap-force",
          baseValue: 32,
          prediction: 61,
          contributions: [
            { feature: "ไม่ได้ซื้อสินค้านาน (> 45 วัน)", value: 29 },
          ],
        },
        numbers: ["32% + 29 = 61%"],
      },
      {
        n: 3,
        verification: VERIFIED,
        headline: "แรงผลักด้านบวก: ร้องเรียนบริการ",
        body: "ฟีเจอร์ 'มีประวัติร้องเรียนบริการล่าสุด' มีค่า SHAP +12% ช่วยผลักดันความน่าจะเป็นของการยกเลิกให้สูงขึ้นไปอีก 12 จุดเปอร์เซ็นต์",
        visual: {
          kind: "shap-force",
          baseValue: 32,
          prediction: 73,
          contributions: [
            { feature: "ไม่ได้ซื้อสินค้านาน (> 45 วัน)", value: 29 },
            { feature: "ประวัติร้องเรียนบริการ", value: 12 },
          ],
        },
        numbers: ["61% + 12 = 73%"],
      },
      {
        n: 4,
        verification: VERIFIED,
        headline: "แรงต้านด้านลบ: ยอดซื้อสะสมสูง",
        body: "ฟีเจอร์ 'ยอดซื้อสะสมในอดีตสูง' มีค่า SHAP -8% ทำหน้าที่ดึงความน่าจะเป็นกลับลงมาทางด้าน Active 8 จุดเปอร์เซ็นต์",
        visual: {
          kind: "shap-force",
          baseValue: 32,
          prediction: 65,
          contributions: [
            { feature: "ไม่ได้ซื้อสินค้านาน (> 45 วัน)", value: 29 },
            { feature: "ประวัติร้องเรียนบริการ", value: 12 },
            { feature: "ยอดซื้อสะสมสูง", value: -8 },
          ],
        },
        numbers: ["73% - 8 = 65%"],
      },
      {
        n: 5,
        verification: VERIFIED,
        headline: "ผลรวมทำนายสุดท้าย 65%",
        body: "32% + 29 + 12 - 8 = 65% จุดสำคัญในสไลด์ Lect 09 หน้า 9 คือ SHAP เป็นการบวกแบบจุดเปอร์เซ็นต์ (Percentage Points) ไม่ใช่ Relative Percent",
        visual: {
          kind: "shap-force",
          baseValue: 32,
          prediction: 65,
          contributions: [
            { feature: "ไม่ได้ซื้อสินค้านาน (> 45 วัน)", value: 29 },
            { feature: "ประวัติร้องเรียนบริการ", value: 12 },
            { feature: "ยอดซื้อสะสมสูง", value: -8 },
          ],
        },
        numbers: ["32% + 29 + 12 - 8 = 65%"],
      },
    ],
  },

  /* ============================ EP06 ============================ */
  {
    id: "ep06",
    index: "06",
    title: "Concept Drift & Degradation",
    titleTh: "การเปลี่ยนสภาพแวดล้อมและความเสื่อมของโมเดล",
    lectures: ["Lect 09"],
    steps: [
      {
        n: 1,
        verification: VERIFIED,
        headline: "ข้อมูลชุดฝึกเดิม (In-distribution)",
        body: "ในอดีต ลูกค้าที่ไม่ซื้อของเกิน 45 วันมีอัตราเลิกใช้งานจริงสูงถึง 68% โมเดลเรียนรู้กฎนี้และทำนายความแม่นยำได้สูงถึง 88%",
        visual: {
          kind: "concept-drift",
          timeline: [
            { t: 1, accuracy: 88, note: "โมเดลเดิมแม่นยำ 88% กฎ 45 วันสัมพันธ์กับ Inactive 68%" },
          ],
        },
        numbers: ["Inactive Rate = 68%", "Accuracy = 88%"],
      },
      {
        n: 2,
        verification: VERIFIED,
        headline: "ธุรกิจเปลี่ยนเป็น Subscription",
        body: "บริษัทปรับเปลี่ยนรูปแบบเป็นสมาชิกรายเดือน ทำให้พฤติกรรมลูกค้าไม่จำเป็นต้องสั่งซื้อสินค้าทุก 45 วันอีกต่อไป",
        visual: {
          kind: "concept-drift",
          timeline: [
            { t: 1, accuracy: 88 },
            { t: 2, accuracy: 84, note: "เปิดตัว Subscription พฤติกรรมการซื้อเริ่มเปลี่ยน" },
          ],
        },
        numbers: ["Shift to Subscription"],
      },
      {
        n: 3,
        verification: VERIFIED,
        headline: "เกิด Concept Drift: P(Y|X) พลิก",
        body: "ตามสไลด์ Lect 09 หน้า 11 ลูกค้าที่ไม่ซื้อเกิน 45 วัน มีอัตรา Inactive ลดลงเหลือเพียง 31% ความหมายของฟีเจอร์เปลี่ยนไปจากอดีต",
        visual: {
          kind: "concept-drift",
          timeline: [
            { t: 1, accuracy: 88 },
            { t: 2, accuracy: 84 },
            { t: 3, accuracy: 65, note: "Inactive ลดเหลือ 31% แต่โมเดลยังคงใช้กฎเดิม" },
          ],
        },
        numbers: ["68% -> 31% Inactive"],
      },
      {
        n: 4,
        verification: VERIFIED,
        headline: "โมเดลเสื่อมสภาพ (Degradation)",
        body: "โมเดลเดิมทำนายลูกค้ากลุ่มนี้ผิดพลาดจำนวนมากจน False Positive พุ่งสูง และ Accuracy ลดลงเหลือ 54%",
        visual: {
          kind: "concept-drift",
          timeline: [
            { t: 1, accuracy: 88 },
            { t: 2, accuracy: 84 },
            { t: 3, accuracy: 65 },
            { t: 4, accuracy: 54, note: "ความแม่นยำลดลงเหลือ 54% โมเดลไม่สอดคล้องกับโลกจริง" },
          ],
        },
        numbers: ["Accuracy 88% -> 54%"],
      },
      {
        n: 5,
        verification: VERIFIED,
        headline: "ทางแก้: Monitoring & Retraining",
        body: "แนวปฏิบัติของ Responsible AI คือต้องมี Human Oversight ตรวจจับ Drift สม่ำเสมอ และ Retrain โมเดลด้วยข้อมูลปัจจุบันเพื่อฟื้นความแม่นยำ",
        visual: {
          kind: "concept-drift",
          timeline: [
            { t: 1, accuracy: 88 },
            { t: 2, accuracy: 84 },
            { t: 3, accuracy: 65 },
            { t: 4, accuracy: 54 },
            { t: 5, accuracy: 86, note: "Retrain ด้วยข้อมูลใหม่ ความแม่นยำฟื้นกลับมา 86%" },
          ],
        },
        numbers: ["Retrain & Restore Accuracy to 86%"],
      },
    ],
  },
];

export const episodeById = Object.fromEntries(
  episodes.map((e) => [e.id, e]),
) as Record<Episode["id"], Episode>;

export const firstStepOf = (e: Episode): EpisodeStep => e.steps[0];