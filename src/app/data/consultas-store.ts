import { getFirebaseDb, isFirebaseEnabled } from "@/lib/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export type ConsultaEstado = "Pendiente" | "Contactado" | "Resuelto";

export interface ConsultaComentario {
  id: string;
  texto: string;
  createdAt: string;
}

export interface Consulta {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  asunto: string;
  mensaje: string;
  fecha: string;
  estado: ConsultaEstado;
  comentarios: ConsultaComentario[];
}

export interface NuevaConsulta {
  nombre: string;
  telefono: string;
  email: string;
  asunto: string;
  mensaje: string;
}

const FALLBACK_STORAGE_KEY = "onlex_consultas_v1";

function mapEstadoFromDb(estado: string | null | undefined): ConsultaEstado {
  if (estado === "contactado") return "Contactado";
  if (estado === "resuelto") return "Resuelto";
  return "Pendiente";
}

function mapEstadoToDb(estado: ConsultaEstado): "pendiente" | "contactado" | "resuelto" {
  if (estado === "Contactado") return "contactado";
  if (estado === "Resuelto") return "resuelto";
  return "pendiente";
}

function readFallback(): Consulta[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(FALLBACK_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Consulta[];
  } catch {
    return [];
  }
}

function writeFallback(data: Consulta[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(data));
}

export async function createConsulta(payload: NuevaConsulta): Promise<void> {
  if (!isFirebaseEnabled) {
    const current = readFallback();
    const item: Consulta = {
      id: crypto.randomUUID(),
      nombre: payload.nombre,
      telefono: payload.telefono,
      email: payload.email,
      asunto: payload.asunto,
      mensaje: payload.mensaje,
      fecha: new Date().toISOString(),
      estado: "Pendiente",
      comentarios: [],
    };
    writeFallback([item, ...current]);
    return;
  }

  const db = getFirebaseDb();
  if (!db) return;

  await addDoc(collection(db, "consultas"), {
    nombre: payload.nombre,
    telefono: payload.telefono,
    email: payload.email || null,
    asunto: payload.asunto || null,
    mensaje: payload.mensaje,
    estado: "pendiente",
    comentarios: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getConsultas(): Promise<Consulta[]> {
  if (!isFirebaseEnabled) {
    return readFallback();
  }

  const db = getFirebaseDb();
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, "consultas"), orderBy("createdAt", "desc")));

  return snapshot.docs.map((row) => {
    const data = row.data() as {
      nombre: string;
      telefono: string;
      email?: string | null;
      asunto?: string | null;
      mensaje: string;
      estado?: string | null;
      createdAt?: { toDate?: () => Date };
      comentarios?: Array<{
        id?: string;
        texto?: string;
        createdAt?: string;
      }>;
    };
    const fecha = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString();
    const comentarios = Array.isArray(data.comentarios)
      ? data.comentarios
          .filter((item) => Boolean(item?.texto))
          .map((item) => ({
            id: item.id || crypto.randomUUID(),
            texto: item.texto || "",
            createdAt: item.createdAt || new Date().toISOString(),
          }))
      : [];

    return {
      id: row.id,
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email || "",
      asunto: data.asunto || "",
      mensaje: data.mensaje,
      fecha,
      estado: mapEstadoFromDb(data.estado),
      comentarios,
    };
  });
}

export async function updateConsultaEstado(id: string, estado: ConsultaEstado): Promise<void> {
  if (!isFirebaseEnabled) {
    const current = readFallback();
    writeFallback(current.map((item) => (item.id === id ? { ...item, estado } : item)));
    return;
  }

  const db = getFirebaseDb();
  if (!db) return;

  await updateDoc(doc(db, "consultas", id), {
    estado: mapEstadoToDb(estado),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteConsulta(id: string): Promise<void> {
  if (!isFirebaseEnabled) {
    const current = readFallback();
    writeFallback(current.filter((item) => item.id !== id));
    return;
  }

  const db = getFirebaseDb();
  if (!db) return;

  await deleteDoc(doc(db, "consultas", id));
}

export async function addConsultaComentario(consultaId: string, texto: string): Promise<ConsultaComentario> {
  const comentario: ConsultaComentario = {
    id: crypto.randomUUID(),
    texto: texto.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!isFirebaseEnabled) {
    const current = readFallback();
    writeFallback(
      current.map((item) =>
        item.id === consultaId
          ? { ...item, comentarios: [...(item.comentarios || []), comentario] }
          : item,
      ),
    );
    return comentario;
  }

  const db = getFirebaseDb();
  if (!db) return comentario;

  await updateDoc(doc(db, "consultas", consultaId), {
    comentarios: arrayUnion(comentario),
    updatedAt: serverTimestamp(),
  });

  return comentario;
}
