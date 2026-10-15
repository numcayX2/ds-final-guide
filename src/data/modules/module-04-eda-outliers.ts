import type { StudyModule } from '../../types/study';

export const module04EdaOutliers: StudyModule = {
  id: 'module-04-eda-outliers',
  moduleNumber: '04',
  title: 'Exploratory Data Analysis (EDA) & Outliers',
  titleEn: 'EDA & Tukey Outlier Fences',
  lectureCode: 'Lect 05',
  isFinalFocus: true,
  timeEstimateMinutes: 20,
  quickSummary: 'บทบาทที่แท้จริงของ EDA: ชี้แนะแนวทางโมเดล (Informs) ไม่ใช่เลือกอัลกอริทึมอัตโนมัติ พร้อมการตรวจจับ Outlier ด้วย IQR และรั้วของ Tukey',
  coreFormulas: ['tukey-fences'],
  examTraps: [
    {
      trapTitle: 'บทบาทของ EDA ต่อขั้นตอนการสร้างโมเดล',
      trapDescription: 'ข้อสอบถามว่า EDA ทำหน้าที่ตัดสินใจเลือก Candidate Model ให้อัตโนมัติหรือไม่',
      correctApproach: 'EDA ทำหน้าที่ "Informs modeling decisions" (ชี้แนะแนวทาง ให้สารสนเทศ) แต่ "not automatically selects algorithm" (ไม่ได้เลือกอัลกอริทึมอัตโนมัติ)',
      slideRef: 'Lect 05 p04',
    },
    {
      trapTitle: 'เส้นหนวดของ Boxplot (Whisker Rule)',
      trapDescription: 'คิดว่าเส้น Whisker ใน Boxplot จะลากยาวไปสิ้นสุดที่ค่า Fence (Q1 - 1.5*IQR หรือ Q3 + 1.5*IQR)',
      correctApproach: 'เส้น Whisker จะลากไปถึง "จุดข้อมูลจริงตัวสุดท้ายที่ยังอยู่ภายในรั้ว" เท่านั้น ไม่ใช่ตัวรั้ว Fence!',
      slideRef: 'Lect 05 p17-18',
    },
    {
      trapTitle: 'Outlier vs Error',
      trapDescription: 'พบค่าหลุดรั้วแล้วตัดสินใจลบทิ้งทันที',
      correctApproach: 'Observation outside fence = Potential Outlier, แต่ Potential Outlier != Error! เป็นเพียงการ Screening เพื่อตรวจสอบสาเหตุ',
      slideRef: 'Lect 05 p17',
    },
  ],
  sections: [
    {
      title: '1. หลักการของ EDA และการเลือกชาร์ตสถิติ',
      conceptSummary: 'EDA ช่วยให้เข้าใจโครงสร้างข้อมูล ความสัมพันธ์ระหว่างตัวแปร และการกระจายตัว',
      keyPoints: [
        'Comparison: Bar Chart, Column Chart',
        'Time / Trend: Line Chart, Area Chart',
        'Composition: Stacked Bar, Treemap, Pie Chart (ใช้เมื่อมีส่วนแบ่งไม่เกิน 5 ชิ้น)',
        'Distribution: Histogram, Boxplot, Density Plot',
        'Relationship: Scatter Plot (หาความสัมพันธ์เชิงเส้นหรือกลุ่มก้อน)',
        'Correlation != Causation: ความสัมพันธ์ทางสถิติไม่ได้แปลว่าสิ่งหนึ่งเป็นสาเหตุของอีกสิ่งหนึ่ง อาจมี Confounders แฝงอยู่',
      ],
    },
    {
      title: '2. สูตรการตรวจจับ Outlier ด้วยรั้วของ Tukey',
      conceptSummary: 'การใช้ Interquartile Range (IQR) เพื่อสร้างรั้วบนและรั้วล่างในการคัดกรอง',
      keyPoints: [
        'IQR = Q3 - Q1',
        'Lower Fence = Q1 - 1.5 * IQR',
        'Upper Fence = Q3 + 1.5 * IQR',
        'จุดใดที่อยู่นอกช่วง [Lower Fence, Upper Fence] ถือเป็น Potential Outlier',
      ],
    },
  ],
};
