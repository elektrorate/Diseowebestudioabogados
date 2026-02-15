import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowRight, Phone, Mail, MapPin, Briefcase, Users, Building2, Landmark, FileText, Scale, ShieldCheck } from "lucide-react";
import heroBackgroundWebp from "@/assets/54e6bf754107c9c49ea97b9a5ae8cf74708efb3a.webp";
import heroBackgroundPng from "@/assets/54e6bf754107c9c49ea97b9a5ae8cf74708efb3a.png";
import aboutImageWebp from "@/assets/7cd1439c63657dc693a8f69ba7de1e85b57cf6fd.webp";
import aboutImagePng from "@/assets/7cd1439c63657dc693a8f69ba7de1e85b57cf6fd.png";
import processStateImageWebp from "@/assets/f17fc7e94886323543bac62dff6e2ead1d41daaf.webp";
import processStateImagePng from "@/assets/f17fc7e94886323543bac62dff6e2ead1d41daaf.png";
import gacetaImageWebp from "@/assets/151cf3ccbe09ccc69d2c481a35014b24b67ab818.webp";
import gacetaImagePng from "@/assets/151cf3ccbe09ccc69d2c481a35014b24b67ab818.png";

export function HomePage() {
  const areas = [
    {
      icon: Briefcase,
      title: "Derecho Laboral",
      description: "Defensa integral en conflictos laborales del sector público y privado.",
      slug: "laboral"
    },
    {
      icon: Users,
      title: "Derecho Previsional",
      description: "Asesoría en pensiones, ONP y sistemas de jubilación.",
      slug: "previsional"
    },
    {
      icon: Building2,
      title: "Derecho Administrativo",
      description: "Procesos contencioso-administrativos y defensa ante entidades públicas.",
      slug: "administrativo"
    },
    {
      icon: Landmark,
      title: "Derecho Municipal",
      description: "Defensa en procedimientos administrativos municipales.",
      slug: "municipal"
    },
    {
      icon: FileText,
      title: "Derecho Registral",
      description: "Asesoría en inscripciones y rectificaciones registrales.",
      slug: "registral"
    },
    {
      icon: Scale,
      title: "Derecho Civil",
      description: "Contratos, obligaciones y responsabilidad civil.",
      slug: "civil"
    }
  ];

  const stats = [
    { number: "500+", label: "Casos Exitosos" },
    { number: "25+", label: "Años de Experiencia" },
    { number: "98%", label: "Satisfacción del Cliente" },
    { number: "50+", label: "Abogados Especialistas" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBackgroundPng}
            srcSet={`${heroBackgroundWebp} 1x`}
            alt="Oficina profesional de abogados" 
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Línea decorativa superior */}
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-16 bg-accent"></div>
                <span className="text-accent uppercase tracking-[0.2em] text-sm font-light">Estudio Jurídico</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.1] font-normal">
                <span className="text-white">Defendemos tus </span>
                <span className="text-accent italic">derechos</span>
                <br />
                <span className="text-white">frente al </span>
                <span className="text-accent italic">Estado</span>
                <br />
                <span className="text-white">y particulares</span>
              </h1>

              <p className="text-xl text-white/80 leading-relaxed max-w-xl font-light">
                Especialistas en derecho laboral, previsional y administrativo con más de 25 años de experiencia defendiendo tus derechos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-wider text-sm font-semibold h-14 px-8 rounded-none border-2 border-accent hover:border-accent/90 transition-all"
                >
                  <Link to="/contacto" className="flex items-center gap-2">
                    Agendar consulta
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary uppercase tracking-wider text-sm font-semibold h-14 px-8 rounded-none transition-all"
                >
                  <Link to="/especialidades">Nuestras especialidades</Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="pt-8 border-t border-white/20 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-sm text-white/90">(01) 234-5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-sm text-white/90">contacto@onlex.pe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              null
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <ImageWithFallback 
                src={aboutImagePng}
                srcSet={`${aboutImageWebp} 1x`}
                alt="Equipo profesional de abogados"
                className="w-full h-[550px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <span className="text-accent uppercase tracking-[0.2em] text-sm font-light">
                  Sobre ONLEX
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-primary">
                Abogados profesionales para tu servicio legal complejo
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nos enorgullece brindar representación legal de alta calidad y orientación a nuestros clientes. 
                Nuestro equipo está conformado por abogados experimentados y capacitados en diversas áreas del derecho.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-accent/30 bg-accent/5">
                    <Scale className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Consultas Gratuitas
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Muchos abogados ofrecen consultas gratuitas como una forma de atraer clientes 
                      potenciales y brindar una oportunidad de evaluación inicial.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-accent/30 bg-accent/5">
                    <ShieldCheck className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Asesoramiento y Consejería Legal
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Los abogados realizan investigaciones exhaustivas sobre leyes, regulaciones 
                      y precedentes relevantes para construir casos sólidos.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 uppercase tracking-wider text-sm font-semibold h-14 px-10 rounded-none mt-8"
              >
                <Link to="/nosotros" className="flex items-center gap-2">
                  Leer más
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Práctica */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-4 justify-center mb-6">
              <div className="h-[2px] w-16 bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.2em] text-sm font-light">Nuestros Servicios</span>
              <div className="h-[2px] w-16 bg-accent"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl mb-6">
              Áreas de <span className="text-accent italic">Práctica</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Brindamos asesoría legal integral en diversas especialidades del derecho, 
              con énfasis en la defensa de tus derechos frente al Estado.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-accent rounded-none"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  
                  <div className="p-8">
                    <Icon className="w-12 h-12 text-primary mb-6 group-hover:text-accent transition-colors" />
                    
                    <h3 className="text-xl mb-3">{area.title}</h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {area.description}
                    </p>
                    
                    <Link 
                      to={`/especialidades/${area.slug}`}
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-primary group-hover:text-accent transition-colors font-semibold"
                    >
                      Conocer más
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Procesos contra el Estado */}
      <section className="relative bg-[#1a2e58] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[#2b3e9f]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-16 bg-accent"></div>
                <span className="text-accent uppercase tracking-[0.2em] text-sm font-light">Nuestra Especialidad</span>
              </div>

              <h2 className="text-4xl md:text-5xl leading-tight">
                Expertos en <span className="text-accent italic">procesos</span> contra el Estado
              </h2>
              
              <p className="text-xl text-white/80 leading-relaxed">
                Defendemos tus derechos frente a entidades públicas, ONP, gobiernos locales 
                y demás instituciones del Estado peruano.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-accent/10 flex items-center justify-center border-2 border-accent">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1">Contencioso Administrativo</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Impugnación de actos y resoluciones administrativas ante el Poder Judicial.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-accent/10 flex items-center justify-center border-2 border-accent">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1">Nulidad de Actos Administrativos</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Defensa ante decisiones arbitrarias de entidades públicas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-accent/10 flex items-center justify-center border-2 border-accent">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1">Ejecución de Sentencias</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Garantizamos el cumplimiento efectivo de las sentencias judiciales.
                    </p>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="absolute -bottom-8 -left-8 w-64 h-64 border-2 border-accent/30 hidden lg:block"></div>
              <ImageWithFallback 
                src={processStateImagePng}
                srcSet={`${processStateImageWebp} 1x`}
                alt="Justicia y derecho"
                className="relative z-10 w-full h-[500px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* La Gaceta del Jubilado */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <ImageWithFallback 
                src={gacetaImagePng}
                srcSet={`${gacetaImageWebp} 1x`}
                alt="Adultos mayores"
                className="w-full h-[500px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -top-8 -right-8 w-64 h-64 border-2 border-accent/20 hidden lg:block"></div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-16 bg-accent"></div>
                <span className="text-accent uppercase tracking-[0.2em] text-sm font-light">Responsabilidad Social</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl leading-tight">
                La <span className="text-accent italic">Gaceta</span> del Jubilado
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Un espacio dedicado a brindar información clara y accesible sobre derechos 
                previsionales, laborales y administrativos. Nuestro compromiso es educar y 
                empoderar a pensionistas y adultos mayores con conocimiento legal práctico.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Publicamos artículos, análisis de jurisprudencia y guías prácticas para que 
                conozcas y ejerzas tus derechos de manera informada.
              </p>

              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="uppercase tracking-wider text-sm font-semibold h-14 px-8 rounded-none border-2 border-primary hover:bg-primary hover:text-white transition-all mt-6"
              >
                <Link to="/blog" className="flex items-center gap-2">
                  Visitar el blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }}></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="flex items-center gap-4 justify-center">
            <div className="h-[2px] w-16 bg-accent"></div>
            <span className="text-accent uppercase tracking-[0.2em] text-sm font-light">Contáctanos</span>
            <div className="h-[2px] w-16 bg-accent"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-tight">
            Tu derecho no se pierde.
            <br />
            <span className="text-accent italic">Se defiende.</span>
          </h2>

          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Agenda tu consulta con nuestros especialistas y recibe asesoría legal 
            personalizada para tu caso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-wider text-sm font-semibold h-14 px-10 rounded-none border-2 border-accent hover:border-accent/90 transition-all"
            >
              <Link to="/contacto" className="flex items-center gap-2">
                Agendar asesoría legal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary uppercase tracking-wider text-sm font-semibold h-14 px-10 rounded-none transition-all"
            >
              <Link to="/nosotros">Conocer el estudio</Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-8 justify-center pt-8 border-t border-white/20">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-sm text-white/90">Lima, Perú</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent" />
              <span className="text-sm text-white/90">(01) 234-5678</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent" />
              <span className="text-sm text-white/90">contacto@onlex.pe</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
