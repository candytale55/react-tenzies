# 🎲 React Tenzies

## Description

A self-contained React mini-game built to practice React fundamentals, state management, accessibility, and responsive design — packaged into a clean, production-ready example app.

The goal is simple: roll until all dice show the same number. Click a die to **hold** its value between rolls and continue until every die matches.

---

## Technologies

* **React (Vite)** – component-based architecture, fast HMR
* **JavaScript (ES6+)** – core logic and interactivity
* **CSS3 (Grid & Flexbox)** – responsive, mobile-first layout
* **ESLint (Vite default)** – linting and code quality rules

---

## Libraries & Tools

* **nanoid** – generates unique IDs for each die
* **react-confetti** – adds celebratory confetti when the game is won
* **react-use** – provides window size detection for responsive confetti behavior

---

## Live Demo

Check out the live demo 👉 [React Tenzies](https://ct55-react-tenzies.netlify.app/) hosted on Netlify.

---

## Status

*Completed*: **October 2025**

---

## Screenshots

| Game Start                         | Selected Dice                         | Game Won                         |
| ---------------------------------- | ------------------------------------- | -------------------------------- |
| ![Game Start](/src/assets/shots/scsh-01.png) | ![Selected Dice](./src/assets/shots/scsh-02.png) | ![Game Won](./src/assets/shots/scsh-03.png) |

---

## Project Structure

```
tenzies-game
│── index.html
└── src/
    │── main.jsx
    │── index.css
    │── App.jsx
    │
    ├── components/
    │   └── Die.jsx
    │
    └── assets/
        ├── docs/
        │   ├── future-todos.md
        │   └── pseudocode.md
        │
        └── shots/
            ├── scsh-01.png
            ├── scsh-02.png
            └── scsh-03.png
```

---

## Useful Setup Information

This project was bootstrapped with **Vite + React**.
It includes a minimal configuration with Hot Module Replacement (HMR) and ESLint.


## Future Improvements (TODOs)

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

---

## References and Useful Links

* From Scrimba course [*Learn React*](https://scrimba.com/learn-react-c0e), Capstone Project #1 – *Tenzies*
* Related YouTube tutorial: [Learn React – Tenzies Game](https://youtu.be/x4rFhThSX04?si=wJI7yJ1cDVi8D7O5)
* Libraries:

  * [nanoid](https://www.npmjs.com/package/nanoid) — unique IDs
  * [react-confetti](https://github.com/alampros/react-confetti#readme) — confetti animation
  * [react-use](https://github.com/streamich/react-use) — hooks utilities

