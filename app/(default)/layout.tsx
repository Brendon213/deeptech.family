import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import ScrollReveal from "@/components/ScrollReveal";
import { inter } from "@/lib/site-font";
import { getHomeMetadata } from "@/lib/seo-metadata";
import "../globals.css";

export const metadata: Metadata = getHomeMetadata("ru");

export default function DefaultRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" dir="ltr">
      <body className={inter.className}>
        <LanguageProvider initialLanguage="ru">
          <ScrollReveal />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
