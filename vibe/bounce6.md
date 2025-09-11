Here's a clear and structured **pseudocode** for calculating the **full 360° angle** between two 2D vectors using both the **dot product** and **cross product**:

---

### 🧾 **Pseudocode: Full 360° Angle Between Two Vectors**

```plaintext
Function Angle360BetweenVectors(a, b):
    # Step 1: Compute the dot product
    dot = a.x * b.x + a.y * b.y

    # Step 2: Compute the 2D cross product (scalar)
    cross = a.x * b.y - a.y * b.x

    # Step 3: Compute the angle in radians using atan2
    angleRadians = atan2(cross, dot)

    # Step 4: Convert to degrees
    angleDegrees = angleRadians * (180 / π)

    # Step 5: Normalize to 0–360° range
    If angleDegrees < 0:
        angleDegrees = angleDegrees + 360

    Return angleDegrees
```

---

### 🧠 What This Does

- Uses `atan2(cross, dot)` to get the **signed angle** from vector **a** to **b**.
- Converts it to degrees and ensures the result is in the **[0°, 360°)** range.

Would you like me to generate a **visual diagram** showing this angle between two example vectors?