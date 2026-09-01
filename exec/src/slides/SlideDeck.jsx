import React, { useEffect, useState } from "react";
import { slides } from "./slideData";
import { SlideFrame } from "./components/SlideFrame";
import "./slides.css";

export default function SlideDeck() {
  const [current, setCurrent] = useState(0);

  const goTo = (next) => {
    setCurrent(Math.min(Math.max(next, 0), slides.length - 1));
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(current + 1);
      }

      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(current - 1);
      }

      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="deck">
      <SlideFrame slide={slide} index={current} total={slides.length} />

      <nav className="deck__controls" aria-label="Navegação dos slides">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Slide anterior"
        >
          ←
        </button>

        <div className="deck__progress" aria-hidden="true">
          <span style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === slides.length - 1}
          aria-label="Próximo slide"
        >
          →
        </button>
      </nav>
    </div>
  );
}
