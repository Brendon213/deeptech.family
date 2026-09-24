"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const navItems = [
  { href: "#requests" },
  { href: "#projects" },
  { href: "#go-to-market" },
  { href: "#infrastructure" },
  { href: "#contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage, languages, t } = useLanguage();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Deep Tech" onClick={closeMenu}>
          <span className="brand-mark">DT</span>
          <span className="brand-wordmark">DEEP <span>TECH</span></span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label={t.header.navLabel}>
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {t.header.nav[index]}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-control">
            <button
              className="language-switch"
              type="button"
              aria-label={`${t.header.currentLanguage}: ${t.languageName}`}
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((open) => !open)}
            >
              <Icon name="globe" size={16} />
              <span>{language.toUpperCase()}</span>
            </button>
            {languageOpen && (
              <div className="language-menu" role="menu">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    className={item.code === language ? "active" : ""}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setLanguage(item.code);
                      setLanguageOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="login-button" type="button" disabled aria-disabled="true" title={t.header.login}>
            {t.header.login}
          </button>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? t.header.menuClose : t.header.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
