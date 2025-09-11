Here’s a simple **pseudocode** explanation of the `Normalize` function:

---

### 🧾 **Pseudocode: Normalize a Vector**

```plaintext
Function Normalize(vector):
    x = vector.x
    y = vector.y

    # Step 1: Calculate the magnitude (length) of the vector
    magnitude = sqrt(x^2 + y^2)

    # Step 2: Avoid division by zero
    If magnitude == 0:
        Return [0, 0]  # or handle as needed

    # Step 3: Divide each component by the magnitude
    normalized_x = x / magnitude
    normalized_y = y / magnitude

    # Step 4: Return the unit vector
    Return [normalized_x, normalized_y]
```

---

### 🧠 What This Does

- It **preserves direction** but **scales the vector to length 1**.
- Useful when you need a **pure direction** without affecting magnitude-based calculations.

Would you like to see this in action with a few example vectors?