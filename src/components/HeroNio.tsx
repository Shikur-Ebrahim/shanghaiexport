"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Zap, Shield, Globe, Gauge, BatteryCharging, ArrowRight } from "lucide-react";

interface HeroNioProps {
  onSearch?: (filters: { brand: string; bodyType: string; maxPrice: number }) => void;
  onSelectCar: (carId: string) => void;
}

export function HeroNio({ onSelectCar }: HeroNioProps) {
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = [
    { name: "Mineral Silver", hex: "#C5C7CB", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80" },
    { name: "Deep Navy", hex: "#1A2E44", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80" },
    { name: "Polar White", hex: "#ECEFF1", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80" }
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-8 sm:pt-10 sm:pb-16">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-neutral-50/80 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-600" />
            Licensed China Auto Exporter
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
            Worldwide Port Delivery
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
            100% Inspected EVs
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 leading-tight">
            Buy Cars in China. <br className="hidden sm:inline" />
            <span className="text-red-600">
              Ship Directly Worldwide.
            </span>
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-neutral-500 max-w-2xl mx-auto font-normal">
            Direct access to China&apos;s leading electric vehicles and luxury SUVs at transparent FOB Shanghai pricing with guaranteed customs clearance.
          </p>
        </div>

        {/* Featured Vehicle Presentation (NIO inspired minimalism) */}
        <div className="bg-neutral-50/70 rounded-2xl sm:rounded-3xl border border-neutral-200 p-4 sm:p-8 mb-6 sm:mb-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-neutral-200/60 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Spotlight EV
                </span>
                <span className="text-xs font-medium text-neutral-500">2024 Flagship</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1">
                Xiaomi SU7 Max AWD
              </h2>
            </div>

            {/* Color Switcher */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
              <span className="text-[11px] font-medium text-neutral-400">Color:</span>
              <div className="flex items-center gap-1.5">
                {colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-5 h-5 rounded-full transition-transform ${
                      selectedColor === idx ? "ring-2 ring-neutral-900 ring-offset-1 scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={c.name}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-800">{colors[selectedColor].name}</span>
            </div>
          </div>

          {/* Car Image Display */}
          <div className="relative w-full h-44 sm:h-72 lg:h-[340px] rounded-xl sm:rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2">
            <Image
              src={colors[selectedColor].image}
              alt="Xiaomi SU7 Max Flagship EV"
              fill
              className="object-contain transition-all duration-300"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Key Specs Pills Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mt-4">
            <div className="bg-white p-2 sm:p-3 rounded-xl border border-neutral-200/80 text-center">
              <div className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider">RANGE</div>
              <div className="text-sm sm:text-xl font-black text-neutral-900 mt-0.5">800<span className="text-[10px] font-normal text-neutral-500">km</span></div>
            </div>

            <div className="bg-white p-2 sm:p-3 rounded-xl border border-neutral-200/80 text-center">
              <div className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider">0-100</div>
              <div className="text-sm sm:text-xl font-black text-neutral-900 mt-0.5">2.78<span className="text-[10px] font-normal text-neutral-500">s</span></div>
            </div>

            <div className="bg-white p-2 sm:p-3 rounded-xl border border-neutral-200/80 text-center">
              <div className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider">SPEED</div>
              <div className="text-sm sm:text-xl font-black text-neutral-900 mt-0.5">265<span className="text-[10px] font-normal text-neutral-500">km/h</span></div>
            </div>

            <div className="bg-white p-2 sm:p-3 rounded-xl border border-neutral-200/80 text-center">
              <div className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider">BATTERY</div>
              <div className="text-sm sm:text-xl font-black text-neutral-900 mt-0.5">101<span className="text-[10px] font-normal text-neutral-500">kWh</span></div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="text-xs text-neutral-500 text-center sm:text-left">
              FOB Shanghai from <span className="text-base font-extrabold text-red-600">$34,800 USD</span>
            </div>
            <button
              onClick={() => onSelectCar("xiaomi-su7-max")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-800 transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>View Specs & Calculate Shipping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
