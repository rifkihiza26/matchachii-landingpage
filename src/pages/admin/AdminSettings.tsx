import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSiteSettings, SETTINGS_KEYS, SettingKey } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FIELDS: { key: SettingKey; label: string; multiline?: boolean }[] = [
  { key: "brand_name", label: "Nama Brand" },
  { key: "brand_tagline", label: "Tagline" },
  { key: "hero_eyebrow", label: "Hero Eyebrow Text" },
  { key: "whatsapp_number", label: "Nomor WhatsApp (62xxxx)" },
  { key: "whatsapp_message", label: "Pesan WhatsApp Default", multiline: true },
  { key: "instagram_url", label: "URL Instagram" },
  { key: "instagram_handle", label: "Handle Instagram (@)" },
  { key: "tiktok_url", label: "URL TikTok" },
  { key: "address", label: "Alamat", multiline: true },
  { key: "google_maps_embed_url", label: "Google Maps Embed URL", multiline: true },
  { key: "about_title", label: "Judul Tentang" },
  { key: "about_paragraph_1", label: "Paragraf Tentang 1", multiline: true },
  { key: "about_paragraph_2", label: "Paragraf Tentang 2", multiline: true },
];

const AdminSettings = () => {
  const { settings } = useSiteSettings();
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft({ ...settings });
  }, [settings]);

  const save = async () => {
    setSaving(true);
    const rows = SETTINGS_KEYS.map((key) => ({ key, value: draft[key] ?? "" }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Pengaturan disimpan");
    qc.invalidateQueries({ queryKey: ["site_settings"] });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Pengaturan Website</h1>
      <p className="text-muted-foreground mb-8">
        Edit konten yang muncul di seluruh halaman publik.
      </p>

      <div className="space-y-5 bg-card border border-border rounded-2xl p-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <Label htmlFor={f.key}>{f.label}</Label>
            {f.multiline ? (
              <Textarea
                id={f.key}
                rows={3}
                value={draft[f.key] ?? ""}
                onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              />
            ) : (
              <Input
                id={f.key}
                value={draft[f.key] ?? ""}
                onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              />
            )}
          </div>
        ))}
        <Button onClick={save} disabled={saving}>
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
