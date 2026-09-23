import Icon from "@/components/Icon";

const modules = [
  { icon: "target" as const, title: "Клуб фаундеров", category: "Стратегия и управление", description: "Формирование команд, принятие стратегических решений, упаковка проектов, выход к пилотам и промышленным заказчикам." },
  { icon: "users" as const, title: "Хаб талантов", category: "Кадры и компетенции", description: "Инженеры, исследователи, продакты, бизнес-разработчики. Матчинг по задачам с привязкой к KPI и вкладу." },
  { icon: "graduation-cap" as const, title: "Академия", category: "Обучение и артефакты", description: "Практико-ориентированное обучение: технические спецификации, PoC, пилоты, пакеты для заказчиков и инвесторов." },
  { icon: "landmark" as const, title: "Инвестиции", category: "Капитал по этапам", description: "Pre-seed, Seed, Series A, гранты и субсидии — привязаны к TRL/MRL и результатам пилотных внедрений." },
  { icon: "radio" as const, title: "Медиа", category: "Репутация и доверие", description: "Аналитика отрасли, кейсы внедрений, публичная витрина проектов, репутационные сигналы для корпораций и фондов." },
  { icon: "trending-up" as const, title: "Go-To-Market", category: "Пилоты и тиражирование", description: "Полный цикл: запрос заказчика → пилот → контракт → масштабирование → тиражирование в международной экосистеме." },
];

export default function Ecosystem() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">Модули экосистемы</p>
          <h2>6 модулей экосистемы</h2>
          <p className="section-lead">Полный цикл развития технологических проектов: от идеи до промышленного масштабирования</p>
        </div>

        <div className="module-grid">
          {modules.map((module) => (
            <article className="glass-panel module-card" key={module.title}>
              <span className="icon-tile module-icon"><Icon name={module.icon} size={22} /></span>
              <h3>{module.title}</h3>
              <p className="module-category">{module.category}</p>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
