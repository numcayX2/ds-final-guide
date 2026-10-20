import type { ExamQuestion } from '../types/study';

/**
 * 60 In-Class Quiz Questions (Weeks 4 - 9)
 * Official short quizzes taken during class sessions.
 * Exactly matched to codes [W4-Q2] through [W9-Q11] in Cheatsheet.
 */
export const inClassQuestions: ExamQuestion[] = [
  {
    "id": "inclass-w4-q02",
    "questionNumber": 1,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q2",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q2] บทบาทของ EDA ใน CRISP-DS",
    "scenario": "ในมุมมองของ CRISP-DS Workflow ข้อใดอธิบายบทบาทและลักษณะการทำงานของขั้นตอน Exploratory Data Analysis (EDA) ได้ถูกต้องที่สุด? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "เป็นขั้นตอนอัตโนมัติในการเลือกลักษณะของอัลกอริทึมการเรียนรู้ของเครื่องที่เหมาะสมที่สุดในทันที",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q2"
      },
      {
        "id": "B",
        "text": "เป็นขั้นตอนที่มุ่งเน้นการสร้างกราฟทุกรูปแบบที่เป็นไปได้เพื่อค้นหาประเด็นที่น่าสนใจโดยไม่ต้องตั้งสมมติฐาน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q2"
      },
      {
        "id": "C",
        "text": "เป็นขั้นตอนแบบเส้นตรงที่ต้องทำให้เสร็จสิ้นเพื่อส่งต่อให้ขั้นตอนการสร้างโมเดลโดยไม่มีการย้อนกลับ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q2"
      },
      {
        "id": "D",
        "text": "เป็นจุดตรวจทานแบบวนซ้ำที่สามารถส่งกระบวนการกลับไปทบทวนคำถามหรือการเตรียมข้อมูลได้เมื่อพบปัญหา",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W4-Q2 ที่เน้นย้ำในการเรียนการสอน"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w4-q03",
    "questionNumber": 2,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q3",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q3] ทำไมไม่ควรสร้างทุกกราฟก่อน",
    "scenario": "เพราะเหตุใดหลักการทำ EDA ที่ดีจึงแนะนำว่า \"ไม่ควรเริ่มต้นด้วยการสร้างทุกกราฟเพื่อดูว่ามีอะไรน่าสนใจ\"? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "เพราะการสร้างกราฟก่อนการคำนวณสถิติจะทำให้ข้อมูลเกิดการสูญหายในขั้นตอน Data Preparation",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q3"
      },
      {
        "id": "B",
        "text": "เพราะการสร้างกราฟจำนวนมากจะทำให้ความเร็วในการประมวลผลของคอมพิวเตอร์ลดลงอย่างมีนัยสำคัญ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q3"
      },
      {
        "id": "C",
        "text": "เพราะการวิเคราะห์ควรเริ่มต้นจาก Analytical Question เพื่อกำหนดตัวแปรและการเปรียบเทียบที่ตรงเป้าหมาย",
        "isCorrect": true,
        "explanation": "เชื่อมกับหลักเดิมของวิชา: \"Start with the Question, Not the Dataset\" (test week 2 ข้อ 1) — หลักการเดียวกันแต่มาใช้ในบริบท EDA"
      },
      {
        "id": "D",
        "text": "เพราะโปรแกรม Data Visualization ทั่วไปไม่รองรับการพล็อตกราฟหลายประเภทพร้อมกันในชุดข้อมูลเดียว",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q3"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w4-q04",
    "questionNumber": 3,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q4",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q4] สถิติที่เหมาะกับข้อมูลเบ้ขวารุนแรง",
    "scenario": "หากชุดข้อมูลมีลักษณะการแจกแจงแบบเบ้ขวาอย่างรุนแรง (Strongly Right-Skewed) และมีค่าสุดขั้วปริมาณมาก ค่าสถิติวัดแนวโน้มเข้าสู่ส่วนกลางและค่าวัดการกระจายคู่ใดเหมาะสมที่สุดในการอธิบายข้อมูล? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "Mean และ Variance",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q4"
      },
      {
        "id": "B",
        "text": "Mode และ Range",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q4"
      },
      {
        "id": "C",
        "text": "Mean และ Standard Deviation",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q4"
      },
      {
        "id": "D",
        "text": "Median และ Interquartile Range (IQR)",
        "isCorrect": true,
        "explanation": "จุดที่ต้องระวัง: Mean/SD ไวต่อ outlier และการเบ้ — ข้อมูลเบ้ขวารุนแรงต้องใช้สถิติแบบ robust (Median/IQR) ไม่ใช่ Mean/SD"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w4-q05",
    "questionNumber": 4,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q5",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q5] การตีความ Bimodal Distribution",
    "scenario": "เมื่อตรวจสอบกราฟการแจกแจง (Distribution) ของข้อมูลยอดขาย แล้วพบว่ามีลักษณะเป็นยอดเขาสองยอด (Bimodal หรือ Multiple Peaks) ข้อใดคือการตีความเบื้องต้นที่สมเหตุผลที่สุด? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "ข้อมูลมีค่า Standard Deviation เท่ากับศูนย์เนื่องจากความสมมาตรของยอดเขาทั้งสองฝั่ง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q5"
      },
      {
        "id": "B",
        "text": "ข้อมูลอาจมีกลุ่มย่อย (Sub-groups) มากกว่าหนึ่งกลุ่มแฝงตัวอยู่ภายในชุดข้อมูลเดียวกัน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W4-Q5 ที่เน้นย้ำในการเรียนการสอน"
      },
      {
        "id": "C",
        "text": "ข้อมูลชุดนี้ถูกรวบรวมมาผิดพลาดและจำเป็นต้องตัดยอดเขาลูกที่สองทิ้งทันที",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q5"
      },
      {
        "id": "D",
        "text": "ข้อมูลได้ผ่านการแปลงค่าด้วย Z-score Standardization มาอย่างสมบูรณ์แบบแล้ว",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q5"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w4-q06",
    "questionNumber": 5,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q6",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q6] สูตร Upper Fence ของ Boxplot",
    "scenario": "ตามเกณฑ์การตรวจหาค่าผิดปกติด้วย Boxplot ค่า Upper Fence ถูกคำนวณจากสูตรใด? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Median + (1.5 x IQR)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q6"
      },
      {
        "id": "B",
        "text": "Q3 + (3.0 x IQR)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q6"
      },
      {
        "id": "C",
        "text": "Q3 + (1.5 x IQR)",
        "isCorrect": true,
        "explanation": "ระวังสับสน: Q3 + 3.0×IQR คือเกณฑ์ \"extreme outlier\" ไม่ใช่ upper fence ปกติ / Q1 ใช้กับฝั่ง Lower Fence เท่านั้น"
      },
      {
        "id": "D",
        "text": "Q1 + (1.5 x IQR)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q6"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "inclass-w4-q07",
    "questionNumber": 6,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q7",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q7] แนวทางเมื่อพบ Observation นอก Fence",
    "scenario": "ในการทำ EDA เมื่อตรวจพบว่ามี Observation อยู่นอกแนว Fence ของ Boxplot ข้อใดคือแนวทางปฏิบัติที่ถูกต้องตามหลักวิชาการ? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "ปฏิบัติต่อค่านั้นเป็นเพียง Potential Outlier เพื่อทำการสืบค้นบริบทและสาเหตุก่อนตัดสินใจ",
        "isCorrect": true,
        "explanation": "เชื่อมกับ key learning เดิม: Outlier อาจเป็นค่าจริงที่สำคัญ ไม่ใช่ error เสมอไป — ห้ามลบ/แทนที่อัตโนมัติโดยไม่สืบค้นก่อน"
      },
      {
        "id": "B",
        "text": "เปลี่ยนค่าข้อมูลนั้นให้มีค่าเท่ากับค่าเฉลย (Mean) ของชุดข้อมูลโดยอัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q7"
      },
      {
        "id": "C",
        "text": "ทำการลบแถวข้อมูลนั้นออกจากชุดข้อมูลทันทีก่อนนำไปวิเคราะห์ต่อ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q7"
      },
      {
        "id": "D",
        "text": "ถือว่าค่านั้นเป็น Data Error ที่เกิดจากการพิมพ์ผิดเสมอและทำการแทนที่ด้วยค่า Median",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q7"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w4-q08",
    "questionNumber": 7,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q8",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q8] Color Palette สำหรับ Meaningful Midpoint",
    "scenario": "หากต้องการแสดงความเบี่ยงเบนของอุณหภูมิที่สูงกว่าหรือต่ำกว่าค่าเป้าหมายศูนย์กลาง (Meaningful Midpoint) การเลือก Color Palette รูปแบบใดตอบโจทย์การสื่อความหมายได้ดีที่สุด? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "Diverging Palette",
        "isCorrect": true,
        "explanation": "หลักทั่วไป: Sequential ใช้กับข้อมูลที่มีลำดับทิศทางเดียว (ต่ำ→สูง), Qualitative ใช้กับหมวดหมู่ไม่มีลำดับ, Diverging ใช้เมื่อมีจุดกึ่งกลางที่มีความหมาย (เช่น 0 หรือค่าเป้าหมาย) และต้องการแยกสองทิศทาง"
      },
      {
        "id": "B",
        "text": "Qualitative Palette",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q8"
      },
      {
        "id": "C",
        "text": "Monochrome Palette",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q8"
      },
      {
        "id": "D",
        "text": "Sequential Palette",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q8"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w4-q09",
    "questionNumber": 8,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q9",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q9] Correlation vs Causation",
    "scenario": "ข้อใดอธิบายความแตกต่างที่สำคัญระหว่างความสัมพันธ์แบบ Correlation และ Causation ได้อย่างถูกต้อง? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Correlation บ่งบอกถึงระดับและทิศทางการแปรผันร่วมกัน แต่ไม่ได้พิสูจน์ว่าเป็นเหตุเป็นผลต่อกัน",
        "isCorrect": true,
        "explanation": "เชื่อมกับ misconception ที่บันทึกไว้ก่อนหน้า (advisor_guide.md): \"Correlation สูง = ตัวแปรสำคัญ\" — จริงๆ อาจเป็น confounder หรือ leakage ก็ได้"
      },
      {
        "id": "B",
        "text": "Correlation พิสูจน์ว่าตัวแปรต้นเป็นสาเหตุที่ทำให้ตัวแปรตามเปลี่ยนแปลงเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q9"
      },
      {
        "id": "C",
        "text": "Causation ใช้อธิบายความสัมพันธ์ของข้อมูลเชิงคุณภาพ ส่วน Correlation ใช้กับข้อมูลอนุกรมเวลา",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q9"
      },
      {
        "id": "D",
        "text": "Causation สามารถสรุปได้ทันทีหากค่า Correlation Coefficient เข้าใกล้ 1.0 หรือ -1.0",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q9"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w4-q10",
    "questionNumber": 9,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q10",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q10] Accessibility Design สำหรับ Color Vision Deficiency",
    "scenario": "การออกแบบ Data Visualization ตามหลักความสามารถในการเข้าถึง (Accessibility) โดยเฉพาะสำหรับผู้มีภาวะตาบอดสี (Color Vision Deficiency) ควรใช้กลยุทธ์ใด? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "ใช้ชุดสีรุ้งที่มีความสดของสีสูงที่สุดในทุกกราฟ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q10"
      },
      {
        "id": "B",
        "text": "พึ่งพาการใช้สีแดงและสีเขียวคู่กันในการเน้นความต่างของข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q10"
      },
      {
        "id": "C",
        "text": "ใช้การเข้ารหัสข้อมูลแบบซ้ำซ้อน (Redundant Encoding) เช่น ผสานการใช้สีร่วมกับรูปทรง รูปร่างเส้น หรือข้อความกำกับ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W4-Q10 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "ตัวลวงที่อันตราย: ข้อ b (แดง-เขียว) เป็นคู่สีที่คนตาบอดสีชนิด red-green (พบบ่อยที่สุด) แยกไม่ออกพอดี — ตรงข้ามกับคำตอบที่ถูก"
      },
      {
        "id": "D",
        "text": "ลดขนาดของตัวอักษรและเส้นกราฟลงเพื่อเพิ่มพื้นที่ในการแสดงผลของสี",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q10"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w4-q11",
    "questionNumber": 10,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 EDA",
    "inClassCode": "W4-Q11",
    "week": "W4",
    "sourceType": "in-class",
    "title": "[W4-Q11] Responsible Group Comparison",
    "scenario": "ในการเปรียบเทียบข้อมูลพฤติกรรมระหว่างกลุ่มลูกค้า ข้อใดสะท้อนถึงการปฏิบัติอย่างรับผิดชอบต่อจริยธรรมและความเป็นส่วนตัวของข้อมูล (Responsible Group Comparison)? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "การตัดข้อมูลกลุ่มที่มี Missing Data สูงออกทั้งหมดโดยไม่ตรวจสอบรูปแบบความแตกต่างของการขาดหาย",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q11"
      },
      {
        "id": "B",
        "text": "การตรวจสอบว่ากลุ่มย่อยมีขนาดเล็กเกินไปจนเสี่ยงต่อการถูกระบุตัวตนรายบุคคล (Privacy Risk) หรือไม่ก่อนรายงานผล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W4-Q11 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "ข้อ a เป็นกับดักซ้อน: การลบ missing data ทิ้งดื้อๆ ก็เป็น misconception เดิมที่เคยบันทึกไว้ (ถ้าหายแบบ MNAR การลบทิ้งสร้าง bias) — ในข้อนี้ทั้ง a และ d ผิดจากมุมจริยธรรม/สถิติคนละมุม"
      },
      {
        "id": "C",
        "text": "การเลือกนำเสนอเฉพาะกลุ่มที่มีผลลัพธ์ตรงกับสมมติฐานทางธุรกิจที่ตั้งไว้ล่วงหน้า",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q11"
      },
      {
        "id": "D",
        "text": "การรายงานผลทันทีที่พบความแตกต่างโดยไม่ต้องตรวจสอบขนาดกลุ่มตัวอย่าง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W4-Q11"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w5-q01",
    "questionNumber": 11,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q1",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q1] บทบาทของ Modeling ใน CRISP-DS",
    "scenario": "จากกระบวนการ CRISP-DS Workflow ข้อใดกล่าวถึงบทบาทของขั้นตอน \"Modeling\" ได้ถูกต้องที่สุด? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "เป็นขั้นตอนหนึ่งในกระบวนการที่อาจส่งสัญญาณให้ต้องย้อนกลับไปปรับปรุง Data Prep หรือ EDA ก่อนหน้า",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W5-Q1 ที่เน้นย้ำในการเรียนการสอน"
      },
      {
        "id": "B",
        "text": "เป็นขั้นตอนสุดท้ายของโครงการก่อนปิดงาน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q1"
      },
      {
        "id": "C",
        "text": "เป็นขั้นตอนที่ใช้แทนกระบวนการ Business Understanding ได้ทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q1"
      },
      {
        "id": "D",
        "text": "เป็นขั้นตอนแบบ One-way Step ที่ไม่สามารถย้อนกลับไปแก้ไขขั้นตอนก่อนหน้าได้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q1"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q02",
    "questionNumber": 12,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q2",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q2] Descriptive Analytics ไม่ต้องใช้ ML",
    "scenario": "กรณีศึกษาหรือคำถามทางธุรกิจในข้อใด ไม่จำเป็นต้องสร้างตัวแบบ Machine Learning แต่สามารถใช้ Descriptive Analytics หรือการสรุปข้อมูลพื้นฐานได้? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "การประมาณการยอดใช้จ่ายล่วงหน้า 60 วันของลูกค้าใหม่",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q2"
      },
      {
        "id": "B",
        "text": "การจัดกลุ่มลูกค้าตามพฤติกรรมการซื้อที่คล้ายคลึงกัน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q2"
      },
      {
        "id": "C",
        "text": "เดือนที่แล้ว มูลค่าคำสั่งซื้อมัธยฐานของบริษัทมีค่าเท่าใด",
        "isCorrect": true,
        "explanation": "จุดที่นักศึกษาพลาดบ่อย: a, b, d ล้วนต้องพยากรณ์หรือจัดกลุ่มด้วยโมเดล ส่วน c เป็นแค่สถิติสรุป (median) จากข้อมูลที่มีอยู่แล้ว ไม่ต้อง fit โมเดลใดๆ"
      },
      {
        "id": "D",
        "text": "ลูกค้าคนใดมีแนวโน้มที่จะยกเลิกบริการในเดือนหน้า",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q2"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q03",
    "questionNumber": 13,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q3",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q3] Trained Model คืออะไร",
    "scenario": "หากต้องการแก้ปัญหา \"ลูกค้าคนใดเสี่ยงหยุดซื้อ\" แล้วเลือกใช้ Supervised Learning ทำงานประเภท Classification โดยเลือกวิธีการ \"Decision Tree\" ข้อใดคือ \"Trained Model\"? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "Fitted Decision Tree ที่ได้จากการ Train",
        "isCorrect": true,
        "explanation": "จุดที่นักศึกษาพลาดบ่อย: สับสนระหว่าง Algorithm (c, สูตร/วิธีการที่ยังไม่ได้ train) กับ Trained Model (a, fit กับข้อมูลจริงแล้ว)"
      },
      {
        "id": "B",
        "text": "ความต้องการทางธุรกิจ (Business Need)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q3"
      },
      {
        "id": "C",
        "text": "Algorithm ของ Decision Tree",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q3"
      },
      {
        "id": "D",
        "text": "Supervised Learning Setting",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q3"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q04",
    "questionNumber": 14,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q4",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q4] Feature vs Target vs Output",
    "scenario": "ในการสร้างโมเดลเพื่อทำนายว่า \"ลูกค้าจะหยุดซื้อสินค้าภายใน 60 วันหรือไม่\" ข้อใดจัดเป็น Feature ของโมเดล?",
    "options": [
      {
        "id": "A",
        "text": "ลูกค้าแต่ละคน ณ วัน Observation Date",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q4"
      },
      {
        "id": "B",
        "text": "สถานะการหยุดซื้อหรือไม่หยุดซื้อภายใน 60 วันข้างหน้า",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q4"
      },
      {
        "id": "C",
        "text": "ค่าความถี่การสั่งซื้อในอดีตและระยะเวลาจากการซื้อล่าสุดของลูกค้า",
        "isCorrect": true,
        "explanation": "จุดที่นักศึกษาพลาดบ่อย: b คือ Target/Label, d คือ Output/Prediction, a คือหน่วยสังเกต (observation unit) ไม่ใช่feature — c (recency/frequency) คือ feature ที่แท้จริง"
      },
      {
        "id": "D",
        "text": "ความน่าจะเป็นที่โมเดลคำนวณออกมาเป็นผลลัพธ์",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q4"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q05",
    "questionNumber": 15,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q5",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q5] Supervised vs Unsupervised",
    "scenario": "สิ่งสำคัญที่สุดที่ใช้แบ่งแยกระหว่าง \"Supervised Learning\" และ \"Unsupervised Learning\" คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ความซับซ้อนของคอมพิวเตอร์ที่ใช้ประมวลผล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q5"
      },
      {
        "id": "B",
        "text": "จำนวนข้อมูลตัวอย่าง (Sample Size)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q5"
      },
      {
        "id": "C",
        "text": "การมีอยู่ของ Target (Label) ที่ทราบค่าเพื่อใช้สอนตัวแบบ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W5-Q5 ที่เน้นย้ำในการเรียนการสอน"
      },
      {
        "id": "D",
        "text": "การมีโปรแกรมเมอร์คอยเฝ้าสังเกตการณ์ขณะฝึกฝนโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q5"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q06",
    "questionNumber": 16,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q6",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q6] Regression vs Classification vs Clustering",
    "scenario": "โครงการ Data Science หนึ่งมีคำถามว่า \"เดือนหน้าลูกค้าแต่ละรายจะมียอดใช้จ่ายกี่บาท?\" จัดเป็น Modeling Task ประเภทใด และเพราะเหตุใด?",
    "options": [
      {
        "id": "A",
        "text": "Regression เพราะผลลัพธ์ (Target) เป็นค่าตัวเลขต่อเนื่อง (Numerical)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W5-Q6 ที่เน้นย้ำในการเรียนการสอน"
      },
      {
        "id": "B",
        "text": "Clustering เพราะไม่มี Target ที่แน่นอนในอนาคต",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q6"
      },
      {
        "id": "C",
        "text": "Classification เพราะต้องการจัดกลุ่มลูกค้าตามระดับเงิน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q6"
      },
      {
        "id": "D",
        "text": "Association เพราะเป็นการหาความเกี่ยวเนื่องของสินค้า",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q6"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q07",
    "questionNumber": 17,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q7",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q7] Descriptive Modeling ด้วย Clustering",
    "scenario": "หากทีม Data Science ต้องการสร้างระบบแนะนำกลุ่มลูกค้าที่มีความสนใจสินค้าใกล้เคียงกัน โดยที่ธุรกิจไม่มีการติดป้ายชื่อกลุ่มไว้ล่วงหน้า (No Label) ควรเลือกใช้แนวทางและเทคนิคใดจึงจะถูกต้องที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "Semi-supervised Learning เพื่อทำ Binary Classification",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q7"
      },
      {
        "id": "B",
        "text": "Supervised Learning โดยใช้ Regression ประมาณค่ายอดซื้อ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q7"
      },
      {
        "id": "C",
        "text": "Predictive Modeling โดยใช้ Classification ด้วย Decision Tree",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q7"
      },
      {
        "id": "D",
        "text": "Descriptive Modeling โดยใช้ Clustering เพื่อจัดกลุ่มตามความคล้ายคลึง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W5-Q7 ที่เน้นย้ำในการเรียนการสอน"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q08",
    "questionNumber": 18,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q8",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q8] เหตุผลของ Baseline Model",
    "scenario": "ตามหลักการพัฒนาโมเดลที่ดี เหตุผลใดจึงแนะนำให้เริ่มต้นด้วย \"Simple Baseline Model\" (เช่น Logistic Regression) ก่อนขยับไปใช้อัลกอริทึมที่ซับซ้อนขึ้น?",
    "options": [
      {
        "id": "A",
        "text": "เพราะอัลกอริทึมแบบเรียบง่ายให้ค่า Accuracy สูงที่สุดเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q8"
      },
      {
        "id": "B",
        "text": "เพื่อลดขั้นตอนไม่ต้องประเมินผลตัวแบบกับ Test Data",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q8"
      },
      {
        "id": "C",
        "text": "เพราะ AI ไม่สามารถเสนออัลกอริทึมที่ซับซ้อนให้ได้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q8"
      },
      {
        "id": "D",
        "text": "เพื่อสร้างจุดอ้างอิงและวัดผลว่าอัลกอริทึมที่ซับซ้อนกว่าให้ประโยชน์คุ้มค่าหรือไม่",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W5-Q8 ที่เน้นย้ำในการเรียนการสอน"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w5-q09",
    "questionNumber": 19,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q9",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q9] Train / Validation / Test Split",
    "scenario": "การแบ่งข้อมูลออกเป็น \"Training Data\", \"Validation Data\" และ \"Test Data\" มีจุดประสงค์ตามข้อใดอย่างถูกต้องที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "ใช้สลับกันได้อย่างอิสระโดยไม่ส่งผลต่อการประเมินโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q9"
      },
      {
        "id": "B",
        "text": "เก็บข้อมูลทุกส่วนไว้เรียนรู้พารามิเตอร์พร้อมกันเพื่อเพิ่มความแม่นยำ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q9"
      },
      {
        "id": "C",
        "text": "Validation Data ใช้ตรวจสอบขั้นสุดท้าย และ Test Data ใช้จูน Hyperparameters",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q9"
      },
      {
        "id": "D",
        "text": "Training Data ใช้เรียนรู้พารามิเตอร์, Validation Data ใช้ช่วยตัดสินใจระหว่างพัฒนา, และ Test Data ใช้ตรวจสอบขั้นสุดท้ายด้วยหลักฐานอิสระ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W5-Q9 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "จุดที่นักศึกษาพลาดบ่อย: c สลับหน้าที่ของ Validation กับ Test กัน — เป็นตัวลวงที่พบบ่อยที่สุดของข้อนี้"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w5-q10",
    "questionNumber": 20,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 Modeling",
    "inClassCode": "W5-Q10",
    "week": "W5",
    "sourceType": "in-class",
    "title": "[W5-Q10] Overfitting",
    "scenario": "เมื่อนำตัวแบบไปวัดผล พบว่าตัวแบบได้ผลการทำนายบน Training Data สูงมาก (Accuracy เกือบ 100%) แต่เมื่อทดสอบกับ Unseen Data (Test Data) ผลการทำนายกลับลดต่ำลงอย่างมาก ปัญหานี้เรียกว่าอะไรและเกิดจากสาเหตุใด?",
    "options": [
      {
        "id": "A",
        "text": "Overfitting เกิดจากการที่โมเดลจดจำรายละเอียดเฉพาะของ Training Data มากเกินไปจนไม่ถ่ายโอนสู่ข้อมูลใหม่",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W5-Q10 ที่เน้นย้ำในการเรียนการสอน"
      },
      {
        "id": "B",
        "text": "Data Imbalance เกิดจากการไม่มีข้อมูล Target",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q10"
      },
      {
        "id": "C",
        "text": "Normalization Error เกิดจากการไม่ได้สเกลข้อมูลเชิงตัวเลข",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q10"
      },
      {
        "id": "D",
        "text": "Underfitting เกิดจากโมเดลเรียนรู้โครงสร้างที่มีประโยชน์น้อยเกินไป",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W5-Q10"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q02",
    "questionNumber": 21,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q2",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q2] Evaluation ไม่ผ่านเกณฑ์ทำอย่างไรต่อ",
    "scenario": "ในกระบวนการ CRISP-DS หากผลลัพธ์ในขั้นตอน Evaluation พบว่าหลักฐานยังไม่เพียงพอหรือไม่สนับสนุนเป้าหมาย ข้อใดอธิบายการทำงานในลำดับถัดไปได้ถูกต้องที่สุด? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "ต้องยุติโครงการทันทีและไม่สามารถดำเนินการต่อได้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q2"
      },
      {
        "id": "B",
        "text": "ดำเนินการจูน Hyperparameters ซ้ำบน Test Data จนกว่าค่าคะแนนจะผ่านเกณฑ์",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q2"
      },
      {
        "id": "C",
        "text": "เป็น Feedback Loop ที่ส่งสัญญาณให้ย้อนกลับไปทบทวนโจทย์ ปรับแต่งข้อมูล หรือปรับโมเดลใหม่",
        "isCorrect": true,
        "explanation": "เชื่อมกับหลักเดิม: Evaluation เป็น Decision Point แบบ \"Revise\" ที่เจอมาแล้วใน week 1 ข้อ 8 — หลักการเดียวกัน ย้ำอีกครั้งในบริบท Decision Tree",
        "distractorTrap": "ตัวลวงอันตราย: b ฟังดูสมเหตุผล (จูนจนผ่าน) แต่ผิดร้ายแรงเพราะ \"จูนบน Test Data\" คือ data leakage / overfitting to test set — Test Data ต้องเป็นหลักฐานอิสระเท่านั้น"
      },
      {
        "id": "D",
        "text": "บังคับให้ข้ามไปยังขั้นตอน Deployment ทันทีเพื่อทดสอบกับผู้ใช้งานจริง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q2"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w6-q03",
    "questionNumber": 22,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q3",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q3] เกณฑ์การแตกกิ่งของ Decision Tree",
    "scenario": "ในการแตกกิ่ง (Splitting) ของ Decision Tree สำหรับโจทย์ Classification ตัวแบบใช้อะไรเป็นเกณฑ์ในการเลือก Feature และ Threshold ณ แต่ละ Node? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "เลือกแบบ Greedy โดยหาคู่ Feature และ Threshold ที่ลด Impurity (เช่น ค่า Weighted Gini ต่ำสุด) ณ Node นั้น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W6-Q3 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "จุดที่นักศึกษาพลาดบ่อย: Decision Tree เป็น Greedy algorithm ตัดสินใจทีละ Node ไม่รับประกัน Global Optimum ทั้งต้น (ตัวลวง b)"
      },
      {
        "id": "B",
        "text": "เลือกเงื่อนไขที่ทำให้โมเดลเกิด Global Optimum ในภาพรวมทั้งต้นเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q3"
      },
      {
        "id": "C",
        "text": "สุ่มค่า Threshold ไปเรื่อย ๆ จนกระทั่งข้อมูลใน Node มีค่าเฉลี่ยเป็นศูนย์",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q3"
      },
      {
        "id": "D",
        "text": "เลือกตามลำดับของคอลัมน์ที่ปรากฏในชุดข้อมูล Training",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q3"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w6-q04",
    "questionNumber": 23,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q4",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q4] โครงสร้างจุดสิ้นสุดของ Decision Tree",
    "scenario": "โครงสร้างส่วนใดของ Decision Tree ที่ทำหน้าที่เป็น \"จุดสิ้นสุด\" ของเส้นทางการตัดสินใจและให้ผลลัพธ์เป็น Predicted Class? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "Internal Node",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q4"
      },
      {
        "id": "B",
        "text": "Branch",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q4"
      },
      {
        "id": "C",
        "text": "Root Node",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q4"
      },
      {
        "id": "D",
        "text": "Leaf Node",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W6-Q4 ที่เน้นย้ำในการเรียนการสอน"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q05",
    "questionNumber": 24,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q5",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q5] ผลของ Unrestricted Tree",
    "scenario": "หากปล่อยให้ Decision Tree เติบโตโดยไม่กำหนดเงื่อนไขหยุดการเติบโต (Unrestricted Tree) จะส่งผลต่อตัวแบบอย่างไร? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "เกิด Bias สูง และเสี่ยงต่อการเกิด Underfitting",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q5"
      },
      {
        "id": "B",
        "text": "ตัวแบบมี Training Accuracy ใกล้ 100% แต่มีความเสี่ยงสูงมากที่จะเกิด Overfitting",
        "isCorrect": true,
        "explanation": "เชื่อมกับ week 5 ข้อ 10 (Overfitting) — หลักการเดียวกัน คือโมเดลจดจำ Training Data มากเกินไป ในที่นี้สาเหตุคือปล่อยให้ต้นไม้ลึกไม่จำกัด"
      },
      {
        "id": "C",
        "text": "โมเดลจะมีความคงทน (Low Variance) สูงมากเมื่อนำไปทดสอบกับข้อมูลชุดใหม่",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q5"
      },
      {
        "id": "D",
        "text": "ความลึกของต้นไม้ (Tree Depth) จะลดลงตามจำนวนข้อมูลที่เพิ่มขึ้น",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q5"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q06",
    "questionNumber": 25,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q6",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q6] เลือก max_depth จากหลักฐานใด",
    "scenario": "การควบคุมความซับซ้อนของ Decision Tree ด้วยการกำหนด max_depth ควรตัดสินใจเลือกค่าที่เหมาะสมที่สุดโดยอิงจากหลักฐานในข้อใด? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "เลือกค่าที่ให้ผลลัพธ์ประสิทธิภาพบน Validation Data ดีที่สุด",
        "isCorrect": true,
        "explanation": "จุดที่นักศึกษาพลาดบ่อย: d สลับหน้าที่ Validation กับ Test แบบเดียวกับ week 5 ข้อ 9 — Validation ใช้ตัดสินใจ/จูนระหว่างพัฒนา, Test ใช้ตรวจสอบขั้นสุดท้ายเท่านั้น ห้ามใช้ Test มาเลือกไฮเปอร์พารามิเตอร์"
      },
      {
        "id": "B",
        "text": "เลือกค่าที่ทำให้ได้ Training Accuracy สูงสุด 100%",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q6"
      },
      {
        "id": "C",
        "text": "เลือกค่าความลึกที่น้อยที่สุดเสมอเพื่อประหยัดพื้นที่หน่วยความจำ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q6"
      },
      {
        "id": "D",
        "text": "ทดสอบหลาย ๆ ค่าบน Test Data แล้วเลือกค่าที่ทำคะแนนบน Test Data ได้ดีที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q6"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q07",
    "questionNumber": 26,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q7",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q7] อาการ Train สูง Validation ต่ำ",
    "scenario": "ในการตรวจสอบผลการเรียนรู้ของโมเดล หากพบว่าประสิทธิภาพบน Training Data อยู่ในเกณฑ์สูงมาก แต่ประสิทธิภาพบน Validation Data ต่ำกว่าอย่างเห็นได้ชัด รูปแบบนี้บ่งชี้ถึงปัญหาใด? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Missing Values ในขั้นตอน Data Preparation",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q7"
      },
      {
        "id": "B",
        "text": "Overfitting เพราะโมเดลจดจำรายละเอียดเฉพาะของ Training Data มากเกินไป",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W6-Q7 ที่เน้นย้ำในการเรียนการสอน"
      },
      {
        "id": "C",
        "text": "Underfitting เพราะต้นไม้ง่ายเกินไป",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q7"
      },
      {
        "id": "D",
        "text": "Appropriate Fit เพราะโมเดลจดจำข้อมูลสอนได้ดี",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q7"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q08",
    "questionNumber": 27,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q8",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q8] ทำไม Accuracy เดียวใช้ประเมิน Class Imbalance ไม่ได้",
    "scenario": "ในกรณีที่ชุดข้อมูลมีปัญหา Class Imbalance (เช่น ลูกค้าส่วนใหญ่ 95% ยัง Active) เหตุใดการพิจารณาเพียงค่า \"Accuracy\" เพียงอย่างเดียวจึงทำให้การประเมินผิดพลาดได้? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "เพราะค่า Accuracy จะมีค่าติดลบเสมอเมื่อข้อมูลไม่สมดุล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q8"
      },
      {
        "id": "B",
        "text": "เพราะโมเดลที่ทายว่าทุกคน Active (Majority-class Baseline) จะได้ Accuracy สูงถึง 95% ทั้งที่ค้นหากลุ่มเสี่ยงไม่เจอเลย",
        "isCorrect": true,
        "explanation": "เชื่อมกับหลักการ Baseline Model (week 5 ข้อ 8) — Majority-class baseline คือ baseline ที่ง่ายที่สุด ถ้าโมเดลจริงแพ้ baseline นี้ในการหากลุ่มเสี่ยง แปลว่า Accuracy เพียงตัวเดียวหลอกได้"
      },
      {
        "id": "C",
        "text": "เพราะค่า Accuracy ไม่สามารถคำนวณจาก Confusion Matrix ได้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q8"
      },
      {
        "id": "D",
        "text": "เพราะค่า Accuracy จะแปรผันตามจำนวนรอบของการทำนายเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q8"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q09",
    "questionNumber": 28,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q9",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q9] เลือก Metric ตามข้อจำกัดทางธุรกิจ (ทีมงาน/ต้นทุนจำกัด)",
    "scenario": "ในโจทย์ทำนายลูกค้าที่จะเลิกใช้บริการ (Inactive = Positive Class) หากฝ่ายธุรกิจมี \"ทีมงานติดต่อลูกค้าที่จำกัดมาก\" และ \"ค่าใช้จ่ายในการยื่นข้อเสนอต่อครั้งสูงมาก\" ควรเน้นปรับปรุงและสื่อสารด้วย Metric ใดเป็นหลัก? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "Accuracy เพื่อยืนยันความแม่นยำรวม",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q9"
      },
      {
        "id": "B",
        "text": "Precision เพื่อลดการติดต่อไปยังลูกค้าที่ยังคงใช้งานอยู่ (ลด False Positive)",
        "isCorrect": true,
        "explanation": "หลักการเลือก metric: ทรัพยากรจำกัด + ต้นทุนต่อการติดต่อสูง → ทุก False Positive (ติดต่อลูกค้าที่ไม่ได้เสี่ยงจริง) คือต้นทุนที่เสียเปล่า จึงต้องเน้น Precision ไม่ใช่ Recall (ซึ่งจะเหมาะกับสถานการณ์ที่พลาดลูกค้าเสี่ยงแพงกว่าการติดต่อเกิน)"
      },
      {
        "id": "C",
        "text": "Gini Impurity เพื่อแสดงความลึกของต้นไม้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q9"
      },
      {
        "id": "D",
        "text": "Recall เพื่อตามเก็บลูกค้ากลุ่มเสี่ยงให้ครบที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q9"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q10",
    "questionNumber": 29,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q10",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q10] ผลของ False Negative ในบริบทจริง",
    "scenario": "จากตัวอย่างการจำแนกความพร้อมของนักกีฬา (Positive Class = พร้อมลงเล่น/play) หากโมเดลทำนายผิดพลาดแบบ \"False Negative (FN)\" จะส่งผลกระทบต่อการตัดสินใจของทีมอย่างไร? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "เพิ่มโอกาสให้นักกีฬาเกิดอาการบาดเจ็บซ้ำ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q10"
      },
      {
        "id": "B",
        "text": "พลาดการส่งนักกีฬาที่มีความพร้อมลงสนาม ทั้งที่จริง ๆ เขามีฟอร์มพร้อมเล่น",
        "isCorrect": true,
        "explanation": "จุดที่นักศึกษาพลาดบ่อย: a และ d เป็นผลของ False Positive (ทำนายว่าพร้อม/positive ทั้งที่จริงไม่พร้อม) ไม่ใช่ False Negative — ต้องแยกทิศทางความผิดพลาดให้ตรงกับ Positive Class ที่โจทย์กำหนด (ในที่นี้ Positive = play)"
      },
      {
        "id": "C",
        "text": "ทำให้การประเมินค่า Accuracy ของระบบสูงเกินจริง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q10"
      },
      {
        "id": "D",
        "text": "ส่งนักกีฬาที่ยังไม่พร้อมลงไปแข่งขันในสนาม",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q10"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w6-q11",
    "questionNumber": 30,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 Decision Tree",
    "inClassCode": "W6-Q11",
    "week": "W6",
    "sourceType": "in-class",
    "title": "[W6-Q11] หลักความรับผิดชอบในการสื่อสารผล Evaluation",
    "scenario": "ในการนำเสนอและสื่อสารผลการประเมินตัวแบบขั้นสุดท้าย (Evaluation & Communication) ข้อใดคือแนวปฏิบัติที่ถูกต้องและมีความรับผิดชอบต่อผู้มีส่วนได้ส่วนเสีย? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "เลือกเปลี่ยนความหมายของ Positive Class ไปเรื่อย ๆ จนกว่าจะได้ตัวเลขการประเมินที่ดูดี",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q11"
      },
      {
        "id": "B",
        "text": "นำเสนอเฉพาะค่าคะแนนที่สูงที่สุด และไม่เปิดเผยข้อจำกัดของโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q11"
      },
      {
        "id": "C",
        "text": "สื่อสารทั้งผลการประเมินเชิงประจักษ์ ความหมายของความผิดพลาด (Trade-offs) และข้อจำกัดของโมเดลเพื่อประกอบการตัดสินใจ",
        "isCorrect": true,
        "explanation": "เชื่อมกับหลักเดิม: week 3 ข้อ 10 (Code ทำงาน ≠ Feature พร้อมใช้ — ต้องบันทึก Limitations) และ week 4 ข้อ 11 (Responsible Group Comparison) — ธีมความรับผิดชอบ/ความโปร่งใสซ้ำมาตลอดวิชา ⚠ หมายเหตุ QA: ชุดคำถามนี้ (10 ข้อ) คำตอบถูกตกที่ตัวเลือก c ถึง 5/10 ข้อ (50%, เกินเกณฑ์ 35%) — ถ้าจะใช้สอบจริงกับนักศึกษา ควรสลับตำแหน่งตัวเลือกใหม่เพื่อลด position bias"
      },
      {
        "id": "D",
        "text": "รับรองว่าผลลัพธ์บน Test Data จะเป็นความถูกต้องแน่นอนในทุกสถานการณ์ของอนาคต",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W6-Q11"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q02",
    "questionNumber": 31,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q2",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q2] No Target/Label → เลือกวิธีวิเคราะห์แบบใด (CLO1)",
    "scenario": "No Target/Label → เลือกวิธีวิเคราะห์แบบใด (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Data Clustering",
        "isCorrect": true,
        "explanation": "ยืนยันจากสไลด์หน้า 4: \"ถ้า Classification คือรู้ผลเฉลย categories อยู่ก่อนแล้ว Clustering คือไม่มีผลเฉลยใดๆเลย\""
      },
      {
        "id": "B",
        "text": "Classification",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q2"
      },
      {
        "id": "C",
        "text": "Linear Regression",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q2"
      },
      {
        "id": "D",
        "text": "Supervised Learning",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q2"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q03",
    "questionNumber": 32,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q3",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q3] เป้าหมายของ Good Clustering (CLO1)",
    "scenario": "เป้าหมายของ Good Clustering (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Maximize ทั้ง Intra-cluster similarity และ Inter-cluster similarity",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q3"
      },
      {
        "id": "B",
        "text": "Minimize ทั้ง Intra-cluster similarity และ Inter-cluster similarity",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q3"
      },
      {
        "id": "C",
        "text": "Minimize Intra-cluster similarity และ Maximize Inter-cluster similarity",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q3"
      },
      {
        "id": "D",
        "text": "Maximize Intra-cluster similarity และ Minimize Inter-cluster similarity",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W7-Q3 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "ยืนยันจากสไลด์หน้า 10 ตัวลวงอันตราย: a และ b ฟังดูสมมาตรน่าเชื่อ (Maximize/Minimize ทั้งคู่พร้อมกัน) แต่ผิด — ทิศทางจริงตรงข้ามกัน คนละแกน"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w7-q04",
    "questionNumber": 33,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q4",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q4] เหตุผลที่ต้องทำ Feature Scaling ก่อน Distance-based Clustering (CLO2)",
    "scenario": "เหตุผลที่ต้องทำ Feature Scaling ก่อน Distance-based Clustering (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "เพื่อป้องกันไม่ให้ตัวแปร Spending ที่มีค่าขนาดใหญ่กว่าครอบงำการคำนวณระยะห่างทั้งหมด",
        "isCorrect": true,
        "explanation": "ยังไม่ยืนยันตรงจากสไลด์บรรยายที่ 8 (หลักการทั่วไปของ Distance-based algorithm สอดคล้องกับสูตรระยะห่างหน้า 12-15) — ควรตรวจสอบเพิ่มก่อนใช้จริง"
      },
      {
        "id": "B",
        "text": "เพื่อกำจัดข้อมูลที่เป็น Outliers ออกจากชุดข้อมูลทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q4"
      },
      {
        "id": "C",
        "text": "เพื่อช่วยให้โมเดลสามารถคำนวณหาค่าเฉลี่ย Mean ของข้อมูลได้โดยอัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q4"
      },
      {
        "id": "D",
        "text": "เพื่อเปลี่ยนตัวแปรแบบตัวเลขให้กลายเป็นตัวแปรเชิงกลุ่ม",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q4"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q05",
    "questionNumber": 34,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q5",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q5] Manhattan Distance ระหว่าง A(2,5) กับ Centroid(1,2) (CLO2)",
    "scenario": "Manhattan Distance ระหว่าง A(2,5) กับ Centroid(1,2) (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "7",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q5"
      },
      {
        "id": "B",
        "text": "4",
        "isCorrect": true,
        "explanation": "คำนวณตรง: |2-1| + |5-2| = 1+3 = 4 ตรงกับรูปแบบสูตรในสไลด์หน้า 26-28"
      },
      {
        "id": "C",
        "text": "3",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q5"
      },
      {
        "id": "D",
        "text": "5",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q5"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q06",
    "questionNumber": 35,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q6",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q6] หลัง Assignment แล้ว ขั้นตอนถัดไปของ K-Means คือ (CLO2)",
    "scenario": "หลัง Assignment แล้ว ขั้นตอนถัดไปของ K-Means คือ (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "สุ่มตำแหน่งของ Centroid ใหม่ทั้งหมดในพื้นที่ข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q6"
      },
      {
        "id": "B",
        "text": "คำนวณค่าเฉลี่ย (Mean) ของสมาชิกในแต่ละกลุ่ม เพื่อกำหนดเป็นตำแหน่ง Centroid ใหม่",
        "isCorrect": true,
        "explanation": "ยืนยันจากสไลด์หน้า 19-24 (Method ขั้นที่ 3)"
      },
      {
        "id": "C",
        "text": "หยุดการทำงานของอัลกอริทึมทันทีโดยไม่ต้องตรวจการเปลี่ยนแปลง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q6"
      },
      {
        "id": "D",
        "text": "นำจุดข้อมูลที่มีระยะห่างมากที่สุดออกจากคลัสเตอร์",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q6"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q07",
    "questionNumber": 36,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q7",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q7] Centroid ใหม่ของกลุ่ม 5 จุด: (8,4)(5,8)(7,5)(6,4)(4,9) (CLO2)",
    "scenario": "Centroid ใหม่ของกลุ่ม 5 จุด: (8,4)(5,8)(7,5)(6,4)(4,9) (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "(6.5, 5.5)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q7"
      },
      {
        "id": "B",
        "text": "(5.0, 5.0)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q7"
      },
      {
        "id": "C",
        "text": "(6.0, 6.0)",
        "isCorrect": true,
        "explanation": "ตรงกับตัวอย่าง Cluster 2 ในสไลด์หน้า 29 ทุกตัวเลขเป๊ะ: ((8+5+7+6+4)/5, (4+8+5+4+9)/5) = (6,6)"
      },
      {
        "id": "D",
        "text": "(7.0, 6.0)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q7"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q08",
    "questionNumber": 37,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q8",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q8] ข้อจำกัดสำคัญของ K-Means (CLO1)",
    "scenario": "ข้อจำกัดสำคัญของ K-Means (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "ไม่สามารถใช้กับข้อมูลเชิงตัวเลข (Continuous Data) ได้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q8"
      },
      {
        "id": "B",
        "text": "ไม่สามารถคำนวณระยะห่างด้วยวิธี Euclidean Distance ได้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q8"
      },
      {
        "id": "C",
        "text": "ไวต่อข้อมูลผิดปกติ (Outliers) และมักติดปัญหา Local Optimum ขึ้นกับจุดเริ่มต้น (Initialization)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W7-Q8 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "ตัวลวงอันตราย: d ผิดตรงข้ามกับสไลด์หน้า 33 ซึ่งระบุว่า K-Means \"Relatively efficient\" O(tkn) — ความเร็วเป็นจุดแข็ง ไม่ใช่จุดด้อย จุดด้อยจริงคือ Outlier sensitivity และ Local optimum"
      },
      {
        "id": "D",
        "text": "โมเดลทำงานช้ามากและมี Time Complexity สูงเกินกว่าจะใช้กับ Big Data",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q8"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w7-q09",
    "questionNumber": 38,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q9",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q9] เกณฑ์การเลือก K ด้วย Elbow Method (CLO1)",
    "scenario": "เกณฑ์การเลือก K ด้วย Elbow Method (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "เลือกค่า K ที่มีจำนวนกลุ่มมากที่สุดเท่าที่จะเป็นไปได้เพื่อเพิ่มความละเอียด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q9"
      },
      {
        "id": "B",
        "text": "เลือกค่า K ที่ทำให้ระยะห่างระหว่าง Centroid มีค่าน้อยที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q9"
      },
      {
        "id": "C",
        "text": "เลือกค่า K ณ จุดหักของกราฟที่หลังจากจุดนั้นอัตราการลดลงของ Inertia เริ่มลดน้อยลงอย่างชัดเจน",
        "isCorrect": true,
        "explanation": "กราฟ Elbow อยู่หน้า 30-32 แต่เป็นภาพที่ไม่ถูกแปลงเป็นข้อความในไฟล์ที่ตรวจสอบ — คำตอบยืนยันจากหลักการมาตรฐานของ Elbow Method ไม่ใช่จากข้อความสไลด์โดยตรง ควรเปิดภาพหน้า 30-32 ยืนยันซ้ำก่อนใช้จริง"
      },
      {
        "id": "D",
        "text": "เลือกค่า K ที่ทำให้ค่า Inertia (WCSS) ลดลงเหลือศูนย์พอดี",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q9"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q10",
    "questionNumber": 39,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q10",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q10] Silhouette Score เข้าใกล้ 1 หมายถึง (CLO2)",
    "scenario": "Silhouette Score เข้าใกล้ 1 หมายถึง (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "การจัดกลุ่มล้มเหลวเพราะจุดข้อมูลถูกจัดเข้ากลุ่มผิด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q10"
      },
      {
        "id": "B",
        "text": "จุดข้อมูลอยู่ก้ำกึ่งตรงแนวทับซ้อนระหว่างสองกลุ่ม",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q10"
      },
      {
        "id": "C",
        "text": "การจัดกลุ่มมีคุณภาพดี โดยจุดข้อมูลอยู่ใกล้สมาชิกในกลุ่มตนเองและอยู่ห่างจากกลุ่มอื่นมาก",
        "isCorrect": true,
        "explanation": "ยืนยันจากสไลด์หน้า 36: \"ค่าอยู่ระหว่าง -1 ถึง 1 (ใกล้ 1 = clustering ดี)\""
      },
      {
        "id": "D",
        "text": "ค่าความแปรปรวนภายในกลุ่มมีค่าสูงกว่าระยะห่างระหว่างกลุ่ม",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q10"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w7-q11",
    "questionNumber": 40,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 K-Means",
    "inClassCode": "W7-Q11",
    "week": "W7",
    "sourceType": "in-class",
    "title": "[W7-Q11] Responsible Clustering หลังได้ Cluster 0/1/2 (CLO3)",
    "scenario": "Responsible Clustering หลังได้ Cluster 0/1/2 (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "สรุปว่าโมเดลพร้อมใช้งานทันทีเมื่อ K-Means เกิด Convergence โดยไม่ต้องผ่านการประเมินด้านคุณค่าทางธุรกิจ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q11"
      },
      {
        "id": "B",
        "text": "นำ Cluster ID ไปสรุปเป็นประเภทบุคคลแบบตายตัวทันทีโดยไม่ต้องตรวจสอบคุณลักษณะ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q11"
      },
      {
        "id": "C",
        "text": "ทำ Cluster Profiling เพื่อเปรียบเทียบพฤติกรรมของแต่ละกลุ่ม แล้วจึงแปลงเป็น Persona และแนวทางตัดสินใจที่สอดคล้องกับบริบททางธุรกิจ",
        "isCorrect": true,
        "explanation": "เชื่อมกับหลักเดิม: ธีมเดียวกับ week 6 ข้อ 11 (Responsible Evaluation & Communication) — Cluster ID เป็นแค่ตัวเลข ต้องผ่าน Profiling และตีความเชิงธุรกิจก่อนนำไปตัดสินใจจริง ⚠ หมายเหตุ QA: ชุดคำถามนี้ (10 ข้อ) คำตอบถูกตกที่ตัวเลือก c ถึง 4/10 ข้อ (40%, เกินเกณฑ์ 35%) — ควรสลับตำแหน่งตัวเลือกใหม่ก่อนใช้สอบจริง"
      },
      {
        "id": "D",
        "text": "ใช้โมเดลนี้ตัดสินใจอนุมัติหรือปฏิเสธสิทธิ์ของลูกค้าทันทีโดยไม่เปิดเผยเกณฑ์ของฟีเจอร์ที่ใช้จัดกลุ่ม",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W7-Q11"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w8-q02",
    "questionNumber": 41,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q2",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q2] Accuracy 84% ทำไมยังไม่อนุมัติให้ส่งข้อเสนออัตโนมัติทันที (CLO3)",
    "scenario": "Accuracy 84% ทำไมยังไม่อนุมัติให้ส่งข้อเสนออัตโนมัติทันที (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "เพราะต้องรอให้ผลลัพธ์ Accuracy สูงถึง 100% เท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q2"
      },
      {
        "id": "B",
        "text": "เพราะขั้นตอนของ CRISP-DS ห้ามไม่ให้มีขั้นตอนการส่งข้อเสนออัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q2"
      },
      {
        "id": "C",
        "text": "เพราะคะแนนภาพรวมอาจบดบังประสิทธิภาพที่ต่ำในกลุ่มย่อย และยังไม่ได้ตรวจการอธิบายผล ผลกระทบ และจริยธรรม",
        "isCorrect": true,
        "explanation": "ยืนยันตรงจากสไลด์หน้า 4: Accuracy รวม 84% แต่ Recall ลูกค้ากลุ่มใหม่เพียง 54% — คะแนนรวมเป็นแค่ \"หลักฐานหนึ่งในแฟ้มตัดสินใจ\" ต้องเปิดตรวจ Explain / Evaluate / Communicate ก่อน"
      },
      {
        "id": "D",
        "text": "เพราะโมเดลจำเป็นต้องเปลี่ยนไปใช้วิธี Unsupervised Learning เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q2"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w8-q03",
    "questionNumber": 42,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q3",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q3] ผู้บริหารอยากรู้ปัจจัยที่โมเดลพึ่งพามากที่สุดในภาพรวมทั้งบริษัท → ใช้ XAI ระดับใด (CLO1)",
    "scenario": "ผู้บริหารอยากรู้ปัจจัยที่โมเดลพึ่งพามากที่สุดในภาพรวมทั้งบริษัท → ใช้ XAI ระดับใด (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Global Explanation",
        "isCorrect": true,
        "explanation": "ยืนยันตรงจากสไลด์หน้า 5: Global Explanation ตอบ \"โมเดลโดยรวมพึ่งพา Feature ใด\" ส่วน Local Explanation ตอบ \"ทำไมลูกค้ารายหนึ่งได้ผลเช่นนี้\""
      },
      {
        "id": "B",
        "text": "Local Explanation",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q3"
      },
      {
        "id": "C",
        "text": "Individual Decision Path",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q3"
      },
      {
        "id": "D",
        "text": "Counterfactual Explanation",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q3"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w8-q04",
    "questionNumber": 43,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q4",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q4] ความแตกต่าง Model-Specific vs Model-Agnostic (CLO1)",
    "scenario": "ความแตกต่าง Model-Specific vs Model-Agnostic (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Model-Specific ใช้ตรวจหา Data Leakage ส่วน Model-Agnostic ใช้คำนวณ Accuracy",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q4"
      },
      {
        "id": "B",
        "text": "Model-Specific ใช้ได้กับโมเดลทุกประเภท ส่วน Model-Agnostic ใช้ได้เฉพาะ Decision Tree",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q4"
      },
      {
        "id": "C",
        "text": "Model-Specific ใช้กับข้อมูลไม่มี Label ส่วน Model-Agnostic ใช้กับข้อมูลมี Label",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q4"
      },
      {
        "id": "D",
        "text": "Model-Specific อาศัยโครงสร้างภายในของโมเดลนั้น ๆ ส่วน Model-Agnostic ตรวจสอบพฤติกรรมผ่าน Input-Output โดยไม่ยึดติดกับโครงสร้างโมเดล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W8-Q4 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "ยืนยันตรงจากสไลด์หน้า 8 ตัวลวงอันตราย: b สลับทิศทางผิด — จริงๆ Model-Agnostic ต่างหาก (ไม่ใช่ Model-Specific) ที่ใช้ได้กับโมเดลหลายประเภท เช่น SHAP/LIME"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w8-q05",
    "questionNumber": 44,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q5",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q5] SHAP: Base Value 32%, Prediction 65%, \"ไม่ได้ซื้อสินค้านาน\" SHAP = +29% หมายความว่า (CLO2)",
    "scenario": "SHAP: Base Value 32%, Prediction 65%, \"ไม่ได้ซื้อสินค้านาน\" SHAP = +29% หมายความว่า (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "ปัจจัยนี้ทำให้ความน่าจะเป็นที่ลูกค้าจะ Inactive เพิ่มขึ้น 29 จุดเปอร์เซ็นต์ เมื่อเทียบกับค่าฐาน",
        "isCorrect": true,
        "explanation": "ตรงกับตัวอย่างในสไลด์หน้า 9 ทุกตัวเลข: 32% + 29(ไม่ซื้อนาน) + 12(อายุสมาชิกสั้น) − 8(ยอดใช้จ่ายสูง) = 65%"
      },
      {
        "id": "B",
        "text": "ปัจจัยนี้เป็นสาเหตุเดียวที่ทำให้ลูกค้าตัดสินใจเลิกใช้งาน 29 วัน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q5"
      },
      {
        "id": "C",
        "text": "ปัจจัยนี้ทำให้ลดความเสี่ยงที่ลูกค้าจะ Inactive ลง 29 จุดเปอร์เซ็นต์ เมื่อเทียบกับค่าฐาน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q5"
      },
      {
        "id": "D",
        "text": "โมเดลมีความแม่นยำในการทำนายลูกค้าคนนี้เพิ่มขึ้น 29%",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q5"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w8-q06",
    "questionNumber": 45,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q6",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q6] สาเหตุหลักของ Concept Drift (CLO2)",
    "scenario": "สาเหตุหลักของ Concept Drift (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "การแบ่ง Train/Validation สัดส่วนไม่เท่ากัน ต้องสุ่มแบ่งใหม่ด้วย random_seed เลขใหม่",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q6"
      },
      {
        "id": "B",
        "text": "โครงสร้างและสภาพแวดล้อมในโลกจริงเปลี่ยนไป ทำให้ความสัมพันธ์ระหว่าง Feature กับ Target เปลี่ยนแปลงไปจากอดีต",
        "isCorrect": true,
        "explanation": "ยืนยันตรงจากสไลด์หน้า 11 (เกือบคำต่อคำ) ตัวอย่าง: กฎเดิม \"ไม่ซื้อเกิน 45 วัน → Inactive 68%\" ใช้ไม่ได้หลังเปิด Subscription เพราะลูกค้าได้สินค้าอัตโนมัติโดยไม่ได้สั่งเอง"
      },
      {
        "id": "C",
        "text": "การสุ่มค่า Centroid เริ่มต้นผิดพลาดในขั้นตอน Modeling",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q6"
      },
      {
        "id": "D",
        "text": "ข้อผิดพลาดในการเขียน Syntax ของโปรแกรมเมอร์หลังจากรันโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q6"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w8-q07",
    "questionNumber": 46,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q7",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q7] ลบคอลัมน์อ่อนไหว (เพศ/เชื้อชาติ) แล้วแต่โมเดลยังอคติ เพราะ (CLO3)",
    "scenario": "ลบคอลัมน์อ่อนไหว (เพศ/เชื้อชาติ) แล้วแต่โมเดลยังอคติ เพราะ (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "เกิด Class Imbalance ในตัวแปร Target จากการเก็บข้อมูลไม่สมดุลและความไม่รอบคอบของนักวิทยาการข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q7"
      },
      {
        "id": "B",
        "text": "ข้อมูลผ่านการทำ Standardization มากเกินไป",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q7"
      },
      {
        "id": "C",
        "text": "ตัวแปรอื่นที่เหลืออยู่ (เช่น รหัสไปรษณีย์) ทำหน้าที่เป็น Proxy Feature ที่สะท้อนข้อมูลอ่อนไหวหรือฐานะทางเศรษฐกิจโดยอ้อม",
        "isCorrect": true,
        "explanation": "ยืนยันตรงจากสไลด์หน้า 13 ด้วยตัวอย่าง Postal Code เป๊ะ: \"การลบชื่อข้อมูลอ่อนไหว ไม่ได้ลบตัวแทนของข้อมูลนั้น\""
      },
      {
        "id": "D",
        "text": "ตัวแบบเกิด Underfitting เนื่องจากจำนวนคอลัมน์ไม่เพียงพอ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q7"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w8-q08",
    "questionNumber": 47,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q8",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q8] Health-risk Algorithm ใช้ค่าใช้จ่ายสุขภาพในอดีตเป็น Proxy ของความต้องการรักษา → ผลกระทบเชิงจริยธรรม (CLO3)",
    "scenario": "Health-risk Algorithm ใช้ค่าใช้จ่ายสุขภาพในอดีตเป็น Proxy ของความต้องการรักษา → ผลกระทบเชิงจริยธรรม (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "โมเดลทำงานได้รวดเร็วขึ้นเพราะข้อมูลต่อเนื่อง สอดคล้องกับโมเดลที่ชอบการประมาณค่า",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q8"
      },
      {
        "id": "B",
        "text": "ทำให้ผู้ป่วยทุกกลุ่มได้รับสิทธิการรักษาเท่าเทียมกันมากขึ้น",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q8"
      },
      {
        "id": "C",
        "text": "โรงพยาบาลสามารถลดงบประมาณการดูแลผู้ป่วยเรื้อรังได้ทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q8"
      },
      {
        "id": "D",
        "text": "เกิดความลำเอียง ทำให้ผู้ป่วยผิวดำที่มีภาวะป่วยหนักเท่ากับผู้ป่วยผิวขาว ได้รับคะแนนความเสี่ยงต่ำกว่าความเป็นจริงเพราะเข้าถึงค่าใช้จ่ายในอดีตได้น้อยกว่า",
        "isCorrect": true,
        "explanation": "ยืนยันตรงจากสไลด์หน้า 26 (Obermeyer et al., Science 2019): คะแนนความเสี่ยงเท่ากัน (0.8) ที่ค่าใช้จ่ายเท่ากัน (≈12,000 บาท/ปี) แต่ผู้ป่วยผิวดำป่วยหนักกว่าจริง (ความดันสูง+เบาหวาน+ไตเรื้อรัง+หัวใจ) — แก้ Proxy แล้วสัดส่วนผู้ป่วยผิวดำที่ได้รับความช่วยเหลือเพิ่มจาก 17.7% เป็น 46.5%"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w8-q09",
    "questionNumber": 48,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q9",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q9] หลักการ Purpose Limitation และ Data Minimization (CLO1)",
    "scenario": "หลักการ Purpose Limitation และ Data Minimization (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "หากได้ข้อมูลมาแล้วนำไปวิเคราะห์โครงการใดก็ได้ และควรเก็บข้อมูลให้มากที่สุดเพื่อรองรับโมเดลในอนาคต",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q9"
      },
      {
        "id": "B",
        "text": "ใช้ Consent เป็นฐานทางกฎหมายเพียงฐานเดียวในการประมวลผลข้อมูลทุกประเภท",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q9"
      },
      {
        "id": "C",
        "text": "ต้องใช้ข้อมูลตามวัตถุประสงค์ที่แจ้งไว้แต่แรกเท่านั้น และจัดเก็บ/ใช้งานเฉพาะข้อมูลฟิลด์ที่จำเป็นต่อการวิเคราะห์จริง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W8-Q9 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "ยืนยันตรงจากสไลด์หน้า 15-16 ตัวลวงอันตราย: b ผิดตรงข้ามกับสไลด์ที่ระบุชัด \"Consent ไม่ใช่ฐานกฎหมายเพียงฐานเดียว\"; d ผิดเพราะสไลด์หน้า 17 ย้ำว่าต้อง \"ตรวจผู้เข้าถึงข้อมูลและปลายทางทุกครั้ง\" ก่อนส่งออกนอกองค์กร ไม่ใช่แค่ตัดชื่อ"
      },
      {
        "id": "D",
        "text": "สามารถส่งข้อมูลไปยัง Generative AI ภายนอกได้ทันทีเพียงแค่ตัดชื่อ-นามสกุลออก",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q9"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w8-q10",
    "questionNumber": 49,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q10",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q10] กรณี Rite Aid: ความเสียหายเกิดจากข้อบกพร่องในขั้นตอนใด (CLO3)",
    "scenario": "กรณี Rite Aid: ความเสียหายเกิดจากข้อบกพร่องในขั้นตอนใด (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "ทางร้านไม่ได้ใช้ระบบการแบ่งกลุ่มแบบ K-Means",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q10"
      },
      {
        "id": "B",
        "text": "เมื่อระบบแจ้งเตือนว่าพบคนน่าสงสัย พนักงานดำเนินการจับกุม/ตรวจค้นทันที โดยไม่มี Human Checkpoint ในการตรวจสอบความถูกต้องซ้ำ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามหลักการ W8-Q10 ที่เน้นย้ำในการเรียนการสอน",
        "distractorTrap": "ยืนยันตรงจากสไลด์หน้า 28 (FTC case): ปัญหาคือ False Positive (ไม่ใช่ False Negative ตามตัวลวง c) + ไม่มี Human Checkpoint ก่อนลงมือ — มาตรการที่ FTC สั่งคือห้ามใช้ Facial Recognition 5 ปี + ต้องมี Human Checkpoint ก่อนทุกครั้ง"
      },
      {
        "id": "C",
        "text": "โมเดลมีอัตรา False Negative สูงเกินไปทำให้สินค้าสูญหาย",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q10"
      },
      {
        "id": "D",
        "text": "ระบบกล้องมีคุณภาพสูงเกินไปจนละเมิดความเป็นส่วนตัว และบันทึกไว้ตลอดเวลาจนผู้ใช้บริการรู้สึกอึดอัด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q10"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w8-q11",
    "questionNumber": 50,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 Responsible AI",
    "inClassCode": "W8-Q11",
    "week": "W8",
    "sourceType": "in-class",
    "title": "[W8-Q11] Responsible Communication and Governance ที่ดีที่สุดเมื่อสื่อสารกับ Stakeholders (CLO3)",
    "scenario": "Responsible Communication and Governance ที่ดีที่สุดเมื่อสื่อสารกับ Stakeholders (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "ปรับเปลี่ยนข้อมูลตัวเลขทางสถิติให้เหมาะสมกับความต้องการของกลุ่มผู้ฟังแต่ละฝ่าย",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q11"
      },
      {
        "id": "B",
        "text": "ยืนยันว่าโมเดลจะมีความแม่นยำถาวรเพื่อสร้างความมั่นใจสูงสุดในการลงทุน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q11"
      },
      {
        "id": "C",
        "text": "สื่อสารด้วยภาษาที่ผู้ฟังแต่ละกลุ่มเข้าใจได้ แต่รักษาข้อเท็จจริง ความไม่แน่นอน ข้อจำกัด และกำหนดเงื่อนไขการกำกับดูแลโดยมนุษย์ (Human Oversight) ไว้อย่างครบถ้วน",
        "isCorrect": true,
        "explanation": "ยืนยันตรงจากสไลด์หน้า 21: \"เปลี่ยนภาษาได้ แต่ห้ามเปลี่ยนข้อเท็จจริงตามผู้ฟัง\" — ทีมเทคนิค/ผู้จัดการตลาด/ลูกค้า ได้ข้อมูลหลักฐานเดียวกันแต่คนละระดับภาษา เชื่อมกับ week 6 ข้อ 11 (ธีม Responsible Communication ซ้ำมาตลอดวิชา) ⚠ หมายเหตุ QA: Lect10 เป็นไฟล์ภาพสไลด์ (เหมือน Lect09) ที่ project_read ดึงได้แค่หน้าว่าง/ชื่อเรื่อง ไม่มีข้อความเนื้อหาให้ยืนยัน และไฟล์นี้ยังไม่เคยถูกแนบในแชทโดยตรง (ต่างจาก Lect09 ที่เคยแนบแล้วเปิดดูภาพได้) จึง **ยังไม่ source-confirmed กับสไลด์จริง** — เฉลยด้านล่างอิงจากหลักการมาตรฐานของวิชา (บทบาท Data Team, CRISP-DS handoff, Responsible AI) และศัพท์เฉพาะที่โจทย์เองใช้ (Decision Contract, Feature Contract, Decision Memo) ถ้าต้องการยืนยันกับสไลด์จริง ให้แนบไฟล์ Lect10 PDF เข้าแชทโดยตรง การกระจายตัวเลือกคำตอบ: a=3, b=2, c=2, d=3 (30/20/20/30%) — เป็นข้อมูลจากเอกสารจริงของผู้สอน ไม่ได้ออกแบบ/ปรับสมดุลเอง"
      },
      {
        "id": "D",
        "text": "มอบหมายให้ระบบ AI ทำการตัดสินใจอนุมัติมาตรการทางธุรกิจทั้งหมดโดยอัตโนมัติเพื่อลดอคติของมนุษย์",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W8-Q11"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "inclass-w9-q02",
    "questionNumber": 51,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q2",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q2] บทบาทในทีมข้อมูลยุคใหม่ (Modern Data Team)",
    "scenario": "บทบาทหน้าที่ใดรับผิดชอบการสร้าง Data Pipeline, ดูแล Data Platform และวางโครงสร้างพื้นฐานเพื่อรวบรวมและจัดเก็บข้อมูลอย่างมั่นคงปลอดภัย? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Data Engineer",
        "isCorrect": true,
        "explanation": "เชื่อมกับ Lect01 \"Meet the Modern Data Team\" — Data Engineer คือผู้ดูแลโครงสร้างพื้นฐานข้อมูล (pipeline/platform) ส่วน Data Analyst เน้น EDA/insight, Data Scientist เน้นสร้างโมเดล, AI Engineer เน้นนำโมเดล/AI ไปใช้งานจริง"
      },
      {
        "id": "B",
        "text": "Data Analyst",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q2"
      },
      {
        "id": "C",
        "text": "AI Engineer",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q2"
      },
      {
        "id": "D",
        "text": "Data Scientist",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q2"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q03",
    "questionNumber": 52,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q3",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q3] เอกสารเริ่มต้นโครงการร่วมกับ Business Unit",
    "scenario": "เอกสารหรือข้อตกลงใดที่ Business Analyst ต้องจัดทำร่วมกับ Business Unit ตั้งแต่ขั้นตอนแรกสุดของ CRISP-DS เพื่อกำหนดทางเลือก ขอบเขต และผลลัพธ์ที่ต้องการตรวจสอบก่อนเริ่มดึงข้อมูลหรือเลือกโมเดล? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "Decision Contract",
        "isCorrect": true,
        "explanation": "Decision Contract ทำตั้งแต่ต้น (Business Understanding) เพื่อล็อกทางเลือก/ขอบเขต/เกณฑ์ตัดสินใจ — ต่างจาก Decision Memo (ข้อ 9) ที่ทำช่วง Evaluation เพื่อบันทึกผลการตัดสินจริง"
      },
      {
        "id": "B",
        "text": "Model Note",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q3"
      },
      {
        "id": "C",
        "text": "Monitoring Log",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q3"
      },
      {
        "id": "D",
        "text": "Pilot Runbook",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q3"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q04",
    "questionNumber": 53,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q4",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q4] Feature Contract ป้องกัน Data Leakage",
    "scenario": "ในการสร้าง \"Customer Table & Feature Contract\" ของ Analytics Engineer ข้อกำหนดสำคัญที่สุดเพื่อป้องกันปัญหาข้อมูลรั่วไหลจากอนาคต (Data Leakage) คือข้อใด? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "ห้ามใช้ข้อมูลเชิงตัวเลขในการฝึกโมเดลเด็ดขาด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q4"
      },
      {
        "id": "B",
        "text": "Target Inactive ต้องเป็นข้อมูลที่เกิดขึ้นพร้อมกัน หรือ เกิดขึ้นภายหลังกับ Feature ในอดีต ก็ได้",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q4"
      },
      {
        "id": "C",
        "text": "ต้องสุ่มแถวข้อมูลทิ้งอย่างน้อยร้อยละ 20 ของตาราง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q4"
      },
      {
        "id": "D",
        "text": "Feature ที่ใช้ต้องเป็นข้อมูลที่เกิดขึ้นและมีอยู่จริงก่อนเวลาที่ทำการตัดสินใจ (Decision Point) เท่านั้น",
        "isCorrect": true,
        "explanation": "หลักการป้องกัน Temporal/Future Leakage มาตรฐาน: Feature ต้อง \"มีอยู่จริงแล้ว\" ก่อนจุดตัดสินใจ ไม่ใช่ข้อมูลที่เกิดพร้อมหรือหลัง Target"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q05",
    "questionNumber": 54,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q5",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q5] สิ่งส่งมอบของ Data Analyst หลัง EDA",
    "scenario": "สิ่งส่งมอบสำคัญที่ Data Analyst ต้องส่งต่อให้ทีมหลังทำ Exploratory Data Analysis คือข้อใด? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "โค้ดโปรแกรมสำหรับการนำไปใช้จริง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q5"
      },
      {
        "id": "B",
        "text": "แผนผังการเชื่อมโยงระบบฐานข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q5"
      },
      {
        "id": "C",
        "text": "ข้อค้นพบทางสถิติและข้อจำกัดข้อมูล",
        "isCorrect": true,
        "explanation": "สอดคล้องกับธีม \"Code ทำงาน ≠ Feature พร้อมใช้\" (week 3 ข้อ 11) — สิ่งส่งมอบของ EDA เน้นข้อค้นพบ+ข้อจำกัด ไม่ใช่โค้ดหรือแดชบอร์ดสำเร็จรูป"
      },
      {
        "id": "D",
        "text": "แดชบอร์ดสรุปผลกราฟิกที่สมบูรณ์",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q5"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q06",
    "questionNumber": 55,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q6",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q6] ขอบเขตคำถามที่ Decision Tree และ K-Means ตอบได้",
    "scenario": "ในโจทย์การดูแลลูกค้า ขอบเขตคำถามที่ Decision Tree และ K-Means สามารถตอบได้ตรงกับข้อใด? (CLO2)",
    "options": [
      {
        "id": "A",
        "text": "ทั้งสองตัวแบบสามารถรับรองยอดการซื้อซ้ำได้แม่นยำ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q6"
      },
      {
        "id": "B",
        "text": "ต้นไม้ทำนายความเสี่ยง ส่วนคลัสเตอร์บอกพฤติกรรม",
        "isCorrect": true,
        "explanation": "เชื่อมกับ week 5-7: Decision Tree = Supervised/Predictive (ทำนายความเสี่ยง), K-Means = Unsupervised/Descriptive (จัดกลุ่มพฤติกรรม) — ข้อ d สลับหน้าที่สองโมเดลผิด"
      },
      {
        "id": "C",
        "text": "ต้นไม้แนะนำวิธีติดต่อ ส่วนคลัสเตอร์รับรองผลสำเร็จ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q6"
      },
      {
        "id": "D",
        "text": "ต้นไม้จัดกลุ่มลูกค้า ส่วนคลัสเตอร์ทำนายยอดใช้จ่าย",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q6"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q07",
    "questionNumber": 56,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q7",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q7] จาก Predictive สู่ Prescriptive Analytics",
    "scenario": "การยกระดับจากการวิเคราะห์แบบ Predictive สู่ Prescriptive Analytics ต้องมีสิ่งใดเพิ่มเติม? (CLO1)",
    "options": [
      {
        "id": "A",
        "text": "การเพิ่มจำนวนรอบการทำซ้ำของตัวแบบให้สูงสุด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q7"
      },
      {
        "id": "B",
        "text": "เปลี่ยนไปใช้โครงข่ายประสาทเทียมขนาดใหญ่",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q7"
      },
      {
        "id": "C",
        "text": "การตัดการมีส่วนร่วมของมนุษย์ออกจากกระบวนการ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q7"
      },
      {
        "id": "D",
        "text": "ข้อเสนอแนะสิ่งที่ควรทำพร้อมเงื่อนไขกำกับ",
        "isCorrect": true,
        "explanation": "เชื่อมกับ Analytics Continuum (week 1 ข้อ 10) — Prescriptive คือขั้นที่ตอบ \"ควรทำอะไร\" ไม่ใช่แค่ทำนาย ต้องมีข้อเสนอแนะ+เงื่อนไขกำกับ (governance) ไม่ใช่การตัดมนุษย์ออก"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q08",
    "questionNumber": 57,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q8",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q8] AI Assistant ร่วมกับ Human Oversight",
    "scenario": "แนวปฏิบัติข้อใดสะท้อนการใช้งาน AI Assistant ร่วมกับ Human Oversight ได้อย่างถูกต้อง? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "ห้ามนำระบบมาช่วยสรุปข้อมูลในทุกขั้นตอนงาน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q8"
      },
      {
        "id": "B",
        "text": "ให้ระบบส่งข้อเสนอหาลูกค้าได้เองโดยอัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q8"
      },
      {
        "id": "C",
        "text": "ให้ระบบช่วยร่างสรุปโดยมีคนตรวจและอนุมัติก่อน",
        "isCorrect": true,
        "explanation": "ธีมเดียวกับ week 1 ข้อ 9 (AI-assisted Improvement: มนุษย์ต้องเป็นผู้ตัดสินใจและรับผิดชอบ) และ week 8 ข้อ 11 (Human Oversight)"
      },
      {
        "id": "D",
        "text": "มอบอำนาจตัดสินใจให้ระบบเพื่อลดความลำเอียง",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q8"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q09",
    "questionNumber": 58,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q9",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q9] บทบาทของ Decision Memo",
    "scenario": "เอกสาร Decision Memo ที่จัดทำขึ้นในขั้นตอนการประเมินผล มีบทบาทหน้าที่หลักตามข้อใด? (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "บันทึกคำตัดสิน เหตุผล และเงื่อนไขการทดสอบ",
        "isCorrect": true,
        "explanation": "Decision Memo ต่างจาก Decision Contract (ข้อ 3) ตรงที่ทำทีหลัง (ช่วง Evaluation) เพื่อบันทึกคำตัดสินจริงพร้อมเหตุผล ไม่ใช่ข้อตกลงล่วงหน้าหรือยืนยันถาวร (ไม่มีโมเดลใดพร้อมใช้งาน \"ถาวร\" — สอดคล้องธีม week 8 ข้อ 11)"
      },
      {
        "id": "B",
        "text": "ทำหน้าที่เป็นข้อตกลงในการว่าจ้างทีมงานโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q9"
      },
      {
        "id": "C",
        "text": "ยืนยันผลลัพธ์ว่าตัวแบบพร้อมใช้งานแบบถาวร",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q9"
      },
      {
        "id": "D",
        "text": "ใช้เป็นสคริปต์คำสั่งติดตั้งระบบประมวลผล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q9"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q10",
    "questionNumber": 59,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q10",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q10] การแบ่งหน้าที่ใน Handoff ระหว่าง ML Engineer และ Business Unit (CLO3)",
    "scenario": "การแบ่งหน้าที่ใน Handoff ระหว่าง ML Engineer และ Business Unit (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "ทั้งสองฝ่ายมอบให้ระบบเป็นผู้อนุมัติผลอัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q10"
      },
      {
        "id": "B",
        "text": "วิศวกรเตรียมผลตามคู่มือ ฝ่ายธุรกิจอนุมัติใช้",
        "isCorrect": true,
        "explanation": "สอดคล้องกับ week 9 ข้อ 8 (Human Oversight) และ week 8 ข้อ 10 (Rite Aid — ต้องมี Human Checkpoint ก่อนลงมือ): ฝ่ายเทคนิคเตรียม ฝ่ายธุรกิจเป็นผู้อนุมัติ/รับผิดชอบการตัดสินใจ"
      },
      {
        "id": "C",
        "text": "วิศวกรกำหนดนโยบาย ฝ่ายธุรกิจเขียนโค้ดระบบ",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q10"
      },
      {
        "id": "D",
        "text": "วิศวกรเป็นผู้อนุมัติ ฝ่ายธุรกิจเตรียมข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q10"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "inclass-w9-q11",
    "questionNumber": 60,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 CRISP-DS",
    "inClassCode": "W9-Q11",
    "week": "W9",
    "sourceType": "in-class",
    "title": "[W9-Q11] การตอบสนองเมื่อ Recall ของลูกค้าใหม่ต่ำกว่าเกณฑ์ (CLO3)",
    "scenario": "การตอบสนองเมื่อ Recall ของลูกค้าใหม่ต่ำกว่าเกณฑ์ (CLO3)",
    "options": [
      {
        "id": "A",
        "text": "ปรับลดเกณฑ์ชี้วัดลงเพื่อให้ผ่านการประเมิน",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q11"
      },
      {
        "id": "B",
        "text": "ยุติโครงการทันทีและลบชุดข้อมูลเดิมทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q11"
      },
      {
        "id": "C",
        "text": "ใช้งานต่อไปเนื่องจากคะแนนรวมยังอยู่ในเกณฑ์ดี",
        "isCorrect": false,
        "explanation": "ผิด: ข้อความนี้ไม่ถูกต้องตามหลักการวิเคราะห์ของ W9-Q11"
      },
      {
        "id": "D",
        "text": "สั่งพักใช้ตามคู่มือและส่งปัญหากลับไปแก้ต้นเหตุ",
        "isCorrect": true,
        "explanation": "เชื่อมกับ week 8 ข้อ 2 (Accuracy รวมสูงแต่ Recall กลุ่มย่อยต่ำ ไม่ควรอนุมัติทันที) และ week 6 ข้อ 2 (Evaluation ไม่ผ่าน = Feedback Loop กลับไปแก้ต้นเหตุ ไม่ใช่ปรับเกณฑ์ให้ผ่านหรือเพิกเฉย)"
      }
    ],
    "difficulty": "direct"
  }
];
