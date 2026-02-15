import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    asunto: "",
    mensaje: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (en producción iría a una API o Supabase)
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Consulta enviada exitosamente", {
      description: "Nos pondremos en contacto contigo en breve."
    });

    // Limpiar formulario
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      asunto: "",
      mensaje: ""
    });

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-white/90">
              Agenda tu consulta legal. Te escuchamos, analizamos tu caso y 
              te explicamos claramente tus opciones.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario y datos de contacto */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div>
              <h2 className="text-3xl mb-6">Solicita tu consulta</h2>
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Ingresa tu nombre completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="+51 987 654 321"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="asunto">Asunto</Label>
                    <Input
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mensaje">Descripción del caso *</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Cuéntanos brevemente sobre tu situación legal..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar consulta"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Información de contacto */}
            <div>
              <h2 className="text-3xl mb-6">Información de contacto</h2>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">Teléfonos</h3>
                      <p className="text-muted-foreground">+51 (01) 234-5678</p>
                      <p className="text-muted-foreground">+51 987 654 321</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">Correo electrónico</h3>
                      <p className="text-muted-foreground">contacto@onlex.pe</p>
                      <p className="text-muted-foreground">consultas@onlex.pe</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">Dirección</h3>
                      <p className="text-muted-foreground">
                        Av. Javier Prado Este 123<br />
                        San Isidro, Lima, Perú
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-1">Horario de atención</h3>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                        Sábados: 9:00 AM - 1:00 PM
                      </p>
                      <p className="text-sm text-accent mt-2">
                        *Atención presencial y virtual
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 mt-6 bg-secondary text-white">
                <h3 className="mb-2">Consulta inicial gratuita</h3>
                <p className="text-white/90">
                  La primera evaluación de tu caso es sin costo. Te explicamos 
                  claramente tus opciones legales y el camino a seguir.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}