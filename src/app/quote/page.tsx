import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuotePageView } from "@/components/QuotePageView";

export const metadata: Metadata = {
  title: "Request Official Quotation & Proforma Invoice | ShanghaiExport",
  description: "Request official factory FOB Shanghai and CIF door-to-port export quotations for Chinese electric and hybrid cars. UN38.3 compliant shipping worldwide.",
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-neutral-50/40 text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <main className="flex-1 py-6 sm:py-10">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
              <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">Loading Quotation Form...</p>
            </div>
          }
        >
          <QuotePageView />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
