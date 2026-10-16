import type { StudyModule } from '../../types/study';

export const module04EdaOutliers: StudyModule = {
  id: 'module-04-eda-outliers',
  moduleNumber: '04',
  title: 'Exploratory Data Analysis (EDA) & Outliers',
  titleEn: 'EDA & Tukey Outlier Fences',
  lectureCode: 'Lect 05 p04–22',
  isFinalFocus: true,
  timeEstimateMinutes: 20,
  quickSummary: 'บทบาทของ EDA ในการชี้แนะแนวทางสร้างโมเดล (Informs modeling decisions), การเลือกกราฟให้ตรงจุดประสงค์ และการคำนวณรั้ว Tukey (1.5 × IQR) พร้อมกฎเหล็กเส้นหนวด Boxplot',
  coreFormulas: ['tukey-fences'],
  examTraps: [
    {
      trapTitle: 'บทบาทของ EDA ต่อขั้นตอนการสร้างโมเดล',
      trapDescription: 'ข้อสอบหลอกว่า EDA ทำหน้าที่ตัดสินใจเลือกอัลกอริทึม (Candidate Model) ที่ดีที่สุดให้อัตโนมัติ',
      correctApproach: 'EDA ทำหน้าที่ "Informs modeling decisions" (ให้สารสนเทศเพื่อชี้แนะแนวทาง เช่น พบความเบ้หรือพบ Outlier) แต่ "not automatically selects algorithm" (ไม่ได้เลือกโมเดลให้อัตโนมัติ)',
      slideRef: 'Lect 05 p04',
    },
    {
      trapTitle: 'เส้นหนวดของ Boxplot (Whisker Rule)',
      trapDescription: 'เข้าใจผิดว่าเส้นหนวด (Whisker) ของ Boxplot ลากยาวไปหยุดที่ค่าคำนวณรั้ว Lower Fence หรือ Upper Fence พอดี',
      correctApproach: 'เส้น Whisker จะลากไปหยุดที่ "ค่าข้อมูลจริงที่มีอยู่จริงในชุดข้อมูลซึ่งไม่เกินรั้ว" (Most extreme data point within fence) เท่านั้น ส่วนเส้น Fence เป็นเพียงเส้นแบ่งเขตสมมติ!',
      slideRef: 'Lect 05 p17–18',
    },
    {
      trapTitle: 'Potential Outlier ไม่เท่ากับ Error (ห้ามลบทิ้งทันที!)',
      trapDescription: 'เมื่อคำนวณพบค่าที่อยู่นอกรั้ว Tukey แล้วตัดสินใจตัดแถวนั้นทิ้งทันทีเพราะคิดว่าเป็นข้อมูลผิดพลาด',
      correctApproach: 'ค่าที่อยู่นอกรั้วเรียกว่า "Potential Outlier" (ผู้ต้องสงสัย) ไม่ใช่ Error เสมอไป! ต้องทำ Screening ตรวจสอบสาเหตุก่อนว่าเป็นข้อมูลจริงตามธรรมชาติ (เช่น ยอดซื้อลูกค้า VIP) หรือเป็นความผิดพลาดจากการบันทึก',
      slideRef: 'Lect 05 p17',
    },
  ],
  sections: [
    {
      title: '1. บทบาทของ EDA และตารางเลือกใช้กราฟตามวัตถุประสงค์ (Chart Selection Matrix)',
      conceptSummary: 'การสำรวจข้อมูลเชิงลึกเพื่อตรวจหา Pattern, ความเบ้ (Skewness), ความสัมพันธ์ และความผิดปกติก่อนเข้าสู่ขั้นตอนสร้างโมเดล',
      tableData: {
        headers: ['วัตถุประสงค์การวิเคราะห์', 'กราฟที่เหมาะสมที่สุด', 'ข้อควรระวังในห้องสอบ'],
        rows: [
          ['Comparison (เปรียบเทียบปริมาณ)', 'Bar Chart, Column Chart', 'แกนค่าตัวเลขต้องเริ่มที่ 0 เสมอเพื่อไม่ให้สัดส่วนบิดเบือน'],
          ['Trend / Time-series (แนวโน้มตามเวลา)', 'Line Chart, Area Chart', 'แกน X ต้องเรียงลำดับเวลาต่อเนื่องอย่างสม่ำเสมอ'],
          ['Composition (สัดส่วนองค์ประกอบ)', 'Stacked Bar, Treemap, Pie Chart', 'Pie Chart ใช้เมื่อมีหมวดหมู่ไม่เกิน 5 ส่วนเท่านั้น'],
          ['Distribution (การกระจายตัว/ความเบ้)', 'Histogram, Boxplot, Density Plot', 'Boxplot เห็น Median, IQR และ Outliers ชัดเจนที่สุด'],
          ['Relationship (ความสัมพันธ์ 2 ตัวแปร)', 'Scatter Plot', 'เห็นทิศทางความสัมพันธ์ แต่ Correlation != Causation'],
        ],
      },
      keyPoints: [
        'EDA Informs Modeling: ช่วยบอกว่ารูปแบบความสัมพันธ์เป็นเชิงเส้นหรือไม่ (Linear vs Non-linear) และต้องทำ Scaling แบบใด',
        'Correlation != Causation: แม้กราฟ Scatter Plot จะแสดงแนวโน้มไปทางเดียวกัน แต่สรุปไม่ได้ทันทีว่าเป็นเหตุและผล เพราะอาจเกิดจากตัวแปรกวนแฝง (Confounding Variable)',
        'Skewness & Central Tendency: ข้อมูลสมมาตรใช้ Mean และ SD เป็นตัวแทนได้ แต่ถ้าข้อมูลเบ้มาก (Skewed) หรือมี Outliers ต้องใช้ Median และ IQR เพราะทนทานกว่า (Robust)',
      ],
    },
    {
      title: '2. ขั้นตอนคำนวณ Tukey’s Fences และโครงสร้าง Boxplot (5-Number Summary)',
      conceptSummary: 'การใช้ควอไทล์ที่ 1 (Q1) และควอไทล์ที่ 3 (Q3) สร้างช่วงกลาง 50% ของข้อมูลเพื่อคัดกรองค่าสุดโต่ง',
      tableData: {
        headers: ['องค์ประกอบ', 'สูตร / นิยาม', 'ตัวอย่างตัวเลขในสไลด์ (Lect 05)'],
        rows: [
          ['Q1 (Percentile ที่ 25)', 'ค่ากลางของครึ่งล่างข้อมูลที่เรียงลำดับแล้ว', 'Q1 = 70'],
          ['Median / Q2 (Percentile ที่ 50)', 'มัธยฐาน (ค่ากลางของข้อมูลทั้งหมด)', 'Median = 82.5'],
          ['Q3 (Percentile ที่ 75)', 'ค่ากลางของครึ่งบนข้อมูลที่เรียงลำดับแล้ว', 'Q3 = 90'],
          ['IQR (Interquartile Range)', 'IQR = Q3 − Q1 (ความกว้างของกล่องกลาง 50%)', '90 − 70 = 20'],
          ['Lower Fence (รั้วล่าง)', 'Q1 − 1.5 × IQR', '70 − 1.5(20) = 40'],
          ['Upper Fence (รั้วบน)', 'Q3 + 1.5 × IQR', '90 + 1.5(20) = 120 (หรือสไลด์อีกชุด = 130, จุด 140 หลุดรั้ว)'],
        ],
      },
      keyPoints: [
        'กติกาลากเส้นหนวด (Whisker): ลากจากขอบกล่อง Q3 ไปยัง "ค่าข้อมูลจริงที่มากที่สุดแต่ยังไม่เกิน Upper Fence" (ห้ามลากไปหยุดที่ตัวเลข Upper Fence ถ้าไม่มีข้อมูลจุดนั้นอยู่จริง)',
        'กติกาตัดสิน Outlier: ข้อมูล x ใดที่ x < Lower Fence หรือ x > Upper Fence จะถูกพล็อตแยกออกมาเป็นจุดเดี่ยว และตั้งสถานะเป็น Potential Outlier',
        'แนวทางจัดการหลังพบ Potential Outlier: 1. ตรวจสอบต้นทางว่าพิมพ์ผิดหรือไม่ 2. หากเป็นค่าจริงตามธรรมชาติให้เก็บไว้หรือใช้ Robust Scaling / Tree-based model',
      ],
    },
  ],
};
