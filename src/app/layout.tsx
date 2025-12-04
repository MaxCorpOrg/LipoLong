import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import DotNav from "@/components/DotNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LipoLong — безопасная коррекция контуров тела",
  description:
    "Безоперационная липомодификация LipoLong: быстрый эффект, современный подход и безопасное восстановление.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className="bg-[#01070a] text-[var(--lipolong-text-soft)] antialiased">
        <Header />
        {children}
        <DotNav />
        <Footer />
      </body>
    </html>
  );
}
