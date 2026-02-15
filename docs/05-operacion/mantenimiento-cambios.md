# Mantenimiento y Cambios

## Cambios funcionales recientes
- Ajuste visual del header para alinearlo al diseno de referencia.
- Eliminacion de opcion "Nuestro Equipo" del submenu Nosotros.
- Eliminacion de boton "Consulta tu caso" en bloque de especialidad de home.
- CTA "Consulta Gratuita" del header apunta a `/contacto#consulta`.
- Seccion de contacto con ancla `#consulta` y scroll controlado.
- Enlaces del footer y layout con comportamiento consistente de scroll top.

## Riesgos tecnicos actuales
- Login admin basado en `localStorage` y credenciales hardcoded.
- Datos de blog/especialidades en memoria local (sin backend persistente).
- Dependencia de contenido mock para flujo real de negocio.

## Proximos pasos recomendados
1. Integrar backend para formulario de contacto.
2. Reemplazar auth demo por proveedor real (ej. Supabase/Auth provider).
3. Migrar blog y especialidades a fuente administrable (CMS/API).
4. Agregar pruebas de regresion para navegacion y scroll.
