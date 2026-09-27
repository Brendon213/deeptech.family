import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/ArticlesPage";
import { getArticle, getArticles } from "@/lib/articles";
import { getArticleMetadata } from "@/lib/article-metadata";
import { isLanguage, LOCALIZED_LANGUAGES } from "@/lib/localized-routes";

type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().filter((article) => article.language !== "ru").map(({ slug, language }) => ({ slug, locale: language }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = isLanguage(locale) && locale !== "ru" ? getArticle(slug, locale) : undefined;
  return article ? getArticleMetadata(article) : {};
}
export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  if (!LOCALIZED_LANGUAGES.includes(locale as (typeof LOCALIZED_LANGUAGES)[number])) notFound();
  const article = getArticle(slug, locale as (typeof LOCALIZED_LANGUAGES)[number]);
  if (!article) notFound();
  return <ArticleDetail article={article} />;
}
