"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <main className="container">
      <article>
        <h1>{t.privacyPage.title}</h1>
        <p>{t.privacyPage.pending}</p>
        <p>{t.privacyPage.notice}</p>
        <p>
          <a href="/">{t.privacyPage.home}</a>
        </p>
      </article>
    </main>
  );
}
