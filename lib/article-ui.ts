import type { Language } from "@/lib/site-preferences";

export const articleUi = {
  ru: { title: "Статьи", lead: "Материалы о технологических проектах и их развитии.", read: "Читать", back: "К статьям", other: "Статья доступна на русском языке", empty: "Статьи скоро появятся." },
  en: { title: "Articles", lead: "Ideas on technology projects and their growth.", read: "Read", back: "All articles", other: "Available in Russian", empty: "Articles are coming soon." },
  es: { title: "Artículos", lead: "Ideas sobre proyectos tecnológicos y su desarrollo.", read: "Leer", back: "Todos los artículos", other: "Disponible en ruso", empty: "Próximamente habrá artículos." },
  ar: { title: "المقالات", lead: "مواد حول المشاريع التقنية وتطويرها.", read: "اقرأ", back: "جميع المقالات", other: "متاح باللغة الروسية", empty: "ستُنشر المقالات قريبًا." },
  zh: { title: "文章", lead: "关于科技项目及其发展的内容。", read: "阅读", back: "全部文章", other: "仅提供俄语版本", empty: "文章即将发布。" },
} satisfies Record<Language, { title: string; lead: string; read: string; back: string; other: string; empty: string }>;
