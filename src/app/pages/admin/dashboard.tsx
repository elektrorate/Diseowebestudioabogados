import { Card } from "../../components/ui/card";
import { MessageSquare, FileText, Users, TrendingUp } from "lucide-react";

export function AdminDashboard() {
  const stats = [
    {
      icon: MessageSquare,
      title: "Consultas pendientes",
      value: "12",
      change: "+3 hoy",
      color: "text-amber-600"
    },
    {
      icon: Users,
      title: "Consultas totales",
      value: "156",
      change: "+23 este mes",
      color: "text-blue-600"
    },
    {
      icon: FileText,
      title: "Artículos publicados",
      value: "4",
      change: "Activos",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Visitas al sitio",
      value: "2,341",
      change: "+12% vs mes anterior",
      color: "text-purple-600"
    }
  ];

  const recentConsultas = [
    { id: 1, nombre: "María González", asunto: "Pensión ONP denegada", fecha: "2026-02-15", estado: "Pendiente" },
    { id: 2, nombre: "Juan Pérez", asunto: "Despido injustificado", fecha: "2026-02-14", estado: "Pendiente" },
    { id: 3, nombre: "Ana Rodríguez", asunto: "Proceso administrativo", fecha: "2026-02-14", estado: "Contactado" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de ONLEX
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.change}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent Consultas */}
      <Card className="p-6">
        <h2 className="text-xl mb-4">Consultas recientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Nombre</th>
                <th className="text-left py-3 px-4">Asunto</th>
                <th className="text-left py-3 px-4">Fecha</th>
                <th className="text-left py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentConsultas.map((consulta) => (
                <tr key={consulta.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">{consulta.nombre}</td>
                  <td className="py-3 px-4">{consulta.asunto}</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {new Date(consulta.fecha).toLocaleDateString('es-PE')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      consulta.estado === "Pendiente" 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {consulta.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-primary text-white">
          <h3 className="text-xl mb-2">¿Necesitas ayuda?</h3>
          <p className="text-white/80 mb-4">
            Accede a la documentación o contacta al soporte técnico.
          </p>
          <button className="text-accent hover:underline">
            Ver documentación →
          </button>
        </Card>

        <Card className="p-6 bg-accent text-accent-foreground">
          <h3 className="text-xl mb-2">Sitio web público</h3>
          <p className="opacity-90 mb-4">
            Visita el sitio web para ver cómo lo ven tus clientes.
          </p>
          <a href="/" className="text-primary hover:underline">
            Ir al sitio web →
          </a>
        </Card>
      </div>
    </div>
  );
}
