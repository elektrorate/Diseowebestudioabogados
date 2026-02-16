import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  ContactoContent,
  defaultContactoContent,
  getContactoContent,
  resetContactoContent,
  saveContactoContent,
} from "../../data/contacto-content";
import { toast } from "sonner";
import { CONTENT_UPDATED_EVENT } from "../../data/content-store";

export function AdminContactoContent() {
  const [content, setContent] = useState<ContactoContent>(getContactoContent());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const sync = () => setContent(getContactoContent());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CONTENT_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CONTENT_UPDATED_EVENT, sync);
    };
  }, []);

  const update = <K extends keyof ContactoContent>(section: K, key: keyof ContactoContent[K], value: string) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const updateInfoCard = (card: "telefonos" | "correo" | "direccion" | "horario", key: "title" | "line1" | "line2", value: string) => {
    setContent((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [card]: {
          ...prev.info[card],
          [key]: value,
        },
      },
    }));
  };

  const save = async () => {
    setIsSaving(true);
    try {
      await saveContactoContent(content);
      toast.success("Contenido de Contacto actualizado");
    } catch {
      toast.error("No se pudo guardar el contenido de Contacto");
    } finally {
      setIsSaving(false);
    }
  };

  const reset = async () => {
    setIsSaving(true);
    try {
      await resetContactoContent();
      setContent(defaultContactoContent);
      toast.success("Contenido de Contacto restaurado");
    } catch {
      toast.error("No se pudo restaurar el contenido de Contacto");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl">Administrar Contacto</h1>
          <p className="text-muted-foreground">Configura hero, formulario y canales de contacto por secciones.</p>
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
        <h2 className="text-xl">Formulario</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Titulo formulario</Label><Input value={content.form.title} onChange={(e) => update("form", "title", e.target.value)} /></div>
          <div><Label>Boton texto</Label><Input value={content.form.buttonLabel} onChange={(e) => update("form", "buttonLabel", e.target.value)} /></div>
          <div><Label>Boton cargando</Label><Input value={content.form.buttonLoadingLabel} onChange={(e) => update("form", "buttonLoadingLabel", e.target.value)} /></div>
          <div><Label>Nombre label</Label><Input value={content.form.nombreLabel} onChange={(e) => update("form", "nombreLabel", e.target.value)} /></div>
          <div><Label>Nombre placeholder</Label><Input value={content.form.nombrePlaceholder} onChange={(e) => update("form", "nombrePlaceholder", e.target.value)} /></div>
          <div><Label>Telefono label</Label><Input value={content.form.telefonoLabel} onChange={(e) => update("form", "telefonoLabel", e.target.value)} /></div>
          <div><Label>Telefono placeholder</Label><Input value={content.form.telefonoPlaceholder} onChange={(e) => update("form", "telefonoPlaceholder", e.target.value)} /></div>
          <div><Label>Email label</Label><Input value={content.form.emailLabel} onChange={(e) => update("form", "emailLabel", e.target.value)} /></div>
          <div><Label>Email placeholder</Label><Input value={content.form.emailPlaceholder} onChange={(e) => update("form", "emailPlaceholder", e.target.value)} /></div>
          <div><Label>Asunto label</Label><Input value={content.form.asuntoLabel} onChange={(e) => update("form", "asuntoLabel", e.target.value)} /></div>
          <div><Label>Asunto placeholder</Label><Input value={content.form.asuntoPlaceholder} onChange={(e) => update("form", "asuntoPlaceholder", e.target.value)} /></div>
          <div><Label>Mensaje label</Label><Input value={content.form.mensajeLabel} onChange={(e) => update("form", "mensajeLabel", e.target.value)} /></div>
          <div><Label>Mensaje placeholder</Label><Textarea rows={2} value={content.form.mensajePlaceholder} onChange={(e) => update("form", "mensajePlaceholder", e.target.value)} /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-xl">Informacion de contacto</h2>
        <div><Label>Titulo bloque derecho</Label><Input value={content.info.title} onChange={(e) => update("info", "title", e.target.value)} /></div>

        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Telefonos titulo</Label><Input value={content.info.telefonos.title} onChange={(e) => updateInfoCard("telefonos", "title", e.target.value)} /></div>
          <div><Label>Telefonos linea 1</Label><Input value={content.info.telefonos.line1} onChange={(e) => updateInfoCard("telefonos", "line1", e.target.value)} /></div>
          <div><Label>Telefonos linea 2</Label><Input value={content.info.telefonos.line2} onChange={(e) => updateInfoCard("telefonos", "line2", e.target.value)} /></div>

          <div><Label>Correo titulo</Label><Input value={content.info.correo.title} onChange={(e) => updateInfoCard("correo", "title", e.target.value)} /></div>
          <div><Label>Correo linea 1</Label><Input value={content.info.correo.line1} onChange={(e) => updateInfoCard("correo", "line1", e.target.value)} /></div>
          <div><Label>Correo linea 2</Label><Input value={content.info.correo.line2} onChange={(e) => updateInfoCard("correo", "line2", e.target.value)} /></div>

          <div><Label>Direccion titulo</Label><Input value={content.info.direccion.title} onChange={(e) => updateInfoCard("direccion", "title", e.target.value)} /></div>
          <div><Label>Direccion linea 1</Label><Input value={content.info.direccion.line1} onChange={(e) => updateInfoCard("direccion", "line1", e.target.value)} /></div>
          <div><Label>Direccion linea 2</Label><Input value={content.info.direccion.line2} onChange={(e) => updateInfoCard("direccion", "line2", e.target.value)} /></div>

          <div><Label>Horario titulo</Label><Input value={content.info.horario.title} onChange={(e) => updateInfoCard("horario", "title", e.target.value)} /></div>
          <div><Label>Horario linea 1</Label><Input value={content.info.horario.line1} onChange={(e) => updateInfoCard("horario", "line1", e.target.value)} /></div>
          <div><Label>Horario linea 2</Label><Input value={content.info.horario.line2} onChange={(e) => updateInfoCard("horario", "line2", e.target.value)} /></div>
          <div><Label>Nota horario</Label><Input value={content.info.horarioNote} onChange={(e) => update("info", "horarioNote", e.target.value)} /></div>

          <div><Label>Destacado titulo</Label><Input value={content.info.highlightTitle} onChange={(e) => update("info", "highlightTitle", e.target.value)} /></div>
          <div><Label>Destacado descripcion</Label><Textarea rows={3} value={content.info.highlightDescription} onChange={(e) => update("info", "highlightDescription", e.target.value)} /></div>
        </div>
      </Card>
    </div>
  );
}
