# Mantenimiento y Cambios

## Cambios funcionales recientes
- Migracion de autenticacion admin a Firebase Auth con validacion de rol en `admin_profiles` (manteniendo fallback local).
- Persistencia de consultas en Firestore (`consultas`) con gestion de estado y comentarios desde admin.
- Persistencia de contenido editable (inicio, nosotros, especialidades, procesos, contacto y blog) en `site_content`.
- Nuevo modulo `/admin/galeria` para administrar imagenes por seccion.
- Optimizacion responsive de galeria con variantes `thumbnail`, `medium` y `large` en WebP.
- Mitigacion de errores de carga lazy: recarga unica ante fallo de chunks.
- Rewrite SPA ajustado para no interceptar archivos de assets.

## Riesgos tecnicos actuales
- La galeria aun se guarda solo en `localStorage`; no existe persistencia remota compartida.
- Cuando Firebase no esta configurado, auth y datos se mantienen localmente por navegador.
- No hay pruebas automatizadas de regresion para rutas, auth y CRUD admin.
- La cuenta fallback (`admin` / `testing123`) no debe usarse en produccion sin controles adicionales.

## Proximos pasos recomendados
1. Persistir galeria en backend (Firestore + Storage) para compartir cambios entre dispositivos.
2. Endurecer seguridad admin (roles multiples, auditoria y remocion de credenciales fallback en produccion).
3. Agregar pruebas E2E para formularios, rutas criticas y panel admin.
4. Definir monitoreo/alertas para errores de carga y fallas de escritura en Firestore.
