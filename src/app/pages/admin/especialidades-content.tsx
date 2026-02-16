import { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  defaultEspecialidadesContent,
  EspecialidadesContent,
  getEspecialidadesContent,
  resetEspecialidadesContent,
  saveEspecialidadesContent,
} from "../../data/especialidades-content";
import { toast } from "sonner";
import { CONTENT_UPDATED_EVENT } from "../../data/content-store";

function parseLines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

export function AdminEspecialidadesContent() {
  const [content, setContent] = useState<EspecialidadesContent>(getEspecialidadesContent());
  const [isSaving, setIsSaving] = useState(false);

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

  const areasText = useMemo(
    () => content.areas.map((item) => `${item.slug}|${item.title}|${item.description}`).join("\n"),
    [content.areas],
  );

  const update = <K extends keyof EspecialidadesContent>(section: K, key: keyof EspecialidadesContent[K], value: string) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const save = async () => {
    setIsSaving(true);
    try {
      await saveEspecialidadesContent(content);
      toast.success("Contenido de Especialidades actualizado");
    } catch {
      toast.error("No se pudo guardar el contenido de Especialidades");
    } finally {
      setIsSaving(false);
    }
  };

  const reset = async () => {
    setIsSaving(true);
    try {
      await resetEspecialidadesContent();
      setContent(defaultEspecialidadesContent);
      toast.success("Contenido de Especialidades restaurado");
    } catch {
      toast.error("No se pudo restaurar el contenido de Especialidades");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl">Administrar Especialidades</h1>
          <p className="text-muted-foreground">Gestiona contenido por secciones de la pagina Especialidades.</p>
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
          <div><Label>Descripcion</Label><Textarea rows={3} value={content.hero.description} onChange={(e) => update("hero", "description", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Cards de especialidades</h2>
        <Label>Formato por linea: slug|titulo|descripcion</Label>
        <Textarea rows={10} value={areasText} onChange={(e) => setContent((prev) => ({
          ...prev,
          areas: parseLines(e.target.value).map((line) => {
            const [slug = "", title = "", description = ""] = line.split("|").map((x) => x.trim());
            return { slug, title, description };
          }),
        }))} />
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Proceso de trabajo</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Titulo seccion</Label><Input value={content.proceso.title} onChange={(e) => update("proceso", "title", e.target.value)} /></div>
          <div><Label>Paso 1 titulo</Label><Input value={content.proceso.step1Title} onChange={(e) => update("proceso", "step1Title", e.target.value)} /></div>
          <div><Label>Paso 1 descripcion</Label><Textarea rows={2} value={content.proceso.step1Description} onChange={(e) => update("proceso", "step1Description", e.target.value)} /></div>
          <div><Label>Paso 2 titulo</Label><Input value={content.proceso.step2Title} onChange={(e) => update("proceso", "step2Title", e.target.value)} /></div>
          <div><Label>Paso 2 descripcion</Label><Textarea rows={2} value={content.proceso.step2Description} onChange={(e) => update("proceso", "step2Description", e.target.value)} /></div>
          <div><Label>Paso 3 titulo</Label><Input value={content.proceso.step3Title} onChange={(e) => update("proceso", "step3Title", e.target.value)} /></div>
          <div><Label>Paso 3 descripcion</Label><Textarea rows={2} value={content.proceso.step3Description} onChange={(e) => update("proceso", "step3Description", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">CTA final</h2>
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
