import type { MetadataRoute } from "next";
import { getHomeLanguageUrls, getLocalizedHomeUrl, SITE_URL } from "@/lib/localized-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const languageUrls = getHomeLanguageUrls();

  const homePages = (["ru", "en", "es", "ar", "zh"] as const).map((language) => ({
    url: getLocalizedHomeUrl(language),
    alternates: { languages: languageUrls },
  }));

  return [
    ...homePages,
    { url: `${SITE_URL}/legal.html` },
    { url: `${SITE_URL}/privacypolicy` },
  ];
}
