import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { blogPosts, categories } from "../../data/blog";

export function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const existingPost = isEditing ? blogPosts.find(p => p.id === id) : null;

  const [formData, setFormData] = useState({
    title: existingPost?.title || "",
    slug: existingPost?.slug || "",
    excerpt: existingPost?.excerpt || "",
    content: existingPost?.content || "",
    category: existingPost?.category || "Pensiones",
    author: existingPost?.author || "Equipo ONLEX",
    readTime: existingPost?.readTime || "5 min",
    published: existingPost?.published ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de guardado
    toast.success(isEditing ? "Artículo actualizado" : "Artículo creado");
    navigate("/admin/blog");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl">
            {isEditing ? "Editar artículo" : "Nuevo artículo"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Modifica el contenido del artículo" : "Crea un nuevo artículo para el blog"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Editor principal */}
          <Card className="lg:col-span-2 p-6 space-y-6">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                placeholder="Título del artículo"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                required
                placeholder="titulo-del-articulo-sin-espacios"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL: /blog/{formData.slug || "titulo-del-articulo"}
              </p>
            </div>

            <div>
              <Label htmlFor="excerpt">Extracto *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                required
                rows={3}
                placeholder="Breve descripción del artículo que aparecerá en las tarjetas"
              />
            </div>

            <div>
              <Label htmlFor="content">Contenido *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                required
                rows={20}
                placeholder="Contenido completo del artículo (puedes usar Markdown básico)"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Usa # para títulos, ## para subtítulos, - para listas
              </p>
            </div>
          </Card>

          {/* Sidebar de configuración */}
          <div className="space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "Todos").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="readTime">Tiempo de lectura</Label>
                <Input
                  id="readTime"
                  value={formData.readTime}
                  onChange={(e) => handleChange("readTime", e.target.value)}
                  placeholder="5 min"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="published">Publicar artículo</Label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleChange("published", checked)}
                />
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isEditing ? "Actualizar artículo" : "Crear artículo"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/admin/blog")}
              >
                Cancelar
              </Button>
            </Card>

            <Card className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground">
                <strong>Nota:</strong> En modo demo, los cambios no se guardan permanentemente. 
                Con Supabase conectado, los artículos se guardarían en la base de datos.
              </p>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
