import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  MessageSquare,
  FileText,
  LayoutDashboard,
  Settings,
  Globe,
  Phone,
} from "lucide-react";

export function AdminDashboard() {
  const categories = [
    {
      title: "Consultas de clientes",
      description: "Revisar, clasificar y dar seguimiento a formularios recibidos.",
      icon: MessageSquare,
      status: "Activo",
      action: { label: "Gestionar consultas", href: "/admin/consultas" },
    },
    {
      title: "Contenido del blog",
      description: "Crear, editar y publicar articulos de La Gaceta del Jubilado.",
      icon: FileText,
      status: "Activo",
      action: { label: "Gestionar blog", href: "/admin/blog" },
    },
    {
      title: "Contenido institucional",
      description: "Actualizar secciones de Home, Nosotros y Especialidades.",
      icon: Globe,
      status: "Proximamente",
      action: null,
    },
    {
      title: "Navegacion y menus",
      description: "Administrar enlaces del header, footer y accesos rapidos.",
      icon: LayoutDashboard,
      status: "Proximamente",
      action: null,
    },
    {
      title: "Canales de contacto",
      description: "Gestionar telefonos, correos y datos visibles del estudio.",
      icon: Phone,
      status: "Proximamente",
      action: null,
    },
    {
      title: "Configuracion general",
      description: "Preferencias de sistema y parametros administrativos.",
      icon: Settings,
      status: "Proximamente",
      action: null,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl">Panel de Administracion</h1>
        <p className="text-muted-foreground">
          Funcionalidades de administracion del sitio ordenadas por categorias.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.status === "Activo";

          return (
            <Card key={category.title} className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="rounded-lg bg-muted p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant={isActive ? "default" : "secondary"}>{category.status}</Badge>
              </div>

              <h2 className="mb-2 text-xl">{category.title}</h2>
              <p className="mb-6 flex-1 text-sm text-muted-foreground">{category.description}</p>

              {category.action ? (
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to={category.action.href}>{category.action.label}</Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  Disponible pronto
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
