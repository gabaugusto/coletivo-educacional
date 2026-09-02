import React, { useEffect, useMemo, useState } from "react";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function SlideTimer({ durationSeconds, slideId }) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setRemaining(durationSeconds);
    setRunning(true);
  }, [durationSeconds, slideId]);

  useEffect(() => {
    if (!running || remaining <= 0) return undefined;

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, remaining]);

  const state = useMemo(() => {
    if (remaining === 0) return "ended";

    const criticalAt = Math.min(60, Math.max(5, Math.round(durationSeconds * 0.1)));
    const warningAt = Math.min(300, Math.max(15, Math.round(durationSeconds * 0.25)));

    if (remaining <= criticalAt) return "critical";
    if (remaining <= warningAt) return "warning";
    return "normal";
  }, [remaining, durationSeconds]);

  const reset = () => {
    setRemaining(durationSeconds);
    setRunning(true);
  };

  return (
    <div className={`slideTimer slideTimer--${state}`} aria-live="polite">
      <div className="slideTimer__main">
        <span className="slideTimer__label">
          {remaining === 0 ? "Tempo encerrado" : "Tempo restante"}
        </span>
        <strong className="slideTimer__time">{formatTime(remaining)}</strong>
      </div>

      <div className="slideTimer__actions">
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          disabled={remaining === 0}
          aria-label={running ? "Pausar cronômetro" : "Continuar cronômetro"}
        >
          {running ? "Pausar" : "Continuar"}
        </button>
        <button type="button" onClick={reset} aria-label="Reiniciar cronômetro">
          Reiniciar
        </button>
      </div>
    </div>
  );
}
