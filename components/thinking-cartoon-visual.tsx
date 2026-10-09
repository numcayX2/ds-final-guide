"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { EpisodeId } from "@/content/types";

/* ------------------------------------------------------------------ */
/* Generative 2D Vector Cartoon Thought System                         */
/* Visualizing mental models, exam shortcuts, and pitfall radars       */
/* ------------------------------------------------------------------ */

export type ThinkingLens = "mental-model" | "exam-shortcut" | "trap-radar";

export interface CartoonSceneData {
  title: string;
  subtitle: string;
  conceptMascotEmotion: "thinking" | "eureka" | "alert" | "focused" | "calculating";
  quote: string;
  formulaCallout?: string;
  mentalModelDoodle: string;
  examShortcut: string;
  trapAlert: string;
  sparks: Array<{ icon: string; text: string; color: "accent" | "mint" | "amber" | "rose" }>;
}

/** Comprehensive cartoon thought data for every step across all 6 episodes */
export const EPISODE_CARTOON_STEPS: Record<EpisodeId, CartoonSceneData[]> = {
  /* ============================ EP01: Boxplot & Outliers ============================ */
  ep01: [
    {
      title: "วางหมุดสถิติ 5 ตัวแรก",
      subtitle: "Min · Q1 · Median · Q3 · Max",
      conceptMascotEmotion: "focused",
      quote: "เรียงข้อมูลจากน้อยไปมากก่อนเสมอ! Q1, Median, Q3 คือเสาหลักที่แบ่งข้อมูลออกเป็น 4 ส่วนเท่ากัน",
      formulaCallout: "Q1=20 · Median=28 · Q3=35",
      mentalModelDoodle: "boxplot-5num",
      examShortcut: "Median คือข้อมูลตำแหน่งตรงกลาง (50%) ส่วน Q1 และ Q3 คือจุดแบ่ง 25% และ 75%",
      trapAlert: "ระวังลืมเรียงข้อมูล (Sort) ก่อนหาตำแหน่ง! ถ้าไม่เรียง ตัวเลขจะเพี้ยนทั้งระบบ",
      sparks: [
        { icon: "📍", text: "5 Milestones", color: "accent" },
        { icon: "📊", text: "แบ่ง 4 ส่วนละ 25%", color: "mint" },
      ],
    },
    {
      title: "สร้างกล่องปลอดภัย (IQR Box)",
      subtitle: "ความกว้างของประชากร 50% ตรงกลาง",
      conceptMascotEmotion: "calculating",
      quote: "IQR = Q3 - Q1 คือความกว้างของตัวกล่อง ข้อมูล 50% หลักอาศัยอยู่ในกล่องนี้อย่างปลอดภัย!",
      formulaCallout: "IQR = 35 - 20 = 15",
      mentalModelDoodle: "boxplot-iqr",
      examShortcut: "IQR คือระยะห่างระหว่าง Q3 กับ Q1 เท่านั้น ไม่เกี่ยวกับค่า Min หรือ Max",
      trapAlert: "อย่าเอา Q3 ลบ Q2 หรือเอา Max ลบ Min! (Max - Min คือ Range ปกติ ไม่ใช่ IQR)",
      sparks: [
        { icon: "📦", text: "กล่อง 50% กลาง", color: "mint" },
        { icon: "📏", text: "ความกว้าง = 15", color: "accent" },
      ],
    },
    {
      title: "กางรั้วลวดหนาม 1.5×IQR",
      subtitle: "รั้วล่าง (Lower) & รั้วบน (Upper)",
      conceptMascotEmotion: "alert",
      quote: "รั้วเป็นเส้นสมมติในอากาศ! ถอยจาก Q1 ลงไป 1.5 เท่า และยื่นจาก Q3 ขึ้นไป 1.5 เท่า ใครข้ามรั้วคือหลุดโลก!",
      formulaCallout: "รั้วล่าง: 20 - 22.5 = -2.5 | รั้วบน: 35 + 22.5 = 57.5",
      mentalModelDoodle: "boxplot-fences",
      examShortcut: "จำสูตรคูณ 1.5 เสมอ: 1.5 × 15 = 22.5 นำไปลบออกจาก Q1 และบวกเข้ากับ Q3",
      trapAlert: "รั้วไม่ใช่ Whisker! รั้วเป็นเกณฑ์ตัดสิน ไม่ใช่จุดสิ้นสุดของหนวดกล่อง",
      sparks: [
        { icon: "🚧", text: "รั้วล่าง = -2.5", color: "amber" },
        { icon: "🚧", text: "รั้วบน = 57.5", color: "accent" },
      ],
    },
    {
      title: "หนวดกล่อง (Whisker) หยุดที่ค่าจริง!",
      subtitle: "กฎเหล็กข้อสอบ Lect 05 สไลด์ 17",
      conceptMascotEmotion: "eureka",
      quote: "Whisker ห้ามวาดเลยไปถึงรั้ว! ต้องสิ้นสุดที่ 'ค่าจริงสุดท้าย' ที่ยังไม่เกินรั้ว นั่นคือ 50!",
      formulaCallout: "Whisker สิ้นสุดที่ 50 (ไม่ใช่ 57.5)",
      mentalModelDoodle: "boxplot-whisker",
      examShortcut: "สไลด์เน้นคำว่า: 'Fence เป็นเกณฑ์ ส่วน Whisker สิ้นสุดที่ค่าจริงสุดท้ายซึ่งยังอยู่ภายใน Fence'",
      trapAlert: "จุดลวง 90%: นักศึกษาชอบลาก Whisker ไปแตะ 57.5 ทันที — จะโดนหักคะแนน!",
      sparks: [
        { icon: "🛑", text: "หยุดที่ 50 (ค่าจริง)", color: "rose" },
        { icon: "⚠️", text: "ห้ามแตะ 57.5", color: "amber" },
      ],
    },
    {
      title: "จับ Outlier นอกรั้ว!",
      subtitle: "ค่า 58 กระโดดข้ามรั้วบน 57.5",
      conceptMascotEmotion: "alert",
      quote: "จับได้แล้ว! ข้อมูลค่า 58 สูงกว่ารั้วบน 57.5 จึงถือเป็น Outlier ต้องจุดแยกออกมานอกหนวดกล่อง!",
      formulaCallout: "58 > 57.5 -> Outlier ตรวจจับสำเร็จ!",
      mentalModelDoodle: "boxplot-outlier",
      examShortcut: "ถ้าข้อมูลค่ามากสุดคือ 50 จะไม่มี Outlier แต่ถ้าเป็น 58 ปุ๊บ 58 จะหลุดเป็น Outlier ทันที",
      trapAlert: "ถ้าข้อสอบถามว่าค่า 50 เป็น Outlier ไหม? ตอบ 'ไม่เป็น' เพราะ 50 <= 57.5",
      sparks: [
        { icon: "🚨", text: "58 คือ Outlier", color: "rose" },
        { icon: "🎯", text: "วาดจุดแยกกลมๆ", color: "mint" },
      ],
    },
  ],

  /* ============================ EP02: Decision Tree & Gini ============================ */
  ep02: [
    {
      title: "โหนดพ่อแม่: จุดความสับสนสูงสุด",
      subtitle: "Active 6 คน vs Inactive 6 คน (50/50)",
      conceptMascotEmotion: "thinking",
      quote: "เมื่อข้อมูลสองฝั่งผสมกันครึ่งต่อครึ่ง ความมั่ว (Impurity) จะพุ่งสูงสุด Gini = 0.500!",
      formulaCallout: "Gini(Root) = 1 - (6/12)² - (6/12)² = 0.500",
      mentalModelDoodle: "tree-parent",
      examShortcut: "2 คลาสเท่ากัน (p=0.5) Gini จะเท่ากับ 0.5 เสมอ ถ้าคลาสเดียวล้วน Gini = 0 (บริสุทธิ์)",
      trapAlert: "อย่าลืมยกกำลังสองก่อนแล้วค่อยรวม! สูตรคือ 1 - sum(p_i²)",
      sparks: [
        { icon: "⚖️", text: "ผสม 50:50", color: "amber" },
        { icon: "🌪️", text: "Gini สูงสุด = 0.500", color: "rose" },
      ],
    },
    {
      title: "ทดลองผ่า Candidate A (<= 45 วัน)",
      subtitle: "ได้กลุ่มที่สะอาดขึ้นมาก (5/1 และ 1/5)",
      conceptMascotEmotion: "calculating",
      quote: "ถ้าผ่าด้วย <= 45 วัน ฝั่งซ้ายได้ 5 Active / 1 Inactive ความสะอาดพุ่งขึ้น ค่า Gini ลดฮวบเหลือ 0.278!",
      formulaCallout: "1 - (5/6)² - (1/6)² = 0.278",
      mentalModelDoodle: "tree-split-a",
      examShortcut: "5/6 กำลังสองได้ 25/36, 1/6 กำลังสองได้ 1/36 รวมเป็น 26/36 -> 1 - 26/36 = 10/36 = 0.278",
      trapAlert: "คำนวณแต่ละโหนดลูกแยกกันก่อน อย่าเพิ่งเอาจำนวนคนมาคูณในขั้นตอนนี้",
      sparks: [
        { icon: "✂️", text: "แยก 5/1 กับ 1/5", color: "mint" },
        { icon: "✨", text: "Gini ลดลงเหลือ 0.278", color: "accent" },
      ],
    },
    {
      title: "ถัวเฉลี่ยน้ำหนักสองฝั่ง (Weighted Gini)",
      subtitle: "น้ำหนักฝั่งละ 6 คนจากทั้งหมด 12 คน",
      conceptMascotEmotion: "focused",
      quote: "นำ Gini แต่ละฝั่งมาถัวตามสัดส่วนประชากร ฝั่งซ้าย 6/12 และฝั่งขวา 6/12 ถัวแล้วได้ 0.278 พอดี",
      formulaCallout: "Weighted Gini(A) = (6/12)(0.278) + (6/12)(0.278) = 0.278",
      mentalModelDoodle: "tree-weighted-a",
      examShortcut: "ถ้าสองฝั่งจำนวนคนเท่ากันและ Gini เท่ากัน ผลรวมถัวเฉลี่ยจะเท่ากับค่านั้นทันที",
      trapAlert: "ถ้าจำนวนคนสองฝั่งไม่เท่ากัน (เช่น 8 คน กับ 4 คน) ต้องคูณด้วย 8/12 และ 4/12 ห้ามบวกหารสองดื้อๆ",
      sparks: [
        { icon: "⚖️", text: "น้ำหนัก 6/12 เท่ากัน", color: "accent" },
        { icon: "📉", text: "Weighted = 0.278", color: "mint" },
      ],
    },
    {
      title: "ทดสอบ Candidate B (<= 2 ชิ้น)",
      subtitle: "ได้ 2/4 และ 4/2 ผลลัพธ์ยังมั่วอยู่",
      conceptMascotEmotion: "alert",
      quote: "Candidate B แยกได้ 2/4 กับ 4/2 ข้อมูลยังปนกันมั่วมาก Gini แต่ละฝั่งสูงถึง 0.444!",
      formulaCallout: "Weighted Gini(B) = (6/12)(0.444) + (6/12)(0.444) = 0.444",
      mentalModelDoodle: "tree-split-b",
      examShortcut: "ยิ่งตัวเลขสองคลาสในโหนดใกล้กัน (2 กับ 4) Gini จะยิ่งสูง (มั่ว) เมื่อเทียบกับ (5 กับ 1)",
      trapAlert: "Candidate B มี Weighted Gini สูงกว่า A แปลว่า B ทำความสะอาดได้แย่กว่า A",
      sparks: [
        { icon: "❌", text: "ยังมั่ว (0.444)", color: "amber" },
        { icon: "📊", text: "แย่กว่า Candidate A", color: "rose" },
      ],
    },
    {
      title: "คำนวณ Gain: ใครสะอาดขึ้นเยอะสุด?",
      subtitle: "Gini Gain = Gini(Parent) - Weighted Gini",
      conceptMascotEmotion: "eureka",
      quote: "Gain ของ A = 0.500 - 0.278 = 0.222 ส่วน B ได้แค่ 0.056 กฎเหล็ก: เลือกตัวที่ Gain สูงสุดเสมอ!",
      formulaCallout: "Gain(A) = 0.222 > Gain(B) = 0.056 -> เลือก A ชนะ!",
      mentalModelDoodle: "tree-gain-winner",
      examShortcut: "สไลด์ Lect 07 p.12 ฟันธง: 'Candidate Split ที่ได้ Highest Gini Gain จะถูกเลือกเป็นเงื่อนไขแรก'",
      trapAlert: "จำสับสน: Gini ต่ำดี แต่ Gini Gain สูงดี! ยิ่ง Gain เยอะแปลว่าลดความมั่วได้มาก",
      sparks: [
        { icon: "🏆", text: "A ชนะขาดลอย!", color: "mint" },
        { icon: "⚡", text: "Gain สูงสุด 0.222", color: "accent" },
      ],
    },
    {
      title: "เทคนิคเขียนตอบในห้องสอบ",
      subtitle: "เขียนการแทนค่าให้ครบ ห้ามลอยตัวเลข",
      conceptMascotEmotion: "focused",
      quote: "ในสไลด์พิมพ์สรุป 0.278 มาเลย แต่อาจารย์ตรวจข้อสอบต้องการเห็นสูตร 1 - (5/6)² - (1/6)² เต็มๆ!",
      formulaCallout: "เขียนสูตร -> แทนเศษส่วน -> ได้ทศนิยม 3 ตำแหน่ง",
      mentalModelDoodle: "tree-exam-sheet",
      examShortcut: "ตอบทศนิยม 3 ตำแหน่งเสมอ: 0.500, 0.278, 0.444, 0.222, 0.056",
      trapAlert: "ตัดทอนเลขเร็วเกินไปทำให้ทศนิยมคลาดเคลื่อน เช่น ปัด 0.278 เป็น 0.28 อาจโดนหักคะแนน",
      sparks: [
        { icon: "📝", text: "แทนค่าให้ครบ", color: "accent" },
        { icon: "💯", text: "ทศนิยม 3 ตำแหน่ง", color: "mint" },
      ],
    },
  ],

  /* ============================ EP03: Confusion Matrix ============================ */
  ep03: [
    {
      title: "ล็อคเป้า: ใครคือ Positive?",
      subtitle: "ถ้าตั้ง Positive ผิด ตัวเลขจะกลับหัวทันที",
      conceptMascotEmotion: "alert",
      quote: "เคสบอลโลก 2026: คลาสเป้าหมายคือ 'Play' (พร้อมลงเล่น) ใครลงเล่นคือ Positive! ไม่ลงเล่นคือ Negative!",
      formulaCallout: "Positive = Play | Negative = Rest",
      mentalModelDoodle: "matrix-positive",
      examShortcut: "อ่านโจทย์ให้ดีว่าถามคลาสไหน เช่น ถ้าโจทย์ถาม 'Churn' แปลว่าคนยกเลิกคือ Positive!",
      trapAlert: "ถ้าตั้ง Rest เป็น Positive ค่า Precision กับ Recall จะสลับเป็นอีกชุดทันที!",
      sparks: [
        { icon: "🎯", text: "Positive = Play", color: "accent" },
        { icon: "⚽", text: "โจทย์บอลโลก FIFA", color: "mint" },
      ],
    },
    {
      title: "แกะแผนผัง 2×2: จริง vs ทำนาย",
      subtitle: "แถวแนวนอน = ความจริง | คอลัมน์แนวตั้ง = โมเดลทาย",
      conceptMascotEmotion: "thinking",
      quote: "จำทิศให้แม่น: แถวคือ Reality (ความจริงบนโลก) ส่วนคอลัมน์คือ Prediction (สิ่งที่ระบบคอมพิวเตอร์ทาย)",
      formulaCallout: "แถว=Actual | คอลัมน์=Predicted",
      mentalModelDoodle: "matrix-layout",
      examShortcut: "ทายถูกอยู่แนวทแยงหลัก: บนซ้าย (TP) และล่างขวา (TN) คือที่ที่โมเดลทายถูก!",
      trapAlert: "ข้อสอบชอบสลับหัวตาราง เอา Predicted ไว้แถวแนวนอน ต้องมองหัวตารางก่อนเสมอ!",
      sparks: [
        { icon: "👤", text: "แถว = คนจริง", color: "mint" },
        { icon: "🤖", text: "คอลัมน์ = AI ทาย", color: "accent" },
      ],
    },
    {
      title: "นับแต้ม 10 แถวจากตารางจริง",
      subtitle: "TP=4, TN=3, FP=1, FN=2 (รวมครบ 10)",
      conceptMascotEmotion: "calculating",
      quote: "นับทีละคน: คนที่จริงเล่นทายเล่นมี 4 (TP), จริงพักทายพักมี 3 (TN), จริงพักแต่ทายเล่นมี 1 (FP), จริงเล่นแต่ทายพักมี 2 (FN)",
      formulaCallout: "TP=4 · TN=3 · FP=1 · FN=2 -> ผลรวม = 10",
      mentalModelDoodle: "matrix-counts",
      examShortcut: "ตรวจสอบยอดรวมเสมอ: 4 + 3 + 1 + 2 = 10 ถ้าไม่เท่ากับจำนวนแถวแปลว่านับเบิ้ลหรือนับตก!",
      trapAlert: "FN คือ 'ของจริงเขาเล่น แต่เราดันไปทายว่าพัก' (พลาดคนที่ควรลงเล่นไป)",
      sparks: [
        { icon: "✅", text: "TP=4 · TN=3", color: "mint" },
        { icon: "⚠️", text: "FP=1 · FN=2", color: "rose" },
      ],
    },
    {
      title: "วัด Accuracy & Precision",
      subtitle: "ความแม่นรวม (70%) vs ความแม่นเฉพาะที่ฟันธง (80%)",
      conceptMascotEmotion: "eureka",
      quote: "Accuracy = ทายถูกหมด / 10 = 70% | ส่วน Precision = จาก 5 คนที่โมเดลทายว่าเล่น มีคนเล่นจริงกี่คน? (4/5 = 80%)",
      formulaCallout: "Acc = (4+3)/10 = 70% | Prec = 4/(4+1) = 80%",
      mentalModelDoodle: "matrix-precision",
      examShortcut: "Precision มองตามแนวตั้งคอลัมน์ 'ทายว่า Play': ตัวเศษคือ TP ตัวส่วนคือผลรวมทั้งคอลัมน์ (TP + FP)",
      trapAlert: "อย่าเอา Accuracy มาใช้เดี่ยวๆ ในชุดข้อมูลที่มีคลาสไม่สมดุล (Imbalance)",
      sparks: [
        { icon: "🎯", text: "Accuracy = 70%", color: "mint" },
        { icon: "🔍", text: "Precision = 80%", color: "accent" },
      ],
    },
    {
      title: "เจาะจุดบอด Recall (66.67%)",
      subtitle: "ของจริงมี 6 คน แต่โมเดลจับได้แค่ 4 คน!",
      conceptMascotEmotion: "alert",
      quote: "ความจริงมีคนพร้อมเล่น 6 คน (TP 4 + FN 2) แต่โมเดลจับได้แค่ 4 คน จึงได้ Recall แค่ 4/6 = 66.67% ต่ำที่สุดในทุกตัว!",
      formulaCallout: "Recall = TP / (TP + FN) = 4 / 6 = 66.67%",
      mentalModelDoodle: "matrix-recall",
      examShortcut: "Recall มองตามแนวนอนแถว 'ความจริง Play': ตัวเศษคือ TP ตัวส่วนคือผลรวมทั้งแถว (TP + FN)",
      trapAlert: "ข้อสอบถาม: ตัวไหนคือตัววัดการปล่อยคนป่วย/คนพร้อมเล่นหลุดรอดไป? ตอบ 'Recall'!",
      sparks: [
        { icon: "🚨", text: "Recall หลุดรอด!", color: "rose" },
        { icon: "📉", text: "4/6 = 66.67%", color: "amber" },
      ],
    },
    {
      title: "ถัวเฉลี่ยฮาร์โมนิก F1-Score (72.73%)",
      subtitle: "2 × (Prec × Rec) / (Prec + Rec)",
      conceptMascotEmotion: "focused",
      quote: "Precision (80%) กับ Recall (66.7%) ขัดกัน! F1 ใช้ Harmonic Mean ดึงค่าถัวเฉลี่ยได้ 72.73% เสมอตัวเลขจริงในสไลด์!",
      formulaCallout: "F1 = 2(0.80 × 0.6667) / (0.80 + 0.6667) = 72.73%",
      mentalModelDoodle: "matrix-f1",
      examShortcut: "สูตรจำง่าย: 2TP / (2TP + FP + FN) = 2(4) / (8 + 1 + 2) = 8 / 11 = 0.7273!",
      trapAlert: "อย่าหา F1 ด้วยการบวกกันหารสองเฉยๆ (Arithmetic Mean)! ต้องใช้ Harmonic Mean เท่านั้น",
      sparks: [
        { icon: "⚖️", text: "Harmonic Mean", color: "accent" },
        { icon: "⭐", text: "F1 = 72.73%", color: "mint" },
      ],
    },
  ],

  /* ============================ EP04: K-Means Clustering ============================ */
  ep04: [
    {
      title: "โลกไร้เฉลย (Unsupervised)",
      subtitle: "8 จุดข้อมูลไม่มีป้ายกลุ่มกำกับ",
      conceptMascotEmotion: "thinking",
      quote: "โจทย์ K-Means ไม่มีใครบอกว่าจุดไหนคือกลุ่มไหน! หน้าที่ของเราคือหากลุ่มก้อนตามความใกล้ชิดทางเรขาคณิต",
      formulaCallout: "8 Points: A1..A8 บนแกน 2 มิติ",
      mentalModelDoodle: "kmeans-unlabeled",
      examShortcut: "K-Means เป็นแบบ Unsupervised Learning ไม่มีการป้อน Label ล่วงหน้า",
      trapAlert: "อย่าสับสนกับ K-NN! K-NN มี Label ชัดเจน ส่วน K-Means เป็นการจัดกลุ่มข้อมูลที่ไม่มี Label",
      sparks: [
        { icon: "🗺️", text: "8 จุดลอยไร้กลุ่ม", color: "accent" },
        { icon: "🔍", text: "Unsupervised", color: "mint" },
      ],
    },
    {
      title: "ปักหมุดสุ่มศูนย์กลาง k จุด",
      subtitle: "สไลด์กำหนด C1(2,10), C2(5,8), C3(1,2)",
      conceptMascotEmotion: "focused",
      quote: "สไลด์สุ่มเริ่มต้น 3 จุด: C1 คือจุด A1 พอดี, C2 คือจุด A4 พอดี, C3 คือจุด A7 พอดี!",
      formulaCallout: "C1(2,10) · C2(5,8) · C3(1,2)",
      mentalModelDoodle: "kmeans-centroids",
      examShortcut: "Centroid คือจุดสมมติ (ค่าเฉลี่ยของกลุ่ม) ในรอบแรกบังเอิญไปตรงกับจุดข้อมูลจริง",
      trapAlert: "ผลลัพธ์ของ K-Means ไวต่อจุดเริ่มต้นมาก ถ้าสุ่มต่างกัน ผลกลุ่มอาจไม่เหมือนกัน (Local Optimum)",
      sparks: [
        { icon: "📍", text: "k = 3 กลุ่ม", color: "accent" },
        { icon: "🚩", text: "ปักหมุด C1, C2, C3", color: "mint" },
      ],
    },
    {
      title: "วัดระยะ Manhattan (ฉบับคิดมือ)",
      subtitle: "|x1 - x2| + |y1 - y2| ไม่ติดรูท!",
      conceptMascotEmotion: "calculating",
      quote: "ข้อสอบให้คิดมือจึงใช้ Manhattan! แค่เอาผลต่างแกน X บวกผลต่างแกน Y ตรงๆ ห้ามยกกำลังสองถอดรูท!",
      formulaCallout: "Distance = |Δx| + |Δy|",
      mentalModelDoodle: "kmeans-manhattan",
      examShortcut: "เดินแบบถนนตารางหมากรุกในเมืองแมนฮัตตัน: เดินตามแกน X แล้วเลี้ยวเดินตามแกน Y",
      trapAlert: "ถ้าโจทย์สั่ง Euclidean ต้องใช้รูท แต่ในคลาสตัวอย่างใช้ Manhattan ถ้าสลับสูตรจะผิดทั้งตาราง!",
      sparks: [
        { icon: "🚕", text: "ระยะแท็กซี่", color: "amber" },
        { icon: "➕", text: "บวกค่าต่างตรงๆ", color: "mint" },
      ],
    },
    {
      title: "ดึงดูดเข้าหาหมุดที่ใกล้ที่สุด",
      subtitle: "เทียบระยะทั้ง 3 หมุด ใครสั้นสุดชนะ",
      conceptMascotEmotion: "focused",
      quote: "เช่น A3(8,4): ไป C1=12, ไป C2=7, ไป C3=9 -> 7 สั้นที่สุด จึงถูกดึงเข้ากลุ่ม C2 ทันที!",
      formulaCallout: "A3 -> C2 (ระยะทาง 7 สั้นสุด)",
      mentalModelDoodle: "kmeans-assign",
      examShortcut: "ทำทีละจุด เทียบกับ C1, C2, C3 ทั้งสามเสา ตัวเลขไหนน้อยสุดจับใส่กลุ่มนั้น",
      trapAlert: "ถ้ามีระยะเท่ากัน (Tie): กฎทั่วไปในโจทย์ข้อนี้คือให้เข้ากลุ่มที่มีดัชนีหมายเลขต่ำกว่า",
      sparks: [
        { icon: "🧲", text: "แม่เหล็กดูดจุด", color: "accent" },
        { icon: "🏷️", text: "สรุป 3 กลุ่ม", color: "mint" },
      ],
    },
    {
      title: "ขยับศูนย์กลางหาค่าเฉลี่ยใหม่",
      subtitle: "C2 กลายเป็น (6,6) และ C3 กลายเป็น (1.5,3.5)",
      conceptMascotEmotion: "eureka",
      quote: "กลุ่ม C2 มี 5 จุด (A3, A4, A5, A6, A8) หาค่าเฉลี่ยแกน X และ Y ได้ C2 ใหม่ = (6,6) ขยับมาใจกลางกลุ่ม!",
      formulaCallout: "C2 = (8+5+7+6+4)/5, (4+8+5+4+9)/5 = (6, 6)",
      mentalModelDoodle: "kmeans-update",
      examShortcut: "C1 มีสมาชิกคนเดียวคือ A1(2,10) ดังนั้นรอบใหม่ C1 ยังคงอยู่ที่เดิม (2,10)!",
      trapAlert: "อย่าลืมหารด้วยจำนวนสมาชิกจริงในกลุ่ม เช่น C2 หาร 5, C3 มี 2 จุดต้องหาร 2",
      sparks: [
        { icon: "🔄", text: "C2 เลื่อนไป (6,6)", color: "mint" },
        { icon: "📍", text: "C1 อยู่ที่เดิม (2,10)", color: "accent" },
      ],
    },
    {
      title: "รอบที่ 2 (Iteration 2): วัดระยะซ้ำ",
      subtitle: "ใช้ Centroid ใหม่ (2,10), (6,6), (1.5,3.5)",
      conceptMascotEmotion: "calculating",
      quote: "นำศูนย์กลางใหม่มาวัดระยะกับทุกจุดอีกรอบ เพื่อดูว่ามีจุดไหนเปลี่ยนใจย้ายกลุ่มหรือไม่!",
      formulaCallout: "วัดระยะซ้ำด้วย Centroid ใหม่",
      mentalModelDoodle: "kmeans-iter2",
      examShortcut: "ทำซ้ำจนกว่าจะเข้าสู่เงื่อนไขหยุด (Stopping Criteria)",
      trapAlert: "ต้องใช้พิกัด Centroid ใหม่คำนวณ ห้ามเผลอหยิบพิกัดรอบแรกมาใช้ซ้ำ",
      sparks: [
        { icon: "🔁", text: "รอบที่ 2 เริ่มขึ้น", color: "accent" },
        { icon: "📐", text: "วัดระยะอัปเดต", color: "mint" },
      ],
    },
    {
      title: "หยุดทำเมื่อไหร่? (Convergence)",
      subtitle: "จุดไม่ย้ายกลุ่ม หรือครบจำนวนรอบที่ตั้งไว้",
      conceptMascotEmotion: "focused",
      quote: "K-Means จะหยุดทำงานเมื่อ: 1. ไม่มีจุดใดเปลี่ยนกลุ่มเลย 2. Centroid ไม่ขยับแล้ว 3. ชนเพดาน max_iter",
      formulaCallout: "Complexity: O(t·k·n)",
      mentalModelDoodle: "kmeans-stopping",
      examShortcut: "จำสูตรความซับซ้อน: O(t·k·n) โดย t คือรอบ, k คือจำนวนกลุ่ม, n คือจำนวนข้อมูล",
      trapAlert: "จุดอ่อนข้อสอบ: ต้องกำหนดค่า k ล่วงหน้า, แพ้ Outlier, ใช้ได้เฉพาะข้อมูลตัวเลข (ค่าเฉลี่ย)",
      sparks: [
        { icon: "🏁", text: "Convergence!", color: "mint" },
        { icon: "⏱️", text: "Complexity O(tkn)", color: "accent" },
      ],
    },
  ],

  /* ============================ EP05: SHAP Force Plot ============================ */
  ep05: [
    {
      title: "จุดสตาร์ท: Base Value (32%)",
      subtitle: "ค่าเฉลี่ยความน่าจะเป็นของประชากรทั้งโลก",
      conceptMascotEmotion: "thinking",
      quote: "ก่อนจะดูว่าลูกค้าคนนี้เป็นใคร โมเดลเริ่มทายจากค่าเฉลี่ยประชากร Base Value = 32% เป็นจุดตั้งต้น!",
      formulaCallout: "Base Value = 32% (Prior Mean)",
      mentalModelDoodle: "shap-base",
      examShortcut: "Base Value คือ E[f(x)] หรือค่าทำนายเฉลี่ยของโมเดลเมื่อไม่รู้ฟีเจอร์ใดๆ ของคนคนนั้น",
      trapAlert: "Base Value ไม่ใช่ 0% และไม่ใช่ 50%! มันคือค่าเฉลี่ยจริงของข้อมูลชุดฝึก",
      sparks: [
        { icon: "🏁", text: "เริ่มที่ 32%", color: "accent" },
        { icon: "📊", text: "Population Mean", color: "mint" },
      ],
    },
    {
      title: "แรงผลักบวก: ไม่ซื้อนานเกิน 45 วัน",
      subtitle: "SHAP +29% ผลักความเสี่ยงพุ่งขึ้น!",
      conceptMascotEmotion: "alert",
      quote: "ลูกค้าไม่ได้มาซื้อนานเกิน 45 วัน ฟีเจอร์นี้ให้แรงผลักมหาศาล +29 จุดเปอร์เซ็นต์ ดันความน่าจะเป็นขึ้นเป็น 61%!",
      formulaCallout: "32% + 29 = 61% (แรงผลักฝั่งบวก)",
      mentalModelDoodle: "shap-push1",
      examShortcut: "ค่า SHAP มีทิศทาง: ค่าบวกผลักเข้าหาคลาสเป้าหมาย (Inactive) ค่าลบดึงหนีออกจากเป้าหมาย",
      trapAlert: "บวกแบบจุดเปอร์เซ็นต์ (Percentage Points)! สไลด์ p.9: 32% + 29 = 61% ห้ามเอา 32 คูณ 1.29 เด็ดขาด!",
      sparks: [
        { icon: "🚀", text: "แรงผลัก +29 pt", color: "rose" },
        { icon: "📈", text: "พุ่งขึ้นเป็น 61%", color: "amber" },
      ],
    },
    {
      title: "แรงผลักบวกซ้ำ: มีประวัติร้องเรียน",
      subtitle: "SHAP +12% ช่วยผลักซ้ำเติม",
      conceptMascotEmotion: "alert",
      quote: "แถมยังมีประวัติร้องเรียนบริการอีก! แรงผลักบวกเพิ่มอีก +12 จุดเปอร์เซ็นต์ ดันความน่าจะเป็นพุ่งขึ้นไปถึง 73%!",
      formulaCallout: "61% + 12 = 73%",
      mentalModelDoodle: "shap-push2",
      examShortcut: "แรงผลักในทางเดียวกันสามารถบวกสะสมกันได้ (Additive Feature Attribution)",
      trapAlert: "SHAP เป็น Local XAI อธิบายลูกค้าคนนี้คนเดียว ไม่ได้แปลว่าทุกคนในบริษัทจะมีค่า +12 เท่ากัน",
      sparks: [
        { icon: "⚠️", text: "ร้องเรียน +12 pt", color: "rose" },
        { icon: "📈", text: "ขึ้นไปถึง 73%", color: "amber" },
      ],
    },
    {
      title: "แรงต้านลบ: ยอดซื้อสะสมในอดีตสูง",
      subtitle: "SHAP -8% ช่วยดึงเบรกฉุดลงมา",
      conceptMascotEmotion: "focused",
      quote: "แต่เดี๋ยวก่อน! ในอดีตเขาเคยซื้อเยอะมาก ฟีเจอร์นี้ให้แรงต้าน -8 จุดเปอร์เซ็นต์ ดึงความน่าจะเป็นกลับลงมาเหลือ 65%!",
      formulaCallout: "73% - 8 = 65%",
      mentalModelDoodle: "shap-pullback",
      examShortcut: "แรงต้านสีน้ำเงิน/แดงจะหักล้างกับแรงผลัก ทำให้เห็นภาพชัดว่าฟีเจอร์ไหนเป็นเกราะป้องกัน",
      trapAlert: "แม้จะมีแรงต้าน -8 แต่แรงผลักรวมยังมากกว่า ทำให้ผลรวมสุทธิยังคงสูงกว่า Base Value",
      sparks: [
        { icon: "🪂", text: "แรงเบรก -8 pt", color: "mint" },
        { icon: "🛡️", text: "ยอดสะสมช่วยพยุง", color: "accent" },
      ],
    },
    {
      title: "บทสรุปชี้ชะตา: ทำนายจบที่ 65%",
      subtitle: "ผลรวมสมการชักเย่อแบบบวกเชิงเส้น",
      conceptMascotEmotion: "eureka",
      quote: "สมการชักเย่อสมบูรณ์: 32% + 29 + 12 - 8 = 65%! อธิบายลูกค้าได้ชัดเจน โปร่งใส เป็นธรรมตามหลัก Responsible AI!",
      formulaCallout: "Prediction = Base(32) + 29 + 12 - 8 = 65%",
      mentalModelDoodle: "shap-final",
      examShortcut: "SHAP พิสูจน์ความเป็นเส้นตรง: ผลรวมค่า SHAP ทุกตัวรวมกับ Base Value จะได้ผลทำนายของโมเดลเสมอเป๊ะๆ",
      trapAlert: "ข้อสอบออกบ่อย: 'SHAP เป็น Relative % หรือ Percentage Points?' ตอบดังๆ ว่า 'Percentage Points'!",
      sparks: [
        { icon: "🏁", text: "ทำนายจบ 65%", color: "accent" },
        { icon: "💡", text: "XAI โปร่งใสตรวจสอบได้", color: "mint" },
      ],
    },
  ],

  /* ============================ EP06: Concept Drift ============================ */
  ep06: [
    {
      title: "แดนสวรรค์ข้อมูลเดิม (In-distribution)",
      subtitle: "โมเดลแม่น 88% ในโลกที่เรารู้จัก",
      conceptMascotEmotion: "focused",
      quote: "ในอดีต คนไม่ซื้อเกิน 45 วันจะเลิกใช้จริง 68% โมเดลเรียนรู้ความสัมพันธ์นี้และทำนายได้แม่นยำสูงถึง 88%!",
      formulaCallout: "P(Inactive | >45d) = 68% -> Accuracy 88%",
      mentalModelDoodle: "drift-stable",
      examShortcut: "ช่วงเริ่มต้น ข้อมูลจริงอยู่ในสภาวะเดียวกับข้อมูลสอน (In-distribution) โมเดลทำงานได้ไร้ปัญหา",
      trapAlert: "อย่าคิดว่าความแม่นยำ 88% จะอยู่ตลอดไป! โลกจริงเปลี่ยน โมเดลจะเสื่อมทันที",
      sparks: [
        { icon: "✅", text: "Accuracy 88%", color: "mint" },
        { icon: "🌿", text: "In-distribution", color: "accent" },
      ],
    },
    {
      title: "โลกธุรกิจเปลี่ยน: สู่ Subscription",
      subtitle: "พฤติกรรมลูกค้าพลิกโฉมจากเดิม",
      conceptMascotEmotion: "alert",
      quote: "บริษัทเปลี่ยนโมเดลเป็นสมาชิกรายเดือน! ลูกค้าตัดบัตรอัตโนมัติ ไม่จำเป็นต้องกลับมาสั่งซื้อของซ้ำทุก 45 วันอีกแล้ว!",
      formulaCallout: "Shift to Subscription System",
      mentalModelDoodle: "drift-shift",
      examShortcut: "การเปลี่ยนแปลงทางธุรกิจหรือสังคม (Environment Shift) เป็นบ่อเกิดหลักของ Concept Drift",
      trapAlert: "ตัวโมเดลไม่ได้บั๊ก โค้ดไม่ได้พัง แต่ 'พฤติกรรมของมนุษย์' ต่างหากที่เปลี่ยนไป",
      sparks: [
        { icon: "🔄", text: "เปิดตัว Subscription", color: "amber" },
        { icon: "👥", text: "พฤติกรรมลูกค้าเปลี่ยน", color: "accent" },
      ],
    },
    {
      title: "เกิด Concept Drift: P(Y|X) พลิกกลับ!",
      subtitle: "ความหมายของฟีเจอร์เดิมสูญสลาย",
      conceptMascotEmotion: "thinking",
      quote: "สไลด์ Lect 09 หน้า 11 ชี้ชัด: คนไม่ซื้อเกิน 45 วัน มีอัตรา Inactive ลดลงเหลือแค่ 31%! กฎ 45 วันกลายเป็นขยะ!",
      formulaCallout: "P(Inactive | >45d) ร่วงจาก 68% -> 31%",
      mentalModelDoodle: "drift-flip",
      examShortcut: "Concept Drift คือ P(Y|X) เปลี่ยน นั่นคือความสัมพันธ์ระหว่างฟีเจอร์กับผลลัพธ์เปลี่ยนไป",
      trapAlert: "ต่างจาก Covariate Shift: ถ้าแค่สัดส่วน X เปลี่ยนคือ Covariate Shift แต่ถ้า P(Y|X) เปลี่ยนคือ Concept Drift!",
      sparks: [
        { icon: "⚠️", text: "P(Y|X) พลิกผัน", color: "rose" },
        { icon: "📉", text: "เหลือ Inactive แค่ 31%", color: "amber" },
      ],
    },
    {
      title: "โมเดลเสื่อมสภาพ (Degradation)",
      subtitle: "ความแม่นยำร่วงกราวจาก 88% เหลือ 54%",
      conceptMascotEmotion: "alert",
      quote: "หายนะ! โมเดลยังคงใช้กฎเดิมไล่จับคน ทายลูกค้าชั้นดีว่าเป็น Inactive จน False Positive พุ่งสูง ความแม่นยำตกเหลือ 54%!",
      formulaCallout: "Accuracy ร่วงจาก 88% -> 54%",
      mentalModelDoodle: "drift-decay",
      examShortcut: "เมื่อเกิด Concept Drift โมเดลจะเสื่อมลง (Model Degradation) ยิ่งปล่อยไว้ยิ่งสร้างความเสียหายทางธุรกิจ",
      trapAlert: "ข้อสอบถาม: จะรู้ได้ไงว่าเกิด Drift ถ้าไม่มี Ground Truth? ต้องคอยตรวจจับ Data Drift และ Prediction Drift",
      sparks: [
        { icon: "🚨", text: "Accuracy ตกเหลือ 54%", color: "rose" },
        { icon: "📉", text: "False Positive พุ่ง", color: "amber" },
      ],
    },
    {
      title: "กอบกู้ด้วย Monitoring & Retraining",
      subtitle: "ฟื้นคืนชีพความแม่นยำกลับมา 86%",
      conceptMascotEmotion: "eureka",
      quote: "หัวใจของ Responsible AI: ต้องมีระบบมอนิเตอร์และ Retrain โมเดลด้วยข้อมูลปัจจุบัน สถิติฟื้นกลับมาแม่นยำ 86% สำเร็จ!",
      formulaCallout: "Retrain With New Data -> Accuracy 86%",
      mentalModelDoodle: "drift-cure",
      examShortcut: "วิธีแก้ Concept Drift คือการ Retrain ด้วยข้อมูลสดใหม่ และมี Human Oversight คอยกำกับดูแล",
      trapAlert: "ห้ามปล่อยโมเดลรันแบบ 'Set and Forget'! ต้องตั้งระบบเตือนเมื่อ Performance เริ่มดรอป",
      sparks: [
        { icon: "🛠️", text: "Retrain ด้วยข้อมูลใหม่", color: "mint" },
        { icon: "🏆", text: "คืนชีพความแม่นยำ 86%", color: "accent" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Mascot Avatar & 2D Vector Cartoon Art Renderer                     */
/* ------------------------------------------------------------------ */

function CartoonMascot({
  emotion,
  size = 110,
}: {
  emotion: CartoonSceneData["conceptMascotEmotion"];
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className="shrink-0 drop-shadow-sm select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mascotFaceGlow" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF4E6" />
          <stop offset="100%" stopColor="#FFE0B2" />
        </radialGradient>
        <linearGradient id="glassesFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-ink)" />
        </linearGradient>
      </defs>

      {/* Floating Sparkle / Thought Aura */}
      <circle cx="60" cy="62" r="46" fill="var(--surface-hover)" opacity="0.6" />
      <circle cx="60" cy="62" r="41" fill="var(--surface-raised)" stroke="var(--rule)" strokeWidth="1.5" />

      {/* Mascot Ears */}
      <circle cx="21" cy="58" r="9" fill="#FFE0B2" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="99" cy="58" r="9" fill="#FFE0B2" stroke="var(--ink)" strokeWidth="2.5" />

      {/* Mascot Head */}
      <rect
        x="24"
        y="25"
        width="72"
        height="68"
        rx="28"
        fill="url(#mascotFaceGlow)"
        stroke="var(--ink)"
        strokeWidth="3"
      />

      {/* Hair tuft / Smart Data Cowlick */}
      <path
        d="M60 25 C58 12, 68 8, 70 12 C72 16, 65 20, 66 25 Z"
        fill="var(--accent)"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M52 26 C46 16, 54 11, 57 16 C58 19, 56 22, 55 26 Z"
        fill="var(--accent-ink)"
        stroke="var(--ink)"
        strokeWidth="2"
      />

      {/* Eyebrows based on emotion */}
      {emotion === "thinking" ? (
        <>
          <path d="M38 41 Q47 38 52 44" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M82 43 Q73 38 68 44" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : emotion === "eureka" ? (
        <>
          <path d="M36 38 Q45 33 52 38" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M84 38 Q75 33 68 38" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : emotion === "alert" ? (
        <>
          <path d="M36 36 Q45 42 53 38" stroke="var(--rose)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M84 36 Q75 42 67 38" stroke="var(--rose)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M37 40 Q45 36 52 40" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M83 40 Q75 36 68 40" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Glasses Frame with Bridge */}
      <rect
        x="33"
        y="44"
        width="23"
        height="21"
        rx="7"
        fill="rgba(255, 255, 255, 0.75)"
        stroke="url(#glassesFrame)"
        strokeWidth="3.2"
      />
      <rect
        x="64"
        y="44"
        width="23"
        height="21"
        rx="7"
        fill="rgba(255, 255, 255, 0.75)"
        stroke="url(#glassesFrame)"
        strokeWidth="3.2"
      />
      {/* Glasses Bridge */}
      <path d="M56 54 Q60 51 64 54" stroke="url(#glassesFrame)" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Eyes & Gaze */}
      {emotion === "eureka" ? (
        <>
          <path d="M44.5 48 L44.5 60 M38.5 54 L50.5 54 M40 50 L49 58 M49 50 L40 58" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M75.5 48 L75.5 60 M69.5 54 L81.5 54 M71 50 L80 58 M80 50 L71 58" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : emotion === "thinking" ? (
        <>
          <circle cx="46" cy="51" r="4.2" fill="var(--ink)" />
          <circle cx="47.5" cy="49.5" r="1.5" fill="#FFFFFF" />
          <circle cx="77" cy="51" r="4.2" fill="var(--ink)" />
          <circle cx="78.5" cy="49.5" r="1.5" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <circle cx="44.5" cy="54.5" r="4.5" fill="var(--ink)" />
          <circle cx="43" cy="53" r="1.5" fill="#FFFFFF" />
          <circle cx="75.5" cy="54.5" r="4.5" fill="var(--ink)" />
          <circle cx="74" cy="53" r="1.5" fill="#FFFFFF" />
        </>
      )}

      {/* Cheeks Blush */}
      <circle cx="30" cy="65" r="5" fill="var(--rose)" opacity="0.3" />
      <circle cx="90" cy="65" r="5" fill="var(--rose)" opacity="0.3" />

      {/* Mouth */}
      {emotion === "eureka" ? (
        <path d="M52 72 Q60 84 68 72 Z" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      ) : emotion === "thinking" ? (
        <path d="M53 76 Q60 72 67 75" stroke="var(--ink)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      ) : emotion === "alert" ? (
        <ellipse cx="60" cy="74" rx="4.5" ry="6" fill="var(--ink)" />
      ) : (
        <path d="M52 72 Q60 79 68 72" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* Smart Bow Tie */}
      <path
        d="M51 92 L60 95 L51 98 Z M69 92 L60 95 L69 98 Z"
        fill="var(--accent)"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="95" r="2.5" fill="var(--accent-ink)" stroke="var(--ink)" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Conceptual Vector Doodles inside the Cartoon Thought Bubble        */
/* ------------------------------------------------------------------ */

function CartoonConceptDoodle({
  doodle,
  lens,
}: {
  doodle: string;
  lens: ThinkingLens;
}) {
  return (
    <div className="w-full flex items-center justify-center py-2 select-none">
      {doodle === "boxplot-5num" && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          <line x1="20" y1="50" x2="260" y2="50" stroke="var(--rule-strong)" strokeWidth="2" strokeDasharray="3 3" />
          {/* 5 cartoon milestone pins */}
          {[
            { x: 30, val: "Min 10", col: "var(--ink)" },
            { x: 80, val: "Q1 20", col: "var(--accent)" },
            { x: 140, val: "Med 28", col: "var(--mint)" },
            { x: 195, val: "Q3 35", col: "var(--accent)" },
            { x: 250, val: "Max 50", col: "var(--ink)" },
          ].map((pin, i) => (
            <g key={i}>
              <line x1={pin.x} y1="50" x2={pin.x} y2="28" stroke={pin.col} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx={pin.x} cy="25" r="7" fill={pin.col} stroke="var(--surface)" strokeWidth="1.5" />
              <text x={pin.x} y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)" fontFamily="monospace">
                {pin.val}
              </text>
            </g>
          ))}
          {/* Cartoon measure label */}
          <rect x="75" y="6" width="125" height="15" rx="7.5" fill="var(--surface-raised)" stroke="var(--rule)" strokeWidth="1" />
          <text x="137.5" y="16" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent-ink)">
            50% อยู่ในกล่องนี้
          </text>
        </svg>
      )}

      {doodle === "boxplot-iqr" && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          <rect x="70" y="24" width="140" height="46" rx="6" fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth="2.5" />
          <line x1="135" y1="24" x2="135" y2="70" stroke="var(--mint)" strokeWidth="3" />
          {/* Arrow span */}
          <path d="M72 16 L208 16" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrow)" />
          <circle cx="72" cy="16" r="3" fill="var(--accent)" />
          <circle cx="208" cy="16" r="3" fill="var(--accent)" />
          <text x="140" y="12" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">
            IQR = Q3 - Q1 = 15
          </text>
          <text x="140" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--ink)">
            Median = 28
          </text>
          <text x="75" y="84" textAnchor="start" fontSize="9" fontWeight="600" fill="var(--ink-muted)">
            Q1 (20)
          </text>
          <text x="205" y="84" textAnchor="end" fontSize="9" fontWeight="600" fill="var(--ink-muted)">
            Q3 (35)
          </text>
        </svg>
      )}

      {doodle === "boxplot-fences" && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* Cartoon wooden fences */}
          <rect x="90" y="32" width="100" height="36" rx="4" fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth="2" />
          {/* Fence Lower */}
          <g>
            <line x1="35" y1="18" x2="35" y2="78" stroke="var(--rose)" strokeWidth="3" strokeDasharray="4 2" />
            <rect x="20" y="22" width="30" height="14" rx="3" fill="var(--rose)" />
            <text x="35" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFF">
              รั้วล่าง
            </text>
            <text x="35" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--rose)">
              -2.5
            </text>
          </g>
          {/* Fence Upper */}
          <g>
            <line x1="245" y1="18" x2="245" y2="78" stroke="var(--accent)" strokeWidth="3" strokeDasharray="4 2" />
            <rect x="230" y="22" width="30" height="14" rx="3" fill="var(--accent)" />
            <text x="245" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFF">
              รั้วบน
            </text>
            <text x="245" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--accent)">
              57.5
            </text>
          </g>
          <text x="140" y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)">
            ระยะ 1.5 × IQR
          </text>
        </svg>
      )}

      {doodle === "boxplot-whisker" && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* Box */}
          <rect x="75" y="32" width="90" height="34" rx="4" fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth="2" />
          {/* Whisker right stopping at 50 */}
          <line x1="165" y1="49" x2="215" y2="49" stroke="var(--ink)" strokeWidth="2.5" />
          <line x1="215" y1="36" x2="215" y2="62" stroke="var(--ink)" strokeWidth="3" />
          {/* Warning sign at fence 57.5 */}
          <line x1="250" y1="20" x2="250" y2="78" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3" />
          <rect x="232" y="16" width="36" height="14" rx="3" fill="var(--accent)" />
          <text x="250" y="26" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFF">
            รั้ว 57.5
          </text>
          {/* Stop marker on 50 */}
          <circle cx="215" cy="49" r="6" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="215" y="76" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--mint)">
            หยุดที่ 50!
          </text>
          <text x="140" y="18" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--rose)">
            ห้ามลากหนวดไปแตะ 57.5!
          </text>
        </svg>
      )}

      {doodle === "boxplot-outlier" && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* Box & Whisker */}
          <rect x="60" y="34" width="80" height="32" rx="4" fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth="2" />
          <line x1="140" y1="50" x2="190" y2="50" stroke="var(--ink)" strokeWidth="2" />
          <line x1="190" y1="40" x2="190" y2="60" stroke="var(--ink)" strokeWidth="2.5" />
          {/* Fence */}
          <line x1="220" y1="20" x2="220" y2="80" stroke="var(--rule-strong)" strokeWidth="2" strokeDasharray="3 3" />
          <text x="220" y="16" textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--ink-muted)">
            รั้ว 57.5
          </text>
          {/* Rogue Outlier jumping */}
          <g>
            <circle cx="255" cy="46" r="10" fill="var(--rose)" stroke="var(--ink)" strokeWidth="2" />
            <text x="255" y="50" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FFF">
              58
            </text>
            {/* Cartoon jump arc */}
            <path d="M225 60 Q240 25 252 36" stroke="var(--rose)" strokeWidth="1.8" strokeDasharray="2 2" />
            <text x="255" y="74" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--rose)">
              OUTLIER!
            </text>
          </g>
        </svg>
      )}

      {doodle.startsWith("tree-") && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* Root node */}
          <rect x="100" y="8" width="80" height="26" rx="6" fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth="2" />
          <text x="140" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)">
            {doodle === "tree-gain-winner" ? "A ชนะ! (+0.222)" : "Root (6 Active / 6 Rest)"}
          </text>
          {/* Branches */}
          <path d="M115 34 L60 55" stroke="var(--rule-strong)" strokeWidth="2" />
          <path d="M165 34 L220 55" stroke="var(--rule-strong)" strokeWidth="2" />
          {/* Left Leaf */}
          <rect x="25" y="55" width="70" height="30" rx="6" fill={doodle.includes("b") ? "var(--amber-wash)" : "var(--mint-wash)"} stroke={doodle.includes("b") ? "var(--amber)" : "var(--mint)"} strokeWidth="2" />
          <text x="60" y="73" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)">
            {doodle.includes("b") ? "2/4 (0.444)" : "5/1 (0.278)"}
          </text>
          {/* Right Leaf */}
          <rect x="185" y="55" width="70" height="30" rx="6" fill={doodle.includes("b") ? "var(--amber-wash)" : "var(--mint-wash)"} stroke={doodle.includes("b") ? "var(--amber)" : "var(--mint)"} strokeWidth="2" />
          <text x="220" y="73" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)">
            {doodle.includes("b") ? "4/2 (0.444)" : "1/5 (0.278)"}
          </text>
        </svg>
      )}

      {doodle.startsWith("matrix-") && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* 2x2 Cartoon Matrix grid */}
          <rect x="65" y="12" width="65" height="34" rx="4" fill="var(--mint-wash)" stroke="var(--mint)" strokeWidth="2" />
          <text x="97" y="33" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--mint)">
            TP = 4
          </text>
          <rect x="135" y="12" width="65" height="34" rx="4" fill="var(--rose-wash)" stroke="var(--rose)" strokeWidth="1.5" />
          <text x="167" y="33" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--rose)">
            FP = 1
          </text>
          <rect x="65" y="50" width="65" height="34" rx="4" fill="var(--amber-wash)" stroke="var(--amber)" strokeWidth="1.5" />
          <text x="97" y="71" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--amber)">
            FN = 2
          </text>
          <rect x="135" y="50" width="65" height="34" rx="4" fill="var(--surface-raised)" stroke="var(--rule-strong)" strokeWidth="2" />
          <text x="167" y="71" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--ink)">
            TN = 3
          </text>
          {/* Callout tags */}
          <text x="235" y="32" fontSize="9" fontWeight="700" fill="var(--accent)">
            ทาย Play
          </text>
          <text x="235" y="70" fontSize="9" fontWeight="600" fill="var(--ink-muted)">
            ทาย Rest
          </text>
        </svg>
      )}

      {doodle.startsWith("kmeans-") && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* Grid background */}
          <rect x="25" y="10" width="230" height="75" rx="8" fill="var(--surface-raised)" stroke="var(--rule)" strokeWidth="1" />
          {/* Clustered cute mascot blobs */}
          <circle cx="70" cy="35" r="9" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="70" y="38" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFF">C1</text>
          <circle cx="150" cy="50" r="12" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="150" y="53.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FFF">C2</text>
          <circle cx="215" cy="40" r="10" fill="var(--amber)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="215" y="43.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFF">C3</text>
          {/* Scattered data points attracted */}
          <circle cx="55" cy="42" r="4" fill="var(--accent)" opacity="0.8" />
          <circle cx="135" cy="42" r="4" fill="var(--mint)" opacity="0.8" />
          <circle cx="165" cy="62" r="4" fill="var(--mint)" opacity="0.8" />
          <circle cx="140" cy="62" r="4" fill="var(--mint)" opacity="0.8" />
          <circle cx="200" cy="50" r="4" fill="var(--amber)" opacity="0.8" />
          <text x="140" y="80" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink-muted)">
            Manhattan: |Δx| + |Δy|
          </text>
        </svg>
      )}

      {doodle.startsWith("shap-") && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* Number line */}
          <line x1="20" y1="52" x2="260" y2="52" stroke="var(--rule-strong)" strokeWidth="2" />
          {/* Base Value */}
          <circle cx="65" cy="52" r="6" fill="var(--ink-muted)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="65" y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink-muted)">
            Base 32%
          </text>
          {/* Rocket push green (+29) */}
          <rect x="75" y="34" width="75" height="14" rx="3" fill="var(--mint)" />
          <text x="112.5" y="44" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFF">
            +29 pt (&gt;45d)
          </text>
          {/* Second push (+12) */}
          <rect x="153" y="34" width="35" height="14" rx="3" fill="var(--mint)" />
          <text x="170.5" y="44" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFF">
            +12 pt
          </text>
          {/* Drag back red (-8) */}
          <rect x="160" y="56" width="30" height="12" rx="3" fill="var(--rose)" />
          <text x="175" y="65" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFF">
            -8 pt
          </text>
          {/* Final prediction pointer */}
          <line x1="160" y1="22" x2="160" y2="76" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="3 2" />
          <polygon points="160,20 155,10 165,10" fill="var(--accent)" />
          <text x="160" y="88" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--accent)">
            Final 65%
          </text>
        </svg>
      )}

      {doodle.startsWith("drift-") && (
        <svg viewBox="0 0 280 95" className="w-full max-w-[280px] h-auto" fill="none">
          {/* Timeline road */}
          <path d="M25 60 C80 30, 160 80, 255 40" stroke="var(--rule-strong)" strokeWidth="3" fill="none" />
          {/* Step 1 Stable */}
          <circle cx="50" cy="46" r="7" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="50" y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--mint)">
            88% แม่นยำ
          </text>
          {/* Shift point */}
          <circle cx="140" cy="55" r="7" fill="var(--amber)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="140" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--amber)">
            Subscription Shift!
          </text>
          {/* Drop & Recovery */}
          <circle cx="195" cy="65" r="6" fill="var(--rose)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="195" y="82" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--rose)">
            ตกเหลือ 54%
          </text>
          <circle cx="250" cy="42" r="8" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="250" y="24" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--accent)">
            Retrain 86%!
          </text>
        </svg>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main ThinkingCartoonVisual Component                               */
