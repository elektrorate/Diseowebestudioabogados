import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ShieldCheck, FileCheck, Gavel, CheckCircle2 } from "lucide-react";
import heroDefensaEstado from "@/assets/defends.webp";
import {
  defaultProcesosEstadoContent,
  getProcesosEstadoContent,
  ProcesosEstadoContent,
} from "../data/procesos-content";
import { CONTENT_UPDATED_EVENT } from "../data/content-store";
import { useSectionGalleryImage } from "../data/gallery-hooks";

const razonIcons = [ShieldCheck, FileCheck, Gavel];

export function ProcesosEstadoPage() {
  const [content, setContent] = useState<ProcesosEstadoContent>(defaultProcesosEstadoContent);
  const heroImage = useSectionGalleryImage(
    "procesos_hero",
    heroDefensaEstado,
    "Defensa legal frente al Estado",
    "100vw",
  );

  useEffect(() => {
    const sync = () => setContent(getProcesosEstadoContent());
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
      <section className="relative isolate overflow-hidden py-24 lg:py-32 text-white">
        <img
          src={heroImage.src}
          srcSet={heroImage.srcSet || undefined}
          sizes={heroImage.sizes}
          alt={heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/45" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl">{content.hero.title}</h1>
          <p className="text-xl text-white/90">{content.hero.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl sm:text-4xl">{content.queEs.title}</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
            {content.queEs.paragraphs.map((paragraph, idx) => (
              <p key={`${idx}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl sm:text-4xl">{content.casos.title}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {content.casos.cards.map((caso, index) => (
              <Card key={`${caso.title}-${index}`} className="p-8">
                <h3 className="mb-3 text-2xl">{caso.title}</h3>
                <p className="mb-6 text-muted-foreground">{caso.description}</p>
                <ul className="space-y-2">
                  {caso.items.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl sm:text-4xl">{content.razones.title}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {content.razones.cards.map((razon, index) => {
              const Icon = razonIcons[index % razonIcons.length];
              return (
                <div key={`${razon.title}-${index}`} className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mb-2">{razon.title}</h3>
                  <p className="text-muted-foreground">{razon.description}</p>
                </div>
              );
            })}
          </div>

          <Card className="mt-12 bg-secondary p-8 text-white">
            <p className="text-center text-lg">{content.razones.highlightText}</p>
          </Card>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl sm:text-4xl">{content.adicional.title}</h2>
          <div className="space-y-6">
            {content.adicional.items.map((item, index) => (
              <Card key={`${item.title}-${index}`} className="p-6">
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
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
