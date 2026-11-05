"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  Check,
  Search,
  X,
  Sparkles
} from "lucide-react";

export interface ModernSelectOption {
  value: string | number;
  label: string;
  subLabel?: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface ModernSelectProps {
  label?: string;
  value: string | number;
  onChange: (val: string) => void;
  options: ModernSelectOption[];
  placeholder?: string;
  searchable?: boolean;
  icon?: React.ReactNode;
  modalTitle?: string;
}

export function ModernSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  searchable = true,
  icon,
  modalTitle,
}: ModernSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOption = useMemo(() => {
    return options.find((opt) => String(opt.value) === String(value));
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.subLabel && opt.subLabel.toLowerCase().includes(q)) ||
        (opt.badge && opt.badge.toLowerCase().includes(q))
    );
  }, [options, searchQuery]);

  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-neutral-700 mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button (Mobile-First Tap Target) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-left flex items-center justify-between gap-2 transition-all cursor-pointer group active:scale-[0.99] focus:outline-hidden focus:border-neutral-900 shadow-2xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-neutral-500 shrink-0">{icon}</span>}
          {selectedOption ? (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                  {selectedOption.label}
                </span>
                {selectedOption.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 shrink-0">
                    {selectedOption.badge}
                  </span>
                )}
              </div>
              {selectedOption.subLabel && (
                <div className="text-[11px] text-neutral-500 truncate">
                  {selectedOption.subLabel}
                </div>
              )}
            </div>
          ) : (
            <span className="text-xs sm:text-sm text-neutral-400 font-medium">
              {placeholder}
            </span>
          )}
        </div>

        <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 shrink-0 transition-transform" />
      </button>

      {/* Bottom Sheet / Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4">
          
          {/* Backdrop Dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-neutral-200 max-h-[85vh] sm:max-h-[75vh] flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            
            {/* Sheet Handle for Mobile */}
            <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
              <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-neutral-950">
                {modalTitle || label || placeholder}
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input (if list has > 5 options) */}
            {(searchable && options.length > 5) && (
              <div className="px-4 py-2 border-b border-neutral-100 bg-neutral-50/50">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className="w-full h-9 pl-9 pr-3 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 no-scrollbar divide-y divide-neutral-100/60">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = String(opt.value) === String(value);

                  return (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => {
                        onChange(String(opt.value));
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] ${
                        isSelected
                          ? "bg-neutral-900 text-white shadow-xs"
                          : "hover:bg-neutral-50 active:bg-neutral-100 text-neutral-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs sm:text-sm font-bold truncate">
                              {opt.label}
                            </span>
                            {opt.badge && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-neutral-100 text-neutral-600"
                                }`}
                              >
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          {opt.subLabel && (
                            <p
                              className={`text-[11px] truncate mt-0.5 ${
                                isSelected ? "text-neutral-300" : "text-neutral-500"
                              }`}
                            >
                              {opt.subLabel}
                            </p>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-neutral-500">
                  No matching options found.
                </div>
              )}
            </div>

            {/* Done button */}
            <div className="p-3 border-t border-neutral-100 bg-neutral-50 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
