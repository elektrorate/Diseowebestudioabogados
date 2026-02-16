import { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  defaultNosotrosContent,
  getNosotrosContent,
  NosotrosContent,
  resetNosotrosContent,
  saveNosotrosContent,
} from "../../data/nosotros-content";
import { toast } from "sonner";
import { CONTENT_UPDATED_EVENT } from "../../data/content-store";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function AdminNosotrosContent() {
  const [content, setContent] = useState<NosotrosContent>(getNosotrosContent());
  const [isSaving, setIsSaving] = useState(false);

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

  const quienesSomosText = useMemo(() => content.quienesSomos.paragraphs.join("\n"), [content.quienesSomos.paragraphs]);
  const valoresText = useMemo(
    () => content.valores.items.map((item) => `${item.title}|${item.description}`).join("\n"),
    [content.valores.items],
  );

  const update = <K extends keyof NosotrosContent>(section: K, key: keyof NosotrosContent[K], value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const save = async () => {
    setIsSaving(true);
    try {
      await saveNosotrosContent(content);
      toast.success("Contenido de Nosotros actualizado");
    } catch {
      toast.error("No se pudo guardar el contenido de Nosotros");
    } finally {
      setIsSaving(false);
    }
  };

  const reset = async () => {
    setIsSaving(true);
    try {
      await resetNosotrosContent();
      setContent(defaultNosotrosContent);
      toast.success("Contenido de Nosotros restaurado");
    } catch {
      toast.error("No se pudo restaurar el contenido de Nosotros");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl">Administrar Nosotros</h1>
          <p className="text-muted-foreground">Edita secciones de la pagina Nosotros por categorias.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => void reset()} disabled={isSaving}>Restaurar por defecto</Button>
          <Button onClick={() => void save()} disabled={isSaving} className="bg-accent text-accent-foreground hover:bg-accent/90">{isSaving ? "Guardando..." : "Guardar cambios"}</Button>
        </div>
      </div>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Hero</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Titulo</Label><Input value={content.hero.title} onChange={(e) => update("hero", "title", e.target.value)} /></div>
          <div><Label>Descripcion</Label><Textarea rows={2} value={content.hero.description} onChange={(e) => update("hero", "description", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Quienes somos</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Titulo</Label><Input value={content.quienesSomos.title} onChange={(e) => update("quienesSomos", "title", e.target.value)} /></div>
          <div className="md:col-span-2">
            <Label>Parrafos (una linea por parrafo)</Label>
            <Textarea rows={8} value={quienesSomosText} onChange={(e) => setContent((prev) => ({ ...prev, quienesSomos: { ...prev.quienesSomos, paragraphs: parseLines(e.target.value) } }))} />
          </div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Mision y Vision</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Titulo mision</Label><Input value={content.misionVision.misionTitle} onChange={(e) => update("misionVision", "misionTitle", e.target.value)} /></div>
          <div><Label>Titulo vision</Label><Input value={content.misionVision.visionTitle} onChange={(e) => update("misionVision", "visionTitle", e.target.value)} /></div>
          <div><Label>Descripcion mision</Label><Textarea rows={4} value={content.misionVision.misionDescription} onChange={(e) => update("misionVision", "misionDescription", e.target.value)} /></div>
          <div><Label>Descripcion vision</Label><Textarea rows={4} value={content.misionVision.visionDescription} onChange={(e) => update("misionVision", "visionDescription", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Valores</h2>
        <div><Label>Titulo</Label><Input value={content.valores.title} onChange={(e) => update("valores", "title", e.target.value)} /></div>
        <div>
          <Label>Items (titulo|descripcion por linea)</Label>
          <Textarea rows={6} value={valoresText} onChange={(e) => setContent((prev) => ({
            ...prev,
            valores: {
              ...prev.valores,
              items: parseLines(e.target.value).map((line) => {
                const [title = "", description = ""] = line.split("|").map((x) => x.trim());
                return { title, description };
              }),
            },
          }))} />
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Compromiso social</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Titulo</Label><Input value={content.compromisoSocial.title} onChange={(e) => update("compromisoSocial", "title", e.target.value)} /></div>
          <div><Label>Parrafo 1</Label><Textarea rows={4} value={content.compromisoSocial.paragraph1} onChange={(e) => update("compromisoSocial", "paragraph1", e.target.value)} /></div>
          <div><Label>Parrafo 2</Label><Textarea rows={4} value={content.compromisoSocial.paragraph2} onChange={(e) => update("compromisoSocial", "paragraph2", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">CTA</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Titulo</Label><Input value={content.cta.title} onChange={(e) => update("cta", "title", e.target.value)} /></div>
          <div><Label>Descripcion</Label><Textarea rows={2} value={content.cta.description} onChange={(e) => update("cta", "description", e.target.value)} /></div>
          <div><Label>Boton texto</Label><Input value={content.cta.buttonLabel} onChange={(e) => update("cta", "buttonLabel", e.target.value)} /></div>
          <div><Label>Boton link</Label><Input value={content.cta.buttonHref} onChange={(e) => update("cta", "buttonHref", e.target.value)} /></div>
        </div>
      </Card>
    </div>
  );
}
