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
];

export const episodeById = Object.fromEntries(
  episodes.map((e) => [e.id, e]),
) as Record<Episode["id"], Episode>;

export const firstStepOf = (e: Episode): EpisodeStep => e.steps[0];
