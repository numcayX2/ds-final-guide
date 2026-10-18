import type { StudyModule } from '../../types/study';

export const module10CrispAction: StudyModule = {
  id: 'module-10-crisp-action',
  moduleNumber: '10',
  title: 'CRISP-DS in Action & Cross-Functional Delivery',
  titleEn: 'Roles, Artifacts, Contracts & MLOps Governance',
  lectureCode: 'Lect 10',
  isFinalFocus: true,
  timeEstimateMinutes: 20,
  quickSummary: 'บทบาท 6 ตำแหน่งข้อมูล, ห่วงโซ่การส่งมอบ Artifacts 9 ขั้นตอน, ข้อแตกต่างระหว่าง Decision Contract vs Decision Memo และกลไก MLOps Backtrack Trigger',
  coreFormulas: [],
  examTraps: [
    {
      trapTitle: 'สับสนระหว่าง Decision Contract กับ Decision Memo',
      trapDescription: 'เข้าใจผิดว่า Decision Contract ทำช่วงประเมินผลโมเดล หรือคิดว่าทั้งสองเอกสารคือสิ่งเดียวกัน',
      correctApproach: 'Decision Contract ทำที่ "ต้นโครงการ" (Business Understanding) โดย BA + BU เพื่อตกลงขอบเขตก่อนขอข้อมูลหรือเลือกโมเดล ส่วน Decision Memo ทำช่วง "Evaluation" โดย BA + Data Scientist + Privacy เพื่อบันทึกคำตัดสินจริง เหตุผล และเงื่อนไข Pilot',
      slideRef: 'Lect 10 p06, p12',
    },
    {
      trapTitle: 'การให้ AI ตัดสินใจหรืออนุมัติการกระทำโดยอัตโนมัติ',
      trapDescription: 'ข้อสอบถามว่าเมื่อโมเดลทำนายเสร็จแล้ว ระบบสามารถส่งข้อเสนอให้ลูกค้าได้ทันทีหรือไม่',
      correctApproach: 'ห้ามส่งข้อเสนออัตโนมัติเด็ดขาด! AI เป็นเพียงผู้ช่วยร่างหรือส่งสัญญาณเตือน (Alert) ทุกจุดส่งต่อต้องมี "Human Checkpoint" โดย Business Unit เป็นผู้อนุมัติการกระทำภายใต้เงื่อนไขเสมอ',
      slideRef: 'Lect 10 p08, p14',
    },
    {
      trapTitle: 'การจัดการเมื่อเกิด Concept Drift หรือ Recall ตกใน Pilot',
      trapDescription: 'คิดว่าเมื่อประสิทธิภาพโมเดลตกในการทดสอบ Pilot ให้ลดเกณฑ์ Recall ลง หรือจูนโมเดลบน Test Data เพื่อให้ผ่าน',
      correctApproach: 'ห้ามลดเกณฑ์และห้ามจูนบน Test! เมื่อ MLOps ตรวจพบสัญญาณผิดปกติ BU ต้องสั่งพักใช้ตาม Runbook แล้วส่ง Backtrack Task ย้อนกลับไปแก้ที่ต้นเหตุ (Data Understanding หรือ Data Preparation)',
      slideRef: 'Lect 10 p16–18',
    },
  ],
  sections: [
    {
      title: '6 บทบาทในทีมข้อมูลยุคใหม่ (Different Roles, One Goal)',
      conceptSummary: 'ทุกบทบาทร่วมกันเปลี่ยนข้อมูลให้เป็น Insight, Prediction และ AI Product โดยมีหน้าที่และความเชี่ยวชาญเฉพาะด้าน',
      keyPoints: [
        'Data Engineer: วางรากฐาน Pipeline, Platform, ดูแลคุณภาพและความปลอดภัยของข้อมูล (Airflow, dbt, AWS)',
        'Analytics Engineer: แปลงและเตรียมข้อมูลให้พร้อมวิเคราะห์ ทำ Data Mart, ETL/ELT, Feature Contract (SQL, Snowflake)',
        'Data Analyst: สำรวจข้อมูล (EDA Finding), วิเคราะห์แนวโน้ม KPI และสร้าง Dashboard (Tableau, Power BI)',
        'Data Scientist: ค้นหารูปแบบ สร้างโมเดล ML (Decision Tree, K-Means), ทดสอบสมมติฐานทางสถิติ (Python, scikit-learn)',
        'ML Engineer: นำโมเดลขึ้นใช้งานจริง (Controlled Handoff, Pilot Runbook, API, Docker)',
        'AI Engineer: พัฒนาและประยุกต์ใช้ AI Solution เช่น LLM, RAG, AI Agent/Chatbot (LangChain, Hugging Face)',
      ],
      tableData: {
        headers: ['บทบาท', 'เป้าหมายหลัก', 'Artifact ที่ส่งมอบ'],
        rows: [
          ['Data Engineer', 'Build the Foundation', 'Data Intake & Lineage Check'],
          ['Analytics Engineer', 'Prepare for Analysis', 'Customer Table & Feature Contract'],
          ['Data Analyst', 'Understand the Business', 'EDA Finding (ไม่ใช่แค่กราฟ)'],
          ['Data Scientist', 'Discover & Predict', 'Model Note & Evaluation Evidence'],
          ['ML Engineer', 'Build & Deploy', 'Controlled Handoff + Pilot Runbook'],
          ['MLOps / BU', 'Monitor & Approve', 'Monitoring Log & Human Approval Record'],
        ],
      },
    },
    {
      title: 'ห่วงโซ่ส่งมอบ Artifacts 9 ขั้นตอน & การ Backtrack',
      conceptSummary: 'หนึ่งคำถามธุรกิจเดินผ่านหลายมือ โดยมีเอกสารกำกับและคนรับผิดชอบทุกจุด หากพบปัญหาต้อง Feedback Loop ย้อนกลับ',
      keyPoints: [
        'Question Ticket → Decision Contract (BA + BU ตกลงกันตั้งแต่ต้นโครงการ)',
        'Feature Contract: Feature ต้องมีอยู่จริงก่อนเวลาตัดสินใจ (ป้องกัน Data Leakage)',
        'EDA Finding: ส่งต่อข้อค้นพบทางสถิติพร้อมข้อจำกัดข้อมูล ไม่ใช่แค่ภาพกราฟ',
        'Decision Tree (ใครเสี่ยง) และ K-Means (กลุ่มต่างกันอย่างไร) ยังไม่พิสูจน์ผลลัพธ์ของการติดต่อ',
        'Decision Memo: บันทึกคำตัดสินช่วง Evaluation (Accept / Revise / Reject)',
        'สัญญาณเตือน (Recall กลุ่มใหม่ต่ำกว่าเกณฑ์) → MLOps แจ้ง → BU สั่งพักใช้ → Backtrack แก้ต้นเหตุ',
      ],
    },
  ],
};
