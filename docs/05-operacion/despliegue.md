# Despliegue

## Plataforma actual
- Preparado para Vercel.

## Configuracion
- Archivo: `vercel.json`
- Regla activa:
  - rewrite `/((?!.*\\..*).*)` -> `/index.html`

## Motivo
- Soporte para SPA: cualquier ruta profunda se resuelve en cliente por `react-router`.
- La expresion excluye archivos con extension para no interceptar assets estaticos.

## Variables de entorno
- Para persistencia remota en produccion, configurar `VITE_FIREBASE_*` en Vercel.
- Si no se configuran, el sitio funciona con fallback local por navegador.

## Checklist post-deploy
1. Abrir una ruta directa (ej. `/blog`, `/especialidades/laboral`).
2. Validar que no exista 404 server-side.
3. Verificar carga de assets e imagenes.
4. Probar acceso admin en `/admin/acceso`.
5. Validar escritura/lectura de consultas y contenido editable.
