# Desarrollo y Build

## Requisitos
- Node.js (LTS recomendado)
- npm

## Comandos
- Instalar dependencias:
  - `npm install`
- Desarrollo local:
  - `npm run dev`
- Build produccion:
  - `npm run build`

## Alias y rutas
- Alias `@` resuelve a `src/` (ver `vite.config.ts`).

## Validacion sugerida antes de merge
1. Ejecutar `npm run build`.
2. Revisar rutas publicas principales.
3. Probar contacto (`/contacto#consulta`) y footer.
4. Probar acceso demo admin (`/admin/login`).
