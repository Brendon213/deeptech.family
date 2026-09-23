export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Международное технологическое партнёрство</p>
          <h1>Масштабирование Deep Tech продуктов на международные рынки</h1>
          <p className="lead">
            Экосистема для основателей, инвесторов, корпораций и технологических команд.
          </p>

          <div className="actions">
            <a className="button primary" href="#routes">Выбрать маршрут</a>
            <a className="button secondary" href="#contacts">Связаться</a>
          </div>
        </div>

        <div className="hero-card" aria-hidden="true">
          <span>DEEP TECH</span>
        </div>
      </div>
    </section>
  );
}
