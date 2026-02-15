import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Search, Phone, Mail, ChevronDown } from "lucide-react";
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
        { name: "Quiénes Somos", href: "/nosotros" },
        { name: "Nuestro Equipo", href: "/nosotros#equipo" },
      ]
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
      ]
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar - Contact Info */}
      <div className="border-b border-border/50 bg-white hidden lg:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={logoOnlex} 
                  alt="ONLEX - Tu solución legal en línea" 
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-10">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-light">
                    Teléfono
                  </span>
                  <a 
                    href="tel:+51012345678" 
                    className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
                  >
                    +51 (01) 234 5678
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-light">
                    Email
                  </span>
                  <a 
                    href="mailto:contacto@onlex.pe" 
                    className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
                  >
                    contacto@onlex.pe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Navigation */}
      <div className="bg-white border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - Mobile Only */}
            <div className="flex-shrink-0 lg:hidden">
              <Link to="/" className="flex items-center">
                <img 
                  src={logoOnlex} 
                  alt="ONLEX" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8 flex-1">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 text-sm uppercase tracking-wider font-medium transition-colors py-5 border-b-2 ${
                      isActive(item.href)
                        ? "text-accent border-accent"
                        : "text-foreground/70 hover:text-accent border-transparent hover:border-accent/50"
                    }`}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-border mt-0 py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-6 py-3 text-sm text-foreground/80 hover:bg-muted hover:text-accent transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              {/* Search Icon */}
              <button className="p-2 text-foreground/70 hover:text-accent transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Free Quote Button */}
              <Button 
                asChild 
                className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-wider text-xs font-semibold h-12 px-6 rounded-none"
              >
                <Link to="/contacto">Consulta Gratuita</Link>
              </Button>

              {/* Menu Icon */}
              <button className="p-2 text-foreground/70 hover:text-accent transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border">
              <div className="space-y-1 px-2 pb-6 pt-2">
                {/* Contact Info Mobile */}
                <div className="px-3 py-4 space-y-3 border-b border-border mb-2">
                  <a 
                    href="tel:+51012345678" 
                    className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+51 (01) 234 5678</span>
                  </a>
                  <a 
                    href="mailto:contacto@onlex.pe" 
                    className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>contacto@onlex.pe</span>
                  </a>
                </div>

                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => !item.dropdown && setIsMenuOpen(false)}
                      className={`block px-3 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
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
                            className="block px-3 py-2 text-xs text-foreground/70 hover:text-accent transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 px-3">
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
