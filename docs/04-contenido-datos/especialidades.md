# Datos de Especialidades

Fuentes:
- `src/app/data/especialidades.ts` (catalogo legal por `slug`)
- `src/app/data/especialidades-content.ts` (contenido editable de pagina)

## Estructura del tipo
- `slug: string`
- `title: string`
- `description: string`
- `problemas: string[]`
- `servicios: string[]`

## Cobertura actual
- laboral
- previsional
- administrativo
- municipal
- registral
- civil
- familia
- sucesiones

## Uso
- Listado general en `EspecialidadesPage`.
- Detalle por slug en `EspecialidadDetailPage`.
- Admin especialidades edita hero, cards y CTA mediante `onlex_especialidades_content_v1`.
- Si Firebase esta activo, el contenido editable tambien se replica en `site_content`.

## Recomendacion de mantenimiento
- Mantener `slug` estable para no romper enlaces.
- Evitar duplicidad de `slug`.
- Validar consistencia entre texto comercial y enfoque legal.
