import type { MockTest, Question } from "./types";

/**
 * Mock exam — 35 questions covering Lecture 05 to Lecture 09.
 *
 * Every question was checked against the extracted lecture slides
 * (scratch/lect0N_extracted):
 * - Questions 01–10, 35: Lect 09 (Responsible Data Science, XAI, Bias & Ethics, Monitoring)
 * - Questions 11–14: Lect 05 (Exploratory Data Analysis, Fences vs Whiskers)
 * - Questions 15–16: Lect 06 (Modeling & CRISP-DS Framework)
 * - Questions 17–20, 31–33: Lect 07 (Gini, Confusion Matrix, HW#2, depth selection, Decision Gates)
 * - Questions 21–30, 34: Lect 08 (K-Means: Centroids, Metrics, Weaknesses, Silhouette)
 *
 * Every number and formula matches verified lecture slides.
 */

const V = "verified-by-principle" as const;

export const questionsLect09: Question[] = [
  {
    n: 1,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "ในกระบวนการพัฒนา Data Science เพื่อนำไปใช้งานจริง หากโมเดลทำคะแนนความถูกต้องโดยรวม (Accuracy) ได้สูงถึง 84% เหตุใดจึงยังไม่สามารถอนุมัติให้ระบบส่งข้อเสนอหรืองานแบบอัตโนมัติได้ทันที? (CLO3)",
    options: [
      {
        label: "a",
        text: "เพราะคะแนนภาพรวมอาจบดบังประสิทธิภาพที่ต่ำในกลุ่มย่อย และยังไม่ได้ตรวจการอธิบายผล ผลกระทบ และจริยธรรม",
        correct: true,
      },
      {
        label: "b",
        text: "เพราะขั้นตอนของ CRISP-DS ห้ามไม่ให้มีขั้นตอนการส่งข้อเสนออัตโนมัติ",
        correct: false,
      },
      {
        label: "c",
        text: "เพราะโมเดลจำเป็นต้องเปลี่ยนไปใช้วิธี Unsupervised Learning เสมอ",
        correct: false,
      },
      {
        label: "d",
        text: "เพราะต้องรอให้ผลลัพธ์ Accuracy สูงถึง 100% เท่านั้น",
        correct: false,
      },
    ],
    explanation:
      "แม้โมเดลจะทำคะแนนความถูกต้องโดยรวม (Accuracy) ได้สูงถึง 84% แต่ไม่สามารถอนุมัติให้ระบบทำงานอัตโนมัติทันทีได้ เพราะ:\n1. คะแนนภาพรวมอาจบดบังประสิทธิภาพที่ต่ำมากในกลุ่มย่อย (Subgroup Disparities เช่น ในกลุ่มชนกลุ่มน้อยหรือกลุ่มเปราะบางอาจมี Recall ต่ำมาก)\n2. ยังไม่ได้ตรวจสอบการอธิบายผลลัพธ์ (Explainability / XAI) ว่าโมเดลใช้เหตุผลที่สมเหตุสมผลหรือไม่\n3. ยังไม่ได้ประเมินผลกระทบเชิงจริยธรรม กฎหมาย และความเสี่ยงต่อธุรกิจ ตามหลัก Responsible AI จะต้องผ่าน Decision Gates (Accept/Revise/Reject) และมี Human Oversight กำกับดูแลเสมอ",
    slideRef:
      "Lect 09 p4 (Accuracy 84% vs Recall กลุ่มใหม่ 54%) และ p12 (Representation Bias, n=800 CI 78-86% vs n=40 CI 39-69%)",
    verification: V,
  },
  {
    n: 2,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "หากผู้บริหารต้องการทราบว่า \"โมเดลการทำนายลูกค้ายกเลิกบริการในภาพรวมทั้งบริษัท ให้ความสำคัญหรือพึ่งพาปัจจัยใดมากที่สุด\" ควรเลือกใช้เครื่องมืออธิบาย AI (XAI) ในระดับใด? (CLO1)",
    options: [
      { label: "a", text: "Counterfactual Explanation", correct: false },
      { label: "b", text: "Local Explanation", correct: false },
      { label: "c", text: "Individual Decision Path", correct: false },
      { label: "d", text: "Global Explanation", correct: true },
    ],
    explanation:
      "คำตอบคือ Global Explanation (การอธิบายระดับภาพรวมทั้งระบบ):\n- Global Explanation: ใช้อธิบายพฤติกรรมของโมเดลทั้งระบบในภาพรวม เช่น Global Feature Importance หรือ SHAP Summary Plot เพื่อตอบคำถามผู้บริหารว่าในระดับประชากรทั้งหมด ปัจจัยใดมีอิทธิพลต่อผลการทำนายมากที่สุด\n- Local Explanation: อธิบายการตัดสินใจเฉพาะลูกค้ารายบุคคล (Individual Instance)\n- Individual Decision Path: แสดงกิ่งและเงื่อนไขการตัดสินใจของลูกค้ารายคนใน Decision Tree\n- Counterfactual Explanation: อธิบายเงื่อนไขขั้นต่ำที่ต้องเปลี่ยนแปลงเพื่อให้ผลการทำนายพลิกเป็นอีกแบบ",
    slideRef: "Lect 09 p5 (Global Explanation กับ Local Explanation)",
    verification: V,
  },
  {
    n: 3,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "ในการเลือกใช้เทคนิค Explainable AI (XAI) ข้อใดอธิบายความแตกต่างระหว่าง \"Model-Specific\" และ \"Model-Agnostic\" ได้อย่างถูกต้อง? (CLO1)",
    options: [
      {
        label: "a",
        text: "Model-Specific ใช้ได้กับโมเดลทุกประเภท ส่วน Model-Agnostic ใช้ได้เฉพาะ Decision Tree",
        correct: false,
      },
      {
        label: "b",
        text: "Model-Specific อาศัยโครงสร้างภายในของโมเดลนั้น ๆ ส่วน Model-Agnostic ตรวจสอบพฤติกรรมผ่าน Input-Output โดยไม่ยึดติดกับโครงสร้างโมเดล",
        correct: true,
      },
      {
        label: "c",
        text: "Model-Specific ใช้กับข้อมูลไม่มี Label ส่วน Model-Agnostic ใช้กับข้อมูลมี Label",
        correct: false,
      },
      {
        label: "d",
        text: "Model-Specific ใช้ตรวจหา Data Leakage ส่วน Model-Agnostic ใช้คำนวณ Accuracy",
        correct: false,
      },
    ],
    explanation:
      "ความแตกต่างสำคัญของสถาปัตยกรรม XAI:\n- Model-Specific: ต้องอาศัยโครงสร้างภายในและพารามิเตอร์เฉพาะของโมเดลนั้นๆ เช่น ค่าสัมประสิทธิ์ Weights ใน Linear Regression หรือ Gini/Entropy Split ใน Decision Tree ไม่สามารถนำไปอธิบายโมเดลต่างสถาปัตยกรรมได้\n- Model-Agnostic: มองโมเดลเสมือนเป็น Black-box ไม่ยึดติดกับโครงสร้างภายใน โดยอาศัยการจำลองป้อน Input และสังเกตการเปลี่ยนแปลงของ Output (เช่น SHAP KernelExplainer, LIME, Permutation Feature Importance) จึงสามารถนำไปใช้อธิบายโมเดล Machine Learning ได้ทุกประเภท",
    slideRef:
      "Lect 09 p8 (Model-Specific ใช้โครงสร้างภายใน / Model-Agnostic ใช้ Input-Output, SHAP และ LIME)",
    verification: V,
  },
  {
    n: 4,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "จากการนำเทคนิค SHAP มาอธิบายผลการทำนายลูกค้ารายหนึ่ง พบว่าค่า Base Value อยู่ที่ 32% และผลการทำนายสุดท้ายอยู่ที่ 65% โดยปัจจัย \"ไม่ได้ซื้อสินค้านาน\" มีค่า SHAP value เท่ากับ +29% ค่าดังกล่าวแสดงความหมายอย่างไร? (CLO2)",
    options: [
      {
        label: "a",
        text: "ปัจจัยนี้ทำให้ความน่าจะเป็นที่ลูกค้าจะ Inactive เพิ่มขึ้น 29 จุดเปอร์เซ็นต์ เมื่อเทียบกับค่าฐาน",
        correct: true,
      },
      {
        label: "b",
        text: "ปัจจัยนี้ทำให้ลดความเสี่ยงที่ลูกค้าจะ Inactive ลง 29 จุดเปอร์เซ็นต์ เมื่อเทียบกับค่าฐาน",
        correct: false,
      },
      {
        label: "c",
        text: "ปัจจัยนี้เป็นสาเหตุเดียวที่ทำให้ลูกค้าตัดสินใจเลิกใช้งาน 29 วัน",
        correct: false,
      },
      {
        label: "d",
        text: "โมเดลมีความแม่นยำในการทำนายลูกค้าคนนี้เพิ่มขึ้น 29%",
        correct: false,
      },
    ],
    explanation:
      "ในแนวคิด SHAP (SHapley Additive exPlanations):\n- Base Value (32%) คือค่าความน่าจะเป็นเฉลี่ยตั้งต้นของข้อมูลทั้งหมด\n- ผลการทำนายสุดท้าย (65%) คำนวณจาก Base Value + ผลรวมของ SHAP Values ของทุกฟีเจอร์ (32% + 29% + ตัวแปรอื่น = 65%)\n- ค่า SHAP Value ที่เป็นบวก (+29%) ของปัจจัย 'ไม่ได้ซื้อสินค้านาน' หมายถึง ปัจจัยนี้ช่วยผลักดันให้ความน่าจะเป็นที่ลูกค้าจะ Inactive สูงขึ้น 29 จุดเปอร์เซ็นต์ (Percentage Points) เมื่อเทียบกับค่าฐาน (ไม่ใช่การเพิ่มความแม่นยำ และไม่ใช่จำนวนวัน)",
    slideRef: "Lect 09 p9 (SHAP: Base Value 32%, +29 จุดเปอร์เซ็นต์, Prediction 65%)",
    verification: V,
  },
  {
    n: 5,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "ปรากฏการณ์ \"Concept Drift\" ที่ส่งผลให้โมเดล Machine Learning มีประสิทธิภาพลดลงเมื่อนำไปใช้งานจริง มีสาเหตุหลักมาจากข้อใด? (CLO2)",
    options: [
      {
        label: "a",
        text: "การสุ่มค่า Centroid เริ่มต้นผิดพลาดในขั้นตอน Modeling",
        correct: false,
      },
      {
        label: "b",
        text: "ข้อผิดพลาดในการเขียน Syntax ของโปรแกรมเมอร์หลังจากรันโมเดล",
        correct: false,
      },
      {
        label: "c",
        text: "โครงสร้างและสภาพแวดล้อมในโลกจริงเปลี่ยนไป ทำให้ความสัมพันธ์ระหว่าง Feature กับ Target เปลี่ยนแปลงไปจากอดีต",
        correct: true,
      },
      {
        label: "d",
        text: "การแบ่งชุดข้อมูลออกเป็น Train และ Validation Data มีสัดส่วนไม่เท่ากัน",
        correct: false,
      },
    ],
    explanation:
      "Concept Drift คือปรากฏการณ์ที่ความสัมพันธ์ระหว่าง Feature กับ Target ไม่เหมือนช่วงที่ train เนื่องจากสภาพแวดล้อมในโลกจริงเปลี่ยนไป ตามสไลด์ p.11 โมเดลเรียนรู้กฎ 'ไม่ซื้อเกิน 45 วัน ทำนาย Inactive 68%' ในยุคที่ไม่มีการสมัครสมาชิก แต่หลังเปิดบริการ Subscription ที่ส่งสินค้าอัตโนมัติ กฎเดิมให้ Inactive เพียง 31% ทั้งที่โมเดลและ Code ไม่ได้เปลี่ยน ผลคือกฎเดิมผิดพลาดมากขึ้น",
    slideRef:
      "Lect 09 p11 (Concept Drift: ไม่ซื้อเกิน 45 วัน, Inactive 68% เปลี่ยนเป็น 31%)",
    verification: V,
  },
  {
    n: 6,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "แม้ผู้พัฒนาโมเดลจะลบคอลัมน์ข้อมูลอ่อนไหว เช่น เพศ หรือ เชื้อชาติ ออกจากชุดข้อมูลแล้ว แต่โมเดลก็ยังอาจเกิดอคติในการตัดสินใจได้ ปัญหานี้มักเกิดจากสาเหตุใด? (CLO3)",
    options: [
      {
        label: "a",
        text: "ตัวแบบเกิด Underfitting เนื่องจากจำนวนคอลัมน์ไม่เพียงพอ",
        correct: false,
      },
      {
        label: "b",
        text: "ข้อมูลผ่านการทำ Standardization มากเกินไป",
        correct: false,
      },
      {
        label: "c",
        text: "ตัวแปรอื่นที่เหลืออยู่ (เช่น รหัสไปรษณีย์) ทำหน้าที่เป็น Proxy Feature ที่สะท้อนข้อมูลอ่อนไหวหรือฐานะทางเศรษฐกิจโดยอ้อม",
        correct: true,
      },
      {
        label: "d",
        text: "เกิดปัญหา Class Imbalance ในตัวแปร Target ที่มาจากการเก็บข้อมูลไม่สมดุล",
        correct: false,
      },
    ],
    explanation:
      "แม้จะลบคอลัมน์ข้อมูลอ่อนไหวออก (Fairness through Unawareness) แต่โมเดลก็ยังเกิดอคติ (Bias) ได้เนื่องจากตัวแปรอื่นที่เหลืออยู่ทำหน้าที่เป็น 'Proxy Feature' (ตัวแปรตัวแทน) เช่น รหัสไปรษณีย์ (Postal Code / ZIP code), ย่านที่อยู่อาศัย หรือประวัติโรงเรียน ซึ่งตัวแปรเหล่านี้มีความสัมพันธ์ทางสถิติแนบแน่นกับเชื้อชาติหรือฐานะทางเศรษฐกิจ ทำให้โมเดลเรียนรู้ที่จะเลือกปฏิบัติทางอ้อม (Redlining) ได้อยู่ดี",
    slideRef:
      "Lect 09 p13 (Proxy Feature: รหัสไปรษณีย์ 10110 ได้ 42% แต่ 94100 ได้ 67%)",
    verification: V,
  },
  {
    n: 7,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "จากกรณีศึกษาการใช้อัลกอริทึมประเมินความเสี่ยงสุขภาพ (Health-risk Algorithm) ที่นำ \"ค่าใช้จ่ายด้านสุขภาพในอดีต\" มาเป็นตัวแทน (Proxy) ของ \"ความต้องการรักษาพยาบาลจริง\" ก่อให้เกิดผลกระทบเชิงจริยธรรมอย่างไร? (CLO3)",
    options: [
      {
        label: "a",
        text: "เกิดความลำเอียง ทำให้ผู้ป่วยผิวดำที่มีภาวะป่วยหนักเท่ากับผู้ป่วยผิวขาว ได้รับคะแนนความเสี่ยงต่ำกว่าความเป็นจริงเพราะเข้าถึงค่าใช้จ่ายในอดีตได้น้อยกว่า",
        correct: true,
      },
      {
        label: "b",
        text: "โมเดลทำงานได้รวดเร็วขึ้นเนื่องจากข้อมูลค่าใช้จ่ายด้านสุขภาพในอดีตเป็นตัวเลขต่อเนื่อง",
        correct: false,
      },
      {
        label: "c",
        text: "ทำให้ผู้ป่วยทุกกลุ่มได้รับสิทธิการรักษาเท่าเทียมกันมากขึ้น",
        correct: false,
      },
      {
        label: "d",
        text: "โรงพยาบาลสามารถลดงบประมาณการดูแลผู้ป่วยเรื้อรังได้ทั้งหมด",
        correct: false,
      },
    ],
    explanation:
      "จากกรณีศึกษาจริงในวารสาร Science (Obermeyer et al., 2019) ในสไลด์ Lect 09 หน้า 26: โรงพยาบาลใช้อัลกอริทึมจัดสรรคนไข้เข้าโครงการดูแลพิเศษ โดยใช้ 'ค่าใช้จ่ายสุขภาพในอดีต' เป็น Proxy วัด 'ความรุนแรงของโรค' แต่ในความเป็นจริง ผู้ป่วยผิวดำมีความเหลื่อมล้ำในการเข้าถึงประกันและระบบสาธารณสุข จึงมีค่าใช้จ่ายในอดีตต่ำกว่าผู้ป่วยผิวขาวทั้งที่ป่วยหนักเท่ากัน ส่งผลให้โมเดลประเมินความเสี่ยงของผู้ป่วยผิวดำต่ำกว่าความเป็นจริงและเสียสิทธิ์รับการรักษา",
    slideRef:
      "Lect 09 p26 (Health-risk Algorithm, Obermeyer et al. Science 2019, แก้ Proxy แล้ว 17.7% เป็น 46.5%)",
    verification: V,
  },
  {
    n: 8,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "ตามหลักการคุ้มครองข้อมูลส่วนบุคคล (Data Privacy) ข้อใดอธิบายหลักการ \"Purpose Limitation\" และ \"Data Minimization\" ได้อย่างถูกต้อง? (CLO1)",
    options: [
      {
        label: "a",
        text: "ใช้ความยินยอม (Consent) เป็นฐานทางกฎหมายเพียงฐานเดียวในการประมวลผลข้อมูลทุกประเภท",
        correct: false,
      },
      {
        label: "b",
        text: "หากได้ข้อมูลมาแล้วสามารถนำไปวิเคราะห์ในโครงการใดก็ได้ และควรเก็บข้อมูลให้มากที่สุดเท่าที่จะทำได้เพื่อรองรับโมเดลในอนาคต",
        correct: false,
      },
      {
        label: "c",
        text: "ต้องใช้ข้อมูลตามวัตถุประสงค์ที่แจ้งไว้แต่แรกเท่านั้น และจัดเก็บ/ใช้งานเฉพาะข้อมูลฟิลด์ที่จำเป็นต่อการวิเคราะห์จริง",
        correct: true,
      },
      {
        label: "d",
        text: "สามารถส่งข้อมูลไปยัง Generative AI ภายนอกได้ทันทีเพียงแค่ตัดชื่อ-นามสกุลออก",
        correct: false,
      },
    ],
    explanation:
      "หลักการคุ้มครองข้อมูลส่วนบุคคล (GDPR / PDPA) ตามสไลด์ Lect 09 หน้า 15-16:\n1. Purpose Limitation (การจำกัดวัตถุประสงค์): ข้อมูลที่เก็บรวบรวมจะต้องถูกนำไปใช้ตามวัตถุประสงค์ที่ได้แจ้งแก่เจ้าของข้อมูลไว้แต่แรกเท่านั้น ห้ามนำไปใช้วิเคราะห์ในโครงการอื่นที่ไม่เกี่ยวข้องโดยไม่ได้รับอนุญาต\n2. Data Minimization (การลดทอนข้อมูลส่วนบุคคล): ต้องจัดเก็บและประมวลผลข้อมูลเฉพาะฟิลด์ที่เพียงพอ เกี่ยวข้อง และจำเป็นอย่างแท้จริงต่อการวิเคราะห์ (Adequate, Relevant, and Limited to what is necessary)",
    slideRef: "Lect 09 p15 (Purpose Limitation) และ p16 (Data Minimization)",
    verification: V,
  },
  {
    n: 9,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "จากกรณีศึกษาของ Rite Aid ที่นำระบบจดจำใบหน้า (Facial Recognition) มาใช้ในร้านค้า ความเสียหายที่เกิดขึ้นต่อผู้บริโภคเกิดจากข้อบกพร่องในกระบวนการทำงานข้อใด? (CLO3)",
    options: [
      {
        label: "a",
        text: "ทางร้านไม่ได้ใช้ระบบการแบ่งกลุ่มแบบ K-Means",
        correct: false,
      },
      {
        label: "b",
        text: "โมเดลมีอัตรา False Negative สูงเกินไปทำให้สินค้าสูญหาย",
        correct: false,
      },
      {
        label: "c",
        text: "ระบบกล้องมีคุณภาพสูงเกินไปจนละเมิดความเป็นส่วนตัว",
        correct: false,
      },
      {
        label: "d",
        text: "เมื่อระบบแจ้งเตือนว่าพบคนน่าสงสัย (Alert) พนักงานดำเนินการจับกุม/ตรวจค้นทันที โดยไม่มี Human Checkpoint ในการตรวจสอบความถูกต้องซ้ำ",
        correct: true,
      },
    ],
    explanation:
      "จากคดี FTC vs. Rite Aid (2023-2024) ในสไลด์ Lect 09 หน้า 28: ความเสียหายร้ายแรงต่อผู้บริโภคเกิดจากข้อบกพร่องในการปฏิบัติงาน คือ เมื่อระบบส่งสัญญาณเตือน (Alert) พนักงานได้ดำเนินการจับกุม ตรวจค้น หรือสั่งให้ออกจากร้านทันที โดยไม่มี 'Human Checkpoint' (จุดตรวจสอบยืนยันโดยมนุษย์) เพื่อเช็กความถูกต้องซ้ำ ส่งผลให้ผู้บริโภคผู้บริสุทธิ์จำนวนมากถูกกล่าวหาผิดพลาด FTC จึงมีคำสั่งห้าม Rite Aid ใช้เทคโนโลยีจดจำใบหน้านาน 5 ปี",
    slideRef:
      "Lect 09 p28 (Rite Aid: False Positive จากกล้องคุณภาพต่ำ, ห้ามใช้ Facial Recognition 5 ปี)",
    verification: V,
  },
  {
    n: 10,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "ในการสื่อสารผลลัพธ์การวิเคราะห์ข้อมูลและเสนอทางเลือกแก่ผู้มีส่วนได้ส่วนเสีย (Stakeholders) แนวปฏิบัติข้อใดสะท้อนถึง \"Responsible Communication and Governance\" ได้ดีที่สุด? (CLO3)",
    options: [
      {
        label: "a",
        text: "ยืนยันว่าโมเดลจะมีความแม่นยำถาวรเพื่อสร้างความมั่นใจสูงสุดในการลงทุน",
        correct: false,
      },
      {
        label: "b",
        text: "มอบหมายให้ระบบ AI ทำการตัดสินใจอนุมัติมาตรการทางธุรกิจทั้งหมดโดยอัตโนมัติเพื่อลดอคติของมนุษย์",
        correct: false,
      },
      {
        label: "c",
        text: "ปรับเปลี่ยนข้อมูลตัวเลขทางสถิติให้เหมาะสมกับความต้องการของกลุ่มผู้ฟังแต่ละฝ่าย",
        correct: false,
      },
      {
        label: "d",
        text: "สื่อสารด้วยภาษาที่ผู้ฟังแต่ละกลุ่มเข้าใจได้ แต่รักษาข้อเท็จจริง ความไม่แน่นอน ข้อจำกัด และกำหนดเงื่อนไขการกำกับดูแลโดยมนุษย์ (Human Oversight) ไว้อย่างครบถ้วน",
        correct: true,
      },
    ],
    explanation:
      "แนวปฏิบัติที่ดีที่สุดของ Responsible Communication and Governance ตามสไลด์ Lect 09 หน้า 19 และ 21:\n- ต้องแปลผลลัพธ์และสื่อสารด้วยภาษาที่เหมาะสมกับบริบทของผู้มีส่วนได้ส่วนเสียแต่ละกลุ่ม เพื่อให้เกิดความเข้าใจร่วมกัน\n- ต้องรักษาความโปร่งใสและข้อเท็จจริงทางสถิติอย่างเคร่งครัด โดยเปิดเผยความไม่แน่นอน (Uncertainty), สมมติฐาน และข้อจำกัดของโมเดล (Limitations) อย่างตรงไปตรงมา\n- ต้องกำหนดกรอบการกำกับดูแลโดยมนุษย์ (Human Oversight / Human-in-the-loop) ในทุกจุดตัดสินใจสำคัญ ไม่ปล่อยให้ระบบอัตโนมัติทำงานโดยไร้การตรวจสอบ",
    slideRef:
      "Lect 09 p19 (แยกผลที่พบ ความหมาย ข้อจำกัด และเงื่อนไข) และ p21 (เปลี่ยนภาษาได้ ห้ามเปลี่ยนข้อเท็จจริง)",
    verification: V,
  },
  {
    n: 35,
    kind: "scenario",
    lectures: ["Lect 09"],
    prompt:
      "ทีมนำโมเดลทำนายลูกค้า Inactive ไปทดลองใช้ในวงจำกัด ระหว่างติดตามผลพบสัญญาณสองอย่างพร้อมกัน คือ Recall ของลูกค้ากลุ่มใหม่ต่ำกว่าเกณฑ์ที่ตั้งไว้ และข้อร้องเรียนเรื่องการติดต่อที่ไม่เหมาะสมเพิ่มขึ้น แม้ Accuracy รวมยังสูงอยู่ การตอบสนองข้อใดสอดคล้องกับสไลด์เรื่องระบบที่รับผิดชอบต้องหยุด ทบทวน และย้อนกลับได้มากที่สุด?",
    options: [
      { label: "a", text: "ทำต่อ เพราะ Accuracy รวมยังสูง และสัญญาณเตือนเป็นเพียงข้อยกเว้นของกลุ่มเล็ก", correct: false },
      {
        label: "b",
        text: "ทบทวนโมเดล ตรวจข้อมูลและประเมินใหม่ และหยุดส่งข้อความหรือข้อเสนอชั่วคราวจนกว่าจะหาสาเหตุและแก้ไขได้ แล้วย้อนกลับไปปรับปรุงตามวงจร CRISP-DS",
        correct: true,
      },
      { label: "c", text: "ยกเลิกการติดตามผล เพราะการทดลองใช้งานในวงจำกัดจบแล้ว", correct: false },
      { label: "d", text: "ลบคอลัมน์ข้อมูลกลุ่มลูกค้าออกจากข้อมูล แล้วเดินหน้าส่งข้อความอัตโนมัติต่อ", correct: false },
    ],
    explanation:
      "สไลด์ p.24 วางลำดับ CRISP-DS, Pilot, Monitor แล้วถามว่าผลเป็นอย่างไร มีสามทาง คือ ทำต่อเมื่อผลเป็นไปตามเป้าหมาย ทบทวนเมื่อต้องทบทวนโมเดล ข้อมูล หรือเงื่อนไข และหยุดชั่วคราวเมื่อพบปัญหาวิกฤต สัญญาณที่สไลด์ยกตัวอย่างตรงกับโจทย์ คือ Recall กลุ่มใหม่ต่ำกว่าเกณฑ์ และข้อร้องเรียนเพิ่ม การตอบสนองที่เหมาะสมคือทบทวนโมเดล หยุดการติดต่อจนกว่าจะหาสาเหตุ และกลับไป Data Understanding เมื่อบริบทหรือข้อกำหนดเปลี่ยน",
    distractor:
      "ตัวเลือก a ติดกับดักเดียวกับ Accuracy 84% ใน p.4 คือคะแนนรวมซ่อนกลุ่มที่ทำได้แย่ ตัวเลือก d สับสนกับ Proxy Feature ใน p.13 การลบคอลัมน์ไม่ได้แก้ปัญหาที่เกิดแล้ว และไม่ตอบสัญญาณจากการติดตามผล",
    slideRef: "Lect 09 p24 (Monitor: Recall กลุ่มใหม่ต่ำกว่าเกณฑ์, ข้อร้องเรียนเพิ่ม; ทำต่อ ทบทวน หยุด)",
    verification: V,
  },
];

