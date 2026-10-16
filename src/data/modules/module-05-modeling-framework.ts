import type { StudyModule } from '../../types/study';

export const module05ModelingFramework: StudyModule = {
  id: 'module-05-modeling-framework',
  moduleNumber: '05',
  title: 'Modeling Framework & การแบ่งชุดข้อมูล',
  titleEn: 'Modeling Framework & 3-Way Partitioning',
  lectureCode: 'Lect 06, Lect 07 p07, p32–33',
  isFinalFocus: true,
  timeEstimateMinutes: 20,
  quickSummary: 'กลไกการแบ่งชุดข้อมูล 3 ส่วน (Train / Validation / Test), กฎเหล็ก Protect the Test Set และเปรียบเทียบ 4 ตระกูล Candidate Models ในสไลด์อาจารย์',
  coreFormulas: [],
  examTraps: [
    {
      trapTitle: 'กฎเหล็ก Protect the Test Set (ห้ามใช้จูนโมเดลเด็ดขาด)',
      trapDescription: 'นำชุด Test Set มาใช้เปรียบเทียบเพื่อเลือก Candidate Model หรือใช้ปรับค่า Hyperparameter เช่น ความลึกต้นไม้ max_depth',
      correctApproach: 'Test Set คือ "Protected Evidence" ต้องเก็บล็อกไว้ใช้ประเมิน Generalization Performance เพียง "ครั้งเดียวตอนสุดท้าย" เท่านั้น! การเปรียบเทียบและจูนโมเดลทั้งหมดต้องทำบน Validation Set (Lect 07 p32)',
      slideRef: 'Lect 07 p32',
    },
    {
      trapTitle: 'ทำไมห้ามวัดผลโมเดลบน Training Set เพียงอย่างเดียว',
      trapDescription: 'เห็นโมเดลได้ Accuracy 100% บน Training Set แล้วสรุปทันทีว่าเป็นโมเดลที่ดีที่สุด',
      correctApproach: 'คะแนนสูงบน Training Set อาจเกิดจากการจำข้อสอบ (Memorization / Overfitting) ไม่ได้แปลว่าโมเดลจะทำนายข้อมูลใหม่ที่ไม่เคยเห็นได้ดี จึงต้องวัดผลบน Validation Set และ Test Set เสมอ',
      slideRef: 'Lect 07 p07, p19',
    },
    {
      trapTitle: '4 ตระกูล Candidate Models ที่ระบุในสไลด์อาจารย์',
      trapDescription: 'จำชื่อโมเดลผู้ท้าชิงทั้ง 4 ตระกูลในตารางเปรียบเทียบสไลด์ Lect 07 p33 ไม่ครบหรือจำสลับกับอัลกอริทึมอื่น',
      correctApproach: '4 ตระกูลหลักในสไลด์คือ: 1. Decision Tree, 2. 5-NN (K-Nearest Neighbors), 3. Naive Bayes, และ 4. Neural Network',
      slideRef: 'Lect 07 p33',
    },
  ],
  sections: [
    {
      title: '1. กฎการแบ่งชุดข้อมูลแบบ 3 ส่วน (3-Way Data Partitioning)',
      conceptSummary: 'การแยกหน้าที่ของข้อมูลเพื่อฝึกสอน ปรับจูน และทดสอบความสามารถในการวางนัยทั่วไป (Generalization) อย่างเป็นกลาง',
      tableData: {
        headers: ['ชุดข้อมูล (Partition)', 'สัดส่วนมาตรฐาน', 'หน้าที่หลักในกระบวนการ Modeling', 'ข้อห้ามสำคัญในห้องสอบ'],
        rows: [
          ['Training Set', '60% – 70%', 'ใช้ฝึกสอนโมเดล (Fit Parameters / เรียนรู้กฎการแบ่งแยกคลาส)', 'ห้ามใช้ตัวเลขความแม่นยำจากชุดนี้ตัดสินเลือกโมเดลสุดท้าย'],
          ['Validation Set', '15% – 20%', 'ใช้จูน Hyperparameter (เช่น max_depth, ค่า k) และคัดเลือก Candidate Model ที่ดีที่สุด', 'ห้ามนำข้อมูลดิบก่อนแบ่งไป Fit Scaler รวมกับ Train'],
          ['Test Set (Protected)', '15% – 20%', 'ใช้ประเมินประสิทธิภาพขั้นสุดท้าย (Final Unbiased Evaluation) เสมือนใช้งานจริง', 'ห้ามนำมาใช้จูนโมเดลหรือวนกลับมาแก้พารามิเตอร์ซ้ำเด็ดขาด'],
        ],
      },
      keyPoints: [
        'Parameter vs Hyperparameter: Parameter คือสิ่งที่โมเดลเรียนรู้เองจาก Training Set (เช่น จุดตัดกิ่ง, น้ำหนักสมการ) ส่วน Hyperparameter คือค่าที่ผู้สร้างต้องตั้งค่าจากภายนอกและจูนด้วย Validation Set (เช่น max_depth = 3, k = 5)',
        'Generalization: ความสามารถของโมเดลในการทำนายข้อมูลใหม่ที่ไม่เคยเห็นมาก่อนได้อย่างแม่นยำ ไม่ใช่แค่ท่องจำข้อมูลเก่า',
      ],
    },
    {
      title: '2. ตารางเปรียบเทียบ 4 ตระกูล Candidate Models (Lect 07 p33)',
      conceptSummary: 'จุดเด่น ข้อจำกัด และกลไกการตัดสินใจของโมเดลทั้ง 4 ชนิดที่ใช้แข่งขันกันในวิชา',
      tableData: {
        headers: ['ตระกูลโมเดล', 'กลไกการเรียนรู้หลัก', 'การตีความ (Interpretability)', 'ข้อควรระวัง / ความไวต่อข้อมูล'],
        rows: [
          ['1. Decision Tree', 'แตกกิ่งตามกฎ If-Else โดยลดความไม่บริสุทธิ์ (Gini Impurity)', 'สูงมาก (White-box อ่านกฎได้ชัดเจน)', 'ไม่ต้องทำ Feature Scaling แต่เสี่ยง Overfitting หากต้นไม้ลึกเกินไป'],
          ['2. 5-NN (K-Nearest Neighbors)', 'วัดระยะห่าง (Distance) แล้วโหวตคลาสจากเพื่อนบ้านที่ใกล้ที่สุด 5 จุด', 'ปานกลาง (อิงตัวอย่างใกล้เคียง)', 'ไวต่อสเกลตัวแปรมาก! ต้องทำ Feature Scaling (Min-Max / Z-Score) ก่อนเสมอ'],
          ['3. Naive Bayes', 'คำนวณความน่าจะเป็นตามทฤษฎีของ Bayes P(Y|X)', 'สูง (ดูสัดส่วนความน่าจะเป็นได้)', 'ตั้งสมมติฐานว่าทุก Feature เป็นอิสระต่อกันอย่างสมบูรณ์ (Conditional Independence)'],
          ['4. Neural Network', 'ส่งค่าผ่านโครงข่ายหลายชั้น (Hidden Layers & Weights)', 'ต่ำมาก (Black-box ตีความยาก)', 'จับความสัมพันธ์ซับซ้อน (Non-linear) ได้ดีแต่ต้องการข้อมูลมากและต้องจูนระวัง Overfit'],
        ],
      },
      keyPoints: [
        'Supervised Learning: มีตัวแปรเป้าหมาย (Target Label Y) ชัดเจน แบ่งเป็น Classification (ทายหมวดหมู่ เช่น Play/No Play, Churn/Active) และ Regression (ทายตัวเลขต่อเนื่อง เช่น ราคาบ้าน, ยอดขาย)',
        'Unsupervised Learning: ไม่มี Target Label Y มุ่งค้นหาโครงสร้างหรือจัดกลุ่มตามความคล้ายคลึง เช่น K-Means Clustering',
      ],
    },
  ],
};
