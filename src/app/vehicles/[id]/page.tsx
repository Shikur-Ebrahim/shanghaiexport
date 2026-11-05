import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchVehicleById, fetchVehicles } from "@/lib/services/vehicles";
import { VehicleDetailView } from "@/components/VehicleDetailView";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await fetchVehicleById(id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | ShanghaiExport",
      description: "The requested vehicle could not be found.",
    };
  }

  const primaryImage = vehicle.images?.[0] || "/logo.png";

  return {
    title: `${vehicle.name} (${vehicle.year}) | Direct Export from China - ShanghaiExport`,
    description: `Order ${vehicle.name} (${vehicle.year}) directly from China. FOB Shanghai $${vehicle.price_fob_usd.toLocaleString()} USD. Full 150-point pre-shipment inspection, Ro-Ro / Container shipping worldwide.`,
    openGraph: {
      title: `${vehicle.name} - Direct China Vehicle Export`,
      description: `FOB $${vehicle.price_fob_usd.toLocaleString()} USD. Pure Electric & Hybrid export with UN38.3 compliance.`,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: vehicle.name,
        },
      ],
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await fetchVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const allVehicles = await fetchVehicles();
  const relatedVehicles = allVehicles.filter((v) => v.id !== id);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <VehicleDetailView vehicle={vehicle} relatedVehicles={relatedVehicles} />
      </main>
      <Footer />
    </div>
  );
}
