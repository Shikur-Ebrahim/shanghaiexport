"use client";

import { useState, useEffect } from "react";
import { Vehicle } from "@/types/vehicle";
import { fetchVehicles } from "@/lib/services/vehicles";
import { Navbar } from "@/components/Navbar";
import { HeroNio } from "@/components/HeroNio";
import { VehicleCatalog } from "@/components/VehicleCatalog";
import { HowItWorks } from "@/components/HowItWorks";
import { ShippingAssurance } from "@/components/ShippingAssurance";
import { Footer } from "@/components/Footer";
import { VehicleDetailModal } from "@/components/VehicleDetailModal";
import { InquiryModal } from "@/components/InquiryModal";
import { MessageSquare } from "lucide-react";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [targetCarName, setTargetCarName] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [activeBrandFilter, setActiveBrandFilter] = useState("");

  useEffect(() => {
    fetchVehicles().then((data) => setVehicles(data));
  }, []);

  const handleOpenInquiry = (carName?: string, port?: string) => {
    setTargetCarName(carName || "");
    setTargetPort(port || "");
    setInquiryModalOpen(true);
  };

  const handleSelectCar = (car: Vehicle) => {
    setSelectedVehicle(car);
  };

  const handleSelectCarById = (carId: string) => {
    const found = vehicles.find((v) => v.id === carId);
    if (found) setSelectedVehicle(found);
  };

  const handleSearchFilters = (filters: { brand: string; bodyType: string; maxPrice: number }) => {
    if (filters.brand) {
      setActiveBrandFilter(filters.brand);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* NIO-Inspired Minimalist Automotive Hero */}
        <HeroNio
          onSearch={handleSearchFilters}
          onSelectCar={handleSelectCarById}
        />

        {/* Vehicle Catalog with Filters */}
        <VehicleCatalog
          vehicles={vehicles}
          onSelectCar={handleSelectCar}
          onOpenInquiry={handleOpenInquiry}
          activeBrandFilter={activeBrandFilter}
        />

        {/* 5-Step Export Pipeline */}
        <HowItWorks />

        {/* Quality, UN38.3 & Shipping Standards */}
        <ShippingAssurance />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Vehicle Details Modal & Door-to-Port Shipping Calculator */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Official RFQ / Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultVehicleName={targetCarName}
        defaultPort={targetPort}
      />

      {/* Mobile Floating Quick Action Bar (Mobile-first hit targets) */}
      <div className="fixed bottom-4 inset-x-4 sm:hidden z-30 flex items-center gap-2">
        <a
          href="https://wa.me/8618812345678?text=Hello%20ShanghaiExport"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[50px] px-4 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95"
        >
          <MessageSquare className="w-5 h-5" />
          <span>WhatsApp Chat</span>
        </a>

        <button
          onClick={() => handleOpenInquiry()}
          className="flex-1 min-h-[50px] px-4 rounded-full bg-neutral-950 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-xl active:scale-95"
        >
          <span>Get Quote</span>
        </button>
      </div>

    </div>
  );
}
