import type { Language } from "@/lib/site-preferences";

export type MetadataPage = "home" | "privacy";

const pageMetadata = {
  ru: {
    home: {
      title: "DeepTech Family — международные технологические решения",
      description:
        "Международные решения для развития технологических проектов, сотрудничества и выхода на рынки.",
      locale: "ru_RU",
    },
    privacy: {
      title: "Политика конфиденциальности | DeepTech Family",
      description:
        "Согласованный текст политики конфиденциальности DeepTech Family будет опубликован после предоставления владельцем.",
      locale: "ru_RU",
    },
  },
  en: {
    home: {
      title: "DeepTech Family — international technology solutions",
      description:
        "International solutions for technology projects, collaboration and entry into global markets.",
      locale: "en_US",
    },
    privacy: {
      title: "Privacy Policy | DeepTech Family",
      description:
        "The approved DeepTech Family privacy policy will be published once provided by the site owner.",
      locale: "en_US",
    },
  },
  es: {
    home: {
      title: "DeepTech Family — soluciones tecnológicas internacionales",
      description:
        "Soluciones internacionales para proyectos tecnológicos, colaboración y acceso a nuevos mercados.",
      locale: "es_ES",
    },
    privacy: {
      title: "Política de privacidad | DeepTech Family",
      description:
        "La política de privacidad aprobada se publicará cuando la proporcione el propietario del sitio.",
      locale: "es_ES",
    },
  },
  ar: {
    home: {
      title: "DeepTech Family — حلول تقنية دولية",
      description:
        "حلول دولية لتطوير المشاريع التقنية والتعاون والوصول إلى الأسواق.",
      locale: "ar_AR",
    },
    privacy: {
      title: "سياسة الخصوصية | DeepTech Family",
      description:
        "سيُنشر نص سياسة الخصوصية المعتمد بعد تقديمه من مالك الموقع.",
      locale: "ar_AR",
    },
  },
  zh: {
    home: {
      title: "DeepTech Family — 国际科技解决方案",
      description: "面向科技项目、合作与市场拓展的国际解决方案。",
      locale: "zh_CN",
    },
    privacy: {
      title: "隐私政策 | DeepTech Family",
      description: "网站所有者提供经批准的隐私政策后，我们将发布该文本。",
      locale: "zh_CN",
    },
  },
} as const;

export function getPageMetadata(language: Language, page: MetadataPage) {
  return pageMetadata[language][page];
}
