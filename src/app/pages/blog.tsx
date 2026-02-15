import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, Clock, Tag } from "lucide-react";
import { blogPosts, categories } from "../data/blog";

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = selectedCategory === "Todos"
    ? blogPosts.filter(post => post.published)
    : blogPosts.filter(post => post.published && post.category === selectedCategory);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              La Gaceta del Jubilado
            </h1>
            <p className="text-xl text-white/90">
              Información clara y accesible sobre derechos laborales, previsionales 
              y administrativos. Educación legal para pensionistas y adultos mayores.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-muted py-8 sticky top-20 z-40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No hay artículos en esta categoría todavía.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('es-PE', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-xl mb-3 line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <Button asChild variant="link" className="p-0 h-auto justify-start">
                      <Link to={`/blog/${post.slug}`}>Leer más →</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl">
            ¿Tienes dudas sobre tus derechos?
          </h2>
          <p className="text-lg text-white/90">
            Además de informarte, podemos ayudarte directamente con tu caso.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/contacto">Solicita una consulta</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}