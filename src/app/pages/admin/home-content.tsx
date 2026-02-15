import { useMemo, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  defaultHomeContent,
  getHomeContent,
  HomeContent,
  resetHomeContent,
  saveHomeContent,
} from "../../data/home-content";
import { toast } from "sonner";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function AdminHomeContent() {
  const [content, setContent] = useState<HomeContent>(getHomeContent());

  const servicesText = useMemo(
    () =>
      content.services.areas
        .map((item) => `${item.slug}|${item.title}|${item.description}`)
        .join("\n"),
    [content.services.areas],
  );

  const processBulletsText = useMemo(
    () => content.processState.bullets.map((item) => `${item.title}|${item.description}`).join("\n"),
    [content.processState.bullets],
  );

  const updateSection = <K extends keyof HomeContent>(section: K, key: keyof HomeContent[K], value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleServicesChange = (value: string) => {
    const parsed = parseLines(value).map((line) => {
      const [slug = "", title = "", description = ""] = line.split("|").map((item) => item.trim());
      return { slug, title, description };
    });
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        areas: parsed,
      },
    }));
  };

  const handleBulletsChange = (value: string) => {
    const parsed = parseLines(value).map((line) => {
      const [title = "", description = ""] = line.split("|").map((item) => item.trim());
      return { title, description };
    });
    setContent((prev) => ({
      ...prev,
      processState: {
        ...prev.processState,
        bullets: parsed,
      },
    }));
  };

  const handleSave = () => {
    saveHomeContent(content);
    toast.success("Contenido de Inicio actualizado");
  };

  const handleReset = () => {
    resetHomeContent();
    setContent(defaultHomeContent);
    toast.success("Contenido de Inicio restaurado a valores por defecto");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl">Administrar Pagina Inicio</h1>
          <p className="text-muted-foreground">Edita todo el contenido de Inicio, organizado por secciones.</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Restaurar por defecto
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSave}>
            Guardar cambios
          </Button>
        </div>
      </div>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Seccion Hero</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Badge</Label>
            <Input value={content.hero.badge} onChange={(e) => updateSection("hero", "badge", e.target.value)} />
          </div>
          <div>
            <Label>Descripcion</Label>
            <Textarea value={content.hero.description} onChange={(e) => updateSection("hero", "description", e.target.value)} rows={2} />
          </div>
          <div><Label>Titulo linea 1</Label><Input value={content.hero.titleLine1} onChange={(e) => updateSection("hero", "titleLine1", e.target.value)} /></div>
          <div><Label>Titulo acento 1</Label><Input value={content.hero.titleAccent1} onChange={(e) => updateSection("hero", "titleAccent1", e.target.value)} /></div>
          <div><Label>Titulo linea 2</Label><Input value={content.hero.titleLine2} onChange={(e) => updateSection("hero", "titleLine2", e.target.value)} /></div>
          <div><Label>Titulo acento 2</Label><Input value={content.hero.titleAccent2} onChange={(e) => updateSection("hero", "titleAccent2", e.target.value)} /></div>
          <div><Label>Titulo linea 3</Label><Input value={content.hero.titleLine3} onChange={(e) => updateSection("hero", "titleLine3", e.target.value)} /></div>
          <div><Label>Telefono</Label><Input value={content.hero.phone} onChange={(e) => updateSection("hero", "phone", e.target.value)} /></div>
          <div><Label>Email</Label><Input value={content.hero.email} onChange={(e) => updateSection("hero", "email", e.target.value)} /></div>
          <div><Label>CTA primario texto</Label><Input value={content.hero.ctaPrimaryLabel} onChange={(e) => updateSection("hero", "ctaPrimaryLabel", e.target.value)} /></div>
          <div><Label>CTA primario link</Label><Input value={content.hero.ctaPrimaryHref} onChange={(e) => updateSection("hero", "ctaPrimaryHref", e.target.value)} /></div>
          <div><Label>CTA secundario texto</Label><Input value={content.hero.ctaSecondaryLabel} onChange={(e) => updateSection("hero", "ctaSecondaryLabel", e.target.value)} /></div>
          <div><Label>CTA secundario link</Label><Input value={content.hero.ctaSecondaryHref} onChange={(e) => updateSection("hero", "ctaSecondaryHref", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Seccion Sobre ONLEX</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Badge</Label><Input value={content.about.badge} onChange={(e) => updateSection("about", "badge", e.target.value)} /></div>
          <div><Label>CTA texto</Label><Input value={content.about.ctaLabel} onChange={(e) => updateSection("about", "ctaLabel", e.target.value)} /></div>
          <div><Label>CTA link</Label><Input value={content.about.ctaHref} onChange={(e) => updateSection("about", "ctaHref", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Titulo</Label><Input value={content.about.title} onChange={(e) => updateSection("about", "title", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Descripcion</Label><Textarea rows={3} value={content.about.description} onChange={(e) => updateSection("about", "description", e.target.value)} /></div>
          <div><Label>Feature 1 titulo</Label><Input value={content.about.feature1Title} onChange={(e) => updateSection("about", "feature1Title", e.target.value)} /></div>
          <div><Label>Feature 1 descripcion</Label><Textarea rows={2} value={content.about.feature1Description} onChange={(e) => updateSection("about", "feature1Description", e.target.value)} /></div>
          <div><Label>Feature 2 titulo</Label><Input value={content.about.feature2Title} onChange={(e) => updateSection("about", "feature2Title", e.target.value)} /></div>
          <div><Label>Feature 2 descripcion</Label><Textarea rows={2} value={content.about.feature2Description} onChange={(e) => updateSection("about", "feature2Description", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Seccion Areas de Practica</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Badge</Label><Input value={content.services.badge} onChange={(e) => updateSection("services", "badge", e.target.value)} /></div>
          <div><Label>Titulo prefijo</Label><Input value={content.services.titlePrefix} onChange={(e) => updateSection("services", "titlePrefix", e.target.value)} /></div>
          <div><Label>Titulo acento</Label><Input value={content.services.titleAccent} onChange={(e) => updateSection("services", "titleAccent", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Descripcion</Label><Textarea rows={3} value={content.services.description} onChange={(e) => updateSection("services", "description", e.target.value)} /></div>
        </div>
        <Label className="mt-2 block">Tarjetas: slug|titulo|descripcion (una linea por item)</Label>
        <Textarea rows={8} value={servicesText} onChange={(e) => handleServicesChange(e.target.value)} />
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Seccion Procesos contra el Estado</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Badge</Label><Input value={content.processState.badge} onChange={(e) => updateSection("processState", "badge", e.target.value)} /></div>
          <div><Label>Titulo prefijo</Label><Input value={content.processState.titlePrefix} onChange={(e) => updateSection("processState", "titlePrefix", e.target.value)} /></div>
          <div><Label>Titulo acento</Label><Input value={content.processState.titleAccent} onChange={(e) => updateSection("processState", "titleAccent", e.target.value)} /></div>
          <div><Label>Titulo sufijo</Label><Input value={content.processState.titleSuffix} onChange={(e) => updateSection("processState", "titleSuffix", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Descripcion</Label><Textarea rows={3} value={content.processState.description} onChange={(e) => updateSection("processState", "description", e.target.value)} /></div>
        </div>
        <Label className="mt-2 block">Items: titulo|descripcion (una linea por item)</Label>
        <Textarea rows={6} value={processBulletsText} onChange={(e) => handleBulletsChange(e.target.value)} />
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Seccion Gaceta</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Badge</Label><Input value={content.gaceta.badge} onChange={(e) => updateSection("gaceta", "badge", e.target.value)} /></div>
          <div><Label>Titulo prefijo</Label><Input value={content.gaceta.titlePrefix} onChange={(e) => updateSection("gaceta", "titlePrefix", e.target.value)} /></div>
          <div><Label>Titulo acento</Label><Input value={content.gaceta.titleAccent} onChange={(e) => updateSection("gaceta", "titleAccent", e.target.value)} /></div>
          <div><Label>Titulo sufijo</Label><Input value={content.gaceta.titleSuffix} onChange={(e) => updateSection("gaceta", "titleSuffix", e.target.value)} /></div>
          <div><Label>CTA texto</Label><Input value={content.gaceta.ctaLabel} onChange={(e) => updateSection("gaceta", "ctaLabel", e.target.value)} /></div>
          <div><Label>CTA link</Label><Input value={content.gaceta.ctaHref} onChange={(e) => updateSection("gaceta", "ctaHref", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Descripcion 1</Label><Textarea rows={3} value={content.gaceta.description1} onChange={(e) => updateSection("gaceta", "description1", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Descripcion 2</Label><Textarea rows={3} value={content.gaceta.description2} onChange={(e) => updateSection("gaceta", "description2", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Seccion CTA final</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Badge</Label><Input value={content.finalCta.badge} onChange={(e) => updateSection("finalCta", "badge", e.target.value)} /></div>
          <div><Label>Titulo linea 1</Label><Input value={content.finalCta.titleLine1} onChange={(e) => updateSection("finalCta", "titleLine1", e.target.value)} /></div>
          <div><Label>Titulo acento</Label><Input value={content.finalCta.titleAccent} onChange={(e) => updateSection("finalCta", "titleAccent", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Descripcion</Label><Textarea rows={3} value={content.finalCta.description} onChange={(e) => updateSection("finalCta", "description", e.target.value)} /></div>
          <div><Label>CTA primario texto</Label><Input value={content.finalCta.ctaPrimaryLabel} onChange={(e) => updateSection("finalCta", "ctaPrimaryLabel", e.target.value)} /></div>
          <div><Label>CTA primario link</Label><Input value={content.finalCta.ctaPrimaryHref} onChange={(e) => updateSection("finalCta", "ctaPrimaryHref", e.target.value)} /></div>
          <div><Label>CTA secundario texto</Label><Input value={content.finalCta.ctaSecondaryLabel} onChange={(e) => updateSection("finalCta", "ctaSecondaryLabel", e.target.value)} /></div>
          <div><Label>CTA secundario link</Label><Input value={content.finalCta.ctaSecondaryHref} onChange={(e) => updateSection("finalCta", "ctaSecondaryHref", e.target.value)} /></div>
          <div><Label>Ubicacion</Label><Input value={content.finalCta.location} onChange={(e) => updateSection("finalCta", "location", e.target.value)} /></div>
          <div><Label>Telefono</Label><Input value={content.finalCta.phone} onChange={(e) => updateSection("finalCta", "phone", e.target.value)} /></div>
          <div><Label>Email</Label><Input value={content.finalCta.email} onChange={(e) => updateSection("finalCta", "email", e.target.value)} /></div>
        </div>
      </Card>
    </div>
  );
}
