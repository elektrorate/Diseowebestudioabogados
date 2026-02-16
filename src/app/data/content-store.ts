export const CONTENT_UPDATED_EVENT = "onlex_content_updated";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function loadContent<T>(storageKey: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

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

export function saveContent<T>(storageKey: string, content: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey, JSON.stringify(content));
  window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
}

export function resetContent(storageKey: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
}
