import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const emptyForm = { title: '', description: '', icon: '' };

const Features = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('features').select('*').order('created_at');
    setFeatures(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const startNew = () => { setIsNew(true); setEditId(null); setForm(emptyForm); };
  const startEdit = (f: Feature) => { setIsNew(false); setEditId(f.id); setForm({ title: f.title, description: f.description, icon: f.icon }); };
  const cancel = () => { setIsNew(false); setEditId(null); setForm(emptyForm); };

  const save = async () => {
    if (isNew) {
      const { error } = await supabase.from('features').insert([form]);
      if (error) { toast({ title: 'Gagal', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Feature ditambahkan!' });
    } else if (editId) {
      const { error } = await supabase.from('features').update(form).eq('id', editId);
      if (error) { toast({ title: 'Gagal', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Feature diperbarui!' });
    }
    cancel();
    fetch();
  };

  const remove = async (id: string) => {
    if (!confirm('Yakin ingin menghapus feature ini?')) return;
    const { error } = await supabase.from('features').delete().eq('id', id);
    if (error) toast({ title: 'Gagal', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Feature dihapus!' }); fetch(); }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Features</h2>
        <Button onClick={startNew} size="sm"><Plus className="h-4 w-4 mr-1" /> Tambah</Button>
      </div>

      {(isNew || editId) && (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-4 space-y-3">
          <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
          <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
          <div><Label>Icon (nama icon)</Label><Input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="e.g. Star, Heart" /></div>
          <div className="flex gap-2"><Button onClick={save} size="sm"><Save className="h-4 w-4 mr-1" /> Simpan</Button><Button onClick={cancel} size="sm" variant="outline"><X className="h-4 w-4 mr-1" /> Batal</Button></div>
        </div>
      )}

      <div className="space-y-3">
        {features.map((f) => (
          <div key={f.id} className="bg-card rounded-xl border border-border p-5 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{f.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Icon: {f.icon}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => startEdit(f)} size="sm" variant="outline"><Pencil className="h-4 w-4" /></Button>
              <Button onClick={() => remove(f.id)} size="sm" variant="outline" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
        {features.length === 0 && !isNew && <p className="text-muted-foreground text-center py-8">Belum ada feature.</p>}
      </div>
    </div>
  );
};

export default Features;
