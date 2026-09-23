const items = [
  "Схлопывание окна возможностей",
  "Долина смерти коммерциализации",
  "Бесконечный цикл пилотов",
  "Дефицит инженерной скорости",
];

export default function Challenges() {
  return (
    <section className="section" id="requests">
      <div className="container">
        <p className="eyebrow">Проблема</p>
        <h2>Почему сильные технологии не доходят до масштабирования</h2>

        <div className="card-grid">
          {items.map((item) => (
            <article className="info-card" key={item}>
              <h3>{item}</h3>
              <p>Описание блока будет перенесено из текущей версии сайта на этапе точного воспроизведения.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
