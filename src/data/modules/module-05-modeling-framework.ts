import type { StudyModule } from '../../types/study';

export const module05ModelingFramework: StudyModule = {
  id: 'module-05-modeling-framework',
  moduleNumber: '05',
  title: 'Modeling Framework & การแบ่งชุดข้อมูล',
  titleEn: 'Modeling Framework & 3-Way Partitioning',
  lectureCode: 'Lect 06, Lect 07 p07, p32',
  isFinalFocus: true,
  timeEstimateMinutes: 20,
  quickSummary: '4 ตระกูล Candidate Models ในสไลด์วิชานี้ กฎการแบ่งข้อมูล 3 ส่วน (Train/Val/Test) และกฎเหล็ก Protect the Test Set',
  coreFormulas: [],
  examTraps: [
    {
      trapTitle: 'กฎเหล็ก Protect the Test Set',
      trapDescription: 'นำชุด Test Set มาใช้เปรียบเทียบ Candidate Models หรือใช้เลือก Hyperparameter เช่น ความลึกของต้นไม้',
      correctApproach: 'Test Set คือ "Protected Evidence" ต้องใช้ประเมิน Generalization Performance เพียง "ครั้งเดียว" ตอนสุดท้าย ห้ามนำมาใช้จูนโมเดลเด็ดขาด! การจูนต้องทำบน Validation Set เท่านั้น (Lect 07 p32)',
      slideRef: 'Lect 07 p32',
    },
    {
      trapTitle: 'ตระกูล Candidate Models ในสไลด์อาจารย์',
      trapDescription: 'จำโมเดลผู้ท้าชิงที่ระบุในสไลด์ Lect 07 p33 ผิด',
      correctApproach: '4 ตระกูลหลักในสไลด์: 1. Decision Tree, 2. 5-NN (K-Nearest Neighbors), 3. Naive Bayes, 4. Neural Network',
      slideRef: 'Lect 07 p33',
    },
  ],
  sections: [
    {
      title: '1. กฎการแบ่งชุดข้อมูลแบบ 3 ส่วน (3-Way Partitioning)',
      conceptSummary: 'การแบ่งสัดส่วนเพื่อฝึกสอน จูน และวัดผลอย่างเป็นกลาง',
      keyPoints: [
        'Training Set (60–70%): ใช้สอนโมเดล ให้เรียนรู้ Parameter / กฎการตัดสินใจ',
        'Validation Set (15–20%): ใช้เปรียบเทียบ Candidate Models และจูน Hyperparameter (เช่น max_depth)',
        'Test Set (15–20%): ใช้ประเมินความสามารถในการใช้งานจริงกับข้อมูลที่ไม่เคยเห็น ห้ามแตะต้องจนกว่าจะเสร็จสิ้น',
      ],
    },
    {
      title: '2. ตระกูล Candidate Models และลักษณะเฉพาะ',
      conceptSummary: 'ความแตกต่างของอัลกอริทึมทั้ง 4 แบบที่นำเสนอในวิชา',
      keyPoints: [
        'Decision Tree: โมเดลต้นไม้ตัดสินใจ แบ่งตามความไม่บริสุทธิ์ (Gini) เข้าใจง่าย ตีความได้',
        '5-NN (K-Nearest Neighbors): อิงความคล้ายคลึงของจุดเพื่อนบ้าน 5 จุดที่ใกล้ที่สุด',
        'Naive Bayes: อิงทฤษฎีความน่าจะเป็นของเบย์ มีสมมติฐานว่าตัวแปรอิสระต่อกัน (Conditional Independence)',
        'Neural Network: เครือข่ายประสาทเทียม มีความยืดหยุ่นสูง จับ Non-linear ได้ดี แต่เป็น Black Box',
      ],
    },
  ],
};
