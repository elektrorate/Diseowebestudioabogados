import { GalleryImageVariant } from "./gallery-store";
import { GalleryVariantKey } from "./gallery-sections";

const ONE_MB = 1024 * 1024;

const heavyBudgets: Record<GalleryVariantKey, number> = {
  thumbnail: 110 * 1024,
  medium: 260 * 1024,
  large: 520 * 1024,
};

const normalBudgets: Record<GalleryVariantKey, number> = {
  thumbnail: 140 * 1024,
  medium: 360 * 1024,
  large: 820 * 1024,
};

const baseLongEdges: Record<GalleryVariantKey, number> = {
  thumbnail: 360,
  medium: 960,
  large: 1600,
};

const heavyQualitySteps = [0.86, 0.8, 0.74, 0.68, 0.62];
const normalQualitySteps = [0.9, 0.86, 0.82, 0.78, 0.74];

function inferAltFromFilename(fileName: string) {
  const withoutExt = fileName.replace(/\.[^./\\]+$/, "");
  const normalized = withoutExt.replace(/[-_]+/g, " ").trim();
  return normalized || "Imagen de galeria";
}

function ensureCanvasContext(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo crear el contexto de imagen.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return ctx;
}

function drawImage(image: HTMLImageElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = ensureCanvasContext(canvas);
  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("No se pudo codificar la imagen."));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      quality,
    );
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("No se pudo leer la imagen optimizada."));
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => reject(new Error("No se pudo leer la imagen optimizada."));
    reader.readAsDataURL(blob);
  });
}

function fitWithinLongEdge(width: number, height: number, targetLongEdge: number) {
  const longEdge = Math.max(width, height);
  const scale = Math.min(1, targetLongEdge / longEdge);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function buildTargetLongEdge(fileSize: number, sourceLongEdge: number, key: GalleryVariantKey) {
  const hardLimit = fileSize > ONE_MB ? 1900 : 2200;
  const boundedLargeEdge = Math.min(sourceLongEdge, hardLimit);
  if (key === "large") return boundedLargeEdge;
  if (key === "medium") return Math.min(baseLongEdges.medium, boundedLargeEdge);
  return Math.min(baseLongEdges.thumbnail, boundedLargeEdge);
}

async function encodeVariant(
  image: HTMLImageElement,
  key: GalleryVariantKey,
  fileSize: number,
): Promise<GalleryImageVariant> {
  const heavy = fileSize > ONE_MB;
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;
  const sourceLongEdge = Math.max(sourceWidth, sourceHeight);
  const targetLongEdge = buildTargetLongEdge(fileSize, sourceLongEdge, key);

  let { width, height } = fitWithinLongEdge(sourceWidth, sourceHeight, targetLongEdge);
  const qualitySteps = heavy ? heavyQualitySteps : normalQualitySteps;
  const budget = (heavy ? heavyBudgets : normalBudgets)[key];

  let selectedBlob: Blob | null = null;
  let attempts = 0;

  while (attempts < 3) {
    const canvas = drawImage(image, width, height);
    for (const quality of qualitySteps) {
      const blob = await toBlob(canvas, quality);
      selectedBlob = blob;
      if (blob.size <= budget) break;
    }

    if (!selectedBlob) {
      throw new Error("No se pudo optimizar la imagen.");
    }

    if (selectedBlob.size <= budget * 1.12) break;
    if (width <= 260 || height <= 260) break;

    width = Math.max(1, Math.round(width * 0.9));
    height = Math.max(1, Math.round(height * 0.9));
    attempts += 1;
  }

  if (!selectedBlob) {
    throw new Error("No se pudo optimizar la imagen.");
  }

  return {
    src: await blobToDataUrl(selectedBlob),
    width,
    height,
    bytes: selectedBlob.size,
    mimeType: selectedBlob.type || "image/webp",
  };
}

function decodeImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo abrir la imagen seleccionada."));
    };
    image.src = objectUrl;
  });
}

export interface OptimizedGalleryPhotoDraft {
  alt: string;
  originalName: string;
  variants: Record<GalleryVariantKey, GalleryImageVariant>;
}

export async function optimizeGalleryPhoto(file: File): Promise<OptimizedGalleryPhotoDraft> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecciona un archivo de imagen valido.");
  }

  const image = await decodeImage(file);
  const [thumbnail, medium, large] = await Promise.all([
    encodeVariant(image, "thumbnail", file.size),
    encodeVariant(image, "medium", file.size),
    encodeVariant(image, "large", file.size),
  ]);

  return {
    alt: inferAltFromFilename(file.name),
    originalName: file.name,
    variants: { thumbnail, medium, large },
  };
}
