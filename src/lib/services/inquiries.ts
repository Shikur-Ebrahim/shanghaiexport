import { Inquiry } from "@/types/vehicle";
import { createBrowserClient } from "@/lib/supabase/client";

let localInquiriesState: Inquiry[] = [
  {
    id: "inq-101",
    vehicle_id: "xiaomi-su7-max",
    vehicle_name: "Xiaomi SU7 Max AWD",
    customer_name: "Rashid Al-Maktoum",
    email: "rashid@gulfauto.ae",
    phone: "+971 50 123 4567",
    destination_country: "United Arab Emirates",
    destination_port: "Dubai (Jebel Ali)",
    shipping_type: "Ro-Ro",
    message: "Looking to import 2 units of SU7 Max to Dubai. Please quote FOB Shanghai and CIF Jebel Ali with transit time.",
    status: "New",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "inq-102",
    vehicle_id: "byd-yangwang-u8",
    vehicle_name: "BYD Yangwang U8 Premium Edition",
    customer_name: "Timur Kasymov",
    email: "timur@tashkentmotors.uz",
    phone: "+998 90 987 6543",
    destination_country: "Uzbekistan",
    destination_port: "Tashkent (Khorgos Border Rail)",
    shipping_type: "Container",
    message: "Require Yangwang U8 with English language firmware update. Please send rail delivery schedule to Tashkent.",
    status: "Contacted",
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
  },
  {
    id: "inq-103",
    vehicle_id: "zeekr-001-fr",
    vehicle_name: "Zeekr 001 Luxury Shooting Brake",
    customer_name: "Alexander Becker",
    email: "becker.import@hamburg-auto.de",
    phone: "+49 170 555 4321",
    destination_country: "Germany",
    destination_port: "Bremerhaven",
    shipping_type: "Ro-Ro",
    message: "Seeking COC / CE documentation and battery safety reports for German customs import.",
    status: "Quoted",
    created_at: new Date(Date.now() - 3600000 * 50).toISOString(),
  }
];

export async function fetchInquiries(): Promise<Inquiry[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Inquiry[];
      }
    }
  } catch (err) {
    console.warn("Using local fallback inquiries:", err);
  }

  return localInquiriesState;
}

export async function submitInquiry(inquiry: Omit<Inquiry, "id" | "created_at" | "status">): Promise<{ success: boolean; data?: Inquiry; error?: string }> {
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: "New",
    created_at: new Date().toISOString(),
  };

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("inquiries")
        .insert([newInquiry])
        .select()
        .single();

      if (!error && data) {
        localInquiriesState = [data as Inquiry, ...localInquiriesState];
        return { success: true, data: data as Inquiry };
      }
    }
  } catch (err) {
    console.warn("Supabase insert inquiry error, stored in local fallback:", err);
  }

  localInquiriesState = [newInquiry, ...localInquiriesState];
  return { success: true, data: newInquiry };
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<boolean> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient();
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);

      if (!error) {
        const item = localInquiriesState.find((inq) => inq.id === id);
        if (item) item.status = status;
        return true;
      }
    }
  } catch (err) {
    console.warn("Failed updating inquiry in Supabase:", err);
  }

  const item = localInquiriesState.find((inq) => inq.id === id);
  if (item) {
    item.status = status;
    return true;
  }
  return false;
}
