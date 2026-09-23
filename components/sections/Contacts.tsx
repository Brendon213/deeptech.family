import Icon from "@/components/Icon";

const contacts = [
  { icon: "mail" as const, label: "Email", value: "office@deeptech.family", note: "Ответ в течение 24 ч" },
  { icon: "message-circle" as const, label: "Telegram", value: "@go_to_market_IT", note: "Оперативный канал" },
  { icon: "phone" as const, label: "Телефон", value: "+79532822222", note: "Консультация специалиста" },
  { icon: "map-pin" as const, label: "Международное сотрудничество", value: "Технологические партнёрства", note: "Партнёрства и масштабирование" },
];

export default function Contacts() {
  return (
    <section className="section contacts-section" id="contacts">
      <div className="contacts-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-heading centered">
          <h2>Контакты</h2>
          <p className="section-lead">Операционная система международного технологического партнёрства — инфраструктура для пилотов, рынков и промышленного масштабирования DEEP TECH решений.</p>
        </div>

        <div className="contacts-grid">
          {contacts.map((contact) => (
            <div className="glass-panel contact-card" key={contact.label}>
              <Icon name={contact.icon} size={28} className="accent-icon" />
              <h3>{contact.label}</h3>
              <p className="contact-value">{contact.value}</p>
              <p>{contact.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
