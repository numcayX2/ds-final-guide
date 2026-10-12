import Link from "next/link";
import { CodeSnippet } from "@/components/code-snippet";
import { Reveal } from "@/components/reveal";
import { Tex } from "@/components/tex";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircledIcon,
  ClockIcon,
  CodeIcon,
  ExclamationTriangleIcon,
  FileTextIcon,
  LaptopIcon,
  Pencil2Icon,
  RocketIcon,
} from "@radix-ui/react-icons";

export const metadata = {
  title: "คู่มือเตรียมสอบ Lab (Colab version3) | DS Final Guide",
  description:
    "คู่มือและแนวทางเตรียมสอบปฏิบัติวิชา Data Science (10301351) สรุปโค้ดที่ต้องเติม แนวการเขียนคำอธิบาย และข้อควรระวังใน Google Colab",
};

export default function LabPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* ───────────── Hero ───────────── */}
      <section className="border-b border-rule bg-accent-wash/30">
        <div className="shell pt-12 pb-10 sm:pt-16 sm:pb-12">
          <Reveal>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-accent"
              >
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                หน้าแรก
              </Link>
              <span className="text-ink-subtle">/</span>
              <p className="eyebrow">Lab Practical Exam &middot; Colab version3</p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-4 max-w-4xl text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.1] text-balance">
              คู่มือเตรียมสอบปฏิบัติ
              <span className="block text-accent-ink">
                Colab version3 + Paper Work
              </span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
              สรุปคำสั่งทางการจากผู้สอน รวบรวมโค้ด scikit-learn ที่มักให้เติม จุดหลอกสำคัญของ Confusion Matrix บน Python และแนวทางเขียนคำอธิบายผลลัพธ์
            </p>
          </Reveal>

          {/* Quick Schedule Cards */}
          <Reveal delay={140}>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-rule bg-surface p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
                  <CalendarIcon className="h-4 w-4" />
                  วันสอบปฏิบัติ
                </div>
                <p className="mt-2 text-base font-bold text-ink">
                  พฤหัสบดี 22 ต.ค. 2569
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  เวลา 13.00 – 15.00 น. (2 ชม.)
                </p>
              </div>

              <div className="rounded-xl border border-rule bg-surface p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
                  <LaptopIcon className="h-4 w-4" />
                  สถานที่สอบ
                </div>
                <p className="mt-2 text-base font-bold text-ink">
                  Sci Digital Lab ชั้น 1
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  อาคาร 60 ปี (สำรอง: ชั้น 6)
                </p>
              </div>

              <div className="rounded-xl border border-rule bg-surface p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-good uppercase tracking-wider">
                  <CodeIcon className="h-4 w-4" />
                  รูปแบบข้อสอบ
                </div>
                <p className="mt-2 text-base font-bold text-ink">
                  Colab version3 + Paper
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Run + อธิบายคำตอบ + เติม Code
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Section 1: โครงสร้างข้อสอบ ───────────── */}
      <section className="border-b border-rule py-12 sm:py-16">
        <div className="shell max-w-4xl">
          <header className="mb-8">
            <span className="font-mono text-xs font-semibold text-accent">§01</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              โครงสร้างภารกิจ 3 ส่วนใน Colab version3
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              ข้อสอบปฏิบัติวิชานี้เป็นแบบผสม (Hybrid) ไม่ใช่แค่เขียนโปรแกรม แต่เน้นการตีความทาง Data Science
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-rule bg-surface p-5 space-y-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-wash font-mono text-sm font-bold text-accent">
                1
              </span>
              <h3 className="font-semibold text-ink">1. Run Code ตามลำดับ</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                ทำตามคำสั่งใน Colab ทีละ Cell ตาม Instruction ตรวจสอบให้แน่ใจว่าไม่มี Error ค้าง และผลลัพธ์ DataFrame/Plot แสดงผลถูกต้อง
              </p>
              <div className="rounded bg-paper p-2 font-mono text-[11px] text-ink-subtle">
                Tip: กด Ctrl+Enter เพื่อรันเฉพาะ Cell นั้น หรือ Shift+Enter เพื่อรันและไปยัง Cell ถัดไป
              </div>
            </div>

            <div className="rounded-xl border border-rule bg-surface p-5 space-y-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-wash font-mono text-sm font-bold text-accent">
                2
              </span>
              <h3 className="font-semibold text-ink">2. เติม Code ที่เว้นว่าง</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                อาจารย์มักเว้น <code>___</code> หรือช่อง <code># TODO</code> ในส่วนสำคัญ เช่น ฟังก์ชันแบ่งข้อมูล, กำหนด Hyperparameters, การ Fit โมเดล และคำนวณ Metrics
              </p>
              <div className="rounded bg-paper p-2 font-mono text-[11px] text-ink-subtle">
                Tip: ระวังชื่อตัวแปรพิมพ์เล็ก-ใหญ่ (เช่น X_train vs x_train) และอย่าลืมใส่ random_state
              </div>
            </div>

            <div className="rounded-xl border border-rule bg-surface p-5 space-y-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-wash font-mono text-sm font-bold text-accent">
                3
              </span>
              <h3 className="font-semibold text-ink">3. เขียนคำอธิบายคำตอบ</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                บันทึกคำตอบลงใน Paper work (หรือ Text Cell ตามที่กำหนด) อธิบายว่าตัวเลขที่ได้หมายความว่าอย่างไร ทำไมถึงเลือกโมเดลนี้ และแปลผลเชิงธุรกิจ
              </p>
              <div className="rounded bg-paper p-2 font-mono text-[11px] text-ink-subtle">
                Tip: เขียนให้ตรงประเด็น อ้างอิงตัวเลขจากการรันจริง เช่น &quot;Model มี Recall 85% เพราะ...&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Section 2: รวม Code Snippets ที่มักออกให้เติม ───────────── */}
      <section className="border-b border-rule py-12 sm:py-16 bg-surface/50">
        <div className="shell max-w-4xl space-y-12">
          <header>
            <span className="font-mono text-xs font-semibold text-accent">§02</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              รวมโค้ด scikit-learn &amp; pandas ที่มักออกสอบให้เติม
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              สามารถกดปุ่ม &quot;คัดลอกโค้ด&quot; เพื่อนำไปทดลองรันใน Colab หรือทบทวนก่อนเข้าห้องสอบได้ทันที
            </p>
          </header>

          {/* Part 1: Train-Test Split */}
          <div className="rounded-xl border border-rule bg-surface p-6">
            <div className="flex items-center justify-between gap-3 border-b border-rule pb-3">
              <h3 className="font-semibold text-ink">
                1. การแบ่งชุดข้อมูล (Train / Test Split) — บทที่ 6
              </h3>
              <span className="font-mono text-xs text-accent">sklearn.model_selection</span>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              มักเว้นช่องให้เติมชื่อฟังก์ชัน, ค่า <code>test_size</code> (เช่น 0.2 หรือ 0.3) และ <code>random_state</code>
            </p>

            <CodeSnippet
              title="train_test_split template"
              code={`import pandas as pd
from sklearn.model_selection import train_test_split

# 1. แยก Features (X) และ Target (y)
X = df.drop(columns=['Target_Column'])
y = df['Target_Column']

# 2. แบ่งข้อมูล Train 70% และ Test 30% (จุดที่มักให้ออกเติมโค้ด)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.3,       # สัดส่วนข้อมูลทดสอบ (เช่น 0.3 หรือ 0.2)
    random_state=42,     # ควบคุมให้ผลลัพธ์คงที่ตรงกับเฉลยอาจารย์
    stratify=y           # (ถ้ามี) รักษาสัดส่วนคลาสใน Train/Test ให้เท่ากัน
)

print(f"ขนาดข้อมูล Train: {X_train.shape}, Test: {X_test.shape}")`}
            />

            <div className="mt-3 rounded-lg border border-warn/30 bg-warn-wash/40 p-3 text-xs text-ink">
              <strong className="text-warn font-semibold">⚠️ จุดระวัง:</strong> อย่าลืมใส่ <code>random_state=...</code> ตามที่โจทย์ระบุ หากไม่ใส่ ข้อมูลจะสุ่มใหม่ทุกครั้ง ทำให้ตัวเลขผลลัพธ์ใน Paper work ไม่ตรงกับตอนรัน!
            </div>
          </div>

          {/* Part 2: Decision Tree */}
          <div className="rounded-xl border border-rule bg-surface p-6">
            <div className="flex items-center justify-between gap-3 border-b border-rule pb-3">
              <h3 className="font-semibold text-ink">
                2. Decision Tree Classifier — บทที่ 7
              </h3>
              <span className="font-mono text-xs text-accent">sklearn.tree</span>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              มักให้ออกเติม <code>criterion=&apos;gini&apos;</code>, การจำกัดความลึก <code>max_depth</code>, การสั่ง <code>fit()</code> และ <code>predict()</code>
            </p>

            <CodeSnippet
              title="DecisionTreeClassifier template"
              code={`from sklearn.tree import DecisionTreeClassifier, export_text

# 1. ประกาศโมเดล (จุดที่มักให้ออกเติมพารามิเตอร์)
model = DecisionTreeClassifier(
    criterion='gini',    # สไลด์สอนคำนวณ Gini เป็นหลัก (อาจมี 'entropy')
    max_depth=3,         # จำกัดความลึกของต้นไม้ เพื่อป้องกัน Overfitting
    random_state=42
)

# 2. เทรนโมเดลด้วย Train Data
model.fit(X_train, y_train)

# 3. นำไปทำนายบน Test Data (ห้าม fit ซ้ำ!)
y_pred = model.predict(X_test)

# 4. ดูความสำคัญของแต่ละฟีเจอร์ (มักมีในคำถามอธิบาย)
for col, imp in zip(X.columns, model.feature_importances_):
    print(f"{col}: {imp:.4f}")

# 5. แสดงกฎของต้นไม้ตัดสินใจเป็นข้อความ
print(export_text(model, feature_names=list(X.columns)))`}
            />

            <div className="mt-3 rounded-lg border border-rule bg-paper p-3 text-xs text-ink-muted">
              <strong className="text-ink font-semibold">💡 ข้อสังเกต:</strong> ฟีเจอร์ที่มีค่า <code>feature_importances_</code> สูงสุด คือฟีเจอร์ที่ลดค่า Impurity ได้มากที่สุด และมักถูกเลือกเป็น Root Node ของต้นไม้
            </div>
          </div>

          {/* Part 3: Model Evaluation & Confusion Matrix */}
          <div className="rounded-xl border border-rule bg-surface p-6">
            <div className="flex items-center justify-between gap-3 border-b border-rule pb-3">
              <h3 className="font-semibold text-ink">
                3. Evaluation Metrics &amp; Confusion Matrix — บทที่ 7 &amp; 8
              </h3>
              <span className="font-mono text-xs text-accent">sklearn.metrics</span>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              การคำนวณ Accuracy, Precision, Recall, F1 และการแสดงผล Confusion Matrix
            </p>

            <CodeSnippet
              title="Metrics & Confusion Matrix template"
              code={`from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

# 1. คำนวณมาตรวัดทั้ง 4 ตัว
acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred, pos_label=1) # กำหนด pos_label ตามโจทย์
rec = recall_score(y_test, y_pred, pos_label=1)
f1 = f1_score(y_test, y_pred, pos_label=1)

print(f"Accuracy:  {acc:.4f}")
print(f"Precision: {prec:.4f}")
print(f"Recall:    {rec:.4f}")
print(f"F1-Score:  {f1:.4f}")

# 2. Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

# 3. สรุปรายงานครบทุกคลาส
print("\nClassification Report:")
print(classification_report(y_test, y_pred))`}
            />

            {/* Crucial Pitfall Box */}
            <div className="mt-4 rounded-lg border-2 border-bad/30 bg-bad-wash/40 p-4 text-xs text-ink space-y-2">
              <div className="flex items-center gap-2 text-bad font-bold text-sm">
                <ExclamationTriangleIcon className="h-4 w-4" />
                จุดหลอกระดับชาติ: โครงสร้าง Confusion Matrix ของ scikit-learn!
              </div>
              <p className="leading-relaxed">
                ใน scikit-learn ผลลัพธ์ของ <code>confusion_matrix(y_test, y_pred)</code> จะเรียงแถวและคอลัมน์จากคลาสที่มีค่าน้อยไปมาก โดย Default:
              </p>
              <div className="overflow-x-auto rounded bg-surface p-2.5 font-mono text-xs border border-rule">
                <code>
                  {`[ [ TN,  FP ],    <-- คลาส 0 (Negative / No / ใช้งานปกติ)
  [ FN,  TP ] ]   <-- คลาส 1 (Positive / Yes / Inactive / ลาออก)`}
                </code>
              </div>
              <p className="text-bad font-semibold">
                ⚠️ อย่าจำสลับ: ในสไลด์ทฤษฎีบางหน้าอาจวาง Positive ไว้แถวแรก (TP มุมบนซ้าย) แต่ใน scikit-learn TP จะอยู่ที่มุมล่างขวา <code>cm[1, 1]</code> เสมอเมื่อคลาสบวกคือ 1!
              </p>
            </div>
          </div>

          {/* Part 4: K-Means Clustering */}
          <div className="rounded-xl border border-rule bg-surface p-6">
            <div className="flex items-center justify-between gap-3 border-b border-rule pb-3">
              <h3 className="font-semibold text-ink">
                4. K-Means Clustering — บทที่ 8
              </h3>
              <span className="font-mono text-xs text-accent">sklearn.cluster</span>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              การสร้างโมเดล K-Means, ดึงตำแหน่ง Centroids และหมายเลข Cluster Labels
            </p>

            <CodeSnippet
              title="KMeans clustering template"
              code={`from sklearn.cluster import KMeans

# 1. กำหนดจำนวนกลุ่ม k (n_clusters)
kmeans = KMeans(
    n_clusters=3,        # จำนวนกลุ่ม k
    init='random',       # หรือ 'k-means++'
    n_init=10,           # จำนวนรอบที่สุ่มเริ่มต้น
    random_state=42
)

# 2. Fit โมเดลกับข้อมูล (Unsupervised เรียนรู้โดยไม่ต้องส่ง y)
kmeans.fit(X)

# 3. ดึงผลลัพธ์สำคัญ (มักให้ออกเขียนใน Paper work)
centroids = kmeans.cluster_centers_  # พิกัดจุดศูนย์กลางกลุ่มใหม่
labels = kmeans.labels_              # หมายเลขกลุ่มของแต่ละแถวข้อมูล

print("พิกัด Centroids ใหม่ (ค่าเฉลี่ยของแต่ละกลุ่ม):")
print(centroids)

print("\nกลุ่มของข้อมูล 5 แถวแรก:", labels[:5])`}
            />

            <div className="mt-3 rounded-lg border border-rule bg-paper p-3 text-xs text-ink-muted">
              <strong className="text-ink font-semibold">💡 ข้อสังเกต:</strong> ใน K-Means เป็นการเรียนรู้แบบไม่มีผู้สอน (Unsupervised) ดังนั้นคำสั่งคือ <code>kmeans.fit(X)</code> <strong>ไม่ต้องมี y</strong> เหมือน Classification
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Section 3: แนวการเขียนอธิบายคำตอบ ───────────── */}
      <section className="border-b border-rule py-12 sm:py-16">
        <div className="shell max-w-4xl space-y-8">
          <header>
            <span className="font-mono text-xs font-semibold text-accent">§03</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              แนวทางการ &quot;เขียนคำอธิบายคำตอบ&quot; ลง Paper Work
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              เทมเพลตคำตอบที่ตอบแล้วได้คะแนนเต็ม ตรงประเด็นตามเกณฑ์วิชา Data Science
            </p>
          </header>

          <div className="space-y-5">
            {/* QA 1 */}
            <article className="rounded-xl border border-rule bg-surface p-5">
              <h3 className="flex items-start gap-2 font-semibold text-ink text-sm">
                <span className="rounded bg-accent-wash px-1.5 py-0.5 font-mono text-xs text-accent">Q1</span>
                โจทย์ถาม: &quot;ในโจทย์ทำนายลูกค้าจะยกเลิกบริการ (Customer Inactivity/Churn) ทำไมถึงควรให้ความสำคัญกับ Recall มากกว่า Accuracy?&quot;
              </h3>
              <div className="mt-3 border-l-2 border-good pl-3 text-xs text-ink space-y-1.5">
                <p>
                  <strong>แนวคำตอบที่ได้คะแนน:</strong>
                </p>
                <p className="text-ink-muted leading-relaxed">
                  &quot;เนื่องจากข้อมูลลูกค้า Churn มักมีสัดส่วนน้อย (Class Imbalance) หากใช้ Accuracy โมเดลที่ทายว่าไม่มีใครยกเลิกเลยก็ยังได้ Accuracy สูง แต่ไม่สามารถตรวจจับลูกค้าที่จะยกเลิกจริงได้ ในทางธุรกิจ <strong>ต้นทุนของการปล่อยให้ลูกค้าหลุดมือไป (False Negative: ลูกค้าจะยกเลิกแต่โมเดลทายว่าไม่ยกเลิก) สูงกว่า</strong> ต้นทุนการส่งโปรโมชั่นรักษาลูกค้า (False Positive) ดังนั้นจึงต้องเน้น <strong>Recall สูง</strong> เพื่อจับลูกค้ากลุ่มเสี่ยงให้ได้ครบถ้วนที่สุด&quot;
                </p>
              </div>
            </article>

            {/* QA 2 */}
            <article className="rounded-xl border border-rule bg-surface p-5">
              <h3 className="flex items-start gap-2 font-semibold text-ink text-sm">
                <span className="rounded bg-accent-wash px-1.5 py-0.5 font-mono text-xs text-accent">Q2</span>
                โจทย์ถาม: &quot;การปรับลด max_depth ใน Decision Tree ส่งผลต่อโมเดลอย่างไร และมีประโยชน์ด้าน Responsible Data Science อย่างไร?&quot;
              </h3>
              <div className="mt-3 border-l-2 border-good pl-3 text-xs text-ink space-y-1.5">
                <p>
                  <strong>แนวคำตอบที่ได้คะแนน:</strong>
                </p>
                <p className="text-ink-muted leading-relaxed">
                  &quot;1. <strong>ด้านประสิทธิภาพ:</strong> การคุม <code>max_depth</code> เป็นการทำ Pre-pruning ช่วยลดความซับซ้อนของต้นไม้ ป้องกันปัญหา Overfitting ทำให้โมเดลนำไปใช้กับชุดข้อมูลจริงได้เสถียรขึ้น (Better Generalization)
                  <br />
                  2. <strong>ด้าน Responsible DS (บท 9):</strong> ต้นไม้ที่มีความลึกน้อยจะมีความโปร่งใส สามารถอธิบายเหตุผลของการตัดสินใจได้ง่าย (High Interpretability / Explainable AI) ทำให้ผู้ใช้งานและผู้ถูกประเมินตรวจสอบความถูกต้องและความเป็นธรรม (Fairness) ได้ชัดเจน&quot;
                </p>
              </div>
            </article>

            {/* QA 3 */}
            <article className="rounded-xl border border-rule bg-surface p-5">
              <h3 className="flex items-start gap-2 font-semibold text-ink text-sm">
                <span className="rounded bg-accent-wash px-1.5 py-0.5 font-mono text-xs text-accent">Q3</span>
                โจทย์ถาม: &quot;พิกัดของ Centroid หลังจบแต่ละรอบใน K-Means มาจากไหน?&quot;
              </h3>
              <div className="mt-3 border-l-2 border-good pl-3 text-xs text-ink space-y-1.5">
                <p>
                  <strong>แนวคำตอบที่ได้คะแนน:</strong>
                </p>
                <p className="text-ink-muted leading-relaxed">
                  &quot;พิกัดของ Centroid ใหม่ คำนวณจาก <strong>ค่าเฉลี่ยเลขคณิต (Mean) ของสมาชิกทุกจุดที่ถูกจัดเข้ากลุ่มนั้นในรอบดังกล่าว</strong> ทั้งในแกน X และแกน Y นั่นคือ <Tex tex="C' = (\tfrac{\sum x_i}{n},\; \tfrac{\sum y_i}{n})" /> โดยหากกลุ่มใดมีสมาชิกเพียงจุดเดียว Centroid จะไม่ขยับ และกระบวนการจะหยุดเมื่อไม่มีจุดใดย้ายกลุ่มหรือตำแหน่ง Centroid คงที่&quot;
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ───────────── Section 4: Checklist วันสอบ ───────────── */}
      <section className="py-12 sm:py-16 bg-surface">
        <div className="shell max-w-4xl">
          <header className="mb-8">
            <span className="font-mono text-xs font-semibold text-accent">§04</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Checklist ก่อนเดินเข้าห้องสอบ Lab (22 ต.ค.)
            </h2>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-rule p-4 space-y-2">
              <h4 className="font-semibold text-ink text-sm flex items-center gap-2">
                <CheckCircledIcon className="h-4 w-4 text-good" />
                สิ่งที่ต้องเตรียมตัว
              </h4>
              <ul className="text-xs text-ink-muted space-y-1.5 pl-6 list-disc">
                <li>เตรียม <strong>Google Account</strong> ที่สามารถเปิด Google Colab ได้โดยไม่มีปัญหาการ Login</li>
                <li>พก <strong>ปากกา</strong> สำหรับเขียนชื่อ นามสกุล รหัส และตอบคำถามลง Paper work</li>
                <li>ไปถึงห้องสอบก่อนเวลา 10–15 นาที: <strong>Sci Digital Lab ชั้น 1 อาคาร 60 ปี</strong> (หากห้องเต็ม ย้ายไปชั้น 6)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-rule p-4 space-y-2">
              <h4 className="font-semibold text-ink text-sm flex items-center gap-2">
                <CheckCircledIcon className="h-4 w-4 text-good" />
                ขั้นตอนส่งงานในห้องสอบ
              </h4>
              <ul className="text-xs text-ink-muted space-y-1.5 pl-6 list-disc">
                <li>กด <strong>Runtime → Run all</strong> ก่อนส่ง 1 รอบ เพื่อมั่นใจว่าไม่มีบั๊กและ Cell รันติดตัวเลขทุกช่อง</li>
                <li>ตรวจสอบให้แน่ใจว่าบันทึกไฟล์ (Save copy in Drive หรือ Download .ipynb) ตามวิธีที่อาจารย์ประกาศ</li>
                <li>ส่งกระดาษ Paper work โดยเขียนคำตอบ ลายมืออ่านง่าย และระบุหน่วยกำกับตัวเลขทุกครั้ง</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-rule bg-accent-wash/50 p-6">
            <div>
              <h3 className="font-semibold text-ink">พร้อมทบทวนข้อสอบทฤษฎีควบคู่กันหรือยัง?</h3>
              <p className="mt-1 text-xs text-ink-muted">
                ข้อสอบทฤษฎีมี 5 บทเต็ม ฝึกคิดคำนวณด้วย Thinking Player และทำ Mock Test 30 ข้อ
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/mock-test" className="btn btn-primary text-xs">
                ทำข้อสอบจำลอง
              </Link>
              <Link href="/player" className="btn btn-secondary text-xs">
                Thinking Player
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
