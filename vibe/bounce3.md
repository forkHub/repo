To calculate the **normal vector** of a wall given its **angle**, you can follow this simple approach:

---

### 🧮 **Concept**

- The **angle** of the wall is usually measured **from the horizontal axis** (x-axis).
- The **normal vector** is **perpendicular** to the wall surface.
- So, if the wall has an angle **θ**, the **normal vector** will be at **θ + 90°** (or **θ + π/2 radians**).

---

### 🧾 **Pseudocode**

```plaintext
Function CalculateWallNormal(angleInDegrees):
    # Step 1: Convert angle to radians
    angleRadians = angleInDegrees * (π / 180)

    # Step 2: Add 90 degrees (π/2 radians) to get the normal direction
    normalAngle = angleRadians + (π / 2)

    # Step 3: Compute the unit normal vector
    normalX = cos(normalAngle)
    normalY = sin(normalAngle)

    # Step 4: Return the normal vector
    Return [normalX, normalY]
```

---

### 🧠 Example

If the wall is at **30°**, the normal vector will point at **120°**:

- \( \cos(120^\circ) = -0.5 \)
- \( \sin(120^\circ) = 0.866 \)

So the normal vector is approximately **[-0.5, 0.866]**.

Would you like a **diagram** showing the wall and its normal vector?