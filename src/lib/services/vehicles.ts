import { Vehicle } from "@/types/vehicle";
import { INITIAL_VEHICLES } from "@/lib/data/vehicles";
import { createBrowserClient } from "@/lib/supabase/client";

let localVehiclesState: Vehicle[] = [...INITIAL_VEHICLES];

export async function fetchVehicles(): Promise<Vehicle[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Vehicle[];
      }
    }
  } catch (err) {
    console.warn("Using local fallback vehicle dataset:", err);
  }

  return localVehiclesState;
}

export async function fetchVehicleById(id: string): Promise<Vehicle | null> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as Vehicle;
      }
    }
  } catch (err) {
    console.warn("Supabase fetch vehicle by id failed, checking fallback:", err);
  }

  const found = localVehiclesState.find((v) => v.id === id) || INITIAL_VEHICLES.find((v) => v.id === id);
  return found || null;
}

export async function saveVehicle(vehicle: Vehicle): Promise<Vehicle> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("vehicles")
        .upsert(vehicle)
        .select()
        .single();

      if (!error && data) {
        return data as Vehicle;
      }
    }
  } catch (err) {
    console.warn("Supabase upsert failed, updating local state:", err);
  }

  const existingIndex = localVehiclesState.findIndex((v) => v.id === vehicle.id);
  if (existingIndex >= 0) {
    localVehiclesState[existingIndex] = vehicle;
  } else {
    localVehiclesState = [vehicle, ...localVehiclesState];
  }

  return vehicle;
}

export async function removeVehicle(id: string): Promise<boolean> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient();
      const { error } = await supabase.from("vehicles").delete().eq("id", id);
      if (!error) {
        localVehiclesState = localVehiclesState.filter((v) => v.id !== id);
        return true;
      }
    }
  } catch (err) {
    console.warn("Supabase delete failed, removing locally:", err);
  }

  localVehiclesState = localVehiclesState.filter((v) => v.id !== id);
  return true;
}
