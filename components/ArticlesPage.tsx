import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GraphNetwork from "@/components/GraphNetwork";
import ReactMarkdown from "react-markdown";
import type { Language } from "@/lib/site-preferences";
import { getArticleCards, getArticles, getArticleUrl } from "@/lib/articles";
import type { Article } from "@/lib/articles";
import { articleUi } from "@/lib/article-ui";
import { getArticlesPath } from "@/lib/localized-routes";

function ArticleShell({ children, languages }: { children: React.ReactNode; languages?: Language[] }) {
  return <>
    <GraphNetwork />
    <Header availableArticleLanguages={languages} />
    <main className="articles-page"><div className="container articles-container">{children}</div></main>
    <Footer />
  </>;
}

export function ArticlesList({ language }: { language: Language }) {
  const labels = articleUi[language];
  const cards = getArticleCards(language);
  return <ArticleShell>
    <header className="articles-heading">
      <p className="eyebrow">DeepTech Family</p>
      <h1>{labels.title}</h1>
      <p>{labels.lead}</p>
    </header>
    {cards.length ? <div className="article-grid">{cards.map((article) => <article className="glass-panel article-card" key={article.slug}>
      <div className="article-meta"><time dateTime={article.date}>{new Intl.DateTimeFormat(language, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${article.date}T00:00:00Z`))}</time>{article.category && <span>{article.category}</span>}</div>
      <h2 lang={article.language}><a href={getArticleUrl(article)}>{article.title}</a></h2>
      <p lang={article.language}>{article.description}</p>
      {article.language !== language && <span className="article-language-note">{labels.other}</span>}
      <a className="article-read" href={getArticleUrl(article)}>{labels.read} →</a>
    </article>)}</div> : <p>{labels.empty}</p>}
  </ArticleShell>;
}

export function ArticleDetail({ article }: { article: Article }) {
  const labels = articleUi[article.language];
  const languages = getArticles().filter((item) => item.slug === article.slug).map((item) => item.language);
  return <ArticleShell languages={languages}>
    <a className="article-back" href={getArticlesPath(article.language)}>← {labels.back}</a>
    <article className="article-detail">
      <div className="article-meta"><time dateTime={article.date}>{new Intl.DateTimeFormat(article.language, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${article.date}T00:00:00Z`))}</time>{article.category && <span>{article.category}</span>}</div>
      <h1>{article.title}</h1>
      <p className="article-description">{article.description}</p>
      <div className="article-body"><ReactMarkdown>{article.content}</ReactMarkdown></div>
    </article>
  </ArticleShell>;
}
