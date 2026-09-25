import type { Language } from "@/lib/site-preferences";

export type MetadataPage = "home" | "privacy";

const pageMetadata = {
  ru: {
    home: {
      title: "DeepTech Family — коммерциализация Deep Tech",
      description:
        "Платформа для коммерциализации Deep Tech: корпоративные запросы и due diligence, пилоты, промышленное масштабирование, международные партнёрства и Go-To-Market.",
    },
    privacy: {
      title: "Политика конфиденциальности | DeepTech Family",
      description:
        "Согласованный текст политики конфиденциальности DeepTech Family будет опубликован после предоставления владельцем.",
    },
  },
  en: {
    home: {
      title: "DeepTech Family — Deep Tech commercialization",
      description:
        "Infrastructure for corporate requests and due diligence, technology pilots, industrial scaling, international partnerships and go-to-market.",
    },
    privacy: {
      title: "Privacy Policy | DeepTech Family",
      description:
        "The approved DeepTech Family privacy policy will be published once provided by the site owner.",
    },
  },
  es: {
    home: {
      title: "DeepTech Family — comercialización de Deep Tech",
      description:
        "Infraestructura para solicitudes corporativas y due diligence, pilotos tecnológicos, escalado industrial, alianzas internacionales y go-to-market.",
    },
    privacy: {
      title: "Política de privacidad | DeepTech Family",
      description:
        "La política de privacidad aprobada se publicará cuando la proporcione el propietario del sitio.",
    },
  },
  ar: {
    home: {
      title: "DeepTech Family — تحويل تقنيات Deep Tech إلى أعمال",
      description:
        "بنية لدعم طلبات الشركات والفحص التقني النافي للجهالة والمشاريع التجريبية والتوسع الصناعي والشراكات الدولية والوصول إلى السوق.",
    },
    privacy: {
      title: "سياسة الخصوصية | DeepTech Family",
      description:
        "سيُنشر نص سياسة الخصوصية المعتمد بعد تقديمه من مالك الموقع.",
    },
  },
  zh: {
    home: {
      title: "DeepTech Family — 深科技商业化",
      description: "为企业需求与技术尽调、技术试点、工业规模化、国际合作及 Go-To-Market 提供基础设施。",
    },
    privacy: {
      title: "隐私政策 | DeepTech Family",
      description: "网站所有者提供经批准的隐私政策后，我们将发布该文本。",
    },
  },
} as const;

export function getPageMetadata(language: Language, page: MetadataPage) {
  return pageMetadata[language][page];
}
