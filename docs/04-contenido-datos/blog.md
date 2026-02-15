# Datos de Blog

Fuente: `src/app/data/blog.ts`

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
- `blogPosts`: posts mock para listados y detalle.
- `categories`: listado de categorias del blog.

## Uso
- `BlogPage`: listado y filtros.
- `BlogPostPage`: detalle por `slug`.
- Admin blog: vistas de gestion en modo demo.

## Recomendacion
- Si se migra a CMS/API, mantener contrato de campos para compatibilidad.
