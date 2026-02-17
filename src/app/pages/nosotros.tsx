import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Target, Eye, Heart, Award } from "lucide-react";
import teamImageWebp from "@/assets/group-confident-businesspeople-office.webp";
import {
  defaultNosotrosContent,
  getNosotrosContent,
  NosotrosContent,
} from "../data/nosotros-content";
import { CONTENT_UPDATED_EVENT } from "../data/content-store";
import { useSectionGalleryImage } from "../data/gallery-hooks";

const valueIcons = [Heart, Award, Target, Eye];

export function NosotrosPage() {
  const [content, setContent] = useState<NosotrosContent>(defaultNosotrosContent);
  const teamImage = useSectionGalleryImage(
    "nosotros_equipo",
    teamImageWebp,
    "Equipo profesional de ONLEX",
    "(max-width: 1024px) 100vw, 50vw",
  );

  useEffect(() => {
    const sync = () => setContent(getNosotrosContent());
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
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="mb-6 text-3xl sm:text-4xl">{content.quienesSomos.title}</h2>
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                {content.quienesSomos.paragraphs.map((paragraph, idx) => (
                  <p key={`${idx}-${paragraph.slice(0, 16)}`}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-border/60 bg-muted/20 shadow-sm">
              <img
                src={teamImage.src}
                srcSet={teamImage.srcSet || undefined}
                sizes={teamImage.sizes}
                alt={teamImage.alt}
                className="h-full min-h-[320px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <Card className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <Target className="h-10 w-10 text-accent" />
                <h2 className="text-3xl">{content.misionVision.misionTitle}</h2>
              </div>
              <p className="text-lg text-muted-foreground">{content.misionVision.misionDescription}</p>
            </Card>

            <Card className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <Eye className="h-10 w-10 text-accent" />
                <h2 className="text-3xl">{content.misionVision.visionTitle}</h2>
              </div>
              <p className="text-lg text-muted-foreground">{content.misionVision.visionDescription}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl sm:text-4xl">{content.valores.title}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.valores.items.map((valor, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div key={`${valor.title}-${index}`} className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2">{valor.title}</h3>
                  <p className="text-muted-foreground">{valor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-3xl sm:text-4xl">{content.compromisoSocial.title}</h2>
          <p className="mb-8 text-center text-lg text-white/90">{content.compromisoSocial.paragraph1}</p>
          <p className="text-center text-lg text-white/90">{content.compromisoSocial.paragraph2}</p>
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
