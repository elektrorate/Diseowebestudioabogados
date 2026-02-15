# Stack Tecnologico

## Base de aplicacion
- `react` 18.3.1
- `react-dom` 18.3.1
- `vite` 6.3.5
- `react-router` 7.13.0

## Estilos y UI
- `tailwindcss` 4.1.12
- `@tailwindcss/vite`
- `tw-animate-css`
- `lucide-react` (iconos)
- Conjunto de componentes tipo shadcn/radix en `src/app/components/ui`

## Utilidades relevantes
- `sonner` para notificaciones toast
- `clsx` + `tailwind-merge` para composicion de clases

## Scripts disponibles
- `npm run dev`: servidor local
- `npm run build`: build de produccion

## Decisiones tecnicas observadas
- Carga lazy de rutas para reducir bundle inicial.
- SPA con fallback server-side via rewrite.
- Datos de blog/especialidades embebidos como mock local.
- Autenticacion admin solo demo con `localStorage`.
