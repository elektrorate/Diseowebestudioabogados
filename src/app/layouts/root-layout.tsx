import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
