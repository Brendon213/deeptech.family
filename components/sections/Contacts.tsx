"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const icons = ["mail", "message-circle", "phone", "map-pin"] as const;
const values = ["office@deeptech.family", "@go_to_market_IT", "+79532822222"] as const;

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
              <p className="contact-value">{index < 3 ? values[index] : t.contacts.partnership}</p>
              <p>{t.contacts.notes[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
