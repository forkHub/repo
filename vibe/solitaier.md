To apply **Solitaire's card movement rules** in **vanilla JavaScript**, you'll need to model the game state and
implement logic for:

1. **Card representation**
2. **Validating moves**
3. **Handling drag-and-drop or click-based movement**
4. **Updating the DOM**

Here’s a simplified breakdown of how you might implement the **movement rules**:

---

### 🧱 1. **Card Representation**
Each card can be represented as an object:

```javascript
const card = {
rank: 7, // 1 = Ace, 13 = King
suit: 'hearts', // 'hearts', 'diamonds', 'clubs', 'spades'
color: 'red', // or 'black'
faceUp: true
};
```

---

### 🔍 2. **Valid Move Check (Tableau to Tableau)**

```javascript
function isValidMove(sourceCard, targetCard) {
const isOppositeColor = sourceCard.color !== targetCard.color;
const isOneRankLower = sourceCard.rank === targetCard.rank - 1;
return isOppositeColor && isOneRankLower;
}
```

---

### 🧩 3. **Moving a Group of Cards**

```javascript
function canMoveGroup(cards, targetCard) {
// Check if the group is in descending order and alternating colors
for (let i = 0; i < cards.length - 1; i++) { if ( cards[i].rank !==cards[i + 1].rank + 1 || cards[i].color===cards[i +
  1].color ) { return false; } } // Check if the top card of the group can be placed on the target return
  isValidMove(cards[0], targetCard); } ``` --- ### 🏰 4. **Moving to an Empty Column** ```javascript function
  canMoveToEmptyColumn(cardOrGroup) { const topCard=Array.isArray(cardOrGroup) ? cardOrGroup[0] : cardOrGroup; return
  topCard.rank===13; // King } ``` --- ### 🧠 5. **Foundation Move Check** ```javascript function
  canMoveToFoundation(card, foundationPile) { if (foundationPile.length===0) { return card.rank===1; // Ace } const
  topCard=foundationPile[foundationPile.length - 1]; return card.suit===topCard.suit && card.rank===topCard.rank + 1; }
  ``` 
  
--- Would you like a working HTML + JS demo of this logic in action (e.g., drag-and-drop cards on a board)? Or
  should I help you build a full Solitaire game structure step-by-step?




Here’s a **working example** of a simple Solitaire-like card movement mechanic using **vanilla JavaScript** with **click-based interaction**. This demo focuses on:

- Clicking a card to select it
- Clicking a target pile to move it if the move is valid (based on Solitaire rules)

---

### 🧪 **Live Demo Code (HTML + CSS + JS)**

You can copy and paste this into an `.html` file and open it in your browser:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple Solitaire Move</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .pile { border: 1px solid #aaa; width: 100px; height: 140px; margin: 10px; display: inline-block; vertical-align: top; padding: 5px; }
    .card { width: 90px; height: 130px; margin: 2px 0; background: white; border: 1px solid #333; text-align: center; line-height: 130px; cursor: pointer; }
    .selected { border: 2px solid blue; }
  </style>
</head>
<body>

<h2>Click a card, then click a pile to move it</h2>

<div id="pile1" class="pile"></div>
<div id="pile2" class="pile"></div>

<script>
  const pile1 = document.getElementById('pile1');
  const pile2 = document.getElementById('pile2');

  let selectedCard = null;

  // Sample cards
  const cards = [
    { rank: 7, suit: 'hearts', color: 'red' },
    { rank: 6, suit: 'clubs', color: 'black' }
  ];

  // Render cards in pile1
  function renderPile(pile, cards) {
    pile.innerHTML = '';
    cards.forEach((card, index) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.textContent = `${card.rank} ${card.suit}`;
      div.dataset.index = index;
      div.dataset.rank = card.rank;
      div.dataset.color = card.color;
      div.addEventListener('click', (e) => {
        e.stopPropagation();
        if (selectedCard) {
          selectedCard.classList.remove('selected');
        }
        selectedCard = div;
        div.classList.add('selected');
      });
      pile.appendChild(div);
    });
  }

  // Initial render
  renderPile(pile1, cards);

  // Handle pile click
  [pile1, pile2].forEach(pile => {
    pile.addEventListener('click', () => {
      if (selectedCard) {
        const cardRank = parseInt(selectedCard.dataset.rank);
        const cardColor = selectedCard.dataset.color;

        const targetPile = pile;
        const lastCard = targetPile.lastElementChild;
        if (!lastCard || (
          parseInt(lastCard.dataset.rank) === cardRank + 1 &&
          lastCard.dataset.color !== cardColor
        )) {
          targetPile.appendChild(selectedCard);
          selectedCard.classList.remove('selected');
          selectedCard = null;
        } else {
          alert('Invalid move!');
        }
      }
    });
  });
</script>

</body>
</html>
```

---

### ✅ Features:
- Two piles (`pile1` and `pile2`)
- Cards can be clicked to select
- Valid move: card must be one rank lower and opposite color
- Invalid moves show an alert

---

Would you like to expand this into a full Solitaire game with drag-and-drop, multiple piles, and foundations?