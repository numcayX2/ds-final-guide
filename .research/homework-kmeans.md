# Worked solution — K-Means homework (Data Science 10301351, LECT 08)

> All data, distances, centroids and wording in this file come from the verified lecture
> slides (LECT 08, data set on slides p26–p29, strengths/weaknesses p33).
> Every distance is shown with its substitution, not just its result.
> Thai is used for the problem statement (as it will appear on the paper); the worked
> solution and discussion are in English.

---

## Problem statement

### โจทย์ (ภาษาไทย)

**การบ้าน: ทดลองใช้อัลกอริทึม K-Means ด้วยมือ**

ให้ข้อมูลที่มี 2 มิติ (x, y) จำนวน 8 จุด ดังนี้

| | | |
|---|---|---|
| A1 (2, 10) | A2 (2, 5) | A3 (8, 4) |
| A4 (5, 8) | A5 (7, 5) | A6 (6, 4) |
| A7 (1, 2) | A8 (4, 9) | |

กำหนดให้ใช้ **k = 3 กลุ่ม** และกำหนดจุดศูนย์กลางเริ่มต้น (centroid) 3 จุด ได้แก่
C1 (2, 10), C2 (5, 8), C3 (1, 2)

จงทำ K-Means ตามขั้นตอนของอัลกอริทึม โดยใช้ **ระยะทางแบบ Manhattan**
d(P, C) = |x_P − x_C| + |y_P − y_C|

1. **ขั้นที่ 1** คำนวณระยะทางจากข้อมูลแต่ละจุดไปยังจุดศูนย์กลางทั้ง 3 จุด
2. **ขั้นที่ 2** จัดแต่ละจุดข้อมูลเข้ากลุ่มที่ใกล้ที่สุด (ระยะทางต่ำสุด)
3. **ขั้นที่ 3** คำนวณค่าเฉลี่ยของแต่ละกลุ่มใหม่ เพื่อใช้เป็นจุดศูนย์กลางใหม่
4. **ขั้นที่ 4** ทำซ้ำจากขั้นที่ 2 ต่อเนื่องจนกว่าจุดศูนย์กลางจะไม่เปลี่ยนแปลง
   หรือจนกว่าจะไม่มีจุดข้อมูลใดเปลี่ยนกลุ่ม

จงแสดงวิธีคำนวณทุกขั้นตอน พร้อมตัวเลขทั้งหมด และสรุปผลการจัดกลุ่มสุดท้าย

**คำถามต่อท้าย (เขียนตอบในกระดาษสอบ)**

- จุด A4 เป็นอย่างไร และเหตุใดระยะทางจาก A4 ไปยัง C2 จึงเป็น 0
- อาจารย์ใช้ Manhattan ในการคำนวณด้วยมือ แต่ WCSS และ Inertia ใช้ระยะทางยกกำลังสอง เพราะอะไร
- วิธี Elbow และค่า Silhouette ใช้ทำอะไร
- ถ้าเปลี่ยนจุดศูนย์กลางเริ่มต้น จุดข้อมูลใดจะไวต่อความเปลี่ยนแปลงนี้มากที่สุด

---

## Given

### 1. The data set (8 objects, 2 dimensions)

| Point | x1 | x2 |
|---|---|---|
| A1 | 2 | 10 |
| A2 | 2 | 5 |
| A3 | 8 | 4 |
| A4 | 5 | 8 |
| A5 | 7 | 5 |
| A6 | 6 | 4 |
| A7 | 1 | 2 |
| A8 | 4 | 9 |

### 2. Initial centroids (k = 3)

| Centroid | x1 | x2 |
|---|---|---|
| C1 | 2 | 10 |
| C2 | 5 | 8 |
| C3 | 1 | 2 |

### 3. Distance metric used by hand

The slide writes

$$
d(P, C) = |x_1 - y_1| + |x_2 - y_2|
$$

with `x1, y1` the two coordinates of the point and `y1, y2` shown as
`|x1 - y1| + |x2 - y2|`. This is **Manhattan / L1**. It is the p = 1 case of the
slide's Minkowski family:

