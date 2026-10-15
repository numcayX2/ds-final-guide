import type { FormulaAnimation } from '../../types/study';

export const kmeansDistanceCentroidFormula: FormulaAnimation = {
  id: 'kmeans-distance-centroid',
  name: 'K-Means: Distance & Centroid Update',
  thaiName: 'การจัดกลุ่ม K-Means รอบที่ 1 และการคำนวณ Centroid ใหม่',
  lectureRef: 'Lect 08 p25-31',
  category: 'clustering',
  isFinalFocus: true,
  baseFormulaLatex: 'd_1(X, Y) = |x_1 - y_1| + |x_2 - y_2|, \\quad C_k^{new} = \\left( \\frac{\\sum x_1}{m}, \\frac{\\sum x_2}{m} \\right)',
  description: 'ตัวอย่างข้อสอบจริงในห้องเรียน: จุดข้อมูล 8 จุด (A1 ถึง A8) เริ่มต้นด้วย Centroid 3 จุด C1(2,10), C2(5,8), C3(1,2) จัดกลุ่มด้วย Manhattan Distance แล้วหาพิกัด Centroid ใหม่',
  dataset: {
    headers: [
      { key: 'pt', label: 'จุดข้อมูล (Point)' },
      { key: 'coord', label: 'พิกัด (x1, x2)' },
      { key: 'cluster', label: 'กลุ่มที่จัดได้ (รอบที่ 1)' },
    ],
    rows: [
      {
        rowId: 'row-a1',
        cells: {
          pt: { id: 'cell-p-a1', value: 'A1' },
          coord: { id: 'cell-c-a1', value: '(2, 10)' },
          cluster: { id: 'cell-cl-a1', value: 'Cluster 1 (มีเฉพาะ A1)' },
        },
      },
      {
        rowId: 'row-a3',
        cells: {
          pt: { id: 'cell-p-a3', value: 'A3' },
          coord: { id: 'cell-c-a3', value: '(8, 4)', semantic: 'tp' },
          cluster: { id: 'cell-cl-a3', value: 'Cluster 2', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-a4',
        cells: {
          pt: { id: 'cell-p-a4', value: 'A4' },
          coord: { id: 'cell-c-a4', value: '(5, 8)', semantic: 'tp' },
          cluster: { id: 'cell-cl-a4', value: 'Cluster 2', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-a5',
        cells: {
          pt: { id: 'cell-p-a5', value: 'A5' },
          coord: { id: 'cell-c-a5', value: '(7, 5)', semantic: 'tp' },
          cluster: { id: 'cell-cl-a5', value: 'Cluster 2', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-a6',
        cells: {
          pt: { id: 'cell-p-a6', value: 'A6' },
          coord: { id: 'cell-c-a6', value: '(6, 4)', semantic: 'tp' },
          cluster: { id: 'cell-cl-a6', value: 'Cluster 2', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-a8',
        cells: {
          pt: { id: 'cell-p-a8', value: 'A8' },
          coord: { id: 'cell-c-a8', value: '(4, 9)', semantic: 'tp' },
          cluster: { id: 'cell-cl-a8', value: 'Cluster 2', semantic: 'tp' },
        },
        isHighlighted: true,
      },
      {
        rowId: 'row-a2',
        cells: {
          pt: { id: 'cell-p-a2', value: 'A2' },
          coord: { id: 'cell-c-a2', value: '(2, 5)', semantic: 'caution' },
          cluster: { id: 'cell-cl-a2', value: 'Cluster 3 (A2, A7)', semantic: 'caution' },
        },
      },
      {
        rowId: 'row-a7',
        cells: {
          pt: { id: 'cell-p-a7', value: 'A7' },
          coord: { id: 'cell-c-a7', value: '(1, 2)', semantic: 'caution' },
          cluster: { id: 'cell-cl-a7', value: 'Cluster 3 (A2, A7)', semantic: 'caution' },
        },
      },
    ],
  },
  steps: [
    {
      stepIndex: 1,
      title: 'ขั้นตอนที่ 1: จัดกลุ่มรอบแรกด้วย Manhattan Distance',
      explanation: 'คำนวณระยะทางสัมบูรณ์ |x1-c1| + |x2-c2|: พบว่า Cluster 2 ได้สมาชิก 5 จุด คือ {A3, A4, A5, A6, A8}',
      katexDisplay: '\\text{Cluster 2} = \\{ \\htmlData{flip-id=token-pts}{A_3(8,4), A_4(5,8), A_5(7,5), A_6(6,4), A_8(4,9)} \\}',
      sourceCellIds: ['cell-c-a3', 'cell-c-a4', 'cell-c-a5', 'cell-c-a6', 'cell-c-a8'],
      targetTokenIds: ['token-pts'],
      highlightStatus: 'tp',
      phoneticScript: 'คลัสเตอร์สอง ประกอบด้วยสมาชิก ห้าจุด ได้แก่ เอสาม เอสี่ เอห้า เอหก และ เอแปด',
    },
    {
      stepIndex: 2,
      title: 'ขั้นตอนที่ 2: ตั้งสมการคำนวณ New Centroid ของ Cluster 2 (หาค่าเฉลี่ย x1 และ x2)',
      explanation: 'นำพิกัดแกน x1 ทั้ง 5 จุดมารวมกันหาร 5 และแกน x2 ทั้ง 5 จุดมารวมกันหาร 5',
      katexDisplay: 'C_2^{\\text{new}} = \\left( \\frac{\\htmlData{flip-id=token-sumx}{8+5+7+6+4}}{\\htmlData{flip-id=token-m}{5}}, \\frac{\\htmlData{flip-id=token-sumy}{4+8+5+4+9}}{\\htmlData{flip-id=token-m2}{5}} \\right)',
      targetTokenIds: ['token-sumx', 'token-sumy', 'token-m', 'token-m2'],
      highlightStatus: 'tp',
      phoneticScript: 'หาค่าเฉลี่ยแกนเอ็กซ์หนึ่ง และแกนเอ็กซ์สอง นำมาหารด้วย ห้า',
    },
    {
      stepIndex: 3,
      title: 'ขั้นตอนที่ 3: คำนวณผลรวมพิกัด',
      explanation: 'แกน x1 รวมได้ 30/5 และแกน x2 รวมได้ 30/5',
      katexDisplay: 'C_2^{\\text{new}} = \\left( \\frac{30}{5}, \\frac{30}{5} \\right) = \\htmlData{flip-id=token-c2}{\\mathbf{(6, 6)}}',
      targetTokenIds: ['token-c2'],
      highlightStatus: 'success',
      phoneticScript: 'แกนแรกได้ สามสิบส่วนห้า แกนสองได้ สามสิบส่วนห้า พิกัดเซนทรอยด์ใหม่คือ หก คอมม่า หก',
    },
    {
      stepIndex: 4,
      title: 'ขั้นตอนที่ 4: สรุปพิกัด Centroid รอบถัดไปครบทั้ง 3 กลุ่ม',
      explanation: 'C1_new = (2, 10), C2_new = (6, 6), C3_new = ((2+1)/2, (5+2)/2) = (1.5, 3.5)',
      katexDisplay: 'C_1^{\\text{new}} = (2, 10), \\quad \\htmlData{flip-id=token-c2}{C_2^{\\text{new}} = (6, 6)}, \\quad \\htmlData{flip-id=token-c3}{C_3^{\\text{new}} = (1.5, 3.5)}',
      targetTokenIds: ['token-c2', 'token-c3'],
      highlightStatus: 'success',
      examTrapWarning: 'กับดักมหันต์ในข้อสอบ: ในห้องเรียนอาจารย์ Assign จุดด้วย Manhattan Distance (|x-c|) แต่สูตร Inertia/WCSS ตามทฤษฎีใช้ Squared Euclidean (||x-c||^2) ห้ามปนกัน!',
      phoneticScript: 'สรุปพิกัด เซนทรอยด์รอบถัดไปครบทั้งสามคลัสเตอร์',
    },
  ],
  oneLineRule: 'Assign ด้วย Manhattan แต่ Inertia คำนวณด้วย Squared Euclidean!',
};
