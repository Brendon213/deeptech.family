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
} as const;

export function getPageMetadata(language: Language, page: MetadataPage) {
  return pageMetadata[language][page];
}
