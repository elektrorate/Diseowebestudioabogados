# Stack Tecnologico

## Base de aplicacion
- `react` 18.3.1
- `react-dom` 18.3.1
- `vite` 6.3.5
- `react-router` 7.13.0
- `firebase` 12.x (Auth + Firestore)

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
- Manejo de fallo en chunks con una recarga automatica unica (`routes.tsx`).
- SPA con fallback server-side via rewrite en Vercel.
- Autenticacion admin con Firebase Auth + validacion de rol (`admin_profiles`) cuando Firebase esta activo.
- Fallback local de autenticacion (`localStorage`) cuando no existen variables `VITE_FIREBASE_*`.
- Persistencia de contenido editable y blog usando `site_content` (Firestore) con cache local.
- Persistencia de consultas en coleccion `consultas` (Firestore) con fallback local.
- Galeria de imagenes optimizada en cliente y almacenada en `localStorage` por seccion.
