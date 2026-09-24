import type { Metadata } from "next";
import { cookies } from "next/headers";
import PrivacyContent from "@/components/PrivacyContent";
import { getPageMetadata } from "@/lib/site-metadata";
import { LANGUAGE_COOKIE, parseLanguage } from "@/lib/site-preferences";

const SITE_URL = "https://deeptech.family";
const SITE_NAME = "DeepTech Family";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = parseLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const page = getPageMetadata(language, "privacy");

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/privacy" },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/privacy`,
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

export default function PrivacyPage() {
  return <PrivacyContent />;
}
