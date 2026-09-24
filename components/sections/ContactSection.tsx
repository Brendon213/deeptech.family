"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";
import { PRIVACY_POLICY_URL } from "@/lib/site-links";

const channelValues = [
  { href: "tel:+74951198081", value: "+7 (495) 119-80-81" },
  null,
  { href: "mailto:office@deeptech.family", value: "office@deeptech.family" },
  { href: "https://wa.me/79532822222", value: "+7 953 282-22-22" },
] as const;
const channelIcons = ["phone", "message-circle", "mail", "message-circle"] as const;

export default function ContactSection() {
  const [values, setValues] = useState({ name: "", contact: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { t } = useLanguage();
  const isFormComplete = Boolean(values.name.trim() && values.contact.trim() && values.message.trim());
  const canSubmit = consent && isFormComplete;

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setValues((current) => ({ ...current, [name]: value }));
    setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || status === "submitting") {
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, consent }),
      });

      if (!response.ok) {
        throw new Error("Contact form submission failed");
      }

      setValues({ name: "", contact: "", message: "" });
      setConsent(false);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const statusMessage =
    status === "submitting"
      ? t.contact.submitPending
      : status === "success"
        ? t.contact.submitSuccess
        : status === "error"
          ? t.contact.submitError
          : "";

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

          <form className="request-form" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
            <div className="form-fields">
              <label>
                {t.contact.name}
                <input
                  name="name"
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={updateField}
                  disabled={status === "submitting"}
                />
              </label>
              <label>
                {t.contact.contact}
                <input
                  name="contact"
                  type="text"
                  placeholder={t.contact.contactPlaceholder}
                  autoComplete="email"
                  required
                  value={values.contact}
                  onChange={updateField}
                  disabled={status === "submitting"}
                />
              </label>
            </div>
            <label>
              {t.contact.task}
              <textarea
                name="message"
                rows={3}
                placeholder={t.contact.taskPlaceholder}
                required
                value={values.message}
                onChange={updateField}
                disabled={status === "submitting"}
              />
            </label>

            <label className="consent-row">
              <input
                checked={consent}
                id="consent"
                name="consent"
                type="checkbox"
                onChange={(event) => {
                  setConsent(event.target.checked);
                  setStatus("idle");
                }}
                disabled={status === "submitting"}
                required
              />
              <span>
                {t.contact.consentPrefix} <a href={PRIVACY_POLICY_URL}>{t.contact.privacy}</a>. {t.contact.consentSuffix}
              </span>
            </label>

            <button className="submit-placeholder" type="submit" disabled={!canSubmit || status === "submitting"}>
              {t.contact.submit}
              <Icon name="arrow-down" size={18} />
            </button>
            {status !== "idle" && (
              <p className="form-status" role="status" aria-live="polite">
                {statusMessage}
              </p>
            )}
          </form>

          <div className="channel-grid" role="group" aria-label={t.contact.channelsAria}>
            {t.contact.labels.map((label, index) => {
              const channel = channelValues[index];

              return (
                <div className="channel-card" key={label}>
                  <Icon name={channelIcons[index]} size={20} />
                  <span>{label}</span>
                  {channel ? (
                    <a className="channel-value" href={channel.href}>
                      <bdi dir="ltr">{channel.value}</bdi>
                    </a>
                  ) : (
                    <div className="channel-values">
                      {["https://t.me/go_to_market_IT", "https://t.me/Matus_admin"].map((href, telegramIndex) => (
                        <a href={href} key={href}>
                          {t.contacts.telegramNames[telegramIndex]}: <bdi dir="ltr">{telegramIndex === 0 ? "@go_to_market_IT" : "@Matus_admin"}</bdi>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="entry-note">{t.contact.note}</p>
        </div>
      </div>
    </section>
  );
}
