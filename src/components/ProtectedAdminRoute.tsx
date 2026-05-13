import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const { loading, user, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl font-bold mb-3">Akses Ditolak</h1>
          <p className="text-muted-foreground">
            Akun ini tidak memiliki hak akses admin. Hubungi pengelola untuk diberikan role admin.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
