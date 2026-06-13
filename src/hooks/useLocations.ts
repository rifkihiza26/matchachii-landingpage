import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Location = {
  id: string;
  name: string;
  address: string;
  google_maps_embed_url: string;
  whatsapp_number: string;
  whatsapp_message: string;
  is_primary: boolean;
  is_active: boolean;
  sort_order: number;
};

export const buildWhatsappUrl = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message || "")}`;

export const useLocations = (opts?: { includeInactive?: boolean }) => {
  return useQuery({
    queryKey: ["locations", opts?.includeInactive ? "all" : "active"],
    queryFn: async (): Promise<Location[]> => {
      let q = supabase
        .from("locations")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (!opts?.includeInactive) q = q.eq("is_active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Location[];
    },
  });
};

export const usePrimaryLocation = () => {
  const { data, isLoading } = useLocations();
  const primary = data?.find((l) => l.is_primary) ?? data?.[0] ?? null;
  return { primary, isLoading };
};
