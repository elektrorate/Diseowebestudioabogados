import { loadContent, resetContent, saveContent } from "./content-store";

export interface EspecialidadAreaContent {
  slug: string;
  title: string;
  description: string;
}

export interface EspecialidadesContent {
  hero: {
    title: string;
    description: string;
  };
  areas: EspecialidadAreaContent[];
  proceso: {
    title: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
  };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export const ESPECIALIDADES_CONTENT_STORAGE_KEY = "onlex_especialidades_content_v1";

export const defaultEspecialidadesContent: EspecialidadesContent = {
  hero: {
    title: "Nuestras especialidades",
    description:
      "Defendemos tus derechos con experiencia, compromiso y resultados comprobados en cada area del derecho.",
  },
  areas: [
    {
      slug: "laboral",
      title: "Derecho Laboral",
      description:
        "Defensa integral en conflictos laborales del sector publico y privado. Despidos, beneficios sociales y reposicion.",
    },
    {
      slug: "previsional",
      title: "Derecho Previsional",
      description:
        "Especialistas en pensiones ONP. Reconocimiento, recalculo y cobro de devengados pensionarios.",
    },
    {
      slug: "administrativo",
      title: "Derecho Administrativo",
      description: "Procesos contra el Estado. Nulidad de actos administrativos y contencioso-administrativo.",
    },
    {
      slug: "municipal",
      title: "Derecho Municipal",
      description: "Defensa ante municipalidades. Multas, clausuras y procedimientos administrativos municipales.",
    },
    {
      slug: "registral",
      title: "Derecho Registral",
      description: "Procedimientos SUNARP. Inscripciones, rectificaciones y defensa de derechos registrales.",
    },
    {
      slug: "civil",
      title: "Derecho Civil",
      description: "Contratos, obligaciones y responsabilidad civil. Defensa de derechos patrimoniales.",
    },
    {
      slug: "familia",
      title: "Derecho de Familia",
      description: "Divorcios, alimentos, tenencia y regimen de visitas. Acompanamiento humano y profesional.",
    },
    {
      slug: "sucesiones",
      title: "Sucesiones",
      description: "Testamentos, declaratoria de herederos y particiones. Planificacion patrimonial integral.",
    },
  ],
  proceso: {
    title: "Como trabajamos contigo",
    step1Title: "Evaluacion",
    step1Description:
      "Analizamos tu caso de manera detallada y te explicamos las opciones legales disponibles.",
    step2Title: "Estrategia",
    step2Description: "Disenamos una estrategia legal solida, clara y orientada a resultados.",
    step3Title: "Defensa y seguimiento",
    step3Description: "Te acompanamos en todo el proceso hasta lograr el cumplimiento efectivo de la sentencia.",
  },
  cta: {
    title: "No estas seguro de que area legal necesitas?",
    description: "Contactanos y te orientaremos sobre la mejor forma de defender tu caso.",
    buttonLabel: "Solicita tu consulta",
    buttonHref: "/contacto#consulta",
  },
};

export function getEspecialidadesContent(): EspecialidadesContent {
  return loadContent(ESPECIALIDADES_CONTENT_STORAGE_KEY, defaultEspecialidadesContent);
}

export function saveEspecialidadesContent(content: EspecialidadesContent) {
  saveContent(ESPECIALIDADES_CONTENT_STORAGE_KEY, content);
}

export function resetEspecialidadesContent() {
  resetContent(ESPECIALIDADES_CONTENT_STORAGE_KEY);
}
