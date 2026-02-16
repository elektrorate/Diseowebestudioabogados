import { getFirebaseAuth, getFirebaseDb, isFirebaseEnabled } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
export const CONTENT_UPDATED_EVENT = "onlex_content_updated";

const contentHydrationInProgress = new Set<string>();

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function loadContent<T>(storageKey: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  hydrateContentFromRemote<T>(storageKey);

  const raw = localStorage.getItem(storageKey);
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

export async function saveContent<T>(storageKey: string, content: T): Promise<void> {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey, JSON.stringify(content));
  window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));

  if (!isFirebaseEnabled) return;

  const db = getFirebaseDb();
  if (!db) return;
  const auth = getFirebaseAuth();
  const uid = auth?.currentUser?.uid || null;

  await setDoc(
    doc(db, "site_content", storageKey),
    {
      key: storageKey,
      content,
      updatedAt: serverTimestamp(),
      updatedBy: uid,
    },
    { merge: true },
  );
}

export async function resetContent(storageKey: string): Promise<void> {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));

  if (!isFirebaseEnabled) return;

  const db = getFirebaseDb();
  if (!db) return;
  await deleteDoc(doc(db, "site_content", storageKey));
}

export function hydrateContentFromRemote<T>(storageKey: string) {
  if (typeof window === "undefined") return;
  if (!isFirebaseEnabled) return;
  if (contentHydrationInProgress.has(storageKey)) return;

  contentHydrationInProgress.add(storageKey);

  const db = getFirebaseDb();
  if (!db) {
    contentHydrationInProgress.delete(storageKey);
    return;
  }

  void getDoc(doc(db, "site_content", storageKey))
    .then((snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.data() as { content?: unknown };
      if (!isObject(data.content)) return;
      localStorage.setItem(storageKey, JSON.stringify(data.content as T));
      window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
    })
    .finally(() => {
      contentHydrationInProgress.delete(storageKey);
    });
}
