import "server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Language } from "@/lib/site-preferences";
import { getArticlesPath, LANGUAGES, SITE_URL } from "@/lib/localized-routes";

export type Article = {
  title: string;
  description: string;
  slug: string;
  date: string;
  category?: string;
  language: Language;
  content: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getArticlesDirectory() {
  const configured = process.env.ARTICLES_DIR?.trim();
  const candidates = [
    ...(configured ? [path.resolve(configured)] : []),
    path.resolve(process.cwd(), "../content/articles"),
    path.join(process.cwd(), "content/articles"),
  ];

  const directory = candidates.find((candidate) => existsSync(candidate));
  if (!directory) {
    throw new Error(`Articles directory not found. Checked: ${candidates.join(", ")}`);
  }

  return directory;
}

export function getArticles(): Article[] {
  const directory = getArticlesDirectory();
  const seen = new Set<string>();

  return readdirSync(directory)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .map((name) => {
      const { data, content } = matter(readFileSync(path.join(directory, name), "utf8"));
      const { title, description, slug, date, category, language } = data;

      if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof description !== "string" ||
        !description.trim() ||
        typeof slug !== "string" ||
        !slugPattern.test(slug) ||
        typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(Date.parse(`${date}T00:00:00Z`)) ||
        !LANGUAGES.includes(language) ||
        (category != null && typeof category !== "string") ||
        !content.trim()
      ) {
        throw new Error(`Invalid article fields in content/articles/${name}`);
      }

      if (name !== `${slug}.${language}.md`) {
        throw new Error(`Article filename must be ${slug}.${language}.md`);
      }

      const key = `${slug}:${language}`;
      if (seen.has(key)) throw new Error(`Duplicate article ${key}`);
      seen.add(key);

      return { title, description, slug, date, category, language, content };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getArticle(slug: string, language: Language) {
  return getArticles().find((article) => article.slug === slug && article.language === language);
}

export function getArticleUrl(article: Article) {
  return `${SITE_URL}${getArticlesPath(article.language, article.slug)}`;
}

// Show one card per topic: prefer the visitor's language, otherwise Russian.
export function getArticleCards(language: Language) {
  const selected = new Map<string, Article>();

  for (const article of getArticles()) {
    const current = selected.get(article.slug);
    if (
      !current ||
      article.language === language ||
      (current.language !== language && article.language === "ru")
    ) {
      selected.set(article.slug, article);
    }
  }

  return [...selected.values()].sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  );
}
