export interface Especialidad {
  slug: string;
  title: string;
  description: string;
  problemas: string[];
  servicios: string[];
}

export const especialidades: Especialidad[] = [
  {
    slug: "laboral",
    title: "Derecho Laboral",
    description: "Defendemos tus derechos laborales tanto en el sector público como privado. Contamos con amplia experiencia en procesos de reposición, pago de beneficios sociales, y defensa ante despidos arbitrarios.",
    problemas: [
      "Despido injustificado o arbitrario",
      "Falta de pago de beneficios sociales (CTS, gratificaciones, vacaciones)",
      "Hostigamiento laboral o discriminación",
      "Incumplimiento de condiciones de trabajo",
      "Conflictos sobre remuneraciones y bonificaciones",
      "Desnaturalización de contratos temporales"
    ],
    servicios: [
      "Demandas de reposición laboral",
      "Cobro de beneficios sociales",
      "Indemnizaciones por despido arbitrario",
      "Procesos de hostigamiento laboral",
      "Reconocimiento de derechos laborales",
      "Asesoría preventiva en relaciones laborales"
    ]
  },
  {
    slug: "previsional",
    title: "Derecho Previsional",
    description: "Especialistas en la defensa de tus derechos pensionarios. Representamos a jubilados y pensionistas en procesos contra la ONP y otras entidades previsionales para el reconocimiento, recalculo y pago de pensiones.",
    problemas: [
      "Pensión denegada sin justificación",
      "Cálculo incorrecto del monto de pensión",
      "Demora en el reconocimiento de derechos pensionarios",
      "Negativa de pago de pensión de viudez u orfandad",
      "Falta de pago de devengados pensionarios",
      "Incumplimiento de sentencias sobre pensiones"
    ],
    servicios: [
      "Demandas de reconocimiento de pensión",
      "Recalculo y reajuste de pensiones",
      "Cobro de devengados pensionarios",
      "Pensión de viudez y orfandad",
      "Ejecución de sentencias pensionarias",
      "Asesoría integral en trámites ante ONP"
    ]
  },
  {
    slug: "administrativo",
    title: "Derecho Administrativo",
    description: "Defensa especializada en procesos contra entidades del Estado. Protegemos tus derechos frente a actos administrativos arbitrarios y garantizamos el cumplimiento de las decisiones judiciales.",
    problemas: [
      "Actos administrativos ilegales o arbitrarios",
      "Negativa injustificada de trámites administrativos",
      "Sanciones administrativas sin debido proceso",
      "Demora injustificada en procedimientos",
      "Incumplimiento de resoluciones administrativas",
      "Conflictos con entidades públicas"
    ],
    servicios: [
      "Procesos contencioso-administrativos",
      "Nulidad de actos administrativos",
      "Demandas de cumplimiento",
      "Recursos administrativos (reconsideración, apelación)",
      "Ejecución de sentencias administrativas",
      "Representación ante el Tribunal del Servicio Civil"
    ]
  },
  {
    slug: "municipal",
    title: "Derecho Municipal",
    description: "Asesoría y defensa en procedimientos administrativos municipales. Protegemos tus derechos frente a multas, sanciones y actos municipales que afecten tu patrimonio o actividad.",
    problemas: [
      "Multas municipales injustas o excesivas",
      "Clausura de establecimientos sin fundamento",
      "Problemas con licencias de funcionamiento",
      "Sanciones por infracciones municipales",
      "Conflictos por arbitrios y contribuciones",
      "Procedimientos de fiscalización irregular"
    ],
    servicios: [
      "Recursos contra multas municipales",
      "Defensa en procedimientos administrativos sancionadores",
      "Impugnación de clausuras",
      "Asesoría en licencias y autorizaciones",
      "Procesos contencioso-administrativos municipales",
      "Defensa ante Tribunales Administrativos"
    ]
  },
  {
    slug: "registral",
    title: "Derecho Registral",
    description: "Asesoría integral en procedimientos registrales ante SUNARP. Defendemos tus derechos patrimoniales y solucionamos conflictos de inscripciones, rectificaciones y cancelaciones.",
    problemas: [
      "Negativa de inscripción registral",
      "Errores en partidas registrales",
      "Superposición de partidas",
      "Conflictos sobre titularidad de bienes",
      "Bloqueos o cargas indebidas",
      "Procedimientos de rectificación denegados"
    ],
    servicios: [
      "Inscripciones registrales",
      "Rectificación de partidas registrales",
      "Cancelación de asientos registrales",
      "Inmatriculación de predios",
      "Defensa en procedimientos SUNARP",
      "Recursos de apelación registral"
    ]
  },
  {
    slug: "civil",
    title: "Derecho Civil",
    description: "Asesoría y defensa en procesos civiles. Protegemos tus derechos patrimoniales y personales en conflictos contractuales, obligaciones y responsabilidad civil.",
    problemas: [
      "Incumplimiento de contratos",
      "Conflictos sobre obligaciones de dar, hacer o no hacer",
      "Daños y perjuicios patrimoniales",
      "Problemas con garantías (hipotecas, prendas)",
      "Responsabilidad civil extracontractual",
      "Conflictos sobre bienes muebles e inmuebles"
    ],
    servicios: [
      "Demandas de resolución o cumplimiento de contratos",
      "Cobro de obligaciones dinerarias",
      "Indemnizaciones por daños y perjuicios",
      "Procesos de mejor derecho de propiedad",
      "Reivindicación de bienes",
      "Defensa en procesos civiles patrimoniales"
    ]
  },
  {
    slug: "familia",
    title: "Derecho de Familia",
    description: "Acompañamiento legal en procesos de familia. Protegemos tus derechos y los de tus seres queridos con sensibilidad, responsabilidad y enfoque humano.",
    problemas: [
      "Divorcio y separación de cuerpos",
      "Régimen de visitas incumplido",
      "Pensión de alimentos insuficiente o impagada",
      "Conflictos sobre tenencia de menores",
      "Violencia familiar",
      "Liquidación de sociedad de gananciales"
    ],
    servicios: [
      "Procesos de divorcio (causal y mutuo acuerdo)",
      "Demandas de alimentos",
      "Régimen de visitas",
      "Tenencia de menores",
      "Violencia familiar y medidas de protección",
      "Liquidación de bienes gananciales"
    ]
  },
  {
    slug: "sucesiones",
    title: "Sucesiones",
    description: "Asesoría integral en procesos sucesorios. Te acompañamos en la planificación patrimonial y en la defensa de tus derechos como heredero.",
    problemas: [
      "Conflictos entre herederos",
      "Falta de testamento del causante",
      "Exclusión injusta de herederos",
      "Problemas con la partición de bienes",
      "Testamentos impugnados",
      "Demora en trámites sucesorios"
    ],
    servicios: [
      "Declaratoria de herederos",
      "Elaboración y protocolización de testamentos",
      "Impugnación de testamentos",
      "Partición y división de herencia",
      "Petición de herencia",
      "Defensa de derechos sucesorios"
    ]
  }
];
