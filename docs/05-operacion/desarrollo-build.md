# Desarrollo y Build

## Requisitos
- Node.js (LTS recomendado)
- npm
- Variables `VITE_FIREBASE_*` opcionales para persistencia remota

## Comandos
- Instalar dependencias:
  - `npm install`
- Desarrollo local:
  - `npm run dev`
- Build produccion:
  - `npm run build`
- Nota PowerShell:
  - Si `npm.ps1` esta bloqueado por ExecutionPolicy, usar `npm.cmd run dev` y `npm.cmd run build`.

## Alias y rutas
- Alias `@` resuelve a `src/` (ver `vite.config.ts`).

## Validacion sugerida antes de merge
1. Ejecutar `npm run build`.
2. Revisar rutas publicas principales.
3. Probar contacto (`/contacto#consulta`) y footer.
4. Probar acceso admin (`/admin/acceso`) y navegacion de categorias.
5. Probar guardado de contenido (inicio/nosotros/especialidades/procesos/contacto/blog).
6. Probar modulo de galeria (agregar/reemplazar/reordenar y reflejo en front).
