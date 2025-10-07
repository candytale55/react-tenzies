/* ==========================================================
   - Represents a single die with number + held state
   - Click toggles "held" visual + logic
   ========================================================== */

export default function Die(props) {

  // Dynamic background color: green when held, white otherwise
  const styles = { backgroundColor: props.isHeld ? "#59E391" : "white" }

  return (
    <button
      style={styles}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  )
}
