"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const icons = ["timer", "trending-down", "circle-dashed", "gauge"] as const;
const metricIcons = ["building-2", "landmark", "cpu", "chart-column"] as const;

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

        <div className="hero-stats challenge-stats" aria-label={t.hero.statsLabel}>
          {t.hero.stats.map(([value, label], index) => (
            <div className="glass-panel stat-card" key={label}>
              <Icon name={metricIcons[index]} size={20} className="accent-icon" />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
