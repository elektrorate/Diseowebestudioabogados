import { useMemo, useState } from "react";
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
import { categories } from "../../data/blog";
import { getBlogPosts, upsertBlogPost } from "../../data/blog-store";

export function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const posts = useMemo(() => getBlogPosts(), []);
  const existingPost = isEditing ? posts.find((p) => p.id === id) : null;

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: existingPost?.title || "",
    slug: existingPost?.slug || "",
    excerpt: existingPost?.excerpt || "",
    content: existingPost?.content || "",
    category: existingPost?.category || "Pensiones",
    author: existingPost?.author || "Equipo ONLEX",
    readTime: existingPost?.readTime || "5 min",
    published: existingPost?.published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await upsertBlogPost({
        id,
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        readTime: formData.readTime,
        published: formData.published,
      });

      toast.success(isEditing ? "Articulo actualizado" : "Articulo creado");
      navigate("/admin/blog");
    } catch {
      toast.error("No se pudo guardar el articulo");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl">{isEditing ? "Editar articulo" : "Nuevo articulo"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Modifica el contenido del articulo" : "Crea un nuevo articulo para el blog"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="space-y-6 p-6 lg:col-span-2">
            <div>
              <Label htmlFor="title">Titulo *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                placeholder="Titulo del articulo"
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
              <p className="mt-1 text-xs text-muted-foreground">URL: /blog/{formData.slug || "titulo-del-articulo"}</p>
            </div>

            <div>
              <Label htmlFor="excerpt">Extracto *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                required
                rows={3}
                placeholder="Breve descripcion del articulo"
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
                placeholder="Contenido completo del articulo (Markdown basico)"
                className="font-mono text-sm"
              />
              <p className="mt-1 text-xs text-muted-foreground">Usa # para titulos, ## para subtitulos, - para listas.</p>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="space-y-6 p-6">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c !== "Todos").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">Autor</Label>
                <Input id="author" value={formData.author} onChange={(e) => handleChange("author", e.target.value)} />
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
                <Label htmlFor="published">Publicar articulo</Label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleChange("published", checked)}
                />
              </div>
            </Card>

            <Card className="space-y-4 p-6">
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSaving}>
                {isSaving ? "Guardando..." : isEditing ? "Actualizar articulo" : "Crear articulo"}
              </Button>

              <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/admin/blog")}
              >
                Cancelar
              </Button>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
