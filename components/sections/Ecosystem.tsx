const modules = [
  "Клуб фаундеров",
  "Хаб талантов",
  "Академия",
  "Инвестиции",
  "Медиа",
  "Go-To-Market",
];

export default function Ecosystem() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <p className="eyebrow">Экосистема</p>
        <h2>6 модулей для развития технологических проектов</h2>

        <div className="card-grid">
          {modules.map((module) => (
            <article className="info-card" key={module}>
              <h3>{module}</h3>
              <p>Контент блока будет перенесён из текущей версии сайта.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
