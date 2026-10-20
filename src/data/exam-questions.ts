import type { ExamQuestion } from '../types/study';

/**
 * Complete 70-Question Bilingual Exam Bank (Lectures 01 - 09 + Module 10 CRISP-DM)
 * Strictly aligned with slide examples, HW#2 solutions, and real-world case studies.
 * Options are balanced in length, parallel in structure, and free of self-revealing spoilers.
 */
export const examQuestions: ExamQuestion[] = [
  {
    "id": "q01-crisp-time",
    "questionNumber": 1,
    "moduleRef": "module-01-crisp-ds",
    "slideRef": "Lect 02 p20",
    "title": "สัดส่วนเวลาการทำงานในวงจร Data Science",
    "scenario": "ในวงจรการทำงาน Data Science Process Cycle (CRISP-DS) ขั้นตอนใดที่ใช้เวลาและทรัพยากรของทีมงานมากที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "Data Preparation (การทำความสะอาดข้อมูลและทำ Feature Engineering)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 02 p20: การเตรียมและทำความสะอาดข้อมูลใช้เวลามากที่สุดถึง 60–80% ของเวลาทั้งหมด"
      },
      {
        "id": "B",
        "text": "Deployment & Monitoring (การนำโมเดลขึ้นระบบจริงและติดตามผล)",
        "isCorrect": false,
        "explanation": "ผิด: เป็นขั้นตอนปลายน้ำหลังพัฒนาโมเดลเสร็จสิ้น ไม่ได้กินเวลาสูงสุด"
      },
      {
        "id": "C",
        "text": "Modeling (การคัดเลือกอัลกอริทึมและปรับจูนพารามิเตอร์ของโมเดล)",
        "isCorrect": false,
        "explanation": "ผิด: ขั้นตอน Modeling ใช้เวลาเฉลี่ยเพียง 10–20% ของโครงการ"
      },
      {
        "id": "D",
        "text": "Business Understanding (การวิเคราะห์โจทย์และกำหนดตัวชี้วัดธุรกิจ)",
        "isCorrect": false,
        "explanation": "ผิด: แม้จะเป็นจุดตั้งต้นที่สำคัญที่สุด แต่ไม่ได้ใช้เวลา 60–80% ของโครงการ"
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
    "scenario": "ในขั้นตอน Evaluation หากพบว่าผลการประเมินโมเดลไม่ผ่านเกณฑ์ทางธุรกิจที่ตั้งไว้ วงจร CRISP-DS กำหนดแนวทางปฏิบัติไว้อย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "ปรับลดเกณฑ์ความสำเร็จทางธุรกิจลงเพื่อให้สอดคล้องกับขีดจำกัดของข้อมูลที่มีอยู่",
        "isCorrect": false,
        "explanation": "ผิด: ห้ามลดเกณฑ์ทางธุรกิจลงเพื่อเอาใจผลลัพธ์ของโมเดล"
      },
      {
        "id": "B",
        "text": "ย้อนกลับไปทบทวนขั้นตอนต้นเหตุ เช่น นิยามปัญหาทางธุรกิจใหม่หรือปรับปรุงการเตรียมข้อมูล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 02: CRISP-DS เป็นกระบวนการวนซ้ำ (Iterative) เมื่อไม่ผ่านเกณฑ์ต้องหมุน Feedback Loop กลับไปแก้ที่ต้นเหตุ"
      },
      {
        "id": "C",
        "text": "นำข้อมูลจากชุด Test Set มารวมเข้ากับ Training Set เพื่อเพิ่มขนาดตัวอย่างในการเรียนรู้",
        "isCorrect": false,
        "explanation": "ผิด: การนำ Test Set มาเทรนทำให้เกิด Data Leakage อย่างร้ายแรง"
      },
      {
        "id": "D",
        "text": "ส่งมอบโมเดลขึ้นระบบ Production ไปก่อน แล้วจึงค่อยปรับปรุงแก้ไขในขั้นตอน Monitoring",
        "isCorrect": false,
        "explanation": "ผิด: โมเดลที่ไม่ผ่านเกณฑ์ Evaluation ห้ามนำไปใช้งานจริงเพราะจะสร้างความเสียหายต่อธุรกิจ"
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
    "scenario": "ข้อใดคือวัตถุประสงค์หลักของขั้นตอน Business Understanding ในวงจร CRISP-DS?",
    "options": [
      {
        "id": "A",
        "text": "การคัดเลือกสถาปัตยกรรมโมเดลและวางแผนการจัดสรรทรัพยากรประมวลผลสำหรับฝึกสอน",
        "isCorrect": false,
        "explanation": "ผิด: การเลือกอัลกอริทึมและฝึกสอนโมเดลอยู่ในขั้นตอน Modeling"
      },
      {
        "id": "B",
        "text": "การสำรวจคุณภาพของฐานข้อมูลเบื้องต้นเพื่อประเมินสัดส่วนของค่าที่สูญหายและค่าผิดปกติ",
        "isCorrect": false,
        "explanation": "ผิด: การสำรวจคุณภาพข้อมูลและค่าสูญหายอยู่ในขั้นตอน Data Understanding"
      },
      {
        "id": "C",
        "text": "การแปลงโจทย์ปัญหาทางธุรกิจให้เป็นเป้าหมายทางเทคนิคและกำหนดเกณฑ์วัดผลความสำเร็จ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 02 p15: Business Understanding ต้องนิยามปัญหา แปลงเป็นโจทย์ข้อมูล และตั้งเกณฑ์วัดผลก่อนเริ่มงาน"
      },
      {
        "id": "D",
        "text": "การออกแบบโครงสร้างตารางและสร้างตัวแปรใหม่ให้พร้อมสำหรับอัลกอริทึมการเรียนรู้",
        "isCorrect": false,
        "explanation": "ผิด: การแปลงตารางและสร้างฟีเจอร์อยู่ในขั้นตอน Data Preparation"
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
    "scenario": "ลูกค้า 1003 ขาดข้อมูลรายได้ (Missing) โดยบันทึกรายได้ของลูกค้ารายอื่นคือ [75,000, -40,000, 50,000, 99,999] หากใช้วิธี Valid Mean Imputation จะได้ค่าแทนที่เท่าใด?",
    "options": [
      {
        "id": "A",
        "text": "46,249.75 บาท",
        "isCorrect": false,
        "explanation": "ผิด: เกิดจากการนำค่า -40,000 ซึ่งเป็นค่าผิดปกติที่ไม่ได้มาตรฐาน (Invalid Value) มารวมคำนวณด้วย (184,999 / 4)",
        "distractorTrap": "ลืมตัดค่าติดลบทิ้งก่อนคำนวณ"
      },
      {
        "id": "B",
        "text": "50,000.00 บาท",
        "isCorrect": false,
        "explanation": "ผิด: โจทย์กำหนดให้ใช้วิธี Valid Mean ไม่ใช่การเลือกค่าต่ำสุดหรือค่ามัธยฐาน"
      },
      {
        "id": "C",
        "text": "62,500.00 บาท",
        "isCorrect": false,
        "explanation": "ผิด: เกิดจากการเผลอตัด 99,999 ทิ้งไปด้วย ทั้งที่ในสไลด์อาจารย์ระบุว่า 99,999 เป็นรายได้จริงที่ถูกต้อง ((75,000 + 50,000) / 2)"
      },
      {
        "id": "D",
        "text": "75,000.00 บาท",
        "isCorrect": true,
        "explanation": "ถูกต้องตามกฎ Clean Known Errors Before Calculating: ตัด -40,000 ออก เหลือข้อมูลที่ถูกต้อง 3 ค่า คือ (75,000 + 50,000 + 99,999) / 3 = 74,999.67 ≈ 75,000 บาท"
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
    "scenario": "ในการจัดการข้อมูลขาดหาย (Missing Data) เพราะเหตุใดการใช้วิธีลบแถวที่มีค่าว่างทิ้งทั้งหมด (Listwise Deletion) จึงเสี่ยงต่อการเกิด Selection Bias?",
    "options": [
      {
        "id": "A",
        "text": "เพราะหากข้อมูลไม่ได้สูญหายแบบสุ่มสมบูรณ์ การลบแถวจะทำให้ตัวอย่างที่เหลือไม่เป็นตัวแทนของประชากรจริง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 04.1 p22: หากการหายของข้อมูลมีนัยสำคัญ (Not MCAR) การลบแถวจะตัดกลุ่มประชากรบางกลุ่มออกไปจนเกิด Selection Bias"
      },
      {
        "id": "B",
        "text": "เพราะการลบแถวทำให้ความแปรปรวนของข้อมูลเพิ่มขึ้นจนอัลกอริทึมไม่สามารถลู่เข้าสู่คำตอบได้",
        "isCorrect": false,
        "explanation": "ผิด: การลบแถวมักทำให้ขนาดตัวอย่างลดลง แต่ประเด็นของ Selection Bias คือเรื่องความลำเอียงของตัวแทนประชากร"
      },
      {
        "id": "C",
        "text": "เพราะการลบแถวจะส่งผลให้ตัวแปรเป้าหมาย (Target Variable) เปลี่ยนชนิดจากข้อมูลต่อเนื่องเป็นข้อมูลหมวดหมู่",
        "isCorrect": false,
        "explanation": "ผิด: การลบแถวไม่ได้เปลี่ยนชนิดข้อมูล (Data Type) ของคอลัมน์"
      },
      {
        "id": "D",
        "text": "เพราะการลบแถวทำให้ข้อมูลในชุด Test Set รั่วไหลเข้ามาปะปนในชุด Training Set โดยอัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: การลบแถวไม่ได้ทำให้เกิดการข้ามชุดข้อมูลระหว่าง Train และ Test"
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
    "scenario": "เมื่อต้องการแทนค่าสูญหายของตัวแปร 'รายได้' สำหรับลูกค้าในกลุ่มอาชีพต่างๆ เพราะเหตุใดการใช้ Group Median จึงเหมาะสมกว่าการใช้ Overall Mean ทั้งตาราง?",
    "options": [
      {
        "id": "A",
        "text": "ช่วยปรับให้การกระจายตัวของข้อมูลในทุกสายอาชีพกลายเป็นโค้งปกติ (Normal Distribution) ทันที",
        "isCorrect": false,
        "explanation": "ผิด: การแทนค่าด้วยมัธยฐานไม่ได้เปลี่ยนรูปทรงการกระจายตัวของข้อมูลให้เป็นโค้งปกติ"
      },
      {
        "id": "B",
        "text": "สะท้อนระดับรายได้ตามบริบทของแต่ละสายอาชีพได้ตรงจริงและทนทานต่อค่าสุดขั้วในกลุ่ม",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 04.1 p36: Group Median รักษาบริบทความต่างของแต่ละกลุ่มย่อยและไม่ถูกดึงด้วยค่าสุดขั้ว"
      },
      {
        "id": "C",
        "text": "ช่วยลดจำนวนมิติของตัวแปร (Dimensionality Reduction) ก่อนนำเข้าสู่อัลกอริทึมการเรียนรู้",
        "isCorrect": false,
        "explanation": "ผิด: การทำ Imputation เป็นการเติมค่าว่าง ไม่ได้ลดจำนวนคอลัมน์หรือมิติของข้อมูล"
      },
      {
        "id": "D",
        "text": "รับประกันได้ว่าค่าความคลาดเคลื่อนของการทำนายบนชุดข้อมูลทดสอบจะลดลงเป็นศูนย์เสมอ",
        "isCorrect": false,
        "explanation": "ผิด: ไม่มีวิธี Imputation ใดที่รับประกันว่าความคลาดเคลื่อนของโมเดลจะเป็นศูนย์"
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
    "scenario": "ในการทำ Feature Scaling เช่น Min-Max หรือ Z-Score Standardization วิศวกรข้อมูลต้องคำนวณพารามิเตอร์สถิติ (min, max, mean, sd) ตามแนวทางใด?",
    "options": [
      {
        "id": "A",
        "text": "ประมวลผลจากชุดข้อมูลทั้งหมด (Full Dataset) ก่อนแยกชุดข้อมูล เพื่อให้ได้ค่าสถิติรวม",
        "isCorrect": false,
        "explanation": "ผิดอย่างยิ่ง: การคำนวณสถิติรวมทั้งตารางก่อนแบ่งชุดข้อมูลจะทำให้ข้อมูลจาก Test Set รั่วไหล (Data Leakage)",
        "distractorTrap": "คิดว่าคำนวณจากข้อมูลทั้งหมดจะได้ค่าสถิติที่แม่นยำกว่า"
      },
      {
        "id": "B",
        "text": "คำนวณแยกกันอย่างอิสระภายในแต่ละชุดข้อมูล โดยใช้ค่าสถิติของชุดใครชุดมันในการแปลงค่า",
        "isCorrect": false,
        "explanation": "ผิด: หากคำนวณแยกกัน สเกลของ Validation/Test จะไม่ตรงกับฐานที่โมเดลเรียนรู้มาจาก Training Set"
      },
      {
        "id": "C",
        "text": "ประมวลผลจากชุดข้อมูล Training Set เท่านั้น แล้วนำพารามิเตอร์เดิมไปแปลงค่าบน Validation และ Test Set",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 04.2 p27: ต้อง Fit พารามิเตอร์จาก Training Set เท่านั้น แล้วนำไป Transform ชุดอื่นๆ เพื่อป้องกัน Data Leakage"
      },
      {
        "id": "D",
        "text": "ประมวลผลจากชุดข้อมูล Validation Set เป็นหลัก แล้วนำพารามิเตอร์ไปปรับใช้กับทั้ง Training และ Test Set",
        "isCorrect": false,
        "explanation": "ผิด: Validation Set มีไว้สำหรับประเมินและเลือกโมเดล ห้ามใช้เป็นฐานคำนวณพารามิเตอร์การแปลงข้อมูล"
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
        "explanation": "ผิด: คำนวณตัวเศษผิดพลาด (40,000 / 100,000)"
      },
      {
        "id": "B",
        "text": "0.50",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสูตร: x_norm = (x - min) / (max - min) = (60,000 - 20,000) / (100,000 - 20,000) = 40,000 / 80,000 = 0.50"
      },
      {
        "id": "C",
        "text": "0.60",
        "isCorrect": false,
        "explanation": "ผิด: เกิดจากการนำ 60,000 หารด้วย 100,000 โดยลืมลบค่า min ทั้งตัวเศษและตัวส่วน"
      },
      {
        "id": "D",
        "text": "0.75",
        "isCorrect": false,
        "explanation": "ผิด: เกิดจากการนำ 60,000 หารด้วยช่วงพิสัย 80,000 โดยลืมลบค่า min ที่ตัวเศษ"
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
    "scenario": "ตัวแปรหมวดหมู่ 'ภูมิภาค' มี 4 ค่า (เหนือ, ใต้, ออก, ตก) หากทำ One-Hot Encoding สำหรับใช้ในโมเดล Linear/Logistic Regression ทำไมจึงต้องตัดออก 1 คอลัมน์ให้เหลือ k-1 (3 คอลัมน์)?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อป้องกันภาวะ Perfect Multicollinearity เนื่องจากผลรวมของทุกคอลัมน์จะมีค่าเท่ากับ 1 เสมอ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 04.2 p32: การเก็บครบ k คอลัมน์ทำให้ทำนายกันเองได้สมบูรณ์ (Dummy Variable Trap) จึงต้องตัดออก 1 คอลัมน์เพื่อเป็น Base Category"
      },
      {
        "id": "B",
        "text": "เพื่อบังคับให้ค่าสัมประสิทธิ์ของทุกภูมิภาคมีค่าเป็นบวกเสมอในการประมาณค่าพารามิเตอร์",
        "isCorrect": false,
        "explanation": "ผิด: ค่าสัมประสิทธิ์เมื่อเทียบกับกลุ่มฐานสามารถเป็นได้ทั้งค่าบวกและค่าลบ"
      },
      {
        "id": "C",
        "text": "เพื่อปรับสเกลของตัวแปรหมวดหมู่ให้มีค่าเฉลี่ยเป็นศูนย์และส่วนเบี่ยงเบนมาตรฐานเป็นหนึ่ง",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือหลักการของ Z-Score Standardization สำหรับข้อมูลเชิงปริมาณ"
      },
      {
        "id": "D",
        "text": "เพื่อลดความเสี่ยงของการเกิด Overfitting จากการที่ต้นไม้ตัดสินใจแตกกิ่งตามภูมิภาคมากเกินไป",
        "isCorrect": false,
        "explanation": "ผิด: ต้นไม้ตัดสินใจไม่ได้รับผลกระทบจากเมทริกซ์เอกฐานเหมือนตระกูล Linear Model"
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
    "scenario": "ชุดข้อมูลหนึ่งมี Q1 = 30 และ Q3 = 70 เมื่อตรวจสอบพบจุดข้อมูล x = 140 ข้อใดสรุปสถานะของจุดข้อมูลนี้ตามเกณฑ์ Tukey's Fences ได้ถูกต้อง?",
    "options": [
      {
        "id": "A",
        "text": "ไม่เป็น Potential Outlier เพราะขอบเขตรั้วบน (Upper Fence) มีค่าเท่ากับ 145",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณรั้วบนผิดพลาด เพราะ Upper Fence = 70 + 1.5(40) = 130 ไม่ใช่ 145"
      },
      {
        "id": "B",
        "text": "เป็น Potential Outlier เพราะมีค่าสูงกว่าขอบเขตรั้วบน (Upper Fence) ซึ่งอยู่ที่ 130",
        "isCorrect": true,
        "explanation": "ถูกต้อง: IQR = 70 - 30 = 40 และ Upper Fence = 70 + (1.5 * 40) = 130 ดังนั้น x = 140 จึงเกินรั้วบนและเป็น Potential Outlier"
      },
      {
        "id": "C",
        "text": "ไม่เป็น Potential Outlier เพราะขอบเขตรั้วบน (Upper Fence) มีค่าเท่ากับ 150",
        "isCorrect": false,
        "explanation": "ผิด: เกิดจากการใช้ตัวคูณ 2.0*IQR แทนที่จะใช้ 1.5*IQR ตามสูตรของ Tukey"
      },
      {
        "id": "D",
        "text": "เป็น Potential Outlier เพราะมีค่าสูงกว่าขอบเขตรั้วบน (Upper Fence) ซึ่งอยู่ที่ 110",
        "isCorrect": false,
        "explanation": "ผิด: เกิดจากการบวกเพียง 1.0*IQR (70 + 40 = 110) แทนที่จะคูณด้วย 1.5"
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
    "scenario": "ตามสไลด์ Lect 05 กระบวนการสำรวจข้อมูลเบื้องต้น (EDA) ควรดำเนินการในช่วงใดของวงจร CRISP-DS?",
    "options": [
      {
        "id": "A",
        "text": "ดำเนินการเพียงครั้งเดียวในขั้น Business Understanding ก่อนเริ่มเก็บรวบรวมข้อมูลจริงในขั้นตอนการวิเคราะห์ข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ในขั้น Business Understanding ยังไม่ได้สำรวจตารางข้อมูลจริง และ EDA เป็นกระบวนการที่ทำซ้ำได้"
      },
      {
        "id": "B",
        "text": "เริ่มเฉพาะหลังจากเสร็จสิ้นขั้น Modeling เพื่อใช้อธิบายสาเหตุที่โมเดลทำนายผิดพลาด",
        "isCorrect": false,
        "explanation": "ผิด: EDA ต้องทำตั้งแต่ก่อนสร้างโมเดลเพื่อทำความเข้าใจธรรมชาติและปัญหาของข้อมูล"
      },
      {
        "id": "C",
        "text": "เริ่มในขั้น Data Understanding และกลับมาทำซ้ำหลังขั้น Data Preparation เพื่อตรวจความพร้อม",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p3-4: Initial EDA เริ่มใน Data Understanding และต้องทำซ้ำหลัง Data Preparation เสมอ"
      },
      {
        "id": "D",
        "text": "เริ่มหลังจากนำโมเดลขึ้นระบบในขั้น Deployment เพื่อใช้สร้างรายงานสรุปผลประจำเดือน",
        "isCorrect": false,
        "explanation": "ผิด: หลัง Deployment เป็นการทำ Model Monitoring ไม่ใช่จุดเริ่มต้นของ Initial EDA"
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
    "scenario": "เหตุใดหลักการทำ EDA ใน Lect 05 จึงเน้นย้ำว่า 'ต้องเริ่มต้นด้วยคำถามเชิงวิเคราะห์ (Analytical Question)' เสมอ?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อลดจำนวนแถวของข้อมูลที่ต้องนำมาประมวลผล ทำให้การวาดกราฟใช้หน่วยความจำน้อยลง",
        "isCorrect": false,
        "explanation": "ผิด: การตั้งคำถามไม่ได้เป็นเทคนิคการบีบอัดหรือลดจำนวนแถวในฐานข้อมูล"
      },
      {
        "id": "B",
        "text": "เพื่อทดแทนขั้นตอนการตรวจสอบสมมติฐานทางสถิติและการแบ่งชุดข้อมูลทดสอบในภายหลัง",
        "isCorrect": false,
        "explanation": "ผิด: การตั้งคำถามใน EDA ไม่สามารถทดแทนขั้นตอนการประเมินและทดสอบโมเดลได้"
      },
      {
        "id": "C",
        "text": "เพื่อให้ซอฟต์แวร์สามารถตัดสินใจลบค่าผิดปกติ (Outliers) ออกจากตารางข้อมูลได้โดยอัตโนมัติตามหลักการประเมินผลมาตรฐาน",
        "isCorrect": false,
        "explanation": "ผิด: คำถามเชิงวิเคราะห์ไม่ได้ทำหน้าที่สั่งลบ Outliers อัตโนมัติ"
      },
      {
        "id": "D",
        "text": "เพื่อใช้เป็นกรอบกำหนดการเลือกตัวแปร สถิติสรุป และการเปรียบเทียบที่นำไปสู่กราฟที่ตรงประเด็น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p4: Analytical Question เป็นตัวกำหนดตัวแปร การเปรียบเทียบ และชนิดของ Visualization ที่เหมาะสม"
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
    "scenario": "หากข้อมูลยอดใช้จ่ายของลูกค้ามีการกระจายตัวแบบเบ้ขวารุนแรง (Right-Skewed) และมีค่าสุดขั้วปะปนอยู่ ควรเลือกใช้คู่สถิติวัดค่ากลางและการกระจายตัวข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "Mean และ Standard Deviation (SD)",
        "isCorrect": false,
        "explanation": "ผิด: ทั้ง Mean และ SD ไวต่อค่าสุดขั้วมาก จะถูกดึงไปทางหางที่เบ้ขวาจนไม่สะท้อนกลุ่มส่วนใหญ่",
        "distractorTrap": "เลือกใช้สถิติมาตรฐานโดยลืมพิจารณาความเบ้"
      },
      {
        "id": "B",
        "text": "Mean และ Interquartile Range (IQR)",
        "isCorrect": false,
        "explanation": "ผิด: แม้ IQR จะทนทานต่อค่าสุดขั้ว แต่ค่าเฉลี่ยเลขคณิต (Mean) ยังคงถูกบิดเบือนจากข้อมูลเบ้ขวา"
      },
      {
        "id": "C",
        "text": "Median และ Standard Deviation (SD)",
        "isCorrect": false,
        "explanation": "ผิด: แม้ Median จะทนทานต่อค่าสุดขั้ว แต่การวัดการกระจายด้วย SD ยังคงถูกกระทบอย่างหนักจากค่าสุดขั้ว"
      },
      {
        "id": "D",
        "text": "Median และ Interquartile Range (IQR)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p8-10: เมื่อข้อมูลเบ้หรือมี Outlier ต้องใช้ Median คู่กับ IQR เพราะมีความทนทาน (Robust) ทั้งคู่"
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
    "scenario": "เมื่อสร้างกราฟ Histogram ของตัวแปรรายได้ลูกค้าแล้วพบจุดยอดโด่งแยกกัน 2 ยอดอย่างชัดเจน (Bimodal Distribution) นักวิเคราะห์ควรตีความและดำเนินการอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "สรุปว่าเกิดความผิดพลาดในการบันทึกข้อมูล และให้ตัดข้อมูลบริเวณยอดที่สองทิ้งทันที",
        "isCorrect": false,
        "explanation": "ผิด: รูปทรงหลายยอดไม่ใช่ข้อผิดพลาดของระบบเสมอไป ห้ามตัดข้อมูลทิ้งโดยไม่ตรวจสอบ"
      },
      {
        "id": "B",
        "text": "ตั้งสมมติฐานว่าอาจมีกลุ่มย่อย (Sub-populations) ซ่อนอยู่ และควรแยกวิเคราะห์ตามกลุ่มย่อย",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p11: กราฟหลายยอดบ่งชี้ว่ามีกลุ่มย่อยที่มีพฤติกรรมต่างกันปะปนกันอยู่ เช่น ลูกค้าทั่วไปกับลูกค้าองค์กร"
      },
      {
        "id": "C",
        "text": "ใช้ค่าเฉลี่ยเลขคณิต (Overall Mean) เพียงค่าเดียวเป็นตัวแทนสรุปลักษณะของประชากรทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: ค่า Mean รวมจะตกลงในร่องตรงกลางระหว่างสองยอด ซึ่งไม่เป็นตัวแทนของกลุ่มใดเลย"
      },
      {
        "id": "D",
        "text": "สรุปว่าเกิดปัญหา Data Leakage ระหว่างชุดข้อมูลฝึกสอนและชุดข้อมูลทดสอบในขั้นตอนเตรียมข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ลักษณะการกระจายตัวแบบสองยอดเป็นธรรมชาติของประชากร ไม่ใช่สัญญาณของ Data Leakage"
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
    "scenario": "ตามสไลด์ Lect 05 p13-14 ก่อนนำผลการเปรียบเทียบความแตกต่างระหว่างกลุ่มไปรายงาน ทีมวิเคราะห์ต้องตรวจสอบเงื่อนไขความรับผิดชอบ 4 ประการในข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "จำนวนกลุ่มที่เท่ากันทุกกลุ่ม, การแจกแจงแบบโค้งปกติสมบูรณ์, ค่าสหสัมพันธ์เป็นหนึ่ง, และไม่มีค่าว่างเลย",
        "isCorrect": false,
        "explanation": "ผิด: ข้อมูลจริงในแต่ละกลุ่มไม่จำเป็นต้องมีขนาดเท่ากันเป๊ะหรือมีการแจกแจงปกติเสมอไป"
      },
      {
        "id": "B",
        "text": "ความลึกของต้นไม้ตัดสินใจ, ค่าความแม่นยำรวม, ความเร็วในการประมวลผล, และขนาดหน่วยความจำที่ใช้",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือพารามิเตอร์ทางเทคนิคของขั้นตอน Modeling ไม่ใช่เกณฑ์เปรียบเทียบกลุ่มใน EDA"
      },
      {
        "id": "C",
        "text": "ขนาดกลุ่มเพียงพอ, สัดส่วนค่าว่างไม่ต่างกันผิดปกติ, ความเป็นตัวแทนประชากร, และการคุ้มครองความเป็นส่วนตัว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p14: ต้องตรวจ Sufficient size, Differential missingness, Representation และ Privacy ก่อนรายงานผล"
      },
      {
        "id": "D",
        "text": "การแปลงค่าด้วย Z-Score, การตัดค่าสุดขั้วทิ้งทั้งหมด, การรวมกลุ่มย่อยเข้าด้วยกัน, และการตั้งชื่อ Persona",
        "isCorrect": false,
        "explanation": "ผิด: การตัดค่าสุดขั้วทิ้งทั้งหมดหรือการตั้งชื่อ Persona ทันทีไม่ใช่เกณฑ์ตรวจสอบความรับผิดชอบใน EDA"
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
    "scenario": "นักวิเคราะห์พบว่าความถี่ในการเปิดแอปพลิเคชันมีความสัมพันธ์เชิงบวกกับยอดสั่งซื้อ (r = +0.88) จึงสรุปทันทีว่าการบังคับส่งแจ้งเตือนให้คนเปิดแอปจะทำให้ยอดขายพุ่งขึ้น ข้อสรุปนี้บกพร่องเพราะเหตุใด?",
    "options": [
      {
        "id": "A",
        "text": "ค่าสหสัมพันธ์ r = +0.88 ยังไม่ถึงเกณฑ์ +1.00 จึงยังไม่สามารถยืนยันทิศทางความสัมพันธ์เชิงเส้นได้",
        "isCorrect": false,
        "explanation": "ผิด: ค่า r = +0.88 บอกทิศทางความสัมพันธ์เชิงบวกที่แข็งแกร่งได้แล้ว แต่ไม่สามารถใช้พิสูจน์ความเป็นเหตุและผลได้"
      },
      {
        "id": "B",
        "text": "การวัดความสัมพันธ์ระหว่างตัวแปรต่อเนื่องสองตัวควรใช้ค่า Gini Impurity แทนค่าสหสัมพันธ์เพียร์สัน",
        "isCorrect": false,
        "explanation": "ผิด: Gini Impurity ใช้วัดความบริสุทธิ์ของคลาสใน Decision Tree ไม่ได้ใช้วัดสหสัมพันธ์เชิงเส้น"
      },
      {
        "id": "C",
        "text": "ค่าสหสัมพันธ์ที่เป็นบวกบ่งชี้ว่าตัวแปรทั้งสองแปรผกผันกัน ดังนั้นการส่งแจ้งเตือนจะทำให้ยอดขายลดลงในขั้นตอนการวิเคราะห์ข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ค่า r เป็นบวกหมายถึงแปรผันตามกัน ไม่ใช่แปรผกผันกัน"
      },
      {
        "id": "D",
        "text": "ความสัมพันธ์ทางสถิติไม่ได้พิสูจน์ความเป็นเหตุและผล เพราะอาจเกิดจากตัวแปรแทรกซ้อนหรือทิศทางย้อนกลับ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p15-16: Correlation != Causation ต้องระวัง Confounding, Reverse direction และ Selection effects"
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
        "text": "ลากไปสิ้นสุดที่ค่าข้อมูลจริงตัวสุดท้ายที่มีค่าไม่เกินขอบเขต Upper Fence (Q3 + 1.5×IQR)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p17: เส้น Whisker จะลากไปหยุดที่ค่าสังเกตจริงตัวสุดท้ายที่ยังอยู่ภายในรั้ว (Last actual observation within fence)"
      },
      {
        "id": "B",
        "text": "ลากไปหยุดที่ตำแหน่งเส้นขอบเขตสมมติ Upper Fence (Q3 + 1.5×IQR) พอดีในทุกกรณี",
        "isCorrect": false,
        "explanation": "ติดกับดัก! Upper Fence เป็นเพียงเส้นเกณฑ์คัดกรองสมมติ ไม่ใช่จุดที่เส้นหนวดลากไปหยุดหากไม่มีข้อมูลอยู่ตรงนั้น",
        "distractorTrap": "จำสลับระหว่างเส้น Fence กับจุดสิ้นสุดของ Whisker"
      },
      {
        "id": "C",
        "text": "ลากไปจนถึงค่าสูงสุดของชุดข้อมูล (Maximum Value) เสมอโดยไม่คำนึงว่าจะมีค่าผิดปกติหรือไม่",
        "isCorrect": false,
        "explanation": "ผิด: หากค่าสูงสุดอยู่นอกรั้ว Upper Fence จะถูกพล็อตแยกเป็นจุด Outlier และเส้นหนวดจะไม่ลากไปถึง"
      },
      {
        "id": "D",
        "text": "ลากไปหยุดที่ตำแหน่งค่าเฉลี่ยเลขคณิตบวกด้วยสองเท่าของส่วนเบี่ยงเบนมาตรฐาน (Mean + 2SD)",
        "isCorrect": false,
        "explanation": "ผิด: โครงสร้าง Boxplot ของ Tukey อ้างอิงระบบ Quartile และ IQR ไม่ได้ใช้ Mean และ SD"
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
    "scenario": "ตามเกณฑ์การคัดกรองของ Tukey ใน Lect 05 ข้อมูลจุดใดจะถูกจัดประเภทเป็น 'Extreme Outlier' (ค่าผิดปกติระดับรุนแรง)?",
    "options": [
      {
        "id": "A",
        "text": "ข้อมูลที่มีค่าน้อยกว่า Q1 - 1.5×IQR หรือมากกว่า Q3 + 1.5×IQR",
        "isCorrect": false,
        "explanation": "ผิด: ขอบเขต 1.5×IQR เป็นเกณฑ์เริ่มต้นสำหรับคัดกรอง Potential (Mild) Outlier ทั่วไป"
      },
      {
        "id": "B",
        "text": "ข้อมูลที่มีค่าน้อยกว่า Q1 - 3.0×IQR หรือมากกว่า Q3 + 3.0×IQR",
        "isCorrect": true,
        "explanation": "ถูกต้องตามเนื้อหา Lect 05: ระยะ 1.5×IQR คือขอบเขตของ Potential Outlier ส่วนระยะ 3.0×IQR คือเกณฑ์ของ Extreme Outlier"
      },
      {
        "id": "C",
        "text": "ข้อมูลที่มีค่าน้อยกว่า Q1 - 2.0×IQR หรือมากกว่า Q3 + 2.0×IQR",
        "isCorrect": false,
        "explanation": "ผิด: มาตรฐานของ Tukey ใช้ตัวคูณ 1.5 สำหรับ Inner Fence และ 3.0 สำหรับ Outer Fence"
      },
      {
        "id": "D",
        "text": "ข้อมูลที่มีค่าน้อยกว่า Q2 - 3.0×IQR หรือมากกว่า Q2 + 3.0×IQR",
        "isCorrect": false,
        "explanation": "ผิด: การวัดรั้วต้องวัดออกจากขอบกล่อง Q1 และ Q3 ไม่ใช่วัดออกจากค่ามัธยฐาน Q2"
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
    "scenario": "ข้อใดจับคู่ประเภทของชุดสี (Color Palette) กับธรรมชาติของข้อมูลได้ถูกต้องตามหลักการสื่อสารข้อมูลใน Lect 05 p23?",
    "options": [
      {
        "id": "A",
        "text": "ข้อมูลหมวดหมู่ไร้ลำดับใช้ Sequential | ข้อมูลตัวเลขเรียงลำดับใช้ Qualitative | ข้อมูลมีจุดกึ่งกลางใช้ Diverging",
        "isCorrect": false,
        "explanation": "ผิด: สลับการใช้งานระหว่างชุดสี Sequential กับ Qualitative"
      },
      {
        "id": "B",
        "text": "ข้อมูลหมวดหมู่ไร้ลำดับใช้ Qualitative | ข้อมูลตัวเลขเรียงลำดับใช้ Diverging | ข้อมูลมีจุดกึ่งกลางใช้ Sequential",
        "isCorrect": false,
        "explanation": "ผิด: สลับการใช้งานระหว่างชุดสี Diverging กับ Sequential"
      },
      {
        "id": "C",
        "text": "ข้อมูลหมวดหมู่ไร้ลำดับใช้ Qualitative | ข้อมูลตัวเลขเรียงลำดับใช้ Sequential | ข้อมูลมีจุดกึ่งกลางใช้ Diverging",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p23: Qualitative แยกหมวดหมู่, Sequential ไล่ระดับมากน้อย, Diverging เน้นการเบี่ยงเบนออกจากจุดกึ่งกลาง"
      },
      {
        "id": "D",
        "text": "ข้อมูลหมวดหมู่ไร้ลำดับใช้ Diverging | ข้อมูลตัวเลขเรียงลำดับใช้ Sequential | ข้อมูลมีจุดกึ่งกลางใช้ Qualitative",
        "isCorrect": false,
        "explanation": "ผิด: ข้อมูลหมวดหมู่ต้องใช้สีที่แตกต่างกันชัดเจน (Qualitative) และข้อมูลมีจุดกึ่งกลางต้องใช้ Diverging"
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
    "scenario": "หลักการ 'Never rely on color alone' ในการออกแบบกราฟตามสไลด์ Lect 05 p25 หมายถึงแนวทางปฏิบัติในข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "หลีกเลี่ยงการใช้สีในแผนภูมิทุกชนิด และเปลี่ยนไปใช้การแรเงาขาวดำแทนเพื่อความคมชัดในการพิมพ์ตามเกณฑ์การวัดผลทางสถิติ",
        "isCorrect": false,
        "explanation": "ผิด: สามารถใช้สีช่วยสื่อสารได้ตามปกติ แต่ห้ามใช้สีเป็นช่องทางเดียวในการแยกแยะข้อมูล"
      },
      {
        "id": "B",
        "text": "เพิ่มจำนวนเฉดสีในกราฟให้หลากหลายที่สุด เพื่อให้แต่ละจุดข้อมูลมีสีเฉพาะตัวที่ไม่ซ้ำกันเลย",
        "isCorrect": false,
        "explanation": "ผิด: การใช้สีมากเกินไปทำให้เกิดความสับสนทางสายตาและทำลายลำดับความสำคัญของข้อมูล"
      },
      {
        "id": "C",
        "text": "กำหนดให้ใช้คู่สีแดงและสีเขียวเป็นมาตรฐานหลักในการเปรียบเทียบผลลัพธ์บวกและลบในทุกแผนภูมิ",
        "isCorrect": false,
        "explanation": "ผิด: คู่สีแดง-เขียวเป็นปัญหาหลักของผู้มีภาวะตาบอดสี (Red-Green Color Vision Deficiency)"
      },
      {
        "id": "D",
        "text": "ใช้สีควบคู่กับรหัสภาพอื่น เช่น รูปร่างจุด ชนิดเส้น หรือป้ายกำกับตรง เพื่อรองรับผู้มีภาวะตาบอดสี",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p25: การทำ Redundant Encoding ช่วยให้ผู้อ่านและผู้มีภาวะ CVD แยกแยะข้อมูลได้โดยไม่พึ่งสีเพียงอย่างเดียว"
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
    "scenario": "โครงสร้างการนำเสนอ Data Story ตามมาตรฐานในสไลด์ Lect 05 p28 ประกอบด้วย 5 องค์ประกอบที่เรียงลำดับอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "Context -> Evidence -> Insight -> Limitation -> Implication",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 05 p28: เริ่มจากบริบท -> หลักฐานข้อมูล -> ข้อค้นพบ -> ข้อจำกัดความไม่แน่นอน -> ข้อเสนอแนะเพื่อการตัดสินใจ"
      },
      {
        "id": "B",
        "text": "Evidence -> Insight -> Context -> Implication -> Limitation",
        "isCorrect": false,
        "explanation": "ผิด: ต้องปู Context ก่อนแสดงหลักฐาน และต้องแจ้ง Limitation ก่อนสรุปเป็น Implication"
      },
      {
        "id": "C",
        "text": "Insight -> Implication -> Context -> Evidence -> Limitation",
        "isCorrect": false,
        "explanation": "ผิด: การข้ามไปสรุปข้อเสนอแนะก่อนแสดงบริบทและหลักฐานทำให้ขาดความน่าเชื่อถือ"
      },
      {
        "id": "D",
        "text": "Context -> Insight -> Implication -> Evidence -> Limitation",
        "isCorrect": false,
        "explanation": "ผิด: Insight ต้องเกิดจากการวิเคราะห์ Evidence ตามลำดับ"
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
    "scenario": "ตามหลักการ 'Start with the decision need — not with machine learning' โจทย์ในข้อใดไม่จำเป็นต้องใช้ Machine Learning?",
    "options": [
      {
        "id": "A",
        "text": "การทำนายรายชื่อลูกค้าที่มีความเสี่ยงจะยกเลิกบริการภายในอีก 60 วันข้างหน้า",
        "isCorrect": false,
        "explanation": "ผิด: เป็นการพยากรณ์เหตุการณ์อนาคตรายบุคคล (Predictive Classification) ซึ่งเหมาะกับการใช้ ML"
      },
      {
        "id": "B",
        "text": "การคำนวณยอดสั่งซื้อมัธยฐานและสัดส่วนลูกค้าแยกตามภูมิภาคของไตรมาสที่ผ่านมา",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p4-5: เป็นการสรุปข้อมูลในอดีต (Descriptive Summary / EDA) สามารถหาคำตอบได้โดยตรงโดยไม่ต้องพึ่ง ML"
      },
      {
        "id": "C",
        "text": "การประเมินวงเงินสินเชื่อที่เหมาะสมสำหรับผู้สมัครรายใหม่จากประวัติพฤติกรรมการเงิน",
        "isCorrect": false,
        "explanation": "ผิด: เป็นการพยากรณ์ค่าต่อเนื่องหรือความเสี่ยงรายบุคคลสำหรับข้อมูลใหม่ที่ไม่เคยเห็นมาก่อน"
      },
      {
        "id": "D",
        "text": "การคัดกรองธุรกรรมบัตรเครดิตที่มีรูปแบบผิดปกติและเข้าข่ายการทุจริตแบบเรียลไทม์",
        "isCorrect": false,
        "explanation": "ผิด: เป็นงานตรวจจับความผิดปกติที่ซับซ้อนในข้อมูลใหม่ ซึ่งจำเป็นต้องใช้โมเดล"
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
    "scenario": "ตามกรอบแนวคิดในสไลด์ Lect 06 p7-8 ลำดับชั้น 5 ระดับในการเปลี่ยนโจทย์ปัญหาให้กลายเป็นโมเดลที่พร้อมใช้งานคือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "Algorithm -> Modeling Task -> Problem -> Learning Setting -> Trained Model",
        "isCorrect": false,
        "explanation": "ผิด: ห้ามเริ่มต้นจากการเลือก Algorithm ก่อนเข้าใจปัญหา"
      },
      {
        "id": "B",
        "text": "Problem -> Modeling Task -> Algorithm -> Learning Setting -> Trained Model",
        "isCorrect": false,
        "explanation": "ผิด: ต้องระบุ Learning Setting (เช่น Supervised/Unsupervised) ก่อนกำหนด Modeling Task"
      },
      {
        "id": "C",
        "text": "Problem -> Learning Setting -> Modeling Task -> Algorithm -> Trained Model",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p7-8: เริ่มจาก Problem -> Learning Setting -> Modeling Task -> Algorithm -> Trained Model"
      },
      {
        "id": "D",
        "text": "Learning Setting -> Problem -> Modeling Task -> Trained Model -> Algorithm",
        "isCorrect": false,
        "explanation": "ผิด: Problem ต้องเป็นจุดเริ่มต้นเสมอ และ Trained Model คือผลลัพธ์สุดท้ายหลังฝึกสอน Algorithm"
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
    "scenario": "ข้อใดอธิบายความแตกต่างระหว่าง 'Algorithm' และ 'Trained Model' ได้ถูกต้องตามหลักการใน Lect 06 p9?",
    "options": [
      {
        "id": "A",
        "text": "Algorithm คือผลลัพธ์หลังการฝึกสอนด้วยข้อมูลจริง ส่วน Trained Model คือสมการตั้งต้นก่อนเริ่มประมวลผล",
        "isCorrect": false,
        "explanation": "ผิด: สลับความหมายกันระหว่างกระบวนการเรียนรู้กับผลลัพธ์หลังฝึกสอน"
      },
      {
        "id": "B",
        "text": "Algorithm ใช้สำหรับงาน Unsupervised Learning เท่านั้น ส่วน Trained Model ใช้สำหรับงาน Supervised Learningในกระบวนการเตรียมชุดข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ทั้งการเรียนรู้แบบมีผู้สอนและไม่มีผู้สอนต่างก็มีทั้งส่วนที่เป็น Algorithm และ Trained Model"
      },
      {
        "id": "C",
        "text": "Algorithm คือขั้นตอนการเตรียมข้อมูลดิบ ส่วน Trained Model คือรายงานสรุปผลการประเมินความแม่นยำ",
        "isCorrect": false,
        "explanation": "ผิด: การเตรียมข้อมูลและการทำรายงานประเมินผลเป็นคนละส่วนกับตัวโมเดล"
      },
      {
        "id": "D",
        "text": "Algorithm คือระเบียบวิธีการเรียนรู้ทั่วไป ส่วน Trained Model คือผลลัพธ์ที่ได้หลังนำข้อมูลไปฝึกสอนจนได้พารามิเตอร์",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p9: การทำ Training บนชุดข้อมูลจะเปลี่ยน Algorithm ให้กลายเป็น Trained Model ที่มีกฎหรือพารามิเตอร์เฉพาะ"
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
    "scenario": "ในการสร้างชุดข้อมูลเพื่อทำนายว่า 'ลูกค้าจะหยุดซื้อสินค้าภายใน 60 วันข้างหน้าหรือไม่' ตัวแปรต้น (Features) ต้องดึงมาจากช่วงเวลาใด?",
    "options": [
      {
        "id": "A",
        "text": "ข้อมูลพฤติกรรมที่เกิดขึ้นก่อนหรือ ณ วันสังเกตการณ์ (Observation Date) เท่านั้น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p12-13: ตัวแปรต้นทุกตัวต้องมีอยู่จริงก่อนหรือ ณ จังหวะเวลาที่สั่งทำนาย เพื่อป้องกัน Data Leakage"
      },
      {
        "id": "B",
        "text": "ข้อมูลพฤติกรรมที่เกิดขึ้นในช่วง 60 วันหลังวันสังเกตการณ์ (Outcome Window)",
        "isCorrect": false,
        "explanation": "ผิด: ช่วงหลังวันสังเกตการณ์คือช่วงเวลาของตัวแปรเป้าหมาย (Target/Outcome) ห้ามนำมาสร้างเป็น Feature"
      },
      {
        "id": "C",
        "text": "ข้อมูลพฤติกรรมเฉลี่ยรวมทั้งก่อนและหลังวันสังเกตการณ์อย่างละ 30 วันเท่ากัน",
        "isCorrect": false,
        "explanation": "ผิด: การดึงข้อมูลหลังวันสังเกตการณ์แม้เพียงวันเดียวก็ทำให้เกิดการรั่วไหลของข้อมูลอนาคต"
      },
      {
        "id": "D",
        "text": "ข้อมูลทุกช่วงเวลาที่มีอยู่ในคลังข้อมูล ณ วันที่ทีมวิศวกรเริ่มเขียนโค้ดฝึกสอนโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: ในคลังข้อมูลอาจมีเหตุการณ์ที่เกิดหลัง Observation Date บันทึกไว้แล้ว ต้องกรองตามเวลาอย่างเคร่งครัด"
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
    "scenario": "เกณฑ์สำคัญที่สุดที่ใช้แยกความแตกต่างระหว่าง Supervised Learning และ Unsupervised Learning คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "การมีผู้เชี่ยวชาญคอยตรวจสอบและปรับแก้พารามิเตอร์ด้วยตนเองในทุกรอบของการฝึกสอน",
        "isCorrect": false,
        "explanation": "ติดกับดัก! สไลด์ Lect 06 p15 ระบุชัดเจนว่า Supervised ไม่ได้แปลว่ามีคนนั่งเฝ้าระหว่างเทรน",
        "distractorTrap": "แปลคำว่า Supervised ตรงตัวว่ามีคนคอยคุม"
      },
      {
        "id": "B",
        "text": "การมีตัวแปรเป้าหมาย (Labeled Target y) ที่ทราบคำตอบชัดเจนอยู่ในชุดข้อมูลสำหรับฝึกสอน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p15: Supervised Learning เรียนรู้จากข้อมูลที่มี Target กำกับ ส่วน Unsupervised ไม่มี Target"
      },
      {
        "id": "C",
        "text": "ชนิดของตัวแปรนำเข้า โดย Supervised ใช้กับข้อมูลตัวเลขและ Unsupervised ใช้กับข้อมูลข้อความ",
        "isCorrect": false,
        "explanation": "ผิด: ทั้งสองรูปแบบสามารถประมวลผลข้อมูลตัวเลข หมวดหมู่ หรือข้อความได้ตามอัลกอริทึมที่เลือก"
      },
      {
        "id": "D",
        "text": "ความจำเป็นในการแบ่งชุดข้อมูล ซึ่ง Unsupervised บังคับต้องใช้ Test Set เสมอในการคำนวณความแม่นยำ",
        "isCorrect": false,
        "explanation": "ผิด: Unsupervised ไม่มีคลาสเฉลยสำหรับคำนวณ Accuracy แบบ Supervised"
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
    "scenario": "เหตุใดสไลด์ Lect 06 p16 จึงเน้นย้ำว่าผลลัพธ์จากการทำ Clustering ไม่เท่ากับ Predefined Class และไม่เท่ากับ Ground Truth?",
    "options": [
      {
        "id": "A",
        "text": "เพราะอัลกอริทึมจัดกลุ่มมีความคลาดเคลื่อนทางพีชคณิตสูง จึงต้องนำผลลัพธ์ไปเทรนซ้ำด้วยโมเดลจำแนกประเภทตามหลักการประเมินผลมาตรฐาน",
        "isCorrect": false,
        "explanation": "ผิด: ประเด็นไม่ได้อยู่ที่ความผิดพลาดของการคำนวณ แต่อยู่ที่นิยามความหมายของกลุ่มที่ขึ้นกับตัวแปรที่เลือก"
      },
      {
        "id": "B",
        "text": "เพราะผลลัพธ์จาก Clustering ไม่สามารถนำไปใช้วางแผนกลยุทธ์ทางการตลาดหรือแบ่งกลุ่มลูกค้าในชีวิตจริงได้",
        "isCorrect": false,
        "explanation": "ผิด: สามารถนำไปใช้ทำ Customer Segmentation ได้ดีหากผ่านการทำ Cluster Profiling อย่างถูกต้อง"
      },
      {
        "id": "C",
        "text": "เพราะการจัดกลุ่มเป็นเพียงการสำรวจโครงสร้างความคล้ายคลึงตามตัวแปรที่เลือก ไม่ใช่คลาสความจริงที่มีอยู่ตายตัว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p16: ผลลัพธ์ของ Clustering เปลี่ยนไปตามฟีเจอร์และการตั้งค่า จึงเป็นเพียง Candidate Groups ที่ต้องตีความต่อ"
      },
      {
        "id": "D",
        "text": "เพราะจำนวนกลุ่มที่ได้จากการทำ Clustering จะเปลี่ยนแปลงแบบสุ่มทุกครั้งที่เปิดอ่านไฟล์ข้อมูลเดิม",
        "isCorrect": false,
        "explanation": "ผิด: หากกำหนดค่าเริ่มต้น (Random Seed) และพารามิเตอร์คงที่ ผลลัพธ์จะสามารถทำซ้ำได้"
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
    "scenario": "เมื่อต้องการตรวจสอบว่าตัวแปรที่สร้างขึ้นใหม่มีความเสี่ยงเกิดปัญหา Data Leakage หรือไม่ ควรถามคำถามตรวจสอบตามข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ตัวแปรนี้มีค่าสหสัมพันธ์กับตัวแปรต้นตัวอื่นในตารางเกินกว่าเกณฑ์ 0.80 หรือไม่?",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือการตรวจสอบปัญหาความซ้ำซ้อนของตัวแปรต้น (Multicollinearity)"
      },
      {
        "id": "B",
        "text": "ตัวแปรนี้มีสัดส่วนของข้อมูลที่สูญหาย (Missing Values) เกินกว่าเกณฑ์ที่กำหนดหรือไม่?",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือการตรวจสอบความสมบูรณ์ของข้อมูลในขั้น Data Cleaning"
      },
      {
        "id": "C",
        "text": "ตัวแปรนี้ผ่านการแปลงสเกลด้วยวิธี Min-Max หรือ Z-Score Standardization มาแล้วหรือไม่?สำหรับการประมวลผลในระบบจริง",
        "isCorrect": false,
        "explanation": "ผิด: การทำหรือไม่ทำ Feature Scaling เป็นเรื่องของการปรับสเกล ไม่ใช่เกณฑ์ตัดสินว่าตัวแปรนั้นเป็นข้อมูลจากอนาคตหรือไม่"
      },
      {
        "id": "D",
        "text": "ตัวแปรนี้จะมีข้อมูลพร้อมใช้งานจริง ณ จังหวะเวลาที่โมเดลต้องสร้างคำทำนายในหน้างานจริงหรือไม่?",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p18: หากตัวแปรนั้นอาศัยข้อมูลที่เกิดหลังจุดเวลาทำนาย จะเกิด Target/Feature Leakage ทันที"
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
    "scenario": "เหตุใดในการพัฒนาโมเดลทาง Data Science จึงควรเริ่มต้นด้วยการสร้างโมเดลพื้นฐานที่เรียบง่าย (Simple Baseline) ก่อนเสมอ?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อใช้เป็นเกณฑ์อ้างอิงเปรียบเทียบว่าความซับซ้อนที่เพิ่มขึ้นของโมเดลขั้นสูงให้ประสิทธิภาพที่คุ้มค่าหรือไม่",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p21: Simple Baseline ทำหน้าที่เป็น Benchmark เพื่อดูว่าโมเดลที่ซับซ้อนกว่าให้ผลลัพธ์ดีขึ้นอย่างคุ้มค่าจริงหรือไม่"
      },
      {
        "id": "B",
        "text": "เพื่อลดขั้นตอนการแบ่งชุดข้อมูล Validation Set และสามารถนำข้อมูลทั้งหมดไปใช้ฝึกสอนได้ในคราวเดียว",
        "isCorrect": false,
        "explanation": "ผิด: ไม่ว่าจะใช้โมเดลพื้นฐานหรือซับซ้อน ก็ยังต้องมีการแบ่งชุดข้อมูลเพื่อประเมินผลอย่างเป็นระบบ"
      },
      {
        "id": "C",
        "text": "เพื่อรับประกันว่าโมเดลจะไม่เกิดปัญหาอคติทางจริยธรรมหรือตัวแปรตัวแทน (Proxy Bias) ในการตัดสินใจ",
        "isCorrect": false,
        "explanation": "ผิด: โมเดลพื้นฐานอย่างกฏง่ายๆ หรือ Logistic Regression ก็เกิดอคติได้หากตัวแปรนำเข้ามีความลำเอียง"
      },
      {
        "id": "D",
        "text": "เพราะโมเดลที่เรียบง่ายจะให้ค่าความแม่นยำบนชุดข้อมูลทดสอบสูงกว่าโมเดลที่ซับซ้อนเสมอในทุกโจทย์ปัญหา",
        "isCorrect": false,
        "explanation": "ผิด: โมเดลที่ซับซ้อนอาจให้ผลลัพธ์ดีกว่าได้หากข้อมูลมีความสัมพันธ์ไม่เป็นเชิงเส้น แต่ต้องพิสูจน์เทียบกับ Baseline"
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
    "scenario": "ข้อใดกล่าวถึงบทบาทและแนวทางการใช้งานชุดข้อมูล Test Set ได้ถูกต้องตามหลักการในสไลด์ Lect 06 p24?",
    "options": [
      {
        "id": "A",
        "text": "ใช้สำหรับเปรียบเทียบและคัดเลือกค่า Hyperparameter ที่ดีที่สุดในแต่ละรอบของการทดลองปรับแต่งโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: การปรับจูนและเลือกพารามิเตอร์เป็นหน้าที่ของ Validation Set ห้ามใช้ Test Set เด็ดขาด",
        "distractorTrap": "สับสนหน้าที่ระหว่าง Validation Set กับ Test Set"
      },
      {
        "id": "B",
        "text": "ใช้เป็นหลักฐานอิสระขั้นสุดท้ายเพื่อประเมินประสิทธิภาพเพียงครั้งเดียวหลังจากเลือกโมเดลเสร็จสมบูรณ์แล้ว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p24: Test Set ต้องถูกแยกเก็บไว้อย่างเคร่งครัดและเปิดใช้เพื่อยืนยันผลขั้นสุดท้ายเพียงครั้งเดียว"
      },
      {
        "id": "C",
        "text": "ใช้ร่วมกับชุด Training Set ในการคำนวณค่าเฉลี่ยและส่วนเบี่ยงเบนมาตรฐานสำหรับการทำ Feature Scalingตามเกณฑ์การวัดผลทางสถิติ",
        "isCorrect": false,
        "explanation": "ผิด: การนำ Test Set มาร่วมคำนวณสถิติการแปลงข้อมูลทำให้เกิด Data Leakage"
      },
      {
        "id": "D",
        "text": "ใช้สำหรับตรวจสอบหาค่าผิดปกติ (Outliers) เพื่อกำหนดเกณฑ์รั้วของ Tukey ก่อนเริ่มแบ่งข้อมูลฝึกสอน",
        "isCorrect": false,
        "explanation": "ผิด: การกำหนดเกณฑ์ใดๆ จากข้อมูลต้องอ้างอิงจากชุด Training Set เท่านั้น"
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
    "scenario": "เมื่อฝึกสอนโมเดลจำแนกประเภท พบว่าได้ Accuracy บน Training Set = 99% แต่ได้ Accuracy บน Validation Set = 68% ผลลัพธ์นี้บ่งชี้ถึงสภาวะใดและควรแก้ไขอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "เกิดภาวะ Underfitting ควรเพิ่มความลึกของโมเดลหรือเพิ่มจำนวนฟีเจอร์เพื่อให้เรียนรู้ได้ละเอียดขึ้นในขั้นตอนการวิเคราะห์ข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: Underfitting คือภาวะที่โมเดลทำคะแนนได้ต่ำทั้งบน Training Set และ Validation Set"
      },
      {
        "id": "B",
        "text": "เกิดภาวะ Appropriate Fit สามารถนำโมเดลนี้ไปประเมินขั้นสุดท้ายบนชุดข้อมูล Test Set ได้ทันที",
        "isCorrect": false,
        "explanation": "ผิด: ช่องว่างคะแนนระหว่าง 99% กับ 68% ห่างกันมากเกินไป แสดงว่าโมเดลไม่พร้อมใช้งานกับข้อมูลใหม่"
      },
      {
        "id": "C",
        "text": "เกิดภาวะ Overfitting ควรลดความซับซ้อนของโมเดลลง เช่น จำกัดความลึกของต้นไม้หรือเพิ่มเงื่อนไขการหยุด",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 06 p25: คะแนน Train สูงมากแต่ Validation ต่ำแสดงว่าโมเดลจำข้อสอบเก่า (Overfitting) ต้องลดความซับซ้อนลง"
      },
      {
        "id": "D",
        "text": "เกิดภาวะ Data Leakage ควรนำข้อมูลจาก Validation Set เข้าไปผสมใน Training Set เพื่อปรับสมดุลคะแนน",
        "isCorrect": false,
        "explanation": "ผิด: ห้ามนำ Validation Set ไปผสมใน Training Set เพื่อแก้ปัญหา Overfitting"
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
    "scenario": "โหนดแม่มีค่า Gini = 0.500 อัลกอริทึมพิจารณาจุดตัดกิ่ง 2 ทางเลือก โดย Candidate A ให้ค่า Gini_split = 0.278 และ Candidate B ให้ค่า Gini_split = 0.444 อัลกอริทึมจะตัดสินใจอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "เลือก Candidate B เพราะให้ค่า Gini Gain เท่ากับ 0.944 ซึ่งสูงกว่า Candidate A",
        "isCorrect": false,
        "explanation": "ผิด: คำนวณสูตร Gini Gain ผิดพลาดด้วยการนำค่ามาบวกกันแทนที่จะลบกัน"
      },
      {
        "id": "B",
        "text": "เลือก Candidate B เพราะให้ค่า Gini_split เท่ากับ 0.444 ซึ่งสูงกว่า Candidate A",
        "isCorrect": false,
        "explanation": "ผิด: ค่า Gini_split คือความไม่บริสุทธิ์หลังแบ่ง ยิ่งสูงแปลว่ายิ่งปะปนมาก เราต้องการให้ Gini_split ต่ำที่สุด (หรือ Gini Gain สูงสุด)"
      },
      {
        "id": "C",
        "text": "เลือก Candidate A เพราะให้ค่า Gini Gain เท่ากับ 0.778 ซึ่งสูงกว่า Candidate B",
        "isCorrect": false,
        "explanation": "ผิด: สูตร Gini Gain คือการนำ Gini_parent ตั้งแล้วลบด้วย Gini_split (0.500 - 0.278 = 0.222) ไม่ใช่การนำมาบวกกัน"
      },
      {
        "id": "D",
        "text": "เลือก Candidate A เพราะให้ค่า Gini Gain เท่ากับ 0.222 ซึ่งสูงกว่า Candidate B",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p12: Gini Gain(A) = 0.500 - 0.278 = 0.222 ส่วน Gain(B) = 0.500 - 0.444 = 0.056 จึงเลือก A ที่ลดความปะปนได้มากกว่า"
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
    "scenario": "ในการฝึกสอน Decision Tree ตามสไลด์ Lect 07 p19 เหตุใดต้นไม้ระดับความลึกปานกลาง (Moderate Tree, max_depth = 3) จึงถูกเลือกแทนต้นไม้ที่ไม่จำกัดความลึก (Unrestricted Tree)?",
    "options": [
      {
        "id": "A",
        "text": "เพราะความลึกที่ 3 สร้างสมดุลระหว่าง Bias และ Variance ได้ดีที่สุด จึงทำผลงานบน Validation Set ได้สูงสุด",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p19, p31: Moderate Tree ไม่ตื้นเกินไปจน Underfit และไม่ลึกเกินไปจนจดจำ Noise ในข้อมูลฝึกสอน"
      },
      {
        "id": "B",
        "text": "เพราะความลึกที่ 3 ให้ค่าความคลาดเคลื่อนบนชุดข้อมูลฝึกสอน (Training Error) ต่ำที่สุดเมื่อเทียบกับความลึกอื่น",
        "isCorrect": false,
        "explanation": "ผิดตามสไลด์ Lect 07 p19: ต้นไม้ที่กด Training Error ต่ำสุดคือ Unrestricted Tree แต่จะแลกมาด้วยการเกิด Overfitting"
      },
      {
        "id": "C",
        "text": "เพราะอัลกอริทึม CART มีข้อจำกัดทางคณิตศาสตร์ที่ไม่สามารถแตกกิ่งก้านให้มีความลึกเกินกว่าจำนวนตัวแปรต้นได้",
        "isCorrect": false,
        "explanation": "ผิด: ต้นไม้ตัดสินใจสามารถแตกกิ่งซ้ำบนตัวแปรเดิมด้วยจุดตัดใหม่ได้เรื่อยๆ จนกว่าโหนดจะบริสุทธิ์"
      },
      {
        "id": "D",
        "text": "เพราะความลึกที่ 3 บังคับให้ทุกโหนดใบ (Leaf Nodes) มีค่า Gini Impurity เท่ากับศูนย์อย่างสมบูรณ์",
        "isCorrect": false,
        "explanation": "ผิด: การจำกัดความลึกไว้ที่ 3 ชั้นมักจะหยุดการแตกกิ่งก่อนที่โหนดใบทุกโหนดจะมี Gini = 0"
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
    "scenario": "อัลกอริทึม Decision Tree สร้างต้นไม้ด้วยกลยุทธ์ 'Greedy Recursive Splitting' ซึ่งมีคุณลักษณะและข้อจำกัดทางทฤษฎีอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "ค้นหาโครงสร้างต้นไม้ทุกรูปแบบที่เป็นไปได้พร้อมกัน เพื่อรับประกันว่าจะได้ต้นไม้ที่สมบูรณ์ที่สุดเสมอ",
        "isCorrect": false,
        "explanation": "ผิด: การค้นหาต้นไม้ทุกรูปแบบมีต้นทุนคำนวณสูงเกินไป อัลกอริทึมจึงไม่ได้มองภาพรวมทุกชั้นล่วงหน้า"
      },
      {
        "id": "B",
        "text": "เลือกจุดตัดที่ให้ค่าความบริสุทธิ์เพิ่มขึ้นสูงสุดเฉพาะหน้า ณ โหนดปัจจุบัน โดยไม่รับประกัน Global Optimum",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p6-7: กลยุทธ์แบบ Greedy เลือกจุดตัดที่ดีที่สุดเฉพาะหน้า (Local Optimum) ในแต่ละขั้นโดยไม่ย้อนกลับ"
      },
      {
        "id": "C",
        "text": "รองรับเฉพาะตัวแปรต้นที่เป็นข้อมูลหมวดหมู่เท่านั้น ไม่สามารถหาจุดตัดบนตัวแปรที่เป็นตัวเลขต่อเนื่องได้ในกระบวนการเตรียมชุดข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: Decision Tree สามารถหาจุดตัด Threshold (เช่น x <= c) บนข้อมูลตัวเลขต่อเนื่องได้โดยตรง"
      },
      {
        "id": "D",
        "text": "บังคับให้ข้อมูลต้องผ่านการทำ Feature Scaling ด้วยวิธี Z-Score ก่อนเสมอ มิฉะนั้นจุดตัดจะบิดเบี้ยว",
        "isCorrect": false,
        "explanation": "ผิด: Decision Tree พิจารณาลำดับค่าของตัวแปรทีละตัว จึงไม่ไวต่อสเกลของตัวแปรเหมือน K-Means"
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
    "scenario": "โหนดหนึ่งมีข้อมูลตัวอย่างทั้งหมด 6 รายการ แบ่งเป็นคลาส Active 5 รายการ และคลาส Inactive 1 รายการ ค่า Gini Impurity ของโหนดนี้มีค่าเท่าใด?",
    "options": [
      {
        "id": "A",
        "text": "0.167",
        "isCorrect": false,
        "explanation": "ผิด: 0.167 คือสัดส่วนของคลาสส่วนน้อย (1/6) ไม่ใช่ค่า Gini Impurity"
      },
      {
        "id": "B",
        "text": "0.278",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p8: Gini = 1 - (5/6)² - (1/6)² = 1 - 25/36 - 1/36 = 10/36 ≈ 0.278"
      },
      {
        "id": "C",
        "text": "0.500",
        "isCorrect": false,
        "explanation": "ผิด: 0.500 คือค่า Gini สูงสุดเมื่อทั้งสองคลาสมีสัดส่วนเท่ากันพอดี (3 ต่อ 3)"
      },
      {
        "id": "D",
        "text": "0.722",
        "isCorrect": false,
        "explanation": "ผิด: 0.722 คือผลรวมกำลังสองของสัดส่วน (26/36) โดยลืมนำไปลบออกจาก 1"
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
    "scenario": "เมื่อพิจารณาโหนดใบ (Leaf Node) ของ Decision Tree ที่แสดงค่า P(Inactive) = 4/5 = 0.80 ข้อใดตีความค่าตัวเลขนี้ได้ถูกต้องตามสไลด์ Lect 07 p15?",
    "options": [
      {
        "id": "A",
        "text": "เป็นค่า Recall ของโมเดลเมื่อนำไปทดสอบบนชุดข้อมูล Test Set สำหรับกลุ่มลูกค้าที่มีความเสี่ยงสูง",
        "isCorrect": false,
        "explanation": "ผิด: ตัวเลขภายในโหนดของต้นไม้คำนวณมาจากข้อมูล Training Set ที่ตกในกิ่งนั้น ไม่ใช่ค่า Recall บน Test Set"
      },
      {
        "id": "B",
        "text": "เป็นค่าความน่าจะเป็นที่ผ่านการปรับเทียบมาตรฐาน (Calibrated Confidence) ซึ่งรับรองผลแม่นยำ 80% ในการใช้งานจริงในขั้นตอนการวิเคราะห์ข้อมูล",
        "isCorrect": false,
        "explanation": "ติดกับดัก! สไลด์เตือนชัดเจนว่าตัวเลขสัดส่วนใน Leaf Node ของต้นไม้ไม่ใช่ Calibrated Confidence",
        "distractorTrap": "ตีความสัดส่วนในโหนดใบว่าเป็นความน่าจะเป็นจริงที่ผ่านการปรับเทียบแล้ว"
      },
      {
        "id": "C",
        "text": "เป็นค่า Gini Impurity ประจำโหนดใบนั้น ซึ่งแสดงว่าโหนดยังมีความไม่บริสุทธิ์เหลืออยู่อีก 80%",
        "isCorrect": false,
        "explanation": "ผิด: ตัวเลข 4/5 คือสัดส่วนคลาสในโหนด ส่วนค่า Gini ของโหนดนี้คือ 1 - (0.8² + 0.2²) = 0.32"
      },
      {
        "id": "D",
        "text": "เป็นเพียงสัดส่วนของตัวอย่างคลาส Inactive จากชุด Training Set ที่ตกลงในโหนดใบนี้ ไม่ใช่ความมั่นใจที่ผ่านการเทียบมาตรฐาน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p15: ค่าความน่าจะเป็นในโหนดใบเป็นเพียงสัดส่วนนับจำนวนจากข้อมูลฝึกสอน ไม่ใช่ Calibrated Probability"
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
    "scenario": "ข้อใดต่อไปนี้ 'ไม่ใช่' เงื่อนไขการหยุดแตกกิ่ง (Stopping Rules) ตามมาตรฐานในการฝึกสอนโมเดล Decision Tree?",
    "options": [
      {
        "id": "A",
        "text": "ค่าความแม่นยำในการทำนายบนชุดข้อมูล Test Set เพิ่มขึ้นจนผ่านเกณฑ์ที่กำหนดไว้",
        "isCorrect": true,
        "explanation": "ถูกต้อง: ชุดข้อมูล Test Set ห้ามถูกนำมาใช้ตรวจสอบหรือเป็นเงื่อนไขหยุดระหว่างการฝึกสอนโมเดลเด็ดขาด"
      },
      {
        "id": "B",
        "text": "ตัวอย่างทั้งหมดในโหนดนั้นอยู่ในคลาสเดียวกันอย่างสมบูรณ์ (Gini Impurity เท่ากับ 0)",
        "isCorrect": false,
        "explanation": "เป็นเงื่อนไขการหยุดตามธรรมชาติเมื่อโหนดมีความบริสุทธิ์สมบูรณ์แล้ว"
      },
      {
        "id": "C",
        "text": "จำนวนข้อมูลในโหนดเหลือน้อยกว่าเกณฑ์ขั้นต่ำที่อนุญาตให้แบ่งต่อ (min_samples_split)",
        "isCorrect": false,
        "explanation": "เป็นเงื่อนไขการหยุดมาตรฐานเพื่อป้องกันการสร้างโหนดใบที่มีข้อมูลน้อยเกินไป"
      },
      {
        "id": "D",
        "text": "ความลึกของกิ่งก้านไปถึงระดับสูงสุดที่กำหนดไว้ล่วงหน้าในพารามิเตอร์ max_depth",
        "isCorrect": false,
        "explanation": "เป็นเงื่อนไขการหยุดมาตรฐานเพื่อควบคุมความซับซ้อนของต้นไม้"
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
    "scenario": "ในการคัดเลือกค่าพารามิเตอร์ความลึกของต้นไม้ (max_depth) ที่เหมาะสมที่สุด ทีมพัฒนาต้องพิจารณาเปรียบเทียบผลลัพธ์จากชุดข้อมูลใด?",
    "options": [
      {
        "id": "A",
        "text": "ชุดข้อมูลฝึกสอน (Training Set)",
        "isCorrect": false,
        "explanation": "ผิด: การดูแต่ผลบน Training Set จะทำให้เลือกต้นไม้ที่ลึกที่สุดเสมอ ซึ่งนำไปสู่ปัญหา Overfitting"
      },
      {
        "id": "B",
        "text": "ชุดข้อมูลตรวจสอบ (Validation Set)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p18: การเลือก Hyperparameter เช่น max_depth ต้องตัดสินจากประสิทธิภาพบน Validation Set"
      },
      {
        "id": "C",
        "text": "ชุดข้อมูลทดสอบขั้นสุดท้าย (Test Set)",
        "isCorrect": false,
        "explanation": "ผิด: ห้ามนำชุดข้อมูล Test Set มาใช้ในการปรับจูนหรือเลือกพารามิเตอร์ของโมเดล"
      },
      {
        "id": "D",
        "text": "ชุดข้อมูลดิบก่อนทำความสะอาด (Raw Dataset)",
        "isCorrect": false,
        "explanation": "ผิด: ข้อมูลต้องผ่านการทำความสะอาดและแบ่งแยกชุดข้อมูลอย่างถูกต้องก่อนนำมาประเมิน"
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
    "scenario": "โมเดลคัดเลือกนักเตะ 10 คน กำหนด Positive Class = \"play\" ได้ผล Confusion Matrix: TP = 4, FN = 2, FP = 1, TN = 3 ค่า Precision ของโมเดลนี้มีค่าเท่าใด?",
    "options": [
      {
        "id": "A",
        "text": "0.67 (66.67%)",
        "isCorrect": false,
        "explanation": "ผิด: 0.67 คือค่า Recall ซึ่งคำนวณจาก TP / (TP + FN) = 4 / (4 + 2) = 4/6",
        "distractorTrap": "จำสูตรสลับกับค่า Recall"
      },
      {
        "id": "B",
        "text": "0.70 (70.00%)",
        "isCorrect": false,
        "explanation": "ผิด: 0.70 คือค่า Accuracy ซึ่งคำนวณจาก (TP + TN) / Total = (4 + 3) / 10 = 7/10"
      },
      {
        "id": "C",
        "text": "0.73 (72.73%)",
        "isCorrect": false,
        "explanation": "ผิด: 0.73 คือค่า F1-Score ซึ่งคำนวณจากค่าเฉลี่ยฮาร์มอนิกระหว่าง Precision และ Recall"
      },
      {
        "id": "D",
        "text": "0.80 (80.00%)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p23, p30: Precision = TP / (TP + FP) = 4 / (4 + 1) = 4/5 = 0.80 (80.00%)"
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
    "scenario": "ผลการประเมินโมเดลทำนายลูกค้าเลิกใช้บริการ: Model A (Prec=0.89, Rec=0.60, F1=0.71) | Model B (Prec=0.67, Rec=0.90, F1=0.77) | Model C (Prec=0.82, Rec=0.80, F1=0.81) หากผู้บริหารกำหนดนโยบายว่า \"ยอมเสียค่าโทรติดต่อลูกค้าเกินดีกว่าปล่อยให้ลูกค้าที่จะเลิกใช้บริการหลุดรอดไปโดยไม่รู้ตัว\" ควรเลือกโมเดลใด?",
    "options": [
      {
        "id": "A",
        "text": "เลือก Model A เพราะให้ความแม่นยำในการชี้เป้าสูงสุด ลดการสูญเสียทรัพยากรในการโทรติดต่อผิดคน",
        "isCorrect": false,
        "explanation": "ผิด: Model A มี Recall เพียง 0.60 ทำให้ปล่อยลูกค้าที่จะเลิกใช้บริการหลุดรอดไปถึง 40% ซึ่งขัดกับนโยบายธุรกิจ"
      },
      {
        "id": "B",
        "text": "เลือกใช้ทั้ง Model A และ Model C สลับกันรายวัน เพื่อเฉลี่ยความเสี่ยงของการเกิดความผิดพลาดทั้งสองด้าน",
        "isCorrect": false,
        "explanation": "ผิด: การสลับโมเดลรายวันไม่ได้ช่วยแก้ปัญหาความเสี่ยงของ Missed Churn ตามเกณฑ์ที่ธุรกิจต้องการ"
      },
      {
        "id": "C",
        "text": "เลือก Model C เพราะให้จุดสมดุลระหว่างความแม่นยำและความครอบคลุม โดยมีค่า F1-Score สูงที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: Model C เหมาะกับกรณีที่ต้นทุนของ FP และ FN ใกล้เคียงกัน แต่โจทย์นี้ระบุชัดเจนว่าให้น้ำหนักกับการป้องกัน FN เป็นหลัก"
      },
      {
        "id": "D",
        "text": "เลือก Model B เพราะให้ความครอบคลุมในการดักจับลูกค้ากลุ่มเสี่ยงสูงสุด ลดโอกาสเกิด Missed Churn",
        "isCorrect": true,
        "explanation": "ถูกต้องตามเฉลย HW#2 (Lect 07 p35): เมื่อธุรกิจกลัวการหลุดรอดของลูกค้า (FN) มากที่สุด ต้องเลือกโมเดลที่ให้ค่า Recall สูงสุด (0.90)"
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
    "scenario": "ในโจทย์ทำนายการยกเลิกบริการ โดยกำหนดให้ Positive Class = 'Inactive' ความผิดพลาดแบบ False Positive (FP) หมายถึงเหตุการณ์ใด?",
    "options": [
      {
        "id": "A",
        "text": "ลูกค้ายังคงใช้งานปกติ แต่โมเดลทำนายว่ากำลังจะเลิกใช้บริการ ทำให้บริษัทเสียต้นทุนส่งโปรโมชันเกินจำเป็น",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p22: False Positive คือทายว่า Inactive (Positive) แต่ความจริงลูกค้ายัง Active (Negative)"
      },
      {
        "id": "B",
        "text": "ลูกค้าเลิกใช้บริการจริง แต่โมเดลทำนายว่ายังใช้งานปกติ ทำให้บริษัทเสียโอกาสในการรักษาลูกค้า",
        "isCorrect": false,
        "explanation": "ผิด: การที่ลูกค้าเป็น Positive จริง (Inactive) แต่โมเดลทายว่าเป็น Negative (Active) คือ False Negative (FN)"
      },
      {
        "id": "C",
        "text": "ลูกค้าเลิกใช้บริการจริง และโมเดลสามารถตรวจจับได้ถูกต้อง ทำให้ทีมการตลาดเข้าดูแลได้ทันเวลา",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือกรณีที่โมเดลทำนายคลาสเป้าหมายได้ถูกต้อง หรือ True Positive (TP)"
      },
      {
        "id": "D",
        "text": "ลูกค้ายังคงใช้งานปกติ และโมเดลทำนายว่ายังใช้งานปกติ ทำให้บริษัทไม่ต้องสิ้นเปลืองงบประมาณแคมเปญ",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือกรณีที่โมเดลทำนายคลาสปกติได้ถูกต้อง หรือ True Negative (TN)"
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
    "scenario": "ในการคัดเลือกนักฟุตบอลลงสนามโดยกำหนด Positive Class = 'play' ความผิดพลาดแบบ False Negative (FN) ส่งผลกระทบต่อทีมอย่างไรตามสไลด์ Lect 07 p23?",
    "options": [
      {
        "id": "A",
        "text": "นักกีฬาไม่พร้อมลงสนาม แต่โมเดลทำนายว่าพร้อมเล่น ส่งผลให้ทีมส่งผู้เล่นที่บาดเจ็บลงไปแข่งขัน",
        "isCorrect": false,
        "explanation": "ผิด: การทายว่าพร้อมเล่น (Positive) ทั้งที่จริงไม่พร้อม (Negative) คือความผิดพลาดแบบ False Positive (FP)"
      },
      {
        "id": "B",
        "text": "นักกีฬาพร้อมลงสนามจริง แต่โมเดลทำนายว่าไม่ควรลงเล่น ส่งผลให้ทีมเสียโอกาสใช้งานผู้เล่นฝีมือดี",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p23: False Negative คือความจริงพร้อมเล่น (Actual Positive) แต่โมเดลทายว่าไม่เล่น (Predicted Negative)"
      },
      {
        "id": "C",
        "text": "นักกีฬาพร้อมลงสนามและโมเดลทำนายว่าพร้อมเล่น ส่งผลให้ทีมได้ผู้เล่นตัวจริงที่สมบูรณ์ลงแข่งขัน",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือผลการทำนายที่ถูกต้องแบบ True Positive (TP)"
      },
      {
        "id": "D",
        "text": "นักกีฬาไม่พร้อมลงสนามและโมเดลทำนายว่าไม่ควรลงเล่น ส่งผลให้ทีมสามารถพักผู้เล่นได้อย่างเหมาะสม",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือผลการทำนายที่ถูกต้องแบบ True Negative (TN)"
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
    "scenario": "ในชุดข้อมูลที่มีลูกค้า Active 95% และ Inactive (Positive Class) เพียง 5% หากสร้างโมเดลที่ทำนายว่าลูกค้าทุกคนเป็น 'Active' ทั้งหมด จะเกิดผลลัพธ์ตามข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ได้ค่า Accuracy เท่ากับ 50% และค่า F1-Score เท่ากับ 50% เนื่องจากโมเดลเลือกทายเพียงคลาสเดียว",
        "isCorrect": false,
        "explanation": "ผิด: Accuracy คำนวณจากสัดส่วนที่ทายถูกทั้งหมด ซึ่งในที่นี้คลาส Active มีอยู่ถึง 95%"
      },
      {
        "id": "B",
        "text": "ได้ค่า Accuracy เพียง 5% แต่ได้ค่า Recall ของคลาส Inactive สูงถึง 95% จึงเหมาะกับงานค้นหาความเสี่ยง",
        "isCorrect": false,
        "explanation": "ผิด: เมื่อทายว่าทุกคนเป็น Active จะทายถูก 95 รายจาก 100 ราย จึงได้ Accuracy 95% ไม่ใช่ 5%"
      },
      {
        "id": "C",
        "text": "ได้ค่า Accuracy สูงถึง 95% แต่ได้ค่า Recall ของคลาส Inactive เท่ากับ 0% จึงใช้งานจริงไม่ได้",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p25: ในข้อมูลที่ไม่สมดุล โมเดลที่ทายแต่คลาสใหญ่จะได้ Accuracy สูงลวงตา แต่จับคลาสเป้าหมายไม่ได้เลย"
      },
      {
        "id": "D",
        "text": "ได้ค่า Precision เท่ากับ 95% และค่า Recall เท่ากับ 95% เนื่องจากทายคลาสส่วนใหญ่ได้ถูกต้องทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: เมื่อกำหนด Positive Class คือ Inactive การไม่ทาย Inactive เลยจะทำให้ TP = 0 และ Recall = 0%"
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
    "scenario": "หากธุรกิจมีงบประมาณจำกัดมาก โดยการส่งมอบสิทธิพิเศษให้ลูกค้าผิดคน (False Positive) จะทำให้บริษัทขาดทุนอย่างหนัก ทีมงานควรเลือกโมเดลโดยยึดตัวชี้วัดใดเป็นหลัก?",
    "options": [
      {
        "id": "A",
        "text": "เลือกโมเดลที่ให้ค่า Recall สูงที่สุด เพื่อกวาดต้อนลูกค้าที่มีโอกาสเลิกใช้บริการมาทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: การเน้น Recall สูงสุดมักแลกมาด้วยการทายเผื่อจนเกิด False Positive จำนวนมาก ซึ่งทำให้สิ้นเปลืองงบประมาณ"
      },
      {
        "id": "B",
        "text": "เลือกโมเดลที่ให้ค่า Overall Accuracy สูงที่สุด โดยไม่ต้องพิจารณาตาราง Confusion Matrix",
        "isCorrect": false,
        "explanation": "ผิด: Accuracy รวมไม่ได้แยกแยะต้นทุนความเสียหายที่แตกต่างกันระหว่าง FP และ FN"
      },
      {
        "id": "C",
        "text": "เลือกโมเดลที่ให้ค่า Gini Impurity ในโหนดเริ่มต้นสูงที่สุด เพื่อให้ครอบคลุมความหลากหลายของลูกค้าในกระบวนการเตรียมชุดข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: Gini Impurity เป็นเกณฑ์แตกกิ่งภายในต้นไม้ ไม่ใช่ตัวชี้วัดสำหรับประเมินความคุ้มค่าทางธุรกิจของผลการทำนาย"
      },
      {
        "id": "D",
        "text": "เลือกโมเดลที่ให้ค่า Precision สูงที่สุด เพื่อให้มั่นใจว่าผู้ที่โมเดลคัดเลือกมาเป็นกลุ่มเป้าหมายจริง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p27: เมื่อต้นทุนของ FP สูงมากหรือทรัพยากรในการติดต่อมีจำกัด ต้องเน้น Precision เป็นหลัก"
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
    "scenario": "ในระบบคัดกรองความเสี่ยงทางการแพทย์หรือการตรวจจับลูกค้าสำคัญที่จะย้ายค่าย ซึ่งการตรวจไม่พบผู้ที่มีความเสี่ยงจริง (False Negative) จะก่อให้เกิดความเสียหายร้ายแรง ควรยึดตัวชี้วัดใดเป็นหลัก?",
    "options": [
      {
        "id": "A",
        "text": "ยึดโมเดลที่ให้ค่า Recall สูงที่สุด เพื่อดักจับผู้ที่มีความเสี่ยงจริงให้ตกหล่นน้อยที่สุด",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p28: เมื่อความเสียหายจาก False Negative (Missed Cases) สูงมาก ต้องเลือกโมเดลที่ Maximize Recall"
      },
      {
        "id": "B",
        "text": "ยึดโมเดลที่ให้ค่า Precision สูงที่สุด แม้ว่าจะตรวจพบผู้มีความเสี่ยงเพียงส่วนน้อยก็ตาม",
        "isCorrect": false,
        "explanation": "ผิด: การเน้นแต่ Precision จะทำให้โมเดลทายอย่างระมัดระวังเกินไปจนปล่อยให้เคสสำคัญหลุดรอด (FN สูง)"
      },
      {
        "id": "C",
        "text": "ยึดโมเดลที่ให้ค่า True Negative สูงที่สุด เพื่อยืนยันจำนวนผู้ที่ไม่มีความเสี่ยงได้อย่างแม่นยำ",
        "isCorrect": false,
        "explanation": "ผิด: การเน้นเพิ่ม True Negative จะผลักให้โมเดลทายว่าเป็นคลาสปกติมากขึ้น ซึ่งยิ่งเพิ่มความเสี่ยงในการเกิด FN"
      },
      {
        "id": "D",
        "text": "ยึดโมเดลที่ใช้จำนวนตัวแปรต้นน้อยที่สุด เพื่อลดเวลาในการประมวลผลคำทำนายต่อหนึ่งรายการ",
        "isCorrect": false,
        "explanation": "ผิด: จำนวนตัวแปรต้นไม่ใช่ตัวชี้วัดที่รับประกันว่าจะลดอัตราการเกิด False Negative ได้"
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
    "scenario": "เหตุใดการคำนวณ F1-Score จึงเลือกใช้ค่าเฉลี่ยฮาร์มอนิก (Harmonic Mean) แทนการใช้ค่าเฉลี่ยเลขคณิต (Arithmetic Mean) ระหว่าง Precision และ Recall?",
    "options": [
      {
        "id": "A",
        "text": "เพราะค่าเฉลี่ยฮาร์มอนิกช่วยปรับค่าคะแนนให้สูงขึ้นเมื่อชุดข้อมูลมีจำนวนคลาสมากกว่าสองคลาสขึ้นไปในขั้นตอนการวิเคราะห์ข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ค่าเฉลี่ยฮาร์มอนิกจะมีค่าน้อยกว่าหรือเท่ากับค่าเฉลี่ยเลขคณิตเสมอ ไม่ได้ช่วยดึงคะแนนให้สูงขึ้น"
      },
      {
        "id": "B",
        "text": "เพราะค่าเฉลี่ยฮาร์มอนิกจะกดคะแนนลงอย่างหนักหากค่าใดค่าหนึ่งต่ำมาก จึงป้องกันโมเดลที่เก่งเพียงด้านเดียว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 07 p29: หาก Precision = 1.0 แต่ Recall = 0.0 ค่าเฉลี่ยเลขคณิตจะได้ 0.50 แต่ F1 (Harmonic Mean) จะได้ 0.00 ทันที"
      },
      {
        "id": "C",
        "text": "เพราะค่าเฉลี่ยฮาร์มอนิกจะทำหน้าที่ปรับลดความแปรปรวนของชุดข้อมูลทดสอบให้เท่ากับชุดข้อมูลฝึกสอน",
        "isCorrect": false,
        "explanation": "ผิด: F1-Score เป็นเพียงตัวชี้วัดสรุปผลจากตาราง Confusion Matrix ไม่ได้ไปแก้ไขความแปรปรวนของข้อมูล"
      },
      {
        "id": "D",
        "text": "เพราะค่าเฉลี่ยเลขคณิตไม่สามารถคำนวณได้เมื่อค่า Precision และ Recall มีหน่วยวัดที่แตกต่างกัน",
        "isCorrect": false,
        "explanation": "ผิด: ทั้ง Precision และ Recall ต่างก็เป็นสัดส่วนที่ไม่มีหน่วยและอยู่ในช่วง [0, 1] เหมือนกัน"
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
    "scenario": "จากการจัดกลุ่ม K-Means รอบที่ 1 ในสไลด์อาจารย์ พบว่า Cluster 2 มีสมาชิก 5 จุด ได้แก่ A3(8,4), A4(5,8), A5(7,5), A6(6,4) และ A8(4,9) พิกัดจุดศูนย์กลางใหม่ (C2_new) มีค่าเท่าใด?",
    "options": [
      {
        "id": "A",
        "text": "(5.0, 8.0)",
        "isCorrect": false,
        "explanation": "ผิด: (5, 8) คือพิกัดจุดศูนย์กลางตั้งต้น (Initial Centroid) ก่อนการคำนวณค่าเฉลี่ยของสมาชิกในกลุ่ม"
      },
      {
        "id": "B",
        "text": "(6.0, 5.0)",
        "isCorrect": false,
        "explanation": "ผิด: แกนที่สองคำนวณจาก (4 + 8 + 5 + 4 + 9) / 5 = 30 / 5 = 6.0 ไม่ใช่ 5.0 (5.0 คือค่ามัธยฐานของแกนที่สอง)"
      },
      {
        "id": "C",
        "text": "(6.0, 6.0)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p28-31: C2_new = ((8+5+7+6+4)/5, (4+8+5+4+9)/5) = (30/5, 30/5) = (6.0, 6.0)"
      },
      {
        "id": "D",
        "text": "(7.0, 5.0)",
        "isCorrect": false,
        "explanation": "ผิด: (7, 5) คือพิกัดของจุดข้อมูล A5 เพียงจุดเดียว ไม่ใช่ค่าเฉลี่ยของสมาชิกทั้ง 5 จุดในกลุ่ม"
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
    "scenario": "ในการคำนวณค่าความแปรปรวนภายในคลัสเตอร์ (Inertia หรือ Within-Cluster Sum of Squares: WCSS) ของอัลกอริทึม K-Means มาตรฐาน ต้องใช้ฟังก์ชันระยะทางในข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "Manhattan Distance (ผลรวมค่าสัมบูรณ์ของผลต่างพิกัด)",
        "isCorrect": false,
        "explanation": "ติดกับดัก! ในห้องเรียนใช้ Manhattan เพื่อความสะดวกในการคิดเลขมือ แต่สูตร Inertia มาตรฐานใช้ Squared Euclidean",
        "distractorTrap": "จำสลับกับตัวอย่างการทดลองคิดเลขมือในชั้นเรียน"
      },
      {
        "id": "B",
        "text": "Cosine Distance (ระยะห่างเชิงมุมระหว่างเวกเตอร์ของจุดข้อมูลสองจุด)",
        "isCorrect": false,
        "explanation": "ผิด: Cosine Distance ใช้ใน Spherical K-Means สำหรับข้อมูลข้อความ ไม่ใช่สูตร WCSS มาตรฐาน"
      },
      {
        "id": "C",
        "text": "Chebyshev Distance (ค่าผลต่างสูงสุดในมิติใดมิติหนึ่งระหว่างสองจุด)",
        "isCorrect": false,
        "explanation": "ผิด: Chebyshev Distance ไม่ได้ใช้เป็นสมการเป้าหมายมาตรฐานของค่า Inertia ใน K-Means"
      },
      {
        "id": "D",
        "text": "Squared Euclidean Distance (ผลรวมกำลังสองของระยะห่างแบบยูคลิด)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p35: นิยามของ Inertia (WCSS) คือผลรวมของระยะห่างยกกำลังสอง ||x - C_k||² จากจุดข้อมูลไปยังจุดศูนย์กลางกลุ่ม"
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
    "scenario": "หากคำนวณค่า Silhouette Coefficient ของจุดข้อมูลจุดหนึ่งได้เท่ากับ s(i) = -0.42 ข้อใดแปลความหมายเชิงเรขาคณิตของจุดข้อมูลนี้ได้ถูกต้อง?",
    "options": [
      {
        "id": "A",
        "text": "จุดข้อมูลนี้อยู่ใกล้กับสมาชิกในคลัสเตอร์อื่นมากกว่าสมาชิกในคลัสเตอร์ของตนเอง จึงอาจถูกจัดกลุ่มผิด",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p37: ค่า s(i) ติดลบเกิดเมื่อ a(i) > b(i) หมายความว่าระยะห่างเฉลี่ยในกลุ่มตัวเองมากกว่ากลุ่มข้างเคียง"
      },
      {
        "id": "B",
        "text": "จุดข้อมูลนี้อยู่ใกล้จุดศูนย์กลางของคลัสเตอร์ตนเองมากที่สุด และแยกขาดจากคลัสเตอร์อื่นอย่างชัดเจน",
        "isCorrect": false,
        "explanation": "ผิด: หากเกาะกลุ่มตนเองแน่นและห่างจากกลุ่มอื่นชัดเจน ค่า s(i) จะต้องมีค่าเป็นบวกเข้าใกล้ +1.0"
      },
      {
        "id": "C",
        "text": "จุดข้อมูลนี้วางตัวอยู่บนเส้นแบ่งเขตแดนระหว่างสองคลัสเตอร์พอดี โดยมีระยะห่างถึงทั้งสองกลุ่มเท่ากัน",
        "isCorrect": false,
        "explanation": "ผิด: หากอยู่กึ่งกลางระหว่างสองกลุ่มพอดี (a(i) ≈ b(i)) ค่า Silhouette Coefficient จะมีค่าเข้าใกล้ 0.0"
      },
      {
        "id": "D",
        "text": "จุดข้อมูลนี้มีค่าพิกัดติดลบในระบบแกนมุมฉาก จึงส่งผลให้ผลการคำนวณระยะห่างมีเครื่องหมายติดลบ",
        "isCorrect": false,
        "explanation": "ผิด: ระยะห่างทางเรขาคณิต a(i) และ b(i) มีค่าเป็นบวกหรือศูนย์เสมอ เครื่องหมายลบเกิดจาก b(i) - a(i) < 0"
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
    "scenario": "ตามหลักการของ Unsupervised Clustering ในสไลด์ Lect 08 p6 คุณลักษณะของการจัดกลุ่มที่ดี (Good Clustering) คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "มีความคล้ายคลึงภายในกลุ่มต่ำที่สุด และมีความคล้ายคลึงระหว่างกลุ่มสูงที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: สลับเป้าหมายกันอย่างสิ้นเชิง เพราะจะทำให้สมาชิกในกลุ่มเดียวกันต่างกันแต่ข้ามกลุ่มกลับเหมือนกัน"
      },
      {
        "id": "B",
        "text": "มีความคล้ายคลึงภายในกลุ่มสูงที่สุด และมีความคล้ายคลึงระหว่างกลุ่มต่ำที่สุด",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p6: Good Clustering ต้อง Maximize Intra-cluster similarity และ Minimize Inter-cluster similarity"
      },
      {
        "id": "C",
        "text": "มีความคล้ายคลึงภายในกลุ่มสูงที่สุด และมีความคล้ายคลึงระหว่างกลุ่มสูงที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: หากความคล้ายคลึงระหว่างกลุ่มสูง กลุ่มต่างๆ จะทับซ้อนกันและแยกแยะออกจากกันไม่ได้"
      },
      {
        "id": "D",
        "text": "มีความคล้ายคลึงภายในกลุ่มต่ำที่สุด และมีความคล้ายคลึงระหว่างกลุ่มต่ำที่สุด",
        "isCorrect": false,
        "explanation": "ผิด: สมาชิกที่อยู่ภายในคลัสเตอร์เดียวกันต้องมีความคล้ายคลึงกันสูง (High Intra-cluster similarity)"
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
    "scenario": "กำหนดจุดข้อมูล 2 จุดจากสไลด์ Lect 08 p15 ได้แก่ X = (2, 10, 5, 3) และ Y = (2, 5, 5, 4) ระยะทางแบบ Manhattan และ Euclidean ระหว่างสองจุดนี้มีค่าเท่าใด?",
    "options": [
      {
        "id": "A",
        "text": "Manhattan = 4, Euclidean = 4.00",
        "isCorrect": false,
        "explanation": "ผิด: ผลต่างในมิติที่สองคือ |10 - 5| = 5 และมิติที่สี่คือ |3 - 4| = 1 รวมกันต้องมากกว่า 4"
      },
      {
        "id": "B",
        "text": "Manhattan = 6, Euclidean ≈ 5.10",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p15: Manhattan = |2-2| + |10-5| + |5-5| + |3-4| = 0 + 5 + 0 + 1 = 6 และ Euclidean = sqrt(0² + 5² + 0² + (-1)²) = sqrt(26) ≈ 5.10"
      },
      {
        "id": "C",
        "text": "Manhattan = 6, Euclidean = 6.00",
        "isCorrect": false,
        "explanation": "ผิด: ระยะทาง Euclidean คำนวณจากรากที่สองของผลรวมกำลังสอง sqrt(25 + 1) = sqrt(26) ≈ 5.10 ไม่ใช่ 6.00"
      },
      {
        "id": "D",
        "text": "Manhattan = 26, Euclidean ≈ 5.10",
        "isCorrect": false,
        "explanation": "ผิด: 26 คือค่า Squared Euclidean Distance (5² + 1²) ส่วนระยะทาง Manhattan คือผลรวมค่าสัมบูรณ์เท่ากับ 6"
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
    "scenario": "เหตุใดในขั้นตอนการเตรียมข้อมูลสำหรับอัลกอริทึม K-Means จึงต้องทำ Feature Scaling ให้ตัวแปรทุกตัวอยู่ในสเกลที่เทียบเคียงกันก่อนเสมอ?",
    "options": [
      {
        "id": "A",
        "text": "เพื่อแปลงตัวแปรที่เป็นข้อความหมวดหมู่ให้กลายเป็นรหัสตัวเลขที่สามารถคำนวณค่าเฉลี่ยได้",
        "isCorrect": false,
        "explanation": "ผิด: การแปลงข้อมูลหมวดหมู่เป็นตัวเลขคือการทำ Encoding ไม่ใช่การทำ Feature Scaling"
      },
      {
        "id": "B",
        "text": "เพื่อบังคับให้คลัสเตอร์ที่ได้ทุกกลุ่มมีจำนวนสมาชิกเท่ากันอย่างสมบูรณ์หลังจบการประมวลผล",
        "isCorrect": false,
        "explanation": "ผิด: การทำ Feature Scaling เป็นการปรับช่วงค่าของตัวแปร ไม่ได้บังคับให้แต่ละกลุ่มมีจำนวนสมาชิกเท่ากัน"
      },
      {
        "id": "C",
        "text": "เพื่อรับประกันว่าอัลกอริทึมจะค้นพบจุดศูนย์กลางที่เป็น Global Optimum โดยไม่ขึ้นกับจุดเริ่มต้น",
        "isCorrect": false,
        "explanation": "ผิด: แม้จะทำ Scaling แล้ว K-Means ก็ยังมีความไวต่อการสุ่มจุดศูนย์กลางเริ่มต้นและอาจติดที่ Local Optimum ได้"
      },
      {
        "id": "D",
        "text": "เพื่อป้องกันไม่ให้ตัวแปรที่มีหน่วยวัดขนาดใหญ่ครอบงำการคำนวณระยะทางจนตัวแปรอื่นไม่มีผล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p18: K-Means อาศัยการวัดระยะห่าง หากไม่ปรับสเกล ตัวแปรที่มีค่าหลักหมื่นจะกลบผลของตัวแปรหลักหน่วยทั้งหมด"
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
    "scenario": "ในขั้นตอนการมอบหมายกลุ่ม (Assignment Step) ของ K-Means หากจุดข้อมูลจุดหนึ่งมีระยะห่างไปยังจุดศูนย์กลางของสองคลัสเตอร์เท่ากันพอดี ข้อตกลงในสไลด์ Lect 08 p22 กำหนดให้ทำอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "มอบหมายจุดข้อมูลนั้นให้เข้าสู่คลัสเตอร์ที่มีหมายเลขลำดับน้อยกว่า (Lowest Cluster Index)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p22: กฎ Tie-breaking กำหนดให้เลือกคลัสเตอร์ที่มีหมายเลขลำดับต่ำสุดเพื่อให้ผลลัพธ์คงที่"
      },
      {
        "id": "B",
        "text": "มอบหมายจุดข้อมูลนั้นให้เข้าสู่คลัสเตอร์ที่มีจำนวนสมาชิกสะสมอยู่น้อยกว่าในรอบนั้น",
        "isCorrect": false,
        "explanation": "ผิด: อัลกอริทึม K-Means มาตรฐานไม่ได้ตรวจสอบขนาดกลุ่มเพื่อถ่วงดุลจำนวนสมาชิกในขั้นตอน Assign"
      },
      {
        "id": "C",
        "text": "คัดแยกจุดข้อมูลนั้นออกเป็นจุดกำกวม และไม่นำมารวมในการคำนวณจุดศูนย์กลางรอบถัดไป",
        "isCorrect": false,
        "explanation": "ผิด: K-Means เป็นการแบ่งแบบ Hard Partitioning ทุกจุดข้อมูลต้องถูกจัดเข้ากลุ่มใดกลุ่มหนึ่งเสมอ"
      },
      {
        "id": "D",
        "text": "นำพิกัดของจุดข้อมูลนั้นไปคำนวณค่าเฉลี่ยร่วมกับทั้งสองคลัสเตอร์ด้วยน้ำหนักที่เท่ากัน",
        "isCorrect": false,
        "explanation": "ผิด: การถ่วงน้ำหนักเข้าหลายกลุ่มพร้อมกันเป็นหลักการของ Fuzzy C-Means ไม่ใช่ K-Means มาตรฐาน"
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
    "scenario": "ข้อใดอธิบายคุณสมบัติด้านความซับซ้อนเชิงเวลา (Time Complexity) ของอัลกอริทึม K-Means ได้ถูกต้องตามสไลด์ Lect 08 p24?",
    "options": [
      {
        "id": "A",
        "text": "มีความซับซ้อนระดับ O(n³) จึงประมวลผลได้ช้ามากและไม่เหมาะกับชุดข้อมูลขนาดใหญ่",
        "isCorrect": false,
        "explanation": "ติดกับดัก! สไลด์ย้ำว่า K-Means มีความเร็วในการประมวลผลสูงซึ่งเป็นจุดแข็งสำคัญ ไม่ใช่จุดอ่อน",
        "distractorTrap": "เข้าใจผิดว่าความเร็วในการรันเป็นข้อเสียของ K-Means"
      },
      {
        "id": "B",
        "text": "มีความซับซ้อนระดับ O(t·k·n) ซึ่งแปรผันตรงแบบเชิงเส้นกับจำนวนข้อมูล จึงทำงานได้รวดเร็ว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p24: K-Means มีความซับซ้อน O(tkn) โดยเมื่อ t และ k มีค่าน้อย อัลกอริทึมจะขยายขนาดตามจำนวนข้อมูล n ได้ดีมาก"
      },
      {
        "id": "C",
        "text": "มีความซับซ้อนระดับ O(2ⁿ) เนื่องจากต้องทดสอบจับคู่จุดข้อมูลทุกรูปแบบที่เป็นไปได้ทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: K-Means ใช้การวนซ้ำแบบ Heuristic (Lloyd's algorithm) จึงไม่ต้องค้นหาทุกการจัดกลุ่มที่เป็นไปได้"
      },
      {
        "id": "D",
        "text": "มีความซับซ้อนคงที่ระดับ O(1) โดยเวลาที่ใช้ในการประมวลผลไม่ขึ้นกับจำนวนแถวของข้อมูลเลย",
        "isCorrect": false,
        "explanation": "ผิด: ในแต่ละรอบต้องคำนวณระยะทางของข้อมูลทุกจุด n จุด เวลาจึงแปรผันตรงกับ n"
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
    "scenario": "เมื่ออัลกอริทึม K-Means ทำงานจนเข้าสู่ภาวะลู่เข้า (Convergence) คือไม่มีจุดข้อมูลย้ายกลุ่มและจุดศูนย์กลางไม่เปลี่ยนตำแหน่ง ภาวะนี้ยืนยันสิ่งใด?",
    "options": [
      {
        "id": "A",
        "text": "ยืนยันว่าคลัสเตอร์ที่ได้มีความหมายเชิงธุรกิจที่ชัดเจนและพร้อมนำไปใช้งานได้ทันทีโดยไม่ต้องตรวจสอบซ้ำตามเกณฑ์การวัดผลทางสถิติ",
        "isCorrect": false,
        "explanation": "ผิด: สไลด์ Lect 08 p32 เน้นย้ำว่า Convergence != Usefulness การหยุดคำนวณไม่ได้แปลว่ากลุ่มนั้นมีประโยชน์ทางธุรกิจ"
      },
      {
        "id": "B",
        "text": "ยืนยันว่าผลการจัดกลุ่มที่ได้คือคำตอบที่ดีที่สุดในภาพรวมทั้งหมด (Global Optimum) ของชุดข้อมูลนั้น",
        "isCorrect": false,
        "explanation": "ผิด: K-Means รับประกันเพียงการลู่เข้าสู่จุดต่ำสุดเฉพาะที่ (Local Optimum) ซึ่งขึ้นอยู่กับการสุ่มจุดเริ่มต้น"
      },
      {
        "id": "C",
        "text": "ยืนยันเพียงว่าขั้นตอนการอัปเดตทางคณิตศาสตร์สิ้นสุดลงแล้ว แต่ยังต้องทำ Profiling เพื่อประเมินคุณค่าทางธุรกิจ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p32: Convergence บอกเพียงว่าอัลกอริทึมหยุดนิ่งแล้ว นักวิเคราะห์ต้องทำ Cluster Profiling เพื่อตีความต่อ"
      },
      {
        "id": "D",
        "text": "ยืนยันว่าภายในแต่ละคลัสเตอร์ไม่มีจุดข้อมูลที่เป็นค่าผิดปกติ (Outliers) ปะปนอยู่อีกต่อไป",
        "isCorrect": false,
        "explanation": "ผิด: ค่าผิดปกติยังคงถูกจัดอยู่ในกลุ่มใดกลุ่มหนึ่งและอาจดึงให้จุดศูนย์กลางบิดเบี้ยวไปตั้งแต่ต้น"
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
    "scenario": "ในการเลือกจำนวนคลัสเตอร์ K ด้วยวิธี Elbow Method เหตุใดเราจึงไม่เลือกค่า K ที่ทำให้ค่า Inertia (WCSS) มีค่าต่ำที่สุด?",
    "options": [
      {
        "id": "A",
        "text": "เพราะค่า Inertia จะเพิ่มขึ้นแบบทวีคูณเมื่อกำหนดค่า K สูงเกินกว่าจำนวนตัวแปรต้นที่มีอยู่ในตารางข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ตามหลักคณิตศาสตร์ เมื่อเพิ่มจำนวนกลุ่ม K ค่า Inertia จะมีแนวโน้มลดลงหรือเท่าเดิมเสมอ ไม่เพิ่มขึ้น"
      },
      {
        "id": "B",
        "text": "เพราะค่า Inertia ที่ต่ำเกินไปแสดงว่าสมาชิกภายในคลัสเตอร์เดียวกันอยู่กระจัดกระจายห่างจากจุดศูนย์กลางมาก",
        "isCorrect": false,
        "explanation": "ผิด: ค่า Inertia ต่ำหมายถึงระยะห่างภายในกลุ่มน้อย แต่ถ้าต่ำเพราะตั้ง K สูงเกินไปจะทำให้ได้กลุ่มย่อยที่ไร้ความหมาย"
      },
      {
        "id": "C",
        "text": "เพราะเมื่อค่า Inertia ลดลงต่ำกว่าครึ่งหนึ่งของค่าเริ่มต้น อัลกอริทึมจะไม่สามารถคำนวณค่า Silhouette ได้",
        "isCorrect": false,
        "explanation": "ผิด: การคำนวณ Silhouette Score สามารถทำได้ตั้งแต่ K = 2 ถึง n - 1 โดยไม่ติดข้อจำกัดเรื่องครึ่งหนึ่งของ Inertia"
      },
      {
        "id": "D",
        "text": "เพราะค่า Inertia จะลดลงเสมอเมื่อเพิ่มค่า K จึงต้องเลือกจุดหักศอกที่การลดลงเริ่มชะลอตัวเพื่อความสมดุล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p35: ยิ่งเพิ่ม K ค่า Inertia ยิ่งลดลงเรื่อยๆ จนเป็น 0 เมื่อ K = n จึงต้องเลือกจุดหักศอกที่จำนวนกลุ่มยังอธิบายได้"
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
    "scenario": "หลังจากอัลกอริทึม K-Means แบ่งลูกค้าออกเป็น Cluster 0, Cluster 1 และ Cluster 2 เสร็จสิ้น ขั้นตอนการทำงานที่ถูกต้องต่อไปตามสไลด์ Lect 08 p38 คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ทำ Cluster Profiling เปรียบเทียบสถิติของแต่ละตัวแปรในทุกกลุ่มก่อน แล้วจึงสรุปเป็น Persona และแผนงาน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 08 p38: ต้องยึดหลัก Profile First, Interpret Second โดยดูตารางสถิติของแต่ละกลุ่มก่อนตั้งชื่อ Persona"
      },
      {
        "id": "B",
        "text": "ตัดคลัสเตอร์ที่มีจำนวนสมาชิกน้อยที่สุดออกจากการวิเคราะห์ เพื่อลดความซับซ้อนของแผนการตลาด",
        "isCorrect": false,
        "explanation": "ผิด: คลัสเตอร์ขนาดเล็กอาจเป็นกลุ่มลูกค้ามูลค่าสูง (VIP) หรือกลุ่มเฉพาะที่สำคัญมากทางธุรกิจ"
      },
      {
        "id": "C",
        "text": "กำหนดชื่อ Persona ทางธุรกิจให้กับแต่ละคลัสเตอร์ทันทีตามลำดับตัวเลขเพื่อนำไปทำแคมเปญการตลาด",
        "isCorrect": false,
        "explanation": "ผิด: หมายเลข Cluster ID เป็นเพียงป้ายกำกับลำดับที่ไร้ความหมายในตัวเอง ห้ามตั้งชื่อโดยยังไม่ดูข้อมูลสถิติ"
      },
      {
        "id": "D",
        "text": "นำหมายเลขคลัสเตอร์ที่ได้ไปแทนที่ตัวแปรเป้าหมายเดิม เพื่อคำนวณค่า Accuracy ของการจัดกลุ่ม",
        "isCorrect": false,
        "explanation": "ผิด: Unsupervised Clustering ไม่มีตัวแปรเป้าหมายเดิมให้ตรวจวัดค่า Accuracy เหมือนงาน Classification"
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
    "scenario": "สถาบันการเงินแห่งหนึ่งลบคอลัมน์ 'เชื้อชาติ' และ 'เพศ' ออกจากชุดข้อมูลฝึกสอนแล้ว แต่เหตุใดโมเดลอนุมัติสินเชื่อยังคงแสดงผลลัพธ์ที่เลือกปฏิบัติต่อกลุ่มชาติพันธุ์?",
    "options": [
      {
        "id": "A",
        "text": "เพราะอัลกอริทึมสามารถดึงข้อมูลคอลัมน์ที่ถูกลบไปแล้วกลับคืนมาจากประวัติการบันทึกของฐานข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: โมเดลเรียนรู้เฉพาะจากตารางตัวแปรที่ส่งเข้าไปฝึกสอน ไม่สามารถกู้คืนคอลัมน์ที่ถูกตัดออกไปแล้วได้เอง"
      },
      {
        "id": "B",
        "text": "เพราะตัวแปรอื่นที่เหลืออยู่ เช่น รหัสไปรษณีย์ มีความสัมพันธ์เชื่อมโยงกับเชื้อชาติและทำหน้าที่เป็นตัวแปรตัวแทน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p13: ตัวแปรอย่างรหัสไปรษณีย์ (Postal Code) สามารถทำหน้าที่เป็น Proxy Feature ที่สะท้อนกลุ่มประชากรเปราะบางได้"
      },
      {
        "id": "C",
        "text": "เพราะการลบคอลัมน์ออกจากตารางข้อมูลทำให้ค่าความแปรปรวนรวมเพิ่มขึ้นจนโมเดลเกิดภาวะ Overfitting",
        "isCorrect": false,
        "explanation": "ผิด: ประเด็นการเลือกปฏิบัติเกิดจากความสัมพันธ์แฝงในตัวแปรตัวแทน ไม่ใช่เรื่องความซับซ้อนเกินไปของโมเดล"
      },
      {
        "id": "D",
        "text": "เพราะโมเดลไม่ได้ผ่านการปรับสเกลข้อมูลด้วยวิธี Min-Max Normalization ก่อนนำเข้าสู่ขั้นตอนการเรียนรู้สำหรับการประมวลผลในระบบจริง",
        "isCorrect": false,
        "explanation": "ผิด: การปรับสเกลข้อมูลไม่ได้ช่วยขจัดความสัมพันธ์เชิงโครงสร้างระหว่าง Proxy Feature กับกลุ่มชาติพันธุ์"
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
    "scenario": "ในกรณีศึกษาคดี Rite Aid (FTC 2023–2024) ที่ถูกสั่งห้ามใช้ระบบ AI จดจำใบหน้าเป็นเวลา 5 ปี ความเสียหายร้ายแรงต่อผู้บริโภคเกิดจากความผิดพลาดรูปแบบใดเป็นหลัก?",
    "options": [
      {
        "id": "A",
        "text": "เกิด False Negative อัตราสูง ทำให้ผู้กระทำผิดจริงหลุดรอดจากการตรวจจับของพนักงานรักษาความปลอดภัยในกระบวนการเตรียมชุดข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: ประเด็นที่ FTC ลงโทษคือการกล่าวหาและสร้างความเดือดร้อนให้ประชาชนผู้บริสุทธิ์"
      },
      {
        "id": "B",
        "text": "เกิด Concept Drift จากการที่พฤติกรรมการเลือกซื้อสินค้าของลูกค้าเปลี่ยนแปลงไปตามฤดูกาล",
        "isCorrect": false,
        "explanation": "ผิด: คดีนี้เป็นเรื่องระบบจดจำใบหน้าที่มีความแม่นยำต่ำและนำไปใช้กล่าวหาคนผิดโดยไร้การตรวจสอบ"
      },
      {
        "id": "C",
        "text": "เกิด False Positive อัตราสูง ทำให้ระบบชี้ตัวลูกค้าผู้บริสุทธิ์ผิดว่าเป็นผู้ต้องสงสัยขโมยสินค้าโดยไร้คนตรวจสอบ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p22: ภาพกล้องคุณภาพต่ำทำให้เกิด False Positive จำนวนมาก นำไปสู่การค้นตัวและกล่าวหาผู้บริสุทธิ์โดยไม่มี Human Checkpoint"
      },
      {
        "id": "D",
        "text": "เกิด Data Leakage จากการนำภาพใบหน้าของลูกค้าในอนาคตมาใช้ฝึกสอนโมเดลร่วมกับภาพในอดีต",
        "isCorrect": false,
        "explanation": "ผิด: ปัญหาของคดี Rite Aid ไม่ได้เกิดจาก Data Leakage ในการแบ่งชุดข้อมูล"
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
    "scenario": "ตามสไลด์ Lect 09 p11 และ p20 เดิมโมเดลฝึกสอนภายใต้บริบทที่ลูกค้าไม่ซื้อสินค้า 45 วันถือว่า Inactive แต่ต่อมาพฤติกรรมตลาดเปลี่ยนไปเป็นรอบการซื้อทุก 70 วัน ปรากฏการณ์นี้เรียกว่าอะไรและส่งผลอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "เกิดภาวะ Data Leakage ส่งผลให้ค่าความแม่นยำบนชุดข้อมูลใช้งานจริงสูงขึ้นอย่างผิดปกติตามเกณฑ์การวัดผลทางสถิติ",
        "isCorrect": false,
        "explanation": "ผิด: การที่บริบทโลกจริงเปลี่ยนไปหลังนำโมเดลขึ้นใช้งานทำให้ประสิทธิภาพลดลง ไม่ใช่ Data Leakage"
      },
      {
        "id": "B",
        "text": "เกิดภาวะ Multicollinearity ส่งผลให้ตัวแปรต้นในโมเดลมีความซ้ำซ้อนกันจนคำนวณค่าไม่ได้",
        "isCorrect": false,
        "explanation": "ผิด: การเปลี่ยนพฤติกรรมตามกาลเวลาไม่ใช่ความสัมพันธ์ซ้ำซ้อนระหว่างตัวแปรต้น"
      },
      {
        "id": "C",
        "text": "เกิดภาวะ Dummy Variable Trap ส่งผลให้โมเดลทำนายลูกค้าทุกคนเป็นคลาสเดียวทั้งหมดทันที",
        "isCorrect": false,
        "explanation": "ผิด: Dummy Variable Trap เป็นปัญหาทางพีชคณิตจากการทำ One-Hot Encoding ไม่เกี่ยวกับการเปลี่ยนแปลงตามเวลา"
      },
      {
        "id": "D",
        "text": "เกิดภาวะ Concept Drift ส่งผลให้ความสัมพันธ์ระหว่างตัวแปรกับเป้าหมายเปลี่ยนไปจนค่า Recall ตกลง",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p11, p20: เมื่อความหมายและพฤติกรรมในโลกจริงเปลี่ยนไปตามเวลา (Concept/Data Drift) ทำให้ Recall ของโมเดลตกลงเหลือ 54%"
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
    "scenario": "ในกรอบแนวคิด Explainable AI (XAI) ข้อใดระบุความแตกต่างระหว่าง Global Explanation และ Local Explanation ได้ถูกต้อง?",
    "options": [
      {
        "id": "A",
        "text": "Global อธิบายน้ำหนักความสำคัญของตัวแปรในภาพรวมทั้งโมเดล ส่วน Local อธิบายเหตุผลของการทำนายรายบุคคล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p6-7: Global มองพฤติกรรมรวมของโมเดล (เช่น Overall Feature Importance) ส่วน Local เจาะจงอธิบายเคสเดียว"
      },
      {
        "id": "B",
        "text": "Global อธิบายเหตุผลของการทำนายลูกค้ารายบุคคล ส่วน Local อธิบายโครงสร้างความสำคัญของตัวแปรทั้งระบบ",
        "isCorrect": false,
        "explanation": "ผิด: สลับความหมายระหว่างระดับภาพรวม (Global) กับระดับรายกรณี (Local)"
      },
      {
        "id": "C",
        "text": "Global ใช้ได้เฉพาะกับโมเดลตระกูลต้นไม้ตัดสินใจ ส่วน Local ใช้ได้เฉพาะกับโมเดลโครงข่ายประสาทเทียม",
        "isCorrect": false,
        "explanation": "ผิด: ทั้งการอธิบายระดับ Global และ Local สามารถประยุกต์ใช้กับโมเดลได้หลากหลายตระกูล"
      },
      {
        "id": "D",
        "text": "Global เป็นการอธิบายผลลัพธ์บนชุดข้อมูล Test Set ส่วน Local เป็นการอธิบายผลลัพธ์เฉพาะบนชุด Training Set",
        "isCorrect": false,
        "explanation": "ผิด: การแบ่ง Global กับ Local แยกตามขอบเขตของคำอธิบาย (ทั้งโมเดล vs รายเคส) ไม่ได้แยกตามชุดข้อมูล"
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
    "scenario": "ข้อใดจำแนกเครื่องมืออธิบายผลโมเดล (XAI) ระหว่างแบบ Model-Specific และแบบ Model-Agnostic ได้ถูกต้องตามสไลด์ Lect 09 p8?",
    "options": [
      {
        "id": "A",
        "text": "SHAP และ LIME เป็นแบบ Model-Specific ส่วนค่าสัมประสิทธิ์ของสมการเส้นตรงเป็นแบบ Model-Agnostic",
        "isCorrect": false,
        "explanation": "ผิด: สลับหมวดหมู่กัน เพราะ SHAP และ LIME ถูกออกแบบมาให้ใช้ได้กับทุกโมเดล (Model-Agnostic)"
      },
      {
        "id": "B",
        "text": "โครงสร้างกิ่งของ Decision Tree เป็นแบบ Model-Specific ส่วน SHAP และ LIME เป็นแบบ Model-Agnostic",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p8: การดูโครงสร้างภายในต้นไม้ใช้ได้เฉพาะโมเดลต้นไม้ (Model-Specific) ส่วน SHAP/LIME ใช้ได้กับทุกโมเดล"
      },
      {
        "id": "C",
        "text": "ทั้งโครงสร้างกิ่งของ Decision Tree และค่า SHAP จัดเป็นเครื่องมือแบบ Model-Specific เหมือนกันทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: SHAP เป็นวิธีแบบ Model-Agnostic ที่สามารถใช้อธิบายโมเดลประเภทใดก็ได้"
      },
      {
        "id": "D",
        "text": "ทั้งค่าสัมประสิทธิ์ของ Logistic Regression และ LIME จัดเป็นเครื่องมือแบบ Model-Agnostic เหมือนกันทั้งหมด",
        "isCorrect": false,
        "explanation": "ผิด: การอ่านค่าสัมประสิทธิ์โดยตรงอาศัยโครงสร้างเฉพาะของตระกูลโมเดลเชิงเส้น จึงเป็น Model-Specific"
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
    "scenario": "โมเดลทำนายการเลิกใช้บริการมีค่าเฉลี่ยฐาน (Base Value) อยู่ที่ 32% เมื่อตรวจลูกค้ารายหนึ่งพบว่าตัวแปร 'จำนวนวันที่ไม่ได้ซื้อสินค้า' มีค่า SHAP = +29% ตัวเลขนี้มีความหมายว่าอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "ลูกค้ารายนี้มีความน่าจะเป็นสุทธิที่จะเลิกใช้บริการเท่ากับ 29% พอดีโดยไม่ต้องคำนึงถึงตัวแปรอื่น",
        "isCorrect": false,
        "explanation": "ผิด: +29% เป็นเพียงส่วนเพิ่มจากตัวแปรเดียว ต้องนำไปบวกเข้ากับ Base Value 32% และค่า SHAP ของตัวแปรอื่นๆ"
      },
      {
        "id": "B",
        "text": "ตัวแปรนี้ช่วยเพิ่มค่าความแม่นยำรวม (Overall Accuracy) ของโมเดลในการทำนายลูกค้ารายนี้ขึ้นอีก 29%",
        "isCorrect": false,
        "explanation": "ผิด: ค่า SHAP อธิบายทิศทางและขนาดของผลกระทบต่อค่าทำนาย ไม่ใช่ค่าความแม่นยำของโมเดล"
      },
      {
        "id": "C",
        "text": "ตัวแปรนี้ผลักดันให้โอกาสที่ลูกค้ารายนี้จะถูกทำนายว่าเลิกใช้บริการเพิ่มขึ้น 29 จุดเปอร์เซ็นต์จากค่าเฉลี่ยฐาน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p9-10: ตามหลัก Additive Explanation ค่า SHAP +29% คือแรงผลักที่เพิ่มความเสี่ยงขึ้นจาก Base Value 32%"
      },
      {
        "id": "D",
        "text": "ตัวแปรนี้มีน้ำหนักความสำคัญคิดเป็นสัดส่วน 29% จากตัวแปรต้นทั้งหมดที่ใช้ในการฝึกสอนโมเดลระดับภาพรวมสำหรับการประมวลผลในระบบจริง",
        "isCorrect": false,
        "explanation": "ผิด: นั่นคือการตีความแบบ Global Feature Importance ไม่ใช่ค่า Local SHAP ของลูกค้ารายบุคคล"
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
    "scenario": "ในกรณีศึกษาระบบคัดกรองผู้ป่วยของโรงพยาบาลในสหรัฐฯ (Obermeyer et al., 2019) ความลำเอียงที่ทำให้ผู้ป่วยผิวสีได้รับการส่งต่อเข้าโครงการดูแลพิเศษน้อยกว่าที่ควรเกิดจากสาเหตุใด?",
    "options": [
      {
        "id": "A",
        "text": "การกำหนดให้ใช้ตัวแปรเชื้อชาติเป็นตัวแปรต้นหลักในการหักคะแนนความเสี่ยงของผู้ป่วยผิวสีโดยตรง",
        "isCorrect": false,
        "explanation": "ผิด: ระบบไม่ได้ใส่ตัวแปรเชื้อชาติเข้าไปหักคะแนนโดยตรง แต่เกิดจากการเลือกตัวแปรเป้าหมายแทน (Target Proxy) ที่ผิดพลาด"
      },
      {
        "id": "B",
        "text": "การลืมทำ Feature Scaling ให้กับตัวแปรอายุและระดับความดันโลหิตก่อนนำข้อมูลเข้าฝึกสอนโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: สาเหตุหลักของคดีนี้คือเรื่อง Label/Target Proxy Bias ไม่ใช่เรื่องการปรับสเกลของตัวแปร"
      },
      {
        "id": "C",
        "text": "การเลือกใช้อัลกอริทึมที่มีความลึกมากเกินไปจนเกิดภาวะ Overfitting กับข้อมูลผู้ป่วยเฉพาะในเขตเมืองใหญ่ในกระบวนการเตรียมชุดข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: โมเดลทำนายค่าใช้จ่ายได้แม่นยำตามเป้าหมายที่ตั้งไว้ แต่ตัวเป้าหมายที่ตั้งไว้มีความลำเอียงเชิงโครงสร้าง"
      },
      {
        "id": "D",
        "text": "การใช้ 'ค่าใช้จ่ายรักษาพยาบาลในอดีต' เป็นตัวแทนของ 'ความรุนแรงของโรค' ทั้งที่ผู้ป่วยผิวสีเข้าถึงบริการได้น้อยกว่า",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p16: คนผิวสีที่ป่วยหนักเท่ากันมีประวัติค่าใช้จ่ายต่ำกว่าเนื่องจากอุปสรรคการเข้าถึงระบบ ทำให้โมเดลประเมินความเสี่ยงต่ำเกินจริง"
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
    "scenario": "บทเรียนสำคัญด้าน Responsible AI จากกรณีศึกษาคดีระบบนำส่งโฆษณาที่อยู่อาศัยของ Meta (กระทรวงยุติธรรมสหรัฐฯ ปี 2022) คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "การตรวจสอบความเป็นธรรมต้องวัดที่สัดส่วนผู้รับโฆษณาจริงปลายทาง ไม่ใช่ดูเพียงการตั้งค่าตัวแปรนำเข้า",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 09 p21: แม้ผู้ลงโฆษณาไม่ได้เลือกกรองเชื้อชาติ แต่ระบบจัดส่งโฆษณากลับเลือกกลุ่มผู้ชมปลายทางอย่างไม่เป็นธรรม (Eligible vs Actual Audience)"
      },
      {
        "id": "B",
        "text": "การตัดตัวแปรเพศและเชื้อชาติออกจากหน้าจอตั้งค่าของผู้ลงโฆษณาเพียงพอที่จะรับประกันความเป็นธรรมได้สมบูรณ์",
        "isCorrect": false,
        "explanation": "ผิด: คดีนี้พิสูจน์แล้วว่าการปิดกั้นแค่ตอนตั้งค่าต้นทางไม่เพียงพอ เพราะอัลกอริทึมจัดส่งยังสร้างความลำเอียงที่ปลายทางได้"
      },
      {
        "id": "C",
        "text": "ระบบแนะนำโฆษณาเชิงพาณิชย์ได้รับการยกเว้นไม่ต้องตรวจสอบความลำเอียงตามกฎหมายที่อยู่อาศัย",
        "isCorrect": false,
        "explanation": "ผิด: กระทรวงยุติธรรมสหรัฐฯ บังคับใช้กฎหมาย Fair Housing Act กับอัลกอริทึมโฆษณาอย่างเคร่งครัด"
      },
      {
        "id": "D",
        "text": "การเปลี่ยนไปใช้อัลกอริทึมแบบ Unsupervised Clustering จะช่วยขจัดปัญหาการเลือกปฏิบัติทางเชื้อชาติได้อัตโนมัติ",
        "isCorrect": false,
        "explanation": "ผิด: Unsupervised Clustering ก็สามารถจัดกลุ่มตาม Proxy Features ที่สะท้อนเชื้อชาติและเพศได้เช่นกัน"
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
    "scenario": "ตามแนวทาง CRISP-DS in Action (Lect 10) เอกสาร 'Decision Contract' และ 'Decision Memo' มีบทบาทและช่วงเวลาจัดทำแตกต่างกันอย่างไร?",
    "options": [
      {
        "id": "A",
        "text": "Contract จัดทำหลังจบการทดลองเพื่อสรุปความแม่นยำ ส่วน Memo จัดทำก่อนเริ่มงานเพื่อขออนุมัติงบประมาณ",
        "isCorrect": false,
        "explanation": "ผิด: สลับลำดับเวลากัน เพราะ Decision Contract ต้องตกลงกันตั้งแต่เริ่มต้นโครงการ"
      },
      {
        "id": "B",
        "text": "Contract ทำช่วงเริ่มต้นเพื่อตกลงกรอบการตัดสินใจ ส่วน Memo ทำช่วงประเมินผลเพื่อบันทึกคำตัดสินและเงื่อนไขใช้งาน",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p8, p14: Decision Contract ทำในขั้น Business Understanding ส่วน Decision Memo ทำในขั้น Evaluation ก่อนเริ่ม Pilot"
      },
      {
        "id": "C",
        "text": "Contract ใช้สำหรับบันทึกโค้ดการทำความสะอาดข้อมูล ส่วน Memo ใช้สำหรับบันทึกพารามิเตอร์ของโมเดล",
        "isCorrect": false,
        "explanation": "ผิด: เอกสารทั้งสองใช้สำหรับการตัดสินใจทางธุรกิจและธรรมาภิบาล ไม่ใช่เอกสารเก็บโค้ดเทคนิค"
      },
      {
        "id": "D",
        "text": "Contract จัดทำโดยวิศวกรระบบเพื่อตั้งค่าเซิร์ฟเวอร์ ส่วน Memo จัดทำโดยระบบอัตโนมัติเพื่อแจ้งเตือนเมื่อโมเดลพัง",
        "isCorrect": false,
        "explanation": "ผิด: เอกสารแจ้งเตือนและแผนรับมือเมื่อระบบมีปัญหาในขั้นใช้งานจริงคือ Monitoring Contract & Runbook"
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
    "scenario": "ในการแบ่งบทบาทหน้าที่ของทีมข้อมูลยุคใหม่ตามสไลด์ Lect 10 p3-5 ตำแหน่งใดมีหน้าที่รับผิดชอบการสร้าง 'Customer Table & Feature Contract' และควบคุมไม่ให้เกิดการรั่วไหลของข้อมูลตามเวลา?",
    "options": [
      {
        "id": "A",
        "text": "Data Engineer (วิศวกรโครงสร้างพื้นฐานและระบบท่อลำเลียงข้อมูลดิบ)",
        "isCorrect": false,
        "explanation": "ผิด: Data Engineer รับผิดชอบการดึงข้อมูลดิบ (Data Intake) และดูแลโครงสร้างพื้นฐานต้นน้ำ"
      },
      {
        "id": "B",
        "text": "Business Analyst (นักวิเคราะห์ธุรกิจและผู้กำหนดกรอบสัญญาการตัดสินใจ)",
        "isCorrect": false,
        "explanation": "ผิด: Business Analyst รับผิดชอบการเชื่อมโยงโจทย์ธุรกิจและจัดทำ Decision Contract"
      },
      {
        "id": "C",
        "text": "Analytics Engineer (วิศวกรวิเคราะห์ข้อมูลผู้จัดทำตารางวิเคราะห์และสัญญาฟีเจอร์)",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p3-5: Analytics Engineer ทำหน้าที่แปลงข้อมูลดิบเป็นตารางที่สะอาดและกำหนด Feature Contract ที่ปลอด Leakage"
      },
      {
        "id": "D",
        "text": "MLOps Engineer (วิศวกรดูแลระบบปฏิบัติการโมเดลและการติดตามผลหลังใช้งานจริง)ตามหลักการประเมินผลมาตรฐาน",
        "isCorrect": false,
        "explanation": "ผิด: MLOps Engineer รับผิดชอบการนำโมเดลขึ้นระบบและการตรวจสอบ Monitoring Trigger"
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
    "scenario": "ก่อนนำผลการทำนายของโมเดลไปเริ่มส่งแคมเปญหาลูกค้าจริงในระยะทดลอง (Pilot Runbook) ข้อกำหนดธรรมาภิบาลในสไลด์ Lect 10 กำหนดให้ใครเป็นผู้มีอำนาจลงนามอนุมัติ?",
    "options": [
      {
        "id": "A",
        "text": "นักวิทยาศาสตร์ข้อมูลผู้เขียนโมเดลสามารถอนุมัติและสั่งส่งข้อความหาลูกค้าได้เองโดยไม่ต้องผ่านฝ่ายอื่น",
        "isCorrect": false,
        "explanation": "ผิด: การส่งแคมเปญจริงต้องผ่านการเห็นชอบร่วมกับเจ้าของโจทย์ธุรกิจ (BU) และการตรวจสอบด้าน Privacy"
      },
      {
        "id": "B",
        "text": "ระบบผู้ช่วยปัญญาประดิษฐ์ (AI Assistant) สามารถอนุมัติได้อัตโนมัติหากค่า F1-Score สูงผ่านเกณฑ์ที่ตั้งไว้",
        "isCorrect": false,
        "explanation": "ผิด: สไลด์ Lect 10 ย้ำชัดเจนว่า AI Assistant ช่วยร่างเอกสารได้ แต่ห้ามมีอำนาจอนุมัติแทนมนุษย์เด็ดขาด"
      },
      {
        "id": "C",
        "text": "ระบบท่อลำเลียงข้อมูลอัตโนมัติ (Automated CI/CD Pipeline) เมื่อตรวจพบว่าโค้ดไม่มีข้อผิดพลาดทางไวยากรณ์",
        "isCorrect": false,
        "explanation": "ผิด: การผ่านการทดสอบโค้ดทางเทคนิคไม่สามารถใช้แทนการอนุมัติความเสี่ยงทางธุรกิจและจริยธรรมได้"
      },
      {
        "id": "D",
        "text": "ผู้มีอำนาจตัดสินใจของหน่วยธุรกิจ (Business Unit) หลังตรวจสอบ Decision Memo และผลการตรวจความเป็นส่วนตัว",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p12-14: ต้องมี Human Approval Record จากฝั่งธุรกิจและผู้เกี่ยวข้องก่อนเริ่มกระทำการต่อลูกค้าจริงเสมอ"
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
    "scenario": "ระหว่างการรันระบบจริง ระบบ MLOps แจ้งเตือนว่าค่า Recall ของกลุ่มลูกค้าใหม่ลดลงเหลือ 42% (ต่ำกว่าเกณฑ์ขั้นต่ำที่ตกลงไว้ที่ 70%) ขั้นตอนการปฏิบัติตาม Runbook ในสไลด์ Lect 10 คือข้อใด?",
    "options": [
      {
        "id": "A",
        "text": "ระงับการใช้งานชั่วคราวตามแผนรับมือ แล้วเปิดงานย้อนกลับ (Backtrack Task) ไปตรวจสอบข้อมูลและฟีเจอร์ที่ต้นเหตุ",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p16-18: เมื่อเกิด Trigger ต้องทำตามแผน (เช่น Pause Pilot) และสร้าง Backtrack Task ย้อนกลับไปแก้ที่ขั้นต้นน้ำ"
      },
      {
        "id": "B",
        "text": "ปล่อยให้ระบบทำงานต่อไปตามปกติหากค่าความแม่นยำรวม (Overall Accuracy) ของลูกค้าทั้งหมดยังสูงอยู่",
        "isCorrect": false,
        "explanation": "ผิด: การเสื่อมสภาพในกลุ่มย่อย (Cohort Degradation) เป็นสัญญาณเตือนสำคัญที่ต้องจัดการทันที"
      },
      {
        "id": "C",
        "text": "ปรับลดเกณฑ์แจ้งเตือนใน Monitoring Contract ลงเหลือ 40% เพื่อให้ระบบสามารถทำงานต่อเนื่องได้โดยไม่หยุดชะงัก",
        "isCorrect": false,
        "explanation": "ผิด: ห้ามปรับลดเกณฑ์ความปลอดภัยเพื่อปิดบังสัญญาณความเสื่อมสภาพของโมเดล"
      },
      {
        "id": "D",
        "text": "ลบข้อมูลของกลุ่มลูกค้าใหม่ที่มีปัญหาออกจากฐานข้อมูลการประเมินผล เพื่อรักษาค่าเฉลี่ยของรายงานประจำเดือน",
        "isCorrect": false,
        "explanation": "ผิด: การตัดข้อมูลกลุ่มที่มีปัญหาออกจากการรายงานเป็นการบิดเบือนหลักฐานและสร้าง Selection Bias"
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
    "scenario": "ในการส่งมอบงานจากนักวิเคราะห์ข้อมูล (Data Analyst) ไปยังทีมสร้างโมเดล เอกสาร 'EDA Finding' ที่ได้มาตรฐานตามสไลด์ Lect 10 p7 ต้องประกอบด้วยข้อมูลใด?",
    "options": [
      {
        "id": "A",
        "text": "สรุปการยืนยันความสัมพันธ์เชิงสาเหตุที่แท้จริง พร้อมรับรองผลกำไรที่จะเกิดขึ้นหลังนำโมเดลไปใช้งาน",
        "isCorrect": false,
        "explanation": "ผิด: ขั้นตอน EDA ไม่สามารถพิสูจน์ความเป็นเหตุและผล (Causation) หรือรับรองผลกำไรล่วงหน้าได้"
      },
      {
        "id": "B",
        "text": "ระบุคำถามวิเคราะห์ หลักฐานการกระจายตัวและค่าว่าง ข้อค้นพบที่ยังไม่ด่วนสรุปสาเหตุ รวมถึงข้อจำกัดของข้อมูล",
        "isCorrect": true,
        "explanation": "ถูกต้องตามสไลด์ Lect 10 p7: EDA Finding ต้องส่งต่อทั้งคำถาม หลักฐานทางสถิติ ข้อจำกัด และประเด็นที่ต้องระวังให้ทีมถัดไป"
      },
      {
        "id": "C",
        "text": "แนบเฉพาะแผนภูมิที่ผ่านการจัดแต่งสีสันสวยงามโดยไม่ต้องระบุเงื่อนไขการคัดกรองหรือข้อจำกัดของข้อมูล",
        "isCorrect": false,
        "explanation": "ผิด: การส่งเฉพาะกราฟโดยไม่ระบุบริบทและข้อจำกัดทำให้ทีมสร้างโมเดลเสี่ยงตีความข้อมูลผิดพลาด"
      },
      {
        "id": "D",
        "text": "กำหนดค่าพารามิเตอร์สุดท้ายของโมเดลและผลการประเมินบนชุดข้อมูล Test Set ให้เสร็จสิ้นตั้งแต่ขั้นสำรวจตามเกณฑ์การวัดผลทางสถิติ",
        "isCorrect": false,
        "explanation": "ผิด: การจูนพารามิเตอร์และประเมินผลเป็นหน้าที่ของขั้น Modeling และ Evaluation ไม่ใช่ขั้น EDA"
      }
    ],
    "difficulty": "direct"
  }
];

export const EXAM_QUESTIONS = examQuestions;
