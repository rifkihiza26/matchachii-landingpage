import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Layers, Star, Handshake, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const [counts, setCounts] = useState({ sections: 0, features: 0, partners: 0, items: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [s, f, p, i] = await Promise.all([
        supabase.from('sections').select('id', { count: 'exact', head: true }),
        supabase.from('features').select('id', { count: 'exact', head: true }),
        supabase.from('partners').select('id', { count: 'exact', head: true }),
        supabase.from('items').select('id', { count: 'exact', head: true }),
      ]);
      setCounts({
        sections: s.count ?? 0,
        features: f.count ?? 0,
        partners: p.count ?? 0,
        items: i.count ?? 0,
      });
    };
    fetchCounts();
  }, []);

  const cards = [
    { label: 'Sections', count: counts.sections, icon: Layers, color: 'text-blue-500' },
    { label: 'Features', count: counts.features, icon: Star, color: 'text-amber-500' },
    { label: 'Partners', count: counts.partners, icon: Handshake, color: 'text-emerald-500' },
    { label: 'Items', count: counts.items, icon: ShoppingBag, color: 'text-purple-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <p className="text-3xl font-bold text-foreground">{c.count}</p>
            <p className="text-sm text-muted-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
