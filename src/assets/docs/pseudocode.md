# Pseudocode for Tenzies (Not TS)

It’s written **iteratively**, in the **order a real developer would build**, starting from setup → structure → styling → logic → accessibility → testing.


## Just Pseudocode 

There's a [cheater's version](#cheaters-pseudocode-recipe) below. 

(Step-by-Step Recipe)

---

### 🏗️ 1. Setup Project (Vite + React)

```bash
# Create and initialize project
npm create vite@latest tenzies-game --template react
cd tenzies-game
npm install

# Add dependencies for game logic & UI
npm install nanoid react-confetti react-use
```

**Test:**
✅ Run dev server → base Vite + React app shows “Vite + React”.

---

### ⚙️ 2. File Structure

```text
tenzies-game/
│── index.html
│── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       └── Die.jsx
```

**Test:**
✅ Confirm folder structure exists before coding.

---

### 🧩 3. Basic HTML Template

```html
<!-- index.html -->
<!-- Set up minimal structure -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Add meta tags and title -->
  </head>
  <body>
    <!-- Root element for React -->
    <div id="root"></div>
    <!-- Link to main.jsx -->
  </body>
</html>
```

**Test:**
✅ Root div mounts React app successfully.

---

### ⚛️ 4. React Entry Point Setup

```jsx
// main.jsx
// ====== Mount React App ======
- Import React, createRoot, and App
- Import global styles
- Render <App /> inside #root
```

**Test:**
✅ “App component” placeholder renders.

---

### 🧠 5. Create Base App Component

```jsx
// App.jsx
// ====== Basic Structure ======
- Create functional component App
- Return <main> with title and short instructions
```

**Test:**
✅ Text content visible and centered (temporarily styled via body).

---

### 🎲 6. Create Die Component

```jsx
// components/Die.jsx
// ====== Single Die Component ======
- Create component that receives a value prop
- Return a button showing that value
```

**Test:**
✅ Manually render 10 dice with values 1–6.

---

### 🔢 7. Generate Dice Programmatically

```jsx
// App.jsx
// ====== Dice Setup ======
- Write helper: generateAllNewDice()
  → Creates an array of 10 dice objects (value, id, isHeld)
- Store dice in state using useState()
- Map dice array → render <Die /> for each item
```

**Test:**
✅ 10 dice appear with random values on load.

---

### 🎨 8. Base Styling (Mobile First)

```css
/* index.css */
/* ====== Global Styles ====== */
- Reset box-sizing and margins
- Set background color and centering with flexbox
- Style main container with padding, radius, and alignment
- Create .dice-container grid (2 rows × 5 columns)
- Style dice buttons: fixed size, rounded corners, shadow
```

**Test:**
✅ Layout centered, dice grid visible, readable on mobile.

---

### 🧭 9. Add Roll Button

```jsx
// App.jsx
// ====== Roll Dice ======
- Add "Roll" button below dice container
- Create rollDice() function
  → When clicked, replace dice state with fresh dice array
```

**Test:**
✅ Clicking “Roll” re-generates dice values.

---

### 🎨 10. Style the Roll Button

```css
/* ====== Roll Button ====== */
- Add purple background, white text
- Increase padding and font size
- Slight radius and hover cursor
```

**Test:**
✅ Button visible, centered, responsive on mobile.

---

### 🖥️ 11. Add Desktop Media Queries

```css
/* ====== Responsive Layout ====== */
- For min-width: 600px
  → Increase spacing between dice
  → Adjust main padding and font sizes
```

**Test:**
✅ Spacing and proportions look balanced on tablet/desktop.

---

### 🎯 12. Implement Hold Mechanism

```jsx
// App.jsx
// ====== Hold Function ======
- Create function hold(id)
  → Flip the isHeld property of clicked die
- Pass this function down to each <Die />
- Add onClick in Die to trigger hold()
```

**Test:**
✅ Clicking a die logs or toggles held state.

---

### 💡 13. Add Conditional Styling

```jsx
// Die.jsx
// ====== Conditional Style ======
- Set background to green if isHeld is true
- Default to white otherwise
```

**Test:**
✅ Clicking toggles background color on/off.

---

### 🧩 14. Update Roll Logic

```jsx
// App.jsx
// ====== Improved Rolling ======
- Modify rollDice() to:
  → Only re-roll dice where isHeld is false
  → Keep held dice unchanged
```

**Test:**
✅ Held dice stay fixed; others roll normally.

---

### 🏆 15. Add Win Detection

```jsx
// App.jsx
// ====== Win Condition ======
- Add variable gameWon
  → True if all dice are held AND share same value
- Log "Game Won!" when both conditions are met
```

**Test:**
✅ “Game Won!” appears when conditions satisfied.

---

### 🎉 16. Add Confetti + New Game

```jsx
// App.jsx
// ====== Victory Animation ======
- Import Confetti and useWindowSize
- Render Confetti only when gameWon is true
- Change button text from "Roll" → "New Game"
- Reset dice when "New Game" clicked
```

**Test:**
✅ Confetti triggers correctly and button resets the game.

---

### ♿ 17. Add Accessibility Features

```jsx
// Die.jsx
// ====== Aria Labels ======
- Add aria-pressed attribute (reflects isHeld)
- Add aria-label describing die value and state

// App.jsx
// ====== Keyboard Focus ======
- Use useRef for roll/new game button
- useEffect → focus button automatically when gameWon is true
```

**Test:**
✅ Screen readers announce die state.
✅ “New Game” button receives focus automatically.

---

### 🧪 18. Testing Checklist

```txt
Functional:
  - Dice render, roll, and toggle correctly
  - Win condition triggers and resets game

Visual:
  - Centered layout across devices
  - Dice and button maintain color contrast

Accessibility:
  - Keyboard tab order logical
  - Aria attributes describe state
  - Focus management works after win

Performance:
  - Dice re-render only when necessary
  - No console errors or warnings
```

---

### 🧹 19. Final Polish

```txt
- Confirm consistent colors, spacing, and font hierarchy
- Test mobile landscape / portrait orientation
- Clean up console logs
- Commit with message: "feat: complete Tenzies game with accessibility"
```



#  Cheater's Pseudocode Recipe

---

### 🏗️ 1. Project Setup

```bash
# Create project with Vite + React
npm create vite@latest tenzies-game --template react

# Navigate & install dependencies
cd tenzies-game
npm install

# Install extras
npm install nanoid react-confetti react-use
```

---

### ⚙️ 2. Project Structure


```text
tenzies-game/
│── src/
│   ├── components/
│   │   └── Die.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── index.html
```

**Tests:**
✅ Run `npm run dev` → confirm base React app renders “Vite + React”.

---

### 🧩 3. Base HTML Skeleton (Vite template)

```html
<!-- index.html -->
<!-- ====== ROOT SETUP ====== -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta + basic setup -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tenzies Game</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
- Add google fonts. The Tutorial used _Karla_

**Tests:**
✅ Page loads blank root without errors in console.

---

### ⚛️ 4. Entry File

```jsx
// main.jsx
// ====== ENTRY POINT ======
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Tests:**
✅ Import works → React renders placeholder `<App />` text.

---

### 🧠 5. Create Basic App Component

```jsx
// App.jsx
// ====== APP STRUCTURE ======
export default function App() {
  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same.</p>
    </main>
  )
}
```

**Tests:**
✅ App renders heading & text inside `<main>`.
✅ Confirm responsive centering placeholder before styling.

---

### 🎲 6. Add Die Component

```jsx
// components/Die.jsx
// ====== SINGLE DIE ======
export default function Die(props) {
  return <button>{props.value}</button>
}
```

**Tests:**
✅ Import and render manually in `<App />`.
✅ Ten buttons appear with numbers 1–6.

---

### 🧮 7. Generate and Render Dice Programmatically

```jsx
// App.jsx
// ====== GENERATE DICE ARRAY ======
import Die from "./components/Die"
import { nanoid } from "nanoid"
import { useState } from "react"

export default function App() {
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
  }

  const [dice, setDice] = useState(generateAllNewDice())

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} />
  ))

  return (
    <main>
      <h1>Tenzies</h1>
      <div className="dice-container">{diceElements}</div>
    </main>
  )
}
```

**Tests:**
✅ Refresh → random dice render each time.
✅ Confirm unique key warnings resolved.

---

### 🎨 8. Add Base Styling (Mobile-first)

```css
/* index.css */
/* ====== GLOBAL RESET ====== */
* { box-sizing: border-box; margin: 0; padding: 0; }

/* ====== BODY LAYOUT ====== */
body {
  font-family: Karla, sans-serif;
  background-color: #0B2434;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* ====== MAIN CARD ====== */
main {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ====== DICE GRID ====== */
.dice-container {
  display: grid;
  grid-template: auto auto / repeat(5, 1fr);
  gap: 12px;
  margin-top: 20px;
}

/* ====== DICE BUTTONS ====== */
button {
  font-family: inherit;
  font-size: 1.25rem;
  border: none;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  height: 50px;
  width: 50px;
}
```

**Tests:**
✅ Check dice layout on mobile view (375px).
✅ Confirm all elements centered, no overflow.

---

### 🧭 9. Add Roll Dice Button

```jsx
// App.jsx
// ====== ROLL BUTTON ======
function rollDice() {
  setDice(generateAllNewDice())
}

return (
  <main>
    <h1 className="title">Tenzies</h1>
    <div className="dice-container">{diceElements}</div>
    <button className="roll-dice" onClick={rollDice}>Roll</button>
  </main>
)
```

**Tests:**
✅ Clicking “Roll” re-randomizes dice.

---

### 🎨 10. Add Styling for Roll Button

```css
/* ====== ROLL BUTTON ====== */
button.roll-dice {
  background: #5035FF;
  color: white;
  font-size: 1.1rem;
  padding: 8px 24px;
  border-radius: 6px;
  margin-top: 24px;
  cursor: pointer;
}
```

**Tests:**
✅ Roll button visible, accessible on small screens.

---

### 💻 11. Add Desktop Media Queries

```css
/* ====== MEDIA QUERIES ====== */
@media (min-width: 600px) {
  main { max-width: 480px; padding: 2rem; }
  .dice-container { gap: 20px; }
  button.roll-dice { font-size: 1.25rem; }
}
```

**Tests:**
✅ Resize window → spacing increases on desktop.

---

### 🧩 12. Add Hold Mechanism

```jsx
// App.jsx
// ====== HOLD FUNCTION ======
function hold(id) {
  setDice(oldDice =>
    oldDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    )
  )
}
```

**Tests:**
✅ Clicking die toggles held state in console.

---

### 🎨 13. Add Conditional Styling to Held Dice

```jsx
// Die.jsx
// ====== CONDITIONAL STYLE ======
const styles = { backgroundColor: props.isHeld ? "#59E391" : "white" }

return <button style={styles} onClick={props.hold}>{props.value}</button>
```

**Tests:**
✅ Click toggles background color.
✅ Style persists between rolls.

---

### 🎯 14. Roll Only Unheld Dice

```jsx
// App.jsx
// ====== UPDATE ROLL LOGIC ======
function rollDice() {
  setDice(oldDice =>
    oldDice.map(die =>
      die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
    )
  )
}
```

**Tests:**
✅ Held dice stay fixed while others reroll.

---

### 🏆 15. Add Win Logic

```jsx
// App.jsx
// ====== WIN CHECK ======
const gameWon =
  dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value)
```

**Tests:**
✅ Log “Game Won!” when all dice same + held.

---

### 🎉 16. Add Confetti and New Game Reset

```jsx
// App.jsx
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

const { width, height } = useWindowSize()

if (gameWon) console.log("Game Won!")

return (
  <main>
    {gameWon && <Confetti width={width} height={height} />}
    <div className="dice-container">{diceElements}</div>
    <button className="roll-dice" onClick={rollDice}>
      {gameWon ? "New Game" : "Roll"}
    </button>
  </main>
)
```

**Tests:**
✅ Confetti triggers on win.
✅ Button text changes to “New Game”.

---

### ♿ 17. Add Accessibility Features

```jsx
// Die.jsx
// ====== ACCESSIBILITY ======
<button
  style={styles}
  onClick={props.hold}
  aria-pressed={props.isHeld}
  aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
/>
```

```jsx
// App.jsx
// ====== FOCUS MANAGEMENT ======
import { useRef, useEffect } from "react"
const buttonRef = useRef(null)

useEffect(() => {
  if (gameWon) buttonRef.current.focus()
}, [gameWon])
```

**Tests:**
✅ Screen readers announce die states.
✅ “New Game” button gets focus automatically.

---

### 🧪 18. Testing Checklist

* ✅ **Functional:**

  * All dice render.
  * Roll button works.
  * Hold toggles dice.
  * Win condition triggers properly.

* ✅ **Visual:**

  * Layout centers across screen sizes.
  * Colors contrast correctly.

* ✅ **Accessibility:**

  * Tab navigation cycles buttons properly.
  * `aria-label` reads die states.
  * Confetti does not break focus flow.

* ✅ **Performance:**

  * No unnecessary re-renders (verify with React DevTools).

---