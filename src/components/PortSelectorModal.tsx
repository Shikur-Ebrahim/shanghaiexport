"use client";

import { useState, useMemo } from "react";
import { PortRate } from "@/types/vehicle";
import { PORT_SHIPPING_RATES } from "@/lib/data/vehicles";
import {
  Ship,
  Search,
  X,
  Check,
  ChevronDown,
  Clock,
  Compass,
  MapPin,
  Sparkles
} from "lucide-react";

interface PortSelectorModalProps {
  selectedPortIndex: number;
  onSelectPortIndex: (index: number) => void;
  shippingMode?: "roro" | "container";
}

const REGION_FLAGS: Record<string, string> = {
  "United Arab Emirates": "🇦🇪",
  "Saudi Arabia": "🇸🇦",
  "Qatar": "🇶🇦",
  "Oman": "🇴🇲",
  "Uzbekistan": "🇺🇿",
  "Kazakhstan": "🇰🇿",
  "Kyrgyzstan": "🇰🇬",
  "Azerbaijan": "🇦🇿",
  "Djibouti": "🇩🇯",
  "Kenya": "🇰🇪",
  "Nigeria": "🇳🇬",
  "Egypt": "🇪🇬",
  "Ghana": "🇬🇭",
  "Netherlands": "🇳🇱",
  "Belgium": "🇧🇪",
  "Germany": "🇩🇪",
  "Greece": "🇬🇷",
  "Brazil": "🇧🇷",
  "Chile": "🇨🇱",
};

export function PortSelectorModal({
  selectedPortIndex,
  onSelectPortIndex,
  shippingMode = "roro",
}: PortSelectorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const currentPort = PORT_SHIPPING_RATES[selectedPortIndex] || PORT_SHIPPING_RATES[0];
  const currentFlag = REGION_FLAGS[currentPort.country] || "🌐";

  // Regions list
  const regions = useMemo(() => {
    const set = new Set<string>();
    PORT_SHIPPING_RATES.forEach((p) => set.add(p.region));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered port list
  const filteredPorts = useMemo(() => {
    return PORT_SHIPPING_RATES.map((port, originalIndex) => ({
      ...port,
      originalIndex,
    })).filter((port) => {
      const matchesRegion = selectedRegion === "All" || port.region === selectedRegion;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        port.port.toLowerCase().includes(query) ||
        port.country.toLowerCase().includes(query) ||
        port.region.toLowerCase().includes(query);
      return matchesRegion && matchesSearch;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <>
      {/* Trigger Button (Mobile-First Attractive Selector Card) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full text-left p-3 sm:p-3.5 bg-neutral-50/80 hover:bg-neutral-100/80 active:bg-neutral-100 rounded-2xl border-2 border-neutral-200/90 hover:border-neutral-900/30 transition-all flex items-center justify-between gap-3 group active:scale-[0.99] cursor-pointer"
        aria-label="Select Destination Port"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
            {currentFlag}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {currentPort.country}
              </span>
              <span className="text-[10px] font-semibold text-neutral-400">•</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                {currentPort.region}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-black text-neutral-900 truncate">
              {currentPort.port}
            </h4>

            <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5">
                <Clock className="w-3 h-3 text-neutral-400" />
                ~{currentPort.transit_days} Days
              </span>
              <span>•</span>
              <span className="font-semibold text-neutral-700">
                {shippingMode === "roro" ? `Ro-Ro $${currentPort.roro_usd.toLocaleString()}` : `Container $${currentPort.container_40ft_usd.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-bold text-neutral-600 hidden sm:inline-block bg-white px-2.5 py-1 rounded-lg border border-neutral-200">
            Change
          </span>
          <div className="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-neutral-900 group-hover:border-neutral-400 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* Modal / Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4">
          
          {/* Backdrop dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal / Sheet Container */}
          <div className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-neutral-200 max-h-[90vh] sm:max-h-[82vh] flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            
            {/* Sheet Handle for Mobile */}
            <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
              <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-4 sm:px-6 pt-3 pb-3 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-neutral-950">
                    Select Destination Port
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Door-to-port ocean freight & transit schedules from Shanghai
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-neutral-100 bg-neutral-50/50">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by country, port name, or region..."
                  className="w-full h-10 pl-9.5 pr-4 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Region Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-0.5">
                {regions.map((region) => {
                  const isRegionActive = selectedRegion === region;
                  return (
                    <button
                      key={region}
                      type="button"
                      onClick={() => setSelectedRegion(region)}
                      className={`h-7 px-3 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isRegionActive
                          ? "bg-neutral-950 text-white shadow-xs"
                          : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                      }`}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Ports List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 divide-y divide-neutral-100 no-scrollbar">
              {filteredPorts.length > 0 ? (
                filteredPorts.map((port) => {
                  const isSelected = port.originalIndex === selectedPortIndex;
                  const flag = REGION_FLAGS[port.country] || "🌐";

                  return (
                    <button
                      key={`${port.country}-${port.port}`}
                      type="button"
                      onClick={() => {
                        onSelectPortIndex(port.originalIndex);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] ${
                        isSelected
                          ? "bg-neutral-900 text-white shadow-sm"
                          : "hover:bg-neutral-50 active:bg-neutral-100 text-neutral-900"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0 p-1 bg-neutral-100/60 rounded-xl">
                          {flag}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider ${
                                isSelected ? "text-neutral-300" : "text-neutral-500"
                              }`}
                            >
                              {port.country}
                            </span>
                            <span className="text-[10px] opacity-40">•</span>
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-neutral-100 text-neutral-600"
                              }`}
                            >
                              {port.region}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-black truncate mt-0.5">
                            {port.port}
                          </h4>

                          <div
                            className={`text-[11px] flex items-center gap-2 mt-1 ${
                              isSelected ? "text-neutral-300" : "text-neutral-500"
                            }`}
                          >
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              ~{port.transit_days} Days
                            </span>
                            <span>•</span>
                            <span>Ro-Ro: <strong>${port.roro_usd.toLocaleString()}</strong></span>
                            <span>•</span>
                            <span>40ft: <strong>${port.container_40ft_usd.toLocaleString()}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Right Indicator */}
                      <div className="shrink-0 flex items-center">
                        {isSelected ? (
                          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-neutral-300 group-hover:border-neutral-500 flex items-center justify-center text-transparent">
                            •
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-neutral-500">
                  <p className="text-sm font-bold">No destination ports found</p>
                  <p className="text-xs mt-1">Try another search keyword or select All regions.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 border-t border-neutral-100 bg-neutral-50/70 flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1 font-semibold text-neutral-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {PORT_SHIPPING_RATES.length} Direct Global Ports Supported
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-950 text-white font-bold hover:bg-neutral-800 transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
