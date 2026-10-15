import type { StudyModule } from '../../types/study';

export const module06DecisionTree: StudyModule = {
  id: 'module-06-decision-tree',
  moduleNumber: '06',
  title: 'Decision Tree: Gini Impurity & Gain',
  titleEn: 'Decision Tree & Bias-Variance Tradeoff',
  lectureCode: 'Lect 07 p11-12, p19, p31',
  isFinalFocus: true,
  timeEstimateMinutes: 25,
  quickSummary: 'เกณฑ์การตัดกิ่งด้วย Gini Impurity, Weighted Gini Split และ Gini Gain พร้อมตาราง Bias-Variance Matrix และการเลือกระดับ max_depth',
  coreFormulas: ['gini-impurity', 'gini-split', 'gini-gain'],
  examTraps: [
    {
      trapTitle: 'การเปรียบเทียบ Candidate Splits',
      trapDescription: 'สับสนว่าต้องเลือก Candidate ที่มี Gini_split สูงหรือต่ำ หรือเลือกตัวที่ Gain สูงหรือต่ำ',
      correctApproach: 'ต้องเลือก Candidate ที่ทำให้ Gini_split "ต่ำที่สุด" ซึ่งจะส่งผลให้ Gini Gain "สูงที่สุด"! ตัวอย่างสไลด์หน้า 11-12: Candidate A (Gain 0.222) ชนะ Candidate B (Gain 0.056)',
      slideRef: 'Lect 07 p11-12',
    },
    {
      trapTitle: 'บันไดความลึก max_depth และ Overfitting',
      trapDescription: 'คิดว่าต้นไม้ที่ลึกที่สุด (Unrestricted Depth) ดีที่สุดเพราะจำ Training Data ได้ 100%',
      correctApproach: 'ต้นไม้ลึกเกินไป (depth >= 6 หรือไม่จำกัด) มี Low Bias แต่ High Variance เกิด Overfitting ทำให้ผลบน Validation Set ตกฮวบ! ในสไลด์ระดับความลึกที่เหมาะสมที่สุดคือ Moderate Tree (depth = 3)',
      slideRef: 'Lect 07 p19, p31',
    },
  ],
  sections: [
    {
      title: '1. สูตรการคำนวณ Gini และเกณฑ์การแตกกิ่ง',
      conceptSummary: 'คณิตศาสตร์เบื้องหลังการสร้างต้นไม้ตัดสินใจ',
      keyPoints: [
        'Gini Impurity (โหนดเดี่ยว): Gini = 1 - ∑ (p_i)^2 (โหนดบริสุทธิ์ Gini = 0)',
        'Weighted Gini Split: ถ่วงน้ำหนักกิ่งซ้าย-ขวาตามจำนวนตัวอย่าง',
        'Gini Gain = Gini(Parent) - Gini_split',
        'เป้าหมาย: ค้นหา Feature และค่าขีดแบ่ง (Threshold) ที่ให้ Gini Gain สูงสุด',
      ],
    },
    {
      title: '2. ตาราง Bias-Variance 2x2 Matrix ตามความลึกต้นไม้ (Tree Complexity)',
      conceptSummary: 'การวิเคราะห์พฤติกรรมของโมเดลตามความซับซ้อน',
      tableData: {
        headers: ['ความลึก (Complexity)', 'Bias', 'Variance', 'สถานะโมเดล', 'ผลบน Validation Set'],
        rows: [
          ['Shallow (depth = 1)', 'สูง (High)', 'ต่ำ (Low)', 'Underfitting (จับ Pattern ไม่พอ)', 'Validation ต่ำ'],
          ['Moderate (depth = 3)', 'พอดี (Low)', 'พอดี (Low)', 'Appropriate Fit (สมดุลที่สุด)', 'Validation สูงสุด (Selected!)'],
          ['Deep (depth >= 6)', 'ต่ำมาก', 'สูงมาก', 'Overfitting (จำ Noise)', 'Validation ลดลงอย่างมีนัยสำคัญ'],
          ['Unrestricted (ไม่จำกัด)', 'ต่ำที่สุด (0)', 'สูงที่สุด', 'Extreme Overfitting (จำ 100%)', 'Validation ตกฮวบ'],
        ],
      },
      keyPoints: [
        'Underfitting แก้โดยเพิ่มความลึกหรือเพิ่ม Feature',
        'Overfitting แก้โดยการตัดแต่งกิ่ง (Pruning) หรือจำกัด max_depth = 3',
      ],
    },
  ],
};
