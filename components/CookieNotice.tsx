"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function CookieNotice() {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label={t.cookie.aria}>
      <h2>{t.cookie.title}</h2>
      <p>
        {t.cookie.text} <a href="/privacy">{t.cookie.privacy}</a>.
      </p>
      <div className="cookie-actions">
        <button className="button primary small" type="button" onClick={() => setVisible(false)}>
          {t.cookie.accept}
        </button>
        <button className="button secondary small" type="button" onClick={() => setVisible(false)}>
          {t.cookie.reject}
        </button>
      </div>
    </aside>
  );
}
