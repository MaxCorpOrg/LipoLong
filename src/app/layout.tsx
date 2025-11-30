import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import DotNav from "@/components/DotNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LipoLong — инъекционные методики и косметология",
  description: "Современная эстетическая медицина. Процедуры, эффекты, консультации.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-white text-black pt-16">
        <Header />
        {children}
        <DotNav />
        <Footer />
      </body>
    </html>
  );
}
