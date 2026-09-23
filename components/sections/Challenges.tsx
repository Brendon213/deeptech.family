import Icon from "@/components/Icon";

const items = [
  {
    icon: "timer" as const,
    metric: "Месяцы вместо лет",
    title: "Схлопывание окна возможностей",
    description: "Технологическое преимущество сократилось с лет до месяцев. Скорость выхода на рынок стала критическим фактором выживания.",
  },
  {
    icon: "trending-down" as const,
    metric: "90% провалов",
    title: "Долина смерти коммерциализации",
    description: "Большинство проектов останавливаются на переходе TRL 4–7. Между R&D и промышленностью не хватает инфраструктуры.",
  },
  {
    icon: "circle-dashed" as const,
    metric: "Пилоты без внедрения",
    title: "Бесконечный цикл пилотов",
    description: "Корпорации накапливают демонстраторы, которые не переходят в production. Нет стандартизированного протокола масштабирования.",
  },
  {
    icon: "gauge" as const,
    metric: "100× разрыв",
    title: "Дефицит инженерной скорости",
    description: "Vibe-coding и low-code породили лавину прототипов без рынков. Разрыв между созданием и масштабированием увеличивается.",
  },
];

export default function Challenges() {
  return (
    <section className="section" id="requests">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Вызовы коммерциализации</p>
          <h2>
            Технологическое преимущество
            <br />
            <span className="text-gradient">перестало быть устойчивым</span>
          </h2>
          <p className="section-lead">Четыре ключевых барьера, которые разрушают инновации на пути от лаборатории к рынку</p>
        </div>

        <div className="challenge-grid">
          {items.map((item) => (
            <article className="glass-panel challenge-card" key={item.title}>
              <div className="card-topline">
                <span className="icon-tile"><Icon name={item.icon} size={20} /></span>
                <span className="metric-pill">{item.metric}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
