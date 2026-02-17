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

function createFallbackConsulta(payload: NuevaConsulta): Consulta {
  return {
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
}

function prependFallback(item: Consulta) {
  const current = readFallback();
  writeFallback([item, ...current]);
}

function mergeConsultas(remote: Consulta[], local: Consulta[]): Consulta[] {
  if (local.length === 0) return remote;
  const remoteIds = new Set(remote.map((item) => item.id));
  const pendingLocal = local.filter((item) => !remoteIds.has(item.id));
  return [...pendingLocal, ...remote].sort((a, b) => {
    const aTime = Date.parse(a.fecha) || 0;
    const bTime = Date.parse(b.fecha) || 0;
    return bTime - aTime;
  });
}

export async function createConsulta(payload: NuevaConsulta): Promise<void> {
  if (!isFirebaseEnabled) {
    prependFallback(createFallbackConsulta(payload));
    return;
  }

  const db = getFirebaseDb();
  if (!db) {
    prependFallback(createFallbackConsulta(payload));
    return;
  }

  try {
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
  } catch (error) {
    prependFallback(createFallbackConsulta(payload));
    console.error("createConsulta: fallback local por error remoto", error);
  }
}

export async function getConsultas(): Promise<Consulta[]> {
  if (!isFirebaseEnabled) {
    return readFallback();
  }

  const db = getFirebaseDb();
  if (!db) return readFallback();

  try {
    const snapshot = await getDocs(query(collection(db, "consultas"), orderBy("createdAt", "desc")));

    const remote = snapshot.docs.map((row) => {
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

    return mergeConsultas(remote, readFallback());
  } catch (error) {
    console.error("getConsultas: fallback local por error remoto", error);
    return readFallback();
  }
}

export async function updateConsultaEstado(id: string, estado: ConsultaEstado): Promise<void> {
  if (!isFirebaseEnabled) {
    const current = readFallback();
    writeFallback(current.map((item) => (item.id === id ? { ...item, estado } : item)));
    return;
  }

  const db = getFirebaseDb();
  if (!db) {
    const current = readFallback();
    writeFallback(current.map((item) => (item.id === id ? { ...item, estado } : item)));
    return;
  }

  try {
    await updateDoc(doc(db, "consultas", id), {
      estado: mapEstadoToDb(estado),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    const current = readFallback();
    writeFallback(current.map((item) => (item.id === id ? { ...item, estado } : item)));
    console.error("updateConsultaEstado: fallback local por error remoto", error);
  }
}

export async function deleteConsulta(id: string): Promise<void> {
  if (!isFirebaseEnabled) {
    const current = readFallback();
    writeFallback(current.filter((item) => item.id !== id));
    return;
  }

  const db = getFirebaseDb();
  if (!db) {
    const current = readFallback();
    writeFallback(current.filter((item) => item.id !== id));
    return;
  }

  try {
    await deleteDoc(doc(db, "consultas", id));
  } catch (error) {
    const current = readFallback();
    writeFallback(current.filter((item) => item.id !== id));
    console.error("deleteConsulta: fallback local por error remoto", error);
  }
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
  if (!db) {
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

  try {
    await updateDoc(doc(db, "consultas", consultaId), {
      comentarios: arrayUnion(comentario),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    const current = readFallback();
    writeFallback(
      current.map((item) =>
        item.id === consultaId
          ? { ...item, comentarios: [...(item.comentarios || []), comentario] }
          : item,
      ),
    );
    console.error("addConsultaComentario: fallback local por error remoto", error);
  }

  return comentario;
}
