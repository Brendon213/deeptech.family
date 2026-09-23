import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Согласованный текст политики конфиденциальности DeepTech Family будет опубликован после предоставления владельцем.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="container">
      <article>
        <h1>Политика конфиденциальности</h1>
        <p>
          Согласованный текст политики конфиденциальности пока не предоставлен.
        </p>
        <p>
          Страница будет обновлена после получения утверждённой редакции. До
          этого здесь не публикуются вымышленные юридические условия.
        </p>
        <p>
          <a href="/">Вернуться на главную</a>
        </p>
      </article>
    </main>
  );
}
