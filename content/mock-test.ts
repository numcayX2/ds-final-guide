import type { MockTest } from "./types";


/**
 * Mock exam — 10 questions carried over from the previous guide, re-verified
 * against the 28-slide Lecture 09 deck.
 *
 * Two corrections were required and have been applied:
 *
 * 1. Every slide reference in the original pointed at a 36-page version of the
 *    deck. This deck has 28 pages and the topics sit elsewhere, so each
 *    reference was remapped to the page actually verified.
 * 2. The explanation prose quoted those same stale page numbers inline. Those
 *    were rewritten too, otherwise the site would have told a student to open
 *    a page that does not contain what the text claims.
 *
 * Every answer was re-checked against the slides and all ten still hold.
 */

const V = "verified-by-principle" as const;

export const mockTestLect09: MockTest = {
  title: "Responsible Data Science",
  titleTh: "ข้อสอบ Lect 09",
  // 10 questions, suggested 15 minutes.
  timeLimitSeconds: 15 * 60,
  questions: [
    {
      n: 1,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "ในกระบวนการพัฒนา Data Science เพื่อนำไปใช้งานจริง หากโมเดลทำคะแนนความถูกต้องโดยรวม (Accuracy) ได้สูงถึง 84% เหตุใดจึงยังไม่สามารถอนุมัติให้ระบบส่งข้อเสนอหรืองานแบบอัตโนมัติได้ทันที? (CLO3)",
      options: [
        { label: "a", text: "เพราะคะแนนภาพรวมอาจบดบังประสิทธิภาพที่ต่ำในกลุ่มย่อย และยังไม่ได้ตรวจการอธิบายผล ผลกระทบ และจริยธรรม", correct: true },
        { label: "b", text: "เพราะขั้นตอนของ CRISP-DS ห้ามไม่ให้มีขั้นตอนการส่งข้อเสนออัตโนมัติ", correct: false },
        { label: "c", text: "เพราะโมเดลจำเป็นต้องเปลี่ยนไปใช้วิธี Unsupervised Learning เสมอ", correct: false },
        { label: "d", text: "เพราะต้องรอให้ผลลัพธ์ Accuracy สูงถึง 100% เท่านั้น", correct: false },
      ],
      explanation: "แม้โมเดลจะทำคะแนนความถูกต้องโดยรวม (Accuracy) ได้สูงถึง 84% แต่ไม่สามารถอนุมัติให้ระบบทำงานอัตโนมัติทันทีได้ เพราะ:\\n1. คะแนนภาพรวมอาจบดบังประสิทธิภาพที่ต่ำมากในกลุ่มย่อย (Subgroup Disparities เช่น ในกลุ่มชนกลุ่มน้อยหรือกลุ่มเปราะบางอาจมี Recall ต่ำมาก)\\n2. ยังไม่ได้ตรวจสอบการอธิบายผลลัพธ์ (Explainability / XAI) ว่าโมเดลใช้เหตุผลที่สมเหตุสมผลหรือไม่\\n3. ยังไม่ได้ประเมินผลกระทบเชิงจริยธรรม กฎหมาย และความเสี่ยงต่อธุรกิจ ตามหลัก Responsible AI จะต้องผ่าน Decision Gates (Accept/Revise/Reject) และมี Human Oversight กำกับดูแลเสมอ",
      slideRef: "Lect 09 p4 (Accuracy 84% vs Recall กลุ่มใหม่ 54%) และ p12 (Representation Bias, n=800 CI 78-86% vs n=40 CI 39-69%)",
      verification: V,
    },
    {
      n: 2,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "หากผู้บริหารต้องการทราบว่า \\\"โมเดลการทำนายลูกค้ายกเลิกบริการในภาพรวมทั้งบริษัท ให้ความสำคัญหรือพึ่งพาปัจจัยใดมากที่สุด\\\" ควรเลือกใช้เครื่องมืออธิบาย AI (XAI) ในระดับใด? (CLO1)",
      options: [
        { label: "a", text: "Counterfactual Explanation", correct: false },
        { label: "b", text: "Local Explanation", correct: false },
        { label: "c", text: "Individual Decision Path", correct: false },
        { label: "d", text: "Global Explanation", correct: true },
      ],
      explanation: "คำตอบคือ Global Explanation (การอธิบายระดับภาพรวมทั้งระบบ):\\n- Global Explanation: ใช้อธิบายพฤติกรรมของโมเดลทั้งระบบในภาพรวม เช่น Global Feature Importance หรือ SHAP Summary Plot เพื่อตอบคำถามผู้บริหารว่าในระดับประชากรทั้งหมด ปัจจัยใดมีอิทธิพลต่อผลการทำนายมากที่สุด\\n- Local Explanation: อธิบายการตัดสินใจเฉพาะลูกค้ารายบุคคล (Individual Instance)\\n- Individual Decision Path: แสดงกิ่งและเงื่อนไขการตัดสินใจของลูกค้ารายคนใน Decision Tree\\n- Counterfactual Explanation: อธิบายเงื่อนไขขั้นต่ำที่ต้องเปลี่ยนแปลงเพื่อให้ผลการทำนายพลิกเป็นอีกแบบ (เช่น ต้องเพิ่มยอดซื้ออีกเท่าใดจึงจะไม่ถูกจัดเป็น Inactive)",
      slideRef: "Lect 09 p5 (Global Explanation กับ Local Explanation)",
      verification: V,
    },
    {
      n: 3,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "ในการเลือกใช้เทคนิค Explainable AI (XAI) ข้อใดอธิบายความแตกต่างระหว่าง \\\"Model-Specific\\\" และ \\\"Model-Agnostic\\\" ได้อย่างถูกต้อง? (CLO1)",
      options: [
        { label: "a", text: "Model-Specific ใช้ได้กับโมเดลทุกประเภท ส่วน Model-Agnostic ใช้ได้เฉพาะ Decision Tree", correct: false },
        { label: "b", text: "Model-Specific อาศัยโครงสร้างภายในของโมเดลนั้น ๆ ส่วน Model-Agnostic ตรวจสอบพฤติกรรมผ่าน Input-Output โดยไม่ยึดติดกับโครงสร้างโมเดล", correct: true },
        { label: "c", text: "Model-Specific ใช้กับข้อมูลไม่มี Label ส่วน Model-Agnostic ใช้กับข้อมูลมี Label", correct: false },
        { label: "d", text: "Model-Specific ใช้ตรวจหา Data Leakage ส่วน Model-Agnostic ใช้คำนวณ Accuracy", correct: false },
      ],
      explanation: "ความแตกต่างสำคัญของสถาปัตยกรรม XAI:\\n- Model-Specific: ต้องอาศัยโครงสร้างภายในและพารามิเตอร์เฉพาะของโมเดลนั้นๆ เช่น ค่าสัมประสิทธิ์ Weights ใน Linear Regression หรือ Gini/Entropy Split ใน Decision Tree ไม่สามารถนำไปอธิบายโมเดลต่างสถาปัตยกรรมได้\\n- Model-Agnostic: มองโมเดลเสมือนเป็น Black-box ไม่ยึดติดกับโครงสร้างภายใน โดยอาศัยการจำลองป้อน Input และสังเกตการเปลี่ยนแปลงของ Output (เช่น SHAP KernelExplainer, LIME, Permutation Feature Importance) จึงสามารถนำไปใช้อธิบายโมเดล Machine Learning ได้ทุกประเภท",
      slideRef: "Lect 09 p8 (Model-Specific ใช้โครงสร้างภายใน / Model-Agnostic ใช้ Input-Output, SHAP และ LIME)",
      verification: V,
    },
    {
      n: 4,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "จากการนำเทคนิค SHAP มาอธิบายผลการทำนายลูกค้ารายหนึ่ง พบว่าค่า Base Value อยู่ที่ 32% และผลการทำนายสุดท้ายอยู่ที่ 65% โดยปัจจัย \\\"ไม่ได้ซื้อสินค้านาน\\\" มีค่า SHAP value เท่ากับ +29% ค่าดังกล่าวแสดงความหมายอย่างไร? (CLO2)",
      options: [
        { label: "a", text: "ปัจจัยนี้ทำให้ความน่าจะเป็นที่ลูกค้าจะ Inactive เพิ่มขึ้น 29 จุดเปอร์เซ็นต์ เมื่อเทียบกับค่าฐาน", correct: true },
        { label: "b", text: "ปัจจัยนี้ทำให้ลดความเสี่ยงที่ลูกค้าจะ Inactive ลง 29 จุดเปอร์เซ็นต์ เมื่อเทียบกับค่าฐาน", correct: false },
        { label: "c", text: "ปัจจัยนี้เป็นสาเหตุเดียวที่ทำให้ลูกค้าตัดสินใจเลิกใช้งาน 29 วัน", correct: false },
        { label: "d", text: "โมเดลมีความแม่นยำในการทำนายลูกค้าคนนี้เพิ่มขึ้น 29%", correct: false },
      ],
      explanation: "ในแนวคิด SHAP (SHapley Additive exPlanations):\\n- Base Value (32%) คือค่าความน่าจะเป็นเฉลี่ยตั้งต้นของข้อมูลทั้งหมด\\n- ผลการทำนายสุดท้าย (65%) คำนวณจาก Base Value + ผลรวมของ SHAP Values ของทุกฟีเจอร์\\n- ค่า SHAP Value ที่เป็นบวก (+29%) ของปัจจัย 'ไม่ได้ซื้อสินค้านาน' หมายถึง ปัจจัยนี้ช่วยผลักดันให้ความน่าจะเป็นที่ลูกค้าจะ Inactive สูงขึ้น 29 จุดเปอร์เซ็นต์ (Percentage Points) เมื่อเทียบกับค่าฐาน (32% + 29% + ผลกระทบตัวแปรอื่น = 65%)\\n(ไม่ใช่การเพิ่มความแม่นยำ และไม่ใช่จำนวนวัน)",
      slideRef: "Lect 09 p9 (SHAP: Base Value 32%, +29 จุดเปอร์เซ็นต์, Prediction 65%)",
      verification: V,
    },
    {
      n: 5,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "ปรากฏการณ์ \\\"Concept Drift\\\" ที่ส่งผลให้โมเดล Machine Learning มีประสิทธิภาพลดลงเมื่อนำไปใช้งานจริง มีสาเหตุหลักมาจากข้อใด? (CLO2)",
      options: [
        { label: "a", text: "การสุ่มค่า Centroid เริ่มต้นผิดพลาดในขั้นตอน Modeling", correct: false },
        { label: "b", text: "ข้อผิดพลาดในการเขียน Syntax ของโปรแกรมเมอร์หลังจากรันโมเดล เพิ่มขึ้น ทำให้โปรแกรมเมอร์ต้องกลับไปออกแบบโปรแกรมใหม่", correct: false },
        { label: "c", text: "โครงสร้างและสภาพแวดล้อมในโลกจริงเปลี่ยนไป ทำให้ความสัมพันธ์ระหว่าง Feature กับ Target เปลี่ยนแปลงไปจากอดีต", correct: true },
        { label: "d", text: "การแบ่งชุดข้อมูลออกเป็น Train และ Validation Data มีสัดส่วนไม่เท่ากัน ทำให้ data scientist ต้องกลับไปสุ่มแบ่งข้อมูลใหม่อีกรอบด้วย random_seed เลขใหม่", correct: false },
      ],
      explanation: "Concept Drift คือปรากฏการณ์ที่ความสัมพันธ์ทางสถิติระหว่างตัวแปรต้น (Features) กับตัวแปรเป้าหมาย (Target) หรือ P(Y|X) เปลี่ยนแปลงไปตามกาลเวลา เนื่องจากสภาพแวดล้อม พฤติกรรมผู้บริโภค หรือบริบททางสังคมในโลกจริงเปลี่ยนไป (เช่น ในอดีตการไม่ซื้อของเกิน 45 วันถือว่า Inactive แต่ปัจจุบันเปลี่ยนเป็น 70 วัน หรือพฤติกรรมการใช้จ่ายหลังวิกฤตเศรษฐกิจ) ส่งผลให้โมเดลเดิมที่เคยแม่นยำเกิดการเสื่อมประสิทธิภาพ (Model Degradation)",
      slideRef: "Lect 09 p11 (Concept Drift: ไม่ซื้อเกิน 45 วัน, Inactive 68% เปลี่ยนเป็น 31%)",
      verification: V,
    },
    {
      n: 6,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "แม้ผู้พัฒนาโมเดลจะลบคอลัมน์ข้อมูลอ่อนไหว เช่น เพศ หรือ เชื้อชาติ ออกจากชุดข้อมูลแล้ว แต่โมเดลก็ยังอาจเกิดอคติในการตัดสินใจได้ ปัญหานี้มักเกิดจากสาเหตุใด? (CLO3)",
      options: [
        { label: "a", text: "ตัวแบบเกิด Underfitting เนื่องจากจำนวนคอลัมน์ไม่เพียงพอ", correct: false },
        { label: "b", text: "ข้อมูลผ่านการทำ Standardization มากเกินไป", correct: false },
        { label: "c", text: "ตัวแปรอื่นที่เหลืออยู่ (เช่น รหัสไปรษณีย์) ทำหน้าที่เป็น Proxy Feature ที่สะท้อนข้อมูลอ่อนไหวหรือฐานะทางเศรษฐกิจโดยอ้อม", correct: true },
        { label: "d", text: "เกิดปัญหา Class Imbalance ในตัวแปร Target ที่มาจากการเก็บข้อมูลไม่สมดุลกัน และ ไม่ตรงตามธรรมชาติของข้อมูล และ ความไม่รอบคอบของนักวิทยาการข้อมูล", correct: false },
      ],
      explanation: "แม้จะลบคอลัมน์ข้อมูลอ่อนไหวออก (เรียกว่า Fairness through Unawareness) แต่โมเดลก็ยังสามารถเกิดอคติ (Bias) ได้เนื่องจากตัวแปรอื่นที่เหลืออยู่ทำหน้าที่เป็น 'Proxy Feature' (ตัวแปรตัวแทน) เช่น รหัสไปรษณีย์ (Postal Code / ZIP code), ย่านที่อยู่อาศัย, ประวัติโรงเรียน หรือพฤติกรรมการซื้อ ซึ่งตัวแปรเหล่านี้มักมีความสัมพันธ์ทางสถิติอย่างแนบแน่นกับเชื้อชาติหรือฐานะทางเศรษฐกิจ ทำให้โมเดลเรียนรู้ที่จะเลือกปฏิบัติทางอ้อม (Redlining) ได้อยู่ดี",
      slideRef: "Lect 09 p13 (Proxy Feature: รหัสไปรษณีย์ 10110 ได้ 42% แต่ 94100 ได้ 67%)",
      verification: V,
    },
    {
      n: 7,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "จากกรณีศึกษาการใช้อัลกอริทึมประเมินความเสี่ยงสุขภาพ (Health-risk Algorithm) ที่นำ \\\"ค่าใช้จ่ายด้านสุขภาพในอดีต\\\" มาเป็นตัวแทน (Proxy) ของ \\\"ความต้องการรักษาพยาบาลจริง\\\" ก่อให้เกิดผลกระทบเชิงจริยธรรมอย่างไร? (CLO3)",
      options: [
        { label: "a", text: "เกิดความลำเอียง ทำให้ผู้ป่วยผิวดำที่มีภาวะป่วยหนักเท่ากับผู้ป่วยผิวขาว ได้รับคะแนนความเสี่ยงต่ำกว่าความเป็นจริงเพราะเข้าถึงค่าใช้จ่ายในอดีตได้น้อยกว่า", correct: true },
        { label: "b", text: "โมเดลทำงานได้รวดเร็วขึ้นเนื่องจากข้อมูลค่าใช้จ่ายด้านาสุขภาพในอดีตเป็นตัวเลขต่อเนื่อง สอดคล้องกับโมเดลที่ชอบการประมาณค่ามากกว่าการจำแนกหมวดหมู่ข้อมูล", correct: false },
        { label: "c", text: "ทำให้ผู้ป่วยทุกกลุ่มได้รับสิทธิการรักษาเท่าเทียมกันมากขึ้น", correct: false },
        { label: "d", text: "โรงพยาบาลสามารถลดงบประมาณการดูแลผู้ป่วยเรื้อรังได้ทั้งหมด", correct: false },
      ],
      explanation: "จากกรณีศึกษาจริงในวารสาร Science (Obermeyer et al., 2019) ที่ระบุในสไลด์ Lect 09 หน้า 26:\\nโรงพยาบาลใช้อัลกอริทึมจัดสรรคนไข้เข้าโครงการดูแลพิเศษ โดยใช้ 'ค่าใช้จ่ายด้านสุขภาพในอดีต' เป็น Proxy วัด 'ความรุนแรงของโรค' แต่ในความเป็นจริง ผู้ป่วยผิวดำมีปัญหาความเหลื่อมล้ำในการเข้าถึงประกันและระบบสาธารณสุข จึงมีค่าใช้จ่ายในอดีตต่ำกว่าผู้ป่วยผิวขาวทั้งที่ป่วยหนักเท่ากัน\\nผลลัพธ์: โมเดลจึงประเมินความเสี่ยงของผู้ป่วยผิวดำต่ำกว่าความเป็นจริงอย่างไม่เป็นธรรม ส่งผลให้ผู้ป่วยผิวดำเสียสิทธิ์ในการได้รับการดูแลเชิงรุก",
      slideRef: "Lect 09 p26 (Health-risk Algorithm, Obermeyer et al. Science 2019, แก้ Proxy แล้ว 17.7% เป็น 46.5%)",
      verification: V,
    },
    {
      n: 8,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "ตามหลักการคุ้มครองข้อมูลส่วนบุคคล (Data Privacy) ข้อใดอธิบายหลักการ \\\"Purpose Limitation\\\" และ \\\"Data Minimization\\\" ได้อย่างถูกต้อง? (CLO1)",
      options: [
        { label: "a", text: "ใช้ความยินยอม (Consent) เป็นฐานทางกฎหมายเพียงฐานเดียวในการประมวลผลข้อมูลทุกประเภท", correct: false },
        { label: "b", text: "หากได้ข้อมูลมาแล้วสามารถนำไปวิเคราะห์ในโครงการใดก็ได้ และควรเก็บข้อมูลให้มากที่สุดเท่าที่จะทำได้เพื่อรองรับโมเดลในอนาคต", correct: false },
        { label: "c", text: "ต้องใช้ข้อมูลตามวัตถุประสงค์ที่แจ้งไว้แต่แรกเท่านั้น และจัดเก็บ/ใช้งานเฉพาะข้อมูลฟิลด์ที่จำเป็นต่อการวิเคราะห์จริง", correct: true },
        { label: "d", text: "สามารถส่งข้อมูลไปยัง Generative AI ภายนอกได้ทันทีเพียงแค่ตัดชื่อ-นามสกุลออก", correct: false },
      ],
      explanation: "หลักการสากลในการคุ้มครองข้อมูลส่วนบุคคล (GDPR / PDPA) ตามสไลด์ Lect 09 หน้า 15-16:\\n1. Purpose Limitation (การจำกัดวัตถุประสงค์): ข้อมูลที่เก็บรวบรวมจะต้องถูกนำไปใช้ตามวัตถุประสงค์ที่ได้แจ้งแก่เจ้าของข้อมูลไว้แต่แรกเท่านั้น ห้ามนำไปใช้วิเคราะห์ในโครงการอื่นที่ไม่เกี่ยวข้องโดยไม่ได้รับอนุญาตหรือไม่มีฐานทางกฎหมายรองรับ\\n2. Data Minimization (การลดทอนข้อมูลส่วนบุคคล): ต้องจัดเก็บและประมวลผลข้อมูลเฉพาะฟิลด์ที่เพียงพอ เกี่ยวข้อง และจำเป็นอย่างแท้จริงต่อการวิเคราะห์ (Adequate, Relevant, and Limited to what is necessary) ไม่ใช่เก็บกวาดข้อมูลทุกอย่างมาเก็บไว้เผื่ออนาคต",
      slideRef: "Lect 09 p15 (Purpose Limitation) และ p16 (Data Minimization)",
      verification: V,
    },
    {
      n: 9,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "จากกรณีศึกษาของ Rite Aid ที่นำระบบจดจำใบหน้า (Facial Recognition) มาใช้ในร้านค้า ความเสียหายที่เกิดขึ้นต่อผู้บริโภคเกิดจากข้อบกพร่องในกระบวนการทำงานข้อใด? (CLO3)",
      options: [
        { label: "a", text: "ทางร้านไม่ได้ใช้ระบบการแบ่งกลุ่มแบบ K-Means", correct: false },
        { label: "b", text: "โมเดลมีอัตรา False Negative สูงเกินไปทำให้สินค้าสูญหาย", correct: false },
        { label: "c", text: "ระบบกล้องมีคุณภาพสูงเกินไปจนละเมิดความเป็นส่วนตัว และ บันทึกไว้ตลอดเวลาจนผู้ใช้บริการร้านค้ารู้สึกอึดอัด ไม่สบายใจในการรับบริการ พนักงานในร้านก็รู้สึกไม่สบายใจ", correct: false },
        { label: "d", text: "เมื่อระบบแจ้งเตือนว่าพบคนน่าสงสัย (Alert) พนักงานดำเนินการจับกุม/ตรวจค้นทันที โดยไม่มี Human Checkpoint ในการตรวจสอบความถูกต้องซ้ำ", correct: true },
      ],
      explanation: "จากคดี FTC vs. Rite Aid (2023-2024) ในสไลด์ Lect 09 หน้า 28:\\nความเสียหายร้ายแรงต่อผู้บริโภคเกิดจากข้อบกพร่องในกระบวนการปฏิบัติงาน คือ เมื่อระบบ Facial Recognition ส่งสัญญาณเตือน (Alert) พนักงานในร้านได้ดำเนินการจับกุม ตรวจค้น สั่งให้ออกจากร้าน หรือประจานผู้บริโภคทันที โดยไม่มี 'Human Checkpoint' (จุดตรวจสอบยืนยันโดยมนุษย์) เพื่อเช็กความถูกต้องซ้ำ ส่งผลให้ผู้บริโภคผู้บริสุทธิ์จำนวนมากถูกกล่าวหาอย่างผิดพลาดจนเกิดความเสียหาย FTC จึงมีคำสั่งห้าม Rite Aid ใช้เทคโนโลยีจดจำใบหน้านาน 5 ปี",
      slideRef: "Lect 09 p28 (Rite Aid: False Positive จากกล้องคุณภาพต่ำ, ห้ามใช้ Facial Recognition 5 ปี)",
      verification: V,
    },
    {
      n: 10,
      kind: "scenario",
      lectures: ["Lect 09"],
      prompt: "ในการสื่อสารผลลัพธ์การวิเคราะห์ข้อมูลและเสนอทางเลือกแก่ผู้มีส่วนได้ส่วนเสีย (Stakeholders) แนวปฏิบัติข้อใดสะท้อนถึง \\\"Responsible Communication and Governance\\\" ได้ดีที่สุด? (CLO3)",
      options: [
        { label: "a", text: "ยืนยันว่าโมเดลจะมีความแม่นยำถาวรเพื่อสร้างความมั่นใจสูงสุดในการลงทุน", correct: false },
        { label: "b", text: "มอบหมายให้ระบบ AI ทำการตัดสินใจอนุมัติมาตรการทางธุรกิจทั้งหมดโดยอัตโนมัติเพื่อลดอคติของมนุษย์", correct: false },
        { label: "c", text: "ปรับเปลี่ยนข้อมูลตัวเลขทางสถิติให้เหมาะสมกับความต้องการของกลุ่มผู้ฟังแต่ละฝ่าย", correct: false },
        { label: "d", text: "สื่อสารด้วยภาษาที่ผู้ฟังแต่ละกลุ่มเข้าใจได้ แต่รักษาข้อเท็จจริง ความไม่แน่นอน ข้อจำกัด และกำหนดเงื่อนไขการกำกับดูแลโดยมนุษย์ (Human Oversight) ไว้อย่างครบถ้วน", correct: true },
      ],
      explanation: "แนวปฏิบัติที่ดีที่สุดของ Responsible Communication and Governance ตามสไลด์ Lect 09 หน้า 19 และ 21:\\n- ต้องแปลผลลัพธ์และสื่อสารด้วยภาษาที่เหมาะสมกับบริบทของผู้มีส่วนได้ส่วนเสียแต่ละกลุ่ม เพื่อให้เกิดความเข้าใจร่วมกัน\\n- ต้องรักษาความโปร่งใสและข้อเท็จจริงทางสถิติอย่างเคร่งครัด โดยเปิดเผยความไม่แน่นอน (Uncertainty), สมมติฐาน และข้อจำกัดของโมเดล (Limitations) อย่างตรงไปตรงมา ไม่โฆษณาเกินจริง\\n- ต้องกำหนดกรอบการกำกับดูแลโดยมนุษย์ (Human Oversight / Human-in-the-loop) ในทุกจุดตัดสินใจสำคัญ ไม่ปล่อยให้ระบบอัตโนมัติทำงานโดยไร้การตรวจสอบ",
      slideRef: "Lect 09 p19 (แยกผลที่พบ ความหมาย ข้อจำกัด และเงื่อนไข) และ p21 (เปลี่ยนภาษาได้ ห้ามเปลี่ยนข้อเท็จจริง)",
      verification: V,
    },
  ],
};
