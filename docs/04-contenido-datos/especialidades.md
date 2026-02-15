# Datos de Especialidades

Fuente: `src/app/data/especialidades.ts`

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

## Recomendacion de mantenimiento
- Mantener `slug` estable para no romper enlaces.
- Evitar duplicidad de `slug`.
- Validar consistencia entre texto comercial y enfoque legal.
