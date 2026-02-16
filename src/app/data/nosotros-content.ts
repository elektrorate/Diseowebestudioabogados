import { loadContent, resetContent, saveContent } from "./content-store";

export interface NosotrosValue {
  title: string;
  description: string;
}

export interface NosotrosContent {
  hero: {
    title: string;
    description: string;
  };
  quienesSomos: {
    title: string;
    paragraphs: string[];
  };
  misionVision: {
    misionTitle: string;
    misionDescription: string;
    visionTitle: string;
    visionDescription: string;
  };
  valores: {
    title: string;
    items: NosotrosValue[];
  };
  compromisoSocial: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export const NOSOTROS_CONTENT_STORAGE_KEY = "onlex_nosotros_content_v1";

export const defaultNosotrosContent: NosotrosContent = {
  hero: {
    title: "Compromiso juridico con responsabilidad social",
    description:
      "ONLEX es un estudio juridico peruano especializado en la defensa de derechos laborales, previsionales y administrativos.",
  },
  quienesSomos: {
    title: "Quienes somos",
    paragraphs: [
      "ONLEX es un estudio juridico con solida trayectoria en la defensa de derechos laborales, previsionales, administrativos y civiles. Nos especializamos en procesos contra el Estado y en la representacion de pensionistas, trabajadores y ciudadanos que enfrentan situaciones de vulneracion de sus derechos.",
      "Nuestro compromiso va mas alla de la asesoria legal tradicional. Creemos en un acompanamiento integral, transparente y humano, que permita a nuestros clientes comprender cada etapa del proceso y tomar decisiones informadas.",
      "Con especializacion tecnica y vocacion social, trabajamos para que cada persona reciba la defensa que merece, sin importar su situacion economica o social.",
    ],
  },
  misionVision: {
    misionTitle: "Mision",
    misionDescription:
      "Brindar defensa juridica especializada, responsable y cercana a personas cuyos derechos laborales, previsionales y administrativos han sido vulnerados, garantizando un acompanamiento integral desde la consulta inicial hasta la ejecucion de sentencias favorables.",
    visionTitle: "Vision",
    visionDescription:
      "Ser reconocidos como el estudio juridico de referencia en la defensa de derechos laborales y previsionales en el Peru, destacando por nuestra especializacion tecnica, compromiso social y capacidad para lograr resultados favorables en procesos complejos contra el Estado y particulares.",
  },
  valores: {
    title: "Nuestros valores",
    items: [
      { title: "Compromiso", description: "Dedicacion total con cada cliente y cada caso que asumimos." },
      { title: "Excelencia", description: "Busqueda constante de la calidad en nuestro servicio juridico." },
      { title: "Transparencia", description: "Comunicacion clara y honesta en cada etapa del proceso." },
      {
        title: "Responsabilidad social",
        description: "Compromiso con la defensa de los derechos de los mas vulnerables.",
      },
    ],
  },
  compromisoSocial: {
    title: "Compromiso social",
    paragraph1:
      "En ONLEX entendemos que el acceso a la justicia es un derecho fundamental. Por ello, desarrollamos iniciativas de educacion legal gratuita a traves de La Gaceta del Jubilado, un espacio dedicado a informar y orientar a pensionistas y adultos mayores sobre sus derechos.",
    paragraph2:
      "Creemos que la informacion clara y accesible es el primer paso para defender tus derechos. Nuestro compromiso es contigo.",
  },
  cta: {
    title: "Necesitas asesoria legal?",
    description: "Contactanos y recibe una evaluacion inicial de tu caso.",
    buttonLabel: "Solicitar consulta",
    buttonHref: "/contacto#consulta",
  },
};

export function getNosotrosContent(): NosotrosContent {
  return loadContent(NOSOTROS_CONTENT_STORAGE_KEY, defaultNosotrosContent);
}

export function saveNosotrosContent(content: NosotrosContent) {
  saveContent(NOSOTROS_CONTENT_STORAGE_KEY, content);
}

export function resetNosotrosContent() {
  resetContent(NOSOTROS_CONTENT_STORAGE_KEY);
}
