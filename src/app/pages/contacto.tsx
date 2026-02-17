import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  ContactoContent,
  defaultContactoContent,
  getContactoContent,
} from "../data/contacto-content";
import { CONTENT_UPDATED_EVENT } from "../data/content-store";
import { createConsulta } from "../data/consultas-store";

export function ContactoPage() {
  const location = useLocation();
  const [content, setContent] = useState<ContactoContent>(defaultContactoContent);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createConsulta(formData);
      if (result.mode === "remote") {
        toast.success("Consulta enviada exitosamente", {
          description: "Nos pondremos en contacto contigo en breve.",
        });
      } else {
        toast.warning("Consulta guardada solo localmente", {
          description: "No se pudo conectar con Firebase. Verifica la configuracion en Vercel.",
        });
      }

      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        asunto: "",
        mensaje: "",
      });
    } catch {
      toast.error("No se pudo enviar la consulta", {
        description: "Intenta nuevamente en unos minutos.",
      });
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (location.hash !== "#consulta") return;

    const target = document.getElementById("consulta");
    if (!target) return;

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

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

      <section id="consulta" className="scroll-mt-44 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl">{content.form.title}</h2>
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nombre">{content.form.nombreLabel}</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder={content.form.nombrePlaceholder}
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefono">{content.form.telefonoLabel}</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder={content.form.telefonoPlaceholder}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">{content.form.emailLabel}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={content.form.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <Label htmlFor="asunto">{content.form.asuntoLabel}</Label>
                    <Input
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder={content.form.asuntoPlaceholder}
                    />
                  </div>

                  <div>
                    <Label htmlFor="mensaje">{content.form.mensajeLabel}</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={content.form.mensajePlaceholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? content.form.buttonLoadingLabel : content.form.buttonLabel}
                  </Button>
                </form>
              </Card>
            </div>

            <div>
              <h2 className="mb-6 text-3xl">{content.info.title}</h2>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">{content.info.telefonos.title}</h3>
                      <p className="text-muted-foreground">{content.info.telefonos.line1}</p>
                      <p className="text-muted-foreground">{content.info.telefonos.line2}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">{content.info.correo.title}</h3>
                      <p className="text-muted-foreground">{content.info.correo.line1}</p>
                      <p className="text-muted-foreground">{content.info.correo.line2}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">{content.info.direccion.title}</h3>
                      <p className="text-muted-foreground">
                        {content.info.direccion.line1}
                        <br />
                        {content.info.direccion.line2}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">{content.info.horario.title}</h3>
                      <p className="text-muted-foreground">
                        {content.info.horario.line1}
                        <br />
                        {content.info.horario.line2}
                      </p>
                      <p className="mt-2 text-sm text-accent">{content.info.horarioNote}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="mt-6 bg-secondary p-6 text-white">
                <h3 className="mb-2">{content.info.highlightTitle}</h3>
                <p className="text-white/90">{content.info.highlightDescription}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
