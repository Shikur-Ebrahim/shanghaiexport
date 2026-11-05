"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Vehicle } from "@/types/vehicle";
import { fetchVehicles } from "@/lib/services/vehicles";
import { Navbar } from "@/components/Navbar";
import { HeroNio } from "@/components/HeroNio";
import { VehicleCatalog } from "@/components/VehicleCatalog";
import { HowItWorks } from "@/components/HowItWorks";
import { ShippingAssurance } from "@/components/ShippingAssurance";
import { Footer } from "@/components/Footer";
import { MessageSquare, FileText } from "lucide-react";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeBrandFilter, setActiveBrandFilter] = useState("");

  useEffect(() => {
    fetchVehicles().then((data) => setVehicles(data));
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Minimal Title Header */}
        <HeroNio />

        {/* Vehicle Catalog with Filters */}
        <VehicleCatalog
          vehicles={vehicles}
          activeBrandFilter={activeBrandFilter}
        />

        {/* 5-Step Export Pipeline */}
        <HowItWorks />

        {/* Quality, UN38.3 & Shipping Standards */}
        <ShippingAssurance />
      </main>

      {/* Footer */}
      <Footer />

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

        <Link
          href="/quote"
          className="flex-1 min-h-[50px] px-4 rounded-full bg-neutral-950 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-xl active:scale-95"
        >
          <FileText className="w-4 h-4" />
          <span>Get Quote</span>
        </Link>
      </div>

    </div>
  );
}
