import type { StudyModule } from '../../types/study';

export const module08Kmeans: StudyModule = {
  id: 'module-08-kmeans',
  moduleNumber: '08',
  title: 'K-Means Clustering & การประเมินกลุ่ม',
  titleEn: 'K-Means Clustering, Distance & Inertia',
  lectureCode: 'Lect 08 p12-37',
  isFinalFocus: true,
  timeEstimateMinutes: 25,
  quickSummary: 'อัลกอริทึม K-Means ขั้นตอนการจัดกลุ่ม 8 จุด (A1-A8), ฟังก์ชันระยะทาง Manhattan vs Euclidean, กับดักสูตร Inertia/WCSS และ Silhouette Score',
  coreFormulas: ['kmeans-distance-centroid', 'silhouette-score'],
  examTraps: [
    {
      trapTitle: 'กับดักสูตร K-Means: Manhattan vs Squared Euclidean Distance',
      trapDescription: 'นำฟังก์ชันระยะทางในการ Assign จุดไปปนกับสูตรวัด Compactness (Inertia)',
      correctApproach: 'ในสไลด์ขั้นตอน Assign จุดเข้ากลุ่ม อาจารย์ใช้ "Manhattan Distance" (|x1-c1| + |x2-c2|) เพื่อคิดเลขง่ายในห้องสอบ แต่สูตร Inertia/WCSS (p35) ใช้ "Squared Euclidean Distance" (||x - Ck||^2) ห้ามจำสลับกัน!',
      slideRef: 'Lect 08 p25, p35',
    },
    {
      trapTitle: 'เป้าหมายหลักของการทำ Clustering',
      trapDescription: 'สับสนระหว่าง Intra-cluster และ Inter-cluster similarity',
      correctApproach: 'เป้าหมายคือ: "Maximize Intra-cluster Similarity" (จุดในกลุ่มเดียวกันชิดกันที่สุด) และ "Minimize Inter-cluster Similarity" (จุดต่างกลุ่มแยกห่างจากกันที่สุด)',
      slideRef: 'Lect 08 p12',
    },
  ],
  sections: [
    {
      title: '1. ขั้นตอนการจัดกลุ่ม K-Means รอบที่ 1 (8 จุดจริงในสไลด์)',
      conceptSummary: 'ตัวอย่างการคำนวณที่ออกสอบทุกเทอม',
      keyPoints: [
        'จุดข้อมูล 8 จุด: A1(2,10), A2(2,5), A3(8,4), A4(5,8), A5(7,5), A6(6,4), A7(1,2), A8(4,9)',
        'Centroid เริ่มต้น: C1(2,10), C2(5,8), C3(1,2)',
        'การจัดกลุ่มรอบ 1 (Manhattan Distance): Cluster 1 มี {A1}, Cluster 2 มี {A3, A4, A5, A6, A8}, Cluster 3 มี {A2, A7}',
        'Centroid ใหม่รอบถัดไป: C1_new = (2, 10), C2_new = (30/5, 30/5) = (6, 6), C3_new = (3/2, 7/2) = (1.5, 3.5)',
      ],
    },
    {
      title: '2. การประเมินคุณภาพคลัสเตอร์ (Evaluation Metrics)',
      conceptSummary: 'Inertia และ Silhouette Score',
      keyPoints: [
        'Inertia (Within-Cluster Sum of Squares - WCSS): วัดความแน่นหนา (Compactness) ยิ่งน้อยยิ่งเกาะกลุ่มแน่น',
        'Elbow Method: หาจุดหักข้อศอกบนกราฟ Inertia vs k เพื่อเลือกจำนวนคลัสเตอร์ที่เหมาะสม',
        'Silhouette Score: s(i) = [b(i) - a(i)] / max(a(i), b(i)) ช่วง [-1, +1]',
        '+1 คือจัดกลุ่มยอดเยี่ยม, 0 คืออยู่รอยต่อ, ติดลบคืออยู่ผิดกลุ่ม',
      ],
    },
  ],
};
