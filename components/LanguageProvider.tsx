"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "ru" | "en";

const translations = {
  ru: {
    languageName: "Русский",
    header: {
      nav: ["Витрина запросов", "Витрина проектов", "Go To Market", "Инфраструктура", "Контакты"],
      login: "Войти в систему",
      menuOpen: "Открыть меню",
      menuClose: "Закрыть меню",
      currentLanguage: "Текущий язык",
    },
    hero: {
      eyebrow: "Операционная система международного технологического партнёрства",
      titleLead: "Превращаем DEEP TECH",
      titleAccent: "продукты в масштабируемые системы",
      sub: "Инфраструктура взаимодействия корпораций, стартапов и институтов для пилотов, промышленного внедрения и выхода на международные рынки.",
      start: "Начать проект",
      infrastructure: "Изучить инфраструктуру",
      statsLabel: "Ключевые показатели",
      stats: [
        ["500+", "участников экосистемы"],
        ["15+", "международных рынков"],
        ["100+", "пилотных проектов"],
        ["$50M+", "TVL пайплайна"],
      ],
    },
    challenges: {
      eyebrow: "Вызовы коммерциализации",
      titleLead: "Технологическое преимущество",
      titleAccent: "перестало быть устойчивым",
      lead: "Четыре ключевых барьера, которые разрушают инновации на пути от лаборатории к рынку",
      items: [
        ["Месяцы вместо лет", "Схлопывание окна возможностей", "Технологическое преимущество сократилось с лет до месяцев. Скорость выхода на рынок стала критическим фактором выживания."],
        ["90% провалов", "Долина смерти коммерциализации", "Большинство проектов останавливаются на переходе TRL 4–7. Между R&D и промышленностью не хватает инфраструктуры."],
        ["Пилоты без внедрения", "Бесконечный цикл пилотов", "Корпорации накапливают демонстраторы, которые не переходят в production. Нет стандартизированного протокола масштабирования."],
        ["100× разрыв", "Дефицит инженерной скорости", "Vibe-coding и low-code породили лавину прототипов без рынков. Разрыв между созданием и масштабированием увеличивается."],
      ],
    },
    contact: {
      badge: "Доступ к экосистеме",
      title: "Связаться с нами",
      lead: "Оставьте задачу — когда каналы будут подключены, мы добавим безопасную доставку заявки.",
      name: "Имя",
      namePlaceholder: "Ваше имя",
      contact: "Контакт",
      contactPlaceholder: "Телефон или email",
      task: "Коротко о задаче",
      taskPlaceholder: "Что нужно запустить или масштабировать?",
      consentPrefix: "Я согласен(а) на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» и",
      privacy: "Политикой конфиденциальности",
      consentSuffix: "Данные используются только для коммуникации.",
      submit: "Отправить заявку",
      consentError: "Подтвердите согласие, чтобы подготовить заявку.",
      unavailable: "Приём заявок пока недоступен: каналы подключения ожидают настройки. Данные не отправлены.",
      unavailableChannel: "Канал пока недоступен",
      channelTitle: "Канал пока не подключён",
      channelsAria: "Каналы связи пока недоступны",
      note: "Каналы связи будут активированы после получения настроек. Реальные заявки сейчас не отправляются.",
      labels: ["Телефон", "Telegram", "Email", "WhatsApp"],
    },
    ecosystem: {
      eyebrow: "Модули экосистемы",
      title: "6 модулей экосистемы",
      lead: "Полный цикл развития технологических проектов: от идеи до промышленного масштабирования",
      modules: [
        ["Клуб фаундеров", "Стратегия и управление", "Формирование команд, принятие стратегических решений, упаковка проектов, выход к пилотам и промышленным заказчикам."],
        ["Хаб талантов", "Кадры и компетенции", "Инженеры, исследователи, продакты, бизнес-разработчики. Матчинг по задачам с привязкой к KPI и вкладу."],
        ["Академия", "Обучение и артефакты", "Практико-ориентированное обучение: технические спецификации, PoC, пилоты, пакеты для заказчиков и инвесторов."],
        ["Инвестиции", "Капитал по этапам", "Pre-seed, Seed, Series A, гранты и субсидии — привязаны к TRL/MRL и результатам пилотных внедрений."],
        ["Медиа", "Репутация и доверие", "Аналитика отрасли, кейсы внедрений, публичная витрина проектов, репутационные сигналы для корпораций и фондов."],
        ["Go-To-Market", "Пилоты и тиражирование", "Полный цикл: запрос заказчика → пилот → контракт → масштабирование → тиражирование в международной экосистеме."],
      ],
    },
    routes: {
      eyebrow: "Выбор маршрута",
      title: "Выберите интерфейс",
      lead: "Каждая роль — свой протокол взаимодействия с экосистемой",
      items: [
        ["Специалистам", "Инженеры, разработчики, DevOps, ML-специалисты, маркетологи B2B", "Хаб талантов"],
        ["Основателям стартапов", "От идеи и прототипа до серии A и промышленных контрактов", "Клуб фаундеров"],
        ["Корпорациям", "Поиск, due diligence и запуск международных решений под специфику бизнеса", "Витрина проектов"],
        ["Инвесторам", "Ранние сделки, доступ к пайплайну, due diligence и exit-стратегии", "Investors Circle"],
        ["Разработчикам и стартапам", "Пилоты с корпорациями, технологические партнёрства, выход на международные рынки", "Go-To-Market"],
        ["IT-компаниям", "Корпоративные запросы, совместные проекты, субподряд и интеграция", "Витрина заказчиков"],
      ],
    },
    infrastructure: {
      eyebrow: "Операционная инфраструктура",
      titleLead: "Создаём инфраструктуру",
      titleAccent: "для DEEP TECH проектов",
      lead: "Единое операционное поле: юридическая, финансовая и технологическая поддержка. Фокусируйтесь на продукте — остальное берём на себя.",
      getAccess: "Получить доступ",
      previous: "Предыдущий блок",
      next: "Следующий блок",
      dots: "Состояние карусели",
      openBlock: "Открыть блок",
      slides: [
        ["Знания и экспертиза", "HRD и развитие команд", [["Deep Tech Academy", "Обучение для технических команд и руководителей"], ["Deep Tech Advisors", "Эксперты и менторы под конкретные технические задачи"], ["Deep Tech Accelerator", "Ускорение от MVP до промышленного масштабирования"], ["Deep Tech Events", "Закрытые мастермайнды и отраслевые конференции"]]],
        ["Рынки и масштаб", "Партнёрства для выхода на рынок", [["Глобальная сеть", "Партнёры и эксперты для международного развития"], ["Создатель партнёрства", "Связи между командами, заказчиками и институтами"], ["Go-To-Market", "Маршрут от подтверждённого PoC до коммерческого контракта"], ["Витрина запросов", "Задачи корпораций и технологические решения в одном поле"]]],
        ["Операционная поддержка", "Сервисы для движения проекта", [["Платёжные шлюзы", "Подготовка финансового контура под согласованные процессы"], ["Юридический блок", "Документы и договорная рамка для пилотов"], ["Бухгалтерия и учёт", "Прозрачный учёт этапов и обязательств проекта"], ["GR и институты", "Взаимодействие с профильными организациями"]]],
        ["Продвижение и продажи", "Коммерческий контур развития", [["Deep Tech Media", "Кейсы, аналитика и экспертное присутствие"], ["Бизнес-стек и лиды", "Инструменты для системной работы с запросами"], ["Финансовые ресурсы", "Подготовка к инвестициям и грантовым программам"], ["Веб-инфраструктура", "Цифровые точки контакта и материалы проекта"]]],
      ],
    },
    contacts: {
      title: "Контакты",
      lead: "Операционная система международного технологического партнёрства — инфраструктура для пилотов, рынков и промышленного масштабирования DEEP TECH решений.",
      labels: ["Email", "Telegram", "Телефон", "Международное сотрудничество"],
      notes: ["Ответ в течение 24 ч", "Оперативный канал", "Консультация специалиста", "Партнёрства и масштабирование"],
      partnership: "Технологические партнёрства",
    },
    footer: {
      rights: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      legal: "Все материалы на сайте являются интеллектуальной собственностью. Копирование и использование допускается только с письменного согласия.",
    },
    cookie: {
      aria: "Уведомление о конфиденциальности",
      title: "Конфиденциальность данных",
      text: "Для работы сайта могут использоваться файлы cookie и аналогичные технологии. Подробнее — в",
      privacy: "Политике конфиденциальности",
      accept: "Принять",
      reject: "Отклонить",
    },
  },
  en: {
    languageName: "English",
    header: {
      nav: ["Requests", "Projects", "Go To Market", "Infrastructure", "Contacts"],
      login: "Sign in",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      currentLanguage: "Current language",
    },
    hero: {
      eyebrow: "Operating system for international technology partnerships",
      titleLead: "We turn DEEP TECH",
      titleAccent: "products into scalable systems",
      sub: "Infrastructure connecting corporations, startups and institutions for pilots, industrial deployment and international market expansion.",
      start: "Start a project",
      infrastructure: "Explore infrastructure",
      statsLabel: "Key metrics",
      stats: [
        ["500+", "ecosystem participants"],
        ["15+", "international markets"],
        ["100+", "pilot projects"],
        ["$50M+", "pipeline TVL"],
      ],
    },
    challenges: {
      eyebrow: "Commercialization challenges",
      titleLead: "Technology advantage",
      titleAccent: "is no longer sustainable",
      lead: "Four barriers that break innovation on the path from the lab to the market",
      items: [
        ["Months, not years", "The opportunity window is shrinking", "Technology advantages now last months instead of years. Speed to market has become a critical survival factor."],
        ["90% fail", "The commercialization valley of death", "Most projects stall between TRL 4–7. The bridge between R&D and industry is still missing."],
        ["Pilots without rollout", "The endless pilot loop", "Corporations accumulate demonstrators that never reach production. A standardized scaling protocol is missing."],
        ["100× gap", "The engineering speed gap", "Vibe-coding and low-code created a flood of prototypes without markets. The gap between building and scaling keeps growing."],
      ],
    },
    contact: {
      badge: "Ecosystem access",
      title: "Contact us",
      lead: "Describe your task — once the channels are connected, we will add secure request delivery.",
      name: "Name",
      namePlaceholder: "Your name",
      contact: "Contact",
      contactPlaceholder: "Phone or email",
      task: "Briefly describe the task",
      taskPlaceholder: "What do you need to launch or scale?",
      consentPrefix: "I consent to the processing of personal data in accordance with applicable data protection requirements and the",
      privacy: "Privacy Policy",
      consentSuffix: "The data is used only for communication.",
      submit: "Send request",
      consentError: "Please confirm consent before preparing the request.",
      unavailable: "Request delivery is not connected yet. No data has been sent.",
      unavailableChannel: "Channel unavailable",
      channelTitle: "Channel is not connected yet",
      channelsAria: "Communication channels are not available yet",
      note: "Communication channels will be activated after configuration. Requests are not currently being sent.",
      labels: ["Phone", "Telegram", "Email", "WhatsApp"],
    },
    ecosystem: {
      eyebrow: "Ecosystem modules",
      title: "6 ecosystem modules",
      lead: "A full development cycle for technology projects: from idea to industrial scale",
      modules: [
        ["Founders Club", "Strategy and management", "Team building, strategic decisions, project packaging and access to pilots and industrial customers."],
        ["Talent Hub", "People and capabilities", "Engineers, researchers, product specialists and business developers matched to tasks, KPIs and contribution."],
        ["Academy", "Learning and artifacts", "Practice-oriented learning: technical specifications, PoCs, pilots and packages for customers and investors."],
        ["Investments", "Stage-based capital", "Pre-seed, Seed, Series A, grants and subsidies aligned with TRL/MRL and pilot outcomes."],
        ["Media", "Reputation and trust", "Industry analytics, deployment cases, a public project showcase and reputation signals for corporations and funds."],
        ["Go-To-Market", "Pilots and scaling", "Full cycle: customer request → pilot → contract → scaling → replication across the international ecosystem."],
      ],
    },
    routes: {
      eyebrow: "Choose a route",
      title: "Choose your interface",
      lead: "Each role gets its own interaction protocol with the ecosystem",
      items: [
        ["For specialists", "Engineers, developers, DevOps, ML specialists and B2B marketers", "Talent Hub"],
        ["For startup founders", "From idea and prototype to Series A and industrial contracts", "Founders Club"],
        ["For corporations", "Search, due diligence and launch of international solutions tailored to business needs", "Project Showcase"],
        ["For investors", "Early-stage deals, pipeline access, due diligence and exit strategies", "Investors Circle"],
        ["For developers and startups", "Corporate pilots, technology partnerships and international market expansion", "Go-To-Market"],
        ["For IT companies", "Corporate requests, joint projects, subcontracting and integration", "Customer Showcase"],
      ],
    },
    infrastructure: {
      eyebrow: "Operating infrastructure",
      titleLead: "Building infrastructure",
      titleAccent: "for DEEP TECH projects",
      lead: "One operating environment for legal, financial and technology support. Focus on the product — we handle the rest.",
      getAccess: "Get access",
      previous: "Previous section",
      next: "Next section",
      dots: "Carousel position",
      openBlock: "Open section",
      slides: [
        ["Knowledge and expertise", "HRD and team development", [["Deep Tech Academy", "Training for technical teams and leaders"], ["Deep Tech Advisors", "Experts and mentors for specific technical challenges"], ["Deep Tech Accelerator", "Acceleration from MVP to industrial scale"], ["Deep Tech Events", "Private masterminds and industry conferences"]]],
        ["Markets and scale", "Partnerships for market entry", [["Global network", "Partners and experts for international growth"], ["Partnership builder", "Connections between teams, customers and institutions"], ["Go-To-Market", "A route from validated PoC to commercial contract"], ["Request showcase", "Corporate challenges and technology solutions in one place"]]],
        ["Operational support", "Services that keep projects moving", [["Payment gateways", "Financial setup for agreed operating processes"], ["Legal", "Documents and contractual framework for pilots"], ["Accounting", "Transparent tracking of project stages and obligations"], ["GR and institutions", "Interaction with relevant institutions"]]],
        ["Promotion and sales", "Commercial growth layer", [["Deep Tech Media", "Cases, analytics and expert visibility"], ["Business stack and leads", "Tools for systematic request management"], ["Financial resources", "Preparation for investment and grant programs"], ["Web infrastructure", "Digital touchpoints and project materials"]]],
      ],
    },
    contacts: {
      title: "Contacts",
      lead: "An operating system for international technology partnerships — infrastructure for pilots, markets and industrial scaling of DEEP TECH solutions.",
      labels: ["Email", "Telegram", "Phone", "International cooperation"],
      notes: ["Reply within 24 hours", "Fast communication channel", "Specialist consultation", "Partnerships and scaling"],
      partnership: "Technology partnerships",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      legal: "All materials on this website are intellectual property. Copying or use is permitted only with written consent.",
    },
    cookie: {
      aria: "Privacy notice",
      title: "Data privacy",
      text: "This website may use cookies and similar technologies. Learn more in the",
      privacy: "Privacy Policy",
      accept: "Accept",
      reject: "Reject",
    },
  },
} as const;

type Dictionary = typeof translations.ru | typeof translations.en;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
  languages: Array<{ code: Language; label: string }>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
      languages: [
        { code: "ru", label: "RU" },
        { code: "en", label: "EN" },
      ],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
