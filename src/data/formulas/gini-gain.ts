import type { FormulaAnimation } from '../../types/study';

export const giniGainFormula: FormulaAnimation = {
  id: 'gini-gain',
  name: 'Gini Gain (Candidate Split Selection)',
  thaiName: 'การลดลงของความไม่บริสุทธิ์ (การเลือกจุดตัดกิ่งที่ดีที่สุด)',
  lectureRef: 'Lect 07 p12',
  category: 'tree',
  isFinalFocus: true,
  baseFormulaLatex: '\\text{Gini Gain} = \\text{Gini}(\\text{Parent}) - \\text{Gini}_{\\text{split}}',
  description: 'การตัดสินใจเลือกกิ่งที่ดีที่สุดในสไลด์อาจารย์ โดยนำ Gini ของโหนดแม่ ลบด้วย Gini ถ่วงน้ำหนักหลังตัดกิ่ง เพื่อเปรียบเทียบ Candidate A และ Candidate B',
  dataset: {
    headers: [
      { key: 'cand', label: 'Candidate Split' },
      { key: 'parent', label: 'Gini(Parent)' },
      { key: 'split', label: 'Gini_split' },
      { key: 'decision', label: 'ผลการคัดเลือก' },
    ],
    rows: [
      {
        rowId: 'row-cand-a',
        cells: {
          cand: { id: 'cell-c-a', value: 'Candidate A (Feature 1)' },
          parent: { id: 'cell-pa-a', value: '0.500', semantic: 'neutral' },
          split: { id: 'cell-sp-a', value: '0.278', semantic: 'tp' },
          decision: { id: 'cell-de-a', value: 'Selected! (Gain = 0.222 ชนะเลิศ)', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-cand-b',
        cells: {
          cand: { id: 'cell-c-b', value: 'Candidate B (Feature 2)' },
          parent: { id: 'cell-pa-b', value: '0.500', semantic: 'neutral' },
          split: { id: 'cell-sp-b', value: '0.444', semantic: 'invalid' },
          decision: { id: 'cell-de-b', value: 'Rejected (Gain = 0.056 แพ้)', semantic: 'invalid' },
        },
        isHighlighted: true,
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: ตั้งสูตรคำนวณ Gini Gain ของ Candidate A',
      explanation: 'Gini Gain = Gini(Parent) - Gini_split(A) = 0.500 - 0.278',
      katexDisplay: '\\text{Gain}(A) = \\htmlData{flip-id=token-pa}{0.500} - \\htmlData{flip-id=token-spa}{0.278} = \\htmlData{flip-id=token-ga}{\\mathbf{0.222}}',
      sourceCellIds: ['cell-pa-a', 'cell-sp-a'],
      targetTokenIds: ['token-pa', 'token-spa', 'token-ga'],
      highlightStatus: 'tp',
      phoneticScript: 'แคนดิเดต เอ ศูนย์จุดห้าศูนย์ศูนย์ ลบ ศูนย์จุดสองเจ็ดแปด ได้ เกน เท่ากับ ศูนย์จุดสองสองสอง',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: ตั้งสูตรคำนวณ Gini Gain ของ Candidate B',
      explanation: 'Gini Gain = Gini(Parent) - Gini_split(B) = 0.500 - 0.444',
      katexDisplay: '\\text{Gain}(B) = \\htmlData{flip-id=token-pb}{0.500} - \\htmlData{flip-id=token-spb}{0.444} = \\htmlData{flip-id=token-gb}{\\mathbf{0.056}}',
      sourceCellIds: ['cell-pa-b', 'cell-sp-b'],
      targetTokenIds: ['token-pb', 'token-spb', 'token-gb'],
      highlightStatus: 'caution',
      phoneticScript: 'แคนดิเดต บี ศูนย์จุดห้าศูนย์ศูนย์ ลบ ศูนย์จุดสี่สี่สี่ ได้ เกน เท่ากับ ศูนย์จุดศูนย์ห้าหก',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: เปรียบเทียบและตัดสินใจ (Decision Rule)',
      explanation: 'Gain(A) = 0.222 ชนะ Gain(B) = 0.056 อย่างชัดเจน จึงเลือก Candidate A สำหรับสร้างกิ่งของ Decision Tree',
      katexDisplay: '\\htmlData{flip-id=token-ga}{0.222} > \\htmlData{flip-id=token-gb}{0.056} \\implies \\htmlData{flip-id=token-result}{\\text{เลือก Candidate A}}',
      targetTokenIds: ['token-ga', 'token-gb', 'token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'ข้อสอบชอบออกเปรียบเทียบ: จำไว้ว่าเราต้องเลือก Candidate ที่ให้ "Gini Gain สูงสุด" หรือทำให้ "Gini_split ต่ำสุด"!',
      phoneticScript: 'ศูนย์จุดสองสองสอง มากกว่า ศูนย์จุดศูนย์ห้าหก ตัดสินใจเลือก แคนดิเดต เอ',
    },
  ],
  oneLineRule: 'เลือกกิ่งที่ให้ Gini Gain สูงสุด (0.222 ชนะ 0.056)',
};
