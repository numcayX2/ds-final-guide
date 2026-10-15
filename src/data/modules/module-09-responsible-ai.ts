import type { StudyModule } from '../../types/study';

export const module09ResponsibleAi: StudyModule = {
  id: 'module-09-responsible-ai',
  moduleNumber: '09',
  title: 'Responsible Data Science & AI Ethics',
  titleEn: 'Responsible AI, Biases & Legal Cases',
  lectureCode: 'Lect 09',
  isFinalFocus: true,
  timeEstimateMinutes: 25,
  quickSummary: 'อคติ 3 ด้าน (Historical, Representation, Proxy), การเปลี่ยนแปลง Concept Drift, XAI & SHAP Force Plot, 4 คดีจริงในประวัติศาสตร์ และ Decision Gates',
  coreFormulas: [],
  examTraps: [
    {
      trapTitle: 'ความเข้าใจผิดเรื่อง Proxy Features',
      trapDescription: 'เข้าใจว่าหากลบคอลัมน์ข้อมูลอ่อนไหว (เช่น เชื้อชาติ ศาสนา) ออกจากชุดข้อมูลแล้ว โมเดลจะปราศจากอคติ 100%',
      correctApproach: 'แม้ลบเชื้อชาติออก แต่ตัวแปร "รหัสไปรษณีย์" (Postal Code) ยังคงทำหน้าที่เป็น Proxy Feature สะท้อนฐานะทางสังคมและเชื้อชาติได้ ทำให้เกิดการเลือกปฏิบัติทางอ้อม (Lect 09 p13)',
      slideRef: 'Lect 09 p13',
    },
    {
      trapTitle: 'Concept Drift vs Data Drift',
      trapDescription: 'สับสนระหว่างการเปลี่ยนความสัมพันธ์กับการเปลี่ยนการกระจายตัวของอินพุต',
      correctApproach: 'Concept Drift คือ "ความสัมพันธ์ระหว่าง Feature กับ Target เปลี่ยนไปตามเวลา" (เช่น เดิมไม่ซื้อของเกิน 45 วัน = Inactive ตอนนี้เปลี่ยนเป็น 70 วัน ทำให้ Recall ตกเหลือ 54%) ส่วน Data Drift คืออินพุต P(X) เปลี่ยน',
      slideRef: 'Lect 09 p11, p20',
    },
    {
      trapTitle: 'การตัดสินใจที่ Decision Gates',
      trapDescription: 'คิดว่ามีแค่ ยอมรับ (Accept) หรือ ปฏิเสธ (Reject)',
      correctApproach: 'มี 3 ทางเลือก (Lect 09 p36): 1. Accept (ใช้งานได้), 2. Revise (ส่งกลับไปจูนในขั้นตอนเดิมของ CRISP-DS), 3. Reject (ปฏิเสธโมเดลเด็ดขาด)',
      slideRef: 'Lect 09 p36',
    },
  ],
  sections: [
    {
      title: '1. อคติ 3 ประการ และความเสี่ยงของ AI',
      conceptSummary: 'สาเหตุที่โมเดล Accuracy สูงยังคงล้มเหลวในโลกแห่งความเป็นจริง',
      keyPoints: [
        'Historical Bias: อคติจากข้อมูลในอดีต (เช่น แจกโปรโมชันเฉพาะ VIP ทำให้คลาส VIP ตอบรับ 80% ส่วน Non-VIP 20%)',
        'Representation Bias: กลุ่มตัวอย่างไม่สะท้อนความจริง (เช่น มีข้อมูล Subscription 800 ราย แต่ไม่สมัครมีแค่ 40 ราย)',
        'Proxy Features: ตัวแปรแอบแฝงที่ทำหน้าที่แทนข้อมูลอ่อนไหว (เช่น รหัสไปรษณีย์สะท้อนฐานะและเชื้อชาติ)',
      ],
    },
    {
      title: '2. 4 คดีจริงในประวัติศาสตร์ และการลงโทษทางกฎหมาย',
      conceptSummary: 'ตัวอย่างข้อสอบที่เป็นคดีศึกษาจริงในสไลด์อาจารย์',
      tableData: {
        headers: ['คดี / องค์กร', 'ปัญหาความผิดพลาดของ AI', 'ผลกระทบและบทลงโทษทางกฎหมาย'],
        rows: [
          ['iTutorGroup (EEOC 2023)', 'ระบบคัดกรองใบสมัครงานตัดผู้หญิง >55 ปี และผู้ชาย >60 ปี ทิ้งอัตโนมัติ', 'ผู้เสียหายกว่า 200 ราย ถูกสั่งปรับ $365,000 ดอลลาร์'],
          ['Health-risk Algorithm (2019)', 'ใช้อดีตค่ารักษาพยาบาลเป็น Proxy วัดความรุนแรงของโรค (คนจนใช้จ่ายน้อยเลยถูกมองว่าแข็งแรง)', 'หลังแก้ปัญหา ช่วยเพิ่มคนไข้ผิวดำได้รับการดูแลจาก 17.7% เป็น 46.5%'],
          ['Meta Housing Ads (2022)', 'อัลกอริทึมเลือกกลุ่มผู้เห็นโฆษณาบ้านไม่เท่าเทียม ละเมิด Fair Housing Act', 'ถูกปรับ $115,054 และสั่งพัฒนาระบบตรวจสอบ VRS'],
          ['Rite Aid (FTC 2023-2024)', 'ใช้ Facial Recognition จับขโมยเกิด False Positive สูง ชี้ตัวผู้บริสุทธิ์ผิด', 'FTC สั่งแบนการใช้ Facial Recognition 5 ปี และสั่งให้มี Human Checkpoint'],
        ],
      },
      keyPoints: [
        'ความโปร่งใส (XAI): Global Explanation (Feature Importance) vs Local Explanation (SHAP Value, Decision Path)',
        'SHAP Force Plot: วัดแรงผลักของแต่ละ Feature เทียบกับค่าฐาน Base Value E[f(x)]',
      ],
    },
  ],
};
