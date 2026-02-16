import { useMemo, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  defaultProcesosEstadoContent,
  getProcesosEstadoContent,
  ProcesosEstadoContent,
  resetProcesosEstadoContent,
  saveProcesosEstadoContent,
} from "../../data/procesos-content";
import { toast } from "sonner";

function parseLines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

export function AdminProcesosEstadoContent() {
  const [content, setContent] = useState<ProcesosEstadoContent>(getProcesosEstadoContent());

  const queEsText = useMemo(() => content.queEs.paragraphs.join("\n"), [content.queEs.paragraphs]);
  const casosText = useMemo(
    () => content.casos.cards.map((card) => `${card.title}|${card.description}|${card.items.join(";")}`).join("\n"),
    [content.casos.cards],
  );
  const razonesText = useMemo(
    () => content.razones.cards.map((item) => `${item.title}|${item.description}`).join("\n"),
    [content.razones.cards],
  );
  const adicionalText = useMemo(
    () => content.adicional.items.map((item) => `${item.title}|${item.description}`).join("\n"),
    [content.adicional.items],
  );

  const update = <K extends keyof ProcesosEstadoContent>(section: K, key: keyof ProcesosEstadoContent[K], value: string) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const save = () => {
    saveProcesosEstadoContent(content);
    toast.success("Contenido de Procesos actualizado");
  };

  const reset = () => {
    resetProcesosEstadoContent();
    setContent(defaultProcesosEstadoContent);
    toast.success("Contenido de Procesos restaurado");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl">Administrar Procesos vs Estado</h1>
          <p className="text-muted-foreground">Edita el contenido por categorias y secciones.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={reset}>Restaurar por defecto</Button>
          <Button onClick={save} className="bg-accent text-accent-foreground hover:bg-accent/90">Guardar cambios</Button>
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
        <h2 className="text-xl">Que es un proceso contra el Estado</h2>
        <div><Label>Titulo</Label><Input value={content.queEs.title} onChange={(e) => update("queEs", "title", e.target.value)} /></div>
        <div><Label>Parrafos (una linea por parrafo)</Label><Textarea rows={7} value={queEsText} onChange={(e) => setContent((prev) => ({ ...prev, queEs: { ...prev.queEs, paragraphs: parseLines(e.target.value) } }))} /></div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Casos frecuentes</h2>
        <div><Label>Titulo seccion</Label><Input value={content.casos.title} onChange={(e) => update("casos", "title", e.target.value)} /></div>
        <div>
          <Label>Cards (titulo|descripcion|item1;item2;item3 por linea)</Label>
          <Textarea rows={10} value={casosText} onChange={(e) => setContent((prev) => ({
            ...prev,
            casos: {
              ...prev.casos,
              cards: parseLines(e.target.value).map((line) => {
                const [title = "", description = "", rawItems = ""] = line.split("|").map((x) => x.trim());
                return { title, description, items: rawItems.split(";").map((x) => x.trim()).filter(Boolean) };
              }),
            },
          }))} />
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Razones de defensa especializada</h2>
        <div><Label>Titulo seccion</Label><Input value={content.razones.title} onChange={(e) => update("razones", "title", e.target.value)} /></div>
        <div><Label>Cards (titulo|descripcion por linea)</Label><Textarea rows={6} value={razonesText} onChange={(e) => setContent((prev) => ({
          ...prev,
          razones: {
            ...prev.razones,
            cards: parseLines(e.target.value).map((line) => {
              const [title = "", description = ""] = line.split("|").map((x) => x.trim());
              return { title, description };
            }),
          },
        }))} /></div>
        <div><Label>Texto destacado</Label><Textarea rows={3} value={content.razones.highlightText} onChange={(e) => update("razones", "highlightText", e.target.value)} /></div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Informacion adicional</h2>
        <div><Label>Titulo seccion</Label><Input value={content.adicional.title} onChange={(e) => update("adicional", "title", e.target.value)} /></div>
        <div><Label>Items (titulo|descripcion por linea)</Label><Textarea rows={6} value={adicionalText} onChange={(e) => setContent((prev) => ({
          ...prev,
          adicional: {
            ...prev.adicional,
            items: parseLines(e.target.value).map((line) => {
              const [title = "", description = ""] = line.split("|").map((x) => x.trim());
              return { title, description };
            }),
          },
        }))} /></div>
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
