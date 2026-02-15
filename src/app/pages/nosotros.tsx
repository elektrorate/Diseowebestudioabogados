import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Target, Eye, Heart, Award } from "lucide-react";

export function NosotrosPage() {
  const valores = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Dedicación total con cada cliente y cada caso que asumimos."
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Búsqueda constante de la calidad en nuestro servicio jurídico."
    },
    {
      icon: Target,
      title: "Transparencia",
      description: "Comunicación clara y honesta en cada etapa del proceso."
    },
    {
      icon: Eye,
      title: "Responsabilidad social",
      description: "Compromiso con la defensa de los derechos de los más vulnerables."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Compromiso jurídico con responsabilidad social
            </h1>
            <p className="text-xl text-white/90">
              ONLEX es un estudio jurídico peruano especializado en la defensa 
              de derechos laborales, previsionales y administrativos.
            </p>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-6">Quiénes somos</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              ONLEX es un estudio jurídico con sólida trayectoria en la defensa de derechos 
              laborales, previsionales, administrativos y civiles. Nos especializamos en 
              procesos contra el Estado y en la representación de pensionistas, trabajadores 
              y ciudadanos que enfrentan situaciones de vulneración de sus derechos.
            </p>
            <p>
              Nuestro compromiso va más allá de la asesoría legal tradicional. Creemos en 
              un acompañamiento integral, transparente y humano, que permita a nuestros 
              clientes comprender cada etapa del proceso y tomar decisiones informadas.
            </p>
            <p>
              Con especialización técnica y vocación social, trabajamos para que cada persona 
              reciba la defensa que merece, sin importar su situación económica o social.
            </p>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-10 h-10 text-accent" />
                <h2 className="text-3xl">Misión</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Brindar defensa jurídica especializada, responsable y cercana a personas 
                cuyos derechos laborales, previsionales y administrativos han sido vulnerados, 
                garantizando un acompañamiento integral desde la consulta inicial hasta la 
                ejecución de sentencias favorables.
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-10 h-10 text-accent" />
                <h2 className="text-3xl">Visión</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Ser reconocidos como el estudio jurídico de referencia en la defensa de 
                derechos laborales y previsionales en el Perú, destacando por nuestra 
                especialización técnica, compromiso social y capacidad para lograr resultados 
                favorables en procesos complejos contra el Estado y particulares.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-12 text-center">Nuestros valores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => {
              const Icon = valor.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mb-2">{valor.title}</h3>
                  <p className="text-muted-foreground">{valor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compromiso Social */}
      <section className="bg-secondary text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-6 text-center">
            Compromiso social
          </h2>
          <p className="text-lg text-white/90 text-center mb-8">
            En ONLEX entendemos que el acceso a la justicia es un derecho fundamental. 
            Por ello, desarrollamos iniciativas de educación legal gratuita a través de 
            "La Gaceta del Jubilado", un espacio dedicado a informar y orientar a 
            pensionistas y adultos mayores sobre sus derechos.
          </p>
          <p className="text-lg text-white/90 text-center">
            Creemos que la información clara y accesible es el primer paso para 
            defender tus derechos. Nuestro compromiso es contigo.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl">
            ¿Necesitas asesoría legal?
          </h2>
          <p className="text-lg text-muted-foreground">
            Contáctanos y recibe una evaluación inicial de tu caso.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/contacto">Solicitar consulta</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}