import type { StudyModule } from '../../types/study';

export const module10CrispAction: StudyModule = {
  id: 'module-10-crisp-action',
  moduleNumber: '10',
  title: 'CRISP-DS in Action & Cross-Functional Delivery',
  titleEn: 'Roles, Artifacts, Contracts & MLOps Governance',
  lectureCode: 'Lect 10',
  isFinalFocus: true,
  timeEstimateMinutes: 25,
  quickSummary: 'บทบาท 6 ตำแหน่งข้อมูล, ห่วงโซ่การส่งมอบ Artifacts 9 ขั้นตอน, ข้อแตกต่างระหว่าง Decision Contract vs Decision Memo, Subgroup Metric Disparity (84% vs 54%) และกลไก MLOps Backtrack Trigger',
  coreFormulas: [],
  examTraps: [
    {
      trapTitle: 'สับสนระหว่าง Decision Contract กับ Decision Memo',
      trapDescription: 'เข้าใจผิดว่า Decision Contract ทำช่วงประเมินผลโมเดล หรือคิดว่าทั้งสองเอกสารคือสิ่งเดียวกัน',
      correctApproach: 'Decision Contract ทำที่ "ต้นโครงการ" (Business Understanding) โดย BA + BU เพื่อตกลงขอบเขตก่อนขอข้อมูลหรือเลือกโมเดล ส่วน Decision Memo ทำช่วง "Evaluation" โดย BA + Data Scientist + Privacy เพื่อบันทึกคำตัดสินจริง เหตุผล และเงื่อนไข Pilot',
      slideRef: 'Lect 10 p06, p14',
    },
    {
      trapTitle: 'การให้ AI ตัดสินใจหรืออนุมัติการกระทำโดยอัตโนมัติ (Autonomous AI Trap)',
      trapDescription: 'ข้อสอบถามว่าเมื่อโมเดลทำนายเสร็จแล้ว ระบบสามารถส่งข้อเสนอหาลูกค้าได้ทันทีหรือไม่',
      correctApproach: 'ห้ามส่งข้อเสนอหรืออนุมัติงบประมาณอัตโนมัติเด็ดขาด! AI เป็นเพียงผู้ช่วยร่าง (Draft) หรือส่งสัญญาณเตือน (Alert) ทุกจุดส่งต่อต้องมี "Human Checkpoint" โดย Business Unit เป็นผู้อนุมัติการกระทำและถือปุ่มตัดไฟฉุกเฉิน (Kill-Switch) เสมอ',
      slideRef: 'Lect 10 p13, p16',
    },
    {
      trapTitle: 'กับดักความแม่นยำภาพรวมกลบเกลื่อนกลุ่มย่อย (Subgroup Metric Disparity)',
      trapDescription: 'เห็นตัวเลข Overall Accuracy สูงถึง 84% แล้วอนุมัติปล่อยโมเดลใช้งานทันทีโดยไม่ตรวจกลุ่มย่อย',
      correctApproach: 'ห้ามตัดสินใจบน Aggregate Accuracy เดี่ยวๆ! ในสไลด์หน้า 11 แม้ Overall Accuracy = 84% แต่ Recall ในกลุ่มลูกค้าใหม่ (New Customers) กลับตกฮวบเหลือเพียง 54% ซึ่งเสี่ยงต่อการหลุดรอด จึงต้องสรุปผลเป็น "ปรับก่อนใช้" (Conditional Rollout)',
      slideRef: 'Lect 10 p11, p14',
    },
    {
      trapTitle: 'การจัดการเมื่อเกิด Concept Drift หรือ Recall ตกในขั้นตอน Pilot',
      trapDescription: 'คิดว่าเมื่อประสิทธิภาพโมเดลตกในการทดสอบ Pilot ให้ลดเกณฑ์ Recall ลง หรือจูนโมเดลบน Test Data เพื่อให้ผ่าน',
      correctApproach: 'ห้ามลดเกณฑ์และห้ามจูนบน Test! เมื่อ MLOps ตรวจพบสัญญาณผิดปกติ BU ต้องสั่งพักใช้ตาม Runbook แล้วส่ง Backtrack Task ย้อนกลับไปแก้ที่ต้นเหตุ (Data Understanding, Data Preparation หรือ Evaluation)',
      slideRef: 'Lect 10 p17–18',
    },
  ],
  sections: [
    {
      title: '1. 6 บทบาทในทีมข้อมูลยุคใหม่ (Different Roles, One Goal)',
      conceptSummary: 'ทุกบทบาทร่วมกันเปลี่ยนข้อมูลให้เป็น Insight, Prediction และ AI Product โดยมีหน้าที่และความเชี่ยวชาญเฉพาะด้าน (Lect 10 p02)',
      keyPoints: [
        'Data Engineer: วางรากฐาน Pipeline, Data Platform, ดูแลคุณภาพ ความปลอดภัย และ Data Lineage (Airflow, dbt, Spark, AWS/GCP)',
        'Analytics Engineer: แปลงและเตรียมข้อมูลให้พร้อมวิเคราะห์ ทำ Data Mart, Feature Contract คุม Point-in-time correctness (SQL, Snowflake, BigQuery, dbt)',
        'Data Analyst: สำรวจข้อมูล (EDA Finding), วิเคราะห์หาสาเหตุ (Diagnostic), ติดตาม KPI และสร้าง Dashboard (Tableau, Power BI, SQL)',
        'Data Scientist: ทดสอบสมมติฐานทางสถิติ สร้างโมเดล ML (Decision Tree, K-Means) ประเมินผลแยกกลุ่มย่อย (Python, scikit-learn, Jupyter)',
        'ML Engineer: นำโมเดลขึ้นใช้งานจริง (Controlled Handoff, Pilot Runbook, API, Containerization, Docker, MLflow)',
        'AI Engineer: พัฒนาและประยุกต์ใช้ AI Solution เช่น LLM, RAG, AI Agent/Chatbot (LangChain, Hugging Face, Vector DB)',
      ],
      tableData: {
        headers: ['บทบาท (Role)', 'เป้าหมายหลัก', 'เทคโนโลยีหลัก', 'Artifact ที่ส่งมอบ'],
        rows: [
          ['Data Engineer', 'Build Foundation', 'Airflow, dbt, Spark, S3', 'Data Intake & Lineage Check'],
          ['Analytics Engineer', 'Prepare for Analysis', 'SQL, Snowflake, dbt', 'Customer Table & Feature Contract'],
          ['Data Analyst', 'Understand Business', 'Tableau, Power BI, SQL', 'EDA Finding (ไม่ใช่แค่กราฟ)'],
          ['Data Scientist', 'Discover & Predict', 'Python, scikit-learn', 'Model Note & Evaluation Evidence'],
          ['ML Engineer', 'Build & Deploy', 'Docker, FastAPI, MLflow', 'Controlled Handoff + Pilot Runbook'],
          ['AI Engineer', 'Scale GenAI / Agents', 'LangChain, LLMs, Vector DB', 'AI Assistant Drafts & Trigger Alerts'],
        ],
      },
    },
    {
      title: '2. ห่วงโซ่ส่งมอบ Artifacts 9 ขั้นตอน & การเปรียบเทียบสัญญา',
      conceptSummary: 'หนึ่งคำถามธุรกิจเดินผ่านหลายมือ โดยมีเอกสารกำกับและคนรับผิดชอบทุกจุด (Lect 10 p05–10)',
      keyPoints: [
        'Question Ticket → Decision Contract (BA + BU ตกลงผู้มีอำนาจตัดสินใจ ทางเลือก และเกณฑ์ชี้วัด)',
        'Data Intake Check: ตรวจสอบ Key Linkage ข้ามระบบ, ประวัติเวลา และสิทธิ์ Consent ตาม PDPA',
        'Feature Contract: บังคับกฎ Point-in-time correctness ค่าของฟีเจอร์ต้องเกิดก่อนเวลาตัดสินใจ (T < T0) ห้ามนำอนาคตมาคิด',
        'EDA Finding: ส่งต่อข้อค้นพบทางสถิติ การกระจายตัว และข้อจำกัดข้อมูล ไม่ใช่แค่พล็อตกราฟสวยงาม',
        'Model Note: อธิบายทั้งโมเดลทำนาย (Decision Tree) และโมเดลแบ่งกลุ่ม (K-Means) พร้อมแจกแจงข้อจำกัด',
      ],
      tableData: {
        headers: ['มิติเปรียบเทียบ', 'Decision Contract (ต้นโครงการ)', 'Decision Memo (ขั้นตอนประเมินผล)'],
        rows: [
          ['ช่วงเวลาที่ทำ', 'Stage 1: Business Understanding', 'Stage 6: Evaluation'],
          ['ผู้รับผิดชอบหลัก', 'Business Analyst + Business Unit', 'Business Analyst + Data Scientist + Privacy Officer'],
          ['สาระสำคัญในเอกสาร', 'ตกลงขอบเขต, ทางเลือก, และเกณฑ์ความสำเร็จ (Threshold)', 'บันทึกผลการทดสอบจริง, ความเสี่ยงรายกลุ่ม, และคำตัดสินใจ'],
          ['ผลลัพธ์ที่เป็นไปได้', 'ขอบเขตโครงการที่พร้อมดึงข้อมูล', 'Accept (ผ่าน) / Revise (ปรับก่อนใช้) / Reject (ระงับ)'],
        ],
      },
    },
    {
      title: '3. Analytics Continuum & ข้อจำกัดของโมเดลเชิงเหตุและผล',
      conceptSummary: 'การจัดลำดับชั้นการวิเคราะห์ข้อมูลและข้อจำกัดระหว่าง Correlation กับ Causality (Lect 10 p10, p12)',
      keyPoints: [
        'Descriptive: เกิดอะไรขึ้น? (สรุปรายงานและ Dashboard)',
        'Diagnostic: ทำไมจึงเกิด? (EDA หาความสัมพันธ์และจุดบกพร่อง)',
        'Predictive: จะเกิดอะไรขึ้นต่อไป? (Decision Tree ทำนายความเสี่ยง Inactive)',
        'Prescriptive: ควรทำอย่างไร? (ระบบแนะนำแผนกลยุทธ์และการทำ A/B Testing)',
        'AI-assisted: AI ช่วยร่าง สรุป และแจ้งเตือน แต่คนเป็นผู้ตัดสินใจขั้นสุดท้าย',
        'จุดระวังข้อสอบ: ทั้ง Decision Tree และ K-Means เพียงอย่างเดียว "ยังไม่พิสูจน์ผลลัพธ์ของการติดต่อ" (Causality) ว่าลูกค้าจะกลับมาซื้อจริงหรือไม่!',
      ],
    },
    {
      title: '4. Subgroup Metric Disparity & การตัดสินใจ "ปรับก่อนใช้"',
      conceptSummary: 'ภาพลวงตาของค่าเฉลี่ยรวมกับการคัดกรองความเสี่ยงรายกลุ่มย่อย (Lect 10 p11, p14)',
      keyPoints: [
        'Overall Accuracy 84% ดูน่าพึงพอใจ แต่ Recall ในกลุ่มลูกค้าใหม่ต่ำเพียง 54%',
        'ความเสี่ยง: หากปล่อยโมเดลไปใช้งานทันที ลูกค้าใหม่ที่กำลังจะหลุดหายไปเกือบครึ่งหนึ่งจะไม่ได้รับการดูแล',
        'Decision Memo จึงลงมติเป็น "ปรับก่อนใช้" (Conditional Rollout) โดยบังคับให้มีการเฝ้าระวังกลุ่มลูกค้าใหม่อย่างใกล้ชิด',
        'Human-in-the-Loop: AI มีหน้าที่ร่างคำแนะนำ แต่ผู้มีอำนาจสั่งการและอนุมัติงบประมาณต้องเป็น Business Unit เท่านั้น',
      ],
      tableData: {
        headers: ['กลุ่มลูกค้า (Cohort)', 'Accuracy', 'Recall', 'การประเมินความพร้อมใช้งาน'],
        rows: [
          ['ภาพรวมทั้งระบบ (Overall)', '84%', '78%', 'ดูเหมือนผ่านเกณฑ์ความแม่นยำรวม'],
          ['กลุ่มลูกค้าประจำ (Existing)', '88%', '85%', 'ทำงานได้ดีตามปกติ'],
          ['กลุ่มลูกค้าใหม่ (New Customers)', '76%', '54% (ต่ำวิกฤต)', 'หลุดรอดไปถึง 46% ต้องปรับก่อนใช้!'],
        ],
      },
    },
    {
      title: '5. MLOps Monitoring Contract, Runbook & กลไก Backtrack',
      conceptSummary: 'การควบคุมหลังนำโมเดลไปทดลองใช้จริงและการย้อนกลับตามสาเหตุ (Lect 10 p15, p17–18)',
      keyPoints: [
        'Pilot Runbook: กำหนด Versioning, Gated Deployment, Audit Log และปุ่มตัดไฟฉุกเฉิน (Kill-Switch)',
        'Monitoring Contract: แยกผู้รับผิดชอบตามสัญญาณ (MLOps+DS ดู Recall, BU ดูข้อร้องเรียน, BA+DA ดูยอดซื้อกลับมาเทียบเป้า)',
        'กลไก Backtrack: สัญญาณเตือน (Recall ตก) → MLOps แจ้งเตือน → BU สั่งพักใช้ตาม Runbook → ทีมโมเดลตรวจหาสาเหตุ → ย้อนกลับไปแก้ที่ Data Understanding, Data Preparation หรือ Evaluation',
      ],
      tableData: {
        headers: ['สัญญาณเตือน (Signal)', 'ผู้รับผิดชอบติดตาม', 'การดำเนินการเมื่อเกินขอบเขต'],
        rows: [
          ['คุณภาพข้อมูล & Subgroup Recall', 'MLOps + Data Scientist', 'ตรวจ Data Drift / Feature เสื่อมสภาพ'],
          ['ข้อร้องเรียนจากลูกค้า', 'Business Unit', 'ตรวจสอบผลกระทบและสิทธิ์ผู้บริโภค'],
          ['การกลับมาซื้อซ้ำเทียบ ROI', 'Business Analyst + Data Analyst', 'ประเมินความคุ้มค่าทางการเงิน'],
        ],
      },
    },
    {
      title: '6. การนำเสนองาน Final Project: จาก Problem สู่ Value',
      conceptSummary: 'กรอบความคิด 4 ขั้นตอนในการทำ Handoff Board เพื่อเล่าโครงงาน Data Science ให้สมบูรณ์ (Lect 10 p19–20)',
      keyPoints: [
        'ขั้นตอนที่ 1: เลือก 3 จุดส่งต่อ (Phase, หลักฐาน Artifact, เจ้าของ Owner/ผู้รับถัดไป)',
        'ขั้นตอนที่ 2: ระบุ Analytics Level ที่ตอบได้และระดับที่ยังขาด (Descriptive, Diagnostic, Predictive, Prescriptive)',
        'ขั้นตอนที่ 3: ระบุงาน AI Assistant 1 อย่าง พร้อมระบุชื่อคนตรวจ (Human Oversight)',
        'ขั้นตอนที่ 4: สรุปคำตัดสิน, ผู้อนุมัติ, สิ่งติดตาม และจุดหยุด/ย้อนกลับ (Circuit Breaker / Backtrack)',
        'หัวใจสำคัญ: เล่าให้ครบจาก Problem → Data → Insight → Decision → Value และรู้ว่าต้องย้อนกลับไปแก้ตรงไหนเมื่อหลักฐานเปลี่ยน',
      ],
    },
  ],
};
