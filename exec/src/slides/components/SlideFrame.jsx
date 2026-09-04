import { SlideTimer } from "./SlideTimer";

const accentMap = {
  neutral: "#111827",
  sprint1: "#d97706",
  sprint2: "#7c3aed",
  sprint3: "#dc2626",
  final: "#0f766e",
};

export function SlideFrame({ slide, index, total }) {
  const accent = accentMap[slide.accent] ?? accentMap.neutral;
  const hasTimer = Number.isFinite(slide.durationSeconds) && slide.durationSeconds > 0;
  const hasPlaceholder = Boolean(slide.placeholder || slide.image);

  return (
    <section
      className={`slide slide--${slide.type}`}
      style={{ "--accent": accent }}
      aria-label={`Slide ${index + 1} de ${total}`}
    >
      <header className="slide__header">
        <span className="slide__eyebrow">{slide.eyebrow}</span>
        <span className="slide__counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      {hasTimer && (
        <SlideTimer
          key={slide.id}
          slideId={slide.id}
          durationSeconds={slide.durationSeconds}
        />
      )}

      <main className="slide__content">
        <h1>{slide.title}</h1>

        {slide.subtitle && <p className="slide__subtitle">{slide.subtitle}</p>}
        {slide.body && <p className="slide__body">{slide.body}</p>}

        {slide.items && (
          <div className="slide__items">
            {slide.items.map((item) => (
              <div className="slide__item" key={item}>
                <span className="slide__bullet" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {slide.objective && (
          <div className="slide__panel">
            <span className="slide__label">Objetivo</span>
            <p>{slide.objective}</p>
          </div>
        )}

        {slide.deliverables && (
          <div className="slide__deliverables">
            <span className="slide__label">Entregáveis / ações</span>
            <div className="slide__deliverableGrid">
              {slide.deliverables.map((item) => (
                <div className="slide__deliverable" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {hasPlaceholder && (
          <div
            className={`slide__placeholder${
              slide.image ? " slide__placeholder--image" : ""
            }`}
          >
            {slide.image ? (
              <img src={slide.image} alt={slide.imageAlt ?? slide.placeholder ?? ""} />
            ) : (
              <span>{slide.placeholder}</span>
            )}
          </div>
        )}

        {slide.callout && (
          <blockquote className="slide__callout">{slide.callout}</blockquote>
        )}
      </main>

      {slide.footer && <footer className="slide__footer">{slide.footer}</footer>}
    </section>
  );
}
