const routes = [
  "Специалистам",
  "Основателям стартапов",
  "Корпорациям",
  "Инвесторам",
  "Разработчикам и стартапам",
  "IT-компаниям",
];

export default function Routes() {
  return (
    <section className="section section-dark" id="routes">
      <div className="container">
        <p className="eyebrow">Маршруты</p>
        <h2>Выберите направление</h2>

        <div className="route-list">
          {routes.map((route) => (
            <a href="#contacts" key={route}>{route}<span>→</span></a>
          ))}
        </div>
      </div>
    </section>
  );
}