export const questionsLect0507: Question[] = [
  {
    n: 11,
    kind: "interpretation",
    lectures: ["Lect 05"],
    prompt:
      "นักเรียนกำลังอธิบาย Boxplot ของชุดข้อมูลยอดใช้จ่ายต่อเดือน และสังเกตว่าปลายเส้น Whisker ไม่ไปถึงตำแหน่งของ Fence ข้อความใดอธิบายถูกต้องที่สุดตามหลักในสไลด์ 17",
    options: [
      {
        label: "a",
        text: "Whisker ต้องยาวไปถึง Fence เสมอ เพราะ Fence คือปลายสุดของการกระจายข้อมูล",
        correct: false,
      },
      {
        label: "b",
        text: "Fence เป็นเกณฑ์ที่คำนวณไว้ ส่วน Whisker สิ้นสุดที่ค่าจริงสุดท้ายซึ่งยังอยู่ภายใน Fence จึงอาจสั้นกว่าระยะถึง Fence",
        correct: true,
      },
      {
        label: "c",
        text: "ค่าใดก็ตามที่อยู่ระหว่างปลาย Whisker กับ Fence ต้องถูกจัดเป็น Outlier",
        correct: false,
      },
      {
        label: "d",
        text: "Fence คือค่าจริงที่พบในข้อมูล ส่วน Whisker คือค่าที่ได้จากการคำนวณ",
        correct: false,
      },
    ],
    explanation:
      "สไลด์ 17 เขียนไว้ตรง ๆ ว่า \"Fence เป็นเกณฑ์ ส่วน Whisker สิ้นสุดที่ค่าจริงสุดท้ายซึ่งยังอยู่ภายใน Fence\":\n1. Fence = เกณฑ์ทางสถิติที่คำนวณจากควอร์ไทล์และ IQR (เช่น Q3 + 1.5×IQR) เป็นเส้นสมมติ ไม่จำเป็นต้องมีค่าจริงใดตกอยู่บนเส้นนั้น\n2. Whisker = เส้นที่ลากไปสิ้นสุดที่ 'ค่าจริงสุดท้าย' ของข้อมูลซึ่งยังอยู่ภายใน Fence\n3. ค่าที่อยู่นอก Fence เท่านั้นจึงเป็น Outlier ส่วนค่าที่อยู่ระหว่าง Whisker กับ Fence ยังคงเป็นค่าปกติในเกณฑ์",
    distractor:
      "นักเรียนมักเข้าใจผิดว่าเส้น Whisker ต้องลากยาวไปชนเส้น Fence เสมอ ซึ่งเป็นการสลับระหว่าง 'เกณฑ์คำนวณ' กับ 'ค่าข้อมูลจริง'",
    slideRef:
      "Lect 05 p17 (Fence เป็นเกณฑ์ ส่วน Whisker สิ้นสุดที่ค่าจริงสุดท้ายซึ่งยังอยู่ภายใน Fence)",
    verification: V,
  },
  {
    n: 12,
    kind: "interpretation",
    lectures: ["Lect 05"],
    prompt:
      "ทีมต้องเลือกสถิติระดับตำแหน่ง 3 ตัวสำหรับรายงาน EDA ข้อใดจับคู่ 'ประเด็นที่จะรายงาน' กับ 'สถิติที่สไลด์ 6 ระบุว่าเหมาะกับชนิดข้อมูลนั้น' ได้ถูกต้องทั้งหมด",
    options: [
      {
        label: "a",
        text: "รายได้เฉลี่ยต่อเดือน (ข้อมูลเชิงปริมาณ) → mean; ขนาดรองเท้าที่ขายได้มากที่สุด (เชิงหมวดหมู่) → mode; ระดับความพึงพอใจที่เรียงจากแย่ไปดี (ข้อมูลเรียงลำดับ) → median",
        correct: true,
      },
      {
        label: "b",
        text: "รายได้เฉลี่ยต่อเดือน → median; ขนาดรองเท้าที่ขายได้มากที่สุด → mean; ระดับความพึงพอใจ → mean",
        correct: false,
      },
      {
        label: "c",
        text: "รายได้เฉลี่ยต่อเดือน → mean; ขนาดรองเท้าที่ขายได้มากที่สุด → median; ระดับความพึงพอใจ → mode",
        correct: false,
      },
      {
        label: "d",
        text: "รายได้เฉลี่ยต่อเดือน → mode; ขนาดรองเท้าที่ขายได้มากที่สุด → mean; ระดับความพึงพอใจ → median",
        correct: false,
      },
    ],
    explanation:
      "สไลด์ 6 ระบุเกณฑ์การเลือกสถิติไว้อย่างชัดเจน:\n1. Mean ใช้กับ Quantitative Data (ข้อมูลเชิงปริมาณที่บวกรวมได้จริง เช่น รายได้)\n2. Median ใช้กับ ข้อมูลเรียงลำดับ (Ordinal Data เช่น ระดับความพึงพอใจ) หรือข้อมูลตัวเลขที่มีความเบ้/มี Outlier\n3. Mode ใช้กับ Categorical Data (ข้อมูลเชิงหมวดหมู่ เช่น ขนาดรองเท้า เพศ)",
    distractor:
      "นักเรียนจำเพียงว่า 'ตัวเลขใช้ mean / หมวดหมู่ใช้ mode' จึงนำ mode ไปจับกับระดับความพึงพอใจซึ่งเป็นข้อมูลเรียงลำดับ",
    slideRef:
      "Lect 05 p6 (Mean ใช้กับ Quantitative Data, Median ใช้กับข้อมูลเรียงลำดับหรือตัวเลข, Mode ใช้กับ Categorical)",
    verification: V,
  },
  {
    n: 13,
    kind: "interpretation",
    lectures: ["Lect 05"],
    prompt:
      "ทีมต้องรายงาน 'การกระจาย' ของยอดใช้จ่ายต่อเดือนของลูกค้า โจทย์กำหนดว่ารายงานต้องเขียนค่าการกระจายในหน่วยเดียวกับข้อมูล คือ 'บาท' เพื่อให้ผู้อ่านตีความได้ เมทริกทั้งสองมีหน่วยอย่างไรตามสไลด์ 7",
    options: [
      {
        label: "a",
        text: "Variance มีหน่วย 'บาท' และ SD มีหน่วย 'บาท' เหมือนกัน",
        correct: false,
      },
      {
        label: "b",
        text: "Variance มีหน่วย 'บาทยกกำลังสอง' ส่วน SD มีหน่วย 'บาท' เหมือนกับข้อมูล",
        correct: true,
      },
      {
        label: "c",
        text: "ทั้ง Variance และ SD มีหน่วย 'บาทยกกำลังสอง'",
        correct: false,
      },
      {
        label: "d",
        text: "Variance มีหน่วยเปอร์เซ็นต์ ส่วน SD ไม่มีหน่วย",
        correct: false,
      },
    ],
    explanation:
      "สไลด์ 7 ระบุหน่วยของสถิติวัดการกระจายไว้ดังนี้:\n- 'Variance มีหน่วยยกกำลังสอง' เพราะเกิดจากการยกกำลังสองผลต่าง (x - μ)² หน่วยจึงกลายเป็น บาท²\n- 'SD มีหน่วยเดียวกับข้อมูล' เพราะ SD คือรากที่สองของ Variance จึงถอดหน่วยกลับมาเป็น บาท\nดังนั้นเมทริกที่รายงานในหน่วยเดียวกับข้อมูลได้ตรงคือ SD",
    distractor:
      "นักเรียนมักเชื่อว่าตัววัดการกระจายทั้งสองตัวต้องมีหน่วยเหมือนกัน จึงตอบว่า 'บาท' ทั้งคู่ โดยลืมการยกกำลังสองใน Variance",
    slideRef:
      "Lect 05 p7 (Variance มีหน่วยยกกำลังสอง / SD มีหน่วยเดียวกับข้อมูล)",
    verification: V,
  },
  {
    n: 14,
    kind: "scenario",
    lectures: ["Lect 05"],
    prompt:
      "ทีมทำ EDA ในขั้นตอน Data Understanding แล้วพบค่าหายผิดปกติกับช่องว่างในข้อมูล จึงจัดทำขั้นตอน Data Preparation เพื่อแก้ไข เมื่อแก้ไขเสร็จ และเมื่อจะเลือกอัลกอริทึม ข้อใดอธิบายได้ถูกต้องตามสไลด์",
    options: [
      {
        label: "a",
        text: "ต้องทำ EDA ซ้ำหลัง Data Preparation เพราะข้อมูลเปลี่ยนไป และ EDA จะเลือกอัลกอริทึมที่เหมาะที่สุดให้อัตโนมัติ",
        correct: false,
      },
      {
        label: "b",
        text: "ต้องทำ EDA ซ้ำหลัง Data Preparation เพื่อดูว่าการแก้ไขส่งผลอย่างไร แต่ EDA เป็นเพียงการ 'informs modeling decisions' ไม่ใช่การ 'automatically selects an algorithm'",
        correct: true,
      },
      {
        label: "c",
        text: "ทำ EDA ครั้งเดียวที่ขั้นตอน Data Understanding เท่านั้น เข้าสู่ Modeling ทันทีโดยไม่ต้องตรวจซ้ำ",
        correct: false,
      },
      {
        label: "d",
        text: "EDA เป็นขั้นตอนที่ทำหลัง Modeling เสร็จแล้ว เพื่อใช้ตรวจคุณภาพโมเดล",
        correct: false,
      },
    ],
    explanation:
      "ตามระเบียบวิธีในสไลด์:\n1. สไลด์ 2: 'Initial EDA เริ่มได้ใน Data Understanding และทำซ้ำหลัง Data Preparation ได้' เพื่อตรวจสอบการเปลี่ยนแปลงหลังจัดการข้อมูล\n2. สไลด์ 28: EDA มีหน้าที่ 'informs modeling decisions' คือให้ข้อมูลเชิงลึกแก่นักวิทยาการข้อมูล ไม่ใช่ 'automatically selects an algorithm' การเลือกอัลกอริทึมยังต้องอาศัยการตัดสินใจของมนุษย์",
    distractor:
      "นักเรียนมักคิดว่า EDA ฉลาดพอที่จะเลือกอัลกอริทึมให้เองโดยอัตโนมัติ",
    slideRef:
      "Lect 05 p2 (EDA เริ่มใน Data Understanding และทำซ้ำหลัง Data Prep) และ p28 (EDA informs modeling decisions ไม่ใช่ automatically selects an algorithm)",
    verification: V,
  },
  {
    n: 15,
    kind: "scenario",
    lectures: ["Lect 06"],
    prompt:
      "บริษัทมี 2 งาน: (1) จัดลูกค้าเป็นกลุ่มตามพฤติกรรมการซื้อ เพื่อส่งแคมเปญแยกตามกลุ่ม (2) ทำนายว่าลูกค้ารายใดจะยกเลิกบริการภายใน 30 วัน ข้อใดจัดงานทั้งสองเข้ากลุ่มเทคนิคได้ถูกต้อง พร้อมระบุข้อสรุปที่สไลด์ 9 กล่าวไว้",
    options: [
      {
        label: "a",
        text: "งานที่ 1 คือ Classification (Predictive) ส่วนงานที่ 2 คือ Clustering (Descriptive)",
        correct: false,
      },
      {
        label: "b",
        text: "งานที่ 1 คือ Clustering อยู่ในกลุ่ม Descriptive/Unsupervised ซึ่งไม่มีจุดมุ่งหมายเพื่อการทำนาย ส่วนงานที่ 2 คือ Prediction ในกลุ่ม Predictive/Supervised และสไลด์ระบุว่าไม่มีเทคนิคเดียวที่เหมาะกับงานทุกชนิด",
        correct: true,
      },
      {
        label: "c",
        text: "ทั้งสองงานคือ Estimation ในกลุ่ม Predictive/Supervised เพราะต้องใช้ข้อมูลที่มีคำตอบกำกับ",
        correct: false,
      },
      {
        label: "d",
        text: "ทั้งสองงานคือ Association ในกลุ่ม Descriptive/Unsupervised เพราะเป็นการหาความสัมพันธ์ระหว่างตัวแปร",
        correct: false,
      },
    ],
    explanation:
      "สไลด์ 9 จำแนกเทคนิคการสร้างตัวแบบออกเป็น 2 กลุ่มหลัก:\n- Descriptive / Unsupervised (ไม่ได้มีจุดมุ่งหมายเพื่อการทำนาย): Description, Association, Clustering → งานที่ 1 จัดกลุ่มลูกค้าโดยไม่มีเป้าหมายล่วงหน้าคือ Clustering\n- Predictive / Supervised: Classification, Estimation, Prediction → งานที่ 2 ทำนายผลลัพธ์ล่วงหน้าในอนาคตคือ Prediction\nและสไลด์สรุปชัดเจนว่า: 'ไม่มีเทคนิคหรือเครื่องมือเพียงชนิดเดียวของกระบวนการวิทยาการข้อมูลที่เหมาะสมกับงานทุกชนิด'",
    distractor:
      "สลับ Classification กับ Clustering เนื่องจากในภาษาไทยทั้งสองคำมีความหมายเกี่ยวกับการแบ่งกลุ่ม แต่ Clustering ไม่มี Target Label ส่วน Classification มี Target Label ชัดเจน",
    slideRef:
      "Lect 06 p9 (Descriptive vs Predictive Modeling + ไม่มีเทคนิคเดียวที่เหมาะกับงานทุกชนิด)",
    verification: V,
  },
  {
    n: 16,
    kind: "scenario",
    lectures: ["Lect 06"],
    prompt:
      "ทีมสร้าง Decision Tree จากข้อมูลลูกค้า แล้วได้ Training fit สมบูรณ์จนดูสมบูรณ์แบบ แต่เมื่อนำไปใช้กับข้อมูลลูกค้าชุดใหม่ ผลลัพธ์แย่มาก ข้อความใดในสไลด์ 34 อธิบายสาเหตุที่สอดคล้องที่สุด",
    options: [
      {
        label: "a",
        text: "Logic ของ ML มาจาก Programmer ดังนั้นต้องเขียนกฎเงื่อนไขเพิ่มเติมให้ครบถ้วนก่อนใช้งาน",
        correct: false,
      },
      {
        label: "b",
        text: "Logic ของ ML มาจากข้อมูล ไม่ใช่จาก Programmer และถ้าข้อมูลมีปัญหา เกิด Data Leakage หรือคัดเลือก Features มาไม่ดี โมเดลที่ได้จะพังทันที",
        correct: true,
      },
      {
        label: "c",
        text: "Logic ของ ML มาจากข้อมูล แต่ปัญหาอยู่ที่ความลึกของต้นไม้เพียงอย่างเดียว ปรับความลึกแล้วทุกอย่างจะดีขึ้นเอง",
        correct: false,
      },
      {
        label: "d",
        text: "Logic ของ ML มาจากข้อมูล ดังนั้นวิธีแก้คือเพิ่ม Features เข้าไปให้มากที่สุดเท่าที่จะเป็นไปได้",
        correct: false,
      },
    ],
    explanation:
      "สไลด์ 34 ระบุหลักการสำคัญ:\n'Logic ของ ML มาจากข้อมูล ไม่ใช่จาก Programmer'\n'เพราะ Logic ทั้งหมดมาจากข้อมูล ดังนั้น ถ้าข้อมูลมีปัญหา มี Data Leakage หรือคัดเลือก Features มาไม่ดี Model ที่ได้ก็จะพังทันที'\nอาการ Overfitting ที่โมเดลแม่นใน Train แต่พังใน Test มักเกิดจากการป้อนข้อมูลที่มีการรั่วไหลหรือ Feature ที่จำแนกสัญญาณจริงไม่ได้",
    distractor:
      "ความเคยชินจากการเขียนโปรแกรมทำให้คิดว่า Logic มาจาก Programmer หรือคิดว่าความลึกของต้นไม้เป็นปัจจัยเดียว",
    slideRef:
      "Lect 06 p34 (Logic ของ ML มาจากข้อมูล ไม่ใช่จาก Programmer / Data Leakage, คัดเลือก Features ไม่ดี)",
    verification: V,
  },
  {
    n: 17,
    kind: "numeric",
    lectures: ["Lect 07"],
    prompt:
      "ตามสูตร Gini(t) = 1 - Σ p_k² ในสไลด์ 11 จงคำนวณค่า Gini ของ (1) Parent Node ที่มี 6 Active และ 6 Inactive และ (2) Node หนึ่งที่มี 5 Active และ 1 Inactive แล้วเลือกคู่ค่าที่ถูกต้อง",
    options: [
      {
        label: "a",
        text: "Parent Node = 0.500 และ Node 5/1 = 0.278",
        correct: true,
      },
      {
        label: "b",
        text: "Parent Node = 0.750 และ Node 5/1 = 0.278",
        correct: false,
      },
      {
        label: "c",
        text: "Parent Node = 0.500 และ Node 5/1 = 0.556",
        correct: false,
      },
      {
        label: "d",
        text: "Parent Node = 0.500 และ Node 5/1 = 0.722",
        correct: false,
      },
    ],
    explanation:
      "การคำนวณตามสูตรสไลด์ 11:\n1. Parent Node (6 Active, 6 Inactive จากทั้งหมด 12): p1 = 6/12 = 0.5, p2 = 6/12 = 0.5 → Gini = 1 - (0.5)² - (0.5)² = 1 - 0.25 - 0.25 = 0.500 (ตรงกับสไลด์ 12)\n2. Node (5 Active, 1 Inactive จากทั้งหมด 6): p1 = 5/6, p2 = 1/6 → Gini = 1 - (5/6)² - (1/6)² = 1 - 25/36 - 1/36 = 10/36 = 0.2778... ปัดทศนิยม 3 ตำแหน่งได้ 0.278 (ตรงกับสไลด์ 11 ในกล่องเหลือง)",
    distractor:
      "0.722 เกิดจากลืม '1 -' นำหน้า โดยนำ (5/6)² + (1/6)² = 26/36 = 0.722 มาตอบทันที; ส่วน 0.750 เกิดจากคิด Parent เพียงคลาสเดียว 1 - (0.5)² = 0.75",
    slideRef:
      "Lect 07 p11 (Gini(t) = 1 - Σ p_k², Node 5/1 = 0.278) และ p12 (Parent Gini = 0.500)",
    verification: V,
  },
  {
    n: 18,
    kind: "numeric",
    lectures: ["Lect 07"],
    prompt:
      "ที่ Parent Node มี 6 Active และ 6 Inactive (Gini=0.500) และมี Candidate Split 2 ตัว:\n- Candidate A: days_since_last_purchase <= 45 ได้ Child เป็น 5/1 และ 1/5 → Weighted Gini = 0.278, Gini Gain = 0.222\n- Candidate B: purchases_last_90_days <= 2 ได้ Child เป็น 2/4 และ 4/2 → Weighted Gini = 0.444, Gini Gain = 0.056\nตามหลักการของ Decision Tree ในสไลด์ 12 ควรเลือก Candidate ใด และเพราะเหตุใด",
    options: [
      {
        label: "a",
        text: "B เพราะ Gini Gain ของ B คือ 0.056 ซึ่งใกล้ศูนย์ จึงเป็นการแยกที่กระทบข้อมูลน้อยที่สุด",
        correct: false,
      },
      {
        label: "b",
        text: "A เพราะ Weighted Gini ต่ำที่สุด (0.278) และ Gini Gain สูงสุด (0.222) เมื่อเทียบกับ Parent ที่ 0.500",
        correct: true,
      },
      {
        label: "c",
        text: "A เพราะชื่อ Feature เกี่ยวกับวันยาวกว่าและเก็บข้อมูลได้ละเอียดกว่า",
        correct: false,
      },
      {
        label: "d",
        text: "B เพราะ Child Nodes ของ B มีสัดส่วนสมมาตรกันมากกว่า (2/4 และ 4/2)",
        correct: false,
      },
    ],
    explanation:
      "ตามสไลด์ 12 สรุป Preferred Candidate: A ด้วยเหตุผล:\n1. Weighted child impurity ต่ำกว่า (0.278 < 0.444)\n2. Impurity reduction (Gini Gain) มากกว่า (0.222 > 0.056) กล่าวคือ ลดความไม่บริสุทธิ์จาก Parent (0.500) ได้มากกว่า\nSplit ที่ดีต้องทำให้ Child Nodes บริสุทธิ์มากที่สุด (Impurity ต่ำสุด, Gain สูงสุด)",
    distractor:
      "สับสนว่า Gain ยิ่งน้อยยิ่งดีเหมือน Impurity หรือเลือก B เพราะชอบตัวเลขที่ดูสมมาตร (2/4 กับ 4/2)",
    slideRef:
      "Lect 07 p12 (Weighted Gini A=0.278, Gain A=0.222 vs B=0.444, Gain B=0.056 -> Preferred Candidate A)",
    verification: V,
  },
  {
    n: 19,
    kind: "numeric",
    lectures: ["Lect 07"],
    prompt:
      "จากข้อมูลฟุตบอลโลก 2026 ในสไลด์ 23 ซึ่งมีผลการจำแนกตัวอย่าง 10 คน กำหนดคลาสบวกคือ play ได้ TP = 4, TN = 3, FP = 1, FN = 2 จงคำนวณด้วยสูตรที่สไลด์ 30 เขียนไว้ แล้วเลือกชุดค่าที่ถูกต้อง",
    options: [
      {
        label: "a",
        text: "Recall = 0.67, Precision = 0.80, Accuracy = 0.70, F1 = 0.73",
        correct: true,
      },
      {
        label: "b",
        text: "Recall = 0.80, Precision = 0.67, Accuracy = 0.70, F1 = 0.73",
        correct: false,
      },
      {
        label: "c",
        text: "Recall = 0.67, Precision = 0.80, Accuracy = 0.70, F1 = 0.74",
        correct: false,
      },
      {
        label: "d",
        text: "Recall = 0.67, Precision = 0.80, Accuracy = 0.70, F1 = 0.89",
        correct: false,
      },
    ],
    explanation:
      "สไลด์ 30 กำหนดวิธีคำนวณและปัดเศษทศนิยม 2 ตำแหน่งไว้ดังนี้:\n- Recall = TP/(TP+FN) = 4/(4+2) = 4/6 ≈ 0.67 (66.67%)\n- Precision = TP/(TP+FP) = 4/(4+1) = 4/5 = 0.80 (80.00%)\n- Accuracy = (TP+TN)/(TP+TN+FP+FN) = (4+3)/10 = 7/10 = 0.70 (70.00%)\n- F1 = 2TP/(2TP+FP+FN) = 2(4)/(2(4)+1+2) = 8/11 ≈ 0.73 (72.73%)\nตรงกับตัวเลขที่พิมพ์ไว้ในสไลด์ 23 และ 30 ทุกตัว",
    distractor:
      "สลับ Recall กับ Precision (ข้อ b) หรือหาค่าเฉลี่ยเลขคณิตธรรมดา (0.80+0.67)/2 = 0.74 (ข้อ c) หรือลืมบวก FN ในตัวส่วนของ F1 (ข้อ d)",
    slideRef:
      "Lect 07 p23 (ตาราง 10 แถว TP=4 TN=3 FP=1 FN=2) และ p30 (สูตร Recall=4/6=0.67, Precision=4/5=0.80, Accuracy=7/10=0.70, F1=8/11=0.73)",
    verification: V,
  },
  {
    n: 20,
    kind: "numeric",
    lectures: ["Lect 07"],
    prompt:
      "จากแบบฝึกหัด Customer Churn / Inactivity ในสไลด์ 26 มีตารางลูกค้า 10 ราย กำหนดคลาสบวกคือ Inactive = Yes เมื่อนับค่าแล้วได้ TP = 3, TN = 3, FP = 2, FN = 2 จงคำนวณ Accuracy, Precision, Recall และ F1",
    options: [
      {
        label: "a",
        text: "Accuracy 60.00%, Precision 60.00%, Recall 60.00%, F1 60.00%",
        correct: true,
      },
      {
        label: "b",
        text: "Accuracy 60.00%, Precision 75.00%, Recall 50.00%, F1 60.00%",
        correct: false,
      },
      {
        label: "c",
        text: "Accuracy 50.00%, Precision 60.00%, Recall 60.00%, F1 60.00%",
        correct: false,
      },
      {
        label: "d",
        text: "Accuracy 60.00%, Precision 60.00%, Recall 60.00%, F1 50.00%",
        correct: false,
      },
    ],
    explanation:
      "แทนค่าจาก TP=3, TN=3, FP=2, FN=2 (รวม 10):\n- Accuracy = (3+3)/10 = 6/10 = 60.00%\n- Precision = 3/(3+2) = 3/5 = 60.00%\n- Recall = 3/(3+2) = 3/5 = 60.00%\n- F1 = 2(3)/(2(3)+2+2) = 6/10 = 60.00%\nมาตรวัดทั้งสี่มีค่า 60.00% เท่ากันพอดีเนื่องจาก FP = FN = 2 และ TP = TN = 3 ซึ่งเป็นประเด็นสำคัญของการบ้านข้อนี้ ที่แสดงว่าตัวชี้วัดไม่จำเป็นต้องต่างกันเสมอไป",
    distractor:
      "นักเรียนมักคิดว่าตัวชี้วัดต้องไม่เท่ากัน จึงพยายามนับใหม่หรือเลือกข้อที่มีค่ากระจายต่างกัน (เช่น ข้อ b ที่นับผิดได้ Precision 75% Recall 50%)",
    slideRef:
      "Lect 07 p26 (ตารางลูกค้า 10 แถว Inactive=Yes), p30 (สูตร) และ p34 (Homework#1)",
    verification: V,
  },
  {
    n: 31,
    kind: "scenario",
    lectures: ["Lect 07"],
    prompt:
      "Homework #2: ประเมิน 3 โมเดลบน Evaluation Set ลูกค้า 100 ราย Positive = Inactive (ลูกค้าจริงที่ Inactive มี 40 ราย)\n- Model A: TP=24, FN=16, FP=3, TN=57\n- Model B: TP=36, FN=4, FP=18, TN=42\n- Model C: TP=32, FN=8, FP=7, TN=53\nทีมรักษาลูกค้าระบุว่า การพลาดลูกค้าที่กำลังจะ Inactive แพงกว่าการติดต่อลูกค้าที่ไม่ได้จะ Inactive เกินมา ควรเลือก Metric หลักและโมเดลใด?",
    options: [
      { label: "a", text: "Precision เพราะ Model A สูงสุด (0.89) จึงเลือก Model A", correct: false },
      { label: "b", text: "Recall เพราะ Model B สูงสุด (0.90) จึงเลือก Model B", correct: true },
      { label: "c", text: "Accuracy เพราะ Model C สูงสุด (0.85) จึงเลือก Model C", correct: false },
      { label: "d", text: "F1 เพราะ Model C สูงสุด (0.81) จึงเลือก Model C ทั้งที่ต้นทุน FN สูงกว่า", correct: false },
    ],
    explanation:
      "ขั้นแรกเลือก Metric ตามต้นทุนของความผิดพลาด แล้วจึงเลือกโมเดลด้วย Metric นั้น (สไลด์ p.35)\n- Model A: Acc 81/100 = 0.81, Precision 24/27 = 0.89, Recall 24/40 = 0.60, F1 = 48/67 = 0.72\n- Model B: Acc 78/100 = 0.78, Precision 36/54 = 0.67, Recall 36/40 = 0.90, F1 = 72/94 = 0.77\n- Model C: Acc 85/100 = 0.85, Precision 32/39 = 0.82, Recall 32/40 = 0.80, F1 = 64/79 = 0.81\nFN แพงกว่า FP จึงใช้ Recall Model B พลาดลูกค้าที่จะ Inactive เพียง 4 ราย (A พลาด 16, C พลาด 8) แลกกับ FP 18 ราย สไลด์ระบุว่าคำตอบอาจต่างกันได้ แต่ Metric ที่เลือกต้องอธิบายโมเดลที่เลือกได้ ถ้าต้นทุน FP กับ FN ใกล้เคียงกัน F1 จะชี้ไปที่ Model C",
    distractor:
      "Model C ดูดีที่สุดในภาพรวม (Accuracy 0.85 และ F1 0.81 สูงสุด) จึงเป็นตัวเลือกที่หลอกง่าย แต่โจทย์กำหนดต้นทุน FN ไว้แล้ว Metric หลักจึงต้องเป็น Recall ส่วน Model A มี Precision สูงสุดเพราะระมัดระวัง FP แต่ปล่อยลูกค้า Inactive หลุดไป 16 จาก 40 ราย",
    slideRef: "Lect 07 p35 (Homework #2: Model A, B, C บน Evaluation Set 100 ราย, Positive = Inactive)",
    verification: V,
  },
  {
    n: 32,
    kind: "scenario",
    lectures: ["Lect 07"],
    prompt:
      "ทีมฝึก Decision Tree หลายความลึกบน Training Data แล้วเทียบบน Validation Data ได้ผลดังนี้: max_depth = 1 ผล low, max_depth = 3 ผล high, max_depth = 6 ผล lower, ไม่จำกัดความลึกผล materially lower (Training Accuracy ของต้นไม้ที่ไม่จำกัดความลึกเข้าใกล้ 1.00) ควรเลือกอย่างไร?",
    options: [
      { label: "a", text: "ไม่จำกัดความลึก เพราะ Training Accuracy สูงสุดที่ 1.00", correct: false },
      { label: "b", text: "max_depth = 1 เพราะเรียบง่ายที่สุดและอธิบายง่ายที่สุด", correct: false },
      { label: "c", text: "max_depth = 3 เพราะ Validation ดีที่สุด และเก็บ Test Set ไว้ใช้หลังตัดสินใจเรื่องโมเดลครบแล้วเท่านั้น", correct: true },
      { label: "d", text: "ตัดสินระหว่าง max_depth = 3 กับ 6 ด้วยการลองบน Test Set", correct: false },
    ],
    explanation:
      "สไลด์ p.19: Training Data ใช้เรียน Candidate Tree ที่ความลึกต่างกัน Validation Data ใช้เทียบค่า max_depth และ max_depth = 3 ได้ Validation สูงสุดจึงถูกเลือกไปพัฒนาต่อ ส่วน Final Test Set ต้องล็อกไว้ไม่ให้ใช้ระหว่างเลือก ตามสไลด์ p.31 ต้นไม้ตื้นมี Bias สูงกว่าและ Variance ต่ำกว่า เสี่ยง Underfitting ต้นไม้ลึกมาก Training Bias ลดลงแต่ Variance สูงขึ้น เสี่ยง Overfitting ความซับซ้อนจึงต้องเลือกด้วย Validation Evidence",
    distractor:
      "Training Accuracy 1.00 บอกแค่ว่าจำข้อมูลที่เห็นได้หมด ไม่ได้บอกว่าใช้ได้กับลูกค้าที่ไม่เคยเห็น ตัวเลือก d ทำลายความเป็นกลางของ Test Set",
    slideRef: "Lect 07 p19 (Validation Evidence Selects Tree Complexity), p18 และ p31 (Bias-Variance)",
    verification: V,
  },
  {
    n: 33,
    kind: "scenario",
    lectures: ["Lect 07"],
    prompt:
      "หลังประเมินโมเดลครบ ทีมพบว่าหลักฐานยังไม่เพียงพอสำหรับการใช้งาน แต่ปัญหาแก้ไขได้ เช่น ต้องปรับการเตรียมข้อมูลและประเมินซ้ำ ตามกรอบ Decision Gates ของสไลด์ ควรเลือกการกระทำใด?",
    options: [
      { label: "a", text: "Accept คือใช้งานตามที่ตั้งใจแล้วติดตามผลต่อไป", correct: false },
      { label: "b", text: "Revise คือกลับไปยังขั้นก่อนหน้าของ CRISP-DS เช่น Data Preparation เพื่อปรับปรุง", correct: true },
      { label: "c", text: "Reject คือหยุดใช้โมเดลนี้ทั้งหมดเพราะขาดหลักฐานสนับสนุน", correct: false },
      { label: "d", text: "Accept เพราะ Convergence หรือ Validation ผ่านแล้วถือว่าพร้อมใช้งาน", correct: false },
    ],
    explanation:
      "สไลด์ p.36 แบ่งเป็นสามทาง Accept เมื่อมีหลักฐานเพียงพอและไม่มีข้อจำกัดสำคัญ ให้ใช้งานแล้วติดตามผล Revise เมื่อหลักฐานไม่พอแต่ปรับได้ ให้กลับไปขั้นก่อนหน้า เช่น Data Preparation Reject เมื่อไม่มีหลักฐานรองรับ ให้หยุดใช้โมเดลนั้น โจทย์ระบุว่าไม่เพียงพอแต่ปรับได้ จึงเป็น Revise ใน Lect 09 p.22 ชื่อเดียวกันคือ ใช้ ปรับ ยังไม่ใช่ ซึ่งต้องมีหลักฐาน ความเสี่ยง และแผนลดความเสี่ยงรองรับทุกทางเลือก",
    distractor:
      "Reject กับ Revise ต่างกันที่ว่าหลักฐานแก้ได้หรือไม่ ส่วน Lect 08 p.43 เตือนว่า Convergence ไม่เท่ากับความพร้อมใช้งาน",
    slideRef: "Lect 07 p36 (Accept / Revise / Reject), Lect 09 p22 (ใช้ ปรับ ยังไม่ใช่), Lect 08 p43",
    verification: V,
  },
];

