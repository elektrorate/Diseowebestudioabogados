import { useEffect, useState } from "react";
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
  Scale,
} from "lucide-react";
import {
  defaultEspecialidadesContent,
  EspecialidadesContent,
  getEspecialidadesContent,
} from "../data/especialidades-content";
import { CONTENT_UPDATED_EVENT } from "../data/content-store";

const areaIcons = {
  laboral: Briefcase,
  previsional: Users,
  administrativo: Building2,
  municipal: Landmark,
  registral: FileText,
  civil: Scale,
  familia: Heart,
  sucesiones: Home,
} as const;

function getAreaIcon(slug: string) {
  return areaIcons[slug as keyof typeof areaIcons] ?? Scale;
}

export function EspecialidadesPage() {
  const [content, setContent] = useState<EspecialidadesContent>(defaultEspecialidadesContent);

  useEffect(() => {
    const sync = () => setContent(getEspecialidadesContent());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CONTENT_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CONTENT_UPDATED_EVENT, sync);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl">{content.hero.title}</h1>
            <p className="text-xl text-white/90">{content.hero.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.areas.map((area) => {
              const Icon = getAreaIcon(area.slug);
              return (
                <Card key={`${area.slug}-${area.title}`} className="group cursor-pointer p-8 transition-all hover:shadow-xl">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-accent/10">
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-accent" />
                  </div>
                  <h2 className="mb-3 text-2xl">{area.title}</h2>
                  <p className="mb-6 text-muted-foreground">{area.description}</p>
                  <Button asChild variant="outline" className="w-full group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <Link to={`/especialidades/${area.slug}`}>Ver detalles</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl sm:text-4xl">{content.proceso.title}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-accent-foreground">1</div>
              <h3 className="mb-2">{content.proceso.step1Title}</h3>
              <p className="text-muted-foreground">{content.proceso.step1Description}</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-accent-foreground">2</div>
              <h3 className="mb-2">{content.proceso.step2Title}</h3>
              <p className="text-muted-foreground">{content.proceso.step2Description}</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-accent-foreground">3</div>
              <h3 className="mb-2">{content.proceso.step3Title}</h3>
              <p className="text-muted-foreground">{content.proceso.step3Description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl">{content.cta.title}</h2>
          <p className="text-lg text-muted-foreground">{content.cta.description}</p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to={content.cta.buttonHref}>{content.cta.buttonLabel}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
