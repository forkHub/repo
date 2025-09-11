The **sliding window algorithm** is a powerful technique used to efficiently process sequences (like strings or arrays) by maintaining a subset (or "window") of elements and moving it across the data structure. It's especially useful for problems involving **substrings**, **subarrays**, or **pattern matching**.

---

### 🔍 **Core Idea**
Instead of checking every possible subset from scratch, you "slide" a window of fixed or variable size across the data, updating the result incrementally.

---

### 🧠 **How It Works**
1. **Initialize** a window (usually with two pointers: `start` and `end`).
2. **Expand** the window by moving the `end` pointer.
3. **Shrink** the window by moving the `start` pointer when needed (e.g., to maintain a constraint).
4. **Update** the result based on the current window contents.

---

### 📘 **Example: Count Non-Overlapping `"bb"` in a String**
Here’s how you could use a sliding window to count `"bb"` patterns without collisions:

```javascript
function countNonOverlappingBB(text) {
  let count = 0;
  let i = 0;

  while (i < text.length - 1) {
    if (text[i] === 'b' && text[i + 1] === 'b') {
      count++;
      i += 2; // Skip next character to avoid overlap
    } else {
      i += 1;
    }
  }

  return count;
}

console.log(countNonOverlappingBB("bbb")); // Output: 1
console.log(countNonOverlappingBB("bbbb")); // Output: 2
```

---

### 🧩 **Use Cases**
- Finding substrings of a certain length or property (e.g., longest substring without repeating characters).
- Calculating moving averages.
- Pattern matching in DNA sequences or logs.
- Optimizing brute-force solutions.

---

### ⚡️ **Benefits**
- **Time-efficient**: Often reduces time complexity from O(n²) to O(n).
- **Space-efficient**: Uses minimal extra memory.
- **Real-time capable**: Great for streaming or continuous input.

---

Would you like to see how this applies to more complex patterns or maybe visualize how the window moves across a string?