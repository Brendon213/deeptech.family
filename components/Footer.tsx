"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { LEGAL_HUB_URL } from "@/lib/site-links";
import { getLocalizedHomePath } from "@/lib/localized-routes";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <a className="brand footer-brand" href={getLocalizedHomePath(language)} aria-label="Deep Tech">
            <span className="brand-mark">DT</span>
            <span className="brand-wordmark">DEEP <span>TECH</span></span>
          </a>
          <p className="footer-company">LLC Global trade and investment solutions</p>
        </div>

        <div className="footer-contacts">
          <a href="mailto:office@deeptech.family"><bdi dir="ltr">office@deeptech.family</bdi></a>
          <a href="https://t.me/go_to_market_IT">{t.contacts.telegramNames[0]}: <bdi dir="ltr">@go_to_market_IT</bdi></a>
          <a href="https://t.me/Matus_admin">{t.contacts.telegramNames[1]}: <bdi dir="ltr">@Matus_admin</bdi></a>
          <a href="https://wa.me/79532822222">{t.contact.labels[3]}: <bdi dir="ltr">+7 953 282-22-22</bdi></a>
          <a href="tel:+74951198081">{t.contact.labels[0]}: <bdi dir="ltr">+7 (495) 119-80-81</bdi></a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} DEEP TECH. {t.footer.rights}</span>
        <a href={LEGAL_HUB_URL}>{t.footer.privacy}</a>
      </div>

      <div className="container footer-legal">{t.footer.legal}</div>
    </footer>
  );
}
