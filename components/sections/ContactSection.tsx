"use client";

import { FormEvent, useState } from "react";
import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const channelValues = ["+79532822222", "@go_to_market_IT", "office@deeptech.family", null] as const;
const channelIcons = ["phone", "message-circle", "mail", "message-circle"] as const;

export default function ContactSection() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) {
      setStatus(t.contact.consentError);
      return;
    }
    setStatus(t.contact.unavailable);
  };

  return (
    <section className="section entry-section" id="entry">
      <div className="entry-glow" aria-hidden="true" />
      <div className="container entry-container">
        <div className="entry-box glass-panel">
          <div className="entry-heading">
            <span className="eyebrow-badge">{t.contact.badge}</span>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.lead}</p>
          </div>

          <form className="request-form" onSubmit={handleSubmit} noValidate>
            <div className="form-fields">
              <label>
                {t.contact.name}
                <input name="name" type="text" placeholder={t.contact.namePlaceholder} autoComplete="name" />
              </label>
              <label>
                {t.contact.contact}
                <input name="contact" type="text" placeholder={t.contact.contactPlaceholder} autoComplete="email" />
              </label>
            </div>
            <label>
              {t.contact.task}
              <textarea name="message" rows={3} placeholder={t.contact.taskPlaceholder} />
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
                {t.contact.consentPrefix} <a href="/privacy">{t.contact.privacy}</a>. {t.contact.consentSuffix}
              </span>
            </label>

            <button className="submit-placeholder" type="submit" disabled={!consent}>
              {t.contact.submit}
              <Icon name="arrow-down" size={18} />
            </button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>

          <div className="channel-grid" aria-label={t.contact.channelsAria}>
            {t.contact.labels.map((label, index) => (
              <button className="channel-placeholder" disabled key={label} type="button" title={t.contact.channelTitle}>
                <Icon name={channelIcons[index]} size={20} />
                <span>{label}</span>
                <small>{channelValues[index] ?? t.contact.unavailableChannel}</small>
              </button>
            ))}
          </div>
          <p className="entry-note">{t.contact.note}</p>
        </div>
      </div>
    </section>
  );
}
