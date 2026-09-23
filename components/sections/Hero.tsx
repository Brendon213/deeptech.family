import Icon from "@/components/Icon";

const stats = [
  { value: "500+", label: "участников экосистемы", icon: "building-2" as const },
  { value: "15+", label: "международных рынков", icon: "landmark" as const },
  { value: "100+", label: "пилотных проектов", icon: "cpu" as const },
  { value: "$50M+", label: "TVL пайплайна", icon: "chart-column" as const },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="relative container hero-content">
        <div className="hero-eyebrow">
          <span className="pulse-dot" aria-hidden="true" />
          <span>Операционная система международного технологического партнёрства</span>
        </div>

        <h1>
          <span>Превращаем DEEP TECH</span>
          <br />
          <span className="text-gradient">продукты в масштабируемые системы</span>
        </h1>

        <p className="hero-sub">
          Инфраструктура взаимодействия корпораций, стартапов и институтов для пилотов,
          промышленного внедрения и выхода на международные рынки.
        </p>

        <div className="hero-cta">
          <a className="button primary" href="#entry">
            Начать проект
            <Icon name="arrow-right" size={17} />
          </a>
          <a className="button outline" href="#infrastructure">
            Изучить инфраструктуру
          </a>
        </div>

        <div className="hero-stats" aria-label="Ключевые показатели">
          {stats.map((stat) => (
            <div className="glass-panel stat-card" key={stat.label}>
              <Icon name={stat.icon} size={20} className="accent-icon" />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
