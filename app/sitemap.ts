import type { MetadataRoute } from "next";
import { getHomeLanguageUrls, getLocalizedHomeUrl } from "@/lib/localized-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const languageUrls = getHomeLanguageUrls();

  return (["ru", "en", "es", "ar", "zh"] as const).map((language) => ({
    url: getLocalizedHomeUrl(language),
    alternates: { languages: languageUrls },
  }));
}
