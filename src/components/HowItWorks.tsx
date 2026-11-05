"use client";

import { Search, ClipboardCheck, FileCheck, Ship, ShieldCheck, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Vehicle Selection & FOB Quotation",
      desc: "Choose from our verified export catalog or submit a custom car request. We provide transparent FOB Shanghai pricing with no hidden dealership markups.",
      icon: Search,
    },
    {
      step: "02",
      title: "150-Point Inspection & Video Report",
      desc: "Our certified automotive engineers conduct a comprehensive chassis, paint depth, electronic, and battery SOH diagnostic with a full 4K video walkthrough.",
      icon: ClipboardCheck,
    },
    {
      step: "03",
      title: "Export License & Escrow Payment",
      desc: "We process China Ministry of Commerce export credentials, deregistration, and transfer through secure bank wire escrow or Letter of Credit (L/C).",
      icon: FileCheck,
    },
    {
      step: "04",
      title: "Ro-Ro / Container Ocean Shipping",
      desc: "Loaded professionally at Shanghai Port or Ningbo Port on specialized automotive carriers (Ro-Ro) or sealed 40ft containers with battery DG declarations.",
      icon: Ship,
    },
    {
      step: "05",
      title: "Destination Arrival & Document Release",
      desc: "All original documentation (Bill of Lading, Certificate of Origin, Invoice, Packing List) delivered via DHL express for seamless customs clearance.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-neutral-50/70 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Export Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-3">
            How to Export Cars from China
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            A seamless, transparent 5-step export pipeline engineered for automotive dealers, commercial fleets, and private buyers worldwide.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-neutral-300">{s.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                      <Icon className="w-5 h-5 text-neutral-700" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                    {s.title}
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center text-[11px] font-semibold text-neutral-400">
                  <span>Step {idx + 1} of 5</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
