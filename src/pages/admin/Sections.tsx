import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Pencil, X, Save, Upload } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_link: string;
  image_url: string;
}

const Sections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Section>>({});
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchSections = async () => {
    setLoading(true);
    const { data } = await supabase.from('sections').select('*').order('created_at');
    setSections(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSections(); }, []);

  const startEdit = (s: Section) => {
    setEditId(s.id);
    setForm(s);
  };

  const cancelEdit = () => { setEditId(null); setForm({}); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'sections');
    if (url) setForm(prev => ({ ...prev, image_url: url }));
    else toast({ title: 'Upload gagal', variant: 'destructive' });
    setUploading(false);
  };

  const saveEdit = async () => {
    if (!editId) return;
    const { error } = await supabase.from('sections').update({
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      button_text: form.button_text,
      button_link: form.button_link,
      image_url: form.image_url,
    }).eq('id', editId);

    if (error) {
      toast({ title: 'Gagal menyimpan', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Berhasil disimpan!' });
      cancelEdit();
      fetchSections();
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Sections</h2>
      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.id} className="bg-card rounded-xl border border-border p-6 shadow-sm">
            {editId === s.id ? (
              <div className="space-y-3">
                <div><Label>Title</Label><Input value={form.title || ''} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
                <div><Label>Subtitle</Label><Input value={form.subtitle || ''} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} /></div>
                <div><Label>Description</Label><Textarea value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
                <div><Label>Button Text</Label><Input value={form.button_text || ''} onChange={e => setForm(p => ({ ...p, button_text: e.target.value }))} /></div>
                <div><Label>Button Link</Label><Input value={form.button_link || ''} onChange={e => setForm(p => ({ ...p, button_link: e.target.value }))} /></div>
                <div>
                  <Label>Image</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm hover:bg-accent transition-colors">
                      <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    {form.image_url && <img src={form.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={saveEdit} size="sm"><Save className="h-4 w-4 mr-1" /> Simpan</Button>
                  <Button onClick={cancelEdit} size="sm" variant="outline"><X className="h-4 w-4 mr-1" /> Batal</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.subtitle}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  {s.image_url && <img src={s.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
                  <Button onClick={() => startEdit(s)} size="sm" variant="outline"><Pencil className="h-4 w-4" /></Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {sections.length === 0 && <p className="text-muted-foreground text-center py-8">Belum ada section.</p>}
      </div>
    </div>
  );
};

export default Sections;
