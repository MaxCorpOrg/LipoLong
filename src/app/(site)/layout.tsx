import Header from "@/components/Header";
import DotNav from "@/components/DotNav";
import Footer from "@/components/Footer";
import VisitLogger from "@/components/VisitLogger";
import LenisScroll from "@/components/LenisScroll";
import MaintenanceOverlay from "@/components/MaintenanceOverlay";
import { getMaintenanceState } from "@/lib/maintenance";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const maintenance = await getMaintenanceState();
  const headerList = await headers();
  const rawHost = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "";
  const host = rawHost.split(",")[0].trim().toLowerCase().split(":")[0];
  const isAllowedHost = host === "www.lipolong.com" || host === "localhost";
  return (
    <>
      <VisitLogger />
      <LenisScroll />
      {maintenance.enabled && isAllowedHost ? <MaintenanceOverlay /> : null}
      <Header />
      {children}
      <DotNav />
      <Footer />
    </>
  );
}
