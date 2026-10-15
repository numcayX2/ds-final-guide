import type { FormulaAnimation } from '../../types/study';

/**
 * Reference Formula Implementation: Precision (Spec 14 Canonical Model)
 * Based on authentic lecture example: FIFA World Cup 2026 Model (Lect07 p23, p30)
 */
export const precisionFormula: FormulaAnimation = {
  id: 'precision',
  name: 'Precision',
  thaiName: 'ความแม่นยำ (สัดส่วนของจริงเมื่อโมเดลทายว่าใช่)',
  lectureRef: 'Lect 07 p23, p30',
  category: 'evaluation',
  isFinalFocus: true,
  baseFormulaLatex: 'Precision = \\frac{TP}{TP + FP}',
  description: 'วัดความแม่นยำของการทำนายเชิงบวก มีความสำคัญอย่างยิ่งเมื่อเกิด False Positive (FP) แล้วมีต้นทุนหรือความเสียหายสูง เช่น การรบกวนลูกค้า หรือการส่งนักเตะที่ไม่พร้อมลงสนาม',
  dataset: {
    headers: [
      { key: 'metric', label: 'สถานะ Confusion Matrix' },
      { key: 'count', label: 'จำนวนนักเตะ (คน)' },
      { key: 'desc', label: 'คำอธิบายเชิงกายภาพ' },
    ],
    rows: [
      {
        rowId: 'row-tp',
        cells: {
          metric: { id: 'cell-tp-metric', value: 'True Positive (TP)', semantic: 'tp' },
          count: { id: 'cell-tp-count', value: 4, semantic: 'tp' },
          desc: { id: 'cell-tp-desc', value: 'นักเตะพร้อมจริง และโมเดลสั่งให้ลงสนาม (Play)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-fp',
        cells: {
          metric: { id: 'cell-fp-metric', value: 'False Positive (FP)', semantic: 'fp' },
          count: { id: 'cell-fp-count', value: 1, semantic: 'fp' },
          desc: { id: 'cell-fp-desc', value: 'นักเตะล้า/บาดเจ็บ แต่โมเดลสั่งลงสนามผิดพลาด' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-fn',
        cells: {
          metric: { id: 'cell-fn-metric', value: 'False Negative (FN)', semantic: 'fn' },
          count: { id: 'cell-fn-count', value: 2, semantic: 'fn' },
          desc: { id: 'cell-fn-desc', value: 'นักเตะพร้อม แต่โมเดลสั่งพัก (Rest)' },
        },
      },
      {
        rowId: 'row-tn',
        cells: {
          metric: { id: 'cell-tn-metric', value: 'True Negative (TN)', semantic: 'tn' },
          count: { id: 'cell-tn-count', value: 3, semantic: 'tn' },
          desc: { id: 'cell-tn-desc', value: 'นักเตะล้าจริง และโมเดลสั่งพักถูกต้อง' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: กำหนดนิยามและโครงสร้างสมการ',
      explanation: 'Precision พิจารณาเฉพาะแถว/คอลัมน์ที่โมเดล "ทำนายว่าเป็น Positive" (Predicted Positive = TP + FP) เพื่อดูว่ามีของจริงอยู่เท่าใด',
      katexDisplay: '\\text{Precision} = \\frac{\\htmlData{flip-id=token-tp}{TP}}{\\htmlData{flip-id=token-tp-denom}{TP} + \\htmlData{flip-id=token-fp}{FP}}',
      sourceCellIds: ['cell-tp-count', 'cell-fp-count'],
      targetTokenIds: ['token-tp', 'token-tp-denom', 'token-fp'],
      highlightStatus: 'neutral',
      phoneticScript: 'เพรสิชัน เท่ากับ ทรูโพสิทิฟ ส่วนด้วย ทรูโพสิทิฟ บวก ฟอลส์โพสิทิฟ',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: แทนค่าตัวเลขจริงจาก Confusion Matrix',
      explanation: 'ดึงค่า TP = 4 (นักเตะที่ลงเล่นได้จริงและทายถูก) และ FP = 1 (นักเตะที่ร่างกายไม่พร้อมแต่ถูกทายให้ลงเล่น) เข้าสู่สมการ',
      katexDisplay: '\\text{Precision} = \\frac{\\htmlData{flip-id=token-tp}{4}}{\\htmlData{flip-id=token-tp-denom}{4} + \\htmlData{flip-id=token-fp}{1}}',
      sourceCellIds: ['cell-tp-count', 'cell-fp-count'],
      targetTokenIds: ['token-tp', 'token-tp-denom', 'token-fp'],
      highlightStatus: 'tp',
      phoneticScript: 'แทนค่าตัวเลข ได้ สี่ ส่วนด้วย สี่บวกหนึ่ง',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: รวมผลรวมตัวส่วน (All Predicted Positive)',
      explanation: 'นักเตะที่โมเดลทำนายให้ลงสนามมีทั้งหมด 4 + 1 = 5 คน',
      katexDisplay: '\\text{Precision} = \\frac{\\htmlData{flip-id=token-tp}{4}}{\\htmlData{flip-id=token-denom-sum}{5}}',
      sourceCellIds: ['cell-tp-count'],
      targetTokenIds: ['token-tp', 'token-denom-sum'],
      highlightStatus: 'tp',
      phoneticScript: 'รวมตัวส่วน ได้ สี่ ส่วน ห้า',
    },
    {
      stepIndex: 4,
      title: 'ขั้นตอนที่ 4: คำนวณผลลัพธ์สุดท้ายและแปลความหมาย',
      explanation: 'ได้ผลลัพธ์ 0.80 หรือ 80% หมายความว่า ทุกๆ 100 ครั้งที่โมเดลบอกว่านักเตะพร้อม จะเป็นความจริง 80 ครั้ง และมีความผิดพลาด (ส่งคนเจ็บลง) 20 ครั้ง',
      katexDisplay: '\\text{Precision} = \\htmlData{flip-id=token-result}{\\mathbf{0.80}} \\quad (80\\%)',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'ระวัง! อย่าสับสนตัวส่วนกับ Recall (Recall ใช้ตัวส่วนเป็น TP + FN = 4 + 2 = 6)',
      phoneticScript: 'คำนวณผลลัพธ์สุดท้าย ได้ ศูนย์จุดแปดศูนย์ หรือ แปดสิบเปอร์เซ็นต์',
    },
  ],
  oneLineRule: 'Precision แคร์เมื่อ "ทายมั่วแล้วเสียหาย" (FP มีต้นทุนสูง เช่น ส่งคนเจ็บลงสนาม หรือส่งสแปม)',
  businessImpact: {
    primaryCareMetric: 'precision',
    tradeoffSummary: 'หากต้องการ Precision สูงมาก โมเดลต้องมั่นใจจริงถึงจะทาย Positive แต่อาจทำให้ Recall ตก (ไม่กล้าส่งนักเตะที่ฟิตปานกลางลงเล่น)',
    realWorldCaseReference: 'FIFA World Cup 2026 Medical Selection & Customer Spam Notification',
  },
};
