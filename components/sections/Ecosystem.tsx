"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const icons = ["target", "users", "graduation-cap", "landmark", "radio", "trending-up"] as const;

export default function Ecosystem() {
  const { t } = useLanguage();

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.ecosystem.eyebrow}</p>
          <h2>
            {t.ecosystem.titleLead}{" "}
            <span className="text-gradient">{t.ecosystem.titleAccent}</span>
          </h2>
          <p className="section-lead">{t.ecosystem.lead}</p>
        </div>

        <div className="module-grid">
          {t.ecosystem.modules.map(([title, category, description], index) => (
            <article className="glass-panel module-card" key={title}>
              <span className="icon-tile module-icon"><Icon name={icons[index]} size={22} /></span>
              <h3>{title}</h3>
              <p className="module-category">{category}</p>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
