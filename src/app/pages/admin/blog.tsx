import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { blogPosts } from "../../data/blog";
import { toast } from "sonner";

export function AdminBlog() {
  const handleDelete = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar "${title}"?`)) {
      toast.success("Artículo eliminado (simulación)");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Blog - La Gaceta del Jubilado</h1>
          <p className="text-muted-foreground">
            Gestiona los artículos del blog
          </p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/admin/blog/nuevo">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo artículo
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl">{post.title}</h2>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Publicado" : "Borrador"}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Badge variant="outline">{post.category}</Badge>
                  </span>
                  <span>
                    {new Date(post.date).toLocaleDateString('es-PE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span>{post.readTime} de lectura</span>
                  <span>Por {post.author}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" size="icon">
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <Link to={`/admin/blog/editar/${post.id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(post.id, post.title)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            No hay artículos publicados todavía
          </p>
          <Button asChild>
            <Link to="/admin/blog/nuevo">Crear el primer artículo</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
