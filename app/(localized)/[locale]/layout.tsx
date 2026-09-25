import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/LanguageProvider";
import ScrollReveal from "@/components/ScrollReveal";
import { inter } from "@/lib/site-font";
import { getHomeMetadata } from "@/lib/seo-metadata";
import { isLanguage, LOCALIZED_LANGUAGES } from "@/lib/localized-routes";
import type { Language } from "@/lib/site-preferences";
import "../../globals.css";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLanguage(locale) || locale === "ru") return {};
  return getHomeMetadata(locale);
}

export default async function LocalizedRootLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLanguage(locale) || locale === "ru") notFound();
  const language: Exclude<Language, "ru"> = locale;

  return (
    <html lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <LanguageProvider key={language} initialLanguage={language}>
          <ScrollReveal />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
