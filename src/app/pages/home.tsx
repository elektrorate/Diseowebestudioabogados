import { useEffect, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Users,
  Building2,
  Landmark,
  FileText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import heroBackgroundWebp from "@/assets/54e6bf754107c9c49ea97b9a5ae8cf74708efb3a.webp";
import aboutImageWebp from "@/assets/7cd1439c63657dc693a8f69ba7de1e85b57cf6fd.webp";
import processStateImageWebp from "@/assets/f17fc7e94886323543bac62dff6e2ead1d41daaf.webp";
import gacetaImageWebp from "@/assets/151cf3ccbe09ccc69d2c481a35014b24b67ab818.webp";
import { defaultHomeContent, getHomeContent, HomeContent } from "../data/home-content";
import { CONTENT_UPDATED_EVENT } from "../data/content-store";
import { useSectionGalleryImage } from "../data/gallery-hooks";

const areaIcons = {
  laboral: Briefcase,
  previsional: Users,
  administrativo: Building2,
  municipal: Landmark,
  registral: FileText,
  civil: Scale,
} as const;

function getAreaIcon(slug: string) {
  return areaIcons[slug as keyof typeof areaIcons] ?? Scale;
}

export function HomePage() {
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const heroImage = useSectionGalleryImage(
    "home_hero",
    heroBackgroundWebp,
    "Oficina profesional de abogados",
    "100vw",
  );
  const aboutImage = useSectionGalleryImage(
    "home_about",
    aboutImageWebp,
    "Equipo profesional de abogados",
    "(max-width: 1024px) 100vw, 50vw",
  );
  const processImage = useSectionGalleryImage(
    "home_process",
    processStateImageWebp,
    "Justicia y derecho",
    "(max-width: 1024px) 100vw, 50vw",
  );
  const gacetaImage = useSectionGalleryImage(
    "home_gaceta",
    gacetaImageWebp,
    "Adultos mayores",
    "(max-width: 1024px) 100vw, 50vw",
  );

  useEffect(() => {
    const syncContent = () => setContent(getHomeContent());
    syncContent();
    window.addEventListener("storage", syncContent);
    window.addEventListener(CONTENT_UPDATED_EVENT, syncContent);
    return () => {
      window.removeEventListener("storage", syncContent);
      window.removeEventListener(CONTENT_UPDATED_EVENT, syncContent);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage.src}
            srcSet={heroImage.srcSet || undefined}
            sizes={heroImage.sizes}
            alt={heroImage.alt}
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-16 bg-accent" />
                <span className="text-sm font-light uppercase tracking-[0.2em] text-accent">{content.hero.badge}</span>
              </div>

              <h1 className="text-5xl leading-[1.1] font-normal sm:text-6xl lg:text-7xl">
                <span className="text-white">{content.hero.titleLine1} </span>
                <span className="italic" style={{ color: "#d6b416" }}>
                  {content.hero.titleAccent1}
                </span>
                <br />
                <span className="text-white">{content.hero.titleLine2} </span>
                <span className="italic" style={{ color: "#d6b416" }}>
                  {content.hero.titleAccent2}
                </span>
                <br />
                <span className="text-white">{content.hero.titleLine3}</span>
              </h1>

              <p className="max-w-xl text-xl leading-relaxed font-light text-white/80">{content.hero.description}</p>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-none border-2 border-accent bg-accent px-8 text-sm font-semibold text-accent-foreground uppercase tracking-wider transition-all hover:border-accent/90 hover:bg-accent/90"
                >
                  <Link to={content.hero.ctaPrimaryHref} className="flex items-center gap-2">
                    {content.hero.ctaPrimaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-none border-2 border-white bg-transparent px-8 text-sm font-semibold text-white uppercase tracking-wider transition-all hover:bg-white hover:text-primary"
                >
                  <Link to={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondaryLabel}</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 border-t border-white/20 pt-8">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-sm text-white/90">{content.hero.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-sm text-white/90">{content.hero.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <ImageWithFallback
                src={aboutImage.src}
                srcSet={aboutImage.srcSet || undefined}
                sizes={aboutImage.sizes}
                alt={aboutImage.alt}
                className="h-[550px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="order-1 space-y-8 lg:order-2">
              <div>
                <span className="text-sm font-light uppercase tracking-[0.2em] text-accent">{content.about.badge}</span>
              </div>

              <h2 className="text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">{content.about.title}</h2>

              <p className="text-lg leading-relaxed text-muted-foreground">{content.about.description}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-accent/30 bg-accent/5">
                    <Scale className="h-7 w-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 text-xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {content.about.feature1Title}
                    </h4>
                    <p className="leading-relaxed text-muted-foreground">{content.about.feature1Description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-accent/30 bg-accent/5">
                    <ShieldCheck className="h-7 w-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 text-xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {content.about.feature2Title}
                    </h4>
                    <p className="leading-relaxed text-muted-foreground">{content.about.feature2Description}</p>
                  </div>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="mt-8 h-14 rounded-none bg-primary px-10 text-sm font-semibold text-white uppercase tracking-wider hover:bg-primary/90"
              >
                <Link to={content.about.ctaHref} className="flex items-center gap-2">
                  {content.about.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-[2px] w-16 bg-accent" />
              <span className="text-sm font-light uppercase tracking-[0.2em] text-accent">{content.services.badge}</span>
              <div className="h-[2px] w-16 bg-accent" />
            </div>

            <h2 className="mb-6 text-4xl md:text-5xl">
              {content.services.titlePrefix} <span className="text-accent italic">{content.services.titleAccent}</span>
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">{content.services.description}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.areas.map((area) => {
              const Icon = getAreaIcon(area.slug);
              return (
                <Card
                  key={`${area.slug}-${area.title}`}
                  className="group relative overflow-hidden rounded-none border-2 border-border transition-all duration-300 hover:border-accent hover:shadow-xl"
                >
                  <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="p-8">
                    <Icon className="mb-6 h-12 w-12 text-primary transition-colors group-hover:text-accent" />
                    <h3 className="mb-3 text-xl">{area.title}</h3>
                    <p className="mb-6 leading-relaxed text-muted-foreground">{area.description}</p>

                    <Link
                      to={`/especialidades/${area.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider transition-colors group-hover:text-accent"
                    >
                      Conocer mas
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#6A4312] py-24 text-white">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-[#8B5A16]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="order-2 space-y-8 lg:order-1">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-16 bg-accent" />
                <span className="text-sm font-light uppercase tracking-[0.2em] text-accent">{content.processState.badge}</span>
              </div>

              <h2 className="text-4xl leading-tight md:text-5xl">
                {content.processState.titlePrefix} <span className="text-accent italic">{content.processState.titleAccent}</span>{" "}
                {content.processState.titleSuffix}
              </h2>

              <p className="text-xl leading-relaxed text-white/80">{content.processState.description}</p>

              <div className="space-y-4 pt-4">
                {content.processState.bullets.map((bullet) => (
                  <div key={bullet.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-accent bg-accent/10">
                      <ShieldCheck className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-lg">{bullet.title}</h4>
                      <p className="text-sm leading-relaxed text-white/70">{bullet.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute -bottom-8 -left-8 hidden h-64 w-64 border-2 border-accent/30 lg:block" />
              <ImageWithFallback
                src={processImage.src}
                srcSet={processImage.srcSet || undefined}
                sizes={processImage.sizes}
                alt={processImage.alt}
                className="relative z-10 h-[500px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <ImageWithFallback
                src={gacetaImage.src}
                srcSet={gacetaImage.srcSet || undefined}
                sizes={gacetaImage.sizes}
                alt={gacetaImage.alt}
                className="h-[500px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -top-8 -right-8 hidden h-64 w-64 border-2 border-accent/20 lg:block" />
            </div>

            <div className="order-1 space-y-6 lg:order-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-[2px] w-16 bg-accent" />
                <span className="text-sm font-light uppercase tracking-[0.2em] text-accent">{content.gaceta.badge}</span>
              </div>

              <h2 className="text-4xl leading-tight md:text-5xl">
                {content.gaceta.titlePrefix} <span className="text-accent italic">{content.gaceta.titleAccent}</span>{" "}
                {content.gaceta.titleSuffix}
              </h2>

              <p className="text-lg leading-relaxed text-muted-foreground">{content.gaceta.description1}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{content.gaceta.description2}</p>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-6 h-14 rounded-none border-2 border-primary px-8 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-primary hover:text-white"
              >
                <Link to={content.gaceta.ctaHref} className="flex items-center gap-2">
                  {content.gaceta.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-24 text-white">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl space-y-10 px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-16 bg-accent" />
            <span className="text-sm font-light uppercase tracking-[0.2em] text-accent">{content.finalCta.badge}</span>
            <div className="h-[2px] w-16 bg-accent" />
          </div>

          <h2 className="text-4xl leading-tight sm:text-5xl md:text-6xl">
            {content.finalCta.titleLine1}
            <br />
            <span className="text-accent italic">{content.finalCta.titleAccent}</span>
          </h2>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/80">{content.finalCta.description}</p>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-none border-2 border-accent bg-accent px-10 text-sm font-semibold text-accent-foreground uppercase tracking-wider transition-all hover:border-accent/90 hover:bg-accent/90"
            >
              <Link to={content.finalCta.ctaPrimaryHref} className="flex items-center gap-2">
                {content.finalCta.ctaPrimaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-none border-2 border-white bg-transparent px-10 text-sm font-semibold text-white uppercase tracking-wider transition-all hover:bg-white hover:text-primary"
            >
              <Link to={content.finalCta.ctaSecondaryHref}>{content.finalCta.ctaSecondaryLabel}</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 border-t border-white/20 pt-8">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-sm text-white/90">{content.finalCta.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-accent" />
              <span className="text-sm text-white/90">{content.finalCta.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-accent" />
              <span className="text-sm text-white/90">{content.finalCta.email}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
