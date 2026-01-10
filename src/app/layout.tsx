import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LipoLong — контурная коррекция без операции",
  description:
    "Безопасная липомодификация LipoLong: быстрый эффект, мягкая процедура, корректирует контуры тела без длительной реабилитации.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body
        className={`${spaceGrotesk.className} bg-[#01070a] text-[var(--lipolong-text-soft)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
