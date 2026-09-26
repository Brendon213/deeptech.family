"use client";

import Script from "next/script";
import { useState } from "react";
import {
  COOKIE_CHOICE_COOKIE,
  createPreferenceCookie,
  type CookieChoice,
} from "@/lib/site-preferences";
import { useLanguage } from "@/components/LanguageProvider";
import { COOKIE_POLICY_URL } from "@/lib/site-links";

const YANDEX_METRIKA_ID = 113082047;
const GOOGLE_ANALYTICS_ID = "G-SYYL09TB3B";

const YANDEX_METRIKA_SNIPPET = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}", "ym");

ym(${YANDEX_METRIKA_ID}, "init", {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true
});
`;

const GOOGLE_ANALYTICS_SNIPPET = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "${GOOGLE_ANALYTICS_ID}");
`;

export default function CookieNotice({ initialChoice }: { initialChoice: CookieChoice | null }) {
  const [choice, setChoice] = useState<CookieChoice | null>(initialChoice);
  const { t } = useLanguage();

  const saveChoice = (nextChoice: CookieChoice) => {
    const secure = window.location.protocol === "https:";
    document.cookie = createPreferenceCookie(COOKIE_CHOICE_COOKIE, nextChoice, secure);
    setChoice(nextChoice);
  };

  if (choice === "accepted") {
    return (
      <>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {YANDEX_METRIKA_SNIPPET}
        </Script>
        <Script
          id="google-analytics-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {GOOGLE_ANALYTICS_SNIPPET}
        </Script>
      </>
    );
  }

  if (choice === "rejected") return null;

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