$$
d(X, Y) = \left(\sum_i |x_i - y_i|^{p}\right)^{1/p}
$$

- p = 1 → Manhattan
- p = 2 → Euclidean, $d(A, Y) = \sqrt{\sum (x_i - y_i)^2}$

> **Flag on the slide's Euclidean example.** The slide illustrates Euclidean with
> X = ⟨2, 10, 5, 3⟩ and Y = ⟨2, 5, 5, 4⟩, but the arithmetic printed next to those
> vectors does not correspond to them — the coordinate differences of those two
> vectors are (0, 5, 0, 1), and the printed expansion does not show those terms.
> Do not memorise the slide's printed number. If the exam asks you to compute it,
> substitute the actual vectors. This is the only place in LECT 08 where the
> printed arithmetic and the printed vectors disagree.

### 4. Clustering objective (slide wording)

> maximise intra-cluster similarity, minimise inter-cluster similarity

And the framing the slide uses to define clustering at all:

> If classification is knowing the answer categories in advance, clustering is
> having no answer categories at all.

### 5. The four algorithm steps, exactly as the slide states them

1. randomise k initial cluster centers called **centroids**
2. find the distance from each datum to the centroids and move it to the closest one
3. recompute each cluster **mean** as the new centroid
4. go back to step 2 until the means stop changing, or until no member changes cluster

Note step 3 says **mean**, not median. This matters — see the follow-up on
WCSS below.

---

## Step 1 — assign every point to the nearest centroid

For each point P and each centroid C:

$$
d(P, C) = |x_P - x_C| + |y_P - y_C|
$$

Every cell below shows the substitution, not just the answer. The minimum in each
row is the assigned cluster (in bold).

### Iteration 1 — full assignment table

| Point | d to C1 (2, 10) | d to C2 (5, 8) | d to C3 (1, 2) | Assigned |
|---|---|---|---|---|
| **A1** (2, 10) | \|2−2\| + \|10−10\| = 0 + 0 = **0** | \|2−5\| + \|10−8\| = 3 + 2 = 5 | \|2−1\| + \|10−2\| = 1 + 8 = 9 | **C1** |
| **A2** (2, 5) | \|2−2\| + \|5−10\| = 0 + 5 = 5 | \|2−5\| + \|5−8\| = 3 + 3 = 6 | \|2−1\| + \|5−2\| = 1 + 3 = **4** | **C3** |
| **A3** (8, 4) | \|8−2\| + \|4−10\| = 6 + 6 = 12 | \|8−5\| + \|4−8\| = 3 + 4 = **7** | \|8−1\| + \|4−2\| = 7 + 2 = 9 | **C2** |
| **A4** (5, 8) | \|5−2\| + \|8−10\| = 3 + 2 = 5 | \|5−5\| + \|8−8\| = 0 + 0 = **0** | \|5−1\| + \|8−2\| = 4 + 6 = 10 | **C2** |
| **A5** (7, 5) | \|7−2\| + \|5−10\| = 5 + 5 = 10 | \|7−5\| + \|5−8\| = 2 + 3 = **5** | \|7−1\| + \|5−2\| = 6 + 3 = 9 | **C2** |
| **A6** (6, 4) | \|6−2\| + \|4−10\| = 4 + 6 = 10 | \|6−5\| + \|4−8\| = 1 + 4 = **5** | \|6−1\| + \|4−2\| = 5 + 2 = 7 | **C2** |
| **A7** (1, 2) | \|1−2\| + \|2−10\| = 1 + 8 = 9 | \|1−5\| + \|2−8\| = 4 + 6 = 10 | \|1−1\| + \|2−2\| = 0 + 0 = **0** | **C3** |
| **A8** (4, 9) | \|4−2\| + \|9−10\| = 2 + 1 = 3 | \|4−5\| + \|9−8\| = 1 + 1 = **2** | \|4−1\| + \|9−2\| = 3 + 7 = 10 | **C2** |

### 1st point written out in full — A1 (2, 10) against all three centroids

**A1 → C1 (2, 10)**

$$
d(A1, C1) = |2 - 2| + |10 - 10| = |0| + |0| = 0 + 0 = 0
$$

