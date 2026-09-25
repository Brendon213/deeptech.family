import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import ScrollReveal from "@/components/ScrollReveal";
import { inter } from "@/lib/site-font";
import "../globals.css";

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
