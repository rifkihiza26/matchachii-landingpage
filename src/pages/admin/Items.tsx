import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X, Upload } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
}

const emptyForm = { name: '', description: '', image_url: '', price: 0 };

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('items').select('*').order('created_at');
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const startNew = () => { setIsNew(true); setEditId(null); setForm(emptyForm); };
  const startEdit = (i: Item) => { setIsNew(false); setEditId(i.id); setForm({ name: i.name, description: i.description, image_url: i.image_url, price: i.price }); };
  const cancel = () => { setIsNew(false); setEditId(null); setForm(emptyForm); };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'items');
    if (url) setForm(p => ({ ...p, image_url: url }));
    else toast({ title: 'Upload gagal', variant: 'destructive' });
    setUploading(false);
  };

  const save = async () => {
    const payload = { name: form.name, description: form.description, image_url: form.image_url, price: Number(form.price) };
    if (isNew) {
      const { error } = await supabase.from('items').insert([payload]);
      if (error) { toast({ title: 'Gagal', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Item ditambahkan!' });
    } else if (editId) {
      const { error } = await supabase.from('items').update(payload).eq('id', editId);
      if (error) { toast({ title: 'Gagal', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Item diperbarui!' });
    }
    cancel();
    fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return;
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) toast({ title: 'Gagal', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Item dihapus!' }); fetchItems(); }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Items (Menu)</h2>
        <Button onClick={startNew} size="sm"><Plus className="h-4 w-4 mr-1" /> Tambah</Button>
      </div>

      {(isNew || editId) && (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-4 space-y-3">
          <div><Label>Nama</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
          <div><Label>Deskripsi</Label><Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
          <div><Label>Harga</Label><Input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))} /></div>
          <div>
            <Label>Gambar</Label>
            <div className="flex items-center gap-3 mt-1">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm hover:bg-accent transition-colors">
                <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
              {form.image_url && <img src={form.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
            </div>
          </div>
          <div className="flex gap-2"><Button onClick={save} size="sm"><Save className="h-4 w-4 mr-1" /> Simpan</Button><Button onClick={cancel} size="sm" variant="outline"><X className="h-4 w-4 mr-1" /> Batal</Button></div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="bg-card rounded-xl border border-border p-5 shadow-sm flex items-center gap-4">
            {i.image_url && <img src={i.image_url} alt={i.name} className="h-16 w-16 rounded-xl object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{i.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{i.description}</p>
              <p className="text-sm font-medium text-primary mt-1">{formatPrice(i.price)}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button onClick={() => startEdit(i)} size="sm" variant="outline"><Pencil className="h-4 w-4" /></Button>
              <Button onClick={() => remove(i.id)} size="sm" variant="outline" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
        {items.length === 0 && !isNew && <p className="text-muted-foreground text-center py-8">Belum ada item.</p>}
      </div>
    </div>
  );
};

export default Items;
