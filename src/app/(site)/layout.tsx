import Header from "@/components/Header";
import DotNav from "@/components/DotNav";
import Footer from "@/components/Footer";
import VisitLogger from "@/components/VisitLogger";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VisitLogger />
      <Header />
      {children}
      <DotNav />
      <Footer />
    </>
  );
}
