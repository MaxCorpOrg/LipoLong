import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import DotNav from "@/components/DotNav";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LipoLong — контурная коррекция без операции",
  description:
    "Безопасная липомодификация LipoLong: быстрый эффект, мягкая процедура, корректирует контуры тела без длительной реабилитации.",
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
        <Header />
        {children}
        <DotNav />
        <Footer />
      </body>
    </html>
  );
}
