import { createBrowserRouter } from "react-router";

const CHUNK_RELOAD_KEY = "onlex_chunk_reload_once";

function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk/i.test(
    error.message,
  );
}

async function loadRoute<T extends Record<string, unknown>>(
  importer: () => Promise<T>,
  componentKey: keyof T,
) {
  try {
    const mod = await importer();
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    return { Component: mod[componentKey] as never };
  } catch (error) {
    if (isChunkLoadError(error) && !sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
      sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
      window.location.reload();
      return { Component: (() => null) as never };
    }
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    throw error;
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => loadRoute(() => import("./layouts/root-layout"), "RootLayout"),
    children: [
      {
        index: true,
        lazy: () => loadRoute(() => import("./pages/home"), "HomePage"),
      },
      {
        path: "nosotros",
        lazy: () => loadRoute(() => import("./pages/nosotros"), "NosotrosPage"),
      },
      {
        path: "especialidades",
        lazy: () => loadRoute(() => import("./pages/especialidades"), "EspecialidadesPage"),
      },
      {
        path: "especialidades/:slug",
        lazy: () => loadRoute(() => import("./pages/especialidad-detail"), "EspecialidadDetailPage"),
      },
      {
        path: "procesos-estado",
        lazy: () => loadRoute(() => import("./pages/procesos-estado"), "ProcesosEstadoPage"),
      },
      {
        path: "blog",
        lazy: () => loadRoute(() => import("./pages/blog"), "BlogPage"),
      },
      {
        path: "blog/:slug",
        lazy: () => loadRoute(() => import("./pages/blog-post"), "BlogPostPage"),
      },
      {
        path: "contacto",
        lazy: () => loadRoute(() => import("./pages/contacto"), "ContactoPage"),
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "acceso",
        lazy: () => loadRoute(() => import("./pages/admin/access"), "AdminAccess"),
      },
      {
        path: "login",
        lazy: () => loadRoute(() => import("./pages/admin/login"), "AdminLogin"),
      },
      {
        path: "",
        lazy: () => loadRoute(() => import("./layouts/admin-layout"), "AdminLayout"),
        children: [
          {
            index: true,
            lazy: () => loadRoute(() => import("./pages/admin/dashboard"), "AdminDashboard"),
          },
          {
            path: "consultas",
            lazy: () => loadRoute(() => import("./pages/admin/consultas"), "AdminConsultas"),
          },
          {
            path: "inicio",
            lazy: () => loadRoute(() => import("./pages/admin/home-content"), "AdminHomeContent"),
          },
          {
            path: "nosotros",
            lazy: () => loadRoute(() => import("./pages/admin/nosotros-content"), "AdminNosotrosContent"),
          },
          {
            path: "especialidades",
            lazy: () =>
              loadRoute(() => import("./pages/admin/especialidades-content"), "AdminEspecialidadesContent"),
          },
          {
            path: "procesos-estado",
            lazy: () => loadRoute(() => import("./pages/admin/procesos-content"), "AdminProcesosEstadoContent"),
          },
          {
            path: "contacto",
            lazy: () => loadRoute(() => import("./pages/admin/contacto-content"), "AdminContactoContent"),
          },
          {
            path: "galeria",
            lazy: () => loadRoute(() => import("./pages/admin/galeria-content"), "AdminGaleriaContent"),
          },
          {
            path: "blog",
            lazy: () => loadRoute(() => import("./pages/admin/blog"), "AdminBlog"),
          },
          {
            path: "blog/nuevo",
            lazy: () => loadRoute(() => import("./pages/admin/blog-editor"), "AdminBlogEditor"),
          },
          {
            path: "blog/editar/:id",
            lazy: () => loadRoute(() => import("./pages/admin/blog-editor"), "AdminBlogEditor"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    lazy: () => loadRoute(() => import("./pages/not-found"), "NotFoundPage"),
  },
]);
