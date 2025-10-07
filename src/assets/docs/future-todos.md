# Tenzies TODOs

### Date: 2025-10-07  (ChatGPT)


## Future TODOs - Short Version

The long version is [below](#todos---long-version)

### Code Quality

* Refactor logic into a `useTenziesGame` custom hook to separate UI from state.
* Optimize win condition checks — compute `allHeld` and `allSameValue` once.
* Abstract dice creation into a `generateDie()` helper.
* Add Jest/Vitest unit tests for dice and win condition logic.

### Accessibility

* Add visible focus outlines (`:focus-visible`).
* Add `role="status"` to live region for screen readers.

### UX / UI

* Move inline styles to CSS classes (e.g., `.die.held`).
* Add roll animations with CSS or Framer Motion.
* Include settings for dark mode or sound effects.
* Display roll count and timer for performance tracking.

### State & Persistence

* Store best scores and roll count in `localStorage`.
* Persist ongoing game state between sessions.

### Extra Credit Ideas

1. Replace numbers with real dice pips.
2. Add leaderboards or challenge modes.

---

## Notes to Future Self

* Check [future-todos](./docs/future-todos.md) for additional ideas.
* Keep all dice state in the parent (`App`) to maintain a single source of truth.
* Avoid derived or duplicated state in child components.
* Use **refs** for DOM focus management without re-rendering.

---

### Why Refs Are Used

Refs provide a direct handle to DOM elements **without triggering re-renders**.
They’re ideal for managing focus (e.g., focusing “New Game” after a win) and for integrating libraries that require direct DOM access.
This preserves React’s declarative model while maintaining precise control.

### Tenzies Hold State

Keep all dice state in the parent (App) to maintain a single source of truth.

![](/src/assets/shots/tenzies-hold-state-shot.JPG)

---




## TODOs - Long Version


## App.js

✅ Correct:

* **State Initialization:**
  Using `useState(() => generateAllNewDice())` is *perfect*.
  You avoided generating dice on every re-render. This shows you understand lazy initialization.

* **Derived State (gameWon):**
  Calculating `gameWon` inline is fine since it’s derived from `dice` and doesn’t need its own state.

* **Accessibility touches:**
  Using `aria-live` + `aria-pressed` shows **attention to a11y**. Most beginners skip that entirely — huge plus.

* **Focus management with `useRef`:**
  Beautiful touch. It’s rare to see a beginner handle focus correctly on win — this shows thoughtful UX.

* **Code readability:**
  Function naming (`rollDice`, `generateAllNewDice`, `hold`) is clean and self-descriptive.

* **Confetti Integration:**
  You handled external libs correctly, with width/height from `react-use` — professional-grade composition.

### ⚠️ What Could Be Improved

#### 1. **Derived State Optimization**

Right now:

```js
const gameWon = dice.every(die => die.isHeld) &&
                dice.every(die => die.value === dice[0].value)
```

* You’re running `.every()` twice on the same array.
* Minor performance hit now, but a bad habit if scaled to larger data sets.

✅ Better:

```js
const allHeld = dice.every(die => die.isHeld);
const firstValue = dice[0].value;
const allSameValue = dice.every(die => die.value === firstValue);
const gameWon = allHeld && allSameValue;
```

This is more explicit and easier to debug.

---

#### 2. **`generateAllNewDice()` duplication pattern**

The “generate new random values” logic appears twice (inside `generateAllNewDice` and `rollDice`).
Consider abstracting the single-die generator:

```js
function generateDie() {
  return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
}

function generateAllNewDice() {
  return Array.from({ length: 10 }, generateDie);
}
```

Cleaner and reusable — if you ever add “replace a single die” functionality, you already have it.

---

#### 3. **Over-rendering in `rollDice`**

Each click of “Roll” re-creates 10 new object literals, even for held dice.
Not a big deal here, but you could micro-optimize by skipping object spread for held ones:

```js
setDice(dice => dice.map(die => 
  die.isHeld ? die : { ...die, value: randomValue() }
));
```

You already did this correctly — just noting that it’s the right instinct.

---

#### 4. **Accessibility tweak**

This part:

```jsx
<div aria-live="polite" className="sr-only">
  {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
</div>
```

✅ Great accessibility.
💡 Enhancement:
Add `role="status"` to explicitly mark it as a live region for screen readers:

```jsx
<div aria-live="polite" role="status" className="sr-only">...</div>
```

---

#### 5. **Component Decomposition**

For a small app it’s fine, but a next-level practice is to move `generateAllNewDice`, `rollDice`, and `hold` into a custom hook, like `useTenziesGame()`.

```js
function useTenziesGame() {
  const [dice, setDice] = useState(generateAllNewDice);
  // hold(), rollDice(), etc.
  return { dice, rollDice, hold, gameWon };
}
```

This keeps `App` lean and focuses on UI only.

---

#### 6. **Minor Code Consistency**

You mix arrow + named functions. For readability and predictable hoisting, pick one style and stick with it across the file.
I’d use **function declarations** in top-level React components for clarity, and arrow functions for inline utilities.



## `Die.jsx`

✅ Correct:

* Clean, single-responsibility component.
* Inline dynamic styles are perfect for this simple color toggle.
* Added `aria-pressed` — 👏 that’s true accessible semantics for a toggle button.
* Readable prop naming (`isHeld`, `hold`, `value`) — no confusion.

### ⚠️ Improvements

#### 1. **Inline styles vs. CSS class**

Inline is fine for learning, but in a professional setting, dynamic classes are preferred for:

* Reusability
* Theme switching
* CSS transitions

Example:

```jsx
<button
  className={`die ${isHeld ? "held" : ""}`}
  onClick={hold}
  aria-pressed={isHeld}
>
  {value}
</button>
```

And in CSS:

```css
.die {
  background-color: white;
  transition: background-color 0.2s ease;
}
.die.held {
  background-color: #59E391;
}
```

---

#### 2. **Prop Destructuring**

Instead of `props.isHeld` and `props.hold`, you can destructure for clarity:

```js
export default function Die({ isHeld, hold, value }) { ... }
```

Cleaner and less repetitive.

---

## 🎨 `index.css`

✅ Great Foundation

* Good CSS grid setup for dice layout.
* Thoughtful `max-height` / `max-width` constraints — keeps it responsive.
* Nice use of `sr-only` class for accessibility.

---

### ⚠️ Room for Improvement

* **Color consistency:** You mix `#5035FF`, `#0B2434`, and `#59E391` — consider defining them as CSS variables for maintainability:

```css
:root {
  --color-primary: #5035FF;
  --color-bg: #0B2434;
  --color-accent: #59E391;
}
```

* **Missing focus styles:**
  Accessible buttons need visible focus states. Add something like:

```css
button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## ⚙️ `main.jsx`

✅ Great Setup

* Using `React.StrictMode` ✔️
* Clean, modern `createRoot` API ✔️
* Imports are minimal and organized ✔️

### 💡 Minor Suggestion

If you’re expanding this app, you could wrap `<App />` in a global context provider (like a theme or game context) — just to practice composition.

---

## 💬 Overall Roast Summary

| Area             | You Nailed It ✅                   | Needs Improvement 🔧                             |
| ---------------- | --------------------------------- | ------------------------------------------------ |
| State management | Lazy initialization, immutability | Could extract to custom hook                     |
| Accessibility    | `aria-live`, `aria-pressed`       | Add `role=status`, focus-visible styles          |
| Code structure   | Modular, clean                    | Deduplicate logic, consistent function style     |
| Styling          | Solid foundation                  | Move inline to class-based for scalability       |
| Performance      | Fine for 10 dice                  | Slight redundancy in `.every()` checks           |
| UX polish        | Focus + Confetti = 💯             | Could reset timer / add score for extra feedback |

---

## 🧠 Final Advice

You’re already coding like a junior dev with **mid-level discipline** — clarity, correctness, and user empathy.

If you keep building projects with this attention to:

* Accessibility (a11y)
* Code readability
* State management patterns

…you’ll hit “intermediate React dev” faster than you think.

The *next level* challenges I’d give you:

1. Add **roll count + timer**, persist best score with `localStorage`.
2. Extract game logic to a **custom hook** (`useTenziesGame`).
3. Add **unit tests** for `generateAllNewDice()` and `gameWon` logic (Jest or Vitest).
4. Add **animation** when dice roll using Framer Motion.

---

# 🧩 Future Improvements — React Tenzies

This document outlines planned enhancements, refactors, and stretch goals for the **React Tenzies** project.  
These notes serve as both a development roadmap and a personal reference for best practices to revisit later.

---
```md
## Code Quality and Architecture

- [ ] **Extract game logic into a custom hook** (`useTenziesGame`) to separate UI from state management.  
- [ ] **Simplify win condition logic** — compute `allHeld` and `allSameValue` once for clarity and performance.  
- [ ] **Abstract dice creation** — create a reusable `generateDie()` helper for generating consistent dice objects.  
- [ ] **Add unit tests** (Vitest or Jest) for dice generation, win detection, and roll behavior.  
- [ ] **Consider converting to TypeScript** for stronger type safety and clearer state modeling.  
- [ ] **Add inline documentation** (JSDoc or comments) for helper functions and key components.

> 💡 *Goal: Make logic reusable, predictable, and testable.*

---

## Accessibility (a11y)

- [ ] Add visible **focus outlines** (`:focus-visible`) for all interactive elements.  
- [ ] Add `role="status"` to live region announcing the game win.  
- [ ] Improve **keyboard navigation** — allow users to toggle dice using Enter/Space.  
- [ ] Review all buttons for **ARIA compliance** (`aria-pressed`, `aria-live`, etc.).  

> 💡 *Goal: Ensure the game is fully playable via keyboard and screen readers.*

---

## User Experience and UI

- [ ] Move inline styles to **CSS classes** (e.g., `.die.held`).  
- [ ] Add **roll animations** using CSS transitions or Framer Motion.  
- [ ] Implement **dark mode** and optional **sound effects** for dice rolls or wins.  
- [ ] Display **roll count** and **timer** for performance tracking.  
- [ ] Add **transitions** for new games or confetti effects for smoother feedback.  

> 💡 *Goal: Make the game feel polished, modern, and responsive.*

---

## State and Persistence

- [ ] Store **best scores** and **roll counts** in `localStorage`.  
- [ ] Persist **ongoing game state** between sessions.  
- [ ] Add a “Continue Previous Game” button when a saved state exists.  
- [ ] Implement **reset and clear storage** options.  

> 💡 *Goal: Support replayability and save user progress across sessions.*

---

## Performance and Optimization

- [ ] Optimize dice rendering — prevent unnecessary re-renders for held dice.  
- [ ] Memoize derived state (e.g., `gameWon`) if performance becomes an issue.  
- [ ] Use React DevTools to monitor renders and identify wasted re-renders.  

> 💡 *Goal: Keep updates efficient and predictable.*

---

## Visual and Thematic Enhancements

- [ ] Replace numeric values with **dice pips (⚀–⚅)** or SVG icons.  
- [ ] Add **leaderboards** or **timed challenge modes**.  
- [ ] Implement **animated background gradients** or celebratory visuals on win.  
- [ ] Experiment with **custom themes** (e.g., minimal, retro, casino).  

> 💡 *Goal: Enhance visual identity and replay value.*

---

## Documentation

- [ ] Keep this document up to date after each refactor.  
- [ ] Add a **CHANGELOG.md** once versioning starts.  
- [ ] Expand the **README “Learning Outcomes”** as skills and architecture evolve.  
- [ ] Add **code comments** summarizing tricky logic for future reference.

---

## Notes for Future Self

- Keep all dice state in the parent (`App`) to maintain a **single source of truth**.  
- Avoid **derived or duplicated state** in child components.  
- Use **refs** for DOM focus control instead of state toggling.  
- Always handle state immutably — React relies on new object references to detect changes.  
- Continue to prioritize **clarity and accessibility** over cleverness.

> ⚠️ *Remember: future maintainers (even future-you) will thank you for clean, predictable code.*

---

**Last Updated:** _(add date here when you edit)_
```