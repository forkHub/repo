Using a **Finite State Machine (FSM)** for pattern detection—like finding `"bb"` in a stream of characters—is a **very effective and scalable** approach, especially when patterns get more complex.

---

### 🧠 What Is an FSM?
An FSM is a computational model that consists of:
- **States**: Represent different conditions or stages.
- **Transitions**: Rules for moving from one state to another based on input.
- **Start and Accept States**: Define where the machine begins and what constitutes a successful match.

---

### 🔄 FSM for `"bb"` Pattern Detection
Let’s design a simple FSM to detect **non-overlapping `"bb"`**:

#### **States**
- `START`: Initial state.
- `B1`: Saw one `'b'`.
- `MATCHED`: Saw two `'b'`s (i.e., `"bb"` matched).

#### **Transitions**
- From `START`:
  - `'b'` → `B1`
  - other → `START`
- From `B1`:
  - `'b'` → `MATCHED` (increment count)
  - other → `START`
- From `MATCHED`:
  - any → `START` (reset to avoid overlap)

#### **FSM Implementation in JavaScript**
```javascript
function createBBFSM() {
  let state = 'START';
  let count = 0;

  return function(char) {
    switch (state) {
      case 'START':
        state = (char === 'b') ? 'B1' : 'START';
        break;
      case 'B1':
        if (char === 'b') {
          count++;
          state = 'MATCHED';
        } else {
          state = 'START';
        }
        break;
      case 'MATCHED':
        state = (char === 'b') ? 'B1' : 'START'; // restart FSM
        break;
    }
    return count;
  };
}

// Example usage:
const fsm = createBBFSM();
console.log(fsm('b')); // 0
console.log(fsm('b')); // 1
console.log(fsm('b')); // 1 (no overlap)
console.log(fsm('b')); // 2
```

---

### ✅ Advantages of FSM
- **Scalable**: Easily extendable to more complex patterns (e.g., `"abab"`, `"abcabc"`).
- **Efficient**: Constant time per character, no slicing or buffering.
- **Stream-friendly**: Perfect for real-time input or large data streams.

---

Would you like to expand this FSM to detect multiple patterns or visualize its state transitions?