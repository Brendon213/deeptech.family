import type { Metadata } from "next";
import LegalDocumentsContent from "@/components/LegalDocumentsContent";
import { SITE_URL } from "@/lib/localized-routes";

const title = "Правовые документы | DeepTech Family";
const description = "Политика конфиденциальности, обработка персональных данных, пользовательское соглашение и политика cookies сайта deeptech.family.";
const canonical = new URL("/legal.html", SITE_URL).toString();

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

export default function LegalDocumentsPage() {
  return <LegalDocumentsContent />;
}
