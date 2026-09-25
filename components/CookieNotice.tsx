"use client";

import { useState } from "react";
import {
  COOKIE_CHOICE_COOKIE,
  createPreferenceCookie,
  type CookieChoice,
} from "@/lib/site-preferences";
import { useLanguage } from "@/components/LanguageProvider";
import { COOKIE_POLICY_URL } from "@/lib/site-links";

export default function CookieNotice({ initialChoice }: { initialChoice: CookieChoice | null }) {
  const [choice, setChoice] = useState<CookieChoice | null>(initialChoice);
  const { t } = useLanguage();

  const saveChoice = (nextChoice: CookieChoice) => {
    const secure = window.location.protocol === "https:";
    document.cookie = createPreferenceCookie(COOKIE_CHOICE_COOKIE, nextChoice, secure);
    setChoice(nextChoice);
  };

  if (choice) return null;

  return (
    <aside className="cookie-notice" aria-label={t.cookie.aria}>
      <h2>{t.cookie.title}</h2>
      <p>
        {t.cookie.text} <a href={COOKIE_POLICY_URL}>{t.cookie.policy}</a>.
      </p>
      <div className="cookie-actions">
        <button className="button primary small" type="button" onClick={() => saveChoice("accepted")}>
          {t.cookie.accept}
        </button>
        <button className="button secondary small" type="button" onClick={() => saveChoice("rejected")}>
          {t.cookie.reject}
        </button>
      </div>
    </aside>
  );
}
