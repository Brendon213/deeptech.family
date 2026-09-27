"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";
import { getLocalizedPath } from "@/lib/localized-routes";

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
  const pathname = usePathname();
  const { language, languages, t } = useLanguage();

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
          <a className="login-button mobile-nav-cta" href="#entry" onClick={closeMenu}>
            {t.header.login}
          </a>
        </nav>

        <div className="header-actions">
          <div className="language-control">
            <button
              className="language-switch"
              type="button"
              aria-label={`${t.header.currentLanguage}: ${t.languageName}`}
              aria-expanded={languageOpen}
              aria-controls="language-options"
              onClick={() => setLanguageOpen((open) => !open)}
            >
              <Icon name="globe" size={16} />
              <span>{language.toUpperCase()}</span>
            </button>
            <nav
              id="language-options"
              className="language-menu"
              aria-label={t.header.languageMenuLabel}
              hidden={!languageOpen}
            >
              <ul className="language-menu-list">
                {languages.map((item) => (
                  <li key={item.code}>
                    <a
                      className={item.code === language ? "active" : ""}
                      aria-current={item.code === language ? "page" : undefined}
                      href={getLocalizedPath(pathname, item.code)}
                      onClick={(event) => {
                        if (window.location.hash) {
                          const destination = new URL(event.currentTarget.href);
                          destination.hash = window.location.hash;
                          event.currentTarget.href = destination.toString();
                        }
                        setLanguageOpen(false);
                        closeMenu();
                      }}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <a className="login-button" href="#entry" onClick={closeMenu}>
            {t.header.login}
          </a>

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
