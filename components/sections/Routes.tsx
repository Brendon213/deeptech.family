"use client";

import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const icons = ["code-xml", "target", "briefcase", "trending-up", "handshake", "building-2"] as const;

export default function Routes() {
  const { t } = useLanguage();

  return (
    <section className="section roles-section" id="go-to-market">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.routes.eyebrow}</p>
          <h2>{t.routes.title}</h2>
          <p className="section-lead">{t.routes.lead}</p>
        </div>

        <div className="role-grid">
          {t.routes.items.map(([title, description, target], index) => (
            <a className="glass-panel role-card" href="#entry" key={title}>
              <div className="role-icon"><Icon name={icons[index]} size={22} /></div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{target} <Icon name="arrow-right" size={15} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
