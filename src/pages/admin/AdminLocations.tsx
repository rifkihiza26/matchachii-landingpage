import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocations, Location } from "@/hooks/useLocations";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Star } from "lucide-react";

type Draft = Partial<Location> & { name: string };

const empty: Draft = {
  name: "",
  address: "",
  google_maps_embed_url: "",
  whatsapp_number: "",
  whatsapp_message: "Halo Matchachii, saya ingin memesan minuman matcha.",
  is_primary: false,
  is_active: true,
  sort_order: 0,
};

const AdminLocations = () => {
  const qc = useQueryClient();
  const { data: locations = [], isLoading } = useLocations({ includeInactive: true });
  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["locations"] });

  const save = async () => {
    if (!editing) return;
    if (!editing.name.trim()) return toast.error("Nama lokasi wajib diisi");
    setSaving(true);

    // If setting this one as primary, unset others first
    if (editing.is_primary) {
      await supabase
        .from("locations")
        .update({ is_primary: false })
        .neq("id", editing.id ?? "00000000-0000-0000-0000-000000000000");
    }

    const payload = {
      name: editing.name,
      address: editing.address ?? "",
      google_maps_embed_url: editing.google_maps_embed_url ?? "",
      whatsapp_number: editing.whatsapp_number ?? "",
      whatsapp_message: editing.whatsapp_message ?? "",
      is_primary: !!editing.is_primary,
      is_active: editing.is_active ?? true,
      sort_order: editing.sort_order ?? 0,
    };

    const { error } = editing.id
      ? await supabase.from("locations").update(payload).eq("id", editing.id)
      : await supabase.from("locations").insert(payload);

    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Lokasi disimpan");
    setEditing(null);
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus lokasi ini?")) return;
    const { error } = await supabase.from("locations").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Lokasi dihapus");
    refresh();
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Lokasi Cabang</h1>
          <p className="text-muted-foreground">
            Kelola cabang & nomor WhatsApp tiap cabang. Cabang "Utama" dipakai tombol WhatsApp di navbar & hero.
          </p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus size={16} className="mr-2" /> Tambah Lokasi
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Memuat...</p>
      ) : (
        <div className="space-y-3">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center justify-between bg-card border border-border rounded-xl p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{loc.name}</h3>
                  {loc.is_primary && (
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      <Star size={10} /> Utama
                    </span>
                  )}
                  {!loc.is_active && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      Nonaktif
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{loc.address || "—"}</p>
                <p className="text-xs text-muted-foreground">WA: {loc.whatsapp_number || "—"}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => setEditing(loc)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => remove(loc.id)}>
                  <Trash2 size={16} className="text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          {locations.length === 0 && (
            <p className="text-muted-foreground text-center py-12">Belum ada lokasi.</p>
          )}
        </div>
      )}

      {editing && (
        <div
          className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-auto p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-xl font-bold">
              {editing.id ? "Edit Lokasi" : "Tambah Lokasi"}
            </h2>

            <div>
              <Label>Nama Cabang</Label>
              <Input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="Cabang Bandung"
              />
            </div>
            <div>
              <Label>Alamat</Label>
              <Textarea
                rows={2}
                value={editing.address ?? ""}
                onChange={(e) => setEditing({ ...editing, address: e.target.value })}
              />
            </div>
            <div>
              <Label>Google Maps Embed URL</Label>
              <Textarea
                rows={2}
                value={editing.google_maps_embed_url ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, google_maps_embed_url: e.target.value })
                }
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Nomor WhatsApp</Label>
                <Input
                  value={editing.whatsapp_number ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, whatsapp_number: e.target.value })
                  }
                  placeholder="6282xxxx"
                />
              </div>
              <div>
                <Label>Urutan</Label>
                <Input
                  type="number"
                  value={editing.sort_order ?? 0}
                  onChange={(e) =>
                    setEditing({ ...editing, sort_order: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Pesan WhatsApp Default</Label>
              <Textarea
                rows={2}
                value={editing.whatsapp_message ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, whatsapp_message: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Jadikan lokasi utama</Label>
              <Switch
                checked={!!editing.is_primary}
                onCheckedChange={(v) => setEditing({ ...editing, is_primary: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Aktif (tampil di website)</Label>
              <Switch
                checked={editing.is_active ?? true}
                onCheckedChange={(v) => setEditing({ ...editing, is_active: v })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditing(null)}>
                Batal
              </Button>
              <Button onClick={save} disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLocations;
