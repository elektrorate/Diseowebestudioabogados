## ONLEX - Sitio Web y Panel Admin

Proyecto web de ONLEX con frontend publico y panel de administracion.

## Ejecucion local

1. Instalar dependencias:

```bash
npm i
```

2. Configurar variables de entorno:

```bash
copy .env.example .env
```

3. Iniciar el proyecto:

```bash
npm run dev
```

## Firebase (persistencia real)

Cuando no hay variables `VITE_FIREBASE_*`, el proyecto usa fallback local (`localStorage`).

Para guardar todo en base de datos:

1. Crear proyecto en Firebase.
2. Activar Authentication -> Sign-in method -> Email/Password.
3. Crear usuario admin:
   - Email: `admin@onlex.pe`
   - Password: `testing123`
4. Activar Firestore Database (modo Native).
5. Crear documento de perfil admin en la coleccion `admin_profiles`:
   - Document ID: `<UID del usuario admin>`
   - Campos:
     - `username`: `admin`
     - `role`: `admin`
6. Aplicar reglas de Firestore desde `firebase/firestore.rules`.
7. Completar `.env` con:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
8. Reiniciar `npm run dev`.

## Cobertura actual en base de datos

- Login admin con Firebase Auth (acceso con usuario `admin` y clave `testing123`).
- Formulario de contacto guarda consultas en coleccion `consultas`.
- Panel admin de consultas permite listar, cambiar estado (`Pendiente`, `Contactado`, `Resuelto`) y eliminar.
- Contenido administrable del sitio (`Inicio`, `Nosotros`, `Especialidades`, `Procesos vs Estado`, `Contacto`) se guarda en coleccion `site_content`.
- Contenido del blog (crear, editar, eliminar y publicar/borrador) tambien se persiste en `site_content`.
