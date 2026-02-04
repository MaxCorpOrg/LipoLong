import Header from "@/components/Header";
import DotNav from "@/components/DotNav";
import Footer from "@/components/Footer";
import VisitLogger from "@/components/VisitLogger";
import LenisScroll from "@/components/LenisScroll";
import MaintenanceOverlay from "@/components/MaintenanceOverlay";
import { getMaintenanceState } from "@/lib/maintenance";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const maintenance = await getMaintenanceState();
  return (
    <>
      <VisitLogger />
      <LenisScroll />
      {maintenance.enabled ? <MaintenanceOverlay /> : null}
      <Header />
      {children}
      <DotNav />
      <Footer />
    </>
  );
}
