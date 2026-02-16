import { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  House,
  Users,
  Briefcase,
  Scale,
  Phone,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import logoOnlex from "@/assets/08486880406d58026342a3b0d089b6479280a8ee.png";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("onlex_admin_auth");
    if (!isAuthenticated) {
      navigate("/admin/acceso");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("onlex_admin_auth");
    localStorage.removeItem("onlex_admin_user");
    toast.success("Sesion cerrada");
    navigate("/admin/acceso");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inicio", href: "/admin/inicio", icon: House },
    { name: "Nosotros", href: "/admin/nosotros", icon: Users },
    { name: "Especialidades", href: "/admin/especialidades", icon: Briefcase },
    { name: "Procesos Estado", href: "/admin/procesos-estado", icon: Scale },
    { name: "Contacto", href: "/admin/contacto", icon: Phone },
    { name: "Consultas", href: "/admin/consultas", icon: MessageSquare },
    { name: "Blog", href: "/admin/blog", icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="flex w-64 flex-col bg-primary text-white">
        <div className="border-b border-white/10 p-6">
          <Link to="/" className="block">
            <img src={logoOnlex} alt="ONLEX - panel de administracion" className="mb-2 h-18 w-auto" />
            <span className="text-xs text-white/60">Administracion</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar sesion
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
