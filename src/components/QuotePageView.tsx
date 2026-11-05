"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PORT_SHIPPING_RATES, INITIAL_VEHICLES } from "@/lib/data/vehicles";
import { fetchVehicles } from "@/lib/services/vehicles";
import { submitInquiry } from "@/lib/services/inquiries";
import { Vehicle, PortRate } from "@/types/vehicle";
import { ModernSelect } from "./ModernSelect";
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  MessageSquare,
  Ship,
  ShieldCheck,
  Clock,
  FileCheck2,
  DollarSign,
  Car,
  ChevronDown,
  Sparkles,
  Check,
  Building,
  User,
  Mail,
  Phone,
  Globe2,
  FileText
} from "lucide-react";

export function QuotePageView() {
  const searchParams = useSearchParams();

  // URL query params
  const initialVehicleName = searchParams.get("vehicle") || "";
  const initialVehicleId = searchParams.get("vehicle_id") || "";
  const initialPortName = searchParams.get("port") || "";
  const initialCountry = searchParams.get("country") || "";
  const initialShipping = searchParams.get("shipping") || "roro";

  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicleId);
  const [customVehicleName, setCustomVehicleName] = useState(initialVehicleName);
  
  // Destination selection
  const [selectedCountry, setSelectedCountry] = useState(initialCountry || "United Arab Emirates");
  const [selectedPort, setSelectedPort] = useState(initialPortName || "Dubai (Jebel Ali)");
  const [shippingType, setShippingType] = useState<"Ro-Ro" | "Container" | "Air Freight" | "Rail">(
    initialShipping === "container" ? "Container" : "Ro-Ro"
  );
  const [unitCount, setUnitCount] = useState<"1 Unit" | "2-5 Units" | "10+ Fleet Units">("1 Unit");

  // Contact details
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");

  // Load vehicles list from Supabase or fallback
  useEffect(() => {
    fetchVehicles().then((data) => {
      if (data && data.length > 0) {
        setVehiclesList(data);
      }
    });
  }, []);

  // Currently selected vehicle object
  const selectedVehicle = useMemo(() => {
    return vehiclesList.find((v) => v.id === selectedVehicleId) || null;
  }, [vehiclesList, selectedVehicleId]);

  // Unique country list from port shipping rates
  const countries = useMemo(() => {
    const set = new Set<string>();
    PORT_SHIPPING_RATES.forEach((p) => set.add(p.country));
    return Array.from(set).sort();
  }, []);

  // Ports matching current country
  const availablePorts = useMemo(() => {
    const list = PORT_SHIPPING_RATES.filter((p) => p.country === selectedCountry);
    if (list.length === 0) return PORT_SHIPPING_RATES;
    return list;
  }, [selectedCountry]);

  // Current port object
  const currentPortRate = useMemo(() => {
    return (
      PORT_SHIPPING_RATES.find((p) => p.port === selectedPort) ||
      availablePorts[0] ||
      PORT_SHIPPING_RATES[0]
    );
  }, [selectedPort, availablePorts]);

  // Keep port in sync if country changes
  useEffect(() => {
    if (availablePorts.length > 0 && !availablePorts.some((p) => p.port === selectedPort)) {
      setSelectedPort(availablePorts[0].port);
    }
  }, [selectedCountry, availablePorts, selectedPort]);

  // Calculate estimated CIF
  const estimatedFreight = useMemo(() => {
    if (!currentPortRate) return 1500;
    if (shippingType === "Ro-Ro") return currentPortRate.roro_usd;
    if (shippingType === "Container") return currentPortRate.container_40ft_usd;
    if (shippingType === "Rail") return currentPortRate.roro_usd + 750;
    return 6500; // Air Freight estimate
  }, [currentPortRate, shippingType]);

  const estimatedTotalCif = useMemo(() => {
    if (!selectedVehicle) return null;
    return selectedVehicle.price_fob_usd + estimatedFreight;
  }, [selectedVehicle, estimatedFreight]);

  const finalVehicleName = selectedVehicle ? selectedVehicle.name : customVehicleName || "Custom Vehicle Sourcing Request";

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `SH-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteReference(ref);

    const fullMessage = `[Units: ${unitCount}] [Company: ${companyName || "N/A"}] ${
      message ? `Notes: ${message}` : ""
    }`;

    try {
      await submitInquiry({
        vehicle_id: selectedVehicleId || undefined,
        vehicle_name: finalVehicleName,
        customer_name: customerName,
        email,
        phone,
        destination_country: selectedCountry,
        destination_port: selectedPort,
        shipping_type: shippingType === "Rail" ? "Container" : shippingType,
        message: fullMessage,
      });

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("Submission error, please message us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hello ShanghaiExport! I just requested an official quotation:
Quotation Ref: ${quoteReference || "Online Quote Request"}
Vehicle: ${finalVehicleName}
Units: ${unitCount}
Destination: ${selectedPort}, ${selectedCountry}
Shipping Mode: ${shippingType}
Estimated CIF: ${estimatedTotalCif ? `$${estimatedTotalCif.toLocaleString()} USD` : "Please quote"}
Name: ${customerName}
Phone: ${phone}
Email: ${email}`;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6">
      
      {/* Top Breadcrumb & Back Link */}
      <div className="mb-6">
        <Link
          href="/#inventory"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-600 hover:text-neutral-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Vehicles</span>
        </Link>
      </div>

      {/* Success View */}
      {isSuccess ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-700 uppercase tracking-wider mb-2">
            Reference #{quoteReference}
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950">
            Quotation Request Received!
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto mt-2 leading-relaxed">
            Thank you, <strong className="text-neutral-900">{customerName}</strong>. Your export inquiry for{" "}
            <strong className="text-neutral-900">{finalVehicleName}</strong> ({unitCount}) to{" "}
            <strong className="text-neutral-900">{selectedPort}, {selectedCountry}</strong> has been logged in our system.
          </p>

          {/* Quick Summary Card */}
          <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-neutral-200">
              <span className="text-neutral-500">Vehicle:</span>
              <span className="font-bold text-neutral-900">{finalVehicleName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200">
              <span className="text-neutral-500">Destination Port:</span>
              <span className="font-bold text-neutral-900">{selectedPort}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200">
              <span className="text-neutral-500">Shipping Mode:</span>
              <span className="font-bold text-neutral-900">{shippingType}</span>
            </div>
            {estimatedTotalCif && (
              <div className="flex justify-between py-1 font-bold text-sm">
                <span className="text-neutral-900">Estimated Landed CIF:</span>
                <span className="text-red-600">${estimatedTotalCif.toLocaleString()} USD</span>
              </div>
            )}
          </div>

          {/* Direct WhatsApp Call to Action */}
          <div className="mt-8 max-w-md mx-auto space-y-3">
            <a
              href={`https://wa.me/8618812345678?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Connect with Export Manager on WhatsApp</span>
            </a>

            <Link
              href="/#inventory"
              className="w-full min-h-[46px] px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-800 font-bold text-sm hover:bg-neutral-50 transition-all flex items-center justify-center"
            >
              Browse More Vehicles
            </Link>
          </div>

          <p className="text-[11px] text-neutral-400 mt-6">
            An export agent will review your proforma request and send official invoices with VIN allocations within 2 hours.
          </p>
        </div>
      ) : (
        /* The Quotation Form */
        <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
          
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-neutral-900 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official B2B / B2C Export Proforma Invoice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Get Instant Vehicle Export Quotation
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-xl leading-relaxed">
              Direct factory FOB Shanghai pricing and competitive door-to-port ocean & rail freight rates. We respond within 2 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            
            {/* Section 1: Vehicle Selection */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-3 border-b border-neutral-200">
                <Car className="w-4 h-4 text-neutral-700" />
                <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  1. Vehicle Selection
                </h2>
              </div>

              {/* Pre-selected Vehicle Banner (if navigated from detail page) */}
              {selectedVehicle ? (
                <div className="p-3 sm:p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-16 sm:w-20 aspect-[4/3] rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                      <Image
                        src={selectedVehicle.images[0] || "/logo.png"}
                        alt={selectedVehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        {selectedVehicle.year} • {selectedVehicle.brand}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                        {selectedVehicle.name}
                      </h3>
                      <div className="text-xs sm:text-sm font-black text-red-600 mt-0.5">
                        ${selectedVehicle.price_fob_usd.toLocaleString()} <span className="text-[10px] text-neutral-500 font-normal">FOB Shanghai</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVehicleId("");
                      setCustomVehicleName("");
                    }}
                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 underline shrink-0 px-2 py-1"
                  >
                    Change Vehicle
                  </button>
                </div>
              ) : (
                /* Select or Type Vehicle */
                <div className="space-y-3">
                  <div>
                    <ModernSelect
                      label="Choose from Inventory or Enter Custom Model"
                      value={selectedVehicleId}
                      onChange={(val) => {
                        setSelectedVehicleId(val);
                        if (val) {
                          const found = vehiclesList.find((v) => v.id === val);
                          if (found) setCustomVehicleName(found.name);
                        }
                      }}
                      placeholder="-- Select from Chinese Vehicle Catalog --"
                      modalTitle="Select Vehicle from Inventory"
                      options={vehiclesList.map((car) => ({
                        value: car.id,
                        label: `${car.name} (${car.year})`,
                        subLabel: `${car.fuel_type} • ${car.body_type}`,
                        badge: `$${car.price_fob_usd.toLocaleString()} FOB`,
                        icon: <Car className="w-4 h-4 text-neutral-600" />,
                      }))}
                      icon={<Car className="w-4 h-4" />}
                    />
                  </div>

                  {!selectedVehicleId && (
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Or Type Desired Model (e.g. BYD Yangwang U9, Avatr 12, Zeekr 009, etc.)
                      </label>
                      <input
                        type="text"
                        value={customVehicleName}
                        onChange={(e) => setCustomVehicleName(e.target.value)}
                        placeholder="e.g. 2025 BYD Seal AWD or Nio ET9"
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-neutral-950"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Unit Count Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Order Quantity / Fleet Units
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["1 Unit", "2-5 Units", "10+ Fleet Units"] as const).map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setUnitCount(count)}
                      className={`h-10 rounded-xl text-xs font-bold transition-all border ${
                        unitCount === count
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Destination Port & Shipping Method */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-3 border-b border-neutral-200">
                <Ship className="w-4 h-4 text-neutral-700" />
                <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  2. Destination & Shipping
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Destination Country */}
                <ModernSelect
                  label="Destination Country *"
                  value={selectedCountry}
                  onChange={(val) => setSelectedCountry(val)}
                  modalTitle="Select Destination Country"
                  options={countries.map((c) => ({
                    value: c,
                    label: c,
                    icon: <Globe2 className="w-4 h-4 text-neutral-600" />,
                  }))}
                  icon={<Globe2 className="w-4 h-4" />}
                />

                {/* Destination Port */}
                <ModernSelect
                  label="Destination Port / Border Hub *"
                  value={selectedPort}
                  onChange={(val) => setSelectedPort(val)}
                  modalTitle="Select Destination Port"
                  options={availablePorts.map((p) => ({
                    value: p.port,
                    label: p.port,
                    subLabel: `${p.country} • ~${p.transit_days} days transit`,
                    badge: `Ro-Ro $${p.roro_usd.toLocaleString()}`,
                    icon: <Ship className="w-4 h-4 text-blue-600" />,
                  }))}
                  icon={<Ship className="w-4 h-4 text-blue-600" />}
                />
              </div>

              {/* Shipping Method Pills */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Preferred Shipping Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "Ro-Ro", label: "Ro-Ro Vessel", sub: "Most Economical" },
                    { id: "Container", label: "40ft Container", sub: "Maximum Protection" },
                    { id: "Rail", label: "Border Rail", sub: "Central Asia / Khorgos" },
                    { id: "Air Freight", label: "Air Freight", sub: "Express 7-Day" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setShippingType(m.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        shippingType === m.id
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className={`text-[10px] ${shippingType === m.id ? "text-neutral-300" : "text-neutral-400"}`}>
                        {m.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Cost Estimation Pill */}
              {selectedVehicle && (
                <div className="mt-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span>Est. Transit: <strong className="text-neutral-900">~{currentPortRate.transit_days} Days</strong> to {selectedPort}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-500">Freight: ${estimatedFreight.toLocaleString()} USD</span>
                    <span className="text-sm font-black text-red-600">
                      Est. Total CIF: ${estimatedTotalCif?.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Contact & Delivery Information */}
            <div>
              <div className="flex items-center gap-2 pb-2 mb-3 border-b border-neutral-200">
                <User className="w-4 h-4 text-neutral-700" />
                <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  3. Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rashid Al-Maktoum"
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-neutral-950"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Company / Dealership Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Gulf Auto Traders LLC"
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-neutral-950"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-neutral-950"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-neutral-950"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Requirements / Specific Request */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Additional Requirements / Specific Configuration
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention desired exterior/interior colors, English language firmware, charging adapter (GB/T to CCS2 or Type 2), or specific delivery timeline..."
                  className="w-full p-3 rounded-xl border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-neutral-950 resize-none"
                />
              </div>
            </div>

            {/* Submit Button (Mobile-First Large Hit Target) */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Official Quotation...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Proforma Invoice</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-neutral-500">
                We respond within 2 hours. Your contact details are kept strictly confidential.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>150-Point Pre-Shipment Video Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>UN38.3 & MSDS Battery Declarations</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>Escrow Bank Wire (T/T) or Letter of Credit</span>
              </div>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
