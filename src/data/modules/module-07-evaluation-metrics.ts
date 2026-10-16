import type { StudyModule } from '../../types/study';

export const module07EvaluationMetrics: StudyModule = {
  id: 'module-07-evaluation-metrics',
  moduleNumber: '07',
  title: 'Confusion Matrix & Classifier Evaluation',
  titleEn: 'Confusion Matrix, Metrics & Business Context',
  lectureCode: 'Lect 07 p22–35',
  isFinalFocus: true,
  timeEstimateMinutes: 30,
  quickSummary: 'การจัดวางตาราง Confusion Matrix (แถว = Actual, คอลัมน์ = Predicted), กฎการระบุ Positive Class, 4 เมตริกหลัก และเฉลยละเอียด FIFA 2026 + การบ้าน Churn HW#1 & HW#2',
  coreFormulas: ['accuracy', 'precision', 'recall', 'f1-score'],
  examTraps: [
    {
      trapTitle: 'แกนตารางและการกำหนด Positive Class บรรทัดแรก',
      trapDescription: 'ลงมือแทนค่าสูตรทันทีโดยไม่ได้เช็กว่าแถวหรือคอลัมน์เป็นค่าจริง (Actual) และไม่เขียนระบุว่าคลาสใดคือ Positive Class',
      correctApproach: 'ในสไลด์วิชานี้ (Lect 07 p22): แถวแนวนอน = Actual (ความจริง), คอลัมน์แนวตั้ง = Predicted (คำทำนาย) และต้องเขียน "Positive Class = ..." ก่อนเริ่มคำนวณเสมอ เพราะถ้าสลับคลาส ค่า TP กับ TN และ FP กับ FN จะสลับกันทันที!',
      slideRef: 'Lect 07 p22, p26',
    },
    {
      trapTitle: 'การเลือกโมเดลตามต้นทุนธุรกิจ (HW#2 Business Cost Trade-off)',
      trapDescription: 'เลือกโมเดลที่ได้ Accuracy สูงสุดเสมอโดยไม่สนใจว่าโจทย์กังวลเรื่อง False Positive (FP) หรือ False Negative (FN)',
      correctApproach: 'ในการบ้าน HW#2 (100 ราย): หากธุรกิจกลัวเสียลูกค้าโดยไม่รู้ตัว (Missed Churn = FN มีต้นทุนสูงมาก) ต้องเลือก "Model B" เพราะได้ Recall สูงสุดถึง 0.90 แม้จะมี FP = 18 ราย แต่ถ้าต้องการสมดุลภาพรวมให้เลือก "Model C" (F1 = 0.81, Accuracy = 0.85)',
      slideRef: 'Lect 07 p35',
    },
    {
      trapTitle: 'กับดัก Imbalanced Dataset (ทำไม Accuracy ถึงหลอกตา)',
      trapDescription: 'ใช้ Accuracy วัดผลในชุดข้อมูลที่คลาสไม่สมดุลอย่างหนัก เช่น มีผู้ป่วยจริงเพียง 1% จากทั้งหมด',
      correctApproach: 'ถ้ามีคลาสบวกเพียง 1% โมเดลที่ทายว่า Negative ทั้งหมดจะได้ Accuracy สูงถึง 99% แต่จับเคสบวกไม่ได้เลย (Recall = 0%) ดังนั้นข้อมูลไม่สมดุลต้องดู Precision, Recall และ F1-Score เป็นหลัก',
      slideRef: 'Lect 07 p29–30',
    },
  ],
  sections: [
    {
      title: '1. นิยามองค์ประกอบ Confusion Matrix และสูตรเมตริกทั้ง 4 ชนิด',
      conceptSummary: 'ความหมายเชิงคลินิกและธุรกิจของแต่ละเมตริกเพื่อการตัดสินใจเลือกโมเดล',
      tableData: {
        headers: ['เมตริก (Metric)', 'สมการคำนวณ', 'คำถามที่เมตริกนี้ตอบ', 'ใช้เมื่อธุรกิจต้องการเน้นอะไร'],
        rows: [
          ['Accuracy', '(TP + TN) / (TP + TN + FP + FN)', 'ทายถูกทั้งคลาสบวกและลบรวมกันคิดเป็นกี่ % ของทั้งหมด?', 'ใช้เมื่อจำนวนตัวอย่างทั้งสองคลาสใกล้เคียงกัน และต้นทุนความผิดพลาด FP กับ FN พอๆ กัน'],
          ['Precision', 'TP / (TP + FP)', 'ในกลุ่มที่โมเดลฟันธงว่า Positive เป็นของจริงกี่ %?', 'เน้นลด False Positive (FP) เช่น ระบบคัดกรองสแปม (ไม่อยากให้เมลสำคัญลูกค้าโดนบล็อกผิด) หรือการส่งโปรโมชันราคาแพง'],
          ['Recall (Sensitivity)', 'TP / (TP + FN)', 'จากของจริงที่เป็น Positive ทั้งหมด โมเดลตามจับได้กี่ %?', 'เน้นลด False Negative (FN) เช่น คัดกรองโรคร้ายแรง, ตรวจจับทุจริตบัตรเครดิต, หรือดักจับลูกค้ากำลังจะย้ายค่าย (Churn)'],
          ['F1-Score', '2 × (Precision × Recall) / (Precision + Recall) หรือ 2TP / (2TP + FP + FN)', 'ค่าเฉลี่ยฮาร์โมนิกที่ถ่วงดุลทั้ง Precision และ Recall เป็นเท่าใด?', 'ใช้เมื่อต้องการสมดุลทั้งสองด้าน ไม่ยอมให้ค่าใดค่าหนึ่งต่ำเกินไป'],
        ],
      },
      keyPoints: [
        'TP (True Positive): ของจริงเป็นบวก และโมเดลทายว่าบวก (ทายถูก)',
        'TN (True Negative): ของจริงเป็นลบ และโมเดลทายว่าลบ (ทายถูก)',
        'FP (False Positive — Type I Error / False Alarm): ของจริงเป็นลบ แต่โมเดลทายผิดว่าเป็นบวก',
        'FN (False Negative — Type II Error / Missed Detection): ของจริงเป็นบวก แต่โมเดลทายผิดว่าเป็นลบ (หลุดรอดสายตา)',
      ],
    },
    {
      title: '2. ตารางสรุปตัวเลขโจทย์จริงทั้ง 3 เคสในสไลด์และการบ้าน (ออกสอบตรง)',
      conceptSummary: 'ตัวเลขคำนวณจริงจากสไลด์ Lect 07 p23–35 ที่ต้องจำโครงสร้างและคำตอบให้แม่นยำ',
      tableData: {
        headers: ['ชุดข้อมูล / โจทย์ในสไลด์', 'ค่า TP, FN, FP, TN', 'Accuracy', 'Precision', 'Recall', 'F1-Score & ข้อสรุป'],
        rows: [
          ['1. FIFA World Cup 2026 (N=10, Pos = play)', 'TP=4, FN=2, FP=1, TN=3', '7/10 = 0.70', '4/5 = 0.80', '4/6 ≈ 0.67', '8/11 ≈ 0.73 (แม่นเมื่อทายว่าลงเล่น แต่พลาดคนลงจริงไป 2 คน)'],
          ['2. HW#1 Customer Churn (N=10, Pos = Inactive)', 'TP=3, FN=2, FP=2, TN=3', '6/10 = 0.60', '3/5 = 0.60', '3/5 = 0.60', '6/10 = 0.60 (จุดสังเกต: เมื่อ TP=TN และ FP=FN ทุกเมตริกเท่ากัน!)'],
          ['3. HW#2 Model A (N=100, Conservative)', 'TP=24, FN=16, FP=3, TN=57', '81/100 = 0.81', '24/27 = 0.89 (สูงสุด)', '24/40 = 0.60', '0.72 — เหมาะเมื่อต้นทุนแคมเปญแพง ห้ามทาย FP มั่ว'],
          ['4. HW#2 Model B (N=100, Aggressive)', 'TP=36, FN=4, FP=18, TN=42', '78/100 = 0.78', '36/54 = 0.67', '36/40 = 0.90 (สูงสุด)', '0.77 — เหมาะเมื่อกลัวเสียลูกค้า (ห้ามหลุด FN)'],
          ['5. HW#2 Model C (N=100, Balanced Winner)', 'TP=32, FN=8, FP=7, TN=53', '85/100 = 0.85 (สูงสุด)', '32/39 = 0.82', '32/40 = 0.80', '0.81 (สูงสุด) — สมดุลที่สุดทั้งความแม่นและความครอบคลุม'],
        ],
      },
      keyPoints: [
        'เทคนิคตรวจคำตอบเร็วในห้องสอบ: เช็กผลรวม TP + FN ว่าเท่ากับจำนวน Actual Positive ทั้งหมดหรือไม่ และ TP + TN + FP + FN ต้องเท่ากับ N เสมอ',
      ],
    },
  ],
};
