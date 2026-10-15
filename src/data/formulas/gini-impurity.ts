import type { FormulaAnimation } from '../../types/study';

export const giniImpurityFormula: FormulaAnimation = {
  id: 'gini-impurity',
  name: 'Gini Impurity (Single Node)',
  thaiName: 'ความไม่บริสุทธิ์ของโหนดเดี่ยว (จินี อิมเพียวริตี)',
  lectureRef: 'Lect 07 p11',
  category: 'tree',
  isFinalFocus: true,
  baseFormulaLatex: '\\text{Gini}(Node) = 1 - \\sum_{i=1}^{C} (p_i)^2',
  description: 'วัดระดับความคละกันของข้อมูลในโหนด หากทุกตัวอย่างเป็นคลาสเดียวกันหมด (Pure Node) Gini = 0 ถ้าคละกันเท่าๆ กัน 2 คลาส จะได้ค่าสูงสุด 0.500',
  dataset: {
    headers: [
      { key: 'cls', label: 'คลาสเป้าหมาย' },
      { key: 'count', label: 'จำนวนข้อมูลในโหนด' },
      { key: 'prob', label: 'สัดส่วนความน่าจะเป็น (p_i)' },
    ],
    rows: [
      {
        rowId: 'row-act',
        cells: {
          cls: { id: 'cell-c-act', value: 'Active' },
          count: { id: 'cell-n-act', value: 5, semantic: 'tp' },
          prob: { id: 'cell-p-act', value: '5/10 = 0.5', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-inact',
        cells: {
          cls: { id: 'cell-c-inact', value: 'Inactive' },
          count: { id: 'cell-n-inact', value: 5, semantic: 'caution' },
          prob: { id: 'cell-p-inact', value: '5/10 = 0.5', semantic: 'caution' },
        },
        isHighlighted: true,
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: ตั้งสมการ Gini ของโหนดแม่',
      explanation: 'สูตรคือ 1 ลบด้วยผลรวมของสัดส่วนแต่ละคลาสยกกำลังสอง: 1 - [(p_Active)^2 + (p_Inactive)^2]',
      katexDisplay: '\\text{Gini} = 1 - \\left( \\htmlData{flip-id=token-p1}{p_{\\text{Active}}}^2 + \\htmlData{flip-id=token-p2}{p_{\\text{Inactive}}}^2 \\right)',
      sourceCellIds: ['cell-p-act', 'cell-p-inact'],
      targetTokenIds: ['token-p1', 'token-p2'],
      highlightStatus: 'neutral',
      phoneticScript: 'กีนี เท่ากับ หนึ่ง ลบด้วย ผลบวกของความน่าจะเป็นแต่ละคลาสยกกำลังสอง',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: แทนค่าสัดส่วนจริง (5 ใน 10)',
      explanation: 'ทั้งสองคลาสมีสัดส่วนเท่ากันคือ 5/10 = 0.5',
      katexDisplay: '\\text{Gini} = 1 - \\left( \\htmlData{flip-id=token-p1}{(0.5)}^2 + \\htmlData{flip-id=token-p2}{(0.5)}^2 \\right)',
      sourceCellIds: ['cell-p-act', 'cell-p-inact'],
      targetTokenIds: ['token-p1', 'token-p2'],
      highlightStatus: 'tp',
      phoneticScript: 'แทนค่า หนึ่ง ลบด้วย ศูนย์จุดห้ายกกำลังสอง บวก ศูนย์จุดห้ายกกำลังสอง',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณผลลัพธ์',
      explanation: '1 - (0.25 + 0.25) = 1 - 0.50 = 0.500 (เป็นจุดที่มีความไม่บริสุทธิ์สูงสุดของการแบ่ง 2 คลาส)',
      katexDisplay: '\\text{Gini}(\\text{Parent}) = 1 - 0.50 = \\htmlData{flip-id=token-result}{\\mathbf{0.500}}',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'ถ้าโหนดมีแต่คลาสเดียว (Pure Node) เช่น Active 10, Inactive 0 จะได้ Gini = 1 - (1.0)^2 = 0',
      phoneticScript: 'ได้ค่า กีนี ของโหนดแม่ เท่ากับ ศูนย์จุดห้าศูนย์ศูนย์',
    },
  ],
  oneLineRule: 'Gini = 0 คือบริสุทธิ์ 100% (Pure Node), Gini = 0.5 คือคละกันมั่วสุด',
};
