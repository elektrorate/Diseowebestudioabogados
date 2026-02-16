import { loadContent, resetContent, saveContent } from "./content-store";

export interface ContactoInfoCard {
  title: string;
  line1: string;
  line2: string;
}

export interface ContactoContent {
  hero: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    nombreLabel: string;
    nombrePlaceholder: string;
    telefonoLabel: string;
    telefonoPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    asuntoLabel: string;
    asuntoPlaceholder: string;
    mensajeLabel: string;
    mensajePlaceholder: string;
    buttonLabel: string;
    buttonLoadingLabel: string;
  };
  info: {
    title: string;
    telefonos: ContactoInfoCard;
    correo: ContactoInfoCard;
    direccion: ContactoInfoCard;
    horario: ContactoInfoCard;
    horarioNote: string;
    highlightTitle: string;
    highlightDescription: string;
  };
}

export const CONTACTO_CONTENT_STORAGE_KEY = "onlex_contacto_content_v1";

export const defaultContactoContent: ContactoContent = {
  hero: {
    title: "Contactanos",
    description:
      "Agenda tu consulta legal. Te escuchamos, analizamos tu caso y te explicamos claramente tus opciones.",
  },
  form: {
    title: "Solicita tu consulta",
    nombreLabel: "Nombre completo *",
    nombrePlaceholder: "Ingresa tu nombre completo",
    telefonoLabel: "Telefono *",
    telefonoPlaceholder: "+51 987 654 321",
    emailLabel: "Correo electronico",
    emailPlaceholder: "tu@email.com",
    asuntoLabel: "Asunto",
    asuntoPlaceholder: "En que podemos ayudarte?",
    mensajeLabel: "Descripcion del caso *",
    mensajePlaceholder: "Cuentanos brevemente sobre tu situacion legal...",
    buttonLabel: "Enviar consulta",
    buttonLoadingLabel: "Enviando...",
  },
  info: {
    title: "Informacion de contacto",
    telefonos: {
      title: "Telefonos",
      line1: "+51 (01) 234-5678",
      line2: "+51 987 654 321",
    },
    correo: {
      title: "Correo electronico",
      line1: "contacto@onlex.pe",
      line2: "consultas@onlex.pe",
    },
    direccion: {
      title: "Direccion",
      line1: "Av. Javier Prado Este 123",
      line2: "San Isidro, Lima, Peru",
    },
    horario: {
      title: "Horario de atencion",
      line1: "Lunes a Viernes: 9:00 AM - 6:00 PM",
      line2: "Sabados: 9:00 AM - 1:00 PM",
    },
    horarioNote: "*Atencion presencial y virtual",
    highlightTitle: "Consulta inicial gratuita",
    highlightDescription:
      "La primera evaluacion de tu caso es sin costo. Te explicamos claramente tus opciones legales y el camino a seguir.",
  },
};

export function getContactoContent(): ContactoContent {
  return loadContent(CONTACTO_CONTENT_STORAGE_KEY, defaultContactoContent);
}

export async function saveContactoContent(content: ContactoContent): Promise<void> {
  await saveContent(CONTACTO_CONTENT_STORAGE_KEY, content);
}

export async function resetContactoContent(): Promise<void> {
  await resetContent(CONTACTO_CONTENT_STORAGE_KEY);
}
