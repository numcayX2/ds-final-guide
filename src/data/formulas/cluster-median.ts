import type { FormulaAnimation } from '../../types/study';

export const clusterMedianFormula: FormulaAnimation = {
  id: 'cluster-median',
  name: 'Cluster-based Median Imputation',
  thaiName: 'การแทนค่าด้วยมัธยฐานในกลุ่มคลัสเตอร์',
  lectureRef: 'Lect 04.1 p32',
  category: 'cleaning',
  isFinalFocus: false,
  baseFormulaLatex: 'Y_{\\text{imputed}} = \\text{Median}(Y_{C_k})',
  description: 'การนำแถวที่ข้อมูลแหว่งไปจัดกลุ่ม (Cluster) ด้วยตัวแปรอื่นก่อน แล้วใช้มัธยฐานเฉพาะกลุ่ม (Local Median) มาแทนค่าเพื่อลดความเบ้ของ Outliers',
  dataset: {
    headers: [
      { key: 'point', label: 'จุดข้อมูลใน C2' },
      { key: 'yVal', label: 'ค่าตัวแปร Y' },
      { key: 'rank', label: 'อันดับหลังเรียง' },
    ],
    rows: [
      {
        rowId: 'row-pt2',
        cells: {
          point: { id: 'cell-p2', value: 'Point 2' },
          yVal: { id: 'cell-y2', value: 42, semantic: 'neutral' },
          rank: { id: 'cell-r2', value: 'อันดับ 1' },
        },
      },
      {
        rowId: 'row-pt4',
        cells: {
          point: { id: 'cell-p4', value: 'Point 4' },
          yVal: { id: 'cell-y4', value: 47, semantic: 'tp' },
          rank: { id: 'cell-r4', value: 'อันดับ 2 (ตัวกลางล่าง)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-pt1',
        cells: {
          point: { id: 'cell-p1', value: 'Point 1' },
          yVal: { id: 'cell-y1', value: 48, semantic: 'tp' },
          rank: { id: 'cell-r1', value: 'อันดับ 3 (ตัวกลางบน)' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-pt3',
        cells: {
          point: { id: 'cell-p3', value: 'Point 3' },
          yVal: { id: 'cell-y3', value: 51, semantic: 'neutral' },
          rank: { id: 'cell-r3', value: 'อันดับ 4' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: ดึงและเรียงลำดับข้อมูล Y ในคลัสเตอร์ C2',
      explanation: 'ข้อมูลดิบใน C2 มี 4 จุด คือ [48, 42, 51, 47] นำมาเรียงจากน้อยไปมาก: [42, 47, 48, 51]',
      katexDisplay: 'Y_{C_2} = [42, \\htmlData{flip-id=token-m1}{47}, \\htmlData{flip-id=token-m2}{48}, 51]',
      sourceCellIds: ['cell-y4', 'cell-y1'],
      targetTokenIds: ['token-m1', 'token-m2'],
      highlightStatus: 'tp',
      phoneticScript: 'เรียงลำดับข้อมูล สี่สิบสอง สี่สิบเจ็ด สี่สิบแปด และ ห้าสิบเอ็ด',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: หามัธยฐาน (กรณี n เป็นเลขคู่)',
      explanation: 'เนื่องจากมี 4 ตัว (เลขคู่) จึงนำค่าตรงกลาง 2 ตัว (47 และ 48) มาบวกกันแล้วหารด้วย 2',
      katexDisplay: '\\text{Median} = \\frac{\\htmlData{flip-id=token-m1}{47} + \\htmlData{flip-id=token-m2}{48}}{\\htmlData{flip-id=token-div}{2}}',
      sourceCellIds: ['cell-y4', 'cell-y1'],
      targetTokenIds: ['token-m1', 'token-m2', 'token-div'],
      highlightStatus: 'tp',
      phoneticScript: 'นำตัวกลางสองตัว สี่สิบเจ็ด บวก สี่สิบแปด หารด้วย สอง',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: สรุปค่าแทนที่',
      explanation: 'ได้ค่า Y ที่จะนำไปแทนที่ใน Record A เท่ากับ 47.5 พร้อมบันทึก Y_imputed = 1',
      katexDisplay: 'Y_{\\text{Record A}} = \\htmlData{flip-id=token-result}{\\mathbf{47.5}}',
      targetTokenIds: ['token-result'],
      highlightStatus: 'success',
      phoneticScript: 'ผลลัพธ์มัธยฐาน ได้ สี่สิบเจ็ดจุดห้า',
    },
  ],
  oneLineRule: 'Cluster-Median ใช้ค่ามัธยฐานในกลุ่มย่อยเพื่อต้านทานความเบ้และ Outliers',
};
