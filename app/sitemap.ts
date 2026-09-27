import type { MetadataRoute } from "next";
import { getHomeLanguageUrls, getLocalizedHomeUrl, SITE_URL } from "@/lib/localized-routes";
import { getArticles, getArticleUrl } from "@/lib/articles";
import { getArticlesPath, LANGUAGES } from "@/lib/localized-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const languageUrls = getHomeLanguageUrls();

  const homePages = (["ru", "en", "es", "ar", "zh"] as const).map((language) => ({
    url: getLocalizedHomeUrl(language),
    alternates: { languages: languageUrls },
  }));
  const articles = getArticles();
  const articlePages = articles.map((article) => {
    const versions = articles.filter((item) => item.slug === article.slug);
    return {
      url: getArticleUrl(article),
      lastModified: new Date(`${article.date}T00:00:00Z`),
      ...(versions.length > 1 ? { alternates: { languages: Object.fromEntries(versions.map((item) => [item.language, getArticleUrl(item)])) } } : {}),
    };
  });
  const listUrls = Object.fromEntries(LANGUAGES.map((language) => [language, `${SITE_URL}${getArticlesPath(language)}`]));

  return [
    ...homePages,
    ...LANGUAGES.map((language) => ({ url: listUrls[language], alternates: { languages: listUrls } })),
    ...articlePages,
    { url: `${SITE_URL}/legal.html` },
    { url: `${SITE_URL}/privacypolicy` },
  ];
}
