import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ShieldCheck, FileCheck, Gavel, CheckCircle2 } from "lucide-react";

export function ProcesosEstadoPage() {
  const casos = [
    {
      title: "Procesos contra ONP",
      description: "Defensa especializada en casos de pensiones denegadas, mal calculadas o devengados impagos. Representamos a jubilados y pensionistas en todas las instancias.",
      items: [
        "Reconocimiento de pensión de jubilación",
        "Recálculo de pensión inicial",
        "Cobro de devengados pensionarios",
        "Pensión de viudez y orfandad"
      ]
    },
    {
      title: "Procesos contra entidades públicas",
      description: "Defendemos tus derechos frente a ministerios, gobiernos regionales, locales y demás entidades del Estado.",
      items: [
        "Reconocimiento de derechos laborales en sector público",
        "Nulidad de despidos arbitrarios",
        "Pago de bonificaciones y beneficios",
        "Cumplimiento de resoluciones administrativas"
      ]
    },
    {
      title: "Contencioso administrativo",
      description: "Impugnación judicial de actos administrativos ilegales o arbitrarios que vulneran tus derechos.",
      items: [
        "Nulidad de actos administrativos",
        "Impugnación de sanciones administrativas",
        "Demandas de cumplimiento",
        "Defensa en procedimientos sancionadores"
      ]
    },
    {
      title: "Ejecución de sentencias",
      description: "Garantizamos el cumplimiento efectivo de las sentencias favorables contra el Estado.",
      items: [
        "Ejecución forzada de sentencias",
        "Cobro de devengados judiciales",
        "Medidas cautelares contra el Estado",
        "Seguimiento hasta el pago efectivo"
      ]
    }
  ];

  const razones = [
    {
      icon: ShieldCheck,
      title: "Experiencia comprobada",
      description: "Años de experiencia defendiendo derechos frente al Estado con resultados favorables."
    },
    {
      icon: FileCheck,
      title: "Conocimiento especializado",
      description: "Dominio de la normativa administrativa y jurisprudencia sobre procesos contra el Estado."
    },
    {
      icon: Gavel,
      title: "Defensa hasta el final",
      description: "No solo ganamos el proceso, garantizamos el cumplimiento real de la sentencia."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
            Defensa legal frente al Estado
          </h1>
          <p className="text-xl text-white/90">
            Especialistas en procesos contra entidades públicas, ONP y gobiernos locales. 
            Defendemos tus derechos laborales, previsionales y administrativos con 
            experiencia y resultados comprobados.
          </p>
        </div>
      </section>

      {/* Qué es un proceso contra el Estado */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-6">
            ¿Qué es un proceso contra el Estado?
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Un proceso contra el Estado es un procedimiento judicial o administrativo mediante 
              el cual una persona defiende sus derechos frente a una entidad pública que ha 
              vulnerado o desconocido tales derechos.
            </p>
            <p>
              Estos procesos pueden ser de naturaleza laboral (como el reconocimiento de derechos 
              de trabajadores públicos), previsional (como demandas contra la ONP por pensiones), 
              o administrativa (como la impugnación de actos administrativos arbitrarios).
            </p>
            <p>
              En ONLEX contamos con amplia experiencia en litigios contra el Estado, conocemos 
              los procedimientos especiales que aplican y las estrategias más efectivas para 
              lograr resultados favorables.
            </p>
          </div>
        </div>
      </section>

      {/* Casos frecuentes */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-12 text-center">
            Casos frecuentes que defendemos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {casos.map((caso, index) => (
              <Card key={index} className="p-8">
                <h3 className="text-2xl mb-3">{caso.title}</h3>
                <p className="text-muted-foreground mb-6">{caso.description}</p>
                <ul className="space-y-2">
                  {caso.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué defensa especializada */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-12 text-center">
            ¿Por qué necesitas defensa especializada?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {razones.map((razon, index) => {
              const Icon = razon.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="mb-2">{razon.title}</h3>
                  <p className="text-muted-foreground">{razon.description}</p>
                </div>
              );
            })}
          </div>

          <Card className="p-8 mt-12 bg-secondary text-white">
            <p className="text-lg text-center">
              Los procesos contra el Estado tienen particularidades procesales y plazos especiales. 
              Un abogado especializado conoce estas reglas y puede maximizar tus posibilidades de éxito.
            </p>
          </Card>
        </div>
      </section>

      {/* Información adicional */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-6">
            Aspectos importantes a considerar
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-2">Plazos especiales</h3>
              <p className="text-muted-foreground">
                Los procesos contra el Estado tienen plazos de prescripción y caducidad específicos. 
                Es fundamental actuar a tiempo para no perder tus derechos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2">Vías procedimentales</h3>
              <p className="text-muted-foreground">
                Existen distintas vías para reclamar frente al Estado: proceso laboral, contencioso 
                administrativo, proceso de amparo, entre otros. Elegir la vía correcta es crucial.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2">Ejecución de sentencias</h3>
              <p className="text-muted-foreground">
                Ganar el proceso no es suficiente. Es necesario hacer un seguimiento riguroso para 
                garantizar el cumplimiento efectivo de la sentencia y el pago de lo ordenado.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl">
            ¿El Estado vulneró tus derechos?
          </h2>
          <p className="text-lg text-muted-foreground">
            Contáctanos y evaluaremos tu caso. Te explicaremos claramente tus opciones 
            y el camino legal para defender tus derechos.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/contacto">Consulta tu caso ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}