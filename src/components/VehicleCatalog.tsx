"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Vehicle } from "@/types/vehicle";
import { BrandPills } from "./BrandPills";
import { Zap, Gauge, BatteryCharging, ArrowUpRight, Search, SlidersHorizontal, RotateCcw } from "lucide-react";

interface VehicleCatalogProps {
  vehicles: Vehicle[];
  onSelectCar: (car: Vehicle) => void;
  onOpenInquiry: (carName: string) => void;
  activeBrandFilter?: string;
}

export function VehicleCatalog({
  vehicles,
  onSelectCar,
  onOpenInquiry,
  activeBrandFilter = "",
}: VehicleCatalogProps) {
  const [selectedBrand, setSelectedBrand] = useState(activeBrandFilter);
  const [selectedFuelType, setSelectedFuelType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "range">("featured");

  const fuelTypes = ["All", "Pure Electric (BEV)", "Extended Range (EREV)", "Plug-in Hybrid (PHEV)", "Petrol"];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((car) => {
        const matchesBrand = selectedBrand ? car.brand.toLowerCase() === selectedBrand.toLowerCase() : true;
        const matchesFuel = selectedFuelType === "All" ? true : car.fuel_type === selectedFuelType;
        const matchesQuery = searchQuery
          ? car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesBrand && matchesFuel && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price_fob_usd - b.price_fob_usd;
        if (sortBy === "price-desc") return b.price_fob_usd - a.price_fob_usd;
        if (sortBy === "range") return (b.range_km || 0) - (a.range_km || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [vehicles, selectedBrand, selectedFuelType, searchQuery, sortBy]);

  return (
    <section id="inventory" className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100 mb-2">
              <span>FOB Shanghai Direct Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Export-Ready Vehicles
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-1">
              Select any vehicle to calculate door-to-port shipping rates and request official proforma invoices.
            </p>
          </div>

          <div className="text-sm font-semibold text-neutral-600">
            Showing <span className="text-neutral-900 font-bold">{filteredVehicles.length}</span> vehicles
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div className="mb-6">
          <BrandPills selectedBrand={selectedBrand} onSelectBrand={setSelectedBrand} />
        </div>

        {/* Search & Secondary Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 bg-neutral-50 p-2 sm:p-3 rounded-2xl border border-neutral-200">
          
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model (e.g. SU7, Yangwang U8, Zeekr 001)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-neutral-200 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 placeholder:text-neutral-400"
            />
          </div>

          {/* Fuel Type Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {fuelTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFuelType(type)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                  selectedFuelType === type
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200"
                }`}
              >
                {type === "Pure Electric (BEV)" ? "BEV Electric" : type === "Extended Range (EREV)" ? "EREV Range Extender" : type === "Plug-in Hybrid (PHEV)" ? "PHEV Hybrid" : type}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-400 hidden lg:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="min-h-[38px] px-3 py-1.5 text-xs font-semibold bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="range">Longest Range</option>
            </select>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car) => (
              <div
                key={car.id}
                className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div
                  onClick={() => onSelectCar(car)}
                  className="relative w-full h-56 bg-neutral-100 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={car.images[0] || "/logo.png"}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 backdrop-blur-xs text-neutral-900 border border-neutral-200 shadow-xs">
                      {car.year} {car.brand}
                    </span>
                    {car.featured && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-600 text-white">
                        Popular Export
                      </span>
                    )}
                  </div>

                  {/* Body Type Pill */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs">
                      {car.body_type}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onSelectCar(car)}
                      className="text-lg font-bold text-neutral-900 group-hover:text-red-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {car.name}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                      {car.fuel_type} • {car.drive_type || "2WD"} • {car.seating} Seats
                    </p>

                    {/* Key Specs Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-neutral-100 text-center">
                      <div>
                        <div className="text-[10px] text-neutral-400 font-medium">RANGE</div>
                        <div className="text-sm font-bold text-neutral-800">{car.range_km ? `${car.range_km} km` : "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 font-medium">0-100 KM/H</div>
                        <div className="text-sm font-bold text-neutral-800">{car.acceleration_0_100 || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 font-medium">BATTERY</div>
                        <div className="text-sm font-bold text-neutral-800">{car.battery_kwh ? `${car.battery_kwh} kWh` : "Fuel"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider block">FOB Shanghai</span>
                        <span className="text-2xl font-black text-neutral-950">${car.price_fob_usd.toLocaleString()}</span>
                        <span className="text-xs text-neutral-500 font-normal"> USD</span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                        {car.status}
                      </span>
                    </div>

                    {/* Button Row (Mobile Screen First) */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectCar(car)}
                        className="min-h-[44px] px-3 py-2.5 rounded-xl border border-neutral-200 text-neutral-800 hover:bg-neutral-50 text-xs font-bold transition-all text-center flex items-center justify-center gap-1 active:scale-95"
                      >
                        <span>Details & Rates</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => onOpenInquiry(car.name)}
                        className="min-h-[44px] px-3 py-2.5 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold transition-all text-center flex items-center justify-center active:scale-95 shadow-xs"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-neutral-50 rounded-3xl border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900">No vehicles match your search criteria</h3>
            <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
              We source any vehicle currently manufactured or sold in China upon request.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedBrand("");
                  setSelectedFuelType("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2.5 rounded-full border border-neutral-300 text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-100 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <button
                onClick={() => onOpenInquiry("Custom Vehicle Request")}
                className="px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800"
              >
                Request Custom Vehicle Sourcing
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
