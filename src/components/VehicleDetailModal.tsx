"use client";

import { useState } from "react";
import Image from "next/image";
import { Vehicle } from "@/types/vehicle";
import { PORT_SHIPPING_RATES } from "@/lib/data/vehicles";
import { PortSelectorModal } from "./PortSelectorModal";
import {
  X,
  ShieldCheck,
  Ship,
  Clock,
  Gauge,
  BatteryCharging,
  Globe,
  FileCheck2,
  DollarSign,
  MessageSquare
} from "lucide-react";

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onOpenInquiry: (vehicleName: string, selectedPort?: string) => void;
}

export function VehicleDetailModal({
  vehicle,
  onClose,
  onOpenInquiry,
}: VehicleDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPortIndex, setSelectedPortIndex] = useState(0);
  const [shippingMode, setShippingMode] = useState<"roro" | "container">("roro");

  if (!vehicle) return null;

  const currentPort = PORT_SHIPPING_RATES[selectedPortIndex];
  const freightCost = shippingMode === "roro" ? currentPort.roro_usd : currentPort.container_40ft_usd;
  const estimatedTotalCif = vehicle.price_fob_usd + freightCost;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
              {vehicle.year} {vehicle.brand}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              {vehicle.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                {vehicle.name}
              </h2>
              <p className="text-sm text-neutral-500 mt-0.5">
                {vehicle.fuel_type} • {vehicle.body_type} • {vehicle.drive_type || "AWD"}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider block">FOB Shanghai</span>
              <span className="text-3xl font-black text-neutral-950">${vehicle.price_fob_usd.toLocaleString()}</span>
              <span className="text-sm text-neutral-500 font-normal"> USD</span>
            </div>
          </div>

          {/* Gallery Showcase */}
          <div>
            <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden bg-neutral-100">
              <Image
                src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                alt={vehicle.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            {vehicle.images.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto no-scrollbar py-1">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? "border-neutral-950 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technical Specs Grid (NIO style) */}
          <div>
            <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-neutral-500" />
              Technical Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                <div className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  Range (CLTC)
                </div>
                <div className="text-lg font-bold text-neutral-900 mt-1">{vehicle.range_km ? `${vehicle.range_km} km` : "N/A"}</div>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                <div className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                  Acceleration
                </div>
                <div className="text-lg font-bold text-neutral-900 mt-1">{vehicle.acceleration_0_100 || "N/A"}</div>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                <div className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                  Top Speed
                </div>
                <div className="text-lg font-bold text-neutral-900 mt-1">{vehicle.top_speed_kmh ? `${vehicle.top_speed_kmh} km/h` : "N/A"}</div>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                <div className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-neutral-400" />
                  Battery Pack
                </div>
                <div className="text-lg font-bold text-neutral-900 mt-1">{vehicle.battery_kwh ? `${vehicle.battery_kwh} kWh` : "Combustion"}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {vehicle.description && (
            <div className="bg-neutral-50/70 p-4 rounded-2xl border border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Vehicle Overview</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">{vehicle.description}</p>
            </div>
          )}

          {/* Interactive Door-to-Port Shipping Calculator */}
          <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-2xl border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Ship className="w-5 h-5 text-blue-600" />
                  Door-to-Port Shipping Calculator
                </h3>
                <p className="text-xs text-neutral-500">Calculate estimated ocean freight & landed CIF cost from Shanghai Port.</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Live Estimates
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Destination Port Select */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">Destination Port & Country</label>
                <PortSelectorModal
                  selectedPortIndex={selectedPortIndex}
                  onSelectPortIndex={setSelectedPortIndex}
                  shippingMode={shippingMode}
                />
              </div>

              {/* Shipping Method */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">Shipping Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShippingMode("roro")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      shippingMode === "roro"
                        ? "bg-neutral-950 text-white border-neutral-950"
                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    Ro-Ro Vessel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingMode("container")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      shippingMode === "container"
                        ? "bg-neutral-950 text-white border-neutral-950"
                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    40ft Container
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Breakdown Box */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Vehicle FOB Shanghai Price:</span>
                <span className="font-semibold text-neutral-900">${vehicle.price_fob_usd.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Estimated Ocean Freight ({currentPort.port}):</span>
                <span className="font-semibold text-neutral-900">+${freightCost.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  Estimated Transit Time:
                </span>
                <span className="font-semibold text-neutral-900">~{currentPort.transit_days} Days</span>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900">Estimated Total Landed (CIF):</span>
                <span className="text-xl font-black text-red-600">${estimatedTotalCif.toLocaleString()} USD</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 mt-2">
              * Rates include export customs clearance at Shanghai Port, bill of lading, and battery MSDS/UN38.3 declaration. Destination tariffs & VAT excluded.
            </p>
          </div>

          {/* Export Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">150-Point Inspection</div>
                <div className="text-[11px] text-neutral-500">Full video walkthrough & chassis diagnostics before export.</div>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-2.5">
              <FileCheck2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Export License Ready</div>
                <div className="text-[11px] text-neutral-500">Official Chinese Ministry of Commerce export credentials.</div>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-2.5">
              <DollarSign className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Escrow Payment</div>
                <div className="text-[11px] text-neutral-500">Secure bank transfer or letter of credit (L/C).</div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer (Action Buttons) */}
        <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`https://wa.me/8618812345678?text=Hello%20ShanghaiExport,%20I%20am%20interested%20in%20${encodeURIComponent(vehicle.name)}%20shipped%20to%20${encodeURIComponent(currentPort.port)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Chat via WhatsApp</span>
          </a>

          <div className="w-full sm:w-auto flex items-center gap-3">
            <button
              onClick={onClose}
              className="hidden sm:inline-flex px-5 py-3 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700 hover:bg-white"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInquiry(vehicle.name, currentPort.port);
              }}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-full bg-neutral-950 text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md active:scale-95 text-center"
            >
              Request Official Quotation & Invoice
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
