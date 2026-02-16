import { loadContent, resetContent, saveContent } from "./content-store";

export interface ProcesoCasoItem {
  title: string;
  description: string;
  items: string[];
}

export interface ProcesoRazon {
  title: string;
  description: string;
}

export interface ProcesoInfoItem {
  title: string;
  description: string;
}

export interface ProcesosEstadoContent {
  hero: {
    title: string;
    description: string;
  };
  queEs: {
    title: string;
    paragraphs: string[];
  };
  casos: {
    title: string;
    cards: ProcesoCasoItem[];
  };
  razones: {
    title: string;
    cards: ProcesoRazon[];
    highlightText: string;
  };
  adicional: {
    title: string;
    items: ProcesoInfoItem[];
  };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export const PROCESOS_CONTENT_STORAGE_KEY = "onlex_procesos_content_v1";

export const defaultProcesosEstadoContent: ProcesosEstadoContent = {
  hero: {
    title: "Defensa legal frente al Estado",
    description:
      "Especialistas en procesos contra entidades publicas, ONP y gobiernos locales. Defendemos tus derechos laborales, previsionales y administrativos con experiencia y resultados comprobados.",
  },
  queEs: {
    title: "Que es un proceso contra el Estado?",
    paragraphs: [
      "Un proceso contra el Estado es un procedimiento judicial o administrativo mediante el cual una persona defiende sus derechos frente a una entidad publica que ha vulnerado o desconocido tales derechos.",
      "Estos procesos pueden ser de naturaleza laboral (como el reconocimiento de derechos de trabajadores publicos), previsional (como demandas contra la ONP por pensiones), o administrativa (como la impugnacion de actos administrativos arbitrarios).",
      "En ONLEX contamos con amplia experiencia en litigios contra el Estado, conocemos los procedimientos especiales que aplican y las estrategias mas efectivas para lograr resultados favorables.",
    ],
  },
  casos: {
    title: "Casos frecuentes que defendemos",
    cards: [
      {
        title: "Procesos contra ONP",
        description:
          "Defensa especializada en casos de pensiones denegadas, mal calculadas o devengados impagos. Representamos a jubilados y pensionistas en todas las instancias.",
        items: [
          "Reconocimiento de pension de jubilacion",
          "Recalculo de pension inicial",
          "Cobro de devengados pensionarios",
          "Pension de viudez y orfandad",
        ],
      },
      {
        title: "Procesos contra entidades publicas",
        description:
          "Defendemos tus derechos frente a ministerios, gobiernos regionales, locales y demas entidades del Estado.",
        items: [
          "Reconocimiento de derechos laborales en sector publico",
          "Nulidad de despidos arbitrarios",
          "Pago de bonificaciones y beneficios",
          "Cumplimiento de resoluciones administrativas",
        ],
      },
      {
        title: "Contencioso administrativo",
        description:
          "Impugnacion judicial de actos administrativos ilegales o arbitrarios que vulneran tus derechos.",
        items: [
          "Nulidad de actos administrativos",
          "Impugnacion de sanciones administrativas",
          "Demandas de cumplimiento",
          "Defensa en procedimientos sancionadores",
        ],
      },
      {
        title: "Ejecucion de sentencias",
        description:
          "Garantizamos el cumplimiento efectivo de las sentencias favorables contra el Estado.",
        items: [
          "Ejecucion forzada de sentencias",
          "Cobro de devengados judiciales",
          "Medidas cautelares contra el Estado",
          "Seguimiento hasta el pago efectivo",
        ],
      },
    ],
  },
  razones: {
    title: "Por que necesitas defensa especializada?",
    cards: [
      {
        title: "Experiencia comprobada",
        description: "Anos de experiencia defendiendo derechos frente al Estado con resultados favorables.",
      },
      {
        title: "Conocimiento especializado",
        description:
          "Dominio de la normativa administrativa y jurisprudencia sobre procesos contra el Estado.",
      },
      {
        title: "Defensa hasta el final",
        description: "No solo ganamos el proceso, garantizamos el cumplimiento real de la sentencia.",
      },
    ],
    highlightText:
      "Los procesos contra el Estado tienen particularidades procesales y plazos especiales. Un abogado especializado conoce estas reglas y puede maximizar tus posibilidades de exito.",
  },
  adicional: {
    title: "Aspectos importantes a considerar",
    items: [
      {
        title: "Plazos especiales",
        description:
          "Los procesos contra el Estado tienen plazos de prescripcion y caducidad especificos. Es fundamental actuar a tiempo para no perder tus derechos.",
      },
      {
        title: "Vias procedimentales",
        description:
          "Existen distintas vias para reclamar frente al Estado: proceso laboral, contencioso administrativo, proceso de amparo, entre otros. Elegir la via correcta es crucial.",
      },
      {
        title: "Ejecucion de sentencias",
        description:
          "Ganar el proceso no es suficiente. Es necesario hacer un seguimiento riguroso para garantizar el cumplimiento efectivo de la sentencia y el pago de lo ordenado.",
      },
    ],
  },
  cta: {
    title: "El Estado vulnero tus derechos?",
    description:
      "Contactanos y evaluaremos tu caso. Te explicaremos claramente tus opciones y el camino legal para defender tus derechos.",
    buttonLabel: "Consulta tu caso ahora",
    buttonHref: "/contacto#consulta",
  },
};

export function getProcesosEstadoContent(): ProcesosEstadoContent {
  return loadContent(PROCESOS_CONTENT_STORAGE_KEY, defaultProcesosEstadoContent);
}

export async function saveProcesosEstadoContent(content: ProcesosEstadoContent): Promise<void> {
  await saveContent(PROCESOS_CONTENT_STORAGE_KEY, content);
}

export async function resetProcesosEstadoContent(): Promise<void> {
  await resetContent(PROCESOS_CONTENT_STORAGE_KEY);
}
