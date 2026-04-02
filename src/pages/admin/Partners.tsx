import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Upload } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('partners').select('*').order('created_at');
    setPartners(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'partners');
    if (url) setLogoUrl(url);
    else toast({ title: 'Upload gagal', variant: 'destructive' });
    setUploading(false);
  };

  const save = async () => {
    const { error } = await supabase.from('partners').insert([{ name, logo_url: logoUrl }]);
    if (error) { toast({ title: 'Gagal', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Partner ditambahkan!' });
    setIsNew(false); setName(''); setLogoUrl('');
    fetch();
  };

  const remove = async (id: string) => {
    if (!confirm('Yakin ingin menghapus partner ini?')) return;
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) toast({ title: 'Gagal', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Partner dihapus!' }); fetch(); }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Partners</h2>
        <Button onClick={() => setIsNew(true)} size="sm"><Plus className="h-4 w-4 mr-1" /> Tambah</Button>
      </div>

      {isNew && (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-4 space-y-3">
          <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
          <div>
            <Label>Logo</Label>
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm hover:bg-accent transition-colors mt-1">
              <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload Logo'}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
            {logoUrl && <img src={logoUrl} alt="" className="h-12 mt-2 rounded" />}
          </div>
          <div className="flex gap-2">
            <Button onClick={save} size="sm" disabled={!name}>Simpan</Button>
            <Button onClick={() => { setIsNew(false); setName(''); setLogoUrl(''); }} size="sm" variant="outline">Batal</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="bg-card rounded-xl border border-border p-4 shadow-sm text-center relative group">
            {p.logo_url && <img src={p.logo_url} alt={p.name} className="h-16 mx-auto mb-2 object-contain" />}
            <p className="text-sm font-medium text-foreground">{p.name}</p>
            <button
              onClick={() => remove(p.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 p-1 rounded transition-all"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {partners.length === 0 && !isNew && <p className="text-muted-foreground text-center py-8">Belum ada partner.</p>}
    </div>
  );
};

export default Partners;
