"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const statIcons = ["building-2", "landmark", "cpu", "chart-column"] as const;

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="top">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="relative container hero-content">
        <div className="hero-eyebrow">
          <span className="pulse-dot" aria-hidden="true" />
          <span>{t.hero.eyebrow}</span>
        </div>

        <h1>
          <span>{t.hero.titleLead}</span>
          <br />
          <span className="text-gradient">{t.hero.titleAccent}</span>
        </h1>

        <p className="hero-sub">{t.hero.sub}</p>

        <div className="hero-cta">
          <a className="button primary" href="#entry">
            {t.hero.start}
            <Icon name="arrow-right" size={17} />
          </a>
          <a className="button outline" href="#infrastructure">
            {t.hero.infrastructure}
          </a>
        </div>

        <div className="hero-stats" aria-label={t.hero.statsLabel}>
          {t.hero.stats.map(([value, label], index) => (
            <div className="glass-panel stat-card" key={label}>
              <Icon name={statIcons[index]} size={20} className="accent-icon" />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
