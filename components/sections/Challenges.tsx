import NetworkBackground from "@/components/NetworkBackground";

const items = [
  "Схлопывание окна возможностей",
  "Долина смерти коммерциализации",
  "Бесконечный цикл пилотов",
  "Дефицит инженерной скорости",
];

export default function Challenges() {
  return (
    <section className="section challenges-section" id="requests">
      <NetworkBackground />

      <div className="container challenges-content">
        <p className="eyebrow challenges-eyebrow">Вызовы коммерциализации</p>
        <h2>
          Технологическое преимущество
          <span> перестало быть устойчивым</span>
        </h2>
        <p className="challenges-lead">
          Четыре ключевых барьера, которые разрушают инновации на пути от
          лаборатории к рынку
        </p>

        <div className="card-grid challenges-grid">
          {items.map((item) => (
            <article className="info-card challenge-card" key={item}>
              <h3>{item}</h3>
              <p>
                Описание блока будет перенесено из текущей версии сайта на этапе
                точного воспроизведения.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
