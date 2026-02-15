# Rutas Admin

Definidas en `src/app/routes.tsx` bajo prefijo `/admin`.

## Mapa
- `/admin/login` -> `AdminLogin`
- `/admin` -> `AdminDashboard`
- `/admin/consultas` -> `AdminConsultas`
- `/admin/blog` -> `AdminBlog`
- `/admin/blog/nuevo` -> `AdminBlogEditor`
- `/admin/blog/editar/:id` -> `AdminBlogEditor`

## Control de acceso actual
- `admin-layout.tsx` valida `localStorage.getItem("onlex_admin_auth")`.
- Si no existe, redirige a `/admin/login`.
- Login demo (hardcoded) en `admin/login.tsx`:
  - usuario: `admin@onlex.pe`
  - clave: `admin123`

## Observacion
- Este mecanismo es solo demostrativo y no es apto para produccion.
