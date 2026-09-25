import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/site-metadata";
import { getHomeLanguageUrls, getLocalizedHomeUrl, SITE_URL } from "@/lib/localized-routes";

const SITE_NAME = "DeepTech Family";

export function getHomeMetadata(language: "ru" | "en" | "es" | "ar" | "zh"): Metadata {
  const page = getPageMetadata(language, "home");
  const canonical = getLocalizedHomeUrl(language);
  const languages = getHomeLanguageUrls();

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

export function getPrivacyMetadata(): Metadata {
  const page = getPageMetadata("ru", "privacy");
  const canonical = new URL("/privacy", SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    alternates: { canonical },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}
