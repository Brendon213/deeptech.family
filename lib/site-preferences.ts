export type Language = "ru" | "en" | "es" | "ar" | "zh";
export type CookieChoice = "accepted" | "rejected";

export const LANGUAGE_COOKIE = "deeptech-language";
export const COOKIE_CHOICE_COOKIE = "deeptech-cookie-choice";
export const PREFERENCE_MAX_AGE = 60 * 60 * 24 * 365;

export function parseLanguage(value: string | undefined): Language {
  return value === "en" || value === "es" || value === "ar" || value === "zh"
    ? value
    : "ru";
}

export function parseCookieChoice(value: string | undefined): CookieChoice | null {
  return value === "accepted" || value === "rejected" ? value : null;
}

export function createPreferenceCookie(name: string, value: string, secure: boolean) {
  return `${name}=${value}; Path=/; Max-Age=${PREFERENCE_MAX_AGE}; SameSite=Lax${secure ? "; Secure" : ""}`;
}
