import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { LanguageProvider } from "@/components/LanguageProvider";
import MetadataSynchronizer from "@/components/MetadataSynchronizer";
import { getPageMetadata } from "@/lib/site-metadata";
import { LANGUAGE_COOKIE, parseLanguage } from "@/lib/site-preferences";
import "./globals.css";

const SITE_URL = "https://deeptech.family";
const SITE_NAME = "DeepTech Family";

const inter = localFont({
  src: [
    {
      path: "../public/assets/fonts/inter-cyrillic.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/inter-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = parseLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const page = getPageMetadata(language, "home");

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: page.locale,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language = parseLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);

  return (
    <html lang={language}>
      <body className={inter.className}>
        <LanguageProvider initialLanguage={language}>
          <MetadataSynchronizer />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
