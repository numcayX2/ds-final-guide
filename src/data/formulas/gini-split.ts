import type { FormulaAnimation } from '../../types/study';

export const giniSplitFormula: FormulaAnimation = {
  id: 'gini-split',
  name: 'Weighted Gini Split',
  thaiName: 'ความไม่บริสุทธิ์เฉลี่ยหลังแตกกิ่ง (ถ่วงน้ำหนักตามจำนวนข้อมูล)',
  lectureRef: 'Lect 07 p11',
  category: 'tree',
  isFinalFocus: true,
  baseFormulaLatex: '\\text{Gini}_{\\text{split}} = \\frac{n_L}{n} \\text{Gini}(L) + \\frac{n_R}{n} \\text{Gini}(R)',
  description: 'การคำนวณ Gini รวมของทั้งสองกิ่งย่อย (ซ้าย-ขวา) โดยถ่วงน้ำหนักตามสัดส่วนจำนวนข้อมูล เพื่อประเมินคุณภาพของ Candidate Split',
  dataset: {
    headers: [
      { key: 'branch', label: 'กิ่งย่อย (Branch)' },
      { key: 'count', label: 'จำนวนข้อมูล (n)' },
      { key: 'gini', label: 'Gini ของกิ่งนั้น' },
    ],
    rows: [
      {
        rowId: 'row-left',
        cells: {
          branch: { id: 'cell-b-left', value: 'Left Branch (กิ่งซ้าย)' },
          count: { id: 'cell-nl', value: 6, semantic: 'tp' },
          gini: { id: 'cell-gl', value: '0.278', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-right',
        cells: {
          branch: { id: 'cell-b-right', value: 'Right Branch (กิ่งขวา)' },
          count: { id: 'cell-nr', value: 4, semantic: 'tp' },
          gini: { id: 'cell-gr', value: '0.278', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-total',
        cells: {
          branch: { id: 'cell-b-total', value: 'Total Parent (โหนดแม่)' },
          count: { id: 'cell-nt', value: 10, semantic: 'neutral' },
          gini: { id: 'cell-gt', value: '0.500', semantic: 'neutral' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: ตั้งสมการถ่วงน้ำหนักสองกิ่ง',
      explanation: 'คูณ Gini ของแต่ละกิ่งด้วยสัดส่วนข้อมูลในกิ่งนั้น (n_L / n และ n_R / n)',
      katexDisplay: '\\text{Gini}_{\\text{split}} = \\frac{\\htmlData{flip-id=token-nl}{n_L}}{n} \\htmlData{flip-id=token-gl}{\\text{Gini}(L)} + \\frac{\\htmlData{flip-id=token-nr}{n_R}}{n} \\htmlData{flip-id=token-gr}{\\text{Gini}(R)}',
      sourceCellIds: ['cell-nl', 'cell-gl', 'cell-nr', 'cell-gr'],
      targetTokenIds: ['token-nl', 'token-gl', 'token-nr', 'token-gr'],
      highlightStatus: 'neutral',
      phoneticScript: 'ตั้งสมการถ่วงน้ำหนัก กิ่งซ้าย บวก กิ่งขวา',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: แทนค่าตัวเลข Candidate A',
      explanation: 'n_L = 6, n_R = 4, n = 10 โดยได้ค่า Gini ถ่วงน้ำหนักของ Candidate A',
      katexDisplay: '\\text{Gini}_{\\text{split}}(A) = \\frac{6}{10}(0.278) + \\frac{4}{10}(0.278)',
      highlightStatus: 'tp',
      phoneticScript: 'แทนค่าตัวเลข ได้ หกส่วนสิบ คูณ ศูนย์จุดสองเจ็ดแปด บวก สี่ส่วนสิบ คูณ ศูนย์จุดสองเจ็ดแปด',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: สรุปค่า Gini_split(A)',
      explanation: 'ได้ผลลัพธ์ Gini_split ของ Candidate A = 0.278 (ซึ่งลดลงจากเดิม 0.500)',
      katexDisplay: '\\text{Gini}_{\\text{split}}(A) = \\htmlData{flip-id=token-result}{\\mathbf{0.278}}',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'เป้าหมายของ Decision Tree คือหา Split ที่ทำให้ Gini_split "ต่ำที่สุดเท่าที่จะทำได้" (ยิ่งต่ำยิ่งบริสุทธิ์)',
      phoneticScript: 'ได้ กีนี สปลิต ของ แคนดิเดต เอ เท่ากับ ศูนย์จุดสองเจ็ดแปด',
    },
  ],
  oneLineRule: 'Gini Split ยิ่งต่ำยิ่งดี เพราะแปลว่าลูกทั้งสองกิ่งมีความบริสุทธิ์สูง',
};
