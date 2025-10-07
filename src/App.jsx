/* ==========================================================
   - Core game logic for Tenzies
   - Handles dice state, roll, hold, and win condition
   ========================================================== */

import Die from "./components/Die"
import { nanoid } from "nanoid"
import { useState, useRef, useEffect } from "react"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'


export default function App() {

  /* ====== STATE ====== */
  const [dice, setDice] = useState(() => generateAllNewDice())
  const { width, height } = useWindowSize()
  const buttonRef = useRef(null)

  /* ====== WIN CHECK ====== */
  const gameWon =
    dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  /* ====== FOCUS ON WIN ====== */
  useEffect(() => {
    if (gameWon) buttonRef.current.focus()
  }, [gameWon])

  /* ====== GENERATE NEW DICE ====== */
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
  }

  /* ====== ROLL DICE ====== */
  function rollDice() {
    if (!gameWon) {
      setDice(oldDice =>
        oldDice.map(die =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      )
    } else {
      setDice(generateAllNewDice())
    }
  }

  /* ====== TOGGLE HOLD ====== */
  function hold(id) {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    )
  }

  /* ====== MAP DICE COMPONENTS ====== */
  const diceElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  /* ====== RENDER UI ====== */
  return (
    <main>
      {gameWon && <Confetti width={width} height={height} />}

      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button
        ref={buttonRef}
        className="roll-dice"
        onClick={rollDice}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}
