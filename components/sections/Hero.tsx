"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

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
          {" "}
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

      </div>
    </section>
  );
}
