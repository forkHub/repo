To detect the **collision of two rotating boxes** and make them **rotate upon collision**, you need to handle both **collision detection** and **collision response** with rotation. Here's a breakdown in **pseudocode**:

---

### 🧱 Step 1: Represent the Boxes

Each box should have:
- Position: `x`, `y`
- Size: `width`, `height`
- Rotation angle: `angle`
- Velocity: `vx`, `vy`
- Angular velocity: `angularVelocity`

```plaintext
Box {
  position: (x, y)
  size: (width, height)
  angle: rotation in radians
  velocity: (vx, vy)
  angularVelocity: rotation speed
}
```

---

### 🧠 Step 2: Collision Detection (Separating Axis Theorem - SAT)

For rotated rectangles, use the **Separating Axis Theorem (SAT)**:

```plaintext
function isColliding(boxA, boxB):
  cornersA = getRotatedCorners(boxA)
  cornersB = getRotatedCorners(boxB)
  
  axes = getNormals(cornersA) + getNormals(cornersB)
  
  for each axis in axes:
    projectionA = projectOntoAxis(cornersA, axis)
    projectionB = projectOntoAxis(cornersB, axis)
    
    if not overlap(projectionA, projectionB):
      return false  // No collision

  return true  // Collision detected
```

---

### 🔁 Step 3: Collision Response with Rotation

If a collision is detected:

```plaintext
function resolveCollision(boxA, boxB):
  // Calculate collision normal and contact point
  normal = computeCollisionNormal(boxA, boxB)
  contactPoint = computeContactPoint(boxA, boxB)

  // Apply impulse to linear velocity
  impulse = computeImpulse(boxA, boxB, normal)
  boxA.vx -= impulse * normal.x / boxA.mass
  boxA.vy -= impulse * normal.y / boxA.mass
  boxB.vx += impulse * normal.x / boxB.mass
  boxB.vy += impulse * normal.y / boxB.mass

  // Apply torque to angular velocity
  rA = contactPoint - boxA.position
  rB = contactPoint - boxB.position
  boxA.angularVelocity -= cross(rA, impulse * normal) / boxA.inertia
  boxB.angularVelocity += cross(rB, impulse * normal) / boxB.inertia
```

---

### 🔄 Step 4: Update Positions and Rotations

```plaintext
function update(box, dt):
  box.x += box.vx * dt
  box.y += box.vy * dt
  box.angle += box.angularVelocity * dt
```

---

### Summary

- Use **SAT** for accurate collision detection between rotated rectangles.
- Use **impulse-based physics** to update both linear and angular velocities.
- Update positions and angles every frame.

---

Would you like a working example in **p5.js** or a visual simulation to see this in action?

The **Separating Axis Theorem (SAT)** is a powerful method used in 2D collision detection, especially for **convex shapes** like rectangles (even when rotated). It’s based on a simple idea:

> **If two convex shapes are not colliding, there exists at least one axis along which their projections do not overlap.**

---

### 🧠 Core Concept

1. **Project both shapes onto an axis** (a line).
2. **Check if their projections overlap**.
3. **If all projections overlap**, the shapes are colliding.
4. **If even one projection does not overlap**, the shapes are **not colliding**.

---

### 📐 How It Works for Rotated Rectangles

#### Step 1: Get the corners of both rectangles.
Each rectangle has 4 corners, which can be rotated using trigonometry.

#### Step 2: Compute the axes to test.
- For rectangles, the axes are the **normals (perpendiculars)** to each edge.
- You only need to test **4 axes** (2 from each rectangle), because opposite edges are parallel.

#### Step 3: Project all corners onto each axis.
- A projection is a **dot product** of the corner point with the axis vector.
- This gives a **scalar range** (min to max) for each shape on that axis.

#### Step 4: Check for overlap.
- If the projection ranges **do not overlap** on any axis → **no collision**.
- If they **overlap on all axes** → **collision detected**.

---

### 🧪 Pseudocode Example

```plaintext
function SATCollision(rectA, rectB):
    axes = getNormals(rectA) + getNormals(rectB)

    for axis in axes:
        projA = projectCorners(rectA.corners, axis)
        projB = projectCorners(rectB.corners, axis)

        if not overlap(projA, projB):
            return false  // Separating axis found

    return true  // No separating axis → collision
```

---

### 📊 Visual Intuition

Imagine sliding a shadow of each shape onto a line (the axis). If the shadows don’t touch, the shapes don’t touch.

---

Would you like a **visual diagram** or a **p5.js demo** to help you understand SAT in action?

Great! Let's dive deeper into **Step 3: Collision Response with Rotation** — this is the part where we handle what happens **after** two boxes collide, including how they **rotate** due to the impact.

---

### 🎯 Goal of Collision Response

