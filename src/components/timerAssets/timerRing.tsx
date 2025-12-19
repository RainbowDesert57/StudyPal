import { useState, useEffect } from "react";
import './timerRing.css'

// ------------------------------
// Format seconds → mm:ss
// ------------------------------
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ------------------------------
// SVG Ring
// ------------------------------
function TimerRing({ progress }: { progress: number }) {
  const r = 45;
  const c = 2 * Math.PI * r;

  return (
    <svg width="140" height="140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#ddd" strokeWidth="5" />
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeDasharray={c}
        strokeLinecap="round"
        strokeDashoffset={c * (1 - progress)}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 0.2s linear",
        }}
      />
    </svg>
  );
}

// ------------------------------
// MAIN TIMER
// ------------------------------
export default function Timer() {

  // Default = 25 min
  const DEFAULT = 25 * 60;

  const [duration, setDuration] = useState(DEFAULT);
  const [timeLeft, setTimeLeft] = useState(DEFAULT);

  const [isRunning, setIsRunning] = useState(false);

  // Was the last session a work session?
  const [lastWorkDuration, setLastWorkDuration] = useState(DEFAULT);

  // Picker UI
  const [pickerOpen, setPickerOpen] = useState(false);

  // Picker inputs
  const [pickMin, setPickMin] = useState(25);
  const [pickSec, setPickSec] = useState(0);

  // ------------------------------
  // TICKING
  // ------------------------------
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const id = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  // ------------------------------
  // WHEN TIMER ENDS
  // ------------------------------
  useEffect(() => {
    if (timeLeft !== 0) return;

    setIsRunning(false);

    // Auto set next timer = 1/5 of previous work
    const next = Math.floor(lastWorkDuration / 5);

    if (next > 0) {
      setDuration(next);
      setTimeLeft(next);
    }

  }, [timeLeft]);

  // ------------------------------
  // APPLY PICKED TIME
  // ------------------------------
  function applyPickedTime() {
    const seconds = pickMin * 60 + pickSec;
    if (seconds <= 0) return;

    setDuration(seconds);
    setTimeLeft(seconds);
    setLastWorkDuration(seconds);

    setIsRunning(false);
    setPickerOpen(false);
  }

  // ------------------------------
  // DERIVED
  // ------------------------------
  const progress = timeLeft / duration;

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div className="timer">

      <div className="ringWrapper">
        <TimerRing progress={progress} />

        <div className="ringContent">

          {/* Countdown */}
          {!pickerOpen && (
            <>
              <div className="time">{formatTime(timeLeft)}</div>
              <button
                className="setTimeBtn"
                onClick={() => setPickerOpen(true)}
                disabled={isRunning}
              >
                Set
              </button>
            </>
          )}

          {/* Time Picker */}
          {pickerOpen && (
            <div className="picker">
              <input
                type="number"
                min={0}
                value={pickMin}
                onChange={e => setPickMin(+e.target.value)}
              />
              <span>:</span>
              <input
                type="number"
                min={0}
                max={59}
                value={pickSec}
                onChange={e => setPickSec(+e.target.value)}
              />

              <button onClick={applyPickedTime}>OK</button>
            </div>
          )}

        </div>
      </div>

      {/* Play / Pause */}
      <button 
        className="playPauseBtn"
        onClick={() => setIsRunning(p => !p)}>
        {isRunning ? "Pause" : "Play"}
      </button>

    </div>
  );
}
