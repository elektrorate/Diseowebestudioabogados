import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logoOnlex from "@/assets/08486880406d58026342a3b0d089b6479280a8ee.png";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logoOnlex} 
                alt="ONLEX - Tu solución legal en línea" 
                className="h-18 w-auto"
              />
            </Link>
            <p className="text-white/80 mb-4">
              Estudio jurídico especializado en la defensa de derechos laborales, previsionales y administrativos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-white/80 hover:text-accent transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/especialidades" className="text-white/80 hover:text-accent transition-colors">
                  Especialidades
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Especialidades */}
          <div>
            <h3 className="mb-4">Especialidades</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/especialidades/laboral" className="text-white/80 hover:text-accent transition-colors">
                  Derecho Laboral
                </Link>
              </li>
              <li>
                <Link to="/especialidades/previsional" className="text-white/80 hover:text-accent transition-colors">
                  Derecho Previsional
                </Link>
              </li>
              <li>
                <Link to="/especialidades/administrativo" className="text-white/80 hover:text-accent transition-colors">
                  Derecho Administrativo
                </Link>
              </li>
              <li>
                <Link to="/procesos-estado" className="text-white/80 hover:text-accent transition-colors">
                  Procesos contra el Estado
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80">+51 (01) 234-5678</p>
                  <p className="text-white/80">+51 987 654 321</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-white/80">contacto@onlex.pe</p>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-white/80">Av. Javier Prado Este 123, San Isidro, Lima, Perú</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} ONLEX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
