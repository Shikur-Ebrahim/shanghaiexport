import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Mail, MapPin, Globe2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block">
              <Image
                src="/logo.png"
                alt="ShanghaiExport Logo"
                width={180}
                height={70}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              ShanghaiExport.com is a premier licensed cross-border automotive trading company based in Shanghai, China. We supply and export new energy vehicles, luxury SUVs, and commercial vehicles worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Globe2 className="w-4 h-4 text-neutral-400" />
              <span>Official Shanghai Automotive Export License</span>
            </div>
          </div>

          {/* Col 2: Top Export Brands */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Export Brands</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#inventory" className="hover:text-white transition-colors">BYD (Yangwang, Seal, Han, Tang)</a></li>
              <li><a href="#inventory" className="hover:text-white transition-colors">Xiaomi (SU7, SU7 Max, Ultra)</a></li>
              <li><a href="#inventory" className="hover:text-white transition-colors">Zeekr (001, 007, 009, X)</a></li>
              <li><a href="#inventory" className="hover:text-white transition-colors">Li Auto (L6, L7, L8, L9, MEGA)</a></li>
              <li><a href="#inventory" className="hover:text-white transition-colors">NIO (ET5, ET7, ES6, ES8, EC7)</a></li>
              <li><a href="#inventory" className="hover:text-white transition-colors">Chery & Jetour (Tiggo 9, T2 Traveler)</a></li>
            </ul>
          </div>

          {/* Col 3: Key Port Routes */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Major Port Routes</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>Middle East: Dubai Jebel Ali, Jeddah, Dammam</li>
              <li>Central Asia: Tashkent, Almaty, Bishkek (Rail)</li>
              <li>Africa: Djibouti, Mombasa, Lagos, Tema</li>
              <li>Europe: Rotterdam, Antwerp, Bremerhaven</li>
              <li>South America: Santos, San Antonio</li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Headquarters</h4>
            <div className="flex items-start gap-2.5 text-xs text-neutral-400">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>Pudong New Area, Shanghai International Shipping Center, Shanghai, China</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>export@shanghaiexport.com</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: +86 188 1234 5678</span>
            </div>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-block px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
              >
                Access Admin Portal →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 ShanghaiExport.com. All rights reserved. Buy Cars in China. Ship Worldwide.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Export Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Warranty & Inspection</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
