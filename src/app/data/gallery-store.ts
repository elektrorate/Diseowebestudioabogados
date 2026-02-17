import { CONTENT_UPDATED_EVENT } from "./content-store";
import {
  GallerySectionId,
  GalleryVariantKey,
  gallerySectionFallbacks,
  gallerySections,
} from "./gallery-sections";

export const GALLERY_STORAGE_KEY = "onlex_gallery_content_v1";

export const galleryVariantWidths: Record<GalleryVariantKey, number> = {
  thumbnail: 360,
  medium: 960,
  large: 1600,
};

export interface GalleryImageVariant {
  src: string;
  width: number;
  height: number;
  bytes: number;
  mimeType: string;
}

export interface GalleryPhoto {
  id: string;
  alt: string;
  originalName: string;
  createdAt: string;
  updatedAt: string;
  variants: Record<GalleryVariantKey, GalleryImageVariant>;
}

export interface GallerySectionContent {
  photos: GalleryPhoto[];
  updatedAt: string;
}

export type GalleryContent = Record<GallerySectionId, GallerySectionContent>;

const variantKeys: GalleryVariantKey[] = ["thumbnail", "medium", "large"];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function nowIso() {
  return new Date().toISOString();
}

function createVariant(src: string, key: GalleryVariantKey): GalleryImageVariant {
  return {
    src,
    width: galleryVariantWidths[key],
    height: 0,
    bytes: 0,
    mimeType: "image/webp",
  };
}

function createDefaultPhoto(sectionId: GallerySectionId): GalleryPhoto {
  const fallback = gallerySectionFallbacks[sectionId];
  const createdAt = nowIso();
  return {
    id: `default-${sectionId}-1`,
    alt: fallback.alt,
    originalName: "default-image.webp",
    createdAt,
    updatedAt: createdAt,
    variants: {
      thumbnail: createVariant(fallback.src, "thumbnail"),
      medium: createVariant(fallback.src, "medium"),
      large: createVariant(fallback.src, "large"),
    },
  };
}

export function createDefaultGalleryContent(): GalleryContent {
  const createdAt = nowIso();
  return gallerySections.reduce((acc, section) => {
    acc[section.id] = {
      photos: [createDefaultPhoto(section.id)],
      updatedAt: createdAt,
    };
    return acc;
  }, {} as GalleryContent);
}

function toSafeNumber(value: unknown, fallback: number) {
  if (typeof value !== "number") return fallback;
  if (!Number.isFinite(value)) return fallback;
  if (value < 0) return fallback;
  return value;
}

function normalizeVariant(
  input: unknown,
  key: GalleryVariantKey,
  fallbackSrc: string,
): GalleryImageVariant {
  if (!isObject(input)) return createVariant(fallbackSrc, key);
  const src = typeof input.src === "string" && input.src ? input.src : fallbackSrc;
  return {
    src,
    width: toSafeNumber(input.width, galleryVariantWidths[key]),
    height: toSafeNumber(input.height, 0),
    bytes: toSafeNumber(input.bytes, 0),
    mimeType: typeof input.mimeType === "string" && input.mimeType ? input.mimeType : "image/webp",
  };
}

function normalizePhoto(input: unknown, sectionId: GallerySectionId): GalleryPhoto | null {
  if (!isObject(input)) return null;

  const fallback = gallerySectionFallbacks[sectionId];
  const legacySrc = typeof input.src === "string" && input.src ? input.src : fallback.src;
  const variants = isObject(input.variants) ? input.variants : {};
  const createdAt = typeof input.createdAt === "string" && input.createdAt ? input.createdAt : nowIso();
  const updatedAt = typeof input.updatedAt === "string" && input.updatedAt ? input.updatedAt : createdAt;

  return {
    id: typeof input.id === "string" && input.id ? input.id : `${sectionId}-${Math.random().toString(36).slice(2)}`,
    alt: typeof input.alt === "string" && input.alt ? input.alt : fallback.alt,
    originalName: typeof input.originalName === "string" ? input.originalName : "uploaded-image.webp",
    createdAt,
    updatedAt,
    variants: {
      thumbnail: normalizeVariant(variants.thumbnail, "thumbnail", legacySrc),
      medium: normalizeVariant(variants.medium, "medium", legacySrc),
      large: normalizeVariant(variants.large, "large", legacySrc),
    },
  };
}

function normalizeGalleryContent(input: unknown): GalleryContent {
  const fallback = createDefaultGalleryContent();
  if (!isObject(input)) return fallback;

  for (const section of gallerySections) {
    const rawSection = input[section.id];
    if (!isObject(rawSection) || !Array.isArray(rawSection.photos)) continue;

    const photos = rawSection.photos
      .map((photo) => normalizePhoto(photo, section.id))
      .filter((photo): photo is GalleryPhoto => photo !== null);

    const normalizedPhotos =
      rawSection.photos.length === 0
        ? []
        : photos.length > 0
          ? photos
          : fallback[section.id].photos;

    fallback[section.id] = {
      photos: normalizedPhotos,
      updatedAt:
        typeof rawSection.updatedAt === "string" && rawSection.updatedAt
          ? rawSection.updatedAt
          : fallback[section.id].updatedAt,
    };
  }

  return fallback;
}

export function getGalleryContent(): GalleryContent {
  if (typeof window === "undefined") return createDefaultGalleryContent();
  const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
  if (!raw) return createDefaultGalleryContent();

  try {
    const parsed = JSON.parse(raw) as unknown;
    return normalizeGalleryContent(parsed);
  } catch {
    return createDefaultGalleryContent();
  }
}

export async function saveGalleryContent(content: GalleryContent): Promise<void> {
  if (typeof window === "undefined") return;
  const normalized = normalizeGalleryContent(content);
  localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
}

export async function resetGalleryContent(): Promise<void> {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GALLERY_STORAGE_KEY);
  window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
}

export interface ResolvedGalleryImage {
  src: string;
  alt: string;
  srcSet: string;
  sizes: string;
}

export function resolveSectionImage(
  content: GalleryContent,
  sectionId: GallerySectionId,
  fallbackSrc: string,
  fallbackAlt: string,
  sizes = "(max-width: 768px) 100vw, 50vw",
): ResolvedGalleryImage {
  const section = content[sectionId];
  const photo = section?.photos[0];
  if (!photo) {
    return {
      src: fallbackSrc,
      alt: fallbackAlt,
      srcSet: "",
      sizes,
    };
  }

  const src =
    photo.variants.large.src ||
    photo.variants.medium.src ||
    photo.variants.thumbnail.src ||
    fallbackSrc;

  const srcSet = variantKeys
    .map((key) => {
      const variant = photo.variants[key];
      if (!variant?.src) return null;
      const width = variant.width > 0 ? variant.width : galleryVariantWidths[key];
      return `${variant.src} ${width}w`;
    })
    .filter((entry): entry is string => Boolean(entry))
    .join(", ");

  return {
    src,
    alt: photo.alt || fallbackAlt,
    srcSet,
    sizes,
  };
}