export const questionsLect08: Question[] = [
  {
    n: 21,
    kind: "interpretation",
    lectures: ["Lect 08"],
    prompt:
      "ขณะทำ K-Means ด้วยมือในข้อสอบ อาจารย์ให้คำนวณระยะทางด้วยสูตรใด และเพราะอะไร",
    options: [
      {
        label: "a",
        text: "ใช้ระยะทางแบบ Euclidean d(A,Y) = √(Σ(x_i - y_i)²) เพราะเป็นระยะทางที่สั้นที่สุดระหว่างสองจุด",
        correct: false,
      },
      {
        label: "b",
        text: "ใช้ระยะทางแบบ Manhattan Distance(A,Y) = |x1-y1| + |x2-y2| + ... + |xn-yn| เพราะเป็นการบวกล้วน ไม่มีรากที่สอง ตรวจสอบด้วยมือได้ง่ายและได้จำนวนเต็ม",
        correct: true,
      },
      {
        label: "c",
        text: "ใช้ระยะทางแบบ Chebyshev เพราะคำนวณเร็วที่สุดเมื่อมีมิติข้อมูลมาก",
        correct: false,
      },
      {
        label: "d",
        text: "ใช้ระยะทางแบบ Cosine เพราะวัดความคล้ายของทิศทางได้ดีกว่า",
        correct: false,
      },
    ],
    explanation:
      "ในตัวอย่างการทำ K-Means ด้วยมือในสไลด์ Lect 08 หน้า 25-29 อาจารย์กำหนดสูตร Manhattan Distance (City-block distance, Minkowski p=1) เพื่อให้การคำนวณบนกระดาษเป็นจำนวนเต็ม บวกกันได้โดยตรง ไม่ต้องถอดรากที่สองซึ่งทำให้คิดเลขยากและติดทศนิยม",
    distractor:
      "นักเรียนมักตอบ Euclidean เพราะเป็นระยะทางเรขาคณิตที่คุ้นเคยที่สุด แต่ในการทำด้วยมือสไลด์ระบุชัดเจนว่าใช้ Manhattan",
    slideRef:
      "Lect 08 สไลด์สูตร Manhattan / Minkowski และตารางคำนวณรอบที่ 1",
    verification: V,
  },
  {
    n: 22,
    kind: "numeric",
    lectures: ["Lect 08"],
    prompt:
      "จุดข้อมูล A1 มีพิกัด (2, 10) และจุดศูนย์กลาง C2 มีพิกัด (5, 8) จงคำนวณระยะทางแบบ Manhattan ระหว่าง A1 กับ C2",
    options: [
      { label: "a", text: "5", correct: true },
      { label: "b", text: "3", correct: false },
      { label: "c", text: "2", correct: false },
      { label: "d", text: "13", correct: false },
    ],
    explanation:
      "สูตร Manhattan Distance:\nd(A1, C2) = |x_A1 - x_C2| + |y_A1 - y_C2| = |2 - 5| + |10 - 8| = 3 + 2 = 5\nตรงกับค่า 5 ในตารางรอบที่ 1 แถว A1 คอลัมน์ C2 ในสไลด์",
    distractor:
      "13 มาจาก Squared Euclidean: 3² + 2² = 9 + 4 = 13 ซึ่งลืมว่าโจทย์สั่งให้ใช้ Manhattan",
    slideRef: "Lect 08 ตารางรอบที่ 1 (แถว A1 คอลัมน์ C2)",
    verification: V,
  },
  {
    n: 23,
    kind: "numeric",
    lectures: ["Lect 08"],
    prompt:
      "ในตารางรอบที่ 1 จุด A2 พิกัด (2, 5) คำนวณระยะทาง Manhattan ได้ดังนี้: ถึง C1 = 5, ถึง C2 = 6, ถึง C3 = 4 จงระบุว่าจุด A2 ต้องถูกจัดเข้ากลุ่มใด และเพราะอะไร",
    options: [
      {
        label: "a",
        text: "ไปกลุ่ม C1 เพราะ C1 คือจุดศูนย์กลางกลุ่มแรกและมีค่าน้ำหนักพิเศษ",
        correct: false,
      },
      {
        label: "b",
        text: "ไปกลุ่ม C3 เพราะ 4 เป็นระยะทางที่น้อยที่สุดเทียบกับ C1 (5) และ C2 (6)",
        correct: true,
      },
      {
        label: "c",
        text: "ไปกลุ่ม C2 เพราะ C2 อยู่ตรงกลางของพื้นที่ข้อมูลมากที่สุด",
        correct: false,
      },
      {
        label: "d",
        text: "ไปกลุ่มใดก็ได้เนื่องจากระยะทางใกล้เคียงกัน",
        correct: false,
      },
    ],
    explanation:
      "กฎขั้นตอนที่ 2 ของ K-Means: ย้ายจุดข้อมูลไปยังกลุ่มที่มีระยะทางไปยัง Centroid ต่ำที่สุด (Minimum Distance)\nระยะทางของ A2: d(C1)=5, d(C2)=6, d(C3)=4 ค่าต่ำสุดคือ 4 ไปยัง C3\nดังนั้น A2 จึงถูกจัดเข้ากลุ่ม C3 (สมาชิก C3 รอบที่ 1 ได้แก่ A2 และ A7)",
    distractor:
      "เดาว่าไป C2 เพราะรู้สึกว่าจุดศูนย์กลาง C2 น่าจะครอบคลุมจุดข้อมูลส่วนใหญ่",
    slideRef: "Lect 08 ตารางรอบที่ 1 (แถว A2) และขั้นตอนที่ 2 ของ K-Means",
    verification: V,
  },
  {
    n: 24,
    kind: "numeric",
    lectures: ["Lect 08"],
    prompt:
      "หลังจบรอบที่ 1 กลุ่ม C2 มีสมาชิก 5 จุด คือ A3(8,4), A4(5,8), A5(7,5), A6(6,4), A8(4,9) จงคำนวณจุดศูนย์กลางใหม่ (New Centroid) ของกลุ่มนี้",
    options: [
      { label: "a", text: "(6, 6)", correct: true },
      { label: "b", text: "(5, 6)", correct: false },
      { label: "c", text: "(6, 5)", correct: false },
      { label: "d", text: "(30, 30)", correct: false },
    ],
    explanation:
      "ขั้นตอนที่ 3 ของ K-Means คือการหาค่าเฉลี่ยเลขคณิต (Mean) ของสมาชิกในกลุ่ม:\n- แกน x: (8 + 5 + 7 + 6 + 4) / 5 = 30 / 5 = 6\n- แกน y: (4 + 8 + 5 + 4 + 9) / 5 = 30 / 5 = 6\nดังนั้น Centroid C2 ใหม่คือ (6, 6) ตรงกับตารางสไลด์",
    distractor:
      "(30, 30) คือผลรวมก่อนหารด้วยจำนวนสมาชิก 5 จุด",
    slideRef: "Lect 08 ตารางอัปเดต Centroid รอบที่ 2 (แถว C2)",
    verification: V,
  },
  {
    n: 25,
    kind: "interpretation",
    lectures: ["Lect 08"],
    prompt:
      "หลังจบรอบที่ 1 กลุ่ม C1 มีสมาชิกเพียงจุดเดียวคือ A1(2, 10) เหตุใดจุดศูนย์กลางของกลุ่มนี้จึงยังคงเป็น (2, 10) ไม่เปลี่ยนแปลง",
    options: [
      {
        label: "a",
        text: "เพราะขั้นตอนที่ 3 ของสไลด์ไม่ได้กล่าวถึงการอัปเดต Centroid เลย",
        correct: false,
      },
      {
        label: "b",
        text: "เพราะกลุ่มที่มีสมาชิก 1 จุด ค่าเฉลี่ยของกลุ่มจะเท่ากับค่าของจุดนั้นพอดี จึงเป็น (2/1, 10/1) = (2, 10)",
        correct: true,
      },
      {
        label: "c",
        text: "เพราะจุด A1 มีระยะทางไปยัง C1 เท่ากับ 0 จึงไม่ถูกย้ายไปกลุ่มอื่น",
        correct: false,
      },
      {
        label: "d",
        text: "เพราะ K-Means บังคับให้จุดศูนย์กลางแรกต้องคงที่เสมอเพื่อเป็นจุดอ้างอิง",
        correct: false,
      },
    ],
    explanation:
      "การคำนวณ Centroid ในขั้นตอนที่ 3 คือ C = (Σx/n, Σy/n) เมื่อกลุ่มมีสมาชิก 1 จุด (n=1) ค่าเฉลี่ยย่อมเท่ากับพิกัดของจุดนั้นเอง คือ (2/1, 10/1) = (2, 10) Centroid จึงอยู่ที่เดิมพอดี ไม่ใช่เพราะข้ามขั้นตอน",
    distractor:
      "ตอบว่าระยะเป็น 0 ซึ่งเป็นการอธิบายการจัดกลุ่มในขั้นตอนที่ 2 ไม่ใช่การคำนวณ Centroid ในขั้นตอนที่ 3",
    slideRef: "Lect 08 ตารางอัปเดต Centroid รอบที่ 2 (แถว C1)",
    verification: V,
  },
  {
    n: 26,
    kind: "numeric",
    lectures: ["Lect 08"],
    prompt:
      "หลังจบรอบที่ 1 กลุ่ม C3 มีสมาชิก 2 จุด คือ A2(2, 5) และ A7(1, 2) จงคำนวณจุดศูนย์กลางใหม่ของกลุ่มนี้เป็นทศนิยม",
    options: [
      { label: "a", text: "(1.5, 3.5)", correct: true },
      { label: "b", text: "(1.5, 2.5)", correct: false },
      { label: "c", text: "(2, 1.5)", correct: false },
      { label: "d", text: "(3, 7)", correct: false },
    ],
    explanation:
      "คำนวณค่าเฉลี่ยของสมาชิก 2 จุด (n=2):\n- แกน x: (2 + 1) / 2 = 3 / 2 = 1.5\n- แกน y: (5 + 2) / 2 = 7 / 2 = 3.5\nดังนั้น Centroid C3 ใหม่คือ (1.5, 3.5) ตรงกับตารางสไลด์",
    distractor:
      "(3, 7) คือผลรวมก่อนหารด้วย 2 หรือสลับแกน x และ y",
    slideRef: "Lect 08 ตารางอัปเดต Centroid รอบที่ 2 (แถว C3)",
    verification: V,
  },
  {
    n: 27,
    kind: "interpretation",
    lectures: ["Lect 08"],
    prompt:
      "ข้อความใดตรงกับเงื่อนไขการหยุด (Stopping Criteria) ของอัลกอริทึม K-Means ตามที่สไลด์ระบุไว้มากที่สุด",
    options: [
      {
        label: "a",
        text: "หยุดเมื่อรอบที่ 10 เสร็จสิ้น ไม่ว่าผลจะยังเปลี่ยนอยู่หรือไม่",
        correct: false,
      },
      {
        label: "b",
        text: "หยุดเมื่อกลุ่มใดกลุ่มหนึ่งมีสมาชิกน้อยกว่า 2 จุด",
        correct: false,
      },
      {
        label: "c",
        text: "วนกลับไปทำขั้นที่ 2 ต่อเนื่องจนกว่าค่าเฉลี่ยจะไม่เปลี่ยนแปลง หรือจนกว่าจะไม่มีสมาชิกข้ามกลุ่ม",
        correct: true,
      },
      {
        label: "d",
        text: "หยุดเมื่อจำนวนกลุ่มที่ได้เป็น 3 กลุ่มตามที่กำหนด K ไว้",
        correct: false,
      },
    ],
    explanation:
      "ขั้นตอนที่ 4 ของ K-Means ระบุเงื่อนไขการหยุดการวนซ้ำไว้ 2 ทางเลือก (OR):\n1. ค่าเฉลี่ย (Centroid) ไม่เปลี่ยนแปลงเมื่อเทียบกับรอบก่อนหน้า หรือ\n2. ไม่มีจุดข้อมูลใดเปลี่ยนกลุ่ม (No reassignment of points)",
    distractor:
      "คิดว่ามีรอบสูงสุดตายตัวเช่น 10 รอบ หรือเข้าใจว่าเมื่อแบ่งได้ครบ K กลุ่มแล้วจะหยุดทันที",
    slideRef: "Lect 08 ขั้นตอนที่ 4 ของอัลกอริทึม K-Means",
    verification: V,
  },
  {
    n: 28,
    kind: "scenario",
    lectures: ["Lect 08"],
    prompt:
      "ข้อความใดเป็น 'จุดอ่อน (Weakness)' ของ K-Means ตามที่สไลด์ระบุไว้มากที่สุด",
    options: [
      {
        label: "a",
        text: "ใช้ได้เฉพาะข้อมูลที่หาค่าเฉลี่ยได้ ข้อมูลเชิงกลุ่มต้องเข้ารหัสเป็นตัวเลขก่อน เช่น ผอม 1 ปานกลาง 2 อ้วน 3",
        correct: true,
      },
      {
        label: "b",
        text: "เข้าใจง่าย แก้ปัญหาได้ เพราะเป็นอัลกอริทึมพื้นฐาน",
        correct: false,
      },
      {
        label: "c",
        text: "ทำงานเร็ว ความซับซ้อนเป็น O(tkn) โดย n คือจำนวนวัตถุ k คือจำนวนกลุ่ม และ t คือจำนวนรอบ",
        correct: false,
      },
      {
        label: "d",
        text: "เป้าหมายของมันคือเพิ่มความคล้ายภายในกลุ่มให้มากที่สุด จึงตอบได้ตรงกับคำถามของงานจริง",
        correct: false,
      },
    ],
    explanation:
      "สไลด์แยกตารางเปรียบเทียบจุดแข็งและจุดอ่อนชัดเจน:\n- จุดอ่อน: (1) ใช้ได้เฉพาะข้อมูลที่หาค่าเฉลี่ยได้ ข้อมูลเชิงกลุ่มต้องแปลงเป็นตัวเลขก่อน เช่น ผอม 1 ปานกลาง 2 อ้วน 3 (2) มักหยุดที่ Local Optimum ค่าเริ่มต้นจึงสำคัญ (3) ต้องระบุ K ล่วงหน้า และไม่ทนทานต่อ Outlier\n- จุดแข็ง: เข้าใจง่าย (b), ความซับซ้อน O(tkn) ทำงานเร็ว (c), Optimize ความคล้ายภายในกลุ่ม (d)",
    distractor:
      "เลือก O(tkn) หรือความเรียบง่าย เพราะจำข้อความได้จากสไลด์แต่สับสนว่าเป็นจุดแข็งไม่ใช่จุดอ่อน",
    slideRef: "Lect 08 สไลด์ตาราง Strengths & Weaknesses of K-Means",
    verification: V,
  },
  {
    n: 29,
    kind: "numeric",
    lectures: ["Lect 08"],
    prompt:
      "จุดข้อมูล A3(8,4) มีระยะทางจากจุดศูนย์กลาง C2(5,8) เท่ากับ 7 เมื่อใช้ Manhattan จงคำนวณระยะทาง Euclidean ของคู่เดียวกันนี้ แล้วเลือกข้อความที่ถูกต้องที่สุด",
    options: [
      { label: "a", text: "7", correct: false },
      { label: "b", text: "25", correct: false },
      { label: "c", text: "√25 = 5", correct: true },
      { label: "d", text: "49", correct: false },
    ],
    explanation:
      "คำนวณ Euclidean Distance d = √[(8 - 5)² + (4 - 8)²] = √[3² + (-4)²] = √[9 + 16] = √25 = 5\n(ขณะที่ Manhattan คือ |8-5| + |4-8| = 3 + 4 = 7)\nEuclidean ได้คำตอบเท่ากับ 5 พอดี",
    distractor:
      "25 คือลืมถอดรากที่สอง (เป็น Squared Euclidean); ส่วน 7 คือนำค่า Manhattan มาตอบโดยไม่ได้คำนวณ Euclidean",
    slideRef:
      "Lect 08 สไลด์สูตร Euclidean d = √(Σ(xi - yi)²) และตารางรอบที่ 1 แถว A3",
    verification: V,
  },
  {
    n: 30,
    kind: "scenario",
    lectures: ["Lect 08"],
    prompt:
      "ในการทำ K-Means ด้วยมือในข้อสอบใช้ระยะทางแบบ Manhattan แต่ค่า WCSS / Inertia ในทางทฤษฎีใช้ระยะทางอีกแบบหนึ่ง ข้อความใดอธิบายความต่างนี้ได้ถูกต้องที่สุด",
    options: [
      {
        label: "a",
        text: "WCSS / Inertia ใช้ Manhattan เช่นเดียวกัน เพียงแต่รวมค่าจากทุกจุดในกลุ่มแล้วหารด้วยจำนวนกลุ่ม",
        correct: false,
      },
      {
        label: "b",
        text: "WCSS / Inertia ใช้ Euclidean แบบยกกำลังสอง (Squared Euclidean) ซึ่งทำให้ค่าเป็นบวกเสมอและหาอนุพันธ์ได้ง่าย และจุดศูนย์กลางที่ลดระยะกำลังสองได้ต่ำสุดคือค่าเฉลี่ย (Mean) พอดี",
        correct: true,
      },
      {
        label: "c",
        text: "WCSS / Inertia ใช้ Chebyshev เพราะหาค่าต่ำสุดได้เร็วกว่า",
        correct: false,
      },
      {
        label: "d",
        text: "ทั้งสองแบบให้คำตอบเท่ากันเสมอ เพียงแต่เขียนสูตรต่างกัน",
        correct: false,
      },
    ],
    explanation:
      "เหตุผลที่ WCSS / Inertia ใช้ Squared Euclidean:\n1. ทางคณิตศาสตร์ จุดที่ทำให้ผลรวมของระยะยกกำลังสองต่ำที่สุดคือ 'ค่าเฉลี่ย (Mean)' พอดี ซึ่งสอดคล้องกับขั้นตอนการอัปเดต Centroid ด้วยค่าเฉลี่ย\n2. ฟังก์ชันมีความเรียบ (Smooth) และหาอนุพันธ์เพื่อ Optimize ได้ง่าย\nส่วนการใช้ Manhattan ในข้อสอบเป็นการเลือกใช้เฉพาะกิจเพื่อคำนวณด้วยมือง่ายขึ้นและเป็นจำนวนเต็ม",
    distractor:
      "คิดว่า WCSS ก็ใช้ Manhattan เหมือนกัน หรือคิดว่าทั้งสองแบบให้คำตอบเท่ากันเสมอ",
    slideRef: "Lect 08 จุดแข็ง (Inertia/WCSS optimization) และสูตร K-Means",
    verification: V,
  },
  {
    n: 34,
    kind: "numeric",
    lectures: ["Lect 08"],
    prompt:
      "สมมติจุด i หนึ่งจุดมีระยะเฉลี่ยถึงจุดอื่นในกลุ่มเดียวกัน a(i) = 2 และระยะเฉลี่ยถึงกลุ่มที่ใกล้ที่สุด b(i) = 6 จงคำนวณ Silhouette Score s(i) = (b(i) - a(i)) / max(a(i), b(i)) และตีความ",
    options: [
      { label: "a", text: "0.667 ใกล้ +1 แปลว่าจุดนี้อยู่ในกลุ่มที่เหมาะสม", correct: true },
      { label: "b", text: "2.00 เกินช่วง [-1, +1] จึงแปลว่าจัดกลุ่มดีมาก", correct: false },
      { label: "c", text: "0.500 เพราะหารด้วย a(i) + b(i)", correct: false },
      { label: "d", text: "-0.667 แปลว่าจุดนี้น่าจะอยู่ผิดกลุ่ม", correct: false },
    ],
    explanation:
      "s(i) = (6 - 2) / max(2, 6) = 4 / 6 = 0.667 ค่าอยู่ในช่วง -1 ถึง +1 (สไลด์ p.36) ค่าใกล้ 1 แปลว่ากลุ่มกระชับและแยกจากกลุ่มอื่นดี ค่าใกล้ -1 แปลว่าจัดกลุ่มไม่ดี สไลด์ p.38 ย้ำว่า Best K ไม่ใช่ Inertia ต่ำสุดหรือคะแนนอัตโนมัติ แต่ต้องดู Compactness, Separation, Stability, Simplicity และ Business Interpretability ร่วมกัน",
    distractor:
      "2.00 คือ (b - a) / a ซึ่งตัวส่วนผิด สูตรหารด้วยค่าที่มากกว่าระหว่าง a กับ b จึงไม่เกิน 1 ส่วน 0.500 เกิดจากหารด้วยผลบวก a + b",
    slideRef: "Lect 08 p36 (Silhouette Score), p38 (เลือก K ด้วยหลักฐานและความหมาย) ตัวเลข a=2, b=6 เป็นตัวเลขสมมติเพื่อฝึกคำนวณ",
    verification: V,
  },
];

