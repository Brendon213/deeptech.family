"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  createPreferenceCookie,
  LANGUAGE_COOKIE,
  type Language,
} from "@/lib/site-preferences";

export type { Language } from "@/lib/site-preferences";

const translations = {
  ru: {
    languageName: "Русский",
    header: {
      nav: ["Витрина запросов", "Витрина проектов", "Go To Market", "Инфраструктура", "Контакты"],
      navLabel: "Главная навигация",
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
      lead: "Опишите задачу — для связи используйте прямые каналы ниже. Форма пока не отправляет данные.",
      name: "Имя",
      namePlaceholder: "Ваше имя",
      contact: "Контакт",
      contactPlaceholder: "Телефон или email",
      task: "Коротко о задаче",
      taskPlaceholder: "Что нужно запустить или масштабировать?",
      consentPrefix: "Я ознакомился(ась) с",
      privacy: "Политикой конфиденциальности",
      consentSuffix: "Форма пока не отправляет введённые данные.",
      submit: "Отправить заявку",
      consentError: "Отметьте согласие с политикой конфиденциальности, чтобы продолжить.",
      unavailable: "Форма пока не отправляет заявки. Данные не переданы; используйте контакты ниже.",
      channelsAria: "Прямые каналы связи",
      note: "Ссылки ниже открывают почту, телефон, Telegram или WhatsApp. Данные, введённые в форму, не отправляются.",
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
      telegramNames: ["Telegram Александра", "Telegram администратора"],
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
    privacyPage: {
      title: "Политика конфиденциальности",
      pending:
        "Согласованный текст политики конфиденциальности пока не предоставлен владельцем сайта.",
      notice:
        "Страница будет обновлена после получения утверждённой редакции. До этого здесь не публикуются условия обработки данных, не подтверждённые владельцем.",
      home: "Вернуться на главную",
    },
  },
  en: {
    languageName: "English",
    header: {
      nav: ["Requests", "Projects", "Go To Market", "Infrastructure", "Contacts"],
      navLabel: "Main navigation",
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
      lead: "Describe your task. Use the direct contact links below; the form does not send data yet.",
      name: "Name",
      namePlaceholder: "Your name",
      contact: "Contact",
      contactPlaceholder: "Phone or email",
      task: "Briefly describe the task",
      taskPlaceholder: "What do you need to launch or scale?",
      consentPrefix: "I have read the",
      privacy: "Privacy Policy",
      consentSuffix: "The form does not send entered data yet.",
      submit: "Send request",
      consentError: "Please acknowledge the Privacy Policy to continue.",
      unavailable: "The form does not send requests yet. No data was sent; use the contact links below.",
      channelsAria: "Direct contact channels",
      note: "The links below open email, phone, Telegram or WhatsApp. Information entered in the form is not sent.",
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
      telegramNames: ["Alexander's Telegram", "Site admin's Telegram"],
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
    privacyPage: {
      title: "Privacy Policy",
      pending:
        "The site owner has not yet provided an approved privacy policy.",
      notice:
        "This page will be updated when the approved text is provided. No unverified data-processing terms are published here until then.",
      home: "Return to home",
    },
  },
  es: {
    languageName: "Español",
    header: {
      nav: ["Solicitudes", "Proyectos", "Go To Market", "Infraestructura", "Contactos"],
      navLabel: "Navegación principal",
      login: "Unirse al sistema",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      currentLanguage: "Idioma actual",
    },
    hero: {
      eyebrow: "Plataforma operativa para alianzas tecnológicas internacionales",
      titleLead: "Convertimos productos DEEP TECH",
      titleAccent: "en sistemas escalables",
      sub: "Infraestructura que conecta empresas, startups e instituciones para realizar pilotos, desplegar soluciones industriales y acceder a mercados internacionales.",
      start: "Iniciar un proyecto",
      infrastructure: "Explorar la infraestructura",
      statsLabel: "Indicadores clave",
      stats: [["500+", "participantes del ecosistema"], ["15+", "mercados internacionales"], ["100+", "proyectos piloto"], ["$50M+", "valor del pipeline"]],
    },
    challenges: {
      eyebrow: "Retos de comercialización",
      titleLead: "La ventaja tecnológica",
      titleAccent: "ya no es duradera",
      lead: "Cuatro barreras que frenan la innovación en el camino del laboratorio al mercado",
      items: [
        ["Meses, no años", "Se reduce la ventana de oportunidad", "La ventaja tecnológica dura meses en vez de años. La velocidad de llegada al mercado se ha vuelto un factor crítico de supervivencia."],
        ["90 % de fracaso", "El valle de la muerte comercial", "La mayoría de los proyectos se estanca entre TRL 4 y 7. Sigue faltando una conexión entre I+D y la industria."],
        ["Pilotos sin despliegue", "El ciclo interminable de pilotos", "Las empresas acumulan demostradores que nunca llegan a producción. Falta un protocolo estándar para escalar."],
        ["Brecha de 100×", "Falta velocidad de ingeniería", "El vibe coding y el low-code han creado una avalancha de prototipos sin mercado. La brecha entre crear y escalar sigue creciendo."],
      ],
    },
    contact: {
      badge: "Acceso al ecosistema",
      title: "Contacta con nosotros",
      lead: "Describe tu proyecto. Usa los enlaces de contacto directo; el formulario aún no envía datos.",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      contact: "Contacto",
      contactPlaceholder: "Teléfono o correo electrónico",
      task: "Describe brevemente tu proyecto",
      taskPlaceholder: "¿Qué necesitas lanzar o escalar?",
      consentPrefix: "He leído la",
      privacy: "Política de privacidad",
      consentSuffix: "El formulario aún no envía los datos introducidos.",
      submit: "Enviar solicitud",
      consentError: "Confirma que has leído la política de privacidad para continuar.",
      unavailable: "El formulario aún no envía solicitudes. No se han enviado datos; usa los enlaces de contacto.",
      channelsAria: "Canales de contacto directo",
      note: "Los enlaces abren el correo, el teléfono, Telegram o WhatsApp. Los datos introducidos en el formulario no se envían.",
      labels: ["Teléfono", "Telegram", "Correo electrónico", "WhatsApp"],
    },
    ecosystem: {
      eyebrow: "Módulos del ecosistema",
      title: "6 módulos del ecosistema",
      lead: "Un ciclo completo para desarrollar proyectos tecnológicos: de la idea a la escala industrial",
      modules: [
        ["Club de fundadores", "Estrategia y gestión", "Creación de equipos, decisiones estratégicas, preparación de proyectos y acceso a pilotos y clientes industriales."],
        ["Centro de talento", "Personas y competencias", "Ingenieros, investigadores, especialistas de producto y desarrollo de negocio, asignados según tareas, indicadores y contribución."],
        ["Academia", "Formación y entregables", "Formación práctica: especificaciones técnicas, pruebas de concepto, pilotos y materiales para clientes e inversores."],
        ["Inversiones", "Capital por etapas", "Pre-seed, Seed, Series A, subvenciones e incentivos vinculados a TRL/MRL y a los resultados de los pilotos."],
        ["Medios", "Reputación y confianza", "Análisis sectorial, casos de despliegue, catálogo público de proyectos y señales de confianza para empresas y fondos."],
        ["Go-To-Market", "Pilotos y expansión", "Ciclo completo: solicitud del cliente → piloto → contrato → expansión → replicación en el ecosistema internacional."],
      ],
    },
    routes: {
      eyebrow: "Elige tu ruta",
      title: "Elige tu interfaz",
      lead: "Cada perfil tiene su propio modo de colaborar con el ecosistema",
      items: [
        ["Especialistas", "Ingenieros, desarrolladores, DevOps, especialistas en ML y marketing B2B", "Centro de talento"],
        ["Fundadores de startups", "De la idea y el prototipo a Series A y los contratos industriales", "Club de fundadores"],
        ["Empresas", "Búsqueda, diligencia debida y lanzamiento de soluciones internacionales adaptadas al negocio", "Catálogo de proyectos"],
        ["Inversores", "Operaciones en fase inicial, acceso al pipeline, diligencia debida y estrategias de salida", "Investors Circle"],
        ["Desarrolladores y startups", "Pilotos corporativos, alianzas tecnológicas y acceso a mercados internacionales", "Go-To-Market"],
        ["Empresas de TI", "Solicitudes corporativas, proyectos conjuntos, subcontratación e integración", "Catálogo de clientes"],
      ],
    },
    infrastructure: {
      eyebrow: "Infraestructura operativa",
      titleLead: "Creamos infraestructura",
      titleAccent: "para proyectos DEEP TECH",
      lead: "Un entorno operativo común con apoyo jurídico, financiero y tecnológico. Concéntrate en el producto; nosotros nos ocupamos del resto.",
      getAccess: "Solicitar acceso",
      previous: "Sección anterior",
      next: "Sección siguiente",
      dots: "Posición del carrusel",
      openBlock: "Abrir sección",
      slides: [
        ["Conocimiento y experiencia", "Desarrollo de talento y equipos", [["Deep Tech Academy", "Formación para equipos técnicos y directivos"], ["Deep Tech Advisors", "Expertos y mentores para retos técnicos concretos"], ["Deep Tech Accelerator", "Del MVP a la escala industrial"], ["Deep Tech Events", "Encuentros privados y conferencias sectoriales"]]],
        ["Mercados y expansión", "Alianzas para entrar al mercado", [["Red global", "Socios y expertos para el crecimiento internacional"], ["Creación de alianzas", "Conexiones entre equipos, clientes e instituciones"], ["Go-To-Market", "De una prueba de concepto validada a un contrato comercial"], ["Catálogo de solicitudes", "Retos corporativos y soluciones tecnológicas en un mismo espacio"]]],
        ["Apoyo operativo", "Servicios para impulsar los proyectos", [["Pasarelas de pago", "Preparación financiera para los procesos acordados"], ["Área jurídica", "Documentos y marco contractual para pilotos"], ["Contabilidad", "Seguimiento transparente de etapas y compromisos"], ["Relaciones institucionales", "Colaboración con organizaciones relevantes"]]],
        ["Promoción y ventas", "Desarrollo comercial", [["Deep Tech Media", "Casos, análisis y presencia de expertos"], ["Herramientas comerciales y contactos", "Herramientas para gestionar solicitudes de forma sistemática"], ["Recursos financieros", "Preparación para inversiones y programas de subvenciones"], ["Infraestructura web", "Puntos de contacto digitales y materiales del proyecto"]]],
      ],
    },
    contacts: {
      title: "Contactos",
      lead: "Plataforma operativa para alianzas tecnológicas internacionales: infraestructura para pilotos, mercados y expansión industrial de soluciones DEEP TECH.",
      labels: ["Correo electrónico", "Telegram", "Teléfono", "Cooperación internacional"],
      notes: ["Respuesta en 24 horas", "Canal de comunicación directo", "Consulta con un especialista", "Alianzas y expansión"],
      telegramNames: ["Telegram de Alexander", "Telegram del administrador"],
      partnership: "Alianzas tecnológicas",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      privacy: "Política de privacidad",
      legal: "Todos los materiales de este sitio son propiedad intelectual. Solo se permite copiarlos o utilizarlos con autorización por escrito.",
    },
    cookie: {
      aria: "Aviso de privacidad",
      title: "Privacidad de datos",
      text: "Este sitio puede utilizar cookies y tecnologías similares. Más información en la",
      privacy: "Política de privacidad",
      accept: "Aceptar",
      reject: "Rechazar",
    },
    privacyPage: {
      title: "Política de privacidad",
      pending: "El propietario del sitio aún no ha proporcionado el texto aprobado de la política de privacidad.",
      notice: "Esta página se actualizará cuando recibamos la versión aprobada. Hasta entonces no se publicarán condiciones de tratamiento de datos que el propietario no haya confirmado.",
      home: "Volver al inicio",
    },
  },
  ar: {
    languageName: "العربية",
    header: {
      nav: ["واجهة الطلبات", "واجهة المشاريع", "الوصول إلى السوق", "البنية التحتية", "جهات الاتصال"],
      navLabel: "التنقل الرئيسي",
      login: "الانضمام إلى المنظومة",
      menuOpen: "فتح القائمة",
      menuClose: "إغلاق القائمة",
      currentLanguage: "اللغة الحالية",
    },
    hero: {
      eyebrow: "منظومة تشغيلية للشراكات التقنية الدولية",
      titleLead: "نحوّل منتجات ديب\u00a0تك",
      titleAccent: "إلى أنظمة قابلة للتوسع",
      sub: "بنية تربط الشركات الناشئة والمؤسسات لإطلاق المشاريع التجريبية والتطبيق الصناعي والوصول إلى الأسواق الدولية.",
      start: "ابدأ مشروعاً",
      infrastructure: "استكشف البنية التحتية",
      statsLabel: "المؤشرات الرئيسية",
      stats: [["500+", "مشارك في المنظومة"], ["15+", "سوقاً دولياً"], ["100+", "مشروعاً تجريبياً"], ["$50M+", "قيمة مسار المشاريع"]],
    },
    challenges: {
      eyebrow: "تحديات التسويق التجاري",
      titleLead: "لم تعد الميزة التقنية",
      titleAccent: "مضمونة الاستمرار",
      lead: "أربعة عوائق تعرقل الابتكار في طريقه من المختبر إلى السوق",
      items: [
        ["أشهر لا سنوات", "تتقلص نافذة الفرصة", "أصبحت الميزة التقنية تدوم أشهراً بدلاً من سنوات. وسرعة الوصول إلى السوق عامل حاسم للبقاء."],
        ["90% من المشاريع", "فجوة التسويق التجاري", "يتوقف معظم المشاريع بين TRL 4 و7. وما زال الربط بين البحث والتطوير والصناعة مفقوداً."],
        ["مشاريع تجريبية بلا تطبيق", "حلقة تجارب لا تنتهي", "تراكم الشركات نماذج تجريبية لا تصل إلى الإنتاج. ولا يوجد بروتوكول موحد للتوسع."],
        ["فجوة 100×", "نقص سرعة التنفيذ الهندسي", "أدى البرمجة السريعة وأدوات low-code إلى تدفق نماذج أولية بلا أسواق. وتتسع الفجوة بين البناء والتوسع."],
      ],
    },
    contact: {
      badge: "الوصول إلى المنظومة",
      title: "تواصل معنا",
      lead: "يرجى وصف المشروع. استخدم روابط التواصل المباشر أدناه؛ النموذج لا يرسل البيانات حالياً.",
      name: "الاسم",
      namePlaceholder: "اسمك",
      contact: "وسيلة التواصل",
      contactPlaceholder: "الهاتف أو البريد الإلكتروني",
      task: "نبذة موجزة عن المشروع",
      taskPlaceholder: "ما الذي تريد إطلاقه أو توسيع نطاقه؟",
      consentPrefix: "اطلعت على",
      privacy: "سياسة الخصوصية",
      consentSuffix: "لا يرسل النموذج البيانات المُدخلة حالياً.",
      submit: "إرسال الطلب",
      consentError: "يرجى تأكيد الاطلاع على سياسة الخصوصية للمتابعة.",
      unavailable: "النموذج لا يرسل الطلبات حالياً. لم تُرسل أي بيانات؛ استخدم روابط التواصل أدناه.",
      channelsAria: "قنوات التواصل المباشر",
      note: "تفتح الروابط البريد والهاتف وTelegram وWhatsApp. لا تُرسل البيانات المدخلة في النموذج.",
      labels: ["الهاتف", "تيليغرام", "البريد الإلكتروني", "واتساب"],
    },
    ecosystem: {
      eyebrow: "وحدات المنظومة",
      title: "6 وحدات للمنظومة",
      lead: "دورة متكاملة لتطوير المشاريع التقنية من الفكرة إلى التوسع الصناعي",
      modules: [
        ["نادي المؤسسين", "الاستراتيجية والإدارة", "تكوين الفرق واتخاذ القرارات الاستراتيجية وتجهيز المشاريع والوصول إلى المشاريع التجريبية والعملاء الصناعيين."],
        ["مركز المواهب", "الكوادر والمهارات", "مهندسون وباحثون ومتخصصون في المنتجات وتطوير الأعمال، مع مواءمة الخبرات مع المهام ومؤشرات الأداء والمساهمة."],
        ["الأكاديمية", "التدريب والمخرجات", "تدريب عملي يشمل المواصفات التقنية وإثبات المفهوم والمشاريع التجريبية والمواد المخصصة للعملاء والمستثمرين."],
        ["الاستثمار", "تمويل حسب المرحلة", "تمويل Pre-seed وSeed وSeries A والمنح والحوافز، مرتبط بمستويات TRL/MRL ونتائج المشاريع التجريبية."],
        ["الإعلام", "السمعة والثقة", "تحليلات القطاع وحالات التطبيق وعرض علني للمشاريع ومؤشرات الثقة للشركات والصناديق الاستثمارية."],
        ["Go-To-Market", "التجارب والتوسع", "دورة كاملة: طلب العميل ← مشروع تجريبي ← عقد ← توسع ← تكرار الحل ضمن المنظومة الدولية."],
      ],
    },
    routes: {
      eyebrow: "اختر مسارك",
      title: "اختر الواجهة المناسبة",
      lead: "لكل دور طريقة خاصة للتعاون مع المنظومة",
      items: [
        ["للمتخصصين", "المهندسون والمطورون وDevOps ومتخصصو ML وتسويق B2B", "مركز المواهب"],
        ["لمؤسسي الشركات الناشئة", "من الفكرة والنموذج الأولي إلى Series A والعقود الصناعية", "نادي المؤسسين"],
        ["للشركات", "البحث والفحص النافي للجهالة وإطلاق حلول دولية تناسب احتياجات الأعمال", "واجهة المشاريع"],
        ["للمستثمرين", "الصفقات المبكرة والوصول إلى مسار المشاريع والفحص النافي للجهالة واستراتيجيات التخارج", "Investors Circle"],
        ["للمطورين والشركات الناشئة", "مشاريع تجريبية مع الشركات وشراكات تقنية والوصول إلى الأسواق الدولية", "Go-To-Market"],
        ["لشركات تقنية المعلومات", "طلبات الشركات والمشاريع المشتركة والتعاقد من الباطن والتكامل", "واجهة العملاء"],
      ],
    },
    infrastructure: {
      eyebrow: "البنية التشغيلية",
      titleLead: "نبني بنية تحتية",
      titleAccent: "لمشاريع DEEP TECH",
      lead: "بيئة تشغيل موحدة للدعم القانوني والمالي والتقني. ركّز على المنتج، وسنتولى بقية التفاصيل.",
      getAccess: "اطلب الوصول",
      previous: "القسم السابق",
      next: "القسم التالي",
      dots: "موضع العرض الدائري",
      openBlock: "فتح القسم",
      slides: [
        ["المعرفة والخبرة", "تطوير الكفاءات والفرق", [["Deep Tech Academy", "تدريب الفرق التقنية والقيادات"], ["Deep Tech Advisors", "خبراء ومرشدون للمهام التقنية المحددة"], ["Deep Tech Accelerator", "تسريع الانتقال من MVP إلى التوسع الصناعي"], ["Deep Tech Events", "لقاءات خاصة ومؤتمرات متخصصة"]]],
        ["الأسواق والتوسع", "شراكات لدخول الأسواق", [["الشبكة العالمية", "شركاء وخبراء للنمو الدولي"], ["بناء الشراكات", "ربط الفرق والعملاء والمؤسسات"], ["Go-To-Market", "من إثبات مفهوم معتمد إلى عقد تجاري"], ["واجهة الطلبات", "طلبات الشركات والحلول التقنية في مساحة واحدة"]]],
        ["الدعم التشغيلي", "خدمات لدفع المشاريع إلى الأمام", [["بوابات الدفع", "إعداد الجانب المالي وفق الإجراءات المتفق عليها"], ["الشؤون القانونية", "وثائق وإطار تعاقدي للمشاريع التجريبية"], ["المحاسبة", "متابعة واضحة لمراحل المشروع والتزاماته"], ["العلاقات المؤسسية", "التعاون مع الجهات ذات الصلة"]]],
        ["الترويج والمبيعات", "تطوير الأعمال التجارية", [["Deep Tech Media", "حالات وتحليلات وحضور الخبراء"], ["أدوات الأعمال والعملاء المحتملون", "أدوات لإدارة الطلبات بطريقة منهجية"], ["الموارد المالية", "الاستعداد للاستثمار وبرامج المنح"], ["البنية الرقمية", "نقاط تواصل رقمية ومواد المشروع"]]],
      ],
    },
    contacts: {
      title: "جهات الاتصال",
      lead: "منظومة تشغيلية للشراكات التقنية الدولية، توفر بنية للمشاريع التجريبية والأسواق والتوسع الصناعي لحلول DEEP TECH.",
      labels: ["البريد الإلكتروني", "تيليغرام", "الهاتف", "التعاون الدولي"],
      notes: ["الرد خلال 24 ساعة", "قناة تواصل مباشرة", "استشارة متخصص", "شراكات وتوسع"],
      telegramNames: ["تيليغرام ألكسندر", "تيليغرام مسؤول الموقع"],
      partnership: "شراكات تقنية",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      legal: "جميع مواد هذا الموقع ملكية فكرية. لا يجوز نسخها أو استخدامها إلا بموافقة خطية.",
    },
    cookie: {
      aria: "إشعار الخصوصية",
      title: "خصوصية البيانات",
      text: "قد يستخدم هذا الموقع ملفات تعريف الارتباط وتقنيات مشابهة. لمزيد من المعلومات، راجع",
      privacy: "سياسة الخصوصية",
      accept: "موافقة",
      reject: "رفض",
    },
    privacyPage: {
      title: "سياسة الخصوصية",
      pending: "لم يقدّم مالك الموقع بعد النص المعتمد لسياسة الخصوصية.",
      notice: "سيتم تحديث هذه الصفحة بعد استلام النسخة المعتمدة. وحتى ذلك الحين لن ننشر شروطاً لمعالجة البيانات لم يؤكدها المالك.",
      home: "العودة إلى الصفحة الرئيسية",
    },
  },
  zh: {
    languageName: "简体中文",
    header: {
      nav: ["需求展示", "项目展示", "市场拓展", "基础设施", "联系我们"],
      navLabel: "主导航",
      login: "加入系统",
      menuOpen: "打开菜单",
      menuClose: "关闭菜单",
      currentLanguage: "当前语言",
    },
    hero: {
      eyebrow: "国际科技合作运营平台",
      titleLead: "让 DEEP TECH 产品",
      titleAccent: "成为可规模化的系统",
      sub: "连接企业、初创公司与机构，为试点、产业落地和拓展国际市场提供协作基础设施。",
      start: "启动项目",
      infrastructure: "了解基础设施",
      statsLabel: "关键指标",
      stats: [["500+", "生态参与者"], ["15+", "国际市场"], ["100+", "试点项目"], ["$50M+", "项目管线总值"]],
    },
    challenges: {
      eyebrow: "商业化挑战",
      titleLead: "技术优势",
      titleAccent: "已不再持久",
      lead: "从实验室走向市场时，创新常会遇到四个关键障碍",
      items: [
        ["数月而非数年", "机会窗口正在缩短", "技术优势如今只能维持数月而非数年。上市速度已成为决定成败的关键因素。"],
        ["90% 项目受阻", "商业化死亡谷", "大多数项目停滞在 TRL 4–7 阶段。研发成果与工业应用之间仍缺少有效衔接。"],
        ["试点难以落地", "无休止的试点循环", "企业积累了大量无法进入生产环节的演示项目，缺少标准化的规模化路径。"],
        ["100 倍差距", "工程交付速度不足", "快速编程和低代码带来了大量没有市场的原型，开发与规模化之间的差距仍在扩大。"],
      ],
    },
    contact: {
      badge: "生态系统入口",
      title: "联系我们",
      lead: "请介绍您的项目。您可以使用下方的直接联系方式；表单暂不发送信息。",
      name: "姓名",
      namePlaceholder: "您的姓名",
      contact: "联系方式",
      contactPlaceholder: "电话或电子邮箱",
      task: "简要介绍项目",
      taskPlaceholder: "您希望启动或扩大什么项目？",
      consentPrefix: "我已阅读",
      privacy: "隐私政策",
      consentSuffix: "表单暂不发送填写的信息。",
      submit: "提交需求",
      consentError: "请确认已阅读隐私政策后继续。",
      unavailable: "表单暂不发送请求。信息未发送，请使用下方的联系渠道。",
      channelsAria: "直接联系渠道",
      note: "下方链接可打开电子邮件、电话、Telegram 或 WhatsApp。表单中填写的信息不会发送。",
      labels: ["电话", "Telegram", "电子邮箱", "WhatsApp"],
    },
    ecosystem: {
      eyebrow: "生态系统模块",
      title: "六大生态模块",
      lead: "覆盖科技项目从构想到产业规模化的完整发展周期",
      modules: [
        ["创始人俱乐部", "战略与管理", "组建团队、制定战略、完善项目，并对接试点机会和产业客户。"],
        ["人才中心", "人才与能力", "汇聚工程师、研究人员、产品和商务拓展人才，并按任务、指标和贡献进行匹配。"],
        ["学院", "培训与成果", "提供实践培训，涵盖技术规格、概念验证、试点项目以及面向客户和投资人的材料。"],
        ["投资", "分阶段资本", "Pre-seed、Seed、Series A、补助与资助计划，与 TRL/MRL 阶段及试点结果相匹配。"],
        ["媒体", "声誉与信任", "行业分析、落地案例、公开项目展示，以及面向企业和基金的信誉信号。"],
        ["Go-To-Market", "试点与规模化", "完整流程：客户需求 → 试点 → 合同 → 扩展 → 在国际生态中复制推广。"],
      ],
    },
    routes: {
      eyebrow: "选择合作路径",
      title: "选择适合您的入口",
      lead: "不同角色拥有各自与生态系统协作的方式",
      items: [
        ["专业人士", "工程师、开发者、DevOps、机器学习专家和 B2B 营销人员", "人才中心"],
        ["初创公司创始人", "从构想到原型，再到 Series A 和产业合同", "创始人俱乐部"],
        ["企业", "搜索、尽职调查并启动符合业务需求的国际解决方案", "项目展示"],
        ["投资人", "早期交易、项目管线、尽职调查和退出策略", "Investors Circle"],
        ["开发者与初创公司", "企业试点、技术合作与国际市场拓展", "Go-To-Market"],
        ["IT 公司", "企业需求、联合项目、分包与系统集成", "客户需求展示"],
      ],
    },
    infrastructure: {
      eyebrow: "运营基础设施",
      titleLead: "为 DEEP TECH 项目",
      titleAccent: "构建基础设施",
      lead: "提供统一的法律、财务和技术支持环境。专注产品，其余事务交由我们协助。",
      getAccess: "申请加入",
      previous: "上一部分",
      next: "下一部分",
      dots: "轮播位置",
      openBlock: "打开部分",
      slides: [
        ["知识与经验", "人才和团队发展", [["Deep Tech Academy", "面向技术团队和管理者的培训"], ["Deep Tech Advisors", "为具体技术挑战匹配专家和导师"], ["Deep Tech Accelerator", "推动项目从 MVP 走向产业规模化"], ["Deep Tech Events", "闭门交流和行业会议"]]],
        ["市场与规模化", "帮助进入市场的合作网络", [["全球网络", "支持国际发展的合作伙伴和专家"], ["合作伙伴拓展", "连接团队、客户和机构"], ["Go-To-Market", "从经验证的概念验证走向商业合同"], ["需求展示", "在同一平台汇集企业挑战与技术方案"]]],
        ["运营支持", "推动项目持续发展的服务", [["支付网关", "根据已确认流程准备财务方案"], ["法律支持", "试点所需文件与合同框架"], ["会计与核算", "清晰跟踪项目阶段和各项义务"], ["机构合作", "与相关组织开展协作"]]],
        ["推广与销售", "商业增长支持", [["Deep Tech Media", "项目案例、行业分析和专家影响力"], ["商务工具与线索", "系统化管理需求的工具"], ["资金资源", "为投资及资助项目做好准备"], ["网络基础设施", "项目的数字触点和配套材料"]]],
      ],
    },
    contacts: {
      title: "联系我们",
      lead: "国际科技合作运营平台，为试点、市场拓展和 DEEP TECH 解决方案的产业化提供基础设施。",
      labels: ["电子邮箱", "Telegram", "电话", "国际合作"],
      notes: ["24 小时内回复", "直接沟通渠道", "专家咨询", "合作与规模化"],
      telegramNames: ["Alexander 的 Telegram", "网站管理员的 Telegram"],
      partnership: "科技合作",
    },
    footer: {
      rights: "保留所有权利。",
      privacy: "隐私政策",
      legal: "本网站所有材料均为知识产权。未经书面许可，不得复制或使用。",
    },
    cookie: {
      aria: "隐私提示",
      title: "数据隐私",
      text: "本网站可能使用 Cookie 及类似技术。详情请参阅",
      privacy: "隐私政策",
      accept: "接受",
      reject: "拒绝",
    },
    privacyPage: {
      title: "隐私政策",
      pending: "网站所有者尚未提供经批准的隐私政策文本。",
      notice: "收到批准版本后，本页面将予以更新。在此之前，我们不会发布未经所有者确认的数据处理条款。",
      home: "返回首页",
    },
  },
} as const;

type WidenStrings<T> = T extends string
  ? string
  : T extends readonly [unknown, ...unknown[]]
    ? { readonly [K in keyof T]: WidenStrings<T[K]> }
    : T extends readonly (infer Item)[]
      ? readonly WidenStrings<Item>[]
      : T extends object
        ? { readonly [K in keyof T]: WidenStrings<T[K]> }
        : T;

type Dictionary = WidenStrings<typeof translations.ru>;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
  languages: Array<{ code: Language; label: string }>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    const secure = window.location.protocol === "https:";
    document.cookie = createPreferenceCookie(LANGUAGE_COOKIE, nextLanguage, secure);
    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
    setLanguageState(nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
      languages: [
        { code: "ru", label: "RU" },
        { code: "en", label: "EN" },
        { code: "es", label: "ES" },
        { code: "ar", label: "AR" },
        { code: "zh", label: "ZH" },
      ],
    }),
    [language, setLanguage],
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
