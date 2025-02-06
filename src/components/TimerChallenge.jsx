import {useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ targetTime, title }) {
  const remainingTime = useRef(targetTime * 1000);

  // ref to hold the interval
  const intervalId = useRef();
  // ref to open up dialog after game ends
  const modal = useRef();

  //keep track of game state so that the UI can re render appropriately
  const [timerStarted, setTimerStarted] = useState(false);

  function handleStart() {
    // every 10ms, deduct remaining time by 10ms effectively giving the remaining time
    intervalId.current = setInterval(() => {
      remainingTime.current -= 10;
      if (remainingTime.current <= 0){
        handleStop();
      }
    }, 10);
    setTimerStarted(true);
  }

  function handleStop() {
    clearInterval(intervalId.current);
    modal.current.open();
    setTimerStarted(false);
  }

  function onFormClose(){
    remainingTime.current = targetTime*1000;
  }

  return (
    <>
      <ResultModal
        onReset = {onFormClose}
        ref={modal}
        targetTime={targetTime}
        remainingTime={remainingTime.current}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={!timerStarted ? handleStart : handleStop}>
            {timerStarted ? "Stop " : "Start "}
            Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
