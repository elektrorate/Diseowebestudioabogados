# Despliegue

## Plataforma actual
- Preparado para Vercel.

## Configuracion
- Archivo: `vercel.json`
- Regla activa:
  - rewrite `/(.*)` -> `/index.html`

## Motivo
- Soporte para SPA: cualquier ruta profunda se resuelve en cliente por `react-router`.

## Checklist post-deploy
1. Abrir una ruta directa (ej. `/blog`, `/especialidades/laboral`).
2. Validar que no exista 404 server-side.
3. Verificar carga de assets e imagenes.
