import type { StudyModule } from '../../types/study';

export const module03FeatureEngineering: StudyModule = {
  id: 'module-03-feature-engineering',
  moduleNumber: '03',
  title: 'Data Preparation II: Feature Engineering & Scaling',
  titleEn: 'Feature Engineering & Scaling Laws',
  lectureCode: 'Lect 04.2',
  isFinalFocus: false,
  timeEstimateMinutes: 20,
  quickSummary: 'การแปลงข้อมูลตัวแปรเพื่อป้อนเข้าสู่อัลกอริทึม: Categorical Encoding, Binning, Log Transformation และกฎเหล็กป้องกัน Data Leakage',
  coreFormulas: ['min-max', 'z-score'],
  examTraps: [
    {
      trapTitle: 'กฎป้องกัน Data Leakage ในขั้นตอน Scaling',
      trapDescription: 'นำชุดข้อมูลทั้งหมด (รวม Test/Validation) ไปคำนวณค่า min, max หรือ mean, sd ร่วมกันก่อนแบ่งชุดข้อมูล',
      correctApproach: 'ต้อง Fit พารามิเตอร์ (min, max, mean, sd) เฉพาะบนชุด Training Data เท่านั้น! แล้วจึงนำพารามิเตอร์นั้นไป Transform บนชุด Validation และ Test (Lect 04.2 p27)',
      slideRef: 'Lect 04.2 p27',
    },
    {
      trapTitle: 'ความเข้าใจผิดเรื่องรูปทรงการกระจายตัวของ Z-Score',
      trapDescription: 'คิดว่าการทำ Z-score standardization จะเปลี่ยนข้อมูลที่เบ้ให้กลายเป็น Normal Distribution',
      correctApproach: 'Z-score ปรับเพียง Mean เป็น 0 และ SD เป็น 1 แต่ "ไม่เปลี่ยนรูปทรงเดิม (Shape/Skewness)" หากข้อมูลเบ้ขวา ก็ยังคงเบ้ขวาเหมือนเดิม (ต้องการแก้ความเบ้ต้องใช้ Log Transform)',
      slideRef: 'Lect 04.2 p21',
    },
  ],
  sections: [
    {
      title: '1. เทคนิคหลักในการทำ Feature Engineering',
      conceptSummary: 'เครื่องมือปรับแต่งข้อมูลให้สอดคล้องกับธรรมชาติของโมเดลคณิตศาสตร์',
      keyPoints: [
        'Ordinal Encoding: กำหนดตัวเลขเรียงลำดับ (Low=1, Med=2, High=3) ใช้เมื่อข้อมูลมีระดับจริง',
        'One-Hot Encoding: สร้าง dummy columns 0/1 สำหรับข้อมูลนามบัญญัติ (Nominal) เพื่อป้องกันโมเดลเข้าใจผิดเรื่องขนาด',
        'Binning / Discretization: แปลงตัวเลขต่อเนื่องเป็นกลุ่มช่วง เช่น แบ่งอายุเป็นกลุ่มวัย',
        'Log Transformation: ลดความเบ้ (Skewness) ของข้อมูลที่มีค่าสูงกระโดด เช่น ยอดขาย รายได้',
      ],
    },
    {
      title: '2. เปรียบเทียบ Min-Max Normalization vs Z-Score Standardization',
      conceptSummary: 'เลือกใช้เครื่องมือ Scaling ให้เหมาะกับความต้องการและลักษณะข้อมูล',
      keyPoints: [
        'Min-Max Scaling: ปรับเข้ากรอบ [0, 1] หรือ [new_min, new_max] เหมาะเมื่อต้องการกรอบแน่นอน แต่ไวต่อ Outliers',
        'Z-Score Standardization: z = (x - μ) / σ ทนทานต่อ Outliers ได้ดีกว่า แต่ไม่ได้บีบให้มีค่าต่ำสุดสูงสุดที่แน่นอน',
      ],
    },
  ],
};
