import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlesList } from "@/components/ArticlesPage";
import { getListMetadata } from "@/lib/article-metadata";
import { isLanguage } from "@/lib/localized-routes";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLanguage(locale) && locale !== "ru" ? getListMetadata(locale) : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLanguage(locale) || locale === "ru") notFound();
  return <ArticlesList language={locale} />;
}
