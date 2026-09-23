"use client";

import { FormEvent, useState } from "react";
import Icon from "@/components/Icon";

const channels = [
  { label: "Телефон", value: "+79532822222", icon: "phone" as const },
  { label: "Telegram", value: "@go_to_market_IT", icon: "message-circle" as const },
  { label: "Email", value: "office@deeptech.family", icon: "mail" as const },
  { label: "WhatsApp", value: "Канал пока недоступен", icon: "message-circle" as const },
];

export default function ContactSection() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) {
      setStatus("Подтвердите согласие, чтобы подготовить заявку.");
      return;
    }
    setStatus("Приём заявок пока недоступен: каналы подключения ожидают настройки. Данные не отправлены.");
  };

  return (
    <section className="section entry-section" id="entry">
      <div className="entry-glow" aria-hidden="true" />
      <div className="container entry-container">
        <div className="entry-box glass-panel">
          <div className="entry-heading">
            <span className="eyebrow-badge">Доступ к экосистеме</span>
            <h2>Связаться с нами</h2>
            <p>Оставьте задачу — когда каналы будут подключены, мы добавим безопасную доставку заявки.</p>
          </div>

          <form className="request-form" onSubmit={handleSubmit} noValidate>
            <div className="form-fields">
              <label>
                Имя
                <input name="name" type="text" placeholder="Ваше имя" autoComplete="name" />
              </label>
              <label>
                Контакт
                <input name="contact" type="text" placeholder="Телефон или email" autoComplete="email" />
              </label>
            </div>
            <label>
              Коротко о задаче
              <textarea name="message" rows={3} placeholder="Что нужно запустить или масштабировать?" />
            </label>

            <label className="consent-row">
              <input
                checked={consent}
                id="consent"
                name="consent"
                type="checkbox"
                onChange={(event) => setConsent(event.target.checked)}
              />
              <span>
                Я согласен(а) на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» и <a href="/privacy">Политикой конфиденциальности</a>. Данные используются только для коммуникации.
              </span>
            </label>

            <button className="submit-placeholder" type="submit" disabled={!consent}>
              Отправить заявку
              <Icon name="arrow-down" size={18} />
            </button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>

          <div className="channel-grid" aria-label="Каналы связи пока недоступны">
            {channels.map((channel) => (
              <button className="channel-placeholder" disabled key={channel.label} type="button" title="Канал пока не подключён">
                <Icon name={channel.icon} size={20} />
                <span>{channel.label}</span>
                <small>{channel.value}</small>
              </button>
            ))}
          </div>
          <p className="entry-note">Каналы связи будут активированы после получения настроек. Реальные заявки сейчас не отправляются.</p>
        </div>
      </div>
    </section>
  );
}
