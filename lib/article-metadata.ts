import type { Metadata } from "next";
import type { Language } from "@/lib/site-preferences";
import type { Article } from "@/lib/articles";
import { getArticles, getArticleUrl } from "@/lib/articles";
import { articleUi } from "@/lib/article-ui";
import { getArticlesPath, LANGUAGES, SITE_URL } from "@/lib/localized-routes";

export function getListMetadata(language: Language): Metadata {
  const title = `${articleUi[language].title} | DeepTech Family`;
  const description = articleUi[language].lead;
  const url = `${SITE_URL}${getArticlesPath(language)}`;
  const languages = Object.fromEntries(LANGUAGES.map((code) => [code, `${SITE_URL}${getArticlesPath(code)}`]));
  return {
    metadataBase: new URL(SITE_URL), title, description,
    alternates: { canonical: url, languages: { ...languages, "x-default": languages.ru } },
    openGraph: { type: "website", url, siteName: "DeepTech Family", title, description },
  };
}

export function getArticleMetadata(article: Article): Metadata {
  const url = getArticleUrl(article);
  const versions = getArticles().filter((item) => item.slug === article.slug);
  const languages = Object.fromEntries(versions.map((item) => [item.language, getArticleUrl(item)]));
  return {
    metadataBase: new URL(SITE_URL), title: `${article.title} | DeepTech Family`,
    description: article.description,
    alternates: { canonical: url, languages: versions.length > 1 ? languages : undefined },
    openGraph: { type: "article", url, siteName: "DeepTech Family", title: article.title,
      description: article.description, publishedTime: `${article.date}T00:00:00.000Z` },
  };
}
