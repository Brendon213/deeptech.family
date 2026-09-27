import type { Language } from "@/lib/site-preferences";

export const SITE_URL = "https://deeptech.family";

export const LANGUAGES: readonly Language[] = ["ru", "en", "es", "ar", "zh"];
export const LOCALIZED_LANGUAGES: readonly Exclude<Language, "ru">[] = ["en", "es", "ar", "zh"];

export function isLanguage(value: string): value is Language {
  return LANGUAGES.includes(value as Language);
}

export function getLocalizedHomePath(language: Language): string {
  return language === "ru" ? "/" : `/${language}`;
}

export function getLocalizedHomeUrl(language: Language): string {
  const path = getLocalizedHomePath(language);
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function getLocalizedPath(pathname: string, language: Language): string {
  const pathWithoutLanguage = pathname.replace(/^\/(?:en|es|ar|zh)(?=\/|$)/, "") || "/";
  if (language === "ru") return pathWithoutLanguage;
  return pathWithoutLanguage === "/" ? `/${language}` : `/${language}${pathWithoutLanguage}`;
}

export function getArticlesPath(language: Language, slug?: string): string {
  return `${language === "ru" ? "" : `/${language}`}/articles${slug ? `/${slug}` : ""}`;
}

export function getHomeLanguageUrls(): Record<string, string> {
  return {
    ru: getLocalizedHomeUrl("ru"),
    en: getLocalizedHomeUrl("en"),
    es: getLocalizedHomeUrl("es"),
    ar: getLocalizedHomeUrl("ar"),
    zh: getLocalizedHomeUrl("zh"),
    "x-default": getLocalizedHomeUrl("ru"),
  };
}
