import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { HomePage } from "./pages/home";
import { NosotrosPage } from "./pages/nosotros";
import { EspecialidadesPage } from "./pages/especialidades";
import { EspecialidadDetailPage } from "./pages/especialidad-detail";
import { ProcesosEstadoPage } from "./pages/procesos-estado";
import { BlogPage } from "./pages/blog";
import { BlogPostPage } from "./pages/blog-post";
import { ContactoPage } from "./pages/contacto";
import { AdminLayout } from "./layouts/admin-layout";
import { AdminDashboard } from "./pages/admin/dashboard";
import { AdminConsultas } from "./pages/admin/consultas";
import { AdminBlog } from "./pages/admin/blog";
import { AdminBlogEditor } from "./pages/admin/blog-editor";
import { AdminLogin } from "./pages/admin/login";
import { NotFoundPage } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "nosotros", Component: NosotrosPage },
      { path: "especialidades", Component: EspecialidadesPage },
      { path: "especialidades/:slug", Component: EspecialidadDetailPage },
      { path: "procesos-estado", Component: ProcesosEstadoPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogPostPage },
      { path: "contacto", Component: ContactoPage },
    ],
  },
  {
    path: "/admin",
    children: [
      { path: "login", Component: AdminLogin },
      {
        path: "",
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "consultas", Component: AdminConsultas },
          { path: "blog", Component: AdminBlog },
          { path: "blog/nuevo", Component: AdminBlogEditor },
          { path: "blog/editar/:id", Component: AdminBlogEditor },
        ],
      },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
