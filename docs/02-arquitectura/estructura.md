# Estructura y Capas

## Arbol principal
- `src/main.tsx`: entrada de aplicacion.
- `src/app/App.tsx`: `RouterProvider` y `Toaster` global.
- `src/app/routes.tsx`: definicion de rutas publicas y admin.
- `src/app/layouts/`
  - `root-layout.tsx`: layout del sitio publico.
  - `admin-layout.tsx`: layout del panel admin.
- `src/app/pages/`: paginas por ruta.
- `src/app/components/`: componentes globales (`header`, `footer`, etc.).
- `src/app/components/ui/`: biblioteca de componentes base.
- `src/app/data/`: datos mock (`blog`, `especialidades`).
- `src/styles/`: estilos globales y tokens.
- `src/assets/`: imagenes del proyecto.

## Flujo de render
1. `main.tsx` monta `App`.
2. `App` monta router + toaster.
3. Router carga layout y pagina por ruta actual.
4. Layout aplica shell visual (header/footer o sidebar admin).

## Capas funcionales
- Presentacion: paginas y componentes.
- Navegacion: rutas lazy y layouts.
- Datos: arrays/objetos locales en TypeScript.
- Configuracion: Vite, Tailwind, Vercel.
