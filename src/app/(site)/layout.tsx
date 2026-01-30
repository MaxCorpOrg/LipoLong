import Header from "@/components/Header";
import DotNav from "@/components/DotNav";
import Footer from "@/components/Footer";
import VisitLogger from "@/components/VisitLogger";
import LenisScroll from "@/components/LenisScroll";
import MaintenanceOverlay from "@/components/MaintenanceOverlay";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VisitLogger />
      <LenisScroll />
      <MaintenanceOverlay />
      <Header />
      {children}
      <DotNav />
      <Footer />
    </>
  );
}
