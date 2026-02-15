# Contexto del Proyecto

## Nombre
- Proyecto: `Diseowebestudioabogados`
- Marca/negocio: ONLEX (estudio juridico)

## Objetivo del sitio
- Mostrar servicios legales y especialidades.
- Captar consultas mediante formulario de contacto.
- Publicar contenido legal en blog.
- Exponer un panel admin de demostracion para gestion interna.

## Alcance funcional
- Sitio publico con paginas informativas.
- Navegacion principal con header y footer globales.
- Seccion de contacto con formulario y datos de contacto.
- Seccion de especialidades con detalle por `slug`.
- Seccion blog con listado y detalle por `slug`.
- Area admin (demo) con login local y vistas internas.

## Estado actual (resumen)
- Frontend funcional en React + Vite.
- Routing con `react-router` en modo SPA.
- Estilos con Tailwind CSS v4 + tokens custom.
- Deploy preparado para Vercel via rewrite a `index.html`.

## Convenciones principales
- Alias `@` apunta a `src/`.
- Componentes reutilizables en `src/app/components/ui`.
- Layout publico y admin separados.
- Datos mock en archivos TS (`src/app/data`).
