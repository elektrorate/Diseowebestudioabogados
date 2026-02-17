# Datos de Blog

Fuentes:
- `src/app/data/blog.ts` (seed inicial)
- `src/app/data/blog-store.ts` (lectura/escritura)

## Estructura del tipo `BlogPost`
- `id: string`
- `slug: string`
- `title: string`
- `excerpt: string`
- `content: string` (Markdown embebido)
- `category: string`
- `author: string`
- `date: string`
- `readTime: string`
- `published: boolean`

## Colecciones actuales
- `blogPosts` y `categories`: seed inicial de contenido.
- `onlex_blog_posts_v1`: clave runtime de contenido editable.
- `site_content/onlex_blog_posts_v1`: documento remoto cuando Firebase esta activo.

## Uso
- `BlogPage`: listado y filtros.
- `BlogPostPage`: detalle por `slug`.
- Admin blog: crear, editar, eliminar y cambiar estado publicado/borrador.
- `upsertBlogPost()` autogenera `id` correlativo y fecha por defecto en altas.

## Recomendacion
- Mantener `slug` unico para evitar colisiones en rutas.
- Si se migra a CMS/API, mantener contrato de campos para compatibilidad.
