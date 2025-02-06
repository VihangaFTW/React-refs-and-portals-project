import { useState, useRef } from "react";

import ResultModal from "./ResultModal";

export default function TimerChallenge({ targetTime, title }) {
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const timer = useRef();
  const modal = useRef();

  function handleStart() {
    // time should be in milliseconds for this function
    // setTimeout expects a function as first argument
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      modal.current.open();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }

  return (
    <>
      <ResultModal ref={modal} result="lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={!timerStarted ? handleStart : handleStop}>
            {timerStarted && !timerExpired ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted && !timerExpired ? "active" : undefined}>
          {timerStarted && !timerExpired ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
