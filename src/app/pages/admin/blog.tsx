import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { BlogPost } from "../../data/blog";
import { toast } from "sonner";
import { deleteBlogPost, getBlogPosts } from "../../data/blog-store";
import { CONTENT_UPDATED_EVENT } from "../../data/content-store";

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const sync = () => setPosts(getBlogPosts());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CONTENT_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CONTENT_UPDATED_EVENT, sync);
    };
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Estas seguro de eliminar "${title}"?`)) return;
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      toast.success("Articulo eliminado");
    } catch {
      toast.error("No se pudo eliminar el articulo");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl">Blog - La Gaceta del Jubilado</h1>
          <p className="text-muted-foreground">Gestiona los articulos del blog</p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/admin/blog/nuevo">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo articulo
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-xl">{post.title}</h2>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Publicado" : "Borrador"}
                  </Badge>
                </div>

                <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    <Badge variant="outline">{post.category}</Badge>
                  </span>
                  <span>
                    {new Date(post.date).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>{post.readTime} de lectura</span>
                  <span>Por {post.author}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" size="icon">
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <Link to={`/admin/blog/editar/${post.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" onClick={() => void handleDelete(post.id, post.title)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="mb-4 text-muted-foreground">No hay articulos publicados todavia</p>
          <Button asChild>
            <Link to="/admin/blog/nuevo">Crear el primer articulo</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
