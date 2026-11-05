"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Menu, X, ShieldCheck, Ship, ChevronRight } from "lucide-react";

interface NavbarProps {
  onOpenInquiry?: (carName?: string) => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ShanghaiExport Logo"
              width={180}
              height={70}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#inventory" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              Vehicle Inventory
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              How to Export
            </a>
            <a href="#shipping" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              Shipping & Ports
            </a>
            <a href="#inspection" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              150-Point Inspection
            </a>
            <Link href="/admin" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50">
              Admin Portal
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/8618812345678?text=Hello%20ShanghaiExport,%20I%20am%20interested%20in%20exporting%20cars%20from%20China"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-sm font-medium transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={() => onOpenInquiry?.()}
              className="px-5 py-2.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenInquiry?.()}
              className="px-3.5 py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold sm:hidden active:scale-95"
            >
              Quote
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            <a
              href="#inventory"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-50 text-base font-medium text-neutral-800"
            >
              <span>Vehicle Inventory</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-50 text-base font-medium text-neutral-800"
            >
              <span>Export Process</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </a>
            <a
              href="#shipping"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-50 text-base font-medium text-neutral-800"
            >
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-neutral-500" />
                <span>Shipping & Ports</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </a>
            <a
              href="#inspection"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-50 text-base font-medium text-neutral-800"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-500" />
                <span>Quality & Inspection</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </a>

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center p-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 bg-neutral-50"
              >
                Admin Management Portal
              </Link>
              
              <a
                href="https://wa.me/8618812345678?text=Hello%20ShanghaiExport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 text-white font-medium text-sm"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry?.();
                }}
                className="w-full py-3.5 rounded-xl bg-neutral-950 text-white font-semibold text-sm"
              >
                Request Custom Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
