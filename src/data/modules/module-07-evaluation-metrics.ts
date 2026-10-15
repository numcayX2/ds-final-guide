import type { StudyModule } from '../../types/study';

export const module07EvaluationMetrics: StudyModule = {
  id: 'module-07-evaluation-metrics',
  moduleNumber: '07',
  title: 'Confusion Matrix & Classifier Evaluation',
  titleEn: 'Confusion Matrix, Metrics & Business Context',
  lectureCode: 'Lect 07 p22-35',
  isFinalFocus: true,
  timeEstimateMinutes: 30,
  quickSummary: 'กฎเหล็กการเขียน Positive Class, 4 เมตริกหลัก (Accuracy, Precision, Recall, F1), เฉลยข้อสอบจริง FIFA และการบ้าน Churn HW#1 / HW#2',
  coreFormulas: ['accuracy', 'precision', 'recall', 'f1-score'],
  examTraps: [
    {
      trapTitle: 'แกนตารางและการกำหนด Positive Class',
      trapDescription: 'คิดเลขทันทีโดยไม่ได้อ่านว่าแถวหรือคอลัมน์คือ Actual และโจทย์กำหนดให้คลาสใดเป็น Positive',
      correctApproach: 'ในสไลด์ของวิชานี้ (Lect 07 p22): แถว = Actual (ของจริง), คอลัมน์ = Predicted (คำทำนาย) และต้องเขียนระบุ Positive Class = ... ในบรรทัดแรกเสมอ!',
      slideRef: 'Lect 07 p22, p26',
    },
    {
      trapTitle: 'การเลือกโมเดลตามบริบทธุรกิจ (HW#2 Trade-offs)',
      trapDescription: 'เลือกโมเดลที่มี Accuracy สูงสุดเสมอโดยไม่ดูผลกระทบของ FP และ FN',
      correctApproach: 'ในการบ้าน HW#2 (100 ราย): ถ้าธุรกิจกลัวลูกค้าหลุดหาย (Missed Churn ต้นทุนรุนแรง) ต้องเลือก "Model B" เพราะได้ Recall สูงถึง 0.90 แม้จะแลกกับ FP=18 แต่ถ้าต้องการสมดุลที่สุดเลือก "Model C" (F1 = 0.81, Acc = 0.85)',
      slideRef: 'Lect 07 p35',
    },
  ],
  sections: [
    {
      title: '1. นิยามเมตริกการประเมิน 4 ชนิด',
      conceptSummary: 'เครื่องมือวัดผลแบบจำแนกประเภท',
      keyPoints: [
        'Accuracy = (TP + TN) / Total — สัดส่วนทายถูกรวมทั้งหมด',
        'Precision = TP / (TP + FP) — เมื่อโมเดลบอกว่าใช่ มีโอกาสจริงเท่าใด (เน้นลด FP)',
        'Recall = TP / (TP + FN) — ของจริงทั้งหมด โมเดลจับได้กี่ % (เน้นลด FN)',
        'F1-Score = 2*TP / (2*TP + FP + FN) — ค่าเฉลี่ยฮาร์โมนิก ผสาน Precision และ Recall',
      ],
    },
    {
      title: '2. สรุปโจทย์จริง 3 ข้อในสไลด์และการบ้านอาจารย์',
      conceptSummary: 'ตัวเลขจริงที่ออกสอบบ่อยที่สุด',
      keyPoints: [
        '1. FIFA World Cup 2026 (10 คน, Positive = play): TP=4, FN=2, FP=1, TN=3 -> Acc=0.70, Prec=0.80, Rec=0.67, F1=0.73',
        '2. การบ้าน HW#1 Customer Churn (10 คน, Positive = Inactive Yes): TP=3, TN=3, FP=2, FN=2 -> ทุกเมตริกออกเท่ากันหมด = 0.60!',
        '3. การบ้าน HW#2 Candidate Models A/B/C (100 คน): Model A (Acc=0.81, Prec=0.89, Rec=0.60, F1=0.72) vs Model B (Acc=0.78, Prec=0.67, Rec=0.90, F1=0.77) vs Model C (Acc=0.85, Prec=0.82, Rec=0.80, F1=0.81)',
      ],
    },
  ],
};
