"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const icons = ["timer", "trending-down", "circle-dashed", "gauge"] as const;

export default function Challenges() {
  const { t } = useLanguage();

  return (
    <section className="section" id="requests">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.challenges.eyebrow}</p>
          <h2>
            {t.challenges.titleLead}
            <br />
            <span className="text-gradient">{t.challenges.titleAccent}</span>
          </h2>
          <p className="section-lead">{t.challenges.lead}</p>
        </div>

        <div className="challenge-grid">
          {t.challenges.items.map(([metric, title, description], index) => (
            <article className="glass-panel challenge-card" key={title}>
              <div className="card-topline">
                <span className="icon-tile"><Icon name={icons[index]} size={20} /></span>
                <span className="metric-pill">{metric}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
