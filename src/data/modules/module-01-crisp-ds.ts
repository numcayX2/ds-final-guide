import type { StudyModule } from '../../types/study';

export const module01CrispDs: StudyModule = {
  id: 'module-01-crisp-ds',
  moduleNumber: '01',
  title: 'Data Science Framework: CRISP-DS 8 ขั้นตอน',
  titleEn: 'Data Science Process & Framework',
  lectureCode: 'Lect 02 p18, p20',
  isFinalFocus: false,
  timeEstimateMinutes: 15,
  quickSummary: 'วงจรการทำงาน Data Science 8 ขั้นตอนแบบ Iterative เริ่มตั้งแต่ตั้งเป้าหมายธุรกิจจนถึงการปรับปรุงด้วย AI พร้อมสัดส่วนเวลากว่า 60-80% ในขั้นตอน Data Preparation',
  coreFormulas: [],
  examTraps: [
    {
      trapTitle: 'สัดส่วนเวลาการทำงานในวงจร Data Science',
      trapDescription: 'ข้อสอบถามว่าขั้นตอนใดกินเวลาและแรงงานมากที่สุด',
      correctApproach: 'Data Preparation (Data Cleaning & Feature Engineering) ใช้เวลาถึง 60–80% ของงานทั้งหมด (Lect 02 p20)',
      slideRef: 'Lect 02 p20',
    },
    {
      trapTitle: 'การแยกชนิดตัวแปร (Semantic Types)',
      trapDescription: 'สับสนระหว่าง Quantitative (Discrete/Continuous) กับ Qualitative (Nominal/Ordinal)',
      correctApproach: 'Ordinal มีลำดับความสำคัญ (เช่น ระดับการศึกษา, ลำดับเกรด) ส่วน Nominal ไร้ลำดับ (เช่น เพศ, จังหวัด, สี)',
      slideRef: 'Lect 02 p24-28',
    },
  ],
  sections: [
    {
      title: '1. วงจร CRISP-DS 8 ขั้นตอน (Iterative Cycle)',
      conceptSummary: 'การทำงาน Data Science ไม่ใช่เส้นตรง แต่เป็นวงจรหมุนวนที่สามารถย้อนกลับไปปรับปรุงขั้นตอนก่อนหน้าได้ตลอดเวลา',
      keyPoints: [
        '1. Business Understanding: นิยามปัญหาธุรกิจและกำหนดเป้าหมายเชิงปริมาณ (SMART Goals)',
        '2. Data Understanding: สำรวจโครงสร้าง ชนิดตัวแปร และตรวจสอบคุณภาพข้อมูลเบื้องต้น',
        '3. Data Preparation: ทำความสะอาดข้อมูล (Data Cleaning) และแปลงฟีเจอร์ (Feature Engineering) — ใช้เวลามากที่สุด 60-80%',
        '4. Exploratory Data Analysis (EDA): สำรวจสถิติเชิงลึก หาความสัมพันธ์และ Outliers',
        '5. Modeling: เลือกและฝึกสอนอัลกอริทึม (Supervised / Unsupervised)',
        '6. Evaluation: วัดประสิทธิภาพเทียบกับเกณฑ์ความต้องการของธุรกิจ',
        '7. Deployment & Communication: นำโมเดลไปใช้งานจริง และสื่อสาร Data Storytelling',
        '8. AI-assisted Improvement: เฝ้าระวัง Concept Drift และกำกับดูแลด้วยมนุษย์ (Human-in-the-loop)',
      ],
    },
    {
      title: '2. ชนิดข้อมูลและการจัดเก็บ (Data Types Taxonomy)',
      conceptSummary: 'การจำแนกประเภทข้อมูลทั้งในแง่ของโครงสร้างการจัดเก็บ (Storage) และคุณลักษณะเชิงสถิติ (Semantic)',
      keyPoints: [
        'Structured Data: มีแถวและคอลัมน์ชัดเจนตาม Schema (เช่น SQL Table, CSV)',
        'Semi-structured Data: มีโครงสร้างยืดหยุ่นด้วย Tag หรือ Key-Value (เช่น JSON, XML)',
        'Unstructured Data: ข้อมูลอิสระที่ไม่มีโครงสร้างตายตัว (เช่น ข้อความยาว, รูปภาพ, เสียง)',
        'Quantitative (เชิงปริมาณ): Discrete (นับเป็นจำนวนเต็ม เช่น จำนวนคน) vs Continuous (ค่าต่อเนื่องวัดได้ เช่น ส่วนสูง, รายได้)',
        'Qualitative (เชิงคุณภาพ): Nominal (ชื่อหมวดหมู่ไร้ลำดับ) vs Ordinal (จัดอันดับได้ เช่น น้อย/ปานกลาง/มาก)',
      ],
    },
  ],
};
