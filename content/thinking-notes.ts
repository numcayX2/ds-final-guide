import type { EpisodeId } from "./types";

export type ThinkingNote = {
  /** Key formula for this step (KaTeX). Optional. */
  tex?: string;
  idea: string;
  shortcut: string;
  trap: string;
};

const tex = String.raw;

export const THINKING_NOTES: Record<EpisodeId, ThinkingNote[]> = {
  /* EP01 · Boxplot & outliers */
  ep01: [
    {
      tex: tex`Q_1 = 20,\quad \text{Median} = 28,\quad Q_3 = 35`,
      idea: "เรียงข้อมูลจากน้อยไปมากก่อน แล้ว Q₁, Median, Q₃ จะแบ่งข้อมูลเป็น 4 ส่วน ส่วนละ 25%",
      shortcut: "Median คือตำแหน่งกลาง (50%) ส่วน Q₁ และ Q₃ คือจุดแบ่งที่ 25% และ 75%",
      trap: "ถ้าลืมเรียงข้อมูลก่อนหาตำแหน่ง ค่าควอร์ไทล์จะผิดทั้งหมด",
    },
    {
      tex: tex`\mathrm{IQR} = Q_3 - Q_1 = 35 - 20 = 15`,
      idea: "IQR คือความกว้างของกล่อง ครอบคลุมข้อมูล 50% ตรงกลาง",
      shortcut: "IQR ใช้แค่ Q₃ กับ Q₁ ไม่เกี่ยวกับ Min หรือ Max",
      trap: "Max − Min คือ Range ไม่ใช่ IQR",
    },
    {
      tex: tex`\text{LF} = 20 - 1.5(15) = -2.5, \qquad \text{UF} = 35 + 1.5(15) = 57.5`,
      idea: "รั้วเป็นเส้นเกณฑ์ที่ห่างจาก Q₁ และ Q₃ ออกไป 1.5 × IQR ค่าที่อยู่นอกรั้วคือ Outlier",
      shortcut: "คิด 1.5 × IQR ครั้งเดียว (= 22.5) แล้วลบจาก Q₁ และบวกกับ Q₃",
      trap: "รั้วไม่ใช่ปลาย Whisker — รั้วเป็นแค่เกณฑ์ตัดสิน",
    },
    {
      tex: tex`\text{whisker}_{\text{right}} = \max\{\, x : x \le 57.5 \,\} = 50`,
      idea: "Whisker จบที่ค่าจริงตัวสุดท้ายที่ยังอยู่ในรั้ว คือ 50 ไม่ใช่ 57.5",
      shortcut: "Lect 05 สไลด์ 17: Fence เป็นเกณฑ์ ส่วน Whisker สิ้นสุดที่ค่าจริงสุดท้ายซึ่งยังอยู่ภายใน Fence",
      trap: "ลาก Whisker ไปถึงค่ารั้ว 57.5 เป็นข้อผิดพลาดที่พบบ่อย",
    },
    {
      tex: tex`58 > 57.5 \;\Rightarrow\; \text{outlier}`,
      idea: "58 อยู่เหนือรั้วบน จึงเป็น Outlier และต้องวาดเป็นจุดแยกจากกล่อง",
      shortcut: "เทียบทีละค่า: มากกว่า UF หรือน้อยกว่า LF คือ Outlier",
      trap: "50 ไม่ใช่ Outlier เพราะ 50 ≤ 57.5",
    },
  ],

  /* EP02 · Decision tree & Gini */
  ep02: [
    {
      tex: tex`\mathrm{Gini} = 1 - \left[\left(\tfrac{6}{12}\right)^2 + \left(\tfrac{6}{12}\right)^2\right] = 0.500`,
      idea: "สองคลาสปนกันครึ่งต่อครึ่ง ความไม่บริสุทธิ์จึงสูงสุดสำหรับกรณี 2 คลาส",
      shortcut: "2 คลาสสัดส่วน 50/50 ได้ Gini = 0.500 เสมอ ถ้ามีคลาสเดียวล้วน Gini = 0",
      trap: "ยกกำลังสองที่สัดส่วนของแต่ละคลาสก่อน แล้วค่อยรวม",
    },
    {
      tex: tex`1 - \left[\left(\tfrac{5}{6}\right)^2 + \left(\tfrac{1}{6}\right)^2\right] = 1 - \tfrac{26}{36} = \tfrac{10}{36} \approx 0.278`,
      idea: "แบ่งด้วย Days ≤ 45 ได้กิ่ง 5/1 และ 1/5 ซึ่งบริสุทธิ์ขึ้นมาก",
      shortcut: "คิดเป็นเศษส่วนจนจบ แล้วค่อยแปลงเป็นทศนิยม: 10/36 ≈ 0.278",
      trap: "หา Gini ของแต่ละกิ่งก่อน ยังไม่ต้องถ่วงน้ำหนักในขั้นนี้",
    },
    {
      tex: tex`\tfrac{6}{12}(0.278) + \tfrac{6}{12}(0.278) = 0.278`,
      idea: "ถ่วง Gini ของแต่ละกิ่งด้วยสัดส่วนจำนวนตัวอย่างในกิ่งนั้น",
      shortcut: "ถ้าสองกิ่งขนาดเท่ากันและ Gini เท่ากัน ค่าถ่วงน้ำหนักเท่ากับค่านั้นเลย",
      trap: "ถ้ากิ่งขนาดต่างกัน เช่น 8 กับ 4 ต้องคูณ 8/12 และ 4/12 ห้ามบวกแล้วหารสอง",
    },
    {
      tex: tex`1 - \left[\left(\tfrac{2}{6}\right)^2 + \left(\tfrac{4}{6}\right)^2\right] = \tfrac{16}{36} \approx 0.444`,
      idea: "Candidate B ได้กิ่ง 2/4 และ 4/2 ซึ่งยังปนกันมาก",
      shortcut: "ยิ่งจำนวนสองคลาสในกิ่งใกล้กัน Gini ยิ่งสูง",
      trap: "Weighted Gini ของ B (0.444) สูงกว่า A (0.278) แปลว่า B แยกข้อมูลได้แย่กว่า",
    },
    {
      tex: tex`\Delta_A = 0.500 - 0.278 = 0.222, \qquad \Delta_B = 0.500 - 0.444 = 0.056`,
      idea: "เลือก split ที่ Gain สูงสุด จึงเลือก Candidate A",
      shortcut: "Lect 07 p.12: Candidate split ที่ได้ Gini Gain สูงสุดจะถูกเลือก",
      trap: "Gini ยิ่งต่ำยิ่งดี แต่ Gini Gain ยิ่งสูงยิ่งดี — อย่าสลับกัน",
    },
    {
      tex: tex`1 - \left[\left(\tfrac{5}{6}\right)^2 + \left(\tfrac{1}{6}\right)^2\right] = 0.278`,
      idea: "เขียนสูตร → แทนค่าเป็นเศษส่วน → คำนวณ → ตอบเป็นทศนิยม ให้ผู้ตรวจเห็นทุกขั้น",
      shortcut: "เก็บเป็นเศษส่วนให้นานที่สุด แล้วปัดทศนิยมครั้งเดียวตอนท้าย",
      trap: "ปัดเลขระหว่างทางทำให้คำตอบสุดท้ายคลาดได้ — ถามอาจารย์ว่าต้องการทศนิยมกี่ตำแหน่ง",
    },
  ],

  /* EP03 · Confusion matrix */
  ep03: [
    {
      tex: tex`\text{Positive} = \text{Play}, \qquad \text{Negative} = \text{Rest}`,
      idea: "กำหนดก่อนว่าคลาสเป้าหมายคือ Play ทุกช่องในตารางนับจากคลาสนี้",
      shortcut: "อ่านโจทย์ว่าสนใจคลาสไหน เช่น ถ้าถามเรื่อง Churn คนที่ยกเลิกคือ Positive",
      trap: "ถ้าสลับให้ Rest เป็น Positive ค่า Precision และ Recall จะเปลี่ยนทั้งหมด",
    },
    {
      tex: tex`\begin{array}{c|cc} & \hat{+} & \hat{-} \\ \hline + & TP & FN \\ - & FP & TN \end{array}`,
      idea: "แถวคือค่าจริง คอลัมน์คือค่าที่โมเดลทาย",
      shortcut: "แนวทแยง TP และ TN คือที่ทายถูก",
      trap: "บางโจทย์วางค่าที่ทายเป็นแถว ต้องอ่านหัวตารางก่อนเสมอ",
    },
    {
      tex: tex`TP + TN + FP + FN = 4 + 3 + 1 + 2 = 10`,
      idea: "จริง Play ทาย Play = TP · จริง Rest ทาย Rest = TN · จริง Rest ทาย Play = FP · จริง Play ทาย Rest = FN",
      shortcut: "ผลรวม 4 ช่องต้องเท่ากับจำนวนข้อมูลทั้งหมดเสมอ",
      trap: "FN คือของจริงเป็น Positive แต่โมเดลทายว่า Negative",
    },
    {
      tex: tex`\text{Acc} = \tfrac{4+3}{10} = 0.70, \qquad \text{Prec} = \tfrac{4}{4+1} = 0.80`,
      idea: "Accuracy ดูภาพรวม ส่วน Precision ดูว่าในคนที่ทายว่า Play ถูกจริงกี่คน",
      shortcut: "Precision อ่านตามคอลัมน์ ‘ทาย Play’: TP หารด้วยผลรวมคอลัมน์ (TP + FP)",
      trap: "อย่าใช้ Accuracy อย่างเดียวเมื่อคลาสไม่สมดุล",
    },
    {
      tex: tex`\text{Recall} = \tfrac{TP}{TP+FN} = \tfrac{4}{6} \approx 0.667`,
      idea: "ของจริงมีคนพร้อมเล่น 6 คน โมเดลจับได้ 4 คน",
      shortcut: "Recall อ่านตามแถว ‘จริง Play’: TP หารด้วยผลรวมแถว (TP + FN)",
      trap: "ถ้าโจทย์ถามว่าตัวไหนวัดการพลาดเคสที่เป็น Positive จริง คำตอบคือ Recall",
    },
    {
      tex: tex`F_1 = \tfrac{2TP}{2TP + FP + FN} = \tfrac{8}{11} \approx 0.727`,
      idea: "F1 เป็น Harmonic mean ของ Precision (0.80) และ Recall (0.667)",
      shortcut: "ใช้รูป 2TP / (2TP + FP + FN) ไม่ต้องหา P และ R ก่อน",
      trap: "ค่าเฉลี่ยธรรมดา (0.80 + 0.667) / 2 = 0.733 ไม่ใช่ F1",
    },
  ],

  /* EP04 · K-Means */
  ep04: [
    {
      tex: tex`A_1, \dots, A_8 \in \mathbb{R}^2`,
      idea: "ข้อมูลไม่มีป้ายกลุ่ม หน้าที่คือจัดกลุ่มตามความใกล้กัน",
      shortcut: "K-Means เป็น Unsupervised Learning",
      trap: "อย่าสับสนกับ K-NN ซึ่งเป็น Supervised และต้องมี Label",
    },
    {
      tex: tex`C_1 = (2, 10),\quad C_2 = (5, 8),\quad C_3 = (1, 2)`,
      idea: "สไลด์เลือก A1, A4, A7 เป็น Centroid เริ่มต้น",
      shortcut: "รอบแรกมักเลือก Centroid จากจุดข้อมูล รอบต่อไปจะเป็นค่าเฉลี่ยของกลุ่ม",
      trap: "ผลลัพธ์ขึ้นกับจุดเริ่มต้น เริ่มต่างกันอาจได้กลุ่มต่างกัน (Local optimum)",
    },
    {
      tex: tex`d = |x_1 - x_2| + |y_1 - y_2|`,
      idea: "Manhattan บวกผลต่างของแต่ละแกนตรงๆ ไม่ต้องยกกำลังหรือถอดรูท",
      shortcut: "นึกถึงการเดินตามถนนตาราง: เดินแกน x แล้วเลี้ยวไปแกน y",
      trap: "ถ้าโจทย์สั่ง Euclidean ต้องใช้รากที่สอง ใช้สูตรผิดจะผิดทั้งตาราง",
    },
    {
      tex: tex`d(A_3, C_1) = 12,\ d(A_3, C_2) = 7,\ d(A_3, C_3) = 9 \;\Rightarrow\; C_2`,
      idea: "วัดระยะไปทุก Centroid แล้วจัดเข้ากลุ่มที่ใกล้ที่สุด",
      shortcut: "ทำทีละจุด เขียนระยะทั้ง 3 ค่าลงตาราง แล้ววงค่าที่น้อยที่สุด",
      trap: "ถ้าระยะเท่ากัน ให้ใช้กฎตามสไลด์ คือเลือกกลุ่มที่เลขน้อยกว่า",
    },
    {
      tex: tex`C_2 = \left(\tfrac{8+5+7+6+4}{5},\ \tfrac{4+8+5+4+9}{5}\right) = (6, 6)`,
      idea: "Centroid ใหม่คือค่าเฉลี่ยพิกัดของสมาชิกในกลุ่ม",
      shortcut: "C1 มีสมาชิกเดียวคือ A1 จึงอยู่ที่เดิม (2, 10) · C3 = (1.5, 3.5)",
      trap: "หารด้วยจำนวนสมาชิกจริงของกลุ่มนั้น: C2 หาร 5, C3 หาร 2",
    },
    {
      tex: tex`C_1 = (2, 10),\quad C_2 = (6, 6),\quad C_3 = (1.5, 3.5)`,
      idea: "วัดระยะทุกจุดใหม่ด้วย Centroid ชุดใหม่ แล้วดูว่ามีจุดใดย้ายกลุ่มไหม",
      shortcut: "วนทำ: วัดระยะ → จัดกลุ่ม → หาค่าเฉลี่ย จนถึงเงื่อนไขหยุด",
      trap: "ต้องใช้ Centroid ใหม่ ห้ามใช้ค่าจากรอบแรกซ้ำ",
    },
    {
      tex: tex`O(t \cdot k \cdot n)`,
      idea: "หยุดเมื่อไม่มีจุดใดย้ายกลุ่ม หรือ Centroid ไม่ขยับ หรือครบจำนวนรอบสูงสุด",
      shortcut: "t = จำนวนรอบ, k = จำนวนกลุ่ม, n = จำนวนข้อมูล",
      trap: "จุดอ่อน: ต้องกำหนด k ล่วงหน้า ไวต่อ Outlier และใช้ได้กับข้อมูลตัวเลข",
    },
  ],

  /* EP05 · SHAP */
  ep05: [
    {
      tex: tex`E[f(x)] = 32\%`,
      idea: "ก่อนดูฟีเจอร์ของลูกค้าคนนี้ โมเดลเริ่มจากค่าทำนายเฉลี่ย (Base value)",
      shortcut: "Base value คือค่าทำนายเฉลี่ยของโมเดลบนข้อมูลอ้างอิง",
      trap: "Base value ไม่ใช่ 0% หรือ 50% โดยอัตโนมัติ",
    },
    {
      tex: tex`32 + 29 = 61`,
      idea: "การไม่ซื้อเกิน 45 วันดันความน่าจะเป็น Inactive ขึ้น 29 จุดเปอร์เซ็นต์",
      shortcut: "SHAP บวกดันไปทางคลาสเป้าหมาย SHAP ลบดึงออก",
      trap: "บวกเป็นจุดเปอร์เซ็นต์: 32% + 29 = 61% ไม่ใช่ 32 × 1.29",
    },
    {
      tex: tex`61 + 12 = 73`,
      idea: "ประวัติร้องเรียนดันขึ้นอีก 12 จุด",
      shortcut: "ผลของแต่ละฟีเจอร์บวกสะสมกันได้ (Additive)",
      trap: "ค่านี้อธิบายลูกค้าคนนี้คนเดียว (Local) ไม่ได้แปลว่าทุกคนได้ +12",
    },
    {
      tex: tex`73 - 8 = 65`,
      idea: "ยอดซื้อสะสมที่สูงดึงกลับลง 8 จุด",
      shortcut: "ฟีเจอร์ที่ SHAP เป็นลบคือสิ่งที่ลดความเสี่ยงของลูกค้าคนนี้",
      trap: "แม้มีแรงดึงลง ผลรวมยังสูงกว่า Base value เพราะแรงดันขึ้นมากกว่า",
    },
    {
      tex: tex`f(x) = 32 + 29 + 12 - 8 = 65\%`,
      idea: "ผลทำนาย = Base value + ผลรวม SHAP ของทุกฟีเจอร์",
      shortcut: "Base value + ΣSHAP ต้องเท่ากับผลทำนายพอดี ใช้ตรวจคำตอบได้",
      trap: "หน่วยในตัวอย่างนี้คือจุดเปอร์เซ็นต์ ไม่ใช่เปอร์เซ็นต์สัมพัทธ์",
    },
  ],

  /* EP06 · Concept drift */
  ep06: [
    {
      tex: tex`P(\text{Inactive} \mid {>}45\,\text{d}) = 0.68, \qquad \text{Acc} = 88\%`,
      idea: "ข้อมูลจริงยังเหมือนข้อมูลที่ใช้เทรน โมเดลจึงแม่น",
      shortcut: "ช่วงแรกข้อมูลยังอยู่ใน distribution เดิม (In-distribution)",
      trap: "ความแม่นยำตอน deploy ไม่ได้คงที่ตลอดไป",
    },
    {
      idea: "บริษัทเปลี่ยนเป็นระบบสมาชิกรายเดือน ลูกค้าไม่จำเป็นต้องกลับมาซื้อทุก 45 วันอีกต่อไป",
      shortcut: "การเปลี่ยนแปลงทางธุรกิจหรือพฤติกรรมเป็นสาเหตุหลักของ Concept Drift",
      trap: "โค้ดของโมเดลไม่ได้เสีย แต่ความสัมพันธ์ในโลกจริงเปลี่ยน",
    },
    {
      tex: tex`P(\text{Inactive} \mid {>}45\,\text{d}):\ 0.68 \to 0.31`,
      idea: "Lect 09 p.11: กฎ 45 วันบ่งบอก Inactive ได้ไม่เหมือนเดิมแล้ว",
      shortcut: "Concept Drift คือ P(Y | X) เปลี่ยน",
      trap: "ถ้า P(X) เปลี่ยนแต่ P(Y | X) เท่าเดิม เรียกว่า Covariate Shift ไม่ใช่ Concept Drift",
    },
    {
      tex: tex`\text{Acc}:\ 88\% \to 54\%`,
      idea: "โมเดลยังใช้กฎเดิม ทายลูกค้าที่ยังใช้งานว่าเป็น Inactive จน FP เพิ่ม",
      shortcut: "เรียกว่า Model Degradation",
      trap: "ถ้ายังไม่มีป้ายคำตอบจริง ให้เฝ้าดู Data drift และ Prediction drift แทน",
    },
    {
      tex: tex`\text{Acc}_{\text{retrained}} = 86\%`,
      idea: "เฝ้าดูประสิทธิภาพ และ Retrain ด้วยข้อมูลปัจจุบัน",
      shortcut: "แก้ด้วย Monitoring + Retraining + Human oversight",
      trap: "อย่าใช้แบบ Set and forget — ตั้งการแจ้งเตือนเมื่อประสิทธิภาพลดลง",
    },
  ],
};
