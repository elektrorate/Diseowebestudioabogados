# Componentes Clave

## Header (`src/app/components/header.tsx`)
- Navegacion principal de todo el sitio.
- Desktop: barra superior (logo + contacto) y barra inferior (menu + CTA).
- CTA principal: `Consulta Gratuita` -> `/contacto#consulta`.
- Mobile: menu desplegable y CTA integrado.

## Footer (`src/app/components/footer.tsx`)
- Secciones: marca, enlaces rapidos, especialidades, contacto.
- Enlaces configurados para navegar iniciando desde la parte superior.

## Contacto (`src/app/pages/contacto.tsx`)
- Formulario con campos: nombre, telefono, email, asunto, mensaje.
- Envio real mediante `createConsulta()` con Firestore (`consultas`) cuando Firebase esta activo.
- Fallback local en navegador cuando Firebase no esta configurado.
- Feedback visual con toast (`sonner`) para exito/error.
- Ancla de formulario: `id="consulta"`.

## Galeria admin (`src/app/pages/admin/galeria-content.tsx`)
- Gestion por seccion: agregar, reemplazar, reordenar y eliminar fotos.
- Optimizacion en cliente a variantes `thumbnail`, `medium` y `large` en formato WebP.
- Cada foto guarda alt, nombre original, dimensiones y peso por variante.

## Biblioteca UI (`src/app/components/ui`)
- Contiene componentes reutilizables (button, card, input, textarea, dialog, etc.).
- Utilidad `utils.ts` para clases y helpers de estilo.

## Imagenes
- `ImageWithFallback` para carga robusta en secciones visuales.
- `useSectionGalleryImage` construye `srcSet`/`sizes` responsivo desde la galeria configurada.
