import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ ref,onReset, targetTime, remainingTime }) {
  const dialog = useRef();
  const result = remainingTime <= 0 ? "lost" : "won";
  useImperativeHandle(ref, () => ({ open: () => dialog.current.showModal() }));
  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}!</h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with
        <strong> {(remainingTime / 1000).toFixed(2)} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
}
