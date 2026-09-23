const items = [
  "Deep Tech Academy",
  "Deep Tech Advisors",
  "Deep Tech Accelerator",
  "Deep Tech Events",
];

export default function Infrastructure() {
  return (
    <section className="section" id="infrastructure">
      <div className="container">
        <p className="eyebrow">Инфраструктура</p>
        <h2>Инструменты для роста Deep Tech проектов</h2>

        <div className="card-grid two-column">
          {items.map((item) => (
            <article className="info-card" key={item}>
              <h3>{item}</h3>
              <p>Каркас секции подготовлен для последующего точного переноса контента и визуала.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
