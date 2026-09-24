"use client";

import { useEffect } from "react";

const revealTargets = [
  ".section-heading",
  ".entry-box",
  ".hero-stats .stat-card",
  ".challenge-card",
  ".module-card",
  ".role-card",
  ".infrastructure-toolbar",
  ".infrastructure-card",
  ".infrastructure-cta",
  ".contact-card",
  ".site-footer .footer-main",
  ".site-footer .footer-bottom",
  ".site-footer .footer-legal",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(revealTargets),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-revealed");
          observer.unobserve(target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
