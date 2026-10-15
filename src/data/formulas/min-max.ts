import type { FormulaAnimation } from '../../types/study';

export const minMaxFormula: FormulaAnimation = {
  id: 'min-max',
  name: 'Min-Max Normalization',
  thaiName: 'การแปลงค่าตัวเลขสู่ช่วงใหม่ [new_min, new_max]',
  lectureRef: 'Lect 04.2 p19, p20',
  category: 'scaling',
  isFinalFocus: false,
  baseFormulaLatex: "x' = \\frac{x - \\min}{\\max - \\min} \\times (\\text{new\\_max} - \\text{new\\_min}) + \\text{new\\_min}",
  description: 'การแปลงสเกลตัวแปรให้อยู่ในช่วงที่กำหนดอย่างแม่นยำ ตัวอย่างอาจารย์: แปลงรายได้ของ Rachel (50,000) สู่ช่วง [0, 9] โดยมี min=35,000 และ max=200,000',
  dataset: {
    headers: [
      { key: 'param', label: 'พารามิเตอร์' },
      { key: 'value', label: 'ค่าตัวเลข' },
      { key: 'note', label: 'หมายเหตุ' },
    ],
    rows: [
      {
        rowId: 'row-x',
        cells: {
          param: { id: 'cell-p-x', value: 'ค่าตั้งต้น (Rachel x)' },
          value: { id: 'cell-v-x', value: 50000, semantic: 'tp' },
          note: { id: 'cell-n-x', value: 'รายได้ลูกค้า Rachel' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-min',
        cells: {
          param: { id: 'cell-p-min', value: 'ค่าต่ำสุด (min)' },
          value: { id: 'cell-v-min', value: 35000, semantic: 'caution' },
          note: { id: 'cell-n-min', value: 'คำนวณจากชุด Train' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-max',
        cells: {
          param: { id: 'cell-p-max', value: 'ค่าสูงสุด (max)' },
          value: { id: 'cell-v-max', value: 200000, semantic: 'caution' },
          note: { id: 'cell-n-max', value: 'คำนวณจากชุด Train' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-range',
        cells: {
          param: { id: 'cell-p-rng', value: 'ช่วงใหม่ [new_min, new_max]' },
          value: { id: 'cell-v-rng', value: '[0, 9]', semantic: 'neutral' },
          note: { id: 'cell-n-rng', value: 'สเกล 0 ถึง 9' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: คำนวณระยะห่างสัมพัทธ์ (x - min) และ (max - min)',
      explanation: '50,000 - 35,000 = 15,000 และ 200,000 - 35,000 = 165,000',
      katexDisplay: "\\frac{x - \\min}{\\max - \\min} = \\frac{\\htmlData{flip-id=token-diff}{15,000}}{\\htmlData{flip-id=token-range}{165,000}} = \\frac{1}{11} \\approx \\htmlData{flip-id=token-ratio}{0.0909}",
      sourceCellIds: ['cell-v-x', 'cell-v-min', 'cell-v-max'],
      targetTokenIds: ['token-diff', 'token-range', 'token-ratio'],
      highlightStatus: 'tp',
      phoneticScript: 'หาอัตราส่วน ได้ หนึ่งหมื่นห้าพัน หาร หนึ่งแสนหกหมื่นห้าพัน เท่ากับ เศษหนึ่งส่วนสิบเอ็ด',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: คูณความกว้างช่วงใหม่ (9 - 0) และบวก new_min (0)',
      explanation: 'นำสัดส่วน 1/11 ไปคูณด้วย 9 และบวกด้วย 0',
      katexDisplay: "x' = \\htmlData{flip-id=token-ratio}{0.090909} \\times (\\htmlData{flip-id=token-newmax}{9} - 0) + 0",
      targetTokenIds: ['token-ratio', 'token-newmax'],
      highlightStatus: 'tp',
      phoneticScript: 'คูณด้วยความกว้างช่วงใหม่ คือ เก้า ลบ ศูนย์',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณค่าสุดท้าย',
      explanation: '0.090909 * 9 = 0.8181... ปัดเศษทศนิยมได้ 0.82',
      katexDisplay: "x' \\approx \\htmlData{flip-id=token-result}{\\mathbf{0.82}}",
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'กฎป้องกัน Data Leakage (p27): ค่า min (35k) และ max (200k) ต้อง Fit จาก Train Set เท่านั้น ห้ามเอา Test Set มารวมคำนวณเด็ดขาด!',
      phoneticScript: 'ผลลัพธ์สุดท้าย ได้ประมาณ ศูนย์จุดแปดสอง',
    },
  ],
  oneLineRule: 'Min-Max ควบคุมกรอบตัวเลขได้สมบูรณ์ แต่ไวต่อค่า Outliers มาก',
};
