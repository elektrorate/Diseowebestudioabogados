# Contexto del Proyecto

## Nombre
- Proyecto: `Diseowebestudioabogados`
- Marca/negocio: ONLEX (estudio juridico)

## Objetivo del sitio
- Mostrar servicios legales y especialidades.
- Captar consultas mediante formulario de contacto.
- Publicar contenido legal en blog.
- Operar un panel admin para gestionar contenido, consultas e imagenes.

## Alcance funcional
- Sitio publico con paginas informativas.
- Navegacion principal con header y footer globales.
- Seccion de contacto con formulario y datos de contacto.
- Seccion de especialidades con detalle por `slug`.
- Seccion blog con listado y detalle por `slug`.
- Area admin con autenticacion, edicion de contenido por seccion y gestion de galeria.
- Persistencia con Firebase (cuando esta configurado) y fallback local en navegador.

## Estado actual (resumen)
- Frontend funcional en React + Vite.
- Routing con `react-router` en modo SPA y carga lazy por ruta.
- Mitigacion de errores de chunks: recarga unica automatica ante fallo de import dinamico.
- Estilos con Tailwind CSS v4 + tokens custom.
- Contacto, blog y contenido editable conectados a Firestore mediante stores (`site_content`, `consultas`) cuando hay `VITE_FIREBASE_*`.
- Galeria admin con optimizacion de imagenes a variantes `thumbnail`, `medium` y `large`.
- Deploy preparado para Vercel con rewrite SPA que no intercepta assets estaticos.

## Convenciones principales
- Alias `@` apunta a `src/`.
- Componentes reutilizables en `src/app/components/ui`.
- Layout publico y admin separados.
- Las claves de contenido usan prefijo `onlex_*_v1` en `localStorage`.
- Evento global `CONTENT_UPDATED_EVENT` sincroniza cambios entre vistas.
