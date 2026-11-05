"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle, Inquiry } from "@/types/vehicle";
import { fetchVehicles, saveVehicle, removeVehicle } from "@/lib/services/vehicles";
import { fetchInquiries, updateInquiryStatus } from "@/lib/services/inquiries";
import {
  Car,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Search,
  MessageSquare,
  DollarSign,
  TrendingUp,
  X,
  Loader2,
  ExternalLink,
  ShieldAlert,
  UploadCloud,
  ImageIcon
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"inventory" | "inquiries">("inventory");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states for Vehicle Create / Edit
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formBrand, setFormBrand] = useState("BYD");
  const [formModel, setFormModel] = useState("");
  const [formYear, setFormYear] = useState(2025);
  const [formBodyType, setFormBodyType] = useState<Vehicle["body_type"]>("Sedan");
  const [formFuelType, setFormFuelType] = useState<Vehicle["fuel_type"]>("Pure Electric (BEV)");
  const [formPrice, setFormPrice] = useState(30000);
  const [formRange, setFormRange] = useState(650);
  const [formAcceleration, setFormAcceleration] = useState("3.8s");
  const [formBattery, setFormBattery] = useState(82);
  const [formImage, setFormImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formStatus, setFormStatus] = useState<Vehicle["status"]>("Available");
  const [formFeatured, setFormFeatured] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setFormImage(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload image to Cloudflare R2");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [vList, iList] = await Promise.all([fetchVehicles(), fetchInquiries()]);
    setVehicles(vList);
    setInquiries(iList);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setFormName("");
    setFormBrand("BYD");
    setFormModel("");
    setFormYear(2025);
    setFormBodyType("Sedan");
    setFormFuelType("Pure Electric (BEV)");
    setFormPrice(32000);
    setFormRange(700);
    setFormAcceleration("3.5s");
    setFormBattery(85);
    setFormImage("https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80");
    setFormStatus("Available");
    setFormFeatured(false);
    setVehicleModalOpen(true);
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setFormName(v.name);
    setFormBrand(v.brand);
    setFormModel(v.model);
    setFormYear(v.year);
    setFormBodyType(v.body_type);
    setFormFuelType(v.fuel_type);
    setFormPrice(v.price_fob_usd);
    setFormRange(v.range_km || 0);
    setFormAcceleration(v.acceleration_0_100 || "");
    setFormBattery(v.battery_kwh || 0);
    setFormImage(v.images[0] || "");
    setFormStatus(v.status);
    setFormFeatured(v.featured || false);
    setVehicleModalOpen(true);
  };

  const handleSaveVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingVehicle ? editingVehicle.id : `car-${Date.now()}`;
    const newVehicle: Vehicle = {
      id,
      name: formName || `${formBrand} ${formModel}`,
      brand: formBrand,
      model: formModel,
      year: Number(formYear),
      body_type: formBodyType,
      fuel_type: formFuelType,
      price_fob_usd: Number(formPrice),
      range_km: Number(formRange),
      acceleration_0_100: formAcceleration,
      battery_kwh: Number(formBattery),
      status: formStatus,
      featured: formFeatured,
      images: [formImage || "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"]
    };

    await saveVehicle(newVehicle);
    setVehicleModalOpen(false);
    loadData();
  };

  const handleDeleteVehicle = async (id: string) => {
    if (confirm("Are you sure you want to remove this vehicle from export inventory?")) {
      await removeVehicle(id);
      loadData();
    }
  };

  const handleStatusChange = async (inquiryId: string, status: Inquiry["status"]) => {
    await updateInquiryStatus(inquiryId, status);
    loadData();
  };

  const pendingLeadsCount = inquiries.filter((i) => i.status === "New").length;

  return (
    <div className="min-h-screen bg-neutral-50/60 text-neutral-900 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Website</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-neutral-950">ShanghaiExport</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-50 text-red-700 border border-red-200">
                Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="min-h-[40px] px-4 py-2 rounded-full bg-neutral-950 text-white font-semibold text-xs hover:bg-neutral-800 transition-all flex items-center gap-1.5 active:scale-95 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Inventory</span>
              <Car className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="text-3xl font-black text-neutral-900">{vehicles.length}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Export-ready vehicles</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Customer Quotes</span>
              <Users className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="text-3xl font-black text-neutral-900">{inquiries.length}</div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">Total leads captured</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Pending RFQs</span>
              <Clock className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="text-3xl font-black text-red-600">{pendingLeadsCount}</div>
            <div className="text-[11px] text-neutral-500 font-medium mt-1">Awaiting proforma quote</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Avg FOB Value</span>
              <DollarSign className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="text-3xl font-black text-neutral-900">
              ${vehicles.length ? Math.round(vehicles.reduce((acc, v) => acc + v.price_fob_usd, 0) / vehicles.length).toLocaleString() : 0}
            </div>
            <div className="text-[11px] text-neutral-500 font-medium mt-1">USD per unit</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-200 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "inventory"
                ? "border-neutral-950 text-neutral-950"
                : "border-transparent text-neutral-400 hover:text-neutral-700"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicles Inventory ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "inquiries"
                ? "border-neutral-950 text-neutral-950"
                : "border-transparent text-neutral-400 hover:text-neutral-700"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer Inquiries ({inquiries.length})</span>
            {pendingLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                {pendingLeadsCount} new
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Vehicles Management */}
        {activeTab === "inventory" && (
          <div className="space-y-4">
            
            {/* Search Filter */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by brand or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white rounded-xl border border-neutral-200 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            {/* Inventory List (Mobile Cards / Desktop Table) */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
              <div className="divide-y divide-neutral-100">
                {vehicles
                  .filter((v) =>
                    searchQuery
                      ? v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        v.brand.toLowerCase().includes(searchQuery.toLowerCase())
                      : true
                  )
                  .map((car) => (
                    <div
                      key={car.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/60 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                          <Image src={car.images[0] || "/logo.png"} alt={car.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-500 uppercase">{car.brand}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 font-semibold text-neutral-700">
                              {car.body_type}
                            </span>
                            {car.featured && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-neutral-900">{car.name}</h4>
                          <p className="text-xs text-neutral-500">
                            {car.year} • {car.fuel_type} • {car.range_km ? `${car.range_km}km Range` : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        <div className="text-left sm:text-right">
                          <div className="text-lg font-black text-neutral-900">${car.price_fob_usd.toLocaleString()} USD</div>
                          <span className="text-xs font-semibold text-emerald-600">{car.status}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(car)}
                            className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors"
                            title="Edit Vehicle"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteVehicle(car.id)}
                            className="p-2 rounded-xl border border-neutral-200 hover:bg-red-50 text-red-600 transition-colors"
                            title="Delete Vehicle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inquiries Management */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs divide-y divide-neutral-100">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">{inq.customer_name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inq.status === "New"
                          ? "bg-red-100 text-red-700"
                          : inq.status === "Contacted"
                          ? "bg-blue-100 text-blue-700"
                          : inq.status === "Quoted"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {inq.status}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-neutral-700">
                      Vehicle: <strong className="text-neutral-900">{inq.vehicle_name}</strong> • Port: <strong className="text-neutral-900">{inq.destination_port}, {inq.destination_country}</strong> ({inq.shipping_type})
                    </p>

                    <p className="text-xs text-neutral-500">
                      Contact: {inq.phone} • {inq.email}
                    </p>

                    {inq.message && (
                      <p className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 mt-2">
                        &quot;{inq.message}&quot;
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(inq.customer_name)},%20thank%20you%20for%20contacting%20ShanghaiExport%20regarding%20${encodeURIComponent(inq.vehicle_name || "")}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reply on WhatsApp</span>
                    </a>

                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id!, e.target.value as any)}
                      className="text-xs font-semibold p-2 bg-neutral-50 border border-neutral-300 rounded-xl cursor-pointer"
                    >
                      <option value="New">Status: New</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Quoted">Status: Quoted</option>
                      <option value="Completed">Status: Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Vehicle Add / Edit Modal */}
      {vehicleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50">
              <h3 className="text-base font-bold text-neutral-900">
                {editingVehicle ? "Edit Vehicle Details" : "Add Vehicle to Export Catalog"}
              </h3>
              <button onClick={() => setVehicleModalOpen(false)} className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Brand</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  >
                    <option value="BYD">BYD</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Zeekr">Zeekr</option>
                    <option value="Li Auto">Li Auto</option>
                    <option value="NIO">NIO</option>
                    <option value="Geely">Geely</option>
                    <option value="Chery">Chery</option>
                    <option value="Jetour">Jetour</option>
                    <option value="Voyah">Voyah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    placeholder="e.g. SU7 Max, 001, L9"
                    className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Full Listing Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Xiaomi SU7 Max AWD Flagship"
                  className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">FOB USD ($)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Range (km)</label>
                  <input
                    type="number"
                    value={formRange}
                    onChange={(e) => setFormRange(Number(e.target.value))}
                    className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">0-100 km/h</label>
                  <input
                    type="text"
                    value={formAcceleration}
                    onChange={(e) => setFormAcceleration(e.target.value)}
                    placeholder="3.2s"
                    className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Body Style</label>
                  <select
                    value={formBodyType}
                    onChange={(e) => setFormBodyType(e.target.value as any)}
                    className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="MPV">MPV</option>
                    <option value="Off-Road">Off-Road</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Powertrain</label>
                  <select
                    value={formFuelType}
                    onChange={(e) => setFormFuelType(e.target.value as any)}
                    className="w-full text-sm p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  >
                    <option value="Pure Electric (BEV)">Pure Electric (BEV)</option>
                    <option value="Extended Range (EREV)">Extended Range (EREV)</option>
                    <option value="Plug-in Hybrid (PHEV)">Plug-in Hybrid (PHEV)</option>
                    <option value="Petrol">Petrol</option>
                  </select>
                </div>
              </div>

              {/* Cloudflare R2 Media Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-neutral-700">
                    Vehicle Photo (Stored on Cloudflare R2)
                  </label>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    R2 Bucket: shanghaiexport
                  </span>
                </div>

                {/* Direct Upload Button */}
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer min-h-[46px] px-4 py-2.5 rounded-xl border-2 border-dashed border-neutral-300 hover:border-neutral-900 bg-neutral-50 hover:bg-neutral-100/70 transition-all flex items-center justify-center gap-2 text-xs font-semibold text-neutral-800">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                        <span>Uploading directly to Cloudflare R2...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-neutral-600" />
                        <span>Choose file to upload to Cloudflare R2</span>
                      </>
                    )}
                  </label>
                </div>

                {/* Image URL & Preview */}
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="url"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/..."
                    className="flex-1 text-xs p-2.5 bg-neutral-50 rounded-xl border border-neutral-300 text-neutral-900"
                  />
                  {formImage && (
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-neutral-200 shrink-0 bg-neutral-100">
                      <Image src={formImage} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-800">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-neutral-900"
                  />
                  <span>Feature on Homepage Spotlight</span>
                </label>

                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="text-xs font-bold p-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setVehicleModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-bold text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
