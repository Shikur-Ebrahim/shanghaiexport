"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Zap, Shield, Globe, Gauge, BatteryCharging, ArrowRight } from "lucide-react";

interface HeroNioProps {
  onSearch: (filters: { brand: string; bodyType: string; maxPrice: number }) => void;
  onSelectCar: (carId: string) => void;
}

export function HeroNio({ onSearch, onSelectCar }: HeroNioProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [brand, setBrand] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [maxPrice, setMaxPrice] = useState(150000);

  const colors = [
    { name: "Mineral Silver", hex: "#C5C7CB", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80" },
    { name: "Deep Navy", hex: "#1A2E44", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80" },
    { name: "Polar White", hex: "#ECEFF1", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80" }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ brand, bodyType, maxPrice });
    const target = document.getElementById("inventory");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-neutral-50/80 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
            <Shield className="w-3.5 h-3.5 text-neutral-600" />
            Licensed China Auto Exporter
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            Worldwide Port Delivery
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            100% Inspected EVs & Hybrids
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
            Buy Cars in China. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-600 via-neutral-900 to-blue-700 bg-clip-text text-transparent">
              Ship Directly Worldwide.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal">
            Direct access to China&apos;s leading electric vehicles, luxury SUVs, and commercial fleets at official FOB Shanghai export pricing with guaranteed customs clearance.
          </p>
        </div>

        {/* Featured Vehicle Presentation (NIO inspired minimalism) */}
        <div className="bg-neutral-50/60 rounded-3xl border border-neutral-200/80 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6 border-b border-neutral-200/60 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                  Spotlight EV
                </span>
                <span className="text-xs font-medium text-neutral-500">2024 Flagship</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                Xiaomi SU7 Max AWD
              </h2>
              <p className="text-sm text-neutral-500">FOB Shanghai Starting from <span className="text-lg font-bold text-neutral-900">$34,800 USD</span></p>
            </div>

            {/* Color Switcher */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-xs">
              <span className="text-xs font-medium text-neutral-500">Color:</span>
              <div className="flex items-center gap-2">
                {colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      selectedColor === idx ? "ring-2 ring-neutral-900 ring-offset-2 scale-110" : "opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={c.name}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-neutral-800">{colors[selectedColor].name}</span>
            </div>
          </div>

          {/* Car Image Display */}
          <div className="relative w-full h-64 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden bg-white flex items-center justify-center p-4">
            <Image
              src={colors[selectedColor].image}
              alt="Xiaomi SU7 Max Flagship EV"
              fill
              className="object-contain transition-all duration-500"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Key Specs Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 text-center">
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                CLTC Range
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">800 <span className="text-xs font-normal text-neutral-500">km</span></div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 text-center">
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                0-100 km/h
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">2.78 <span className="text-xs font-normal text-neutral-500">s</span></div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 text-center">
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                Top Speed
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">265 <span className="text-xs font-normal text-neutral-500">km/h</span></div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 text-center">
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-neutral-400" />
                Battery Pack
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">101 <span className="text-xs font-normal text-neutral-500">kWh</span></div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-500 text-center sm:text-left">
              Includes 800V Silicon Carbide Platform • English Firmware Support Available
            </span>
            <button
              onClick={() => onSelectCar("xiaomi-su7-max")}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>View Full Specs & Shipping Cost</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Vehicle Fast Search Box (Mobile-first hit targets) */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-2xl sm:rounded-full border border-neutral-300 p-3 sm:p-2.5 shadow-lg max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          {/* Brand select */}
          <div className="flex-1 px-3 py-2 sm:py-1">
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full text-sm font-semibold text-neutral-900 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="">All Brands (BYD, Zeekr, NIO, etc.)</option>
              <option value="BYD">BYD (Build Your Dreams)</option>
              <option value="Zeekr">Zeekr</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Li Auto">Li Auto</option>
              <option value="NIO">NIO</option>
              <option value="Geely">Geely</option>
              <option value="Chery">Chery</option>
              <option value="Jetour">Jetour</option>
              <option value="Voyah">Voyah</option>
            </select>
          </div>

          <div className="hidden sm:block w-px h-8 bg-neutral-200" />

          {/* Body Type */}
          <div className="flex-1 px-3 py-2 sm:py-1">
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Body Style</label>
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="w-full text-sm font-semibold text-neutral-900 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="">All Body Styles</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Coupe">Coupe / Shooting Brake</option>
              <option value="MPV">MPV / Business Van</option>
              <option value="Off-Road">Off-Road 4WD</option>
            </select>
          </div>

          <div className="hidden sm:block w-px h-8 bg-neutral-200" />

          {/* Max Price */}
          <div className="flex-1 px-3 py-2 sm:py-1">
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              Budget: Under ${maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="20000"
              max="160000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="min-h-[48px] px-7 rounded-xl sm:rounded-full bg-neutral-950 text-white font-semibold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search Cars</span>
          </button>
        </form>

      </div>
    </section>
  );
}
