import type { FormulaAnimation } from '../../types/study';

export const silhouetteScoreFormula: FormulaAnimation = {
  id: 'silhouette-score',
  name: 'Silhouette Score',
  thaiName: 'การประเมินคุณภาพคลัสเตอร์ (ซิลูเอต สโกร์)',
  lectureRef: 'Lect 08 p36-37',
  category: 'clustering',
  isFinalFocus: true,
  baseFormulaLatex: 's(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}',
  description: 'วัดความแน่นหนาในกลุ่มเดียวกัน (a(i)) เทียบกับความห่างจากกลุ่มเพื่อนบ้านที่ใกล้ที่สุด (b(i)) มีช่วงคะแนนตั้งแต่ -1 ถึง +1 โดยยิ่งใกล้ +1 แปลว่าจัดกลุ่มได้สมบูรณ์แบบ',
  dataset: {
    headers: [
      { key: 'param', label: 'พารามิเตอร์ระยะทาง' },
      { key: 'val', label: 'ค่าเฉลี่ยระยะทาง' },
      { key: 'meaning', label: 'ความหมายเชิงเรขาคณิต' },
    ],
    rows: [
      {
        rowId: 'row-ai',
        cells: {
          param: { id: 'cell-p-ai', value: 'a(i) (Intra-cluster distance)' },
          val: { id: 'cell-v-ai', value: '1.20', semantic: 'tp' },
          meaning: { id: 'cell-m-ai', value: 'ระยะทางเฉลี่ยไปยังจุดอื่นในกลุ่มเดียวกัน (ยิ่งน้อยยิ่งแน่น)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-bi',
        cells: {
          param: { id: 'cell-p-bi', value: 'b(i) (Inter-cluster distance)' },
          val: { id: 'cell-v-bi', value: '4.80', semantic: 'tp' },
          meaning: { id: 'cell-m-bi', value: 'ระยะทางเฉลี่ยไปยังจุดในกลุ่มข้างเคียงที่ใกล้ที่สุด (ยิ่งมากยิ่งห่าง)' },
        },
        isHighlighted: true,
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: ตั้งสูตร Silhouette Coefficient',
      explanation: 'เศษคือ b(i) - a(i) และส่วนคือค่าที่มากที่สุดระหว่าง a(i) กับ b(i)',
      katexDisplay: 's(i) = \\frac{\\htmlData{flip-id=token-bi}{b(i)} - \\htmlData{flip-id=token-ai}{a(i)}}{\\max(\\htmlData{flip-id=token-ai-denom}{a(i)}, \\htmlData{flip-id=token-bi-denom}{b(i)})}',
      sourceCellIds: ['cell-v-ai', 'cell-v-bi'],
      targetTokenIds: ['token-bi', 'token-ai', 'token-ai-denom', 'token-bi-denom'],
      highlightStatus: 'neutral',
      phoneticScript: 'ซิลูเอต สโกร์ เท่ากับ บี ไอ ลบ เอ ไอ ส่วนด้วย ค่าแม็กซ์ของ เอไอ กับ บีไอ',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: แทนค่าตัวเลขตัวอย่าง',
      explanation: 'a(i) = 1.20 และ b(i) = 4.80 ค่าสูงสุดในตัวส่วนคือ max(1.20, 4.80) = 4.80',
      katexDisplay: 's(i) = \\frac{\\htmlData{flip-id=token-bi}{4.80} - \\htmlData{flip-id=token-ai}{1.20}}{\\htmlData{flip-id=token-max}{4.80}}',
      sourceCellIds: ['cell-v-ai', 'cell-v-bi'],
      targetTokenIds: ['token-bi', 'token-ai', 'token-max'],
      highlightStatus: 'tp',
      phoneticScript: 'แทนค่า สี่จุดแปดศูนย์ ลบ หนึ่งจุดสองศูนย์ ส่วนด้วย สี่จุดแปดศูนย์',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณผลลัพธ์คะแนน',
      explanation: '3.60 / 4.80 = 0.75 แปลว่าจุดนี้ถูกจัดเข้ากลุ่มได้อย่างยอดเยี่ยม (Well Clustered)',
      katexDisplay: 's(i) = \\frac{3.60}{4.80} = \\htmlData{flip-id=token-result}{\\mathbf{+0.75}}',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'เกณฑ์ตัดสิน: ใกล้ +1 แปลว่ากลุ่มเกาะกันแน่นและห่างจากกลุ่มอื่นชัดเจน, ใกล้ 0 แปลว่าอยู่คาบเกี่ยวรอยต่อ, ติดลบ (< 0) แปลว่าน่าจะอยู่ผิดกลุ่ม!',
      phoneticScript: 'ผลลัพธ์สุดท้าย ได้ บวกศูนย์จุดเจ็ดห้า',
    },
  ],
  oneLineRule: 'Silhouette [-1, +1]: ใกล้ +1 คือดีเลิศ, 0 คือรอยต่อ, ติดลบคืออยู่ผิดกลุ่ม',
};
