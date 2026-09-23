"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <a className="brand footer-brand" href="#top" aria-label="Deep Tech">
            <span className="brand-mark">DT</span>
            <span className="brand-wordmark">DEEP <span>TECH</span></span>
          </a>
          <p className="footer-company">LLC Global trade and investment solutions</p>
        </div>

        <div className="footer-contacts">
          <a href="mailto:office@deeptech.family">office@deeptech.family</a>
          <a href="https://t.me/go_to_market_IT">@go_to_market_IT</a>
          <a href="tel:+79532822222">+7 953 282-22-22</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} DEEP TECH. {t.footer.rights}</span>
        <a href="/privacy">{t.footer.privacy}</a>
      </div>

      <div className="container footer-legal">{t.footer.legal}</div>
    </footer>
  );
}
