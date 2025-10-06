import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useState } from "react";



export default function App() {

  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        id: nanoid(), 
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      }))
  }

  function rollDice() {
    setDice(generateAllNewDice())
  }

  const diceElements = dice.map(dieObj => <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} />)

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}