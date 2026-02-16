import { useParams, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { especialidades } from "../data/especialidades";
import heroLaboral from "@/assets/54e6bf754107c9c49ea97b9a5ae8cf74708efb3a.webp";
import heroPrevisional from "@/assets/151cf3ccbe09ccc69d2c481a35014b24b67ab818.webp";
import heroAdministrativo from "@/assets/f17fc7e94886323543bac62dff6e2ead1d41daaf.webp";
import heroMunicipal from "@/assets/7cd1439c63657dc693a8f69ba7de1e85b57cf6fd.webp";

const especialidadHeroImages: Record<string, string> = {
  laboral: heroLaboral,
  previsional: heroPrevisional,
  administrativo: heroAdministrativo,
  municipal: heroMunicipal,
  registral: heroAdministrativo,
  civil: heroLaboral,
  familia: heroPrevisional,
  sucesiones: heroMunicipal,
};

export function EspecialidadDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const especialidad = especialidades.find((e) => e.slug === slug);
  const heroImage = slug ? especialidadHeroImages[slug] ?? heroAdministrativo : heroAdministrativo;

  if (!especialidad) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Especialidad no encontrada</h1>
          <Button asChild>
            <Link to="/especialidades">Ver todas las especialidades</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative isolate overflow-hidden py-20 text-white">
        <img
          src={heroImage}
          alt={especialidad.title}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-secondary/90" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl mb-6">{especialidad.title}</h1>
          <p className="text-xl text-white/90">{especialidad.description}</p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* En qué te ayudamos */}
          <div className="mb-16">
            <h2 className="text-3xl mb-8">¿En qué te ayudamos?</h2>
            <Card className="p-8">
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-accent" />
                Problemas frecuentes que resolvemos
              </h3>
              <ul className="space-y-3">
                {especialidad.problemas.map((problema, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{problema}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Servicios */}
          <div className="mb-16">
            <h2 className="text-3xl mb-8">Nuestros servicios</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {especialidad.servicios.map((servicio, index) => (
                <Card key={index} className="p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{servicio}</span>
                </Card>
              ))}
            </div>
          </div>

          {/* Proceso de trabajo */}
          <div className="mb-16">
            <h2 className="text-3xl mb-8">Proceso de trabajo</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground flex-shrink-0 text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2">Evaluación inicial</h3>
                    <p className="text-muted-foreground">
                      Revisamos tu documentación, analizamos los hechos y te explicamos 
                      claramente tus derechos y las opciones legales disponibles.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground flex-shrink-0 text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2">Estrategia legal</h3>
                    <p className="text-muted-foreground">
                      Diseñamos una estrategia jurídica sólida, basada en jurisprudencia 
                      y normativa vigente, orientada a lograr el mejor resultado posible.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground flex-shrink-0 text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2">Defensa y seguimiento</h3>
                    <p className="text-muted-foreground">
                      Te representamos en todas las etapas del proceso y te mantenemos 
                      informado constantemente hasta la ejecución final de la sentencia.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <Card className="p-8 bg-primary text-white text-center">
            <h2 className="text-3xl mb-4">¿Tienes un caso en {especialidad.title}?</h2>
            <p className="text-xl text-white/90 mb-6">
              Solicita una consulta y evaluaremos tu caso sin compromiso.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/contacto">Solicitar consulta</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
