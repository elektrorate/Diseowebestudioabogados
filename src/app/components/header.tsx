import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import logoOnlex from "@/assets/1809b5c0508c9087f0b49b5bf7f988601290c9a8.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navigation = [
    { name: "Inicio", href: "/" },
    {
      name: "Nosotros",
      href: "/nosotros",
      dropdown: [
        { name: "Quienes Somos", href: "/nosotros" },
        { name: "Nuestro Equipo", href: "/nosotros#equipo" },
      ],
    },
    {
      name: "Especialidades",
      href: "/especialidades",
      dropdown: [
        { name: "Derecho Laboral", href: "/especialidades/laboral" },
        { name: "Derecho Previsional", href: "/especialidades/previsional" },
        { name: "Derecho Administrativo", href: "/especialidades/administrativo" },
        { name: "Derecho Municipal", href: "/especialidades/municipal" },
        { name: "Derecho Registral", href: "/especialidades/registral" },
        { name: "Derecho Civil", href: "/especialidades/civil" },
      ],
    },
    { name: "Procesos vs Estado", href: "/procesos-estado" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="hidden border-b border-border/60 bg-white lg:block">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex h-[82px] items-center">
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img
                src={logoOnlex}
                alt="ONLEX - Tu solucion legal en linea"
                className="h-[66px] w-auto"
                decoding="async"
                fetchPriority="high"
              />
            </Link>

            <div className="ml-auto flex items-center gap-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center bg-muted/60">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-light uppercase tracking-[0.2em] text-muted-foreground">
                    Telefono
                  </span>
                  <a
                    href="tel:+51012345678"
                    className="text-base font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    +51 (01) 234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center bg-muted/60">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-light uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </span>
                  <a
                    href="mailto:contacto@onlex.pe"
                    className="text-base font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    contacto@onlex.pe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[80px] items-center justify-between">
            <div className="flex-shrink-0 lg:hidden">
              <Link to="/" className="flex items-center">
                <img
                  src={logoOnlex}
                  alt="ONLEX"
                  className="h-12 w-auto"
                  decoding="async"
                  fetchPriority="high"
                />
              </Link>
            </div>

            <div className="hidden flex-1 lg:flex lg:items-center lg:gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="group relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`relative flex items-center gap-1 px-4 py-7 text-[15px] font-medium uppercase tracking-[0.08em] transition-colors ${
                      isActive(item.href)
                        ? "text-accent"
                        : "text-foreground/75 hover:text-accent"
                    }`}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="h-3 w-3" />}
                    <span
                      className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 transition-all ${
                        isActive(item.href)
                          ? "w-[58%] bg-accent"
                          : "w-0 bg-accent group-hover:w-[58%]"
                      }`}
                    />
                  </Link>

                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute left-0 top-full mt-0 w-64 border border-border bg-white py-2 shadow-lg">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-6 py-3 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-accent"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Button
                asChild
                className="h-[60px] min-w-[226px] rounded-none bg-accent px-8 text-[13px] font-semibold uppercase tracking-[0.09em] text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/contacto">Consulta Gratuita</Link>
              </Button>

              <button className="p-2 text-foreground/70 transition-colors hover:text-accent" aria-label="Abrir menu secundario">
                <Menu className="h-7 w-7" />
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 text-foreground transition-colors hover:bg-muted"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="border-t border-border lg:hidden">
              <div className="space-y-1 px-2 pb-6 pt-2">
                <div className="mb-2 space-y-3 border-b border-border px-3 py-4">
                  <a
                    href="tel:+51012345678"
                    className="flex items-center gap-3 text-sm transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+51 (01) 234 5678</span>
                  </a>
                  <a
                    href="mailto:contacto@onlex.pe"
                    className="flex items-center gap-3 text-sm transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4" />
                    <span>contacto@onlex.pe</span>
                  </a>
                </div>

                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => !item.dropdown && setIsMenuOpen(false)}
                      className={`block px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                        isActive(item.href)
                          ? "bg-muted text-accent"
                          : "text-foreground/80 hover:bg-muted hover:text-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 text-xs text-foreground/70 transition-colors hover:text-accent"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="px-3 pt-4">
                  <Button asChild className="w-full bg-accent hover:bg-accent/90">
                    <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                      Consulta Gratuita
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
