"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/types/vehicle";
import { PORT_SHIPPING_RATES } from "@/lib/data/vehicles";
import { InquiryModal } from "./InquiryModal";
import {
  ArrowLeft,
  Ship,
  Clock,
  Gauge,
  BatteryCharging,
  Globe,
  ShieldCheck,
  FileCheck2,
  DollarSign,
  MessageSquare,
  Share2,
  Calendar,
  CheckCircle2
} from "lucide-react";

interface VehicleDetailViewProps {
  vehicle: Vehicle;
  relatedVehicles: Vehicle[];
}

export function VehicleDetailView({ vehicle, relatedVehicles }: VehicleDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPortIndex, setSelectedPortIndex] = useState(0);
  const [shippingMode, setShippingMode] = useState<"roro" | "container">("roro");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const currentPort = PORT_SHIPPING_RATES[selectedPortIndex];
  const freightCost = shippingMode === "roro" ? currentPort.roro_usd : currentPort.container_40ft_usd;
  const estimatedTotalCif = vehicle.price_fob_usd + freightCost;

  const whatsappMessage = `Hello ShanghaiExport! I am interested in ordering:
Vehicle: ${vehicle.name} (${vehicle.year})
FOB Price: $${vehicle.price_fob_usd.toLocaleString()} USD
Destination: ${currentPort.port}, ${currentPort.country} (${shippingMode === "roro" ? "Ro-Ro" : "40ft Container"})
Estimated CIF: $${estimatedTotalCif.toLocaleString()} USD`;

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-16">
      
      {/* Top Breadcrumb & Back Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/#inventory"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Vehicles</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {vehicle.status} for Export
            </span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: vehicle.name, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              title="Share Vehicle"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        
        {/* Main Grid: Gallery on left, Pricing & Details on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Left Column: Gallery & Tech Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title Block (Mobile view) */}
            <div className="lg:hidden">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                  {vehicle.year} {vehicle.brand}
                </span>
                <span className="text-[11px] font-semibold text-neutral-500">
                  {vehicle.body_type} • {vehicle.fuel_type}
                </span>
              </div>
              <h1 className="text-2xl font-black text-neutral-950 mt-1 leading-tight">
                {vehicle.name}
              </h1>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-xs text-neutral-400 uppercase font-medium">FOB Shanghai</span>
                <span className="text-2xl font-black text-red-600">${vehicle.price_fob_usd.toLocaleString()}</span>
                <span className="text-xs text-neutral-500">USD</span>
              </div>
            </div>

            {/* Main Featured Photo */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <Image
                src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                alt={vehicle.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
            </div>

            {/* Clickable Thumbnails */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? "border-neutral-950 scale-105 shadow-sm"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Performance Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="bg-neutral-50 p-3 sm:p-4 rounded-xl border border-neutral-200/80 text-center">
                <div className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  CLTC Range
                </div>
                <div className="text-lg sm:text-2xl font-black text-neutral-950 mt-1">
                  {vehicle.range_km ? `${vehicle.range_km} km` : "N/A"}
                </div>
              </div>

              <div className="bg-neutral-50 p-3 sm:p-4 rounded-xl border border-neutral-200/80 text-center">
                <div className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                  0-100 km/h
                </div>
                <div className="text-lg sm:text-2xl font-black text-neutral-950 mt-1">
                  {vehicle.acceleration_0_100 || "N/A"}
                </div>
              </div>

              <div className="bg-neutral-50 p-3 sm:p-4 rounded-xl border border-neutral-200/80 text-center">
                <div className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                  Top Speed
                </div>
                <div className="text-lg sm:text-2xl font-black text-neutral-950 mt-1">
                  {vehicle.top_speed_kmh ? `${vehicle.top_speed_kmh} km/h` : "N/A"}
                </div>
              </div>

              <div className="bg-neutral-50 p-3 sm:p-4 rounded-xl border border-neutral-200/80 text-center">
                <div className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-neutral-400" />
                  Battery Pack
                </div>
                <div className="text-lg sm:text-2xl font-black text-neutral-950 mt-1">
                  {vehicle.battery_kwh ? `${vehicle.battery_kwh} kWh` : "Combustion"}
                </div>
              </div>
            </div>

            {/* Technical Specifications Details Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
              <div className="px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50">
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                  Vehicle Specifications Sheet
                </h3>
              </div>
              <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-neutral-500 font-medium">Brand & Manufacturer</span>
                  <span className="font-bold text-neutral-900">{vehicle.brand}</span>
                </div>
                <div className="px-5 py-3 flex justify-between bg-neutral-50/30">
                  <span className="text-neutral-500 font-medium">Model</span>
                  <span className="font-bold text-neutral-900">{vehicle.model}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-neutral-500 font-medium">Model Year</span>
                  <span className="font-bold text-neutral-900">{vehicle.year}</span>
                </div>
                <div className="px-5 py-3 flex justify-between bg-neutral-50/30">
                  <span className="text-neutral-500 font-medium">Body Style</span>
                  <span className="font-bold text-neutral-900">{vehicle.body_type}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-neutral-500 font-medium">Powertrain</span>
                  <span className="font-bold text-neutral-900">{vehicle.fuel_type}</span>
                </div>
                <div className="px-5 py-3 flex justify-between bg-neutral-50/30">
                  <span className="text-neutral-500 font-medium">Drivetrain</span>
                  <span className="font-bold text-neutral-900">{vehicle.drive_type || "AWD"}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-neutral-500 font-medium">Seating Capacity</span>
                  <span className="font-bold text-neutral-900">{vehicle.seating || 5} Seats</span>
                </div>
                <div className="px-5 py-3 flex justify-between bg-neutral-50/30">
                  <span className="text-neutral-500 font-medium">Export Clearance</span>
                  <span className="font-bold text-emerald-600">Shanghai Customs Approved</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Export Specialist Overview
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>
            )}

          </div>

          {/* Right Column: Pricing, Door-to-Port Shipping Calculator & Action (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Desktop Title & Pricing Header */}
            <div className="hidden lg:block bg-neutral-50/50 p-6 rounded-2xl border border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-200/70 px-2 py-0.5 rounded">
                  {vehicle.year} {vehicle.brand}
                </span>
                <span className="text-[11px] font-semibold text-neutral-500">
                  {vehicle.body_type} • {vehicle.fuel_type}
                </span>
              </div>
              <h1 className="text-3xl font-black text-neutral-950 mt-1.5 leading-tight">
                {vehicle.name}
              </h1>
              
              <div className="mt-4 pt-4 border-t border-neutral-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider block">FOB Shanghai</span>
                  <span className="text-3xl font-black text-red-600">${vehicle.price_fob_usd.toLocaleString()}</span>
                  <span className="text-xs text-neutral-500 font-medium"> USD</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Export Ready
                </span>
              </div>
            </div>

            {/* Door-to-Port Live Shipping Calculator */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    <Ship className="w-4 h-4 text-blue-600" />
                    Door-to-Port Shipping Calculator
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Live ocean freight from Shanghai Port.</p>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Port Rates
                </span>
              </div>

              {/* Destination Port Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Destination Country & Port
                </label>
                <select
                  value={selectedPortIndex}
                  onChange={(e) => setSelectedPortIndex(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm font-semibold p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                >
                  {PORT_SHIPPING_RATES.map((p, idx) => (
                    <option key={`${p.country}-${p.port}`} value={idx}>
                      {p.country} — {p.port} ({p.region})
                    </option>
                  ))}
                </select>
              </div>

              {/* Shipping Method (Ro-Ro vs Container) */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Shipping Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShippingMode("roro")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      shippingMode === "roro"
                        ? "bg-neutral-950 text-white border-neutral-950"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white"
                    }`}
                  >
                    Ro-Ro Carrier Vessel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingMode("container")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      shippingMode === "container"
                        ? "bg-neutral-950 text-white border-neutral-950"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white"
                    }`}
                  >
                    40ft Dedicated Container
                  </button>
                </div>
              </div>

              {/* Calculated Pricing Breakdown */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Vehicle FOB Shanghai Price:</span>
                  <span className="font-bold text-neutral-900">${vehicle.price_fob_usd.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Ocean Freight ({currentPort.port}):</span>
                  <span className="font-bold text-neutral-900">+${freightCost.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    Estimated Transit Time:
                  </span>
                  <span className="font-semibold text-neutral-900">~{currentPort.transit_days} Days</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-neutral-900">Total Estimated Landed (CIF):</span>
                  <span className="text-xl font-black text-red-600">${estimatedTotalCif.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Action Buttons (Mobile Screen First) */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full min-h-[50px] px-6 py-3 rounded-full bg-neutral-950 text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Request Official Proforma Invoice</span>
                </button>

                <a
                  href={`https://wa.me/8618812345678?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire on WhatsApp Now</span>
                </a>
              </div>
            </div>

            {/* Export Credentials & Compliance */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>150-Point Pre-Shipment Video Inspection Included</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>UN38.3 & MSDS Dangerous Goods Transport Declaration</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                <DollarSign className="w-4 h-4 text-neutral-700 shrink-0" />
                <span>Escrow Bank Wire (T/T) or Letter of Credit (L/C)</span>
              </div>
            </div>

          </div>

        </div>

        {/* Similar / Related Vehicles */}
        {relatedVehicles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6">
              More Chinese Export Vehicles
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {relatedVehicles.slice(0, 4).map((car) => (
                <Link
                  key={car.id}
                  href={`/vehicles/${car.id}`}
                  className="group bg-white rounded-xl border border-neutral-200 p-2.5 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100">
                    <Image src={car.images[0] || "/logo.png"} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="mt-2">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase">{car.brand}</div>
                    <h3 className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-red-600 transition-colors">{car.name}</h3>
                    <div className="text-sm font-extrabold text-red-600 mt-1">${car.price_fob_usd.toLocaleString()} <span className="text-[10px] text-neutral-400 font-normal">FOB</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultVehicleName={vehicle.name}
        defaultPort={currentPort.port}
      />

    </div>
  );
}
