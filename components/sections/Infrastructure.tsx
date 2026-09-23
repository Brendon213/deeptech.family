"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

export default function Infrastructure() {
  const [active, setActive] = useState(0);
  const { t } = useLanguage();
  const [title, subtitle, cards] = t.infrastructure.slides[active];

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + t.infrastructure.slides.length) % t.infrastructure.slides.length);
  };

  return (
    <section className="section infrastructure-section" id="infrastructure">
      <div className="container">
        <div className="section-heading centered infrastructure-heading">
          <p className="eyebrow">{t.infrastructure.eyebrow}</p>
          <h2>{t.infrastructure.titleLead} <span className="text-gradient">{t.infrastructure.titleAccent}</span></h2>
          <p className="section-lead">{t.infrastructure.lead}</p>
        </div>

        <div className="infrastructure-body">
          <div className="infrastructure-toolbar">
            <div>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
            <div className="carousel-controls">
              <button type="button" aria-label={t.infrastructure.previous} onClick={() => move(-1)}>
                <Icon name="chevron-left" size={17} />
              </button>
              <div className="carousel-dots" aria-label={t.infrastructure.dots}>
                {t.infrastructure.slides.map((item, index) => (
                  <button
                    type="button"
                    key={item[0]}
                    aria-label={`${t.infrastructure.openBlock}: ${item[0]}`}
                    aria-current={index === active ? "true" : undefined}
                    className={index === active ? "active" : ""}
                    onClick={() => setActive(index)}
                  />
                ))}
              </div>
              <button type="button" aria-label={t.infrastructure.next} onClick={() => move(1)}>
                <Icon name="chevron-right" size={17} />
              </button>
            </div>
          </div>

          <div className="infrastructure-grid" key={title}>
            {cards.map(([cardTitle, description]) => (
              <article className="glass-panel infrastructure-card" key={cardTitle}>
                <h4>{cardTitle}</h4>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <a className="button primary infrastructure-cta" href="#entry">
            {t.infrastructure.getAccess}
            <Icon name="arrow-right" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
