import type { FormulaAnimation } from '../../types/study';

export const tukeyFencesFormula: FormulaAnimation = {
  id: 'tukey-fences',
  name: "Tukey's Outlier Fences (IQR Rule)",
  thaiName: 'การตรวจจับ Outlier ด้วยรั้วของทูคีย์และช่วงไอคิวอาร์',
  lectureRef: 'Lect 05 p17',
  category: 'eda',
  isFinalFocus: true,
  baseFormulaLatex: '\\text{IQR} = Q_3 - Q_1, \\quad \\text{Upper} = Q_3 + 1.5 \\times \\text{IQR}',
  description: 'การกำหนดรั้วบน (Upper Fence) และรั้วล่าง (Lower Fence) เพื่อคัดกรอง Potential Outliers ตัวอย่างโจทย์จริง: Q1 = 30, Q3 = 70 ตรวจสอบว่า x = 140 เป็น Outlier หรือไม่',
  dataset: {
    headers: [
      { key: 'param', label: 'พารามิเตอร์ควอร์ไทล์' },
      { key: 'val', label: 'ค่าตัวเลข' },
      { key: 'desc', label: 'คำอธิบาย' },
    ],
    rows: [
      {
        rowId: 'row-q1',
        cells: {
          param: { id: 'cell-p-q1', value: 'First Quartile (Q1)' },
          val: { id: 'cell-v-q1', value: 30, semantic: 'neutral' },
          desc: { id: 'cell-d-q1', value: 'เปอร์เซ็นไทล์ที่ 25' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-q3',
        cells: {
          param: { id: 'cell-p-q3', value: 'Third Quartile (Q3)' },
          val: { id: 'cell-v-q3', value: 70, semantic: 'neutral' },
          desc: { id: 'cell-d-q3', value: 'เปอร์เซ็นไทล์ที่ 75' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-test',
        cells: {
          param: { id: 'cell-p-x', value: 'จุดที่ต้องการตรวจ (x)' },
          val: { id: 'cell-v-x', value: 140, semantic: 'caution' },
          desc: { id: 'cell-d-x', value: 'ค่าที่สงสัยว่าเป็น Outlier' },
        },
        isHighlighted: true,
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: คำนวณช่วง Interquartile Range (IQR)',
      explanation: 'IQR คือความกว้างของ 50% ตรงกลาง: Q3 - Q1 = 70 - 30 = 40',
      katexDisplay: '\\text{IQR} = \\htmlData{flip-id=token-q3}{70} - \\htmlData{flip-id=token-q1}{30} = \\htmlData{flip-id=token-iqr}{\\mathbf{40}}',
      sourceCellIds: ['cell-v-q3', 'cell-v-q1'],
      targetTokenIds: ['token-q3', 'token-q1', 'token-iqr'],
      highlightStatus: 'tp',
      phoneticScript: 'หา ไอคิวอาร์ เจ็ดสิบ ลบ สามสิบ ได้ สี่สิบ',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: คำนวณรั้วบน (Upper Fence)',
      explanation: 'รั้วบน = Q3 + (1.5 * IQR) = 70 + (1.5 * 40) = 70 + 60 = 130',
      katexDisplay: '\\text{Upper Fence} = 70 + 1.5 \\times \\htmlData{flip-id=token-iqr}{40} = 70 + 60 = \\htmlData{flip-id=token-upper}{\\mathbf{130}}',
      targetTokenIds: ['token-iqr', 'token-upper'],
      highlightStatus: 'caution',
      phoneticScript: 'คำนวณรั้วบน เจ็ดสิบ บวก หนึ่งจุดห้าคูณสี่สิบ ได้ หนึ่งร้อยสามสิบ',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณรั้วล่าง (Lower Fence)',
      explanation: 'รั้วล่าง = Q1 - (1.5 * IQR) = 30 - 60 = -30',
      katexDisplay: '\\text{Lower Fence} = 30 - 1.5 \\times \\htmlData{flip-id=token-iqr}{40} = 30 - 60 = \\htmlData{flip-id=token-lower}{\\mathbf{-30}}',
      targetTokenIds: ['token-iqr', 'token-lower'],
      highlightStatus: 'caution',
      phoneticScript: 'คำนวณรั้วล่าง สามสิบ ลบ หกสิบ ได้ ลบสามสิบ',
    },
    {
      stepIndex: 4,
      title: 'ขั้นตอนที่ 4: ตัดสินจุดข้อมูล x = 140',
      explanation: 'เนื่องจาก x = 140 มีค่ามากกว่า Upper Fence (130) จึงสรุปได้ว่าเป็น Potential Outlier!',
      katexDisplay: 'x = \\htmlData{flip-id=token-x}{140} > \\htmlData{flip-id=token-upper}{130} \\implies \\htmlData{flip-id=token-result}{\\text{Potential Outlier}}',
      sourceCellIds: ['cell-v-x'],
      targetTokenIds: ['token-x', 'token-upper', 'token-result'],
      highlightStatus: 'invalid',
      examTrapWarning: 'กับดักสำคัญ: Potential Outlier != Error! การพบ Outlier เป็นการส่งสัญญาณให้ตรวจสอบ (Screening) ไม่ใช่คำสั่งให้ลบทิ้งทันที และเส้น Whisker ใน Boxplot จะลากถึงค่าจริงตัวสุดท้ายที่อยู่ในรั้ว ไม่ใช่ตัว Fence',
      phoneticScript: 'หนึ่งร้อยสี่สิบ มากกว่า หนึ่งร้อยสามสิบ สรุปว่าเป็น เอาต์ไลเออร์',
    },
  ],
  oneLineRule: 'หลุดรั้ว [Q1 - 1.5*IQR, Q3 + 1.5*IQR] = Potential Outlier (ตรวจก่อน ห้ามลบมั่ว)',
};