/* ------------------------------------------------------------------ */

interface ThinkingCartoonVisualProps {
  episodeId: EpisodeId;
  stepIndex: number;
  totalSteps: number;
}

export function ThinkingCartoonVisual({
  episodeId,
  stepIndex,
  totalSteps,
}: ThinkingCartoonVisualProps) {
  const [activeLens, setActiveLens] = useState<ThinkingLens>("mental-model");
  const [generativeSeed, setGenerativeSeed] = useState(0);

  const stepList = EPISODE_CARTOON_STEPS[episodeId] || EPISODE_CARTOON_STEPS.ep01;
  const currentScene = stepList[Math.min(stepIndex, stepList.length - 1)] || stepList[0];

  // Procedural thought spark generator
  const generativeSparks = useMemo(() => {
    const base = currentScene.sparks;
    const bonus = [
      { icon: "💡", text: "มองจากความหมายจริงก่อนตัวเลข", color: "mint" as const },
      { icon: "⚡", text: "ตรวจเครื่องหมายบวกลบให้ดี", color: "accent" as const },
      { icon: "🎯", text: "ตัดช้อยส์ลวงก่อนคำนวณ", color: "amber" as const },
      { icon: "🧠", text: "เชื่อมโยงกับสไลด์เรียน", color: "mint" as const },
    ];
    // Rotate bonus prompt on seed change
    const extra = bonus[(stepIndex + generativeSeed) % bonus.length];
    return [...base, extra];
  }, [currentScene.sparks, stepIndex, generativeSeed]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 overflow-hidden select-text">
      {/* Cartoon Visual Header & Thinking Lens Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rule shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <p className="text-xs font-bold text-ink uppercase tracking-wider font-mono">
            How to Think · 2D Cartoon Visual
          </p>
        </div>

        {/* 3 Interactive Thinking Lenses */}
        <div className="flex items-center gap-1 bg-surface-hover p-1 rounded-full border border-rule">
          <button
            type="button"
            onClick={() => setActiveLens("mental-model")}
            aria-pressed={activeLens === "mental-model"}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all cursor-pointer ${
              activeLens === "mental-model"
                ? "bg-ink text-bg shadow-xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            🧠 ภาพในหัว
          </button>
          <button
            type="button"
            onClick={() => setActiveLens("exam-shortcut")}
            aria-pressed={activeLens === "exam-shortcut"}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all cursor-pointer ${
              activeLens === "exam-shortcut"
                ? "bg-accent text-white shadow-xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            💡 สูตรลัด
          </button>
          <button
            type="button"
            onClick={() => setActiveLens("trap-radar")}
            aria-pressed={activeLens === "trap-radar"}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all cursor-pointer ${
              activeLens === "trap-radar"
                ? "bg-rose text-white shadow-xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            ⚠️ จุดลวง
          </button>
        </div>
      </div>

      {/* Main 2D Vector Cartoon Canvas with Thought Bubble Stream */}
      <div className="relative flex-1 w-full bg-surface p-4 sm:p-5 border border-rule flex flex-col justify-between gap-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {/* Cartoon Scene: Mascot + Unified Thought Bubble Stream */}
        <div className="flex items-start gap-3 sm:gap-4 shrink-0">
          {/* Animated 2D Mascot */}
          <motion.div
            key={`${episodeId}-${stepIndex}-${activeLens}`}
            initial={{ scale: 0.9, rotate: -2 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="shrink-0 pt-1"
          >
            <CartoonMascot emotion={currentScene.conceptMascotEmotion} size={88} />
          </motion.div>

          {/* Comic Book Fluffy Thought Bubble with Integrated Vector Doodle */}
          <div className="flex-1 relative bg-surface-raised border-2 border-ink p-3.5 sm:p-4 rounded-2xl shadow-sm">
            {/* Thought bubble little connecting bubbles (SVG pointer tail) */}
            <div className="absolute -left-2.5 top-6 w-3.5 h-3.5 bg-surface-raised border-l-2 border-b-2 border-ink -rotate-45" />

            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-ink">
                💭 กรอบความคิด (Step {stepIndex + 1}/{totalSteps})
              </span>
              {currentScene.formulaCallout && (
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-wash text-accent-ink border border-accent/20">
                  {currentScene.formulaCallout}
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-bold text-ink leading-snug">
              {currentScene.title}
            </h4>

            {/* Dynamic Lens Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLens}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="mt-2 text-xs sm:text-sm leading-relaxed"
              >
                {activeLens === "mental-model" && (
                  <p className="text-ink-muted">
                    <strong className="text-ink">วิธีคิดในหัว:</strong> {currentScene.quote}
                  </p>
                )}
                {activeLens === "exam-shortcut" && (
                  <div className="p-2.5 rounded bg-mint-wash border border-mint/30 text-ink">
                    <span className="font-bold text-mint block mb-0.5">⚡ สูตรลัดในห้องสอบ:</span>
                    {currentScene.examShortcut}
                  </div>
                )}
                {activeLens === "trap-radar" && (
                  <div className="p-2.5 rounded bg-rose-wash border border-rose/30 text-ink">
                    <span className="font-bold text-rose block mb-0.5">⚠️ ระวังหลงกลข้อสอบ:</span>
                    {currentScene.trapAlert}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* 2D Vector Conceptual Doodle Embedded in Thought Stream */}
            <div className="mt-3 pt-2.5 border-t border-rule/70 bg-surface/50 rounded-lg p-1.5">
              <CartoonConceptDoodle doodle={currentScene.mentalModelDoodle} lens={activeLens} />
            </div>
          </div>
        </div>
        {/* Footer: Procedural Thought Sparks + Randomizer Button */}
        <div className="pt-2.5 border-t border-rule flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {generativeSparks.map((spark, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                  spark.color === "mint"
                    ? "bg-mint-wash text-mint border-mint/30"
                    : spark.color === "accent"
                    ? "bg-accent-wash text-accent-ink border-accent/30"
                    : spark.color === "rose"
                    ? "bg-rose-wash text-rose border-rose/30"
                    : "bg-amber-wash text-amber border-amber/30"
                }`}
              >
                <span>{spark.icon}</span>
                <span>{spark.text}</span>
              </span>
            ))}
          </div>

          {/* Generative Thought Prompt Button */}
          <button
            type="button"
            onClick={() => setGenerativeSeed((s) => s + 1)}
            title="สุ่มไอเดียคิดเร็วเพิ่มเติม"
            className="tactile-btn px-2.5 py-1 text-[11px] font-semibold border border-rule bg-surface text-ink-muted hover:text-ink hover:border-rule-strong cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>🎲</span>
            <span>สุ่มไอเดียคิดเร็ว</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Tip */}
      <div className="pt-1.5 border-t border-rule flex items-center justify-between text-[11px] text-ink-muted shrink-0">
        <span>💡 คลิกเลือกโหมด &ldquo;ภาพในหัว&rdquo; / &ldquo;สูตรลัด&rdquo; / &ldquo;จุดลวง&rdquo; เพื่อสลับมุมมอง</span>
        <span className="font-mono text-ink-subtle">2D CARTOON ENGINE</span>
      </div>
    </div>
  );
}