/**
 * The comprehensive paper. Question numbers are stable (explanations and
 * cross-references use them), but the lecture arrays that own them are not in
 * numeric order, so the merge is sorted by `n` — the paper must read 1..35.
 */
export const allQuestions: Question[] = [
  ...questionsLect09,
  ...questionsLect0507,
  ...questionsLect08,
].sort((a, b) => a.n - b.n);

/* ------------------------------------------------------------------ */
/* Test Papers                                                        */
/* ------------------------------------------------------------------ */

export const mockTestFull: MockTest = {
  id: "full",
  title: "Comprehensive Final Exam (35 Questions)",
  titleTh: "ชุดข้อสอบรวมทุกบท (35 ข้อ)",
  description: "จำลองการสอบ Final ครบทุกเนื้อหา Lect 05 ถึง 09 รวม 35 ข้อ",
  timeLimitSeconds: 45 * 60,
  questions: allQuestions,
};

export const mockTestLect09: MockTest = {
  id: "lect09",
  title: "Responsible Data Science",
  titleTh: "Lect 09: Responsible Data Science (11 ข้อ)",
  description: "XAI, SHAP, Bias, Data Privacy, Monitoring & กรณีศึกษาจริยธรรม",
  timeLimitSeconds: 17 * 60,
  questions: questionsLect09,
};

export const mockTestLect0507: MockTest = {
  id: "lect0507",
  title: "EDA, Modeling & Decision Tree",
  titleTh: "Lect 05–07: EDA, Modeling & Decision Tree (13 ข้อ)",
  description: "Boxplot Fences, CRISP-DS, Gini Impurity, Confusion Matrix, HW#2 & Decision Gates",
  timeLimitSeconds: 21 * 60,
  questions: questionsLect0507,
};

export const mockTestLect08: MockTest = {
  id: "lect08",
  title: "K-Means Clustering",
  titleTh: "Lect 08: K-Means Clustering (11 ข้อ)",
  description: "Centroid Updates, Manhattan vs Euclidean, Stopping Criteria, WCSS & Silhouette",
  timeLimitSeconds: 17 * 60,
  questions: questionsLect08,
};

export const allMockTests: MockTest[] = [
  mockTestFull,
  mockTestLect0507,
  mockTestLect08,
  mockTestLect09,
];
