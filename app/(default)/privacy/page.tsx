import type { Metadata } from "next";
import PrivacyContent from "@/components/PrivacyContent";
import { getPrivacyMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = getPrivacyMetadata();

export default function PrivacyPage() {
  return <PrivacyContent />;
}
