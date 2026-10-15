import type { FormulaAnimation } from '../../types/study';

export const accuracyFormula: FormulaAnimation = {
  id: 'accuracy',
  name: 'Accuracy',
  thaiName: 'ความถูกต้องรวม (สัดส่วนการทายถูกทุกคลาส)',
  lectureRef: 'Lect 07 p22, p30',
  category: 'evaluation',
  isFinalFocus: true,
  baseFormulaLatex: 'Accuracy = \\frac{TP + TN}{TP + TN + FP + FN}',
  description: 'วัดสัดส่วนที่โมเดลทายถูกทั้งหมด ไม่ว่าจะเป็นเคสบวกหรือลบ เหมาะเมื่อชุดข้อมูลมีความสมดุล (Balanced Classes) และต้นทุนของความผิดพลาดทั้งสองแบบใกล้เคียงกัน',
  dataset: {
    headers: [
      { key: 'metric', label: 'สถานะ Confusion Matrix' },
      { key: 'count', label: 'จำนวน (คน)' },
      { key: 'status', label: 'ผลการทำนาย' },
    ],
    rows: [
      {
        rowId: 'row-tp',
        cells: {
          metric: { id: 'cell-tp-metric', value: 'True Positive (TP)', semantic: 'tp' },
          count: { id: 'cell-tp-count', value: 4, semantic: 'tp' },
          status: { id: 'cell-tp-status', value: 'ทายถูก (Correct Positive)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-tn',
        cells: {
          metric: { id: 'cell-tn-metric', value: 'True Negative (TN)', semantic: 'tn' },
          count: { id: 'cell-tn-count', value: 3, semantic: 'tn' },
          status: { id: 'cell-tn-status', value: 'ทายถูก (Correct Negative)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-fp',
        cells: {
          metric: { id: 'cell-fp-metric', value: 'False Positive (FP)', semantic: 'fp' },
          count: { id: 'cell-fp-count', value: 1, semantic: 'fp' },
          status: { id: 'cell-fp-status', value: 'ทายผิด' },
        },
      },
      {
        rowId: 'row-fn',
        cells: {
          metric: { id: 'cell-fn-metric', value: 'False Negative (FN)', semantic: 'fn' },
          count: { id: 'cell-fn-count', value: 2, semantic: 'fn' },
          status: { id: 'cell-fn-status', value: 'ทายผิด' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: โครงสร้างสมการ Accuracy',
      explanation: 'นำผลรวมของการทายถูกต้องทั้งหมด (TP + TN) หารด้วยจำนวนตัวอย่างทั้งหมด (N)',
      katexDisplay: '\\text{Accuracy} = \\frac{\\htmlData{flip-id=token-tp}{TP} + \\htmlData{flip-id=token-tn}{TN}}{\\htmlData{flip-id=token-total}{N}}',
      sourceCellIds: ['cell-tp-count', 'cell-tn-count'],
      targetTokenIds: ['token-tp', 'token-tn', 'token-total'],
      highlightStatus: 'neutral',
      phoneticScript: 'แอคคิวราซี เท่ากับ ทรูโพสิทิฟ บวก ทรูเนกาทีฟ ส่วนด้วย จำนวนทั้งหมด',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: แทนค่าตัวเลขจริง (FIFA Model)',
      explanation: 'TP = 4, TN = 3 และตัวส่วนรวมคือ 4 + 3 + 1 + 2 = 10',
      katexDisplay: '\\text{Accuracy} = \\frac{\\htmlData{flip-id=token-tp}{4} + \\htmlData{flip-id=token-tn}{3}}{\\htmlData{flip-id=token-total}{10}}',
      sourceCellIds: ['cell-tp-count', 'cell-tn-count'],
      targetTokenIds: ['token-tp', 'token-tn', 'token-total'],
      highlightStatus: 'tp',
      phoneticScript: 'แทนค่าตัวเลข ได้ สี่บวกสาม ส่วนด้วย สิบ',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณผลลัพธ์',
      explanation: '7 ส่วน 10 ออกมาเป็น 0.70 หรือ 70%',
      katexDisplay: '\\text{Accuracy} = \\frac{7}{10} = \\htmlData{flip-id=token-result}{\\mathbf{0.70}} \\quad (70\\%)',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'ข้อสอบระวัง! ในโจทย์ Imbalanced Data เช่น โกงบัตร 1% หากโมเดลเดา "ไม่โกง" ตลอด จะได้ Accuracy 99% แต่ไร้ประโยชน์ทางธุรกิจ!',
      phoneticScript: 'ผลลัพธ์ เท่ากับ ศูนย์จุดเจ็ดศูนย์ หรือ เจ็ดสิบเปอร์เซ็นต์',
    },
  ],
  oneLineRule: 'Accuracy เชื่อถือได้เฉพาะเมื่อข้อมูลสองคลาส "สมดุลกัน" เท่านั้น',
};
