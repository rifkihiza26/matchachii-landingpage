import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Package, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { data: products = [] } = useProducts();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Selamat datang di panel admin.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <Link
          to="/admin/products"
          className="rounded-2xl bg-card border border-border p-6 hover:shadow-md transition"
        >
          <Package className="text-primary mb-3" />
          <h3 className="font-semibold text-lg mb-1">Produk</h3>
          <p className="text-sm text-muted-foreground">{products.length} produk terdaftar</p>
        </Link>
        <Link
          to="/admin/settings"
          className="rounded-2xl bg-card border border-border p-6 hover:shadow-md transition"
        >
          <Settings className="text-primary mb-3" />
          <h3 className="font-semibold text-lg mb-1">Pengaturan Website</h3>
          <p className="text-sm text-muted-foreground">
            Edit kontak, sosial media, alamat, dan teks landing page.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
