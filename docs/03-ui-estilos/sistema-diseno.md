# Sistema de Diseno

## Fuentes
- Titulos: `Playfair Display`
- Texto base: `Lato`
- Cargadas via `src/styles/fonts.css` (Google Fonts)

## Tokens de color (theme)
- `--primary`: `#8B5A16` (marron dorado principal)
- `--secondary`: `#6A4312` (marron secundario)
- `--accent`: `#FAB95B` (CTA)
- `--muted`: `#E8E2DB`
- `--foreground`: `#5A380F`
- `--border`: `rgba(90, 56, 15, 0.18)`
- Variables extendidas en `src/styles/theme.css`

## Estilos base
- Tipografia base definida en `@layer base`.
- Mapeo de tokens a utilities Tailwind con `@theme inline`.

## Observaciones UI
- Header sticky con dos barras en desktop.
- Home con heroes y bloques que usan gradientes sobre paleta corporativa.
- Footer corporativo con bloques de enlaces y contacto.
- Formularios con estilo claro y bordes suaves.
