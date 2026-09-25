import type { Language } from "@/lib/site-preferences";

export type MetadataPage = "home";

const pageMetadata = {
  ru: {
    home: {
      title: "DeepTech Family — коммерциализация Deep Tech",
      description:
        "Платформа для коммерциализации Deep Tech: корпоративные запросы и due diligence, пилоты, промышленное масштабирование, международные партнёрства и Go-To-Market.",
    },
  },
  en: {
    home: {
      title: "DeepTech Family — Deep Tech commercialization",
      description:
        "Infrastructure for corporate requests and due diligence, technology pilots, industrial scaling, international partnerships and go-to-market.",
    },
  },
  es: {
    home: {
      title: "DeepTech Family — comercialización de Deep Tech",
      description:
        "Infraestructura para solicitudes corporativas y due diligence, pilotos tecnológicos, escalado industrial, alianzas internacionales y go-to-market.",
    },
  },
  ar: {
    home: {
      title: "DeepTech Family — تحويل تقنيات Deep Tech إلى أعمال",
      description:
        "بنية لدعم طلبات الشركات والفحص التقني النافي للجهالة والمشاريع التجريبية والتوسع الصناعي والشراكات الدولية والوصول إلى السوق.",
    },
  },
  zh: {
    home: {
      title: "DeepTech Family — 深科技商业化",
      description: "为企业需求与技术尽调、技术试点、工业规模化、国际合作及 Go-To-Market 提供基础设施。",
    },
  },
} as const;

export function getPageMetadata(language: Language, page: MetadataPage) {
  return pageMetadata[language][page];
}
