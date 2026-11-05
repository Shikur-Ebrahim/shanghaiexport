"use client";

import { Shield, Zap, Anchor, Award, CheckCircle } from "lucide-react";

export function ShippingAssurance() {
  const assurances = [
    {
      title: "Battery Safety & UN38.3 Certification",
      desc: "All electric vehicles are exported with full UN38.3 battery transport test reports and carrier-approved MSDS documentation, ensuring zero delays at international container ports.",
      icon: Zap,
    },
    {
      title: "Charging Adapters & Global Compatibility",
      desc: "We provide factory-grade GB/T to Type 2 (Europe), GB/T to CCS2, and GB/T to J1772 charging conversion adapters with all exported EVs.",
      icon: Award,
    },
    {
      title: "Direct Shipping from Shanghai Port",
      desc: "Located strategically in Shanghai, the world's busiest container and automotive port, ensuring weekly vessel departures and direct shipping routes.",
      icon: Anchor,
    },
    {
      title: "Marine All-Risk Insurance",
      desc: "Every shipment is secured with comprehensive marine all-risk insurance (ICC-A) covering maritime transport from the moment of crane loading until destination handover.",
      icon: Shield,
    },
  ];

  return (
    <section id="inspection" className="py-16 sm:py-24 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Export Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-3">
            Built on Rigorous Quality & Safety
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Exporting a car internationally requires absolute trust. Here is how we safeguard your vehicle investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-neutral-50/60 border border-neutral-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Guaranteed Compliance</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
