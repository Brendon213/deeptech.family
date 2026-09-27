import { ArticlesList } from "@/components/ArticlesPage";
import { getListMetadata } from "@/lib/article-metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = getListMetadata("ru");

export default function Page() {
  return <ArticlesList language="ru" />;
}
