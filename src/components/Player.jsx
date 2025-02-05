import { useState, useRef } from "react";

export default function Player() {
  const [enteredName, setEnterdName] = useState(null);
  const playerName = useRef();

  function handleOnClick() {
    setEnterdName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {enteredName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleOnClick}>Set Name</button>
      </p>
    </section>
  );
}