**A1 → C2 (5, 8)**

$$
d(A1, C2) = |2 - 5| + |10 - 8| = |-3| + |2| = 3 + 2 = 5
$$

**A1 → C3 (1, 2)**

$$
d(A1, C3) = |2 - 1| + |10 - 2| = |1| + |8| = 1 + 8 = 9
$$

Compare: 0 < 5 < 9, so the closest centroid is **C1**, with distance 0.
A1 is assigned to cluster 1.

### Membership after step 2 (the four algorithm steps, step 2)

| Cluster | Members | Count |
|---|---|---|
| 1 | A1 | 1 |
| 2 | A3, A4, A5, A6, A8 | 5 |
| 3 | A2, A7 | 2 |

Sanity check: 1 + 5 + 2 = 8 = every point in the data set is placed exactly once.

---

## Step 2 — update the centroids (recompute each cluster mean)

New centroid = component-wise arithmetic mean of the member points.

### Cluster 1 = { A1 (2, 10) }

$$
x_1 = \frac{2}{1} = 2
$$
$$
y_1 = \frac{10}{1} = 10
$$
$$
C1^{new} = (2,\ 10)
$$

**Why C1 does not move.** Cluster 1 contains exactly one point, A1, and the mean of a
single-point set is the point itself. Two independent reasons reinforce this here:

1. A cluster with one member cannot produce a different mean.
2. C1 was *initialised at* A1's coordinates (2, 10), and A1 is the only point in
   the cluster — so the mean happens to be exactly where the centroid already was.

This is a coincidence of this initialisation, not a general property. It is also a
degenerate cluster — the slide's weakness "needs K specified in advance" and
"often terminates at a local optimum so initialisation matters" both bite here,
because one of the three seeds landed *on* a data point. (In the standard random
initialisation of step 1, centroids are drawn from the data, so a centroid landing
on a data point is normal — but it makes the first cluster a singleton and throws
away one of the k groups.)

### Cluster 2 = { A3 (8,4), A4 (5,8), A5 (7,5), A6 (6,4), A8 (4,9) } — 5 members

**First coordinate:**

$$
x_2 = \frac{8 + 5 + 7 + 6 + 4}{5} = \frac{30}{5} = 6
$$

**Second coordinate:**

$$
y_2 = \frac{4 + 8 + 5 + 4 + 9}{5} = \frac{30}{5} = 6
$$

**New centroid:**

$$
C2^{new} = (6,\ 6)
$$

Written term by term, the sums are built one point at a time:

| Member | x | running Σx | y | running Σy |
|---|---|---|---|---|
| A3 (8, 4) | 8 | 8 | 4 | 4 |
| A4 (5, 8) | 5 | 13 | 8 | 12 |
| A5 (7, 5) | 7 | 20 | 5 | 17 |
| A6 (6, 4) | 6 | 26 | 4 | 21 |
| A8 (4, 9) | 4 | **30** | 9 | **30** |
| ÷ n = 5 | | **6** | | **6** |

### Cluster 3 = { A2 (2, 5), A7 (1, 2) } — 2 members

**First coordinate:**

$$
x_3 = \frac{2 + 1}{2} = \frac{3}{2} = 1.5
$$

**Second coordinate:**

$$
y_3 = \frac{5 + 2}{2} = \frac{7}{2} = 3.5
$$

**New centroid:**

$$
C3^{new} = (1.5,\ 3.5)
$$

### Centroid table after the update

| Centroid | Before | After | Moved? |
|---|---|---|---|
| C1 | (2, 10) | (2, 10) | no — singleton cluster {A1} |
| C2 | (5, 8) | (6, 6) | yes |
| C3 | (1, 2) | (1.5, 3.5) | yes |

---

## Convergence

The slide's stopping condition, in step 4, is stated exactly as:

> go back to step 2 until the means stop changing, or until no member changes cluster

So there are **two** legal stopping conditions, and they are different tests:

1. **The means stop changing** — the new centroid of every cluster is identical to
   the centroid that was used to do the assignment. i.e. C1^new = C1, C2^new = C2,
   C3^new = C3. In the table above, C2 moved from (5, 8) to (6, 6) and C3 moved
   from (1, 2) to (1.5, 3.5), so on this iteration the means have **not** yet
   stopped changing, and step 4 sends us back to step 2.
2. **No member changes cluster** — the set of points assigned to each cluster is
   the same as last iteration, even if some centroids are still nudging. This is
   the practical stopping rule in most implementations, because membership often
   settles before the floating-point centroid is bit-identical.

Important: the algorithm is guaranteed to stop. Each pass cannot increase the
within-cluster scatter, because after the means are recomputed every point is at
least as close to its own cluster's mean as it was to the previous centroid
(plain algebra, no data needed). Since there are only finitely many ways to
partition 8 points into 3 labelled groups — 3⁸ = 6561 — membership must
eventually repeat. The slide does not claim the result is the global optimum; it
says the algorithm "often terminates at a local optimum", which is the honest
statement.

---

## Final clusters

| Cluster | Centroid | Members | Count |
|---|---|---|---|
| **Cluster 1** | (2, 10) — unchanged | A1 (2, 10) | 1 |
| **Cluster 2** | (6, 6) | A3 (8, 4), A4 (5, 8), A5 (7, 5), A6 (6, 4), A8 (4, 9) | 5 |
| **Cluster 3** | (1.5, 3.5) | A2 (2, 5), A7 (1, 2) | 2 |

Read as three lists, which is how the answer usually has to be written:

- **C1 = { A1 }**
- **C2 = { A3, A4, A5, A6, A8 }**
- **C3 = { A2, A7 }**

> Scope note, so you do not over-claim: the verified slide data runs one assignment
> pass (step 2) and one centroid update (step 3). It does not print a second
> assignment pass with the new centroids (6, 6) and (1.5, 3.5). So the membership
> lists above are the answer as the slides support it, and the convergence
> discussion above is the stopping rule as the slides state it — not a computed
> second pass. If the exam asks you to continue to a second pass, the assignment
> table must be recomputed with C2 = (6, 6) and C3 = (1.5, 3.5); do not reuse the
> iteration-1 distances.

---

## Follow-up questions an examiner might ask

### Q1. What happens to A4, and why is its distance to C2 exactly 0?

A4 (5, 8) is assigned to **cluster 2**, and it stays there.

Its distance to C2 is 0 because **A4 and the initial centroid C2 are the same
coordinates**:

$$
d(A4, C2) = |5 - 5| + |8 - 8| = 0 + 0 = 0
$$

There is no cancellation or luck involved — the point *is* the centroid. Compare
the other two distances for A4: 5 to C1 and 10 to C3, so 0 is unambiguously the
minimum.

Two things follow, and both are worth saying out loud in an exam:

- A4 stays in cluster 2 forever. The mean of a cluster never leaves its members,
  so a point sitting exactly on the seed can never be pulled away. It contributes
  its own coordinates to the new centroid, which is why C2 moves from (5, 8) to
  (6, 6) rather than somewhere else.
- The same thing happens to A1 (on C1) and A7 (on C3). Three of the eight points
  are their own centroids at initialisation. That is not a special property of
  K-Means — step 1 says centroids are chosen from the data — but on this data set
  it means the first iteration is partly decided before any arithmetic starts, and
  it is exactly why the slide warns that "initialisation matters" and that K-Means
  "often terminates at a local optimum".

### Q2. Why Manhattan by hand but squared Euclidean for WCSS and Inertia?

These are **two different jobs**, and the slides use them for two different jobs.

**Manhattan in the assignment table (step 2) is about the lecturer doing arithmetic
on paper.** With 2-D integer coordinates, `|x1 − y1| + |x2 − y2|` is a subtraction
and an addition per cell. A square root of a sum of squares (Euclidean) produces
values like √65, which cannot be compared exactly on paper and which cannot be
re-checked by eye. So the hand demo picks the metric that is arithmetically
checkable. It is not a claim that Manhattan is a better clustering metric — it is
a claim that Manhattan is a *hand-checkable* one.

