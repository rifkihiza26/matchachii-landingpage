import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts, Product, formatRupiah } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { toast } from "sonner";

type Draft = Omit<Product, "id"> & { id?: string };

const emptyDraft: Draft = {
  name: "",
  description: "",
  price: 0,
  image_url: null,
  category: "signature",
  is_best_seller: false,
  is_coming_soon: false,
  sort_order: 0,
};

const AdminProducts = () => {
  const { data: products = [], isLoading } = useProducts();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["products"] });

  const startNew = () => {
    setDraft({ ...emptyDraft, sort_order: (products.at(-1)?.sort_order ?? 0) + 1 });
    setOpen(true);
  };

  const startEdit = (p: Product) => {
    setDraft(p);
    setOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      toast.error("Upload gagal: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setDraft((d) => ({ ...d, image_url: data.publicUrl }));
    setUploading(false);
    toast.success("Gambar diupload");
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      name: draft.name,
      description: draft.description,
      price: draft.price,
      image_url: draft.image_url,
      category: draft.category,
      is_best_seller: draft.is_best_seller,
      is_coming_soon: draft.is_coming_soon,
      sort_order: draft.sort_order,
    };
    const { error } = draft.id
      ? await supabase.from("products").update(payload).eq("id", draft.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Produk disimpan");
    setOpen(false);
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Produk dihapus");
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold">Produk</h1>
          <p className="text-muted-foreground">Kelola seluruh menu yang tampil di website.</p>
        </div>
        <Button onClick={startNew}>
          <Plus size={16} className="mr-2" /> Tambah Produk
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Memuat...</p>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-4">Gambar</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Status</th>
                <th className="p-4 w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-4">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-muted" />
                    )}
                  </td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{formatRupiah(p.price)}</td>
                  <td className="p-4 text-xs">
                    {p.is_coming_soon && (
                      <span className="px-2 py-0.5 rounded bg-muted">Coming Soon</span>
                    )}
                    {p.is_best_seller && (
                      <span className="ml-1 px-2 py-0.5 rounded bg-primary/10 text-primary">
                        Best Seller
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => startEdit(p)}>
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{draft.id ? "Edit Produk" : "Produk Baru"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nama</Label>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Harga (Rp)</Label>
                <Input
                  type="number"
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Urutan</Label>
                <Input
                  type="number"
                  value={draft.sort_order}
                  onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label>Kategori</Label>
              <Input
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              />
            </div>
            <div>
              <Label>Gambar</Label>
              {draft.image_url && (
                <img src={draft.image_url} alt="" className="w-32 h-32 rounded object-cover mb-2" />
              )}
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border cursor-pointer hover:bg-muted text-sm">
                <Upload size={16} />
                {uploading ? "Mengupload..." : "Upload gambar"}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <Label>Best Seller</Label>
              <Switch
                checked={draft.is_best_seller}
                onCheckedChange={(v) => setDraft({ ...draft, is_best_seller: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Coming Soon</Label>
              <Switch
                checked={draft.is_coming_soon}
                onCheckedChange={(v) => setDraft({ ...draft, is_coming_soon: v })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={save} disabled={saving || !draft.name}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
