import type { StudyModule } from '../../types/study';

export const module06DecisionTree: StudyModule = {
  id: 'module-06-decision-tree',
  moduleNumber: '06',
  title: 'Decision Tree: Gini Impurity & Gain',
  titleEn: 'Decision Tree & Bias-Variance Tradeoff',
  lectureCode: 'Lect 07 p11–12, p19, p31',
  isFinalFocus: true,
  timeEstimateMinutes: 25,
  quickSummary: 'คณิตศาสตร์การแตกกิ่งด้วย Gini Impurity, Weighted Gini Split และ Gini Gain พร้อมตารางเปรียบเทียบ Candidate A vs B และบันไดความลึก max_depth',
  coreFormulas: ['gini-impurity', 'gini-split', 'gini-gain'],
  examTraps: [
    {
      trapTitle: 'การเปรียบเทียบเลือก Candidate Splits (Gini_split ต่ำสุด = Gini Gain สูงสุด)',
      trapDescription: 'สับสนในห้องสอบว่าต้องเลือกตัวแปรที่ให้ค่า Gini_split สูงหรือต่ำ หรือเลือกตัวที่ให้ Gini Gain ต่ำ',
      correctApproach: 'ต้องเลือกกิ่งที่ทำให้ความไม่บริสุทธิ์หลังแบ่ง "Gini_split ต่ำที่สุด" ซึ่งจะส่งผลให้ได้ "Gini Gain สูงที่สุด" เสมอ! ในสไลด์หน้า 11–12: Candidate A (Gini_split = 0.278, Gain = 0.222) ชนะ Candidate B (Gini_split = 0.444, Gain = 0.056)',
      slideRef: 'Lect 07 p11–12',
    },
    {
      trapTitle: 'บันไดความลึก max_depth และกับดัก Overfitting (Unrestricted Tree)',
      trapDescription: 'คิดว่าต้นไม้ที่แตกกิ่งลึกที่สุดโดยไม่จำกัด (Unrestricted Depth) ดีที่สุดเพราะได้ Training Accuracy 100%',
      correctApproach: 'ต้นไม้ที่ลึกเกินไป (depth >= 6 หรือ Unrestricted) มี Low Bias แต่ High Variance ทำให้จำ Noise ในชุดฝึก (Overfitting) ส่งผลให้คะแนน Validation ตกฮวบ! ระดับที่เหมาะสมที่สุดในสไลด์คือ Moderate Tree (max_depth = 3)',
      slideRef: 'Lect 07 p19, p31',
    },
    {
      trapTitle: 'ค่าขอบเขตของ Gini Impurity (Binary Classification)',
      trapDescription: 'จำสลับว่า Gini = 0.5 คือโหนดบริสุทธิ์ หรือคิดว่า Gini มีค่าเกิน 0.5 ได้ในการจำแนก 2 คลาส',
      correctApproach: 'สำหรับ 2 คลาส: Gini = 0.000 คือโหนดบริสุทธิ์ 100% (Pure Node มีคลาสเดียวล้วน) ส่วน Gini = 0.500 คือโหนดที่ปนกันมากที่สุดอย่างละครึ่ง (50:50)',
      slideRef: 'Lect 07 p10–11',
    },
  ],
  sections: [
    {
      title: '1. ขั้นตอนคำนวณ Gini Impurity, Gini Split และเปรียบเทียบ Candidate A vs B',
      conceptSummary: 'ตัวอย่างตัวเลขจริงจากสไลด์ Lect 07 p11–12 (ข้อมูลผู้เล่นทั้งหมด N = 12: Play = 6, Not Play = 6)',
      tableData: {
        headers: ['ทางเลือกการแตกกิ่ง', 'กิ่งซ้าย (Left Node)', 'กิ่งขวา (Right Node)', 'Weighted Gini_split', 'Gini Gain = 0.500 − Gini_split'],
        rows: [
          ['Parent Node (ก่อนแบ่ง)', 'รวม 12 ตัวอย่าง (6, 6)', '—', 'Gini(Parent) = 1 − (0.5² + 0.5²) = 0.500', 'ค่าตั้งต้น = 0.500'],
          ['Candidate Split A (ชนะ!)', '6 ตัว [5 Play, 1 No] → Gini = 0.278', '6 ตัว [1 Play, 5 No] → Gini = 0.278', '(6/12)(0.278) + (6/12)(0.278) = 0.278', '0.500 − 0.278 = 0.222 (สูงสุด — เลือก A!)'],
          ['Candidate Split B', '6 ตัว [4 Play, 2 No] → Gini = 0.444', '6 ตัว [2 Play, 4 No] → Gini = 0.444', '(6/12)(0.444) + (6/12)(0.444) = 0.444', '0.500 − 0.444 = 0.056 (ต่ำกว่า)'],
        ],
      },
      keyPoints: [
        'สูตรที่ 1 — Gini ของโหนดเดี่ยว: Gini(t) = 1 − ∑ (p_i)² เช่น โหนด [5, 1] มีรวม 6 ตัว → 1 − [(5/6)² + (1/6)²] = 1 − (25/36 + 1/36) = 10/36 ≈ 0.278',
        'สูตรที่ 2 — Weighted Gini Split: Gini_split = (n_L / N)·Gini(L) + (n_R / N)·Gini(R) ถ่วงน้ำหนักตามสัดส่วนจำนวนสมาชิกในแต่ละกิ่งย่อย',
        'สูตรที่ 3 — Gini Gain: Gain = Gini(Parent) − Gini_split ยิ่งลดความไม่บริสุทธิ์ลงได้มากเท่าไร ค่า Gain ยิ่งสูง',
      ],
    },
    {
      title: '2. ตาราง Bias-Variance 2x2 Matrix ตามความลึกต้นไม้ (Tree Complexity)',
      conceptSummary: 'การวิเคราะห์พฤติกรรมของโมเดลตามความซับซ้อน (Lect 07 p19, p31)',
      tableData: {
        headers: ['ความลึก (Complexity)', 'Bias (ความเอนเอียง)', 'Variance (ความแปรปรวน)', 'สถานะโมเดล', 'ผลบน Validation Set'],
        rows: [
          ['Shallow (depth = 1)', 'สูง (High Bias)', 'ต่ำ (Low Variance)', 'Underfitting (โมเดลตื้นเกินไป จับ Pattern ไม่พอ)', 'Validation ต่ำ'],
          ['Moderate (depth = 3)', 'ต่ำกำลังดี (Low)', 'ต่ำกำลังดี (Low)', 'Appropriate Fit (สมดุล Bias-Variance ดีที่สุด)', 'Validation สูงสุด (Selected!)'],
          ['Deep (depth >= 6)', 'ต่ำมาก', 'สูงมาก (High Variance)', 'Overfitting (เริ่มจำ Noise ในชุดฝึก)', 'Validation ลดลงอย่างมีนัยสำคัญ'],
          ['Unrestricted (ไม่จำกัด)', 'ต่ำที่สุด (เข้าใกล้ 0)', 'สูงที่สุด (Extreme)', 'Extreme Overfitting (Train แม่น 100% ลวงตา)', 'Validation ตกฮวบ'],
        ],
      },
      keyPoints: [
        'วิธีแก้ปัญหา Underfitting: เพิ่มความลึกของต้นไม้ (max_depth) หรือเพิ่ม Feature ที่มีความหมาย',
        'วิธีแก้ปัญหา Overfitting: จำกัดความลึกสูงสุด (Pre-pruning เช่น ตั้ง max_depth = 3), กำหนดจำนวนตัวอย่างขั้นต่ำต่อใบ (min_samples_leaf) หรือตัดแต่งกิ่งภายหลัง (Post-pruning)',
      ],
    },
  ],
};
