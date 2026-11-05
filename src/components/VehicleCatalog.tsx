"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/types/vehicle";
import { BrandPills } from "./BrandPills";
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  RotateCcw,
  Zap,
  Calendar,
  Gauge,
  X,
  Check
} from "lucide-react";

interface VehicleCatalogProps {
  vehicles: Vehicle[];
  onSelectCar?: (car: Vehicle) => void;
  onOpenInquiry?: (carName: string) => void;
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
  const [selectedBodyType, setSelectedBodyType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "range">("featured");
  
  // View mode: "grid" (2-cards parallel on mobile, 4 on desktop) vs "list" (single card row)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter drawer for mobile/desktop
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(160000);

  const fuelTypes = ["All", "Pure Electric (BEV)", "Extended Range (EREV)", "Plug-in Hybrid (PHEV)", "Petrol"];
  const bodyTypes = ["All", "Sedan", "SUV", "Coupe", "MPV", "Off-Road"];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((car) => {
        const matchesBrand = selectedBrand ? car.brand.toLowerCase() === selectedBrand.toLowerCase() : true;
        const matchesFuel = selectedFuelType === "All" ? true : car.fuel_type === selectedFuelType;
        const matchesBody = selectedBodyType === "All" ? true : car.body_type === selectedBodyType;
        const matchesPrice = car.price_fob_usd <= maxPrice;
        const matchesQuery = searchQuery
          ? car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesBrand && matchesFuel && matchesBody && matchesPrice && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price_fob_usd - b.price_fob_usd;
        if (sortBy === "price-desc") return b.price_fob_usd - a.price_fob_usd;
        if (sortBy === "range") return (b.range_km || 0) - (a.range_km || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [vehicles, selectedBrand, selectedFuelType, selectedBodyType, maxPrice, searchQuery, sortBy]);

  const activeFilterCount =
    (selectedBrand ? 1 : 0) +
    (selectedFuelType !== "All" ? 1 : 0) +
    (selectedBodyType !== "All" ? 1 : 0) +
    (maxPrice < 160000 ? 1 : 0);

  return (
    <section id="inventory" className="py-2 sm:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* =====================================================================
            SeekAuto Style Top Search Bar
        ===================================================================== */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            
            {/* Search Input Box */}
            <div className="relative flex-1 flex items-center bg-white rounded-xl sm:rounded-2xl border-2 border-neutral-200 focus-within:border-neutral-900 transition-colors shadow-2xs overflow-hidden">
              <div className="pl-3 sm:pl-4 text-neutral-400 shrink-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by Brand, Model, Keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 sm:py-3.5 pl-2.5 pr-2 text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => {}}
                className="bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3.5 shrink-0 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 transition-all shrink-0 flex items-center justify-center relative active:scale-95 ${
                activeFilterCount > 0
                  ? "bg-neutral-950 text-white border-neutral-950"
                  : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
              }`}
              title="Open Filters"
              aria-label="Filter Options"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div className="mb-4">
          <BrandPills selectedBrand={selectedBrand} onSelectBrand={setSelectedBrand} />
        </div>

        {/* =====================================================================
            Section Title & View Mode Toggle (SeekAuto Style)
        ===================================================================== */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
              New In
            </h2>
            <span className="text-xs text-neutral-500 font-medium">
              ({filteredVehicles.length} vehicles available)
            </span>
          </div>

          {/* View Mode Toggle: Grid (2 parallel cards) vs List (1 card per row) */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
              title="1-Column List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
              title="2-Column Parallel Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            Vehicle Cards Display (Grid Mode: 2 CARDS PARALLEL ON MOBILE!)
        ===================================================================== */}
        {filteredVehicles.length > 0 ? (
          viewMode === "grid" ? (
            /* 2 CARDS PARALLEL ON MOBILE (grid-cols-2), 3 on tablet, 4 on desktop */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
              {filteredVehicles.map((car) => (
                <Link
                  key={car.id}
                  href={`/vehicles/${car.id}`}
                  className="group bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 hover:border-neutral-900/30 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <Image
                      src={car.images[0] || "/logo.png"}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Top status tag */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-black/70 text-white backdrop-blur-xs">
                        {car.year}
                      </span>
                      {car.featured && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-red-600 text-white">
                          Hot
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Info Content (SeekAuto Style) */}
                  <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title: 2 lines clamp */}
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                        {car.name}
                      </h3>

                      {/* Specs Row: Year & Range */}
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-500 mt-1">
                        <span className="flex items-center gap-0.5">
                          <Calendar className="w-3 h-3 text-neutral-400" />
                          {car.year}
                        </span>
                        {car.range_km && (
                          <span className="flex items-center gap-0.5">
                            <Zap className="w-3 h-3 text-amber-500" />
                            {car.range_km}KM
                          </span>
                        )}
                      </div>

                      {/* Price in SeekAuto Red */}
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="text-sm sm:text-lg font-black text-red-600 tracking-tight">
                          ${car.price_fob_usd.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium">FOB</span>
                      </div>
                    </div>

                    {/* Spec Tags Pills */}
                    <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-neutral-100">
                      <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                        {car.fuel_type === "Pure Electric (BEV)" ? "BEV" : car.fuel_type === "Extended Range (EREV)" ? "EREV" : car.fuel_type === "Plug-in Hybrid (PHEV)" ? "PHEV" : "Petrol"}
                      </span>
                      {car.acceleration_0_100 && (
                        <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                          {car.acceleration_0_100}
                        </span>
                      )}
                      {car.drive_type && (
                        <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                          {car.drive_type}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* 1-COLUMN LIST VIEW (SeekAuto Screenshot 2 style) */
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {filteredVehicles.map((car) => (
                <Link
                  key={car.id}
                  href={`/vehicles/${car.id}`}
                  className="group bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 hover:border-neutral-900/30 p-2.5 sm:p-3 hover:shadow-md transition-all flex items-center gap-3 sm:gap-4"
                >
                  {/* Thumbnail on left */}
                  <div className="relative w-28 sm:w-44 aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                    <Image
                      src={car.images[0] || "/logo.png"}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 120px, 180px"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-white">
                        {car.year}
                      </span>
                    </div>
                  </div>

                  {/* Details on right */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-base font-bold text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-1">
                      {car.name}
                    </h3>

                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-500 mt-1">
                      <span>📅 {car.year}</span>
                      <span>⚡ {car.range_km ? `${car.range_km} KM Range` : "Petrol"}</span>
                      {car.acceleration_0_100 && <span>⏱️ {car.acceleration_0_100}</span>}
                    </div>

                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-base sm:text-xl font-black text-red-600">
                        ${car.price_fob_usd.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">USD FOB Shanghai</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                        {car.fuel_type}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                        {car.body_type}
                      </span>
                      {car.battery_kwh && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                          {car.battery_kwh} kWh
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-neutral-50 rounded-2xl border border-neutral-200">
            <h3 className="text-base font-bold text-neutral-900">No vehicles match your criteria</h3>
            <p className="text-xs text-neutral-500 mt-1">Try resetting the filters or searching for another model.</p>
            <button
              onClick={() => {
                setSelectedBrand("");
                setSelectedFuelType("All");
                setSelectedBodyType("All");
                setMaxPrice(160000);
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full border border-neutral-300 text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-100 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* =====================================================================
          Filter Modal / Drawer (SeekAuto Filter Style)
      ===================================================================== */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-700" />
                <h3 className="text-sm font-bold text-neutral-900">Filter Export Vehicles</h3>
              </div>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Options Body */}
            <div className="p-5 space-y-5 overflow-y-auto flex-1">
              
              {/* Powertrain */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                  Powertrain / Fuel Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {fuelTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedFuelType(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedFuelType === type
                          ? "bg-neutral-950 text-white border-neutral-950"
                          : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white"
                      }`}
                    >
                      {type === "Pure Electric (BEV)" ? "Pure EV (BEV)" : type === "Extended Range (EREV)" ? "EREV Hybrid" : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Style */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                  Body Style
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {bodyTypes.map((body) => (
                    <button
                      key={body}
                      onClick={() => setSelectedBodyType(body)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedBodyType === body
                          ? "bg-neutral-950 text-white border-neutral-950"
                          : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white"
                      }`}
                    >
                      {body}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Max Price (FOB USD)
                  </label>
                  <span className="text-sm font-bold text-red-600">
                    ${maxPrice.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="160000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-neutral-950 cursor-pointer"
                />
              </div>

              {/* Sort Order (Mobile-First Touch Target Pills) */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "featured", label: "Featured First" },
                    { id: "price-asc", label: "Price: Low to High" },
                    { id: "price-desc", label: "Price: High to Low" },
                    { id: "range", label: "Longest Range First" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSortBy(opt.id as any)}
                      className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between cursor-pointer active:scale-95 ${
                        sortBy === opt.id
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand("");
                  setSelectedFuelType("All");
                  setSelectedBodyType("All");
                  setMaxPrice(160000);
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setFilterDrawerOpen(false)}
                className="px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800"
              >
                Apply Filters ({filteredVehicles.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
