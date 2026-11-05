"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/services/inquiries";
import { PORT_SHIPPING_RATES } from "@/lib/data/vehicles";
import { X, Send, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVehicleName?: string;
  defaultPort?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  defaultVehicleName = "",
  defaultPort = "",
}: InquiryModalProps) {
  const [vehicleName, setVehicleName] = useState(defaultVehicleName || "General Vehicle Sourcing Request");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("United Arab Emirates");
  const [destinationPort, setDestinationPort] = useState(defaultPort || "Dubai (Jebel Ali)");
  const [shippingType, setShippingType] = useState<"Ro-Ro" | "Container" | "Air Freight">("Ro-Ro");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitInquiry({
        vehicle_name: vehicleName,
        customer_name: customerName,
        email,
        phone,
        destination_country: destinationCountry,
        destination_port: destinationPort,
        shipping_type: shippingType,
        message,
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed, please try again or message via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hello ShanghaiExport! I just submitted an inquiry for:
Vehicle: ${vehicleName}
Destination Port: ${destinationPort}, ${destinationCountry}
Name: ${customerName}
Phone: ${phone}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Request Official Quotation</h3>
            <p className="text-xs text-neutral-500">Get FOB Shanghai & CIF landed pricing delivered to your WhatsApp & Email.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-bold text-neutral-900">Inquiry Received!</h4>
            <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-neutral-900">{customerName}</strong>. Our export team has received your request for <strong className="text-neutral-900">{vehicleName}</strong> to <strong className="text-neutral-900">{destinationPort}</strong>.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`https://wa.me/8618812345678?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Instant WhatsApp Connect</span>
              </a>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="w-full py-3 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Vehicle Selection Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Target Vehicle / Model</label>
              <input
                type="text"
                required
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className="w-full text-sm font-medium p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                placeholder="e.g. Xiaomi SU7 Max, BYD Yangwang U8, Zeekr 001"
              />
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-sm p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                placeholder="name@company.com"
              />
            </div>

            {/* Destination Port Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Destination Country *</label>
                <input
                  type="text"
                  required
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full text-sm p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                  placeholder="e.g. UAE, Saudi Arabia, Uzbekistan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Destination Port</label>
                <input
                  type="text"
                  required
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full text-sm p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                  placeholder="e.g. Dubai (Jebel Ali), Tashkent"
                />
              </div>
            </div>

            {/* Shipping Preference */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">Shipping Method</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Ro-Ro", "Container", "Air Freight"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setShippingType(mode)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      shippingType === mode
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Message / Requirements */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Additional Requirements / Number of Units</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm p-3 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                placeholder="Mention desired exterior/interior colors, English language firmware, or specific delivery timeline..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[50px] px-6 py-3 rounded-full bg-neutral-950 text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Quotation Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Proforma Invoice</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-neutral-400">
              We respond within 2 hours. Your contact details are kept strictly confidential.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