When two boxes collide, we want to:
1. **Change their linear velocity** (so they bounce or slide away).
2. **Change their angular velocity** (so they rotate based on where they were hit).

This mimics real-world physics — like how a box spins if you hit it off-center.

---

### 🧮 Key Concepts

#### 1. **Impulse**
An impulse is a sudden force applied during a collision. It changes the velocity of the objects.

#### 2. **Contact Point**
The point where the two boxes touch. If this point is **not at the center**, it causes rotation.

#### 3. **Torque**
Torque is the rotational equivalent of force. It's what causes angular velocity (rotation).

---

### 🧠 Pseudocode Breakdown

```plaintext
function resolveCollision(boxA, boxB):
  // Step 1: Find the collision normal (direction of impact)
  normal = computeCollisionNormal(boxA, boxB)

  // Step 2: Find the contact point (where the boxes touch)
  contactPoint = computeContactPoint(boxA, boxB)

  // Step 3: Calculate the impulse based on mass and velocity
  impulse = computeImpulse(boxA, boxB, normal)

  // Step 4: Apply impulse to linear velocity
  boxA.vx -= impulse * normal.x / boxA.mass
  boxA.vy -= impulse * normal.y / boxA.mass
  boxB.vx += impulse * normal.x / boxB.mass
  boxB.vy += impulse * normal.y / boxB.mass

  // Step 5: Apply torque to angular velocity
  rA = contactPoint - boxA.position  // vector from center to contact
  rB = contactPoint - boxB.position

  // Cross product gives rotational effect
  boxA.angularVelocity -= cross(rA, impulse * normal) / boxA.inertia
  boxB.angularVelocity += cross(rB, impulse * normal) / boxB.inertia
```

---

### 🧪 What This Does

- If the collision happens **off-center**, the boxes will **spin**.
- The amount of spin depends on:
  - How far the contact point is from the center.
  - The strength of the impulse.
  - The box's **moment of inertia** (how hard it is to rotate).

---

Would you like a visual diagram or a p5.js simulation to see this in action?

Great question! Let's break down what it means to **project all corners onto each axis** — this is a key step in the **Separating Axis Theorem (SAT)** used for detecting collisions between rotated boxes.

---

### 🧠 What Does "Projecting Onto an Axis" Mean?

Imagine shining a flashlight on a shape and looking at the **shadow** it casts on a line (the axis). That shadow is the **projection** of the shape onto that axis.

In SAT, we do this to check if two shapes **overlap** on any axis. If they don’t overlap on even one axis, there’s **no collision**.

---

### 🧱 Step-by-Step: Projecting Corners

Let’s say you have a box with 4 corners and an axis (a 2D vector). Here's how you project:

1. **Get the corners of the box** (after rotation).
2. **Choose an axis** (usually the edge normals of both boxes).
3. For each corner:
   - Compute the **dot product** of the corner with the axis.
   - This gives you a **scalar value** — the position of the corner along that axis.
4. Track the **minimum and maximum** of these values — this gives you the **projection interval**.

---

### 📌 Pseudocode Example

```plaintext
function projectOntoAxis(corners, axis):
  min = dot(corners[0], axis)
  max = min

  for each corner in corners:
    projection = dot(corner, axis)
    if projection < min:
      min = projection
    if projection > max:
      max = projection

  return (min, max)  // This is the shadow (interval) on the axis
```

---

### 🧪 Why This Matters

Once you have the projection intervals for **both boxes** on the same axis, you check:

```plaintext
if intervalA.max < intervalB.min or intervalB.max < intervalA.min:
  return false  // No overlap → no collision
```

If they **do overlap on all axes**, then the boxes are colliding.

---

Would you like a visual diagram or animation to help illustrate this concept?


The **dot product** is a way to multiply two vectors that gives you a **scalar (single number)**. It's widely used in graphics and physics, especially for projections and angles between vectors.

---

### 🧮 Formula for 2D Vectors

If you have two vectors:

- **A** = (Ax, Ay)
- **B** = (Bx, By)

Then the **dot product** is:

```plaintext
dot(A, B) = Ax * Bx + Ay * By
```

---

### 📌 Example

```plaintext
A = (3, 4)
B = (2, 1)

dot(A, B) = 3*2 + 4*1 = 6 + 4 = 10
```

---

### 📐 Geometric Meaning

The dot product also tells you **how aligned two vectors are**:

```plaintext
dot(A, B) = |A| * |B| * cos(θ)
```

Where:
- |A| and |B| are the lengths (magnitudes) of the vectors.
- θ is the angle between them.

So:
- If dot > 0 → vectors point in similar directions.
- If dot = 0 → vectors are perpendicular.
- If dot < 0 → vectors point in opposite directions.

---

Would you like a visual diagram or a small interactive demo in p5.js to see how dot product works in projections?


