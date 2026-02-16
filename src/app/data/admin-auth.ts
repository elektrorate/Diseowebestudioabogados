import { getFirebaseAuth, getFirebaseDb, isFirebaseEnabled } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ADMIN_AUTH_KEY = "onlex_admin_auth";
const ADMIN_USER_KEY = "onlex_admin_user";
const ADMIN_DEFAULT_USERNAME = "admin";
const ADMIN_DEFAULT_PASSWORD = "testing123";
const ADMIN_DEFAULT_EMAIL = "admin@onlex.pe";

function toAdminEmail(usuario: string): string {
  const trimmed = usuario.trim().toLowerCase();
  if (trimmed.includes("@")) return trimmed;
  return `${trimmed}@onlex.pe`;
}

function isPrimaryAdminEmail(email?: string | null): boolean {
  return (email || "").toLowerCase() === ADMIN_DEFAULT_EMAIL;
}

function setLocalAdminSession(username: string) {
  localStorage.setItem(ADMIN_AUTH_KEY, "true");
  localStorage.setItem(ADMIN_USER_KEY, username);
}

function clearLocalAdminSession() {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

export async function signInAdmin(usuario: string, clave: string): Promise<{ ok: boolean; message?: string }> {
  const username = usuario.trim().toLowerCase();

  if (!isFirebaseEnabled) {
    if (username === ADMIN_DEFAULT_USERNAME && clave === ADMIN_DEFAULT_PASSWORD) {
      setLocalAdminSession(ADMIN_DEFAULT_USERNAME);
      return { ok: true };
    }
    return { ok: false, message: "Credenciales incorrectas" };
  }

  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  if (!auth || !db) return { ok: false, message: "Firebase no esta configurado" };

  const email = username === ADMIN_DEFAULT_USERNAME ? ADMIN_DEFAULT_EMAIL : toAdminEmail(username);
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, clave);
    const profileDoc = await getDoc(doc(db, "admin_profiles", credentials.user.uid));
    const profile = profileDoc.exists()
      ? (profileDoc.data() as { username?: string; role?: string })
      : null;

    if ((!profile || profile.role !== "admin") && !isPrimaryAdminEmail(credentials.user.email)) {
      await signOut(auth);
      clearLocalAdminSession();
      return { ok: false, message: "El usuario no tiene permisos de administrador" };
    }

    setLocalAdminSession(
      profile?.username || (isPrimaryAdminEmail(credentials.user.email) ? ADMIN_DEFAULT_USERNAME : username) || ADMIN_DEFAULT_USERNAME,
    );
    return { ok: true };
  } catch {
    return { ok: false, message: "Credenciales incorrectas" };
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!isFirebaseEnabled) {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
  }

  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  if (!auth || !db) {
    clearLocalAdminSession();
    return false;
  }

  if (!auth.currentUser) {
    await new Promise<void>((resolve) => {
      const unsub = onAuthStateChanged(auth, () => {
        unsub();
        resolve();
      });
    });
  }

  if (!auth.currentUser) {
    clearLocalAdminSession();
    return false;
  }

  try {
    const profileDoc = await getDoc(doc(db, "admin_profiles", auth.currentUser.uid));
    const profile = profileDoc.exists()
      ? (profileDoc.data() as { username?: string; role?: string })
      : null;
    if ((!profile || profile.role !== "admin") && !isPrimaryAdminEmail(auth.currentUser.email)) {
      clearLocalAdminSession();
      return false;
    }
    setLocalAdminSession(profile?.username || ADMIN_DEFAULT_USERNAME);
    return true;
  } catch {
    clearLocalAdminSession();
    return false;
  }
}

export async function signOutAdmin(): Promise<void> {
  if (isFirebaseEnabled) {
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
  }
  clearLocalAdminSession();
}
