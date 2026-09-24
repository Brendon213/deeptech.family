"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { getPageMetadata } from "@/lib/site-metadata";

function updateMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

export default function MetadataSynchronizer() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const page = pathname === "/privacy" ? "privacy" : "home";
  const metadata = getPageMetadata(language, page);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = metadata.title;
    updateMeta('meta[name="description"]', metadata.description);
    updateMeta('meta[property="og:title"]', metadata.title);
    updateMeta('meta[property="og:description"]', metadata.description);
    updateMeta('meta[property="og:locale"]', metadata.locale);
    updateMeta('meta[name="twitter:title"]', metadata.title);
    updateMeta('meta[name="twitter:description"]', metadata.description);
  }, [language, metadata]);

  return null;
}
