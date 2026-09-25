"use client";

import Link from "next/link";
import { useEffect, useState, type KeyboardEvent } from "react";
import { legalDocuments, type LegalDocumentId } from "@/lib/legal-documents";

type LegalDocumentsContentProps = {
  privacyOnly?: boolean;
};

function isLegalDocumentId(value: string): value is LegalDocumentId {
  return legalDocuments.some((document) => document.id === value);
}

export default function LegalDocumentsContent({ privacyOnly = false }: LegalDocumentsContentProps) {
  const [activeDocumentId, setActiveDocumentId] = useState<LegalDocumentId>("privacy");
  const activeDocument = legalDocuments.find((document) => document.id === activeDocumentId) ?? legalDocuments[0];

  useEffect(() => {
    if (privacyOnly) return;

    const syncFromLocation = () => {
      const hash = window.location.hash.slice(1);
      if (isLegalDocumentId(hash)) setActiveDocumentId(hash);
    };

    syncFromLocation();
    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);
    return () => {
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, [privacyOnly]);

  const selectDocument = (id: LegalDocumentId) => {
    setActiveDocumentId(id);
    if (privacyOnly) return;

    const nextUrl = `${window.location.pathname}${window.location.search}#${id}`;
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", nextUrl);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = legalDocuments.findIndex((document) => document.id === activeDocumentId);
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % legalDocuments.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + legalDocuments.length) % legalDocuments.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = legalDocuments.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextDocument = legalDocuments[nextIndex];
    selectDocument(nextDocument.id);
    document.getElementById(`legal-tab-${nextDocument.id}`)?.focus();
  };

  const subtitle = privacyOnly
    ? "Политика конфиденциальности и обработка персональных данных"
    : "Политика конфиденциальности, обработка персональных данных и пользовательское соглашение в соответствии с законодательством РФ";

  return (
    <>
      <header className="legal-header">
        <div className="legal-header-inner">
          <Link className="legal-brand" href="/" aria-label="DEEPTECH — на главную">
            DEEP<span>TECH</span>
          </Link>
          <Link className="legal-back" href="/">
            <span aria-hidden="true">←</span> На главную
          </Link>
        </div>
      </header>

      <main className="legal-page">
        <div className="legal-container">
          <header className="legal-intro">
            <h1>Правовые документы</h1>
            <p className="legal-subtitle">{subtitle}</p>
            <p className="legal-date">
              Дата последнего обновления: <time dateTime="2026-05-03">03 мая 2026 г.</time>
            </p>
          </header>

          {!privacyOnly && (
            <div className="legal-tabs" role="tablist" aria-label="Правовые документы">
              {legalDocuments.map((document) => (
                <button
                  aria-controls="legal-document-panel"
                  aria-selected={activeDocumentId === document.id}
                  className={`legal-tab${activeDocumentId === document.id ? " active" : ""}`}
                  id={`legal-tab-${document.id}`}
                  key={document.id}
                  onClick={() => selectDocument(document.id)}
                  onKeyDown={handleTabKeyDown}
                  role="tab"
                  tabIndex={activeDocumentId === document.id ? 0 : -1}
                  type="button"
                >
                  {document.label}
                </button>
              ))}
            </div>
          )}

          <article
            aria-labelledby={privacyOnly ? undefined : `legal-tab-${activeDocument.id}`}
            className="legal-card"
            id="legal-document-panel"
            tabIndex={privacyOnly ? undefined : 0}
            role={privacyOnly ? undefined : "tabpanel"}
            dangerouslySetInnerHTML={{ __html: activeDocument.content }}
          />

          <p className="legal-bottom-link">
            <Link href="/">← На главную</Link>
          </p>
        </div>
      </main>
    </>
  );
}
