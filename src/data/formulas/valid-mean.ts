import type { FormulaAnimation } from '../../types/study';

export const validMeanFormula: FormulaAnimation = {
  id: 'valid-mean',
  name: 'Valid Mean Imputation',
  thaiName: 'การแทนค่าด้วยค่าเฉลี่ยที่ถูกต้อง (กฎ Clean Before Impute)',
  lectureRef: 'Lect 04.1 p29, p34',
  category: 'cleaning',
  isFinalFocus: false,
  baseFormulaLatex: '\\bar{X}_{\\text{valid}} = \\frac{\\sum X_{\\text{valid}}}{n_{\\text{valid}}}',
  description: 'การแทนค่า Missing Value ด้วยค่าเฉลี่ย กฎเหล็กของอาจารย์คือ: ต้องตรวจจับและตัด Known Invalid Errors (เช่น รายได้ติดลบ -40,000 หรือค่าขยะพิมพ์เกิน 904,000) ทิ้งก่อนคำนวณเสมอ',
  dataset: {
    headers: [
      { key: 'customer', label: 'รหัสลูกค้า' },
      { key: 'income', label: 'รายได้ที่บันทึก (บาท)' },
      { key: 'status', label: 'สถานะการตรวจสอบ' },
    ],
    rows: [
      {
        rowId: 'row-1001',
        cells: {
          customer: { id: 'cell-c1001', value: '1001' },
          income: { id: 'cell-inc-1001', value: 75000, semantic: 'tp' },
          status: { id: 'cell-st-1001', value: 'Valid (ข้อมูลปกติ)' },
        },
      },
      {
        rowId: 'row-1002',
        cells: {
          customer: { id: 'cell-c1002', value: '1002' },
          income: { id: 'cell-inc-1002', value: -40000, semantic: 'invalid' },
          status: { id: 'cell-st-1002', value: 'Known Invalid (ติดลบตัดทิ้ง!)', semantic: 'invalid' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-1004',
        cells: {
          customer: { id: 'cell-c1004', value: '1004' },
          income: { id: 'cell-inc-1004', value: 50000, semantic: 'tp' },
          status: { id: 'cell-st-1004', value: 'Valid (ข้อมูลปกติ)' },
        },
      },
      {
        rowId: 'row-1005',
        cells: {
          customer: { id: 'cell-c1005', value: '1005' },
          income: { id: 'cell-inc-1005', value: 99999, semantic: 'tp' },
          status: { id: 'cell-st-1005', value: 'Valid (รายได้จริง ไม่ใช่ค่าขยะ)' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: ตรวจจับและคัดกรองค่าที่เป็นขยะ (Detect & Filter)',
      explanation: 'รายได้ติดลบ (-40,000) เป็น Known Invalid ทางกายภาพ จึงต้องตัดออก คงเหลือเฉพาะค่า Valid 3 ค่า คือ 75,000, 50,000 และ 99,999 (n = 3)',
      katexDisplay: 'n_{\\text{valid}} = \\htmlData{flip-id=token-n}{3} \\quad (\\text{ตัด } \\htmlData{flip-id=token-inv}{-40,000} \\text{ ทิ้ง})',
      sourceCellIds: ['cell-inc-1002'],
      targetTokenIds: ['token-n', 'token-inv'],
      highlightStatus: 'invalid',
      phoneticScript: 'ขั้นตอนที่หนึ่ง คัดกรองค่าขยะ ตัด ลบสี่หมื่น ออก เหลือข้อมูลถูกต้อง สาม ค่า',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: ตั้งสมการรวมเฉพาะค่า Valid',
      explanation: 'นำ 75,000 + 50,000 + 99,999 หารด้วย 3 (ห้ามนำ -40,000 มารวม และห้ามหารด้วย 4)',
      katexDisplay: '\\bar{X} = \\frac{\\htmlData{flip-id=token-v1}{75,000} + \\htmlData{flip-id=token-v2}{50,000} + \\htmlData{flip-id=token-v3}{99,999}}{\\htmlData{flip-id=token-denom}{3}}',
      sourceCellIds: ['cell-inc-1001', 'cell-inc-1004', 'cell-inc-1005'],
      targetTokenIds: ['token-v1', 'token-v2', 'token-v3', 'token-denom'],
      highlightStatus: 'tp',
      phoneticScript: 'ตั้งสมการรวม เจ็ดหมื่นห้าพัน บวก ห้าหมื่น บวก เก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้า หารด้วย สาม',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณผลรวมเศษ',
      explanation: 'ผลรวมรายได้จริง = 224,999 บาท',
      katexDisplay: '\\bar{X} = \\frac{\\htmlData{flip-id=token-sum}{224,999}}{\\htmlData{flip-id=token-denom}{3}}',
      targetTokenIds: ['token-sum', 'token-denom'],
      highlightStatus: 'tp',
      phoneticScript: 'ผลรวมเศษได้ สองแสนสองหมื่นสี่พันเก้าร้อยเก้าสิบเก้า ส่วนด้วย สาม',
    },
    {
      stepIndex: 4,
      title: 'ขั้นตอนที่ 4: ได้ค่าแทนที่และบันทึก Flag',
      explanation: 'ได้ค่าเฉลี่ยประมาณ 75,000 บาท นำไปใส่ช่องว่าง และต้องบันทึก flag: income_imputed = 1',
      katexDisplay: '\\bar{X}_{\\text{valid}} \\approx \\htmlData{flip-id=token-result}{\\mathbf{75,000}} \\text{ บาท}',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      examTrapWarning: 'กับดัก Slide p34: ถ้ามี [20k, 32k, 44k, 904k] ถ้าคำนวณก่อนคลีนจะได้ 250k (ผิดมหันต์!) แต่ถ้าตัด 904k ออกก่อนจะได้ 32k (ถูกต้อง)',
      phoneticScript: 'ได้ค่าแทนที่ เจ็ดหมื่นห้าพันบาท พร้อมบันทึก แฟล็ก',
    },
  ],
  oneLineRule: 'คลีนค่าขยะ (-40k, 904k) ทิ้งก่อนคำนวณค่าเฉลี่ยเสมอ และต้องติด flag = 1',
};
