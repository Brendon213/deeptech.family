"use client";

import { useEffect, useRef } from "react";
import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const HERO_SCROLL_DISTANCE = 400;
const HERO_MAX_LIFT_PX = 15;
const HERO_START_OPACITY = 0.964;

export default function Hero() {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;

    const updateTitleMotion = () => {
      animationFrame = null;

      if (reducedMotion.matches) {
        title.style.setProperty("--hero-title-lift", "0px");
        title.style.setProperty("--hero-title-opacity", "1");
        return;
      }

      const progress = Math.min(Math.max(window.scrollY / HERO_SCROLL_DISTANCE, 0), 1);
      const lift = -HERO_MAX_LIFT_PX * progress;
      const opacity = HERO_START_OPACITY + (1 - HERO_START_OPACITY) * progress;

      title.style.setProperty("--hero-title-lift", `${lift}px`);
      title.style.setProperty("--hero-title-opacity", `${opacity}`);
    };

    const scheduleTitleMotion = () => {
      if (reducedMotion.matches || animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateTitleMotion);
    };

    const handleMotionPreferenceChange = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      updateTitleMotion();
    };

    updateTitleMotion();
    window.addEventListener("scroll", scheduleTitleMotion, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.removeEventListener("scroll", scheduleTitleMotion);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);

      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="relative container hero-content">
        <div className="hero-eyebrow">
          <span className="pulse-dot" aria-hidden="true" />
          <span>{t.hero.eyebrow}</span>
        </div>

        <h1 className="hero-title-motion" ref={titleRef}>
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
