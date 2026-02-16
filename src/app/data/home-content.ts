export interface HomeArea {
  slug: string;
  title: string;
  description: string;
}

export interface HomeBullet {
  title: string;
  description: string;
}

export interface HomeContent {
  hero: {
    badge: string;
    titleLine1: string;
    titleAccent1: string;
    titleLine2: string;
    titleAccent2: string;
    titleLine3: string;
    description: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
    phone: string;
    email: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  services: {
    badge: string;
    titlePrefix: string;
    titleAccent: string;
    description: string;
    areas: HomeArea[];
  };
  processState: {
    badge: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    bullets: HomeBullet[];
  };
  gaceta: {
    badge: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description1: string;
    description2: string;
    ctaLabel: string;
    ctaHref: string;
  };
  finalCta: {
    badge: string;
    titleLine1: string;
    titleAccent: string;
    description: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
    location: string;
    phone: string;
    email: string;
  };
}

export const HOME_CONTENT_STORAGE_KEY = "onlex_home_content_v1";

export const defaultHomeContent: HomeContent = {
  hero: {
    badge: "Estudio Juridico",
    titleLine1: "Defendemos tus",
    titleAccent1: "derechos",
    titleLine2: "frente al",
    titleAccent2: "Estado",
    titleLine3: "y particulares",
    description:
      "Especialistas en derecho laboral, previsional y administrativo con mas de 25 anos de experiencia defendiendo tus derechos.",
    ctaPrimaryLabel: "Agendar consulta",
    ctaPrimaryHref: "/contacto#consulta",
    ctaSecondaryLabel: "Nuestras especialidades",
    ctaSecondaryHref: "/especialidades",
    phone: "(01) 234-5678",
    email: "contacto@onlex.pe",
  },
  about: {
    badge: "Sobre ONLEX",
    title: "Abogados profesionales para tu servicio legal complejo",
    description:
      "Nos enorgullece brindar representacion legal de alta calidad y orientacion a nuestros clientes. Nuestro equipo esta conformado por abogados experimentados y capacitados en diversas areas del derecho.",
    feature1Title: "Consultas Gratuitas",
    feature1Description:
      "Muchos abogados ofrecen consultas gratuitas como una forma de atraer clientes potenciales y brindar una oportunidad de evaluacion inicial.",
    feature2Title: "Asesoramiento y Consejeria Legal",
    feature2Description:
      "Los abogados realizan investigaciones exhaustivas sobre leyes, regulaciones y precedentes relevantes para construir casos solidos.",
    ctaLabel: "Leer mas",
    ctaHref: "/nosotros",
  },
  services: {
    badge: "Nuestros Servicios",
    titlePrefix: "Areas de",
    titleAccent: "Practica",
    description:
      "Brindamos asesoria legal integral en diversas especialidades del derecho, con enfasis en la defensa de tus derechos frente al Estado.",
    areas: [
      {
        slug: "laboral",
        title: "Derecho Laboral",
        description: "Defensa integral en conflictos laborales del sector publico y privado.",
      },
      {
        slug: "previsional",
        title: "Derecho Previsional",
        description: "Asesoria en pensiones, ONP y sistemas de jubilacion.",
      },
      {
        slug: "administrativo",
        title: "Derecho Administrativo",
        description: "Procesos contencioso-administrativos y defensa ante entidades publicas.",
      },
      {
        slug: "municipal",
        title: "Derecho Municipal",
        description: "Defensa en procedimientos administrativos municipales.",
      },
      {
        slug: "registral",
        title: "Derecho Registral",
        description: "Asesoria en inscripciones y rectificaciones registrales.",
      },
      {
        slug: "civil",
        title: "Derecho Civil",
        description: "Contratos, obligaciones y responsabilidad civil.",
      },
    ],
  },
  processState: {
    badge: "Nuestra Especialidad",
    titlePrefix: "Expertos en",
    titleAccent: "procesos",
    titleSuffix: "contra el Estado",
    description:
      "Defendemos tus derechos frente a entidades publicas, ONP, gobiernos locales y demas instituciones del Estado peruano.",
    bullets: [
      {
        title: "Contencioso Administrativo",
        description: "Impugnacion de actos y resoluciones administrativas ante el Poder Judicial.",
      },
      {
        title: "Nulidad de Actos Administrativos",
        description: "Defensa ante decisiones arbitrarias de entidades publicas.",
      },
      {
        title: "Ejecucion de Sentencias",
        description: "Garantizamos el cumplimiento efectivo de las sentencias judiciales.",
      },
    ],
  },
  gaceta: {
    badge: "Responsabilidad Social",
    titlePrefix: "La",
    titleAccent: "Gaceta",
    titleSuffix: "del Jubilado",
    description1:
      "Un espacio dedicado a brindar informacion clara y accesible sobre derechos previsionales, laborales y administrativos. Nuestro compromiso es educar y empoderar a pensionistas y adultos mayores con conocimiento legal practico.",
    description2:
      "Publicamos articulos, analisis de jurisprudencia y guias practicas para que conozcas y ejerzas tus derechos de manera informada.",
    ctaLabel: "Visitar el blog",
    ctaHref: "/blog",
  },
  finalCta: {
    badge: "Contactanos",
    titleLine1: "Tu derecho no se pierde.",
    titleAccent: "Se defiende.",
    description:
      "Agenda tu consulta con nuestros especialistas y recibe asesoria legal personalizada para tu caso.",
    ctaPrimaryLabel: "Agendar asesoria legal",
    ctaPrimaryHref: "/contacto#consulta",
    ctaSecondaryLabel: "Conocer el estudio",
    ctaSecondaryHref: "/nosotros",
    location: "Lima, Peru",
    phone: "(01) 234-5678",
    email: "contacto@onlex.pe",
  },
};

export function getHomeContent(): HomeContent {
  return loadContent(HOME_CONTENT_STORAGE_KEY, defaultHomeContent);
}

export function saveHomeContent(content: HomeContent) {
  saveContent(HOME_CONTENT_STORAGE_KEY, content);
}

export function resetHomeContent() {
  resetContent(HOME_CONTENT_STORAGE_KEY);
}
import { loadContent, resetContent, saveContent } from "./content-store";
