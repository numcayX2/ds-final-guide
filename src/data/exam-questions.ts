import type { ExamQuestion } from '../types/study';

export const examQuestions: ExamQuestion[] = [
  {
    "id": "q01-crisp-time",
    "questionNumber": 1,
    "moduleRef": "module-01-crisp-ds",
    "slideRef": "Lect 02 p20",
    "title": "สัดส่วนเวลาการทำงานในวงจร Data Science",
    "scenario": "ในวงจรการทำงาน Data Science Process Cycle (CRISP-DS 8 ขั้นตอน) ขั้นตอนใดที่กินเวลาและทรัพยากรของทีมงานมากที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "Modeling (การทดลองและฝึกสอน Candidate Models หลายสิบแบบ)",
        "isCorrect": false,
        "explanation": "ผิด: Modeling กินเวลาเฉลี่ยเพียง 10-20% เท่านั้น"
      },
      {
        "id": "B",
        "text": "Data Preparation (Data Cleaning & Feature Engineering) กินเวลา 60–80%",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 02 p20: การเตรียมและคลีนข้อมูลใช้เวลามากที่สุดถึง 60–80% ของงานทั้งหมด"
      },
      {
        "id": "C",
        "text": "Deployment & Communication (การขึ้นระบบและทำ Dashboard)",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ใช่ขั้นตอนที่กินเวลามากที่สุด"
      },
      {
        "id": "D",
        "text": "Business Understanding (การประชุมนิยามปัญหา)",
        "isCorrect": false,
        "explanation": "ผิด: แม้จะสำคัญที่สุดในการตั้งเป้า แต่ไม่ได้กินเวลา 60-80%"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q01b-crisp-feedback-loop",
    "questionNumber": 2,
    "moduleRef": "module-01-crisp-ds",
    "slideRef": "Lect 02 p18-22",
    "title": "การจัดการ Feedback Loop เมื่อโมเดลไม่ผ่านเกณฑ์",
    "scenario": "ในขั้นตอน Evaluation หากพบว่าผลการประเมินโมเดลไม่ผ่านเกณฑ์ทางธุรกิจ วงจร CRISP-DS กำหนดให้ทีมงานปฏิบัติตามแนวทางใดจึงจะถูกต้องตามหลักการ?",
    "options": [
      {
        "id": "A",
        "text": "ลดเกณฑ์ประเมินทางธุรกิจลงเพื่อให้โมเดลผ่านการตรวจสอบ",
        "isCorrect": false,
        "explanation": "ผิดมหันต์: ห้ามลดเกณฑ์เพื่อเอาใจโมเดล"
      },
      {
        "id": "B",
        "text": "นำชุดข้อมูล Test Set ไปร่วมเทรนกับ Training Set เพื่อเร่งคะแนน",
        "isCorrect": false,
        "explanation": "ผิด: เกิด Data Leakage ร้ายแรง"
      },
      {
        "id": "C",
        "text": "หมุน Feedback Loop ย้อนกลับไปแก้ที่ต้นเหตุ เช่น ทบทวน Business Understanding หรือกลับไปปรับปรุง Data Preparation",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 02: CRISP-DS เป็นกระบวนการวนซ้ำ (Iterative) เมื่อพบปัญหาต้องย้อนไปแก้ต้นเหตุ"
      },
      {
        "id": "D",
        "text": "ยกเลิกโครงการข้อมูลทันทีโดยไม่ต้องวิเคราะห์สาเหตุ",
        "isCorrect": false,
        "explanation": "ผิด: การย้อนกลับไปปรับปรุงคือหัวใจของ Data Science Cycle"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q01c-crisp-first-phase",
    "questionNumber": 3,
    "moduleRef": "module-01-crisp-ds",
    "slideRef": "Lect 02 p15",
    "title": "จุดเริ่มต้นของการกำหนดเป้าหมายใน CRISP-DS",
    "scenario": "ข้อใดคือเป้าหมายหลักของขั้นตอน Business Understanding ในวงจร CRISP-DS?",
    "options": [
      {
        "id": "A",
        "text": "การเขียนโค้ดภาษา Python เพื่อดึงข้อมูลเข้า GPU",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือเรื่องทางเทคนิคในขั้น Data Preparation"
      },
      {
        "id": "B",
        "text": "การทำความเข้าใจความต้องการของธุรกิจ นิยามปัญหา แปลงเป้าหมายธุรกิจเป็นโจทย์ Data Science และกำหนดเกณฑ์ประเมินความสำเร็จ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 02 p15: Business Understanding ต้องนิยามปัญหาและเกณฑ์วัดผลให้ชัดก่อนแตะต้องข้อมูล"
      },
      {
        "id": "C",
        "text": "การเปรียบเทียบค่าความแม่นยำระหว่าง Decision Tree กับ Random Forest",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือขั้นตอน Modeling และ Evaluation"
      },
      {
        "id": "D",
        "text": "การทำ Data Imputation แทนค่าที่สูญหาย",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือ Data Cleaning"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q02-valid-mean",
    "questionNumber": 4,
    "moduleRef": "module-02-data-cleaning",
    "slideRef": "Lect 04.1 p29, p34",
    "title": "การแทนค่าด้วยค่าเฉลี่ยที่ถูกต้อง (Clean Before Impute)",
    "scenario": "ลูกค้า 1003 ขาดข้อมูลรายได้ (Missing) โดยบันทึกรายได้ของลูกค้าคนอื่นคือ [75,000, -40,000, 50,000, 99,999] หากใช้วิธี Valid Mean Imputation จะได้ค่าแทนที่เท่าใด?",
    "options": [
      {
        "id": "A",
        "text": "46,249.75 บาท (นำทั้ง 4 ค่ารวมกันแล้วหารด้วย 4)",
        "isCorrect": false,
        "explanation": "ผิดมหันต์! ติดกับดักนำ -40,000 ซึ่งเป็น Known Invalid มารวมคำนวณ",
        "distractorTrap": "ลืมตัดค่าติดลบทิ้ง"
      },
      {
        "id": "B",
        "text": "62,500 บาท (ตัด 99,999 ทิ้งเพราะคิดว่าเป็นเลข 9 ซ้ำ)",
        "isCorrect": false,
        "explanation": "ผิด: 99,999 ในสไลด์นี้ถือเป็นรายได้จริงที่ถูกต้อง ไม่ใช่ค่าขยะ"
      },
      {
        "id": "C",
        "text": "75,000 บาท (ตัด -40,000 ออกก่อน แล้วเฉลี่ย 3 ค่า: (75k + 50k + 99.999k)/3)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามกฎ Clean Known Errors Before Calculating: ตัด -40,000 ทิ้ง เหลือ Valid 3 ค่า รวมได้ 224,999 หาร 3 = 75,000 บาท"
      },
      {
        "id": "D",
        "text": "50,000 บาท (ใช้มัธยฐานแทนค่าเฉลี่ย)",
        "isCorrect": false,
        "explanation": "ผิด: โจทย์ระบุให้ใช้ Valid Mean"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q02b-listwise-deletion-hazard",
    "questionNumber": 5,
    "moduleRef": "module-02-data-cleaning",
    "slideRef": "Lect 04.1 p22",
    "title": "อันตรายของการลบแถวทิ้ง (Listwise Deletion)",
    "scenario": "ในการจัดการข้อมูลขาดหาย (Missing Data) ทำไมอาจารย์จึงเตือนว่าการใช้วิธีลบทั้งแถวทิ้ง (Listwise Deletion) อาจก่อให้เกิดปัญหา Selection Bias?",
    "options": [
      {
        "id": "A",
        "text": "เพราะทำให้โมเดลรันเร็วขึ้นจน GPU ไหม้",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับฮาร์ดแวร์"
      },
      {
        "id": "B",
        "text": "เพราะหากข้อมูลไม่ได้ขาดหายแบบสุ่มแท้จริง (Not Random) การลบแถวจะทำให้กลุ่มประชากรที่เหลืออยู่สูญเสียความเป็นตัวแทนของประชากรจริง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 04.1 p22: การลบแถวที่มี missing อาจตัดกลุ่มลูกค้าเฉพาะเจาะจงทิ้งไปจนเกิด Selection Bias"
      },
      {
        "id": "C",
        "text": "เพราะภาษาสถิติไม่อนุญาตให้ลบแถวข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: สามารถลบได้หาก missing เล็กน้อยและเป็นสุ่มสมบูรณ์ (MCAR)"
      },
      {
        "id": "D",
        "text": "เพราะทำให้ค่า Accuracy กลายเป็น 100% เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ไม่มีผลบังคับให้ Accuracy เป็น 100%"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q02c-cluster-median-imputation",
    "questionNumber": 6,
    "moduleRef": "module-02-data-cleaning",
    "slideRef": "Lect 04.1 p36",
    "title": "การแทนค่าตามกลุ่มย่อย (Cluster/Group Median)",
    "scenario": "เมื่อต้องการแทนค่าสูญหายของตัวแปร 'รายได้' สำหรับลูกค้าในกลุ่มอาชีพต่างๆ ทำไมการใช้ Group/Cluster Median จึงดีกว่าการใช้ Overall Mean ทั้งตาราง?",
    "options": [
      {
        "id": "A",
        "text": "เพราะ Group Median สะท้อนระดับรายได้ที่แท้จริงตามบริบทของแต่ละสายอาชีพ และทนทานต่อค่าสุดขั้วในแต่ละกลุ่ม",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 04.1 p36: Group Median รักษาความสัมพันธ์ภายในกลุ่มและไม่บิดเบือนสถิติเหมือน Overall Mean"
      },
      {
        "id": "B",
        "text": "เพราะไม่ต้องเขียนโค้ดคำนวณ",
        "isCorrect": false,
        "explanation": "ผิด: ต้องเขียนโค้ด GroupBy ในการคำนวณ"
      },
      {
        "id": "C",
        "text": "เพราะทำให้ขนาดข้อมูลเพิ่มขึ้นเป็น 2 เท่า",
        "isCorrect": false,
        "explanation": "ผิด: ขนาดข้อมูลคงที่เท่าเดิม"
      },
      {
        "id": "D",
        "text": "เพื่อให้ได้ตัวเลขที่เป็นจำนวนเต็มเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: Median อาจเป็นทศนิยมได้"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q03-data-leakage",
    "questionNumber": 7,
    "moduleRef": "module-03-feature-engineering",
    "slideRef": "Lect 04.2 p27",
    "title": "กฎเหล็กป้องกัน Data Leakage ในการ Scaling",
    "scenario": "ในการทำ Feature Scaling เช่น Min-Max หรือ Z-Score Standardization วิศวกรข้อมูลต้องคำนวณพารามิเตอร์ (min, max, mean, sd) จากชุดข้อมูลใด?",
    "options": [
      {
        "id": "A",
        "text": "คำนวณจากชุด Training Set เท่านั้น แล้วนำกฎเดียวกันไป Transform บน Validation และ Test Set",
        "isCorrect": true,
        "explanation": "ถูกต้องตามกฎ Lect 04.2 p27: ห้ามนำ Validation/Test Set มาร่วม Fit เด็ดขาด เพื่อป้องกันข้อมูลอนาคตรั่วไหล (Data Leakage)"
      },
      {
        "id": "B",
        "text": "คำนวณจากชุดข้อมูลทั้งหมด (Full Dataset) รวมกันก่อนแบ่ง Train/Test เพื่อให้ได้สถิติที่แท้จริงของประชากร",
        "isCorrect": false,
        "explanation": "ผิดอย่างยิ่ง! นี่คือสาเหตุหลักของการเกิด Data Leakage",
        "distractorTrap": "คิดว่ายิ่งข้อมูลเยอะยิ่งดี"
      },
      {
        "id": "C",
        "text": "คำนวณแยกกันอย่างอิสระ Train ก็หาของ Train, Test ก็หาของ Test",
        "isCorrect": false,
        "explanation": "ผิด: ถ้าคำนวณแยกกัน สเกลของตัวเลขจะบิดเบี้ยว ไม่ตรงกับที่โมเดลเรียนรู้"
      },
      {
        "id": "D",
        "text": "คำนวณเฉพาะบน Validation Set",
        "isCorrect": false,
        "explanation": "ผิด: Validation Set มีไว้สำหรับประเมินเท่านั้น"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q03b-min-max-formula",
    "questionNumber": 8,
    "moduleRef": "module-03-feature-engineering",
    "slideRef": "Lect 04.2 p15",
    "title": "การคำนวณ Min-Max Normalization",
    "scenario": "กำหนดตัวแปรรายได้มีค่าต่ำสุด min = 20,000 บาท และสูงสุด max = 100,000 บาท หากลูกค้าคนหนึ่งมีรายได้ x = 60,000 บาท เมื่อทำ Min-Max Normalization ให้อยู่ในช่วง [0, 1] จะได้ค่าเท่าใด?",
    "options": [
      {
        "id": "A",
        "text": "0.40",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณเศษส่วนผิด"
      },
      {
        "id": "B",
        "text": "0.50 (คำนวณจาก (60,000 - 20,000) / (100,000 - 20,000) = 40,000 / 80,000 = 0.50)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสูตร: x_norm = (x - min) / (max - min) = 40,000 / 80,000 = 0.50"
      },
      {
        "id": "C",
        "text": "0.60",
        "isCorrect": false,
        "explanation": "ผิด: ลืมลบค่า min ออกจากตัวเศษและส่วน"
      },
      {
        "id": "D",
        "text": "0.75",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณผิดพลาด"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q03c-dummy-variable-trap",
    "questionNumber": 9,
    "moduleRef": "module-03-feature-engineering",
    "slideRef": "Lect 04.2 p32",
    "title": "กับดักตัวแปรหุ่น (Dummy Variable Trap)",
    "scenario": "ตัวแปรหมวดหมู่ 'ภูมิภาค' มี 4 ค่า (เหนือ, ใต้, ออก, ตก) หากทำ One-Hot Encoding สำหรับนำไปใช้ในโมเดล Regression ทำไมจึงต้องลบออก 1 คอลัมน์ให้เหลือเพียง 3 คอลัมน์?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อประหยัดหน่วยความจำ RAM",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ใช่เหตุผลหลักทางคณิตศาสตร์"
      },
      {
        "id": "B",
        "text": "เพื่อป้องกันปัญหา Perfect Multicollinearity (Dummy Variable Trap) เพราะผลรวมของทั้ง 4 คอลัมน์จะบวกกันได้ 1 เสมอ ทำให้เมทริกซ์คำนวณผกผันไม่ได้",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 04.2 p32: ต้องตัดออก 1 หมวดเพื่อเป็น Base Category ป้องกัน multicollinearity"
      },
      {
        "id": "C",
        "text": "เพราะภูมิภาคที่สี่ไม่มีลูกค้าอาศัยอยู่จริง",
        "isCorrect": false,
        "explanation": "ผิด: ภูมิภาคที่ถูกตัดจะกลายเป็นฐานเปรียบเทียบ"
      },
      {
        "id": "D",
        "text": "เพื่อทำให้ตัวแปรกลายเป็น Normal Distribution",
        "isCorrect": false,
        "explanation": "ผิด: One-Hot เป็นข้อมูลแบบ binary (0/1)"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q04-tukey-outlier",
    "questionNumber": 10,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p17",
    "title": "การตรวจจับ Outlier ด้วยรั้วของ Tukey",
    "scenario": "ชุดข้อมูลหนึ่งมี Q1 = 30 และ Q3 = 70 เมื่อตรวจสอบพบจุดข้อมูล x = 140 จงพิจารณาว่าจุดนี้เป็น Potential Outlier หรือไม่ เพราะเหตุใด?",
    "options": [
      {
        "id": "A",
        "text": "ไม่เป็น Outlier เพราะค่า IQR = 40 และรั้วบนอยู่ที่ 150",
        "isCorrect": false,
        "explanation": "ผิด: รั้วบนไม่ใช่ 70 + (2*40)"
      },
      {
        "id": "B",
        "text": "เป็น Potential Outlier เพราะรั้วบน Upper Fence = 70 + (1.5 * 40) = 130 ซึ่ง 140 > 130",
        "isCorrect": true,
        "explanation": "ถูกต้อง: IQR = 70 - 30 = 40, Upper Fence = 70 + 60 = 130 จุด 140 หลุดรั้วบนจึงเป็น Outlier"
      },
      {
        "id": "C",
        "text": "เป็น Outlier และต้องถูกลบทิ้งออกจากระบบทันทีโดยไม่ต้องตรวจสอบ",
        "isCorrect": false,
        "explanation": "ผิด: Potential Outlier != Error! เป็นเพียงการคัดกรอง ห้ามลบทันที",
        "distractorTrap": "กับดักสั่งลบทิ้งทันที"
      },
      {
        "id": "D",
        "text": "ไม่สามารถระบุได้จนกว่าจะแปลงข้อมูลเป็น Z-Score",
        "isCorrect": false,
        "explanation": "ผิด: สามารถระบุได้ทันทีจากรั้วของ Tukey"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q15-initial-eda",
    "questionNumber": 11,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p3-4",
    "title": "จุดเริ่มต้นของ EDA ในวงจร CRISP-DS",
    "scenario": "ตามสไลด์ Lect 05 กระบวนการ Initial EDA สามารถเริ่มต้นได้ตั้งแต่ขั้นตอนใดของ CRISP-DS และสามารถทำซ้ำเมื่อใด?",
    "options": [
      {
        "id": "A",
        "text": "เริ่มต้นในขั้นตอน Modeling และทำซ้ำใน Deployment",
        "isCorrect": false,
        "explanation": "ผิด: EDA ต้องทำก่อน Modeling เพื่อทำความเข้าใจข้อมูล"
      },
      {
        "id": "B",
        "text": "เริ่มต้นได้ตั้งแต่ขั้นตอน Data Understanding และทำซ้ำหลัง Data Preparation เพื่อตรวจสอบความพร้อมของข้อมูล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p3-4: Initial EDA เริ่มได้ใน Data Understanding และทำซ้ำหลัง Data Preparation เสมอ"
      },
      {
        "id": "C",
        "text": "เริ่มต้นหลัง Deployment เสร็จสิ้นแล้วเท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: หลัง Deployment เป็นขั้นตอน Monitoring"
      },
      {
        "id": "D",
        "text": "ทำเพียงครั้งเดียวในขั้นตอน Business Understanding แล้วไม่ต้องทำซ้ำอีก",
        "isCorrect": false,
        "explanation": "ผิด: EDA เป็นกระบวนการวนซ้ำ (Iterative Checkpoint)"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q16-analytical-question",
    "questionNumber": 12,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p4",
    "title": "หลักการ Begin EDA with an Analytical Question",
    "scenario": "ทำไมกฎเหล็กของการทำ EDA จึงระบุว่า 'ต้องเริ่มต้นด้วย Analytical Question เสมอ' แทนที่จะสร้างกราฟทุกรูปแบบขึ้นมาดู?",
    "options": [
      {
        "id": "A",
        "text": "เพราะคำถามที่ชัดเจนจะเป็นตัวกำหนดตัวแปร การสรุปผล การเปรียบเทียบ และ Visualization ที่ตรงเป้าหมาย แทนการสร้างกราฟสะเปะสะปะโดยไร้ทิศทาง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p4: Question -> Select variables -> Summary & Comparison -> Visualization ที่ตอบโจทย์"
      },
      {
        "id": "B",
        "text": "เพราะช่วยลดขนาดไฟล์ข้อมูลให้เล็กลงในการประมวลผล",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับขนาดไฟล์ข้อมูล"
      },
      {
        "id": "C",
        "text": "เพราะทำให้อัลกอริทึม Machine Learning เลือก hyperparameter อัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: EDA ไม่ได้เลือกอัลกอริทึมอัตโนมัติ"
      },
      {
        "id": "D",
        "text": "เพื่อหลีกเลี่ยงขั้นตอน Data Cleaning",
        "isCorrect": false,
        "explanation": "ผิด: EDA ไม่สามารถแทนที่ Data Cleaning ได้"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q17-skewed-center-spread",
    "questionNumber": 13,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p8-10",
    "title": "การเลือกค่ากลางและการกระจายสำหรับข้อมูลเบ้",
    "scenario": "หากชุดข้อมูลยอดใช้จ่ายมีความเบ้ขวารุนแรง (Extreme Right-Skewed) และมีค่าสุดขั้วสูงมากปะปนอยู่ ควรเลือกคู่ค่ากลางและค่าวัดการกระจายใดจึงจะเหมาะสมที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "Mean + Standard Deviation (SD)",
        "isCorrect": false,
        "explanation": "ผิด: Mean และ SD ไวต่อค่าสุดขั้วมาก จะถูกค่าขวาสุดดึงจนบิดเบี้ยว",
        "distractorTrap": "คุ้นเคยกับ Mean+SD จนลืมดู Skewness"
      },
      {
        "id": "B",
        "text": "Mean + Variance",
        "isCorrect": false,
        "explanation": "ผิด: Variance มีหน่วยยกกำลังสองและถูกกระทบจากค่าสุดขั้วเช่นกัน"
      },
      {
        "id": "C",
        "text": "Median + Interquartile Range (IQR)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p8-10: ข้อมูลเบ้หรือมี Outlier ต้องใช้ Median คู่กับ IQR เพราะมีความทนทาน (Robust) ต่อค่าสุดขั้ว"
      },
      {
        "id": "D",
        "text": "Mode + Range",
        "isCorrect": false,
        "explanation": "ผิด: Range คำนวณจาก Max - Min ซึ่งไวต่อ Outlier มากที่สุด"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q18-multimodal-distribution",
    "questionNumber": 14,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p11",
    "title": "การตีความรูปทรงการกระจายตัวแบบหลายยอด (Multimodal)",
    "scenario": "เมื่อพล็อตกราฟ Histogram แสดงการกระจายตัวของข้อมูลลูกค้า แล้วพบยอดโด่งสองยอดชัดเจน (Bimodal Distribution) ข้อสรุปใดสมเหตุสมผลที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "ข้อมูลบันทึกผิดพลาด ต้องตัดข้อมูลยอดที่สองทิ้งทันที",
        "isCorrect": false,
        "explanation": "ผิด: ห้ามตัดข้อมูลทิ้งโดยไม่ตรวจสอบ"
      },
      {
        "id": "B",
        "text": "ข้อมูลอาจมีกลุ่มย่อย (Sub-populations หรือ Hidden Segments) ซ่อนอยู่มากกว่าหนึ่งกลุ่ม ควรทำการจำแนกกลุ่มย่อยเพื่อวิเคราะห์แยกกัน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p11: Multiple peaks ชี้ว่าอาจมีกลุ่มย่อยซ่อนอยู่ภายในประชากร"
      },
      {
        "id": "C",
        "text": "เกิด Data Leakage ระหว่าง Train และ Test Set",
        "isCorrect": false,
        "explanation": "ผิด: รูปทรงกราฟใน EDA ไม่เกี่ยวกับ Data Leakage"
      },
      {
        "id": "D",
        "text": "สามารถคำนวณค่า Mean เดียวเพื่อเป็นตัวแทนของข้อมูลทั้งหมดได้อย่างสมบูรณ์",
        "isCorrect": false,
        "explanation": "ผิด: ค่า Mean เดียวจะตกอยู่ตรงร่องกลางระหว่างสองยอด ไม่เป็นตัวแทนของกลุ่มใดเลย"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q19-responsible-group-comparison",
    "questionNumber": 15,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p13-14",
    "title": "หลักการเปรียบเทียบกลุ่มอย่างเป็นธรรม (Responsible Group Comparison)",
    "scenario": "สไลด์ Lect 05 p13-14 ระบุว่า 'เปรียบเทียบได้ ≠ รายงานได้ทันที' ก่อนจะรายงานความแตกต่างระหว่างกลุ่ม ต้องผ่านการตรวจสอบ 4 ด้านใดบ้าง?",
    "options": [
      {
        "id": "A",
        "text": "ตรวจเฉพาะค่า p-value < 0.05 ก็เพียงพอแล้ว",
        "isCorrect": false,
        "explanation": "ผิด: สถิติความมีนัยสำคัญเพียงอย่างเดียวไม่พอ"
      },
      {
        "id": "B",
        "text": "Sufficient size (ขนาดกลุ่มเพียงพอ), Differential missingness (การขาดหายต่างกัน), Representation (สัดส่วนประชากร), Privacy (ความเป็นส่วนตัว)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p14: Responsible Group Comparison ต้องตรวจทั้ง 4 ข้อก่อนเผยแพร่"
      },
      {
        "id": "C",
        "text": "ตัดกลุ่มที่มีข้อมูล Missing สูงทิ้งไปโดยไม่ต้องตรวจสอบ",
        "isCorrect": false,
        "explanation": "ผิด: การตัดกลุ่มทิ้งสร้าง Selection Bias"
      },
      {
        "id": "D",
        "text": "บังคับให้ข้อมูลทั้งสองกลุ่มมีขนาดตัวอย่างเท่ากันพอดี",
        "isCorrect": false,
        "explanation": "ผิด: ในชีวิตจริงกลุ่มอาจมีขนาดธรรมชาติไม่เท่ากันได้"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q20-correlation-not-causation",
    "questionNumber": 16,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p15-16",
    "title": "Correlation vs Causation & Alternative Explanations",
    "scenario": "นักวิเคราะห์พบว่าความถี่การเปิดแอปพลิเคชันมีค่าสหสัมพันธ์กับยอดซื้อสินค้า r = +0.88 จึงเสนอให้ส่ง Notification รัวๆ เพื่อเพิ่มยอดขาย ข้อเสนอนี้มีข้อบกพร่องอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "ไม่มีข้อบกพร่อง เพราะ r = 0.88 ถือเป็นความสัมพันธ์ระดับสูงมากสรุปเหตุผลได้เลย",
        "isCorrect": false,
        "explanation": "ผิด: Correlation != Causation"
      },
      {
        "id": "B",
        "text": "Correlation บอกเพียงทิศทางและความแข็งแกร่งของความสัมพันธ์ แต่ไม่ได้พิสูจน์ความเป็นเหตุและผล (Causation) อาจมีตัวแปรแทรกซ้อน (Confounding) เช่น โปรโมชันหรือความพึงพอใจของลูกค้า",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p15-16: ก่อนอ้างเหตุผลต้องตรวจ Confounding, Reverse direction, Selection effects, Coincidence"
      },
      {
        "id": "C",
        "text": "ข้อบกพร่องคือค่า r ต้องเป็น +1.00 เท่านั้นจึงจะสรุปได้",
        "isCorrect": false,
        "explanation": "ผิด: แม้ r = 1.00 ก็ยังไม่ได้รับประกันความเป็นเหตุและผล"
      },
      {
        "id": "D",
        "text": "ข้อบกพร่องคือควรคำนวณผ่าน Silhouette Score แทน",
        "isCorrect": false,
        "explanation": "ผิด: Silhouette ใช้กับ Clustering ไม่ใช่ความสัมพันธ์ของตัวแปร"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "q21-whisker-termination",
    "questionNumber": 17,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p17",
    "title": "จุดสิ้นสุดของเส้นหนวด Whisker ใน Boxplot",
    "scenario": "ในการสร้างกราฟ Boxplot ตามมาตรฐานของ Tukey เส้นหนวด (Whisker) ด้านบนจะลากไปสิ้นสุดที่ตำแหน่งใด?",
    "options": [
      {
        "id": "A",
        "text": "ลากไปหยุดที่เส้น Upper Fence (Q3 + 1.5*IQR) พอดีเสมอ",
        "isCorrect": false,
        "explanation": "ติดกับดัก! Upper Fence เป็นเพียงเส้นเกณฑ์สมมุติ ไม่ใช่จุดสิ้นสุดของหนวด",
        "distractorTrap": "จำสลับระหว่าง Fence กับ Whisker"
      },
      {
        "id": "B",
        "text": "ลากไปสิ้นสุดที่ 'ค่าจริงตัวสุดท้าย' ของข้อมูลที่ยังคงอยู่ภายใน Upper Fence",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p17: Whisker สิ้นสุดที่ค่าจริงตัวสุดท้ายที่ยังอยู่ภายใน Fence (Last actual observation within fence)"
      },
      {
        "id": "C",
        "text": "ลากไปที่จุดข้อมูลที่สูงสุด (Maximum Value) เสมอไม่ว่าจะเป็น Outlier หรือไม่",
        "isCorrect": false,
        "explanation": "ผิด: จุดที่เกิน Fence จะถูกพล็อตแยกเป็นจุด Outlier หนวดจะไม่ลากไปถึง"
      },
      {
        "id": "D",
        "text": "ลากไปที่ค่าเฉลี่ยบวกด้วย 3 เท่าของส่วนเบี่ยงเบนมาตรฐาน",
        "isCorrect": false,
        "explanation": "ผิด: Boxplot อิงค่า Quartile ไม่ได้อิง Mean และ SD"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q22-extreme-outlier",
    "questionNumber": 18,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p18",
    "title": "เกณฑ์ตรวจจับ Extreme Outlier",
    "scenario": "ตามบันทึกการเรียนการสอน (Lect 05 และ dailytest) ข้อมูลจะถูกจัดประเภทเป็น 'Extreme Outlier' เมื่อมีค่าหลุดพ้นขอบเขตใด?",
    "options": [
      {
        "id": "A",
        "text": "Q1 - 1.5*IQR ถึง Q3 + 1.5*IQR",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือขอบเขต Fence ปกติ สำหรับ Potential Outlier"
      },
      {
        "id": "B",
        "text": "น้อยกว่า Q1 - 3.0*IQR หรือมากกว่า Q3 + 3.0*IQR",
        "isCorrect": true,
        "explanation": "ถูกต้องตามโน้ต Lect 05: ขอบเขต 1.5*IQR คือ Potential Outlier ส่วน 3.0*IQR คือเกณฑ์ของ Extreme Outlier"
      },
      {
        "id": "C",
        "text": "ค่าที่เกิน 2 เท่าของค่ามัธยฐาน",
        "isCorrect": false,
        "explanation": "ผิด: ไม่มีเกณฑ์ 2 เท่าของมัธยฐาน"
      },
      {
        "id": "D",
        "text": "ค่าที่มี Z-Score เกิน 1.5",
        "isCorrect": false,
        "explanation": "ผิด: Tukey Fence อิง IQR ไม่ใช่อิง Z-Score"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q23-palette-discipline",
    "questionNumber": 19,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p23",
    "title": "วินัยการเลือกชุดสี (Palette Discipline) ใน Visualization",
    "scenario": "ข้อใดจับคู่ประเภทของชุดสี (Color Palette) กับลักษณะของข้อมูลได้ถูกต้องตามหลักการออกแบบสถิติใน Lect 05 p23?",
    "options": [
      {
        "id": "A",
        "text": "ข้อมูลหมวดหมู่ไม่มีลำดับ -> Qualitative | ข้อมูลตัวเลขน้อยไปมาก -> Sequential | ข้อมูลเบี่ยงเบนจากจุดกึ่งกลาง -> Diverging",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p23: Qualitative (หมวดหมู่), Sequential (ไล่ระดับค่า), Diverging (เบี่ยงจาก midpoint)"
      },
      {
        "id": "B",
        "text": "ข้อมูลหมวดหมู่ไม่มีลำดับ -> Sequential | ข้อมูลตัวเลขน้อยไปมาก -> Qualitative | ข้อมูลเบี่ยงเบน -> Diverging",
        "isCorrect": false,
        "explanation": "ผิด: สลับระหว่าง Qualitative กับ Sequential"
      },
      {
        "id": "C",
        "text": "ข้อมูลตัวเลขน้อยไปมาก -> Diverging | ข้อมูลเบี่ยงเบน -> Sequential | หมวดหมู่ -> Qualitative",
        "isCorrect": false,
        "explanation": "ผิด: Diverging ใช้เมื่อมี meaningful midpoint"
      },
      {
        "id": "D",
        "text": "ใช้สีรุ้ง (Rainbow Palette) กับข้อมูลทุกชนิดเพื่อดึงดูดสายตา",
        "isCorrect": false,
        "explanation": "ผิด: Rainbow Palette บิดเบือนการรับรู้ของมนุษย์และไม่เป็นไปตามหลัก Accessibility"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q24-redundant-encoding",
    "questionNumber": 20,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p25",
    "title": "หลักการ Redundant Encoding และ Accessibility",
    "scenario": "ข้อความ 'Never rely on color alone' ในการสื่อสารข้อมูล หมายถึงข้อปฏิบัติใดตามสไลด์ Lect 05 p25?",
    "options": [
      {
        "id": "A",
        "text": "ห้ามใช้สีในกราฟเด็ดขาด ให้ใช้ภาพขาวดำล้วนเท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: สามารถใช้สีได้ แต่ห้ามใช้เป็นตัวแยกแยะเพียงอย่างเดียว"
      },
      {
        "id": "B",
        "text": "ต้องใช้สีควบคู่กับสัญลักษณ์อื่นเสมอ (Redundant Encoding เช่น สี + รูปร่าง/ป้ายกำกับ/ชนิดเส้น) พร้อมจำลองมุมมองผู้มีความบกพร่องทางสายตา (CVD)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p25: Redundant Encoding ป้องกันความเข้าใจผิดและรองรับ Color-vision deficiency"
      },
      {
        "id": "C",
        "text": "ใช้คู่สีแดงและเขียวเป็นตัวแยกแยะหลักในทุกกรณี",
        "isCorrect": false,
        "explanation": "ผิด: คู่สีแดง-เขียวเป็นปัญหาหลักของผู้มีภาวะตาบอดสี (Red-Green CVD)"
      },
      {
        "id": "D",
        "text": "ให้ผู้ใช้งานปรับแต่งสีหน้าจอคอมพิวเตอร์ด้วยตนเอง",
        "isCorrect": false,
        "explanation": "ผิด: เป็นหน้าที่ของผู้ออกแบบกราฟ"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q25-data-story-structure",
    "questionNumber": 21,
    "moduleRef": "module-04-eda-outliers",
    "slideRef": "Lect 05 p28",
    "title": "โครงสร้างการเล่าเรื่องข้อมูล (Data Story)",
    "scenario": "โครงสร้างการนำเสนอ Data Story ที่น่าเชื่อถือตามมาตรฐานใน Lect 05 p28 ประกอบด้วย 5 องค์ประกอบที่เรียงตามลำดับใด?",
    "options": [
      {
        "id": "A",
        "text": "Algorithm -> Hyperparameters -> Training -> Testing -> Accuracy",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือขั้นตอนทางเทคนิค ไม่ใช่ Data Story"
      },
      {
        "id": "B",
        "text": "Context (บริบท) -> Evidence (หลักฐาน) -> Insight (ข้อค้นพบ) -> Limitation (ข้อจำกัด) -> Implication (ข้อเสนอแนะ)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p28: Data Story ต้องระบุบริบท หลักฐาน ข้อค้นพบ ข้อจำกัด และข้อเสนอแนะทางธุรกิจ"
      },
      {
        "id": "C",
        "text": "Problem -> Code -> Dashboard -> Profit -> Expansion",
        "isCorrect": false,
        "explanation": "ผิด: ขาดหลักฐานและข้อจำกัด"
      },
      {
        "id": "D",
        "text": "Descriptive -> Diagnostic -> Predictive -> Prescriptive -> AI",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือ Analytics Continuum"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q26-ml-decision-need",
    "questionNumber": 22,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p4-5",
    "title": "การตัดสินใจความจำเป็นในการใช้ Machine Learning",
    "scenario": "หลักการ 'Start with the decision need — not with machine learning' ชี้ว่าปัญหาข้อใดไม่จำเป็นต้องใช้ Machine Learning?",
    "options": [
      {
        "id": "A",
        "text": "การทำนายว่าลูกค้าคนใดมีโอกาสหยุดซื้อสินค้าในอีก 60 วันข้างหน้า",
        "isCorrect": false,
        "explanation": "ผิด: เป็นงาน Predictive Classification ที่ควรใช้ ML"
      },
      {
        "id": "B",
        "text": "การประมาณการยอดใช้จ่ายล่วงหน้าของลูกค้าใหม่ในไตรมาสถัดไป",
        "isCorrect": false,
        "explanation": "ผิด: เป็นงาน Predictive Regression ที่ควรใช้ ML"
      },
      {
        "id": "C",
        "text": "การหามูลค่าคำสั่งซื้อมัธยฐานของแต่ละสาขาในเดือนที่ผ่านมา",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p4-5: เป็นเพียง Descriptive Summary/Visualization ตอบได้ทันทีโดยไม่ต้องใช้ ML"
      },
      {
        "id": "D",
        "text": "การตรวจจับธุรกรรมการเงินที่ผิดปกติและอาจเป็นการทุจริตแบบเรียลไทม์",
        "isCorrect": false,
        "explanation": "ผิด: เป็นงาน Anomaly Detection/Unsupervised ที่ควรใช้ ML"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q27-five-levels-hierarchy",
    "questionNumber": 23,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p7-8",
    "title": "ลำดับชั้น 5 ระดับจากโจทย์สู่โมเดล",
    "scenario": "ลำดับ 5 ระดับที่ไม่ควรสลับขั้นตอนในการพัฒนาแบบจำลองตามสไลด์ Lect 06 คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "Algorithm -> Modeling Task -> Problem -> Learning Setting -> Trained Model",
        "isCorrect": false,
        "explanation": "ผิด: ต้องเริ่มจาก Problem ไม่ใช่เริ่มจาก Algorithm"
      },
      {
        "id": "B",
        "text": "Problem -> Learning Setting -> Modeling Task -> Algorithm -> Trained Model",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p7-8: เริ่มจากนิยามปัญหา -> กำหนด setting -> เลือก task -> เลือก algorithm -> ฝึกสอนจนได้ trained model"
      },
      {
        "id": "C",
        "text": "Modeling Task -> Algorithm -> Problem -> Trained Model -> Evaluation",
        "isCorrect": false,
        "explanation": "ผิด: ขาด Learning Setting"
      },
      {
        "id": "D",
        "text": "Problem -> Algorithm -> Code -> Parameters -> Deployment",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ตรงกับกรอบ 5 ระดับในสไลด์"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q28-algorithm-vs-trained-model",
    "questionNumber": 24,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p9",
    "title": "ความแตกต่างระหว่าง Algorithm กับ Trained Model",
    "scenario": "ข้อใดระบุความแตกต่างระหว่าง 'Algorithm' และ 'Trained Model' ได้ถูกต้องตามหลักวิทยาศาสตร์ข้อมูล?",
    "options": [
      {
        "id": "A",
        "text": "Algorithm คือโมเดลที่บันทึกเป็นไฟล์พร้อมใช้งาน ส่วน Trained Model คือโค้ดที่ยังไม่ได้รัน",
        "isCorrect": false,
        "explanation": "ผิด: สลับความหมายกัน"
      },
      {
        "id": "B",
        "text": "Algorithm คือระเบียบวิธีเรียนรู้ทั่วไปที่ยังไม่ได้ผ่านการฝึกสอน ส่วน Trained Model คือผลลัพธ์ที่ได้หลังนำ Algorithm ไป Fit กับชุดข้อมูลเฉพาะจนได้ rules/parameters",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p9: Training turns an Algorithm into a Trained Model"
      },
      {
        "id": "C",
        "text": "ทั้งสองคำมีความหมายเหมือนกันทุกประการ ใช้แทนกันได้ตามสะดวก",
        "isCorrect": false,
        "explanation": "ผิด: มีความหมายต่างกันในระดับสถาปัตยกรรม"
      },
      {
        "id": "D",
        "text": "Algorithm ใช้ได้เฉพาะกับข้อมูลที่เป็นรูปภาพเท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: Algorithm ใช้ได้กับข้อมูลทุกชนิด"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q29-observation-feature-timing",
    "questionNumber": 25,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p12-13",
    "title": "ช่วงเวลาของการสร้าง Feature (Observation Date Rule)",
    "scenario": "ในการสร้างชุดข้อมูลเพื่อทำนายว่า 'ลูกค้าจะหยุดซื้อสินค้าภายใน 60 วันข้างหน้าหรือไม่' ตัวแปร Feature ที่นำมาฝึกสอนโมเดลจะต้องถูกสร้างจากข้อมูลช่วงเวลาใด?",
    "options": [
      {
        "id": "A",
        "text": "ข้อมูลพฤติกรรมที่เกิดขึ้นหลังวันสังเกตการณ์ (Observation Date)",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือช่วงเวลาของ Target จะเกิด Data Leakage ทันที"
      },
      {
        "id": "B",
        "text": "ข้อมูลพฤติกรรมที่มีอยู่จริง 'ก่อนหรือ ณ วันสังเกตการณ์ (Observation Date)' เท่านั้น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p12-13: Feature ต้องเป็นข้อมูลที่มีอยู่ก่อนเวลาทำนายเท่านั้น"
      },
      {
        "id": "C",
        "text": "ข้อมูลเฉลี่ยตลอดทั้งปีถัดไปเพื่อความสมบูรณ์",
        "isCorrect": false,
        "explanation": "ผิด: เป็นข้อมูลจากอนาคต"
      },
      {
        "id": "D",
        "text": "ข้อมูลใดก็ได้ที่มีอยู่ในตารางฐานข้อมูล ณ วันที่วิศวกรเขียนโค้ด",
        "isCorrect": false,
        "explanation": "ผิด: อาจมีข้อมูลหลังเหตุการณ์ปะปนเข้ามา"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q30-supervised-vs-unsupervised",
    "questionNumber": 26,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p15",
    "title": "เกณฑ์จำแนก Supervised vs Unsupervised Learning",
    "scenario": "ข้อใดคือเกณฑ์สำคัญที่สุดในการจำแนกระหว่าง Supervised Learning และ Unsupervised Learning?",
    "options": [
      {
        "id": "A",
        "text": "Supervised คือมีมนุษย์คอยควบคุมระหว่างที่โมเดลกำลังเทรน ส่วน Unsupervised ปล่อยให้รันอัตโนมัติ",
        "isCorrect": false,
        "explanation": "ติดกับดัก! สไลด์ระบุชัดเจนว่า 'Supervised != มีคนเฝ้าระหว่าง training'",
        "distractorTrap": "แปลคำว่า Supervised ตรงตัวว่ามีผู้ควบคุม"
      },
      {
        "id": "B",
        "text": "แยกกันที่ 'มี Labeled Target (ตัวแปรเป้าหมาย y ที่ทราบค่า)' ในชุดข้อมูลฝึกสอนหรือไม่",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p15: Supervised มี Known Target ส่วน Unsupervised ไม่มีเป้าหมายเฉลยล่วงหน้า"
      },
      {
        "id": "C",
        "text": "Supervised ใช้กับข้อมูลตัวเลข ส่วน Unsupervised ใช้กับข้อมูลตัวหนังสือ",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับชนิดข้อมูล"
      },
      {
        "id": "D",
        "text": "Supervised ไม่มีความเสี่ยงต่อการเกิด Overfitting",
        "isCorrect": false,
        "explanation": "ผิด: Supervised สามารถเกิด Overfitting ได้เสมอ"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q31-cluster-vs-predefined-class",
    "questionNumber": 27,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p16",
    "title": "คลัสเตอร์ไม่ใช่คลาสสำเร็จรูป (Cluster != Predefined Class)",
    "scenario": "ทำไมสไลด์ Lect 06 p16 จึงย้ำเตือนว่า 'Cluster != Predefined class != Ground truth'?",
    "options": [
      {
        "id": "A",
        "text": "เพราะ Clustering เพียงแค่เสนอแนะกลุ่มผู้สมัคร (Candidate Groups) ตามฟีเจอร์ที่เลือก ไม่ได้รับรองว่ากลุ่มนั้นเป็นความจริงแท้ในธรรมชาติหรือธุรกิจ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p16: Clustering is subjective กลุ่มขึ้นกับฟีเจอร์ที่เลือกและไม่มี ground truth ยืนยัน"
      },
      {
        "id": "B",
        "text": "เพราะผลการรัน Clustering มีข้อผิดพลาดทางคณิตศาสตร์เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: การคำนวณทางคณิตศาสตร์ถูกต้องตามสูตร"
      },
      {
        "id": "C",
        "text": "เพราะต้องส่งให้โมเดล Decision Tree ทำนายซ้ำอีกครั้งก่อนจึงจะเป็น Class ได้",
        "isCorrect": false,
        "explanation": "ผิด: ไม่จำเป็นต้องใช้ Decision Tree มาเปลี่ยนชื่อ"
      },
      {
        "id": "D",
        "text": "เพราะโมเดล Clustering ใช้งานจริงในภาคธุรกิจไม่ได้",
        "isCorrect": false,
        "explanation": "ผิด: Clustering ใช้งานอย่างแพร่หลายในงาน Customer Segmentation"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q32-feature-leakage-test",
    "questionNumber": 28,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p18",
    "title": "การทดสอบ Feature Leakage ในขั้นตอน Feature Engineering",
    "scenario": "วิศวกรข้อมูลต้องการตรวจสอบว่าฟีเจอร์ใดมีปัญหาข้อมูลอนาคตรั่วไหล (Data Leakage) หรือไม่ คำถามทดสอบ (Leakage Test) ที่ถูกต้องคือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "'ฟีเจอร์นี้มีค่าความสัมพันธ์กับตัวแปรอื่นเกิน 0.8 หรือไม่?'",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือการเช็ก Multicollinearity"
      },
      {
        "id": "B",
        "text": "'ข้อมูลนี้มีอยู่จริง ณ จังหวะเวลาที่โมเดลต้องสร้างคำทำนาย (Prediction Time) ในการใช้งานจริงหรือไม่?'",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p18: ถ้าฟีเจอร์นั้นเกิดหลังเวลาทำนาย (เช่น purchases_next_60_days) จะเกิด Leakage ทันที"
      },
      {
        "id": "C",
        "text": "'ฟีเจอร์นี้มีค่าขาดหายเกิน 20% หรือไม่?'",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือการเช็ก Missing Value"
      },
      {
        "id": "D",
        "text": "'ฟีเจอร์นี้ถูกประมวลผลบน RAM หรือ SSD?'",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับสถาปัตยกรรมฮาร์ดแวร์"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q33-baseline-model-purpose",
    "questionNumber": 29,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p21",
    "title": "บทบาทและประโยชน์ของการสร้าง Simple Baseline",
    "scenario": "ทำไมในการทดลองทาง Data Science จึงต้องเริ่มพัฒนาโมเดลแบบ Simple Baseline (เช่น Logistic Regression) ก่อนการใช้โมเดลที่ซับซ้อน?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อเป็นจุดอ้างอิง (Benchmark) ประเมินว่าความซับซ้อนและต้นทุนที่เพิ่มขึ้นของโมเดลขั้นสูง ให้ผลตอบแทนด้านประสิทธิภาพที่คุ้มค่าจริงหรือไม่",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p21: Baseline ให้จุดเปรียบเทียบว่า complexity ที่เพิ่มคุ้มหรือไม่"
      },
      {
        "id": "B",
        "text": "เพื่อส่งมอบให้ลูกค้าใช้งานชั่วคราวก่อนโมเดลจริงจะเสร็จ",
        "isCorrect": false,
        "explanation": "ผิด: Baseline ใช้ในการทดลองประเมินผล"
      },
      {
        "id": "C",
        "text": "เพราะโมเดล Simple Baseline มี Accuracy สูงกว่าโมเดลซับซ้อนเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: โดยทั่วไปโมเดลซับซ้อนอาจจับความสัมพันธ์ที่ไม่เป็นเชิงเส้นได้ดีกว่า"
      },
      {
        "id": "D",
        "text": "เพื่อหลีกเลี่ยงการแบ่งข้อมูล Train และ Test",
        "isCorrect": false,
        "explanation": "ผิด: ทุกโมเดลต้องแบ่งชุดข้อมูลประเมินผล"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q34-test-set-isolation",
    "questionNumber": 30,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p24",
    "title": "หลักการแยกเก็บชุดข้อมูลทดสอบ (Test Data Isolation)",
    "scenario": "ข้อใดกล่าวถึงบทบาทและการปฏิบัติต่อชุดข้อมูล Test Data ได้อย่างถูกต้องที่สุดตามสไลด์ Lect 06 p24?",
    "options": [
      {
        "id": "A",
        "text": "นำ Test Data มาใช้ช่วยตัดสินใจปรับจูน Hyperparameter ทุกรอบของการทดลอง",
        "isCorrect": false,
        "explanation": "ผิดมหันต์! การจูนบน Test Data จะทำให้เกิด Overfitting to test set และประเมินผลจริงไม่ได้",
        "distractorTrap": "คิดว่าใช้ Test Data ปรับจูนโมเดลได้"
      },
      {
        "id": "B",
        "text": "Test Data คือหลักฐานอิสระขั้นสุดท้าย ต้องเก็บแยกไว้จนกว่าการตัดสินใจเรื่องโมเดลทั้งหมดจะเสร็จสิ้น และแตะต้องได้เพียงครั้งเดียว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p24: Test Data = Independent final verification แตะได้ครั้งเดียวหลัง modeling เสร็จ"
      },
      {
        "id": "C",
        "text": "นำ Test Data มารวมกับ Training Data ก่อนคำนวณ Feature Scaling",
        "isCorrect": false,
        "explanation": "ผิด: สาเหตุหลักของการเกิด Data Leakage"
      },
      {
        "id": "D",
        "text": "Test Data มีไว้สำหรับการทำ Data Cleaning เท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ใช่หน้าที่ของ Test Data"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q35-overfit-underfit-diagnosis",
    "questionNumber": 31,
    "moduleRef": "module-05-modeling-framework",
    "slideRef": "Lect 06 p25",
    "title": "การวินิจฉัย Overfitting และ Underfitting จากคะแนน",
    "scenario": "ผลการทดสอบพบว่าโมเดลได้ Accuracy บน Training Set = 99% แต่ได้บน Validation Set = 68% ผลลัพธ์นี้บ่งชี้ถึงสภาวะใดและควรแก้ไขอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "Likely Underfitting ควรเพิ่มความลึกและพารามิเตอร์ของโมเดลให้มากขึ้น",
        "isCorrect": false,
        "explanation": "ผิด: Underfitting คือคะแนนต่ำทั้ง Train และ Validation"
      },
      {
        "id": "B",
        "text": "Likely Overfitting ควรลดความซับซ้อนของโมเดล (เช่น จำกัด max_depth) หรือเพิ่ม Regularization เพื่อให้ Generalize ได้ดีขึ้น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p25: Train สูงแต่ Val ต่ำชัดเจน = Overfitting"
      },
      {
        "id": "C",
        "text": "Appropriate fit โมเดลพร้อมนำไป Deploy บน Production ได้ทันที",
        "isCorrect": false,
        "explanation": "ผิด: ผลการทดสอบ Validation ห่างจาก Train มากเกินไป"
      },
      {
        "id": "D",
        "text": "เกิด Data Leakage ทำให้ Validation Set มีคะแนนต่ำผิดปกติ",
        "isCorrect": false,
        "explanation": "ผิด: Data Leakage มักทำให้คะแนนสูงผิดปกติทั้งสองชุด"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q05-gini-gain",
    "questionNumber": 32,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 p11-12",
    "title": "การเลือกจุดตัดกิ่ง Decision Tree (Candidate A vs B)",
    "scenario": "โหนดแม่มี Gini = 0.500 อัลกอริทึมเสนอจุดตัดกิ่ง 2 ทางเลือก: Candidate A ให้ Gini_split = 0.278 ส่วน Candidate B ให้ Gini_split = 0.444 ควรเลือกทางใด?",
    "options": [
      {
        "id": "A",
        "text": "เลือก Candidate B เพราะมี Gini_split สูงกว่า",
        "isCorrect": false,
        "explanation": "ผิด: Gini_split ยิ่งสูงแปลว่ายิ่งไม่บริสุทธิ์"
      },
      {
        "id": "B",
        "text": "เลือก Candidate A เพราะให้ Gini Gain สูงกว่า (0.222 > 0.056)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p12: Gain(A) = 0.500 - 0.278 = 0.222 ชนะ Gain(B) = 0.500 - 0.444 = 0.056"
      },
      {
        "id": "C",
        "text": "เลือกได้ทั้งสองตัวเลือกเพราะมาจากโหนดแม่เดียวกัน",
        "isCorrect": false,
        "explanation": "ผิด: ต้องเลือกตัวที่ให้ Gain สูงสุด"
      },
      {
        "id": "D",
        "text": "ไม่เลือกทั้งสองตัวเลือก และให้หยุดขยายกิ่งทันที",
        "isCorrect": false,
        "explanation": "ผิด: Candidate A ลดความไม่บริสุทธิ์ลงได้อย่างมีนัยสำคัญ"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q06-tree-depth",
    "questionNumber": 33,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 p19, p31",
    "title": "บันไดความลึกต้นไม้ max_depth & Overfitting",
    "scenario": "ในการฝึกสอน Decision Tree ทำไมอาจารย์จึงเลือก Moderate Tree (max_depth = 3) เป็นโมเดลที่ดีที่สุดแทนที่จะเลือก Unrestricted Depth?",
    "options": [
      {
        "id": "A",
        "text": "เพราะ max_depth = 3 ให้ค่า Training Error ต่ำที่สุดเมื่อเทียบกับความลึกทุกแบบ",
        "isCorrect": false,
        "explanation": "ผิดตามสไลด์ Lect 07 p19: โมเดลที่กด Training Error ต่ำสุดคือ Unrestricted Tree แต่จะเกิด Overfitting บน Validation Set"
      },
      {
        "id": "B",
        "text": "เพราะ max_depth = 3 ให้จุดสมดุล Bias-Variance ที่ดีที่สุด ส่งผลให้ได้ประสิทธิภาพสูงสุดบน Validation Set",
        "isCorrect": true,
        "explanation": "ถูกต้องตามตาราง Bias-Variance Matrix (p19, p31): Moderate tree ไม่เกิด Underfitting และไม่ Overfitting บน Validation set"
      },
      {
        "id": "C",
        "text": "เพราะต้นไม้ความลึก 3 คำนวณได้เร็วกว่า",
        "isCorrect": false,
        "explanation": "ผิด: ความเร็วไม่ใช่เหตุผลหลักทางสถิติ"
      },
      {
        "id": "D",
        "text": "เพราะโมเดลต้นไม้ไม่สามารถสร้างลึกเกิน 3 ชั้นได้",
        "isCorrect": false,
        "explanation": "ผิด: ต้นไม้สามารถสร้างลึกเท่าใดก็ได้"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q36-greedy-tree-splitting",
    "questionNumber": 34,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 p6-7",
    "title": "กลยุทธ์ Greedy Splitting ใน Decision Tree",
    "scenario": "อัลกอริทึม Decision Tree ใช้หลักการ 'Greedy Recursive Splitting' ซึ่งมีข้อจำกัดทางทฤษฎีที่สำคัญคือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ไม่สามารถประมวลผลข้อมูลที่เป็นตัวเลขได้",
        "isCorrect": false,
        "explanation": "ผิด: Decision Tree รองรับทั้งข้อมูลตัวเลขและ categorical"
      },
      {
        "id": "B",
        "text": "เลือกจุดตัดที่ดีที่สุดเฉพาะหน้า ณ โหนดปัจจุบัน (Local Optimum) โดยไม่รับประกันว่าจะได้ต้นไม้ที่ดีที่สุดในภาพรวมทั้งหมด (Global Optimum)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p6-7: Greedy ประเมิน candidate ที่ดีที่สุด ณ จุดนั้น จึงไม่รับประกัน Global Optimum"
      },
      {
        "id": "C",
        "text": "ไม่สามารถสร้างต้นไม้ที่มีความลึกเกิน 2 ชั้นได้",
        "isCorrect": false,
        "explanation": "ผิด: สามารถแตกกิ่งได้ลึกตามพารามิเตอร์ที่กำหนด"
      },
      {
        "id": "D",
        "text": "ต้องใช้เวลานานกว่า Deep Neural Network ในการฝึกสอนเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: Decision Tree ฝึกสอนได้รวดเร็วกว่า Neural Network มาก"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q37-gini-calculation-exact",
    "questionNumber": 35,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 p8",
    "title": "การคำนวณ Gini Impurity ของโหนด",
    "scenario": "โหนดหนึ่งมีตัวอย่างทั้งหมด 6 รายการ แบ่งเป็น Active 5 รายการ และ Inactive 1 รายการ จงคำนวณค่า Gini Impurity ของโหนดนี้ตามสูตร Gini = 1 - sum(p_k^2)?",
    "options": [
      {
        "id": "A",
        "text": "0.500",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือค่า Gini ของโหนดแม่ที่มีสัดส่วน 50/50"
      },
      {
        "id": "B",
        "text": "0.278 (คำนวณจาก 1 - (5/6)^2 - (1/6)^2 = 1 - 25/36 - 1/36 = 10/36)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p8: Gini = 1 - (25/36) - (1/36) = 10/36 ≈ 0.278"
      },
      {
        "id": "C",
        "text": "0.167",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือสัดส่วน 1/6"
      },
      {
        "id": "D",
        "text": "0.833",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือสัดส่วน 5/6"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q38-leaf-probability-interpretation",
    "questionNumber": 36,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 p15",
    "title": "การแปลผลความน่าจะเป็นใน Leaf Node",
    "scenario": "เมื่อพิจารณา Leaf Node ของ Decision Tree ที่ระบุว่า P(Inactive) = 4/5 = 0.80 สไลด์ Lect 07 p15 ย้ำเตือนการแปลผลค่านี้ไว้อย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "เป็นความน่าจะเป็นที่ Calibrated สมบูรณ์แล้ว สามารถใช้เป็นความมั่นใจในโลกจริงได้ 80% ทันที",
        "isCorrect": false,
        "explanation": "ติดกับดัก! สไลด์ระบุชัดว่า 'ไม่ใช่ Calibrated Confidence'",
        "distractorTrap": "คิดว่าสัดส่วนใน Leaf คือความน่าจะเป็นที่แท้จริงของโลก"
      },
      {
        "id": "B",
        "text": "เป็นเพียงสัดส่วนตัวอย่างของคลาสใน Training Set ที่ตกอยู่ในโหนดนั้น ไม่ใช่ Calibrated Confidence ที่สะท้อนความจริงในโลกภายนอก",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p15: สัดส่วนใน Leaf เป็นเพียง empirical training ratio ไม่ใช่ calibrated probability"
      },
      {
        "id": "C",
        "text": "แปลว่าโมเดลทำนายผิดพลาด 20% บน Test Set",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับ Test Set"
      },
      {
        "id": "D",
        "text": "แปลว่าโหนดนี้มีค่า Gini เท่ากับ 0.80",
        "isCorrect": false,
        "explanation": "ผิด: ค่า Gini ไม่ใช่สัดส่วนความน่าจะเป็น"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q39-tree-stopping-rules",
    "questionNumber": 37,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 p17",
    "title": "เงื่อนไขการหยุดแตกกิ่งของต้นไม้ (Stopping Rules)",
    "scenario": "ข้อใดต่อไปนี้ 'ไม่ใช่' เงื่อนไข Stopping Rule มาตรฐานที่ใช้หยุดการแตกกิ่งของ Decision Tree ระหว่างการฝึกสอน?",
    "options": [
      {
        "id": "A",
        "text": "ความลึกของต้นไม้ถึงขีดจำกัดที่กำหนดไว้ (max_depth)",
        "isCorrect": false,
        "explanation": "เป็น stopping rule หลักในการควบคุมความซับซ้อน"
      },
      {
        "id": "B",
        "text": "โหนดมีความบริสุทธิ์แล้ว (Gini = 0) หรือไม่มีจุดตัดใดที่ช่วยเพิ่ม Impurity Gain ได้อีก",
        "isCorrect": false,
        "explanation": "เป็น stopping rule ตามธรรมชาติของอัลกอริทึม"
      },
      {
        "id": "C",
        "text": "จำนวนตัวอย่างในโหนดเหลือน้อยกว่าเกณฑ์ขั้นต่ำ (min_samples_split)",
        "isCorrect": false,
        "explanation": "เป็น stopping rule เพื่อป้องกัน overfitting"
      },
      {
        "id": "D",
        "text": "ค่า Accuracy บนชุดข้อมูล Test Set ทะลุเกิน 80%",
        "isCorrect": true,
        "explanation": "ถูกต้อง: Test Set ห้ามถูกนำมาใช้ระหว่างขั้นตอนการสร้างต้นไม้เด็ดขาด จึงไม่ใช่ Stopping Rule!"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q40-hyperparameter-tuning-target",
    "questionNumber": 38,
    "moduleRef": "module-06-decision-tree",
    "slideRef": "Lect 07 p18",
    "title": "ชุดข้อมูลที่ใช้เลือกความลึกของต้นไม้ (max_depth)",
    "scenario": "ในการคัดเลือกค่าความลึกที่เหมาะสมที่สุดของต้นไม้ (max_depth) วิศวกรข้อมูลจะต้องประเมินและตัดสินใจเลือกจากประสิทธิภาพบนชุดข้อมูลใด?",
    "options": [
      {
        "id": "A",
        "text": "Training Set",
        "isCorrect": false,
        "explanation": "ผิด: ถ้าเลือกจาก Train จะได้ต้นไม้ลึกที่สุดเสมอ (Unrestricted) ซึ่งเสี่ยงต่อ Overfitting"
      },
      {
        "id": "B",
        "text": "Validation Set",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p18: เลือก max_depth จาก Validation performance เพื่อหาจุดสมดุล Bias-Variance"
      },
      {
        "id": "C",
        "text": "Test Set",
        "isCorrect": false,
        "explanation": "ผิดมหันต์: ห้ามนำ Test Set มาใช้จูนโมเดล"
      },
      {
        "id": "D",
        "text": "Raw Uncleaned Data",
        "isCorrect": false,
        "explanation": "ผิด: ข้อมูลต้องผ่านการเตรียมก่อนประเมิน"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q07-fifa-precision",
    "questionNumber": 39,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p23, p30",
    "title": "FIFA World Cup 2026 Model Precision",
    "scenario": "โมเดลคัดเลือกนักเตะ 10 คน กำหนด Positive Class = \"play\" ได้ผล Confusion Matrix: TP = 4, FN = 2, FP = 1, TN = 3 จงคำนวณค่า Precision?",
    "options": [
      {
        "id": "A",
        "text": "0.67 หรือ 66.67% (4 / 6)",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือค่า Recall = TP / (TP + FN)",
        "distractorTrap": "สับสนกับ Recall"
      },
      {
        "id": "B",
        "text": "0.70 หรือ 70.00% (7 / 10)",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือค่า Accuracy = (TP + TN) / Total"
      },
      {
        "id": "C",
        "text": "0.80 หรือ 80.00% (4 / (4 + 1) = 4 / 5)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p23, p30: Precision = TP / (TP + FP) = 4 / 5 = 0.80"
      },
      {
        "id": "D",
        "text": "0.73 หรือ 73.00%",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือค่า F1-Score"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q08-hw2-tradeoff",
    "questionNumber": 40,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p35",
    "title": "การเลือกโมเดลตามบริบทธุรกิจ (HW#2 Case Study)",
    "scenario": "ผลการทดสอบลูกค้า 100 ราย: Model A (Prec=0.89, Rec=0.60) | Model B (Prec=0.67, Rec=0.90) | Model C (Prec=0.82, Rec=0.80, F1=0.81, Acc=0.85) หากบริษัทมีนโยบาย \"ยอมติดต่อลูกค้าฟรี แต่รับไม่ได้เด็ดขาดถ้าลูกค้าจะเลิกใช้บริการแล้วเราไม่รู้ตัว (Missed Churn)\" ควรเลือกโมเดลใด?",
    "options": [
      {
        "id": "A",
        "text": "Model A เพราะโทรไปหาใครแล้วแม่นยำที่สุด (Precision 0.89)",
        "isCorrect": false,
        "explanation": "ผิด: Model A มี Recall แค่ 0.60 ปล่อยลูกค้าหลุดมือถึง 40% (FN = 16)"
      },
      {
        "id": "B",
        "text": "Model B เพราะมีค่า Recall สูงถึง 0.90 สามารถตรวจจับลูกค้าที่จะหนีได้ถึง 90% ตรงกับต้นทุนธุรกิจที่กลัว FN",
        "isCorrect": true,
        "explanation": "ถูกต้องตามเฉลย HW#2: เมื่อ Missed Churn เป็นหายนะ ต้องเลือกโมเดลที่ Maximize Recall แม้จะต้องแลกกับ FP=18"
      },
      {
        "id": "C",
        "text": "Model C เพราะมี F1-Score และ Accuracy รวมสูงสุด",
        "isCorrect": false,
        "explanation": "ผิด: Model C เหมาะกับกรณีต้องการความสมดุล แต่โจทย์ระบุว่ากลัวลูกค้าหนีมากเป็นพิเศษ"
      },
      {
        "id": "D",
        "text": "ไม่สามารถตัดสินใจได้จนกว่าจะนำไปเทรนใหม่",
        "isCorrect": false,
        "explanation": "ผิด: สามารถตัดสินใจได้จากความเสี่ยงทางธุรกิจ"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "q41-confusion-matrix-fp",
    "questionNumber": 41,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p22",
    "title": "ความหมายของ False Positive (FP) ในโจทย์ Churn",
    "scenario": "ในโจทย์ทำนายลูกค้าจะหยุดใช้บริการ กำหนด Positive Class = 'Inactive' ความผิดพลาดแบบ False Positive (FP) มีความหมายทางธุรกิจตรงกับข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ลูกค้าหยุดใช้บริการจริง แต่โมเดลทายว่ายังใช้งานอยู่ ทำให้ไม่ได้ติดต่อลูกค้า",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือ False Negative (FN)"
      },
      {
        "id": "B",
        "text": "ลูกค้ายังคงใช้งานต่อเนื่อง (Active) แต่โมเดลทำนายผิดว่ากำลังจะหยุดใช้บริการ (Inactive) ส่งผลให้ทีมการตลาดโทรไปติดต่อหรือมอบส่วนลดโดยไม่จำเป็น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p22: Predicted Positive (Inactive) แต่ Actual Negative (Active) = FP"
      },
      {
        "id": "C",
        "text": "ลูกค้าไม่เคยเข้ามาใช้งานระบบตั้งแต่แรก",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ตรงกับนิยาม Confusion Matrix"
      },
      {
        "id": "D",
        "text": "โมเดลทำนายได้ถูกต้องสมบูรณ์แบบ",
        "isCorrect": false,
        "explanation": "ผิด: FP คือความผิดพลาด ไม่ใช่ความถูกต้อง"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q42-confusion-matrix-fn",
    "questionNumber": 42,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p23",
    "title": "ความหมายของ False Negative (FN) ในโจทย์ฟุตบอล",
    "scenario": "ในการคัดเลือกนักฟุตบอลลงแข่งขัน กำหนด Positive Class = 'play' ความผิดพลาดแบบ False Negative (FN) ส่งผลกระทบต่อทีมอย่างไรตามสไลด์ Lect 07 p23?",
    "options": [
      {
        "id": "A",
        "text": "ส่งนักฟุตบอลที่ไม่พร้อมลงสนามจนเล่นแพ้",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือ False Positive (ทายว่าพร้อม แต่จริงไม่พร้อม)"
      },
      {
        "id": "B",
        "text": "ระบบทำนายว่านักกีฬาไม่พร้อมเล่น (ทาย Negative) ทั้งที่ในความเป็นจริงนักกีฬาพร้อมสมบูรณ์ (Actual Positive) ส่งผลให้ทีมเสียโอกาสส่งผู้เล่นฝีมือดีลงสนาม",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p23: FN คือทายว่าไม่เล่นแต่นักกีฬาพร้อม พลาดโอกาสทองของทีม"
      },
      {
        "id": "C",
        "text": "นักกีฬาได้รับใบแดงในครึ่งแรก",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับผลการทำนาย"
      },
      {
        "id": "D",
        "text": "การแข่งขันถูกเลื่อนออกไปเนื่องจากสภาพอากาศ",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับ Confusion Matrix"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q43-majority-class-baseline-trap",
    "questionNumber": 43,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p25",
    "title": "กับดักความแม่นยำสูงในข้อมูลไม่สมดุล (Majority-Class Baseline)",
    "scenario": "หากชุดข้อมูลมีลูกค้า Active อยู่ถึง 95% และมี Inactive เพียง 5% โมเดลจำลองที่ทายทุกคนเป็น 'Active' เสมอ จะได้ผลการประเมินอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "ได้ Accuracy 50% และถือเป็นโมเดลที่ใช้งานไม่ได้",
        "isCorrect": false,
        "explanation": "ผิด: โมเดลทายคลาสใหญ่ถูก 95% ย่อมได้ Accuracy 95%"
      },
      {
        "id": "B",
        "text": "ได้ Accuracy สูงถึง 95% แต่มี Recall ในคลาส Inactive เท่ากับ 0% กลายเป็นโมเดลที่ไร้ประโยชน์ในการค้นหาลูกค้ากลุ่มเสี่ยง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p25: Majority-class baseline ชี้ชัดว่า Accuracy ตัวเดียวหลอกตาได้ใน Class Imbalance"
      },
      {
        "id": "C",
        "text": "ได้ Recall 95% และ Precision 95%",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ได้ทาย Inactive เลยสักคน TP จึงเป็น 0"
      },
      {
        "id": "D",
        "text": "ระบบจะแจ้งเตือน Error ทันทีเนื่องจากข้อมูลเอียงข้าง",
        "isCorrect": false,
        "explanation": "ผิด: อัลกอริทึมยังคงคำนวณตัวเลขออกมาได้ตามปกติ"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q44-precision-recall-tradeoff-cost",
    "questionNumber": 44,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p27",
    "title": "การเลือก Metric เมื่อต้นทุน False Positive สูงมาก",
    "scenario": "หากธุรกิจมีทีมคอลเซ็นเตอร์จำกัด และของขวัญ Retention แต่ละชิ้นมีต้นทุนสูงมาก หากมอบผิดคนจะเกิดการสิ้นเปลืองงบประมาณอย่างหนัก (FP แพงมาก) ควรเลือกโมเดลที่เน้นค่าใด?",
    "options": [
      {
        "id": "A",
        "text": "เน้นค่า Recall สูงสุด",
        "isCorrect": false,
        "explanation": "ผิด: Recall สูงมักแลกมาด้วย False Positive จำนวนมาก"
      },
      {
        "id": "B",
        "text": "เน้นค่า Precision สูงสุด",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p27: เมื่อ FP แพงและทีมติดต่อจำกัด ต้องเน้น Precision เพื่อมั่นใจว่าคนที่ทายมานั้น 'ใช่ชัวร์'"
      },
      {
        "id": "C",
        "text": "เน้นค่า Overall Accuracy เพียงอย่างเดียว",
        "isCorrect": false,
        "explanation": "ผิด: Accuracy ไม่ได้สะท้อนความเสียหายของ FP"
      },
      {
        "id": "D",
        "text": "เน้นลดค่า True Negative ให้น้อยที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: TN สูงเป็นเรื่องดี ไม่ควรลด"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "q45-recall-priority-missed-churn",
    "questionNumber": 45,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p28",
    "title": "การเลือก Metric เมื่อความเสี่ยง False Negative สูงมาก",
    "scenario": "ในทางตรงกันข้าม หากการหลุดรอดของลูกค้าเสี่ยงยกเลิกบริการ (False Negative หรือ Missed Churn) จะสร้างความเสียหายถึงขั้นธุรกิจสูญเสียฐานรายได้หลักถาวร ควรเลือกโมเดลโดยยึดเกณฑ์ใด?",
    "options": [
      {
        "id": "A",
        "text": "ยึดโมเดลที่มีค่า Precision สูงสุด แม้ Recall จะต่ำ",
        "isCorrect": false,
        "explanation": "ผิด: Precision สูงแต่อาจปล่อยลูกค้าหลุดรอด (FN) เพียบ"
      },
      {
        "id": "B",
        "text": "ยึดโมเดลที่ Maximize Recall เพื่อดักจับลูกค้ากลุ่มเสี่ยงให้ได้ครอบคลุมที่สุด ลดโอกาสเกิด FN",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p28: เมื่อ Missed Churn แพง ต้องเลือกโมเดลที่เน้น Recall"
      },
      {
        "id": "C",
        "text": "ยึดโมเดลที่มีจำนวนต้นไม้ลึกที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: ความลึกไม่ใช่เมตริกวัดผลทางธุรกิจ"
      },
      {
        "id": "D",
        "text": "สุ่มเลือกลูกค้าโทรหาวันละ 10 คนโดยไม่ใช้โมเดล",
        "isCorrect": false,
        "explanation": "ผิด: การสุ่มไม่มีประสิทธิภาพเท่าโมเดล"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "q46-f1-harmonic-mean",
    "questionNumber": 46,
    "moduleRef": "module-07-evaluation-metrics",
    "slideRef": "Lect 07 p29",
    "title": "คณิตศาสตร์ของ F1-Score: เหตุผลที่ใช้ Harmonic Mean",
    "scenario": "ทำไมสูตร F1-Score จึงต้องคำนวณด้วยค่าเฉลี่ยฮาร์มอนิก (Harmonic Mean = 2PR / (P + R)) แทนที่จะใช้ค่าเฉลี่ยเลขคณิตทั่วไป?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อความสะดวกในการเขียนโปรแกรมภาษา Python",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับภาษาโปรแกรม"
      },
      {
        "id": "B",
        "text": "เพราะ Harmonic Mean จะลงโทษ (Penalize) โมเดลอย่างรุนแรงทันทีหากค่าใดค่าหนึ่งระหว่าง Precision หรือ Recall ต่ำมาก ป้องกันโมเดลที่เอียงข้างสุดโต่ง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p29: ถ้า Precision = 1.0 แต่ Recall = 0.0 ค่าเฉลี่ยเลขคณิตจะได้ 0.50 แต่ Harmonic Mean จะได้ 0.00 ทันที"
      },
      {
        "id": "C",
        "text": "เพราะค่าเฉลี่ยเลขคณิตจะคำนวณได้ค่าเกิน 1.0 เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ค่าเฉลี่ยเลขคณิตของค่าระหว่าง 0-1 ย่อมไม่เกิน 1"
      },
      {
        "id": "D",
        "text": "เพื่อให้ค่า F1 มีค่าเท่ากับ Accuracy เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: F1 และ Accuracy มักมีค่าต่างกัน"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q09-kmeans-centroid",
    "questionNumber": 47,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p25-31",
    "title": "K-Means Centroid Update (Iteration 1)",
    "scenario": "ข้อมูล 8 จุดในสไลด์อาจารย์ เมื่อจัดกลุ่มรอบที่ 1 ด้วย Manhattan พบว่า Cluster 2 มีสมาชิก 5 จุด คือ A3(8,4), A4(5,8), A5(7,5), A6(6,4), A8(4,9) จงหาพิกัดจุดศูนย์กลางใหม่ (C2_new)?",
    "options": [
      {
        "id": "A",
        "text": "(5, 8) ซึ่งเป็นพิกัดเดิมตั้งแต่เริ่มต้น",
        "isCorrect": false,
        "explanation": "ผิด: จุดศูนย์กลางต้องอัปเดตตามค่าเฉลี่ยสมาชิกใหม่"
      },
      {
        "id": "B",
        "text": "(6, 6) เพราะแกน x1 เฉลี่ยได้ 30/5 = 6 และแกน x2 เฉลี่ยได้ 30/5 = 6",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p28-31: C2_new = ((8+5+7+6+4)/5, (4+8+5+4+9)/5) = (30/5, 30/5) = (6, 6)"
      },
      {
        "id": "C",
        "text": "(1.5, 3.5)",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือพิกัดของ C3_new จากสมาชิก {A2, A7}"
      },
      {
        "id": "D",
        "text": "(7, 5)",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือพิกัดของจุด A5"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q10-kmeans-trap",
    "questionNumber": 48,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p25, p35",
    "title": "กับดักสูตร K-Means: Manhattan vs Squared Euclidean",
    "scenario": "ข้อสอบถามว่า: ในขั้นตอนการคำนวณวัดความแน่นหนาของคลัสเตอร์ (Inertia หรือ WCSS) ตามทฤษฎีต้องใช้ฟังก์ชันระยะทางใด?",
    "options": [
      {
        "id": "A",
        "text": "Manhattan Distance (|x - c|) เสมอ เพราะในห้องเรียนอาจารย์ใช้ตัวนี้คิดเลข",
        "isCorrect": false,
        "explanation": "ติดกับดักอาจารย์! ในห้องเรียนใช้ Manhattan เพื่อให้คิดเลขง่าย แต่สูตร Inertia ตามทฤษฎีใช้ Squared Euclidean",
        "distractorTrap": "จำสลับกับวิธีคิดเลขในห้อง"
      },
      {
        "id": "B",
        "text": "Squared Euclidean Distance (||x - Ck||^2)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p35: Inertia/WCSS ตามนิยามคณิตศาสตร์คือผลรวมของระยะทางแบบ Squared Euclidean Distance"
      },
      {
        "id": "C",
        "text": "Cosine Similarity",
        "isCorrect": false,
        "explanation": "ผิด: K-Means ดั้งเดิมไม่ได้ใช้วัดมุม Cosine"
      },
      {
        "id": "D",
        "text": "Silhouette Score",
        "isCorrect": false,
        "explanation": "ผิด: Silhouette เป็นอีกเมตริกหนึ่ง ไม่ใช่ฟังก์ชันระยะทางของ Inertia"
      }
    ],
    "difficulty": "business_trap"
  },
  {
    "id": "q11-silhouette-interp",
    "questionNumber": 49,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p36-37",
    "title": "การแปลความหมาย Silhouette Score ที่ติดลบ",
    "scenario": "เมื่อคำนวณ Silhouette Coefficient ของจุดข้อมูลหนึ่งได้ค่า s(i) = -0.42 จะแปลความหมายเชิงเรขาคณิตได้ว่าอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "จุดนี้อยู่ตรงกลางใจกลางกลุ่มพอดี เกาะกลุ่มได้แน่นหนาสูงสุด",
        "isCorrect": false,
        "explanation": "ผิด: ถ้าเกาะกลุ่มแน่น ค่าต้องใกล้ +1"
      },
      {
        "id": "B",
        "text": "จุดนี้อยู่นอกรั้วของ Tukey กลายเป็น Outlier",
        "isCorrect": false,
        "explanation": "ผิด: Silhouette ไม่ได้เกี่ยวข้องกับรั้วของ Tukey"
      },
      {
        "id": "C",
        "text": "จุดนี้น่าจะถูกจัดเข้ากลุ่มผิด (Probable Misclustering) เพราะอยู่ใกล้จุดในกลุ่มอื่นมากกว่ากลุ่มของตนเอง (b(i) < a(i))",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p37: ค่า Silhouette ติดลบเกิดเมื่อ a(i) > b(i) แปลว่าอยู่ใกล้กลุ่มข้างเคียงมากกว่ากลุ่มที่ได้รับมอบหมาย"
      },
      {
        "id": "D",
        "text": "โมเดลมี Accuracy เท่ากับ 42%",
        "isCorrect": false,
        "explanation": "ผิด: Silhouette ใช้กับ Unsupervised ไม่ใช่ Accuracy"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q47-clustering-similarity-objective",
    "questionNumber": 50,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p6",
    "title": "เป้าหมายหลักของการจัดกลุ่ม (Good Clustering Objective)",
    "scenario": "ตามทฤษฎีการจัดกลุ่มข้อมูล (Unsupervised Clustering) คุณลักษณะของการจัดกลุ่มที่ดี (Good Clustering) คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ทำให้สมาชิกในกลุ่มมีความต่างกันสูงสุด (Maximize Intra-cluster variation)",
        "isCorrect": false,
        "explanation": "ผิด: สมาชิกในกลุ่มเดียวกันต้องคล้ายกันมากที่สุด"
      },
      {
        "id": "B",
        "text": "Maximize Intra-cluster similarity (สมาชิกกลุ่มเดียวกันคล้ายกันมากที่สุด) และ Minimize Inter-cluster similarity (ต่างกลุ่มกันคล้ายกันน้อยที่สุด)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p6: Good clustering = High intra-cluster similarity + Low inter-cluster similarity"
      },
      {
        "id": "C",
        "text": "ทำให้ได้จำนวนสมาชิกในทุกคลัสเตอร์เท่ากันเป๊ะพอดี",
        "isCorrect": false,
        "explanation": "ผิด: ในโลกจริงแต่ละกลุ่มมีขนาดไม่เท่ากันได้"
      },
      {
        "id": "D",
        "text": "ทำให้ค่า Inertia มีค่าเท่ากับ 0 เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: Inertia = 0 เกิดเมื่อ K = n ซึ่งไม่มีประโยชน์ในการจัดกลุ่ม"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q48-manhattan-euclidean-exact",
    "questionNumber": 51,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p15",
    "title": "การคำนวณระยะทาง Manhattan และ Euclidean",
    "scenario": "พิจารณาจุด 2 จุดในสไลด์ Lect 08 p15: จุด X = (2, 10, 5, 3) และ จุด Y = (2, 5, 5, 4) จงคำนวณระยะทาง Manhattan และ Euclidean ระหว่างสองจุดนี้?",
    "options": [
      {
        "id": "A",
        "text": "Manhattan = 10, Euclidean = 6.00",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณผลรวมความต่างผิด"
      },
      {
        "id": "B",
        "text": "Manhattan = 6, Euclidean ≈ 5.10 (คำนวณจาก sqrt(26))",
        "isCorrect": true,
        "explanation": "ถูกต้อง: Manhattan = |2-2|+|10-5|+|5-5|+|3-4| = 0+5+0+1 = 6; Euclidean = sqrt(0^2 + 5^2 + 0^2 + (-1)^2) = sqrt(26) ≈ 5.10"
      },
      {
        "id": "C",
        "text": "Manhattan = 4, Euclidean = 4.00",
        "isCorrect": false,
        "explanation": "ผิด: ระยะห่างในมิติที่สองคือ |10-5| = 5"
      },
      {
        "id": "D",
        "text": "Manhattan = 8, Euclidean = 7.20",
        "isCorrect": false,
        "explanation": "ผิด: ตัวเลขไม่ตรงกับผลรวมระยะห่าง"
      }
    ],
    "difficulty": "calculated"
  },
  {
    "id": "q49-kmeans-scaling-necessity",
    "questionNumber": 52,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p18",
    "title": "ความจำเป็นของการทำ Scaling ใน K-Means",
    "scenario": "ทำไมในขั้นตอนการทำ Data Preparation สำหรับ K-Means จึงจำเป็นต้องทำ Feature Scaling ก่อนเสมอ?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อแปลงข้อมูลที่เป็น Categorical ให้เป็นตัวเลข",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือการทำ Encoding ไม่ใช่ Scaling"
      },
      {
        "id": "B",
        "text": "เพราะ K-Means คำนวณระยะห่างทางเรขาคณิต หากไม่ Scale ฟีเจอร์ที่มีสเกลใหญ่ (เช่น รายได้ 50,000 บาท) จะครอบงำระยะห่างทั้งหมดจนฟีเจอร์สเกลเล็ก (เช่น อายุ 25 ปี) ไร้ผล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08: Distance metrics อิงตามค่าตัวเลข ฟีเจอร์หน่วยใหญ่จะ dominate ผลการรวมกลุ่ม"
      },
      {
        "id": "C",
        "text": "เพื่อป้องกันไม่ให้ K-Means สร้างจำนวนกลุ่ม K เกิน 10 กลุ่ม",
        "isCorrect": false,
        "explanation": "ผิด: จำนวน K ผู้ใช้เป็นคนกำหนดเอง"
      },
      {
        "id": "D",
        "text": "เพื่อทำให้ชุดข้อมูลกลายเป็นระฆังคว่ำแบบ Normal Distribution เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: Scaling ไม่ได้เปลี่ยนการกระจายตัวให้เป็น Normal เสมอไป"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q50-kmeans-tie-breaking",
    "questionNumber": 53,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p22",
    "title": "กฎ Tie-Breaking ในการมอบหมายคลัสเตอร์",
    "scenario": "ในขั้นตอน Assign ของ K-Means หากจุดข้อมูลจุดหนึ่งมีระยะห่างไปยัง Centroid สองกลุ่มเท่ากันพอดี กฎ Tie-breaking ในสไลด์กำหนดให้ปฏิบัติอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "ให้สุ่มโยนเหรียญเลือกกลุ่มใดกลุ่มหนึ่ง",
        "isCorrect": false,
        "explanation": "ผิด: อัลกอริทึมต้องมี deterministic rule"
      },
      {
        "id": "B",
        "text": "มอบหมายให้เข้ากลุ่มที่มีหมายเลข Cluster ต่ำที่สุด (Lowest Cluster Index)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p22: ระยะทางเท่ากัน ให้เลือก cluster หมายเลขต่ำสุด"
      },
      {
        "id": "C",
        "text": "ลบจุดข้อมูลนั้นทิ้งเนื่องจากเป็นข้อมูลกำกวม",
        "isCorrect": false,
        "explanation": "ผิด: ห้ามลบข้อมูลทิ้ง"
      },
      {
        "id": "D",
        "text": "แตกกิ่งเพิ่มคลัสเตอร์ใหม่ขึ้นมาทันที",
        "isCorrect": false,
        "explanation": "ผิด: จำนวน K ถูกตรึงไว้ล่วงหน้า"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q51-kmeans-complexity-advantage",
    "questionNumber": 54,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p24",
    "title": "จุดเด่นด้าน Time Complexity ของ K-Means",
    "scenario": "ข้อความใดอธิบายเกี่ยวกับประสิทธิภาพด้านความเร็วและความซับซ้อนเชิงเวลา (Time Complexity) ของ K-Means ได้ถูกต้องตามสไลด์ Lect 08 p24?",
    "options": [
      {
        "id": "A",
        "text": "K-Means เป็นอัลกอริทึมที่ทำงานช้ามาก O(n^3) ทำให้ความเร็วเป็นจุดด้อยหลัก",
        "isCorrect": false,
        "explanation": "ติดกับดัก! สไลด์ย้ำเตือนชัดเจนว่าความเร็วเป็นจุดเด่น ไม่ใช่จุดด้อย",
        "distractorTrap": "เข้าใจผิดว่า K-Means ทำงานช้า"
      },
      {
        "id": "B",
        "text": "K-Means มีประสิทธิภาพค่อนข้างสูงด้วยความซับซ้อน O(t*k*n) (เชิงเส้นกับจำนวนข้อมูล) ทำให้ความเร็วและ Scalability ถือเป็นจุดเด่นสำคัญ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p24: Relatively efficient O(tkn) ความเร็วเป็นจุดเด่น ไม่ใช่จุดด้อย"
      },
      {
        "id": "C",
        "text": "K-Means คำนวณได้เร็วเฉพาะเมื่อ K = 1 เท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณได้เร็วเมื่อ K มีค่าสมเหตุสมผล"
      },
      {
        "id": "D",
        "text": "K-Means มีความเร็วช้ากว่า Hierarchical Clustering เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: Hierarchical ช้ากว่า K-Means มาก (O(n^2) หรือ O(n^3))"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q52-kmeans-convergence-meaning",
    "questionNumber": 55,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p32",
    "title": "การลู่เข้า Convergence กับความมีประโยชน์ทางธุรกิจ",
    "scenario": "เมื่อการรัน K-Means เข้าสู่ภาวะ 'Convergence' (จุดศูนย์กลางไม่เปลี่ยนตำแหน่งและไม่มีสมาชิกย้ายกลุ่ม) ภาวะนี้การันตีสิ่งใด?",
    "options": [
      {
        "id": "A",
        "text": "การันตีว่ากลุ่มที่ได้มีประโยชน์ทางธุรกิจสูงสุดและพร้อมส่งต่อให้ทีมการตลาดใช้งานได้ทันที",
        "isCorrect": false,
        "explanation": "ผิด: Convergence ไม่ได้การันตีความมีประโยชน์ทางธุรกิจ"
      },
      {
        "id": "B",
        "text": "การันตีเพียงว่าการคำนวณทางคณิตศาสตร์หยุดนิ่งแล้วเท่านั้น แต่ไม่ได้พิสูจน์ว่ากลุ่มที่ได้มีความหมายหรือมีประโยชน์ในทางปฏิบัติ (Convergence != Usefulness)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p32: Convergence เป็นเพียงจุดสิ้นสุดทางพีชคณิต ต้องนำผลมาทำ Cluster Profiling เพื่อดู usefulness"
      },
      {
        "id": "C",
        "text": "การันตีว่าผลการจัดกลุ่มคือ Global Optimum ที่ดีที่สุดในจักรวาล",
        "isCorrect": false,
        "explanation": "ผิด: K-Means มักติดที่ Local Optimum"
      },
      {
        "id": "D",
        "text": "การันตีว่าไม่มี Outlier หลงเหลืออยู่ในกลุ่ม",
        "isCorrect": false,
        "explanation": "ผิด: K-Means ไวต่อ Outlier มาก"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q53-elbow-method-heuristic",
    "questionNumber": 56,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p35",
    "title": "หลักการเลือก K ด้วย Elbow Method",
    "scenario": "ในการพิจารณาเลือกจำนวนกลุ่ม K ที่เหมาะสมจากกราฟ Elbow Method ทำไมเราจึงไม่เลือกค่า K ที่ให้ค่าความแปรปรวนในกลุ่ม (Inertia/WCSS) ต่ำที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "เพราะค่า Inertia จะลดลงเรื่อยๆ เสมอเมื่อ K เพิ่มขึ้น (ถ้า K = n ค่า Inertia จะกลายเป็น 0) การเลือก K จึงต้องเลือกตรง 'จุดหักศอก' ที่ผลตอบแทนเริ่มลดน้อยถอยลง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p35: Inertia decreases monotonically; Best K is balanced & explainable"
      },
      {
        "id": "B",
        "text": "เพราะค่า Inertia คำนวณได้เฉพาะเมื่อ K ไม่เกิน 3 เท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณได้กับทุกค่า K"
      },
      {
        "id": "C",
        "text": "เพราะค่า Inertia ต่ำแปลว่ากลุ่มกระจัดกระจายไม่แน่นหนา",
        "isCorrect": false,
        "explanation": "ผิด: Inertia ต่ำแปลว่ากลุ่มเกาะกันแน่น"
      },
      {
        "id": "D",
        "text": "เพราะ Elbow Method ใช้วัดเฉพาะโมเดล Decision Tree",
        "isCorrect": false,
        "explanation": "ผิด: Elbow Method ใช้กับ Clustering"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q54-cluster-profiling-persona",
    "questionNumber": 57,
    "moduleRef": "module-08-kmeans",
    "slideRef": "Lect 08 p38",
    "title": "ลำดับขั้นจาก Cluster สู่การตัดสินใจธุรกิจ (Profile First)",
    "scenario": "เมื่ออัลกอริทึมจัดกลุ่มลูกค้าออกเป็น Cluster 0, Cluster 1, Cluster 2 เรียบร้อยแล้ว ขั้นตอนที่ถูกต้องในการทำงานต่อตามหลัก CRISP-DS คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ตั้งชื่อ Persona เช่น 'ลูกค้า VIP' หรือ 'ลูกค้าขี้งก' ทันทีจาก Cluster ID",
        "isCorrect": false,
        "explanation": "ผิด: Cluster ID เป็นเพียงป้ายกำกับทางคณิตศาสตร์ ไม่มีตัวตนทางธุรกิจในตัวเอง"
      },
      {
        "id": "B",
        "text": "ทำ Cluster Profiling ก่อน โดยเปรียบเทียบค่าสถิติจริงของคุณลักษณะในแต่ละกลุ่ม แล้วค่อยสร้าง Persona จากหลักฐานเชิงประจักษ์",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p38: Cluster Profile first -> interpret second"
      },
      {
        "id": "C",
        "text": "ส่งข้อความโปรโมชันไปยัง Cluster 0 ทันที",
        "isCorrect": false,
        "explanation": "ผิด: ยังไม่ทราบคุณลักษณะของสมาชิกในกลุ่ม"
      },
      {
        "id": "D",
        "text": "ลบกลุ่มที่มีจำนวนสมาชิกน้อยที่สุดทิ้งไป",
        "isCorrect": false,
        "explanation": "ผิด: กลุ่มเล็กอาจเป็นกลุ่มลูกค้าพิเศษที่มีคุณค่าสูง"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q12-proxy-features",
    "questionNumber": 58,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p13",
    "title": "ตัวแปรตัวแทน Proxy Features ใน AI Ethics",
    "scenario": "สถาบันการเงินแห่งหนึ่งต้องการป้องกันการเลือกปฏิบัติ จึงลบคอลัมน์ \"เชื้อชาติ\" และ \"เพศ\" ออกจากโมเดลสินเชื่อ แต่ทำไมโมเดลยังคงแสดงพฤติกรรมเลือกปฏิบัติต่อกลุ่มชาติพันธุ์ได้?",
    "options": [
      {
        "id": "A",
        "text": "เพราะอัลกอริทึมกู้คืนคอลัมน์ที่ถูกลบกลับมาจาก Metadata ของฐานข้อมูลโดยอัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิดตามสไลด์ Lect 09 p13: โมเดลไม่ได้กู้คืนคอลัมน์ที่ถูกลบ แต่เรียนรู้ผ่านตัวแปรอื่นที่มีความสัมพันธ์แทน (Proxy Features)"
      },
      {
        "id": "B",
        "text": "เพราะตัวแปรอื่น เช่น \"รหัสไปรษณีย์\" (Postal Code) ทำหน้าที่เป็น Proxy Feature ที่สะท้อนฐานะและการกระจุกตัวของเชื้อชาติได้",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p13: Proxy Features สามารถส่งผ่านความสัมพันธ์ของ Sensitive Attributes ได้แม้จะตัดตัวแปรหลักทิ้งไปแล้ว"
      },
      {
        "id": "C",
        "text": "เพราะเกิด Data Leakage ระหว่าง Train และ Test Set",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับ Data Leakage"
      },
      {
        "id": "D",
        "text": "เพราะโมเดลมีค่า max_depth ต่ำเกินไป",
        "isCorrect": false,
        "explanation": "ผิด: ความลึกไม่เกี่ยวกับอคติของตัวแปร"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q13-rite-aid-ftc",
    "questionNumber": 59,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p22, p36",
    "title": "คดีจริง Rite Aid & False Positive Hazard",
    "scenario": "ในคดีประวัติศาสตร์ Rite Aid (FTC 2023-2024) ระบบ AI ตรวจจับใบหน้าขโมยของสร้างความเสียหายจนถูกสั่งแบน 5 ปี ความเสียหายดังกล่าวเกิดจากความผิดพลาดชนิดใดเป็นหลัก?",
    "options": [
      {
        "id": "A",
        "text": "เกิด False Negative สูง ทำให้มีขโมยหลุดรอดไปเยอะ",
        "isCorrect": false,
        "explanation": "ผิด: ความเสียหายต่อสังคมเกิดจากการกล่าวหาผู้บริสุทธิ์"
      },
      {
        "id": "B",
        "text": "เกิด False Positive สูง ชี้ตัวผู้บริสุทธิ์และกลุ่มเปราะบางผิดว่าเป็นหัวขโมย จนนำไปสู่การจับกุมผิดตัวโดยไร้ Human Checkpoint",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p22: False Positive ทำให้คนไม่ผิดเดือดร้อน FTC จึงสั่งแบน 5 ปีและบังคับให้มีมนุษย์ตรวจสอบ"
      },
      {
        "id": "C",
        "text": "เกิด Concept Drift จากการเปลี่ยนระบบกล้องวงจรปิด",
        "isCorrect": false,
        "explanation": "ผิด: ปัญหาหลักคือเรื่องการเลือกปฏิบัติและ FP"
      },
      {
        "id": "D",
        "text": "เกิด Underfitting บนชุดข้อมูลการฝึกสอน",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ใช่ประเด็นหลักทางกฎหมาย"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q14-concept-drift",
    "questionNumber": 60,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p11, p20",
    "title": "Concept Drift & Recall Degradation",
    "scenario": "สไลด์อาจารย์หน้า 11 และ 20 ระบุว่า: เดิมนิยามว่าลูกค้าที่ไม่ซื้อของเกิน 45 วัน = Inactive ต่อมาพฤติกรรมลูกค้าเปลี่ยนเป็น 70 วัน ส่งผลให้เกิดปรากฏการณ์ใดกับโมเดล?",
    "options": [
      {
        "id": "A",
        "text": "เกิด Data Leakage ทำให้โมเดลมี Accuracy เพิ่มขึ้น",
        "isCorrect": false,
        "explanation": "ผิด: ประสิทธิภาพลดลง ไม่ใช่เพิ่มขึ้น"
      },
      {
        "id": "B",
        "text": "เกิด Overfitting เพราะต้นไม้ลึกเกินไป",
        "isCorrect": false,
        "explanation": "ผิด: สาเหตุเกิดจากการเปลี่ยนพฤติกรรมในโลกจริง"
      },
      {
        "id": "C",
        "text": "เกิด Concept Drift (ความสัมพันธ์ระหว่าง Feature กับ Target เปลี่ยน) ส่งผลให้ค่า Recall ของโมเดลตกลงเหลือเพียง 54%",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p11, p20: เมื่อพฤติกรรมเปลี่ยน นิยามเป้าหมายเปลี่ยน ทำให้ Recall ตกฮวบเหลือ 54%"
      },
      {
        "id": "D",
        "text": "โมเดลทำงานได้ปกติ ไม่ต้องปรับปรุงใดๆ",
        "isCorrect": false,
        "explanation": "ผิด: ต้องส่งเข้า Decision Gate: Revise หรือ Retrain"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q55-global-vs-local-xai",
    "questionNumber": 61,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p6-7",
    "title": "ความแตกต่างระหว่าง Global และ Local Explainability",
    "scenario": "ในบริบทของ Explainable AI (XAI) ข้อใดระบุความแตกต่างระหว่าง Global Explanation และ Local Explanation ได้ถูกต้อง?",
    "options": [
      {
        "id": "A",
        "text": "Global อธิบายโมเดลที่ใช้งานในระดับสากล ส่วน Local อธิบายโมเดลเฉพาะสาขาในไทย",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับขอบเขตภูมิศาสตร์"
      },
      {
        "id": "B",
        "text": "Global อธิบายว่าโมเดลในภาพรวมให้น้ำหนักกับ Feature ใด ส่วน Local อธิบายว่าทำไมลูกค้ารายเฉพาะเจาะจงคนหนึ่งจึงได้รับผลการทำนายเช่นนั้น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p6-7: Global = overall feature importance, Local = individual prediction decision path (เช่น SHAP/LIME)"
      },
      {
        "id": "C",
        "text": "Global ใช้กับ Unsupervised ส่วน Local ใช้กับ Supervised",
        "isCorrect": false,
        "explanation": "ผิด: ทั้งสองใช้ได้กับโมเดลการเรียนรู้หลากหลายประเภท"
      },
      {
        "id": "D",
        "text": "Global ต้องใช้คอมพิวเตอร์ระดับ Quantum เท่านั้นในการคำนวณ",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณได้บนคอมพิวเตอร์ทั่วไป"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q56-model-specific-vs-agnostic",
    "questionNumber": 62,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p8",
    "title": "การจำแนก Model-Specific vs Model-Agnostic XAI",
    "scenario": "ข้อใดจัดหมวดหมู่เครื่องมือ Explainable AI ระหว่าง Model-Specific และ Model-Agnostic ได้ถูกต้องตามสไลด์ Lect 09 p8?",
    "options": [
      {
        "id": "A",
        "text": "Feature Importance จาก Decision Tree เป็น Model-Specific | ส่วน SHAP และ LIME เป็น Model-Agnostic ที่ตรวจสอบพฤติกรรมผ่าน Input-Output ได้กับทุกโมเดล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p8: Model-specific อาศัยโครงสร้างภายใน (เช่น tree split), Model-agnostic ใช้ได้กับทุกโมเดล (SHAP/LIME)"
      },
      {
        "id": "B",
        "text": "SHAP เป็น Model-Specific ใช้ได้เฉพาะกับ Logistic Regression",
        "isCorrect": false,
        "explanation": "ผิด: SHAP เป็น model-agnostic"
      },
      {
        "id": "C",
        "text": "Decision Tree Decision Path เป็น Model-Agnostic",
        "isCorrect": false,
        "explanation": "ผิด: Decision Path อิงโครงสร้างต้นไม้โดยตรงจึงเป็น model-specific"
      },
      {
        "id": "D",
        "text": "LIME ใช้ได้เฉพาะกับระบบฐานข้อมูล SQL เท่านั้น",
        "isCorrect": false,
        "explanation": "ผิด: LIME ใช้งานกับโมเดล Machine Learning หลากหลาย"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q57-shap-additive-interpretation",
    "questionNumber": 63,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p9-10",
    "title": "การแปลผลค่า SHAP Value แบบ Additive",
    "scenario": "โมเดล Churn มี Base Value = 32% เมื่อตรวจสอบลูกค้ารายหนึ่งพบว่าตัวแปร 'ระยะเวลาที่ไม่ได้ซื้อสินค้า' มีค่า SHAP = +29% ตัวเลขนี้หมายความว่าอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "ตัวแปรนี้เพิ่มความแม่นยำของโมเดลขึ้น 29%",
        "isCorrect": false,
        "explanation": "ผิด: SHAP ไม่ได้บอกความแม่นยำของโมเดล"
      },
      {
        "id": "B",
        "text": "ตัวแปรนี้ผลักดันให้ความน่าจะเป็นที่ลูกค้าจะ Inactive เพิ่มขึ้น 29 จุดเปอร์เซ็นต์ เมื่อเปรียบเทียบกับค่าเฉลี่ยฐาน (Base Value)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p9-10: Base value + sum of SHAP contributions = Final prediction (+29% ดันความเสี่ยงขึ้น 29 จุดเปอร์เซ็นต์)"
      },
      {
        "id": "C",
        "text": "ลูกค้ารายนี้มีโอกาสเลิกใช้บริการ 29%",
        "isCorrect": false,
        "explanation": "ผิด: ค่าความน่าจะเป็นสุดท้ายคือ 32% + 29% + ตัวแปรอื่น"
      },
      {
        "id": "D",
        "text": "โมเดลมีความผิดพลาด 29% ในการทำนายลูกค้ารายนี้",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับ error"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q58-obermeyer-healthcare-case",
    "questionNumber": 64,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p16",
    "title": "กรณีศึกษาอัลกอริทึมโรงพยาบาล (Obermeyer et al., Science 2019)",
    "scenario": "ในคดีประวัติศาสตร์ระบบคัดกรองผู้ป่วยของโรงพยาบาลในสหรัฐฯ (Obermeyer 2019) ความลำเอียงต่อผู้ป่วยผิวสีเกิดขึ้นจากสาเหตุใด?",
    "options": [
      {
        "id": "A",
        "text": "โปรแกรมเมอร์แอบใส่โค้ดลดคะแนนผู้ป่วยผิวสีโดยเจตนา",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ได้เกิดจากเจตนาของโปรแกรมเมอร์"
      },
      {
        "id": "B",
        "text": "การใช้ 'ค่าใช้จ่ายสุขภาพในอดีต' เป็น Proxy ของ 'ความต้องการการรักษา' ทั้งที่คนผิวสีมีกำลังจ่ายน้อยกว่า ทำให้ผู้ป่วยผิวสีที่ป่วยหนักเท่ากันได้คะแนนความเสี่ยงต่ำกว่าคนผิวขาว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p16: ทำนาย proxy ได้แม่น != จัดสรรเป็นธรรม เมื่อแก้ proxy สัดส่วนผู้ป่วยผิวสีที่ได้รับความช่วยเหลือพุ่งจาก 17.7% เป็น 46.5%"
      },
      {
        "id": "C",
        "text": "เกิดจากโมเดลมีค่า max_depth ต่ำเกินไปทำให้ Underfit",
        "isCorrect": false,
        "explanation": "ผิด: ปัญหาเกิดจากการเลือกตัวแปรเป้าหมายและ proxy"
      },
      {
        "id": "D",
        "text": "เกิดจากการใช้ K-Means แทนที่จะใช้ Decision Tree",
        "isCorrect": false,
        "explanation": "ผิด: ไม่เกี่ยวกับอัลกอริทึมจัดกลุ่ม"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q59-meta-housing-ads-case",
    "questionNumber": 65,
    "moduleRef": "module-09-responsible-ai",
    "slideRef": "Lect 09 p21",
    "title": "กรณีศึกษาโฆษณาที่อยู่อาศัย Meta (DOJ 2022)",
    "scenario": "บทเรียนสำคัญด้าน Responsible AI จากกรณีศึกษาคดีโฆษณาที่อยู่อาศัยของ Meta (กระทรวงยุติธรรมสหรัฐฯ 2022) คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ความเป็นธรรม (Fairness) ต้องตรวจสอบที่ผลลัพธ์ปลายทาง (Eligible vs Actual Audience) ไม่ใช่ตรวจสอบแค่ตัวแปรนำเข้า (Input Features)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p21: แม้จะลบตัวแปรต้องห้ามออก แต่อัลกอริทึมปลายทางยังเลือกผู้รับชมโฆษณาไม่เป็นธรรม Meta จึงต้องพัฒนาระบบ VRS"
      },
      {
        "id": "B",
        "text": "หากตัดตัวแปรเชื้อชาติออกจากโมเดลแล้ว รับประกันได้ว่าจะไม่มีการเลือกปฏิบัติเกิดขึ้น 100%",
        "isCorrect": false,
        "explanation": "ผิด: Proxy features ยังคงส่งผ่านความลำเอียงได้"
      },
      {
        "id": "C",
        "text": "อัลกอริทึมโฆษณาไม่จำเป็นต้องปฏิบัติตามกฎหมายความเท่าเทียมทางที่อยู่อาศัย",
        "isCorrect": false,
        "explanation": "ผิด: ต้องปฏิบัติตาม Fair Housing Act อย่างเคร่งครัด"
      },
      {
        "id": "D",
        "text": "การให้ AI ตัดสินใจส่งโฆษณาอัตโนมัติมีความปลอดภัยเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ต้องมี Human checkpoint และ Audit สม่ำเสมอ"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q60-decision-contract-vs-memo",
    "questionNumber": 66,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 p8, p14",
    "title": "ความแตกต่างระหว่าง Decision Contract กับ Decision Memo",
    "scenario": "ในการทำงานจริงตามแนวทาง CRISP-DS in Action เอกสาร 'Decision Contract' และ 'Decision Memo' แตกต่างกันที่ช่วงเวลาและเนื้อหาอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "Contract ทำตอนสิ้นสุดโครงการ ส่วน Memo ทำตอนเริ่มต้นโครงการ",
        "isCorrect": false,
        "explanation": "ผิด: สลับช่วงเวลากันอย่างสิ้นเชิง"
      },
      {
        "id": "B",
        "text": "Contract ทำช่วงเริ่มต้นโครงการ (Business Understanding) เพื่อตกลงผู้ตัดสินใจและขอบเขตทางเลือก | ส่วน Memo ทำช่วง Evaluation เพื่อบันทึกคำตัดสินจริง เหตุผล และเงื่อนไข Pilot",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10: Decision Contract = ต้นโครงการตกลงร่วมกัน, Decision Memo = ช่วง Evaluation บันทึกผลตัดสินและเงื่อนไขกำกับ"
      },
      {
        "id": "C",
        "text": "Contract จัดทำโดยฝ่ายกฎหมายเท่านั้น ส่วน Memo จัดทำโดย AI Assistant",
        "isCorrect": false,
        "explanation": "ผิด: Contract ทำโดย BA + BU, Memo ทำโดย BA + DS + Privacy"
      },
      {
        "id": "D",
        "text": "ทั้งสองเอกสารเป็นเอกสารชนิดเดียวกัน สามารถใช้แทนกันได้",
        "isCorrect": false,
        "explanation": "ผิด: มีหน้าที่และช่วงเวลาต่างกันชัดเจน"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q60b-roles-analytics-engineer",
    "questionNumber": 67,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 p3-5",
    "title": "บทบาทหน้าที่ของ Analytics Engineer",
    "scenario": "ในห่วงโซ่การทำงานของทีมข้อมูลยุคใหม่ (Modern Data Roles) บทบาทใดมีหน้าที่รับผิดชอบ 'Customer Table & Feature Contract' แปลงข้อมูลดิบให้พร้อมสำหรับวิเคราะห์ และป้องกันไม่ให้ข้อมูลอนาคตรั่วไหลเข้ามา?",
    "options": [
      {
        "id": "A",
        "text": "Data Engineer (ดูแล Pipeline และโครงสร้างพื้นฐาน)",
        "isCorrect": false,
        "explanation": "ผิด: Data Engineer เน้นโครงสร้างพื้นฐานและ Data Intake"
      },
      {
        "id": "B",
        "text": "Analytics Engineer (รับผิดชอบ Data Model, Customer Table และ Feature Contract)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p3-5: Analytics Engineer แปลงข้อมูลดิบเป็นตารางพร้อมวิเคราะห์และคุม Feature Contract"
      },
      {
        "id": "C",
        "text": "Business Unit (อนุมัติการดำเนินงาน)",
        "isCorrect": false,
        "explanation": "ผิด: BU เป็นผู้ตัดสินใจทางธุรกิจ"
      },
      {
        "id": "D",
        "text": "AI Engineer (สร้าง LLM Chatbot)",
        "isCorrect": false,
        "explanation": "ผิด: AI Engineer มุ่งเน้นการสร้างแอปพลิเคชัน AI"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q60c-human-approval-gate",
    "questionNumber": 68,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 p12-14",
    "title": "การอนุมัติการกระทำทางธุรกิจ (Human Approval Gate)",
    "scenario": "ก่อนที่จะนำผลการทำนายลูกค้าเสี่ยง Churn ไปส่งโปรโมชันหาลูกค้าจริงใน Pilot Runbook บุคคลหรือระบบใดที่มีสิทธิ์ในการอนุมัติการกระทำนี้?",
    "options": [
      {
        "id": "A",
        "text": "AI Assistant สามารถอนุมัติและสั่งส่งโปรโมชันหาลูกค้าได้ทันทีหากโมเดลมี Accuracy เกิน 80%",
        "isCorrect": false,
        "explanation": "ผิดอย่างยิ่ง! สไลด์ Lect 10 เน้นย้ำว่า AI Assistant ไม่มีสิทธิ์อนุมัติแทนคนเด็ดขาด"
      },
      {
        "id": "B",
        "text": "Business Unit (มนุษย์ผู้มีอำนาจตัดสินใจทางธุรกิจ) ตรวจสอบ Decision Memo, ผล Privacy และลงนามใน Human Approval Record",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p12-14: ทุกการกระทำที่มีผลกระทบต่อคนจริงต้องมี Human Checkpoint & Human Approval"
      },
      {
        "id": "C",
        "text": "ระบบ MLOps อัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: MLOps ทำหน้าที่มอนิเตอร์ ไม่ใช่ผู้อนุมัติแคมเปญธุรกิจ"
      },
      {
        "id": "D",
        "text": "ไม่ต้องรออนุมัติ สามารถส่งหาลูกค้าได้ทันที",
        "isCorrect": false,
        "explanation": "ผิด: ละเมิดหลัก Responsible AI และ CRISP-DS Handoff"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q60d-mlops-backtrack-task",
    "questionNumber": 69,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 p16-18",
    "title": "การตรวจจับความผิดปกติและ Backtrack Task",
    "scenario": "ระหว่างการรัน Pilot ระบบ MLOps แจ้งเตือน Trigger ว่าค่า Recall ของลูกค้ารุ่นใหม่ (New Cohort) ลดลงฮวบเหลือ 42% (ต่ำกว่าเกณฑ์ตกลงที่ 70%) ขั้นตอนที่ถูกต้องในการจัดการตาม Runbook คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ลดเกณฑ์ Recall ใน Monitoring Contract ลงเหลือ 40% เพื่อให้สถานะระบบกลับมาเป็นสีเขียว",
        "isCorrect": false,
        "explanation": "ผิดมหันต์: ห้ามลดเกณฑ์ความปลอดภัยเพื่อกลบเกลื่อนปัญหา"
      },
      {
        "id": "B",
        "text": "สั่งพักการใช้งาน (Pause Pilot) ตาม Runbook ทันที แล้วสร้าง 'Backtrack Task' ส่งย้อนกลับไปตรวจสอบ Data Understanding หรือ Feature Engineering",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p16-18: ต้องหยุดระบบเมื่อพบ trigger แล้วย้อนกลับ (Backtrack) ไปแก้ที่ต้นเหตุ"
      },
      {
        "id": "C",
        "text": "ปิดระบบ Monitoring Log เพื่อไม่ให้ทีมการตลาดกังวล",
        "isCorrect": false,
        "explanation": "ผิด: การซ่อนปัญหาจะสร้างความเสียหายทางธุรกิจอย่างร้ายแรง"
      },
      {
        "id": "D",
        "text": "ปล่อยให้โมเดลทำงานต่อไปเพราะค่า Accuracy รวมของทั้งระบบยังดีอยู่",
        "isCorrect": false,
        "explanation": "ผิด: ความเสียหายเกิดขึ้นกับกลุ่มย่อยแล้ว ต้องแก้ไขทันที"
      }
    ],
    "difficulty": "direct"
  },
  {
    "id": "q60e-eda-finding-reporting",
    "questionNumber": 70,
    "moduleRef": "module-10-crisp-action",
    "slideRef": "Lect 10 p7",
    "title": "ข้อกำหนดในการส่งต่อ EDA Finding",
    "scenario": "ในห่วงโซ่การส่งต่องาน Data Analyst ส่งมอบ 'EDA Finding' ไปยังทีม Modeling ข้อใดระบุเนื้อหาที่จำเป็นต้องมีใน EDA Finding ได้ถูกต้อง?",
    "options": [
      {
        "id": "A",
        "text": "ส่งเฉพาะไฟล์รูปภาพกราฟสวยๆ โดยไม่ต้องมีข้อความอธิบายใดๆ",
        "isCorrect": false,
        "explanation": "ผิด: กราฟอย่างเดียวไม่ถือเป็นหลักฐานที่พร้อมส่งต่อ"
      },
      {
        "id": "B",
        "text": "ระบุคำถามวิเคราะห์, หลักฐานเชิงประจักษ์ (การกระจายตัว, ค่าขาดหาย, ช่วงเวลา), ข้อค้นพบทางสถิติที่ยังไม่ด่วนสรุปสาเหตุ และระบุข้อจำกัดของข้อมูลให้ชัดเจน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p7: EDA Finding ต้องบอกทั้งสิ่งที่พบ ข้อจำกัด และคำถามที่ต้องนำไปตรวจต่อในขั้นถัดไป"
      },
      {
        "id": "C",
        "text": "ระบุชื่ออัลกอริทึม Deep Learning ที่โมเดลต้องเลือกใช้บังคับไว้ล่วงหน้า",
        "isCorrect": false,
        "explanation": "ผิด: EDA ไม่ได้เป็นตัวเลือกอัลกอริทึมอัตโนมัติ"
      },
      {
        "id": "D",
        "text": "ยืนยันผลกำไรที่จะได้ล่วงหน้า 100%",
        "isCorrect": false,
        "explanation": "ผิด: เป็นไปไม่ได้ในขั้นตอนสำรวจข้อมูล"
      }
    ],
    "difficulty": "direct"
  }
];
