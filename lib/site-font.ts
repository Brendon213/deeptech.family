import localFont from "next/font/local";

export const inter = localFont({
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
