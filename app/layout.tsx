import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const SITE_URL = "https://deeptech.family";
const SITE_NAME = "DeepTech Family";
const SITE_TITLE = "DeepTech Family — международные технологические решения";
const SITE_DESCRIPTION =
  "Международные решения для развития технологических проектов, сотрудничества и выхода на рынки.";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | DeepTech Family",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
