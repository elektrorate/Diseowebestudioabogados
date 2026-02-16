import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { BlogPost } from "../data/blog";
import { getBlogPosts } from "../data/blog-store";
import { CONTENT_UPDATED_EVENT } from "../data/content-store";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
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

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Artículo no encontrado</h1>
          <Button asChild>
            <Link to="/blog">Volver al blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Link>
          </Button>

          <div className="mb-4">
            <span className="inline-flex items-center gap-1 text-sm bg-accent text-accent-foreground px-3 py-1 rounded">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(post.date).toLocaleDateString('es-PE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readTime} de lectura
            </span>
            <span>Por {post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-3xl mb-4 mt-8">{paragraph.substring(2)}</h1>;
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl mb-3 mt-6">{paragraph.substring(3)}</h2>;
              } else if (paragraph.startsWith('- ')) {
                return (
                  <li key={index} className="ml-6 text-muted-foreground">
                    {paragraph.substring(2)}
                  </li>
                );
              } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={index} className="mb-4">
                    <strong>{paragraph.slice(2, -2)}</strong>
                  </p>
                );
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl">¿Este artículo te fue útil?</h2>
          <p className="text-lg text-muted-foreground">
            Si necesitas asesoría legal personalizada sobre este tema, estamos aquí para ayudarte.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/contacto">Solicitar consulta</Link>
          </Button>
        </div>
      </section>

      {/* Más artículos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8">Más artículos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts
              .filter((p) => p.id !== post.id && p.published)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                    <span className="text-xs text-accent mb-2 block">{relatedPost.category}</span>
                    <h3 className="mb-2 group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
