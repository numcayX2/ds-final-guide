import type { FormulaAnimation } from '../../types/study';

export const zScoreFormula: FormulaAnimation = {
  id: 'z-score',
  name: 'Z-Score Standardization',
  thaiName: 'การปรับมาตรฐานคะแนนมาตรฐาน (เทียบ Mean และ SD)',
  lectureRef: 'Lect 04.2 p21, p22',
  category: 'scaling',
  isFinalFocus: false,
  baseFormulaLatex: 'z = \\frac{x - \\mu}{\\sigma}',
  description: 'การแปลงข้อมูลให้มีค่าเฉลี่ยเป็น 0 และส่วนเบี่ยงเบนมาตรฐานเป็น 1 โดย "ไม่เปลี่ยนรูปทรงเดิมของการกระจายตัว" ตัวอย่าง: รายได้ของ John (35,000) เทียบกับกลุ่มลูกค้า',
  dataset: {
    headers: [
      { key: 'param', label: 'พารามิเตอร์' },
      { key: 'value', label: 'ค่าตัวเลข' },
      { key: 'desc', label: 'ความหมาย' },
    ],
    rows: [
      {
        rowId: 'row-john',
        cells: {
          param: { id: 'cell-p-john', value: 'รายได้ John (x)' },
          value: { id: 'cell-v-john', value: 35000, semantic: 'tp' },
          desc: { id: 'cell-d-john', value: 'จุดข้อมูลที่ต้องการวัด' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-mean',
        cells: {
          param: { id: 'cell-p-mean', value: 'ค่าเฉลี่ยประชากร (μ)' },
          value: { id: 'cell-v-mean', value: '90,833.33', semantic: 'neutral' },
          desc: { id: 'cell-d-mean', value: 'Mean ของลูกค้า 6 คน' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-sd',
        cells: {
          param: { id: 'cell-p-sd', value: 'ส่วนเบี่ยงเบนมาตรฐาน (σ)' },
          value: { id: 'cell-v-sd', value: '67,355.81', semantic: 'caution' },
          desc: { id: 'cell-d-sd', value: 'Population SD' },
        },
        isHighlighted: true,
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: ตั้งสมการ Z-Score',
      explanation: 'นำรายได้ของ John (35,000) ลบด้วยค่าเฉลี่ยกลุ่ม (90,833.33) แล้วหารด้วย SD (67,355.81)',
      katexDisplay: 'z = \\frac{\\htmlData{flip-id=token-x}{35,000} - \\htmlData{flip-id=token-mean}{90,833.33}}{\\htmlData{flip-id=token-sd}{67,355.81}}',
      sourceCellIds: ['cell-v-john', 'cell-v-mean', 'cell-v-sd'],
      targetTokenIds: ['token-x', 'token-mean', 'token-sd'],
      highlightStatus: 'tp',
      phoneticScript: 'ตั้งสมการ สามหมื่นห้าพัน ลบ เก้าหมื่นแปดร้อยสามสิบสามจุดสามสาม หารด้วย หกหมื่นเจ็ดพันสามร้อยห้าสิบห้าจุดแปดหนึ่ง',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: คำนวณผลต่างเศษ (Deviation from Mean)',
      explanation: '35,000 - 90,833.33 = -55,833.33 (ติดลบเพราะอยู่ต่ำกว่าค่าเฉลี่ย)',
      katexDisplay: 'z = \\frac{\\htmlData{flip-id=token-diff}{-55,833.33}}{\\htmlData{flip-id=token-sd}{67,355.81}}',
      targetTokenIds: ['token-diff', 'token-sd'],
      highlightStatus: 'invalid',
      phoneticScript: 'เศษได้ ลบห้าหมื่นห้าพันแปดร้อยสามสิบสามจุดสามสาม',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณค่า Z-Score และแปลความหมาย',
      explanation: 'ได้ผลลัพธ์ -0.8289 หรือประมาณ -0.83 แปลว่า รายได้ของ John อยู่ต่ำกว่าค่าเฉลี่ยกลุ่มเป็นระยะ 0.83 เท่าของส่วนเบี่ยงเบนมาตรฐาน',
      katexDisplay: 'z \\approx \\htmlData{flip-id=token-result}{\\mathbf{-0.83}}',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'Z-score ปรับ Mean เป็น 0 และ SD เป็น 1 แต่ "ไม่เปลี่ยน Shape หรือ Skewness" เดิมของข้อมูล!',
      phoneticScript: 'ผลลัพธ์ ซีสโกร์ ได้ ลบศูนย์จุดแปดสาม',
    },
  ],
  oneLineRule: 'Z-score บอกระยะห่างจาก Mean ในหน่วย SD โดยไม่เปลี่ยนรูปทรงการกระจายตัว',
};
