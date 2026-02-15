# Rutas Publicas

Definidas en `src/app/routes.tsx` bajo el layout raiz.

## Mapa
- `/` -> `HomePage`
- `/nosotros` -> `NosotrosPage`
- `/especialidades` -> `EspecialidadesPage`
- `/especialidades/:slug` -> `EspecialidadDetailPage`
- `/procesos-estado` -> `ProcesosEstadoPage`
- `/blog` -> `BlogPage`
- `/blog/:slug` -> `BlogPostPage`
- `/contacto` -> `ContactoPage`
- `*` -> `NotFoundPage`

## Comportamiento de scroll
- `root-layout.tsx` fuerza scroll al tope en cambio de ruta si no hay hash.
- En `contacto`, el hash `#consulta` hace scroll controlado al bloque del formulario.
- Enlaces del footer fuerzan scroll top al navegar.

## Navegacion destacada
- Header global con CTA `Consulta Gratuita` hacia `/contacto#consulta`.
- Footer con enlaces rapidos y accesos a especialidades.
