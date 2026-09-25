import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";
import { SITE_URL } from "@/lib/localized-routes";

const title = "Политика в отношении обработки персональных данных | DeepTech Family";
const description =
  "Политика в отношении обработки персональных данных пользователей сайта deeptech.family.";
const canonical = new URL("/privacypolicy", SITE_URL).toString();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: "DeepTech Family",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
