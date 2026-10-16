import type { StudyModule } from '../../types/study';

export const module08Kmeans: StudyModule = {
  id: 'module-08-kmeans',
  moduleNumber: '08',
  title: 'K-Means Clustering & การประเมินกลุ่ม',
  titleEn: 'K-Means Clustering, Distance & Inertia',
  lectureCode: 'Lect 08 p12–37',
  isFinalFocus: true,
  timeEstimateMinutes: 25,
  quickSummary: 'อัลกอริทึม K-Means ขั้นตอนจัดกลุ่ม 8 จุดจริงในสไลด์ (A1–A8), การอัปเดต Centroid ใหม่, กับดักสูตร Manhattan vs Squared Euclidean (Inertia) และ Silhouette Score',
  coreFormulas: ['kmeans-distance-centroid', 'silhouette-score'],
  examTraps: [
    {
      trapTitle: 'กับดักสูตรระยะทาง: Manhattan (Assign) vs Squared Euclidean (Inertia)',
      trapDescription: 'นำสูตรระยะทางตอนจัดจุดเข้ากลุ่มไปปนกับสูตรคำนวณความแน่นของกลุ่ม (Inertia / WCSS)',
      correctApproach: 'ในสไลด์ขั้นตอน Assign จุดเข้ากลุ่ม อาจารย์ใช้ "Manhattan Distance" d(x,c) = |x1 − c1| + |x2 − c2| เพื่อให้คิดเลขง่ายในห้องสอบ แต่สูตรวัดค่า Inertia (WCSS) หน้า 35 ใช้ "Squared Euclidean Distance" ∑ ||x − C_k||² ห้ามจำสลับกันเด็ดขาด!',
      slideRef: 'Lect 08 p25, p35',
    },
    {
      trapTitle: 'เป้าหมายหลักของการทำ Clustering (Intra vs Inter)',
      trapDescription: 'จำสลับในข้อสอบว่าต้องเพิ่มหรือลด Intra-cluster similarity และ Inter-cluster similarity',
      correctApproach: 'เป้าหมายคือ "Maximize Intra-cluster Similarity" (สมาชิกในกลุ่มเดียวกันใกล้ชิดกันที่สุด → ระยะห่าง a(i) น้อย) และ "Minimize Inter-cluster Similarity" (จุดต่างกลุ่มกันอยู่ห่างกันที่สุด → ระยะห่าง b(i) มาก)',
      slideRef: 'Lect 08 p12',
    },
    {
      trapTitle: 'การตีความค่า Silhouette Score s(i) ติดลบ หรือ ใกล้ 0',
      trapDescription: 'คิดว่าค่า Silhouette Score อยู่ในช่วง [0, 1] เท่านั้น หรือแปลความหมายของค่าติดลบผิด',
      correctApproach: 'Silhouette Score มีช่วงตั้งแต่ −1 ถึง +1: ค่าใกล้ +1 แปลว่าจัดกลุ่มได้ดีเยี่ยม (a(i) << b(i)), ค่าใกล้ 0 แปลว่าจุดอยู่ก้ำกึ่งบริเวณขอบรอยต่อระหว่าง 2 คลัสเตอร์, และค่าติดลบ (< 0) แปลว่าจุดนั้นถูกจัดเข้ากลุ่มผิด!',
      slideRef: 'Lect 08 p37',
    },
  ],
  sections: [
    {
      title: '1. ตารางคำนวณจัดกลุ่ม K-Means รอบที่ 1 ทั้ง 8 จุดจริงในสไลด์ (Lect 08 p25–28)',
      conceptSummary: 'กำหนดจุดศูนย์กลางเริ่มต้น C1 = (2,10), C2 = (5,8), C3 = (1,2) และคำนวณระยะทาง Manhattan |x1−c1| + |x2−c2|',
      tableData: {
        headers: ['จุดข้อมูล (x1, x2)', 'ระยะห่างถึง C1(2,10)', 'ระยะห่างถึง C2(5,8)', 'ระยะห่างถึง C3(1,2)', 'กลุ่มที่ถูกเลือก (ใกล้สุด)'],
        rows: [
          ['A1 (2, 10)', '|2−2| + |10−10| = 0', '|2−5| + |10−8| = 5', '|2−1| + |10−2| = 9', 'Cluster 1 (d = 0)'],
          ['A2 (2, 5)', '|2−2| + |5−10| = 5', '|2−5| + |5−8| = 6', '|2−1| + |5−2| = 4', 'Cluster 3 (d = 4)'],
          ['A3 (8, 4)', '|8−2| + |4−10| = 12', '|8−5| + |4−8| = 7', '|8−1| + |4−2| = 9', 'Cluster 2 (d = 7)'],
          ['A4 (5, 8)', '|5−2| + |8−10| = 5', '|5−5| + |8−8| = 0', '|5−1| + |8−2| = 10', 'Cluster 2 (d = 0)'],
          ['A5 (7, 5)', '|7−2| + |5−10| = 10', '|7−5| + |5−8| = 5', '|7−1| + |5−2| = 9', 'Cluster 2 (d = 5)'],
          ['A6 (6, 4)', '|6−2| + |4−10| = 10', '|6−5| + |4−8| = 5', '|6−1| + |4−2| = 7', 'Cluster 2 (d = 5)'],
          ['A7 (1, 2)', '|1−2| + |2−10| = 9', '|1−5| + |2−8| = 10', '|1−1| + |2−2| = 0', 'Cluster 3 (d = 0)'],
          ['A8 (4, 9)', '|4−2| + |9−10| = 3', '|4−5| + |9−8| = 2', '|4−1| + |9−2| = 10', 'Cluster 2 (d = 2)'],
        ],
      },
      keyPoints: [
        'สรุปสมาชิกหลังจบรอบที่ 1: Cluster 1 = {A1}, Cluster 2 = {A3, A4, A5, A6, A8} (รวม 5 จุด), Cluster 3 = {A2, A7} (รวม 2 จุด)',
        'คำนวณ Centroid ใหม่ (C1_new): มีแค่ A1(2,10) → C1_new = (2, 10) ไม่เปลี่ยนแปลง',
        'คำนวณ Centroid ใหม่ (C2_new): เฉลี่ย 5 จุด → x1 = (8+5+7+6+4)/5 = 30/5 = 6, x2 = (4+8+5+4+9)/5 = 30/5 = 6 → C2_new = (6, 6)',
        'คำนวณ Centroid ใหม่ (C3_new): เฉลี่ย 2 จุด {A2(2,5), A7(1,2)} → x1 = (2+1)/2 = 1.5, x2 = (5+2)/2 = 3.5 → C3_new = (1.5, 3.5)',
      ],
    },
    {
      title: '2. การประเมินคุณภาพคลัสเตอร์: Inertia (WCSS), Elbow Method และ Silhouette Score',
      conceptSummary: 'เนื่องจาก Unsupervised Learning ไม่มีเฉลยคลาสจริง จึงต้องวัดจากความแน่นภายในกลุ่มและระยะห่างระหว่างกลุ่ม',
      tableData: {
        headers: ['ตัวชี้วัด / เครื่องมือ', 'สมการ / หลักการ', 'เกณฑ์การแปลผลในห้องสอบ'],
        rows: [
          ['Inertia (WCSS)', '∑ ||x − C_k||² (ผลรวมกำลังสองของระยะห่างจากจุดถึง Centroid กลุ่มตัวเอง)', 'วัดความแน่น (Compactness) ยิ่งค่าน้อยยิ่งเกาะกลุ่มแน่น (และลดลงเสมอเมื่อเพิ่ม k)'],
          ['Elbow Method', 'พล็อตกราฟระหว่างจำนวนกลุ่ม k กับค่า Inertia', 'เลือกค่า k ณ "จุดหักข้อศอก" ที่การเพิ่ม k ไม่ได้ช่วยลด Inertia ลงอย่างก้าวกระโดดอีกต่อไป'],
          ['a(i) — Intra-cluster Distance', 'ระยะห่างเฉลี่ยจากจุด i ไปยังจุดอื่นๆ ในคลัสเตอร์เดียวกัน', 'วัดความกลมเกลียวภายในกลุ่ม (Cohesion) — ยิ่งน้อยยิ่งดี'],
          ['b(i) — Inter-cluster Distance', 'ระยะห่างเฉลี่ยจากจุด i ไปยังคลัสเตอร์อื่นที่อยู่ใกล้ที่สุด', 'วัดการแยกตัวออกจากกลุ่มอื่น (Separation) — ยิ่งมากยิ่งดี'],
          ['Silhouette Score s(i)', '[b(i) − a(i)] / max(a(i), b(i))', 'เข้าใกล้ +1 = ดีเยี่ยม | ใกล้ 0 = คาบเกี่ยวขอบกลุ่ม | ติดลบ = อยู่ผิดกลุ่ม'],
        ],
      },
      keyPoints: [
        'ข้อจำกัดของ K-Means: ต้องระบุจำนวนกลุ่ม k ล่วงหน้า, ไวต่อการสุ่มจุดเริ่มต้น (Initial Centroids), และไวต่อ Outliers อย่างมากเพราะใช้ค่าเฉลี่ย (Mean)',
      ],
    },
  ],
};
