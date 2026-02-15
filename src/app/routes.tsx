import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const mod = await import("./layouts/root-layout");
      return { Component: mod.RootLayout };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const mod = await import("./pages/home");
          return { Component: mod.HomePage };
        },
      },
      {
        path: "nosotros",
        lazy: async () => {
          const mod = await import("./pages/nosotros");
          return { Component: mod.NosotrosPage };
        },
      },
      {
        path: "especialidades",
        lazy: async () => {
          const mod = await import("./pages/especialidades");
          return { Component: mod.EspecialidadesPage };
        },
      },
      {
        path: "especialidades/:slug",
        lazy: async () => {
          const mod = await import("./pages/especialidad-detail");
          return { Component: mod.EspecialidadDetailPage };
        },
      },
      {
        path: "procesos-estado",
        lazy: async () => {
          const mod = await import("./pages/procesos-estado");
          return { Component: mod.ProcesosEstadoPage };
        },
      },
      {
        path: "blog",
        lazy: async () => {
          const mod = await import("./pages/blog");
          return { Component: mod.BlogPage };
        },
      },
      {
        path: "blog/:slug",
        lazy: async () => {
          const mod = await import("./pages/blog-post");
          return { Component: mod.BlogPostPage };
        },
      },
      {
        path: "contacto",
        lazy: async () => {
          const mod = await import("./pages/contacto");
          return { Component: mod.ContactoPage };
        },
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "acceso",
        lazy: async () => {
          const mod = await import("./pages/admin/access");
          return { Component: mod.AdminAccess };
        },
      },
      {
        path: "login",
        lazy: async () => {
          const mod = await import("./pages/admin/login");
          return { Component: mod.AdminLogin };
        },
      },
      {
        path: "",
        lazy: async () => {
          const mod = await import("./layouts/admin-layout");
          return { Component: mod.AdminLayout };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const mod = await import("./pages/admin/dashboard");
              return { Component: mod.AdminDashboard };
            },
          },
          {
            path: "consultas",
            lazy: async () => {
              const mod = await import("./pages/admin/consultas");
              return { Component: mod.AdminConsultas };
            },
          },
          {
            path: "blog",
            lazy: async () => {
              const mod = await import("./pages/admin/blog");
              return { Component: mod.AdminBlog };
            },
          },
          {
            path: "blog/nuevo",
            lazy: async () => {
              const mod = await import("./pages/admin/blog-editor");
              return { Component: mod.AdminBlogEditor };
            },
          },
          {
            path: "blog/editar/:id",
            lazy: async () => {
              const mod = await import("./pages/admin/blog-editor");
              return { Component: mod.AdminBlogEditor };
            },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    lazy: async () => {
      const mod = await import("./pages/not-found");
      return { Component: mod.NotFoundPage };
    },
  },
]);
