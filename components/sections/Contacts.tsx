"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const icons = ["mail", "message-circle", "phone", "map-pin"] as const;

export default function Contacts() {
  const { t } = useLanguage();

  return (
    <section className="section contacts-section" id="contacts">
      <div className="contacts-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-heading centered">
          <h2>{t.contacts.title}</h2>
          <p className="section-lead">{t.contacts.lead}</p>
        </div>

        <div className="contacts-grid">
          {t.contacts.labels.map((label, index) => (
            <div className="glass-panel contact-card" key={label}>
              <Icon name={icons[index]} size={28} className="accent-icon" />
              <h3>{label}</h3>
              {index === 0 ? (
                <a className="contact-value" href="mailto:office@deeptech.family">
                  <bdi dir="ltr">office@deeptech.family</bdi>
                </a>
              ) : index === 1 ? (
                <div className="contact-value contact-value-list">
                  <a href="https://t.me/go_to_market_IT">
                    {t.contacts.telegramNames[0]}: <bdi dir="ltr">@go_to_market_IT</bdi>
                  </a>
                  <a href="https://t.me/Matus_admin">
                    {t.contacts.telegramNames[1]}: <bdi dir="ltr">@Matus_admin</bdi>
                  </a>
                </div>
              ) : index === 2 ? (
                <a className="contact-value" href="tel:+74951198081">
                  <bdi dir="ltr">+7 (495) 119-80-81</bdi>
                </a>
              ) : (
                <div className="contact-value">{t.contacts.partnership}</div>
              )}
              <p>{t.contacts.notes[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
