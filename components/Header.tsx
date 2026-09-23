"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const navItems = [
  { label: "Витрина запросов", href: "#requests" },
  { label: "Витрина проектов", href: "#projects" },
  { label: "Go To Market", href: "#go-to-market" },
  { label: "Инфраструктура", href: "#infrastructure" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Deep Tech" onClick={closeMenu}>
          <span className="brand-mark">DT</span>
          <span className="brand-wordmark">DEEP <span>TECH</span></span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <button className="language-switch" type="button" aria-label="Текущий язык: русский">
            <Icon name="globe" size={16} />
            <span>RU</span>
          </button>
          <button className="login-button" type="button" disabled aria-disabled="true" title="Система пока не подключена">
            Войти в систему
          </button>
        </nav>

        <button className="mobile-language-switch language-switch" type="button" aria-label="Текущий язык: русский">
          <Icon name="globe" size={16} />
          <span>RU</span>
        </button>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>
    </header>
  );
}
