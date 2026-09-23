export default function ContactSection() {
  return (
    <section className="section section-accent">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Связаться</p>
          <h2>Обсудим задачу и подберём подходящий маршрут</h2>
          <p className="muted">
            Форма сейчас является каркасом. Логика существующей формы будет перенесена отдельным шагом.
          </p>
        </div>

        <form className="contact-form">
          <label>
            Имя
            <input type="text" name="name" placeholder="Ваше имя" />
          </label>
          <label>
            Контакт
            <input type="text" name="contact" placeholder="Телефон или email" />
          </label>
          <label>
            Сообщение
            <textarea name="message" rows={4} placeholder="Кратко опишите задачу" />
          </label>
          <label className="checkbox-row">
            <input type="checkbox" name="privacy" />
            <span>Согласен на обработку персональных данных</span>
          </label>
          <button className="button primary" type="submit">Отправить</button>
        </form>
      </div>
    </section>
  );
}
