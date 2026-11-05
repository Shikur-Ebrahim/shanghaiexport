"use client";

interface BrandPillsProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
}

const BRANDS = [
  { name: "All Brands", value: "" },
  { name: "BYD", value: "BYD" },
  { name: "Xiaomi", value: "Xiaomi" },
  { name: "Zeekr", value: "Zeekr" },
  { name: "Li Auto", value: "Li Auto" },
  { name: "NIO", value: "NIO" },
  { name: "Geely", value: "Geely" },
  { name: "Chery", value: "Chery" },
  { name: "Jetour", value: "Jetour" },
  { name: "Voyah", value: "Voyah" }
];

export function BrandPills({ selectedBrand, onSelectBrand }: BrandPillsProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1 -mx-3 px-3 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-1.5 min-w-max pb-0.5">
        {BRANDS.map((b) => {
          const isActive = selectedBrand === b.value;
          return (
            <button
              key={b.name}
              onClick={() => onSelectBrand(b.value)}
              className={`h-8 sm:h-9 px-3.5 sm:px-4 rounded-lg sm:rounded-full text-xs font-semibold transition-all whitespace-nowrap active:scale-95 flex items-center justify-center ${
                isActive
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {b.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
