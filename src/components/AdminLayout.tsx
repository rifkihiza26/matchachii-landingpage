import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, Settings, LogOut, MapPin } from "lucide-react";

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-64 bg-card border-r border-border flex flex-col p-4">
        <Link to="/admin" className="font-serif text-xl font-bold mb-8 px-2">
          Admin Panel
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          <NavLink to="/admin" end className={navItem}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navItem}>
            <Package size={18} /> Produk
          </NavLink>
          <NavLink to="/admin/locations" className={navItem}>
            <MapPin size={18} /> Lokasi
          </NavLink>
          <NavLink to="/admin/settings" className={navItem}>
            <Settings size={18} /> Pengaturan
          </NavLink>
        </nav>
        <div className="border-t border-border pt-4 mt-4">
          <p className="text-xs text-muted-foreground mb-2 px-2 truncate">{user?.email}</p>
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut size={18} className="mr-2" /> Keluar
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
