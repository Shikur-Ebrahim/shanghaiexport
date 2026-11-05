export interface VehicleColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  body_type: "Sedan" | "SUV" | "MPV" | "Off-Road" | "Coupe";
  fuel_type: "Pure Electric (BEV)" | "Plug-in Hybrid (PHEV)" | "Extended Range (EREV)" | "Petrol";
  price_fob_usd: number;
  range_km?: number;
  top_speed_kmh?: number;
  acceleration_0_100?: string;
  battery_kwh?: number;
  drive_type?: "AWD" | "RWD" | "FWD" | "4WD";
  seating?: number;
  featured?: boolean;
  status: "Available" | "Reserved" | "Sold";
  images: string[];
  color_options?: VehicleColor[];
  description?: string;
  created_at?: string;
}

export interface Inquiry {
  id?: string;
  vehicle_id?: string;
  vehicle_name?: string;
  customer_name: string;
  email: string;
  phone: string;
  destination_country: string;
  destination_port: string;
  message?: string;
  shipping_type?: "Ro-Ro" | "Container" | "Air Freight";
  status?: "New" | "Contacted" | "Quoted" | "Completed";
  created_at?: string;
}

export interface PortRate {
  region: string;
  country: string;
  port: string;
  roro_usd: number;
  container_40ft_usd: number;
  transit_days: number;
}
