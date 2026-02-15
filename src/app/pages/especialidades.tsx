import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Briefcase, 
  Users, 
  Building2, 
  Home, 
  FileText, 
  Heart, 
  Landmark,
  Scale
} from "lucide-react";

export function EspecialidadesPage() {
  const areas = [
    {
      icon: Briefcase,
      title: "Derecho Laboral",
      description: "Defensa integral en conflictos laborales del sector público y privado. Despidos, beneficios sociales y reposición.",
      slug: "laboral"
    },
    {
      icon: Users,
      title: "Derecho Previsional",
      description: "Especialistas en pensiones ONP. Reconocimiento, recálculo y cobro de devengados pensionarios.",
      slug: "previsional"
    },
    {
      icon: Building2,
      title: "Derecho Administrativo",
      description: "Procesos contra el Estado. Nulidad de actos administrativos y contencioso-administrativo.",
      slug: "administrativo"
    },
    {
      icon: Landmark,
      title: "Derecho Municipal",
      description: "Defensa ante municipalidades. Multas, clausuras y procedimientos administrativos municipales.",
      slug: "municipal"
    },
    {
      icon: FileText,
      title: "Derecho Registral",
      description: "Procedimientos SUNARP. Inscripciones, rectificaciones y defensa de derechos registrales.",
      slug: "registral"
    },
    {
      icon: Scale,
      title: "Derecho Civil",
      description: "Contratos, obligaciones y responsabilidad civil. Defensa de derechos patrimoniales.",
      slug: "civil"
    },
    {
      icon: Heart,
      title: "Derecho de Familia",
      description: "Divorcios, alimentos, tenencia y régimen de visitas. Acompañamiento humano y profesional.",
      slug: "familia"
    },
    {
      icon: Home,
      title: "Sucesiones",
      description: "Testamentos, declaratoria de herederos y particiones. Planificación patrimonial integral.",
      slug: "sucesiones"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Nuestras especialidades
            </h1>
            <p className="text-xl text-white/90">
              Defendemos tus derechos con experiencia, compromiso y resultados comprobados 
              en cada área del derecho.
            </p>
          </div>
        </div>
      </section>

      {/* Especialidades Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h2 className="text-2xl mb-3">{area.title}</h2>
                  <p className="text-muted-foreground mb-6">
                    {area.description}
                  </p>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    <Link to={`/especialidades/${area.slug}`}>Ver detalles</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-12 text-center">
            Cómo trabajamos contigo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4 text-2xl">
                1
              </div>
              <h3 className="mb-2">Evaluación</h3>
              <p className="text-muted-foreground">
                Analizamos tu caso de manera detallada y te explicamos las opciones legales disponibles.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4 text-2xl">
                2
              </div>
              <h3 className="mb-2">Estrategia</h3>
              <p className="text-muted-foreground">
                Diseñamos una estrategia legal sólida, clara y orientada a resultados.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4 text-2xl">
                3
              </div>
              <h3 className="mb-2">Defensa y seguimiento</h3>
              <p className="text-muted-foreground">
                Te acompañamos en todo el proceso hasta lograr el cumplimiento efectivo de la sentencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl">
            ¿No estás seguro de qué área legal necesitas?
          </h2>
          <p className="text-lg text-muted-foreground">
            Contáctanos y te orientaremos sobre la mejor forma de defender tu caso.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/contacto">Solicita tu consulta</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}