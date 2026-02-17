# Rutas Admin

Definidas en `src/app/routes.tsx` bajo prefijo `/admin`.

## Mapa
- `/admin/acceso` -> `AdminAccess`
- `/admin/login` -> `AdminLogin` (alias de `AdminAccess`)
- `/admin` -> `AdminDashboard`
- `/admin/consultas` -> `AdminConsultas`
- `/admin/inicio` -> `AdminHomeContent`
- `/admin/nosotros` -> `AdminNosotrosContent`
- `/admin/especialidades` -> `AdminEspecialidadesContent`
- `/admin/procesos-estado` -> `AdminProcesosEstadoContent`
- `/admin/contacto` -> `AdminContactoContent`
- `/admin/galeria` -> `AdminGaleriaContent`
- `/admin/blog` -> `AdminBlog`
- `/admin/blog/nuevo` -> `AdminBlogEditor`
- `/admin/blog/editar/:id` -> `AdminBlogEditor`

## Control de acceso actual
- `admin-layout.tsx` valida sesion con `isAdminAuthenticated()`.
- Si no hay sesion valida, redirige a `/admin/acceso`.
- `signInAdmin()` soporta dos modos:
  - Con Firebase: login por email/password y validacion de rol `admin` en `admin_profiles`.
  - Sin Firebase: fallback local con usuario `admin` y clave `testing123`.
- `signOutAdmin()` cierra sesion de Firebase (si existe) y limpia estado local.

## Observacion
- `/admin/login` se mantiene por compatibilidad, pero el flujo principal apunta a `/admin/acceso`.
