import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/ArticlesPage";
import { getArticle, getArticles } from "@/lib/articles";
import { getArticleMetadata } from "@/lib/article-metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().filter((article) => article.language === "ru").map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug, "ru");
  return article ? getArticleMetadata(article) : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug, "ru");
  if (!article) notFound();
  return <ArticleDetail article={article} />;
}
