import type { FormulaAnimation } from '../../types/study';

export const recallFormula: FormulaAnimation = {
  id: 'recall',
  name: 'Recall (Sensitivity)',
  thaiName: 'ความครอบคลุม (ของจริงทั้งหมด โมเดลจับได้กี่ %)',
  lectureRef: 'Lect 07 p24, p30',
  category: 'evaluation',
  isFinalFocus: true,
  baseFormulaLatex: 'Recall = \\frac{TP}{TP + FN}',
  description: 'วัดสัดส่วนที่โมเดลสามารถตรวจจับเคสที่เป็นบวกจริงได้ทั้งหมด สำคัญมากเมื่อ False Negative (FN) รุนแรง เช่น การพลาดเคสคนเป็นโรคร้าย หรือลูกค้าจะเลิกใช้บริการ (Missed Churn)',
  dataset: {
    headers: [
      { key: 'metric', label: 'สถานะ Confusion Matrix' },
      { key: 'count', label: 'จำนวน (คน/เคส)' },
      { key: 'desc', label: 'คำอธิบายเชิงความหมาย' },
    ],
    rows: [
      {
        rowId: 'row-tp',
        cells: {
          metric: { id: 'cell-tp-metric', value: 'True Positive (TP)', semantic: 'tp' },
          count: { id: 'cell-tp-count', value: 4, semantic: 'tp' },
          desc: { id: 'cell-tp-desc', value: 'นักเตะพร้อมจริง และสั่งลงสนาม' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-fn',
        cells: {
          metric: { id: 'cell-fn-metric', value: 'False Negative (FN)', semantic: 'fn' },
          count: { id: 'cell-fn-count', value: 2, semantic: 'fn' },
          desc: { id: 'cell-fn-desc', value: 'นักเตะพร้อม แต่โมเดลมองข้ามสั่งพัก (หลุดเคสบวก)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-fp',
        cells: {
          metric: { id: 'cell-fp-metric', value: 'False Positive (FP)', semantic: 'fp' },
          count: { id: 'cell-fp-count', value: 1, semantic: 'fp' },
          desc: { id: 'cell-fp-desc', value: 'นักเตะไม่พร้อมแต่สั่งลง' },
        },
      },
      {
        rowId: 'row-tn',
        cells: {
          metric: { id: 'cell-tn-metric', value: 'True Negative (TN)', semantic: 'tn' },
          count: { id: 'cell-tn-count', value: 3, semantic: 'tn' },
          desc: { id: 'cell-tn-desc', value: 'นักเตะไม่พร้อม สั่งพักถูกต้อง' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: กำหนดนิยามและโครงสร้างสมการ',
      explanation: 'Recall สนใจเฉพาะ "ของจริงที่เป็น Positive ทั้งหมด" (Actual Positive = TP + FN)',
      katexDisplay: '\\text{Recall} = \\frac{\\htmlData{flip-id=token-tp}{TP}}{\\htmlData{flip-id=token-tp-denom}{TP} + \\htmlData{flip-id=token-fn}{FN}}',
      sourceCellIds: ['cell-tp-count', 'cell-fn-count'],
      targetTokenIds: ['token-tp', 'token-tp-denom', 'token-fn'],
      highlightStatus: 'neutral',
      phoneticScript: 'รีคอล เท่ากับ ทรูโพสิทิฟ ส่วนด้วย ทรูโพสิทิฟ บวก ฟอลส์เนกาทีฟ',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: ดึงข้อมูลจริงจากตาราง',
      explanation: 'แทนค่า TP = 4 และ FN = 2 เข้าสู่สมการ',
      katexDisplay: '\\text{Recall} = \\frac{\\htmlData{flip-id=token-tp}{4}}{\\htmlData{flip-id=token-tp-denom}{4} + \\htmlData{flip-id=token-fn}{2}}',
      sourceCellIds: ['cell-tp-count', 'cell-fn-count'],
      targetTokenIds: ['token-tp', 'token-tp-denom', 'token-fn'],
      highlightStatus: 'tp',
      phoneticScript: 'แทนค่าตัวเลข ได้ สี่ ส่วนด้วย สี่บวกสอง',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณตัวส่วน (Total Actual Positive)',
      explanation: 'นักเตะที่พร้อมลงสนามจริงมีทั้งหมด 4 + 2 = 6 คน',
      katexDisplay: '\\text{Recall} = \\frac{\\htmlData{flip-id=token-tp}{4}}{\\htmlData{flip-id=token-denom-sum}{6}}',
      sourceCellIds: ['cell-tp-count'],
      targetTokenIds: ['token-tp', 'token-denom-sum'],
      highlightStatus: 'tp',
      phoneticScript: 'รวมตัวส่วน ได้ สี่ ส่วน หก',
    },
    {
      stepIndex: 4,
      title: 'ขั้นตอนที่ 4: สรุปค่า Recall และบทเรียน',
      explanation: 'ได้ผลลัพธ์ 0.667 หรือ 66.67% โมเดลตรวจจับคนพร้อมได้ 2 ใน 3 แต่พลาดไป 1 ใน 3',
      katexDisplay: '\\text{Recall} = \\htmlData{flip-id=token-result}{\\mathbf{0.67}} \\quad (66.67\\%)',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'อย่าสับสนกับ Precision! Recall ใช้ตัวส่วนเป็น TP + FN (มองแถวของจริง)',
      phoneticScript: 'ผลลัพธ์สุดท้าย เท่ากับ ศูนย์จุดหกเจ็ด หรือ หกสิบหกจุดหกเจ็ด เปอร์เซ็นต์',
    },
  ],
  oneLineRule: 'Recall แคร์เมื่อ "หลุดเคสบวกแล้วเสียหายรุนแรง" (FN มีต้นทุนสูง เช่น มะเร็ง, ลูกค้าหนี)',
  businessImpact: {
    primaryCareMetric: 'recall',
    tradeoffSummary: 'ถ้าอยากได้ Recall สูงใกล้ 100% โมเดลต้องเดา Positive ให้บ่อยขึ้น ซึ่งจะแลกมาด้วย False Positive ที่เพิ่มขึ้นตามมา',
  },
};
