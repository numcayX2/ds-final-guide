import type { Chapter } from "./types";

/**
 * Chapters whose figures have been checked against the lecture slides.
 *
 * Ch05 currently carries only its Concept Drift section (Lect 09 p.11, read
 * and verified). Its XAI/SHAP and ethics sections are absent on purpose: those
 * slides are image-only and the vision pool has been rate-limited, so they
 * wait rather than shipping guessed figures.
 *
 * Ch01 (EDA) and Ch02 (Modeling) are absent for the same reason: concepts are
 * confirmed, worked numbers are not.
 */

export const chapters: Chapter[] = [
  /* ============================ 03 ============================ */
  {
    index: "03",
    slug: "confusion-matrix",
    title: "Confusion Matrix",
    titleTh: "ตารางสับสนและมาตรวัด",
    lectures: ["Lect 07"],
    standfirst:
      "ตาราง 2x2 บอกว่าโมเดลพลาดตรงไหน และมาตรวัดสี่ตัวบอกว่าพลาดแบบไหนที่แพงกว่า",
    keyTerms: ["Positive Class", "True Positive", "False Negative", "F1-Score"],
    sections: [
      {
        heading: "ตารางประเมินผล 2x2",
        body: [
          {
            kind: "prose",
            text: "ก่อนคำนวณมาตรวัดใดๆ ต้องกำหนดให้ชัดว่าคลาสไหนคือ Positive ก่อนเสมอ เพราะถ้าสลับด้าน TP กับ TN ตัวเลขทุกตัวจะสลับตามไปหมด",
          },
          {
            kind: "definition",
            term: "Positive Class",
            text: "คลาสที่เราสนใจ ในเคสนี้คือ play คือผู้เล่นมีฟอร์มดีพร้อมลงเล่น",
          },
          {
            kind: "table",
            caption: "ตารางสับสน เคสฟุตบอลโลก 2026 (Lect 07 p.23)",
            headers: ["", "ทำนาย play", "ทำนาย rest"],
            rows: [
              ["ความจริง play", "TP = 4", "FN = 2"],
              ["ความจริง rest", "FP = 1", "TN = 3"],
            ],
          },
          {
            kind: "prose",
            text: "อ่านตารางตามแถวคือความจริง ตามคอลัมน์คือสิ่งที่โมเดลทำนาย ทั้ง 10 แถวของตารางต้นฉบับถูกนับมาได้ TP 4, TN 3, FP 1, FN 2 รวม 10 คน",
          },
        ],
      },
      {
        heading: "คำนวณทั้งสี่มาตรวัด",
        body: [
          {
            kind: "worked-example",
            title: "เคสฟุตบอลโลก 2026",
            steps: [
              "Accuracy = (TP + TN) / (TP + TN + FP + FN) = (4 + 3) / 10 = 70.00%",
              "Precision = TP / (TP + FP) = 4 / 5 = 80.00%",
              "Recall = TP / (TP + FN) = 4 / 6 = 66.67%",
              "F1 = 2 x (P x R) / (P + R) = 2 x (0.80 x 0.6667) / (1.4667) = 72.73%",
            ],
            answer: "Accuracy 70.00% · Precision 80.00% · Recall 66.67% · F1 72.73%",
          },
          {
            kind: "pitfall",
            title: "Precision สูงแต่ Recall ต่ำ แปลว่าอะไร",
            text: "โมเดลของเราบอกว่าพร้อมเล่น 5 คน ความจริงพร้อมเล่น 6 คน แปลว่าโมเดลขี้เกียจปล่อยคนที่ควรได้ลงเล่นไป 2 คน นั่นคือ False Negative ซึ่งแพงกว่า False Positive ในบริบทนี้",
          },
        ],
      },
      {
        heading: "เลือกมาตรวัดไหน เมื่อต้นทุนไม่เท่ากัน",
        body: [
          {
            kind: "definition",
            term: "Precision คุ้มเมื่อ FP แพง",
            text: "เช่น ระบบกรองสแปมเมล หรือการแจ้งเหตุฉุกเฉิน ปล่อยคนดีมาเยอะแย่กว่าปล่อยคนไม่ดี",
          },
          {
            kind: "definition",
            term: "Recall คุ้มเมื่อ FN วิกฤต",
            text: "เช่น การตรวจโรค หรือการทำนายลูกค้าจะเลิกใช้บริการ ปล่อยลูกค้าทิ้งไปแย่กว่าจับลูกค้าที่จะเลิกได้ไม่ครบ",
          },
          {
            kind: "marker",
            text: "Accuracy ไม่ควรเป็นตัวเดียวที่ดู เมื่อคลาสไม่สมดุล",
          },
        ],
      },
    ],
  },

  /* ============================ 04 ============================ */
  {
    index: "04",
    slug: "kmeans",
    title: "K-Means Clustering",
    titleTh: "การจัดกลุ่มแบบ K-Means",
    lectures: ["Lect 08"],
    standfirst:
      "สามขั้นตอนที่ต้องทำด้วยมือได้ กับคำถามที่ข้อสอบชอบถามว่าระยะห่างใช้แบบไหน",
    keyTerms: ["Centroid", "Manhattan Distance", "Convergence", "Local Optimum"],
    sections: [
      {
        heading: "นิยามการจัดกลุ่ม",
        body: [
          {
            kind: "definition",
            term: "เป้าหมายของ Clustering",
            text: "แบ่งให้สิ่งที่อยู่ในกลุ่มเดียวกันมีความคล้ายคลึงกันมากที่สุด และแบ่งให้แต่ละกลุ่มมีความเหมือนกันน้อยที่สุด",
          },
          {
            kind: "prose",
            text: "ถ้า Classification คือการที่เรารู้ผลเฉลย categories อยู่ก่อนแล้ว Clustering ก็คือการที่เราไม่มีผลเฉลย categories ใดๆ เลย",
          },
        ],
      },
      {
        heading: "สามขั้นตอนของอัลกอริทึม",
        body: [
          {
            kind: "marker",
            text: "K-Means ต้องระบุค่า K ล่วงหน้า และในความเป็นจริงเราไม่รู้ว่าข้อมูลควรมีกี่กลุ่ม จึงต้องลองหลายค่า",
          },
          {
            kind: "prose",
            text: "หนึ่ง สุ่มจุดศูนย์กลางเริ่มต้นจำนวน k ค่า สอง วัดระยะห่างจากข้อมูลไปยังจุดศูนย์กลาง แล้วย้ายข้อมูลไปอยู่กับจุดที่ใกล้ที่สุด สาม คำนวณค่าเฉลี่ยของแต่ละกลุ่มให้เป็นจุดศูนย์กลางใหม่ แล้ววนกลับไปข้อสองจนกว่าค่าเฉลี่ยจะไม่เปลี่ยน หรือไม่มีสมาชิกข้ามกลุ่มอีก",
          },
        ],
      },
      {
        heading: "คำนวณด้วยมือ: Manhattan Distance",
        body: [
          {
            kind: "definition",
            term: "Manhattan Distance",
            text: "Distance(A, Y) = |x1 - y1| + |x2 - y2| + ... + |xn - yn| เรียกอีกชื่อว่า City-block distance",
          },
          {
            kind: "table",
            caption: "รอบที่ 1 คำนวณด้วย Manhattan จาก centroid เริ่มต้น C1(2,10) C2(5,8) C3(1,2)",
            headers: ["จุด", "พิกัด", "ถึง C1", "ถึง C2", "ถึง C3", "ไปกลุ่ม"],
            rows: [
              ["A1", "(2, 10)", "0", "5", "9", "1"],
              ["A2", "(2, 5)", "5", "6", "4", "3"],
              ["A3", "(8, 4)", "12", "7", "9", "2"],
              ["A4", "(5, 8)", "5", "0", "10", "2"],
              ["A5", "(7, 5)", "10", "5", "9", "2"],
              ["A6", "(6, 4)", "10", "5", "7", "2"],
              ["A7", "(1, 2)", "9", "10", "0", "3"],
              ["A8", "(4, 9)", "3", "2", "10", "2"],
            ],
          },
          {
            kind: "worked-example",
            title: "อัปเดต centroid รอบที่ 2",
            steps: [
              "Cluster 1 มี A1 จุดเดียว ค่าเฉลี่ยจึงยังเป็น C1(2, 10) เดิม",
              "Cluster 2 มี 5 จุด: C2 = ((8+5+7+6+4)/5, (4+8+5+4+9)/5) = (30/5, 30/5) = (6, 6)",
              "Cluster 3 มี 2 จุด: C3 = ((2+1)/2, (5+2)/2) = (3/2, 7/2) = (1.5, 3.5)",
            ],
            answer: "C1(2, 10) · C2(6, 6) · C3(1.5, 3.5)",
          },
        ],
      },
      {
        heading: "จุดแข็งและจุดอ่อน",
        body: [
          {
            kind: "table",
            caption: "Strength และ Weakness ตามที่สไลด์ระบุ",
            headers: ["Strength", "Weakness"],
            rows: [
              ["เข้าใจง่าย แก้ปัญหาได้", "ใช้ได้เฉพาะข้อมูลที่หาค่าเฉลี่ยได้ ข้อมูลเชิงกลุ่มต้องเข้ารหัสเป็นตัวเลขก่อน เช่น ผอม 1 ปานกลาง 2 อ้วน 3"],
              ["เป้าหมายคือความคล้ายภายในกลุ่ม", "มักหยุดที่ local optimum ค่าเริ่มต้นจึงสำคัญ"],
              ["ทำงานเร็ว O(tkn)", "ต้องระบุ K ล่วงหน้า และจัดการข้อมูลผิดปกติได้ไม่ดี"],
            ],
          },
          {
            kind: "pitfall",
            title: "Manhattan กับ Squared Euclidean ไม่ใช่อันเดียวกัน",
            text: "ตอนคิดด้วยมือในข้อสอบใช้ Manhattan แบบบวกล้วน แต่พอคิดค่า WCSS หรือ Inertia ในทฤษฎีจะใช้ Euclidean แบบยกกำลังสองแล้วรากที่สอง ห้ามสลับใช้คิดเพราะจะได้คนละคำตอบ",
          },
        ],
      },
    ],
  },

  /* ============================ 05 ============================ */
  {
    index: "05",
    slug: "responsible-ds",
    title: "Responsible Data Science",
    titleTh: "วิทยาข้อมูลที่รับผิดชอบ",
    lectures: ["Lect 09"],
    standfirst:
      "โมเดลสำคัญได้แม้ไม่มีใครแก้ Code ถ้าโลกเปลี่ยนไปแล้ว",
    keyTerms: ["Concept Drift", "Historical Bias", "Feature-Target Relationship"],
    sections: [
      {
        heading: "Concept Drift: เมื่อโลกเปลี่ยน รูปแบบเดิมก็เปลี่ยน",
        body: [
          {
            kind: "definition",
            term: "นิยามจากสไลด์",
            text: "ความสัมพันธ์ระหว่าง Feature กับ Target อาจไม่เหมือนช่วงที่ได้ train",
          },
          {
            kind: "worked-example",
            title: "เคสร้านค้าปลีกและบริการ Subscription (Lect 09 p.11)",
            steps: [
              "อดีต ช่วงฝึกโมเดล สภาพแวดล้อมเดิมคือการซื้อแบบปกติ ลูกค้าซื้อเป็นครั้งคราวและไม่มีการสมัครสมาชิก",
              "กฎที่โมเดลเรียนรู้คือ \u201cไม่ซื้อเกิน 45 วัน\u201d และทำนายเป็น Inactive 68%",
              "เหตุการณ์ที่เปลี่ยนแปลงคือเริ่มบริการ Subscription มีการจัดส่งสินค้าตามนิติตามรอบระยะเวลา",
              "ลูกค้าได้รับสินค้าต่อเนื่องโดยอัตโนมัติ แม้ไม่ได้สั่งซื้อด้วยตนเอง",
              "ปัจจุบัน โมเดลยังใช้กฎเดิม ไม่ซื้อเกิน 45 วัน แต่ความจริงเปลี่ยนไปแล้ว",
              "ผลทำนายกลายเป็น Inactive 31% และกฎเดิมทำนายผิดมากขึ้น",
            ],
            answer: "Inactive ลดจาก 68% เหลือ 31% ทั้งที่โมเดลและ Code ไม่เปลี่ยนแปลง",
          },
          {
            kind: "table",
            caption: "Historical Bias ต่างจาก Concept Drift อย่างไร",
            headers: ["Historical Bias", "Concept Drift"],
            rows: [
              [
                "อดีตหล่อมสร้างอย่างไร ข้อมูลในอดีตจะทำหน้าที่ถูกกรองภายใต้บริบทเดิม และไม่ตอบสนองความสัมพันธ์จากข้อมูลในอดีตนั้น",
                "อดีตยังใช้กับปัจจุบันได้หรือไม่ เมื่อสภาพแวดล้อมหรือพฤติกรรมเปลี่ยน ความสัมพันธ์ระหว่าง Feature กับ Target ก็อาจเปลี่ยน",
              ],
              [
                "ปัญหาอยู่ที่ข้อมูลที่ใช้สร้างโมเดล",
                "กฎเดิมอาจไม่ถูกต้องอีกต่อไป แม้โมเดลและ Code จะเหมือนเดิม",
              ],
            ],
          },
          {
            kind: "marker",
            text: "โมเดลสำคัญได้แม้ไม่มีใครแก้ Code เพราะโลกเปลี่ยน ข้อมูลเปลี่ยน ความสัมพันธ์ระหว่าง Feature กับ Target ก็เปลี่ยนตาม",
          },
          {
            kind: "pitfall",
            title: "ตัวเลข 68% กับ 31% ไม่ใช่ค่าความแม่นยำ",
            text: "เป็นเปอร์เซ็นต์ที่แสดงในช่องผลลัพธ์ Inactive ของโมเดล ไม่ใช่ accuracy หรือ error rate อย่าเอาไปเทียบกับค่าความแม่นยำ",
          },
        ],
      },
    ],
  },
];
