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
- Envio simulado y feedback con toast (`sonner`).
- Ancla de formulario: `id="consulta"`.

## Biblioteca UI (`src/app/components/ui`)
- Contiene componentes reutilizables (button, card, input, textarea, dialog, etc.).
- Utilidad `utils.ts` para clases y helpers de estilo.

## Imagenes
- `ImageWithFallback` para manejo de fallback en recursos visuales.
