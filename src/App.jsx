import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useState } from "react";



export default function App() {
  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    setDice(generateAllNewDice())
  }

  /* 
  * If the id of item is the same as the id passed to the function,
  * it will return all the properties of item, except isHeld that will be the opposite.
  * If the ids are not the same, it will return the item unchanged
  */

  function hold(id) {
    console.log(id)
    setDice(prevDice => prevDice.map((item) => {
      return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
    }));
  }

  const diceElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}