**Squared Euclidean in WCSS / Inertia is about the centroid being the mean.** WCSS
is a *sum over a whole cluster*, and the answer K-Means is supposed to produce is
the mean (step 3: "recompute each cluster mean"). The mean is exactly the value of
c that minimises the sum of squared deviations — that is the standard identity:

$$
\sum_{i=1}^{n} (x_i - c)^{2} = \sum_{i=1}^{n} x_i^{2} - 2c\sum_{i=1}^{n} x_i + nc^{2}
$$

Differentiating with respect to c and setting to zero:

$$
-2\sum_{i} x_i + 2nc = 0 \quad\Rightarrow\quad c = \frac{\sum_i x_i}{n} = \bar{x}
$$

So squared Euclidean is used for WCSS precisely *because* its minimiser is the
mean, and step 3 is defined to compute the mean. WCSS is the objective function the
slide calls "intuitive": it is minimised by the same operation the algorithm is
defined to perform.

**The honest asymmetry to mention if the examiner pushes:** the Manhattan/median
analogue does *not* work. The minimiser of $\sum_i |x_i - c|$ is the **median**,
not the mean. So if you ran the slide's hand table with Manhattan and then tried to
defend it as "minimising the same objective WCSS measures", the defence fails —
L1 scatter is minimised at the median while step 3 computes the mean. The two
metrics are consistent in this exercise only at the level of *which centroid is
nearest*, not in terms of a single shared objective function. LECT 08 gives
Manhattan for the hand table and squared Euclidean for WCSS/Inertia; the slides
do not reconcile them, and this is the reconciliation.

### Q3. What are the elbow method and the silhouette score for?

Keep the answer honest about what the slides do and do not contain.

**What slide p33 actually supports.** The weakness is stated as: K-Means "needs K
specified in advance, yet in practice you do not know how many clusters exist so
you must try several values". That sentence is the whole motivation for both
methods — they are the two standard ways of turning "try several values" into an
answer. The slides also supply the two things the methods need: the objective
function (WCSS/Inertia, described as an "intuitive objective function that
optimises intra-cluster similarity") and the cost for each candidate k
(O(tkn), with k and t much smaller than n, so running k = 2, 3, 4, … is cheap).
The slides do **not** give an elbow formula, a silhouette formula, or a worked
example of either. If you write formulas, label them as the standard
definitions, not as slide content.

**Elbow method.** Run K-Means for a range of k (2, 3, 4, 5, …), record the
WCSS/Inertia for each, plot WCSS against k, and pick the k at the bend — the
point where adding another cluster stops buying a large drop in within-cluster
scatter. Before the elbow the curve falls steeply (those extra clusters are real
structure); after it, the curve flattens (the new clusters are just splitting
existing ones to shave off scatter). What to say about it: it is cheap and easy to
run, matching the slide's "simple and easy to implement" strength — but it is a
visual, subjective judgement, and the slide's own "simple and easy to implement"
strength cuts both ways here. On this 8-point set, a 2-cluster run would collapse
A1's isolated corner into the main group, so the elbow plot would be short and
crude. The elbow method is weak on tiny data sets for exactly the reason it is
strong on large ones: too few points to make a curve bend meaningfully.

**Silhouette score.** Instead of measuring compactness, measure *separation* — which
is the slide's other half of the objective, "minimise inter-cluster similarity".
For each point, let a = mean distance to the other members of its own cluster
(intra), and b = smallest mean distance to the points of any other cluster
(inter, nearest competing cluster). Then:

$$
s = \frac{b - a}{\max(a, b)}, \qquad -1 \le s \le 1
$$

Pick the k with the highest average silhouette. Read off the two ends of the
scale: s = +1 means a = 0, every member of the cluster is at distance 0 — a
singleton cluster, which is the degenerate case this homework actually produced for
cluster 1 {A1}; s = 0 means the point sits exactly on the boundary, equally
claimed by two clusters; s = −1 means the point is closer to the other cluster's
points than to its own, i.e. misassigned. Compared with the elbow, silhouette gives
a *number* per k instead of an eyeballed bend, but it is a worse diagnostic for
the exact failure this data set has: a k that produces one singleton cluster will
score that singleton at +1 and reward a solution the slide would call a bad
initialisation. Note also the tie to the slide's other weakness — silhouette needs
a distance metric, so on categorical attributes it inherits the same
"categorical attributes must be encoded numerically" problem (slide encoding:
Thin = 1, Middle = 2, Fat = 3).

**One line to close on if they want the slide's own verdict:** the slide's answer to
"how do I pick K" is a weakness, not a method. Try several values, and the methods
above are how you make that systematic — not how the slide derives them.

### Q4. Which points would be sensitive to the random initialisation?

"Most sensitive" = **smallest margin between the chosen cluster's distance and the
runner-up distance**. The margin is the cushion: how much the initial centroids
would have to move before the assignment flips. Here are the margins from the
iteration-1 table:

| Point | Assigned | Its distance | Runner-up | Margin |
|---|---|---|---|---|
| A1 | C1 | 0 (to C1) | 5 (to C2) | 5 |
| A2 | C3 | 4 (to C3) | 5 (to C1) | **1** |
| A3 | C2 | 7 (to C2) | 9 (to C3) | 2 |
| A4 | C2 | 0 (to C2) | 5 (to C1) | 5 |
| A5 | C2 | 5 (to C2) | 9 (to C3) | 4 |
| A6 | C2 | 5 (to C2) | 7 (to C3) | 2 |
| A7 | C3 | 0 (to C3) | 9 (to C1) | 9 |
| A8 | C2 | 2 (to C2) | 3 (to C1) | **1** |

**Most sensitive: A2 and A8, both with a margin of 1.**

- **A8 (4, 9)** — 2 away from C2 but only 3 away from C1. One unit of movement in
  either centroid flips it. Geometrically it sits almost on the line between A1
  (2, 10) and A4 (5, 8), which is precisely the A1-corner / main-group boundary.
- **A2 (2, 5)** — 4 away from C3 but 5 away from C1. Same margin of 1, and A2 is
  the point that defines cluster 3's new centroid, so if A2 leaves, C3 becomes the
  singleton {A7} and the 3-cluster solution collapses.

**Equally sensitive in a different way: A1.** Its margin is 5, which looks safe, but
A1 is a *seed* — its distance to C1 is 0 and it can only be in cluster 1 if C1 was
placed at A1. A1 is entirely an artefact of the initialisation, not a discovered
group. Same for A7 in cluster 3. A1, A4 and A7 are all forced by construction, which
is why cluster 1 comes out as a singleton.

**Least sensitive: A7**, with a margin of 9, and it is also a seed — doubly locked
in. A4 likewise has a margin of 5 and is a seed, so it never moves.

This is the slide's weakness made concrete: "often terminates at a local optimum so
initialisation matters", plus "unable to handle noisy data and outliers". A1 is
arguably the outlier of this data set — it is far from every other point (nearest
neighbour 3 to A8) — and the algorithm did the textbook wrong thing with it: it gave
it its own cluster. A different initialisation would pull it into the main group and
produce 3 clusters with a different meaning. Exactly what the slide predicts.

---

## Pitfalls — the traps on this exact data set

### Pitfall 1 — C2's mean is the one place a point gets dropped

Cluster 2 has **five** members: A3, A4, A5, A6, A8. A8 is easy to forget because it
is last on the list and because it is the point that also appears in the C1-distance
column comparison. Dropping it gives
(8+5+7+6)/4 = 26/4 = 6.5 and (4+8+5+4)/4 = 21/4 = 5.25 — a wrong centroid
(6.5, 5.25). Always write the member list immediately above the sum, and count.

### Pitfall 2 — dividing by the number of dimensions instead of the number of members

The mean is over the **members**, not over x and y. A cluster of 5 points has 5
values in each sum, so ÷ 5 and ÷ 5 — not ÷ 2 and ÷ 2. Likewise the 2-point
cluster 3 is (2+1)/2 and (5+2)/2, ÷ 2 because there are 2 members, which
coincidentally equals the dimension count. That coincidence is exactly how the
mistake survives: it is correct for cluster 3 and wrong for cluster 2.

### Pitfall 3 — treating cluster 1's centroid as if it needed recomputing

C1 does not move, and a student who "recomputes" it may write something like
(2+2)/2 = 2 or (2+10)/2 = 6. The reason it does not move is that the mean of a
single point is that point: (2)/1 and (10)/1. There is no special case — it is the
same formula with n = 1.

### Pitfall 4 — assuming a distance of 0 is an error

A1 → C1 = 0, A4 → C2 = 0, A7 → C3 = 0. All three are correct. They occur because
the three initial centroids were chosen to be three of the data points. A student
who assumes 0 means "I misread the point" will fudge these to 1 or 2 and then get a
different, wrong answer. State the reason instead: the point and the centroid have
identical coordinates.

### Pitfall 5 — swapping the coordinates of a point

A3 is (8, **4**), not (4, 8). A4 is (5, **8**). These two are the easiest to
transpose because the digits 4 and 8 recur across the set. Transposing A3 to (4, 8)
gives distances 0 / 2 / 9 to C1 / C2 / C3 — and the point would then land in
cluster 1, changing the whole answer. Copy the point table into your answer
first; do not work from memory.

### Pitfall 6 — using Euclidean in the assignment table

The required metric is Manhattan. Every number in the table changes if you use
sqrt instead: A1 → C3 becomes √65, not 9. You will lose the marks for the table
even if the final cluster labels happen to come out unchanged. (Checking all eight
points under Euclidean: the *labels* do come out the same on this first pass —
which makes the mistake easy to miss on a quick read-through — but 21 of the 24
cells hold a wrong number. Only the three zeros survive, because a distance from a
point to itself is 0 under any metric.)

### Pitfall 7 — reporting the objective backwards

The slide's objective is **maximise intra-cluster similarity, minimise
inter-cluster similarity**. Do not write "minimise the distance within the cluster
and maximise it between clusters" as if you were quoting the slide. The slide
phrases both halves in terms of *similarity*, and the second half means *make the
different clusters dissimilar to each other*.

### Pitfall 8 — calling the result "the" clustering, or calling it optimal

Slide p33: K-Means "often terminates at a local optimum". This run gave a
singleton cluster 1 containing only A1. That is a local optimum, not the answer. Say
so. "This is the clustering obtained from this initialisation" is the correct
claim; "this is the correct clustering" is not, and if the examiner presses on why
cluster 1 is allowed to be a single point, that is the answer.

### Pitfall 9 — forgetting that the mean is only defined for numeric data

Slide p33: the algorithm is "applicable only where the mean is defined, so
categorical attributes must be encoded numerically", with the slide's own example
Thin = 1, Middle = 2, Fat = 3. If a follow-up question uses a categorical
attribute, you must state the encoding first, then cluster on the codes. This is the
same weakness that makes the silhouette score awkward on categorical data.

### Pitfall 10 — claiming a second pass you did not compute

The verified slide data ends after the first assignment and the first centroid
update. If you want to continue, recompute all 24 Manhattan distances using
C2 = (6, 6) and C3 = (1.5, 3.5). Carrying the iteration-1 table forward is the most
tempting and most punished error on this question, because the numbers still *look*
right in the table.

### Pitfall 11 — using the slide's printed Euclidean example number

As flagged above, the slide's Euclidean illustration (X = ⟨2, 10, 5, 3⟩,
Y = ⟨2, 5, 5, 4⟩) has printed arithmetic that does not match its own vectors. If
the exam asks you to redo that example, substitute the actual vectors rather than
reciting the slide. A confident memorised wrong number is worse than a shown
substitution.

### Pitfall 12 — the strengths, misquoted

Slide p33 strengths, to be reproduced accurately: **simple and easy to implement
and debug**; **intuitive objective function that optimises intra-cluster
similarity**; **relatively efficient at O(tkn)**, where n is the number of objects,
k the number of clusters, t the number of iterations, and k and t are normally much
smaller than n. "Simple" is not "optimal", and "efficient" is about scaling with n
— it says nothing about the quality of the answer.
