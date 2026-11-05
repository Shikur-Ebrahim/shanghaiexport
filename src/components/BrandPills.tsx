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
    <div className="w-full overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {BRANDS.map((b) => {
          const isActive = selectedBrand === b.value;
          return (
            <button
              key={b.name}
              onClick={() => onSelectBrand(b.value)}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
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
