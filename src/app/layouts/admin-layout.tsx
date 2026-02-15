import { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, MessageSquare, FileText, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import logoOnlex from "figma:asset/08486880406d58026342a3b0d089b6479280a8ee.png";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("onlex_admin_auth");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("onlex_admin_auth");
    toast.success("Sesión cerrada");
    navigate("/admin/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Consultas", href: "/admin/consultas", icon: MessageSquare },
    { name: "Blog", href: "/admin/blog", icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="block">
            <img 
              src={logoOnlex} 
              alt="ONLEX - Tu solución legal en línea" 
              className="h-18 w-auto mb-2"
            />
            <span className="text-xs text-white/60">Administración</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}