import { useState, useRef } from "react";

export default function TimerChallenge({ targetTime, title }) {
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const timer = useRef();

  function handleStart() {
    // time should be in milliseconds for this function
    timer.current = setTimeout(() => setTimerExpired(true), targetTime * 1000);
    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
		setTimerStarted(false);
		

  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      {timerExpired && <p>You lost!</p>}
      <p>
        <button onClick={!timerStarted ? handleStart : handleStop}>
          {timerStarted && !timerExpired ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted && !timerExpired ? "active" : undefined}>
        {timerStarted && !timerExpired ? "Time is running" : "Timer inactive"}
      </p>
    </section>
  );
}
