import Icon from "@/components/Icon";

const routes = [
  { icon: "code-xml" as const, title: "Специалистам", description: "Инженеры, разработчики, DevOps, ML-специалисты, маркетологи B2B", target: "Хаб талантов" },
  { icon: "target" as const, title: "Основателям стартапов", description: "От идеи и прототипа до серии A и промышленных контрактов", target: "Клуб фаундеров" },
  { icon: "briefcase" as const, title: "Корпорациям", description: "Поиск, due diligence и запуск международных решений под специфику бизнеса", target: "Витрина проектов" },
  { icon: "trending-up" as const, title: "Инвесторам", description: "Ранние сделки, доступ к пайплайну, due diligence и exit-стратегии", target: "Investors Circle" },
  { icon: "handshake" as const, title: "Разработчикам и стартапам", description: "Пилоты с корпорациями, технологические партнёрства, выход на международные рынки", target: "Go-To-Market" },
  { icon: "building-2" as const, title: "IT-компаниям", description: "Корпоративные запросы, совместные проекты, субподряд и интеграция", target: "Витрина заказчиков" },
];

export default function Routes() {
  return (
    <section className="section roles-section" id="go-to-market">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Выбор маршрута</p>
          <h2>Выберите интерфейс</h2>
          <p className="section-lead">Каждая роль — свой протокол взаимодействия с экосистемой</p>
        </div>

        <div className="role-grid">
          {routes.map((route) => (
            <a className="glass-panel role-card" href="#entry" key={route.title}>
              <div className="role-icon"><Icon name={route.icon} size={22} /></div>
              <div>
                <h3>{route.title}</h3>
                <p>{route.description}</p>
                <span>{route.target} <Icon name="arrow-right" size={15} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
