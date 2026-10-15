import type { StudyModule } from '../../types/study';

export const module02DataCleaning: StudyModule = {
  id: 'module-02-data-cleaning',
  moduleNumber: '02',
  title: 'Data Preparation I: Data Cleaning',
  titleEn: 'Data Cleaning & Evidence-Based Process',
  lectureCode: 'Lect 04.1',
  isFinalFocus: false,
  timeEstimateMinutes: 20,
  quickSummary: 'กระบวนการคลีนข้อมูล 6 ขั้นตอนตามหลักฐาน (Evidence-Based) และ 5 กลยุทธ์จัดการค่าสูญหาย พร้อมกฎเหล็ก Clean Known Errors Before Calculating Replacements',
  coreFormulas: ['valid-mean', 'cluster-median'],
  examTraps: [
    {
      trapTitle: 'ลำดับการทำความสะอาดก่อนหาค่าแทนที่ (Clean Before Impute)',
      trapDescription: 'การหาค่าเฉลี่ยหรือมัธยฐานโดยลืมตัดค่า Known Invalid Data (เช่น รายได้ -40,000 หรือค่าพิมพ์เกิน 904,000) ทิ้งไปก่อน',
      correctApproach: 'ต้องตัด Known Invalid ทิ้งออกจากตัวหารและผลรวมก่อนคำนวณเสมอ และทุกครั้งที่แทนค่าต้องสร้าง Flag คอลัมน์ระบุ (เช่น income_imputed = 1)',
      slideRef: 'Lect 04.1 p29, p34',
    },
    {
      trapTitle: 'ผลกระทบของการ Drop Missing Values (Deletion Bias)',
      trapDescription: 'เข้าใจว่าการลบทิ้ง (Deletion) ปลอดภัยที่สุดเพราะไม่ต้องเดาข้อมูล',
      correctApproach: 'การลบทำให้เกิด Information Loss และ Selection Bias อย่างรุนแรง สไลด์หน้า 16 แสดงตัวอย่างสัดส่วน Section นักศึกษาเปลี่ยนจาก 64:36 เป็น 70:30',
      slideRef: 'Lect 04.1 p16',
    },
  ],
  sections: [
    {
      title: '1. กระบวนการคลีนข้อมูล 6 ขั้นตอนตามหลักฐาน (Evidence-Based Decision Process)',
      conceptSummary: 'การคลีนข้อมูลที่ดีต้องมีหลักฐานรองรับและตรวจสอบย้อนกลับได้เสมอ',
      keyPoints: [
        '1. Detect: ตรวจพบความผิดปกติ (Missing, Invalid, Duplicate)',
        '2. Understand: ทำความเข้าใจบริบทของข้อมูลว่าเกิดจากสาเหตุใด (MCAR, MAR, NMAR)',
        '3. Decide: ตัดสินใจเลือกยุทธศาสตร์ (ลบ หรือ แทนค่าแบบใด)',
        '4. Transform: ดำเนินการแปลงข้อมูลอย่างถูกต้องตามหลักวิชาการ',
        '5. Validate: ตรวจสอบความถูกต้องหลังแปลงว่าการกระจายตัวไม่บิดเบือน',
        '6. Document: บันทึกหลักฐานและติด Flag เพื่อความโปร่งใส (Traceability)',
      ],
    },
    {
      title: '2. ยุทธศาสตร์ 5 รูปแบบในการจัดการ Missing Values',
      conceptSummary: 'เปรียบเทียบข้อดีและข้อจำกัดของแต่ละกลยุทธ์',
      keyPoints: [
        'Deletion: ลบทั้งแถวหรือคอลัมน์ — เสี่ยง Selection Bias และสูญเสียข้อมูล',
        'Simple Imputation: แทนด้วย Mean / Median / Mode รวม — ลด Variance ของตัวแปร',
        'Group-wise Imputation: แบ่งกลุ่มตาม Context แล้วหา Mean/Median เฉพาะกลุ่ม',
        'Regression Imputation: ใช้ตัวแปรอื่นทำนาย — เสี่ยง Data Leakage ถ้าไม่แยก Train/Val',
        'Cluster-based Imputation: จัดกลุ่มด้วยความคล้ายคลึงหลายมิติ แล้วใช้มัธยฐานในคลัสเตอร์',
      ],
    },
  ],
};
