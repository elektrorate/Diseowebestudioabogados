import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  MessageSquare,
  FileText,
  House,
  Users,
  Briefcase,
  Scale,
  Phone,
  Images,
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
      title: "Inicio",
      description: "Administrar secciones de Home: hero, bloques de servicios, procesos y CTA final.",
      icon: House,
      status: "Activo",
      action: { label: "Gestionar inicio", href: "/admin/inicio" },
    },
    {
      title: "Nosotros",
      description: "Editar contenido institucional, mision/vision, valores y CTA de la pagina Nosotros.",
      icon: Users,
      status: "Activo",
      action: { label: "Gestionar nosotros", href: "/admin/nosotros" },
    },
    {
      title: "Especialidades",
      description: "Gestionar hero, cards de especialidades, proceso de trabajo y CTA.",
      icon: Briefcase,
      status: "Activo",
      action: { label: "Gestionar especialidades", href: "/admin/especialidades" },
    },
    {
      title: "Procesos vs Estado",
      description: "Editar bloques de contenido, casos frecuentes, razones e informacion adicional.",
      icon: Scale,
      status: "Activo",
      action: { label: "Gestionar procesos", href: "/admin/procesos-estado" },
    },
    {
      title: "Contacto",
      description: "Administrar hero, formulario y tarjetas de informacion de contacto.",
      icon: Phone,
      status: "Activo",
      action: { label: "Gestionar contacto", href: "/admin/contacto" },
    },
    {
      title: "Galeria de fotos",
      description: "Gestionar imagenes por seccion: agregar, reemplazar, reordenar y eliminar.",
      icon: Images,
      status: "Activo",
      action: { label: "Gestionar galeria", href: "/admin/galeria" },
    },
    {
      title: "Contenido del blog",
      description: "Crear, editar y publicar articulos de La Gaceta del Jubilado.",
      icon: FileText,
      status: "Activo",
      action: { label: "Gestionar blog", href: "/admin/blog" },
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
