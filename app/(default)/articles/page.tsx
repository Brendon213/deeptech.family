import { ArticlesList } from "@/components/ArticlesPage";
import { getListMetadata } from "@/lib/article-metadata";

export const metadata = getListMetadata("ru");

export default function Page() {
  return <ArticlesList language="ru" />;
}
