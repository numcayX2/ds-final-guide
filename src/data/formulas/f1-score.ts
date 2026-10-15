import type { FormulaAnimation } from '../../types/study';

export const f1ScoreFormula: FormulaAnimation = {
  id: 'f1-score',
  name: 'F1-Score',
  thaiName: 'ค่าเฉลี่ยฮาร์โมนิก (ความสมดุลระหว่าง Precision และ Recall)',
  lectureRef: 'Lect 07 p25, p30',
  category: 'evaluation',
  isFinalFocus: true,
  baseFormulaLatex: 'F1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2TP}{2TP + FP + FN}',
  description: 'ค่าเฉลี่ยฮาร์โมนิก (Harmonic Mean) ที่ลงโทษโมเดลอย่างรุนแรงหากมีเมตริกใดเมตริกหนึ่งต่ำมาก เหมาะสำหรับเปรียบเทียบโมเดลในภาวะ Imbalance',
  dataset: {
    headers: [
      { key: 'metric', label: 'ตัวแปร' },
      { key: 'value', label: 'ค่าจากการคำนวณ' },
      { key: 'role', label: 'บทบาทในสูตร' },
    ],
    rows: [
      {
        rowId: 'row-tp',
        cells: {
          metric: { id: 'cell-tp-metric', value: 'True Positive (TP)', semantic: 'tp' },
          value: { id: 'cell-tp-val', value: 4, semantic: 'tp' },
          role: { id: 'cell-tp-role', value: 'ตัวตั้งคูณ 2' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-fp',
        cells: {
          metric: { id: 'cell-fp-metric', value: 'False Positive (FP)', semantic: 'fp' },
          value: { id: 'cell-fp-val', value: 1, semantic: 'fp' },
          role: { id: 'cell-fp-role', value: 'ตัวหาร (โทษ FP)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-fn',
        cells: {
          metric: { id: 'cell-fn-metric', value: 'False Negative (FN)', semantic: 'fn' },
          value: { id: 'cell-fn-val', value: 2, semantic: 'fn' },
          role: { id: 'cell-fn-role', value: 'ตัวหาร (โทษ FN)' },
        },
        isHighlighted: true,
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: โครงสร้างสูตรตรงจาก Confusion Matrix',
      explanation: 'สูตรลดรูปโดยตรง: นำ 2 เท่าของ TP หารด้วย (2 เท่าของ TP บวก FP บวก FN)',
      katexDisplay: 'F_1 = \\frac{2 \\times \\htmlData{flip-id=token-tp}{TP}}{2 \\times \\htmlData{flip-id=token-tp-denom}{TP} + \\htmlData{flip-id=token-fp}{FP} + \\htmlData{flip-id=token-fn}{FN}}',
      sourceCellIds: ['cell-tp-val', 'cell-fp-val', 'cell-fn-val'],
      targetTokenIds: ['token-tp', 'token-tp-denom', 'token-fp', 'token-fn'],
      highlightStatus: 'neutral',
      phoneticScript: 'เอฟวัน เท่ากับ สองคูณ ทรูโพสิทิฟ ส่วนด้วย สองคูณทรูโพสิทิฟ บวก ฟอลส์โพสิทิฟ บวก ฟอลส์เนกาทีฟ',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: แทนค่าตัวเลขจริง',
      explanation: 'แทนค่า TP = 4, FP = 1, FN = 2',
      katexDisplay: 'F_1 = \\frac{2 \\times \\htmlData{flip-id=token-tp}{4}}{2 \\times \\htmlData{flip-id=token-tp-denom}{4} + \\htmlData{flip-id=token-fp}{1} + \\htmlData{flip-id=token-fn}{2}}',
      sourceCellIds: ['cell-tp-val', 'cell-fp-val', 'cell-fn-val'],
      targetTokenIds: ['token-tp', 'token-tp-denom', 'token-fp', 'token-fn'],
      highlightStatus: 'tp',
      phoneticScript: 'แทนค่า ได้ สองคูณสี่ ส่วนด้วย สองคูณสี่ บวกหนึ่ง บวกสอง',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: รวมค่าเศษและส่วน',
      explanation: 'เศษได้ 8 และส่วนได้ 8 + 1 + 2 = 11',
      katexDisplay: 'F_1 = \\frac{\\htmlData{flip-id=token-num}{8}}{\\htmlData{flip-id=token-denom}{11}}',
      targetTokenIds: ['token-num', 'token-denom'],
      highlightStatus: 'tp',
      phoneticScript: 'เศษได้ แปด ส่วนได้ สิบเอ็ด',
    },
    {
      stepIndex: 4,
      title: 'ขั้นตอนที่ 4: คำนวณทศนิยมสุดท้าย',
      explanation: '8 หาร 11 ได้ผลลัพธ์ประมาณ 0.727 หรือ 0.73',
      katexDisplay: 'F_1 \\approx \\htmlData{flip-id=token-result}{\\mathbf{0.73}}',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'สังเกต: F1 (0.73) จะอยู่ระหว่าง Precision (0.80) และ Recall (0.67) เสมอ และจะเอนเอียงเข้าหาค่าที่น้อยกว่า',
      phoneticScript: 'ผลลัพธ์สุดท้าย ได้ประมาณ ศูนย์จุดเจ็ดสาม',
    },
  ],
  oneLineRule: 'F1 เป็น Harmonic Mean ที่ "ลากเข้าหาตัวที่แย่กว่า" เสมอเพื่อเตือนจุดอ่อน',
};
