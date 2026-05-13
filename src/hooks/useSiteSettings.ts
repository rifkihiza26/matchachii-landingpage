import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SettingsMap = Record<string, string>;

export const SETTINGS_KEYS = [
  "brand_name",
  "brand_tagline",
  "whatsapp_number",
  "whatsapp_message",
  "instagram_url",
  "instagram_handle",
  "tiktok_url",
  "address",
  "google_maps_embed_url",
  "hero_eyebrow",
  "about_title",
  "about_paragraph_1",
  "about_paragraph_2",
] as const;

export type SettingKey = (typeof SETTINGS_KEYS)[number];

const FALLBACK: SettingsMap = {
  brand_name: "Matchachii",
  brand_tagline: "Setiap tegukan, ketenangan dalam satu gelas.",
  whatsapp_number: "6282310193700",
  whatsapp_message: "Halo Matchachii, saya ingin memesan minuman matcha.",
  instagram_url: "https://instagram.com/matcha.chii__",
  instagram_handle: "@matcha.chii__",
  tiktok_url: "https://tiktok.com/@matcha.chii__",
  address: "",
  google_maps_embed_url: "",
  hero_eyebrow: "Premium Matcha Experience",
  about_title: "Tentang Matchachii",
  about_paragraph_1: "",
  about_paragraph_2: "",
};

export const useSiteSettings = () => {
  const query = useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SettingsMap> => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      const map: SettingsMap = { ...FALLBACK };
      data?.forEach((row) => {
        map[row.key] = row.value;
      });
      return map;
    },
  });

  const settings = query.data ?? FALLBACK;

  const get = (key: SettingKey) => settings[key] ?? "";

  const whatsappUrl = `https://wa.me/${get("whatsapp_number")}?text=${encodeURIComponent(
    get("whatsapp_message")
  )}`;

  return { settings, get, whatsappUrl, isLoading: query.isLoading };
};
