const navItems = [
  { label: "Витрина запросов", href: "#requests" },
  { label: "Витрина проектов", href: "#projects" },
  { label: "Go To Market", href: "#go-to-market" },
  { label: "Инфраструктура", href: "#infrastructure" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="DeepTech Family">
          DEEP TECH
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button className="language-switch" type="button" aria-label="Сменить язык">
          RU
        </button>
      </div>
    </header>
  );
}
