import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, RefreshCcw, Save, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CONTENT_UPDATED_EVENT } from "../../data/content-store";
import { optimizeGalleryPhoto } from "../../data/gallery-image-optimizer";
import { GallerySectionId, gallerySections } from "../../data/gallery-sections";
import {
  GalleryContent,
  GalleryPhoto,
  createDefaultGalleryContent,
  getGalleryContent,
  resetGalleryContent,
  saveGalleryContent,
} from "../../data/gallery-store";

interface FileIntent {
  sectionId: GallerySectionId;
  replacePhotoId?: string;
}

function createPhotoId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `photo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatBytes(bytes: number) {
  if (!bytes || bytes <= 0) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function buildPhotoFromFile(fileName: string, current: GalleryPhoto | null, optimized: Awaited<ReturnType<typeof optimizeGalleryPhoto>>) {
  const timestamp = new Date().toISOString();
  return {
    id: current?.id || createPhotoId(),
    alt: current?.alt || optimized.alt,
    originalName: fileName,
    createdAt: current?.createdAt || timestamp,
    updatedAt: timestamp,
    variants: optimized.variants,
  } satisfies GalleryPhoto;
}

export function AdminGaleriaContent() {
  const [content, setContent] = useState<GalleryContent>(() => getGalleryContent());
  const [isSaving, setIsSaving] = useState(false);
  const [processingKey, setProcessingKey] = useState<string | null>(null);
  const [fileIntent, setFileIntent] = useState<FileIntent | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const sync = () => setContent(getGalleryContent());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CONTENT_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CONTENT_UPDATED_EVENT, sync);
    };
  }, []);

  const totalPhotos = useMemo(
    () => gallerySections.reduce((acc, section) => acc + (content[section.id]?.photos.length || 0), 0),
    [content],
  );

  const openPicker = (intent: FileIntent) => {
    setFileIntent(intent);
    if (!fileInputRef.current) return;
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const updateSectionPhotos = (
    sectionId: GallerySectionId,
    updater: (photos: GalleryPhoto[]) => GalleryPhoto[],
  ) => {
    setContent((prev) => {
      const section = prev[sectionId];
      return {
        ...prev,
        [sectionId]: {
          photos: updater(section.photos),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.currentTarget.value = "";
    if (!file || !fileIntent) return;

    const processingId = fileIntent.replacePhotoId || fileIntent.sectionId;
    setProcessingKey(processingId);

    try {
      const optimized = await optimizeGalleryPhoto(file);
      const { sectionId, replacePhotoId } = fileIntent;

      if (replacePhotoId) {
        updateSectionPhotos(sectionId, (photos) =>
          photos.map((photo) =>
            photo.id === replacePhotoId ? buildPhotoFromFile(file.name, photo, optimized) : photo,
          ),
        );
        toast.success("Foto reemplazada", {
          description: "Se generaron versiones thumbnail, medium y large.",
        });
      } else {
        updateSectionPhotos(sectionId, (photos) => [
          ...photos,
          buildPhotoFromFile(file.name, null, optimized),
        ]);
        toast.success("Foto agregada", {
          description: "La imagen fue optimizada y agregada a la seccion.",
        });
      }
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "Ocurrio un error durante la optimizacion.";
      toast.error("No se pudo procesar la imagen", { description });
    } finally {
      setFileIntent(null);
      setProcessingKey(null);
    }
  };

  const movePhoto = (sectionId: GallerySectionId, index: number, direction: -1 | 1) => {
    updateSectionPhotos(sectionId, (photos) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= photos.length) return photos;
      const nextPhotos = [...photos];
      const [photo] = nextPhotos.splice(index, 1);
      nextPhotos.splice(nextIndex, 0, photo);
      return nextPhotos;
    });
  };

  const removePhoto = (sectionId: GallerySectionId, photoId: string) => {
    updateSectionPhotos(sectionId, (photos) => photos.filter((photo) => photo.id !== photoId));
  };

  const updatePhotoAlt = (sectionId: GallerySectionId, photoId: string, alt: string) => {
    updateSectionPhotos(sectionId, (photos) =>
      photos.map((photo) =>
        photo.id === photoId
          ? {
              ...photo,
              alt,
              updatedAt: new Date().toISOString(),
            }
          : photo,
      ),
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveGalleryContent(content);
      toast.success("Galeria actualizada", {
        description: "Los cambios de fotos quedaron guardados por seccion.",
      });
    } catch {
      toast.error("No se pudo guardar la galeria");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    try {
      await resetGalleryContent();
      setContent(createDefaultGalleryContent());
      toast.success("Galeria restaurada", {
        description: "Se recuperaron las imagenes por defecto.",
      });
    } catch {
      toast.error("No se pudo restaurar la galeria");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl">Administrar Galeria</h1>
          <p className="text-muted-foreground">
            Gestiona fotografias por seccion: agregar, reemplazar, reordenar y eliminar.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Total de fotos configuradas: {totalPhotos}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => void handleReset()}
            disabled={isSaving || !!processingKey}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Restaurar por defecto
          </Button>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => void handleSave()}
            disabled={isSaving || !!processingKey}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => void handleFileChange(event)}
      />

      <div className="space-y-4">
        {gallerySections.map((section) => {
          const photos = content[section.id]?.photos || [];
          const sectionIsProcessing = processingKey === section.id;

          return (
            <Card key={section.id} className="space-y-4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl">{section.label}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openPicker({ sectionId: section.id })}
                  disabled={isSaving || !!processingKey}
                >
                  <ImagePlus className="mr-2 h-4 w-4" />
                  {sectionIsProcessing ? "Procesando..." : "Agregar foto"}
                </Button>
              </div>

              {photos.length === 0 ? (
                <div className="rounded-md border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                  Esta seccion no tiene fotos cargadas.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {photos.map((photo, index) => {
                    const photoIsProcessing = processingKey === photo.id;
                    return (
                      <div key={photo.id} className="space-y-3 rounded-lg border border-border/70 p-3">
                        <div className="overflow-hidden rounded-md border border-border/60">
                          <img
                            src={photo.variants.medium.src || photo.variants.large.src}
                            alt={photo.alt || `Foto ${index + 1}`}
                            className="h-44 w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">
                            Foto #{index + 1} - {photo.originalName}
                          </div>
                          <div>
                            <Label className="text-xs">Texto alternativo</Label>
                            <Input
                              value={photo.alt}
                              onChange={(event) =>
                                updatePhotoAlt(section.id, photo.id, event.target.value)
                              }
                              placeholder="Descripcion de la imagen"
                              disabled={isSaving || !!processingKey}
                            />
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>Thumbnail: {formatBytes(photo.variants.thumbnail.bytes)}</div>
                            <div>Medium: {formatBytes(photo.variants.medium.bytes)}</div>
                            <div>Large: {formatBytes(photo.variants.large.bytes)}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => movePhoto(section.id, index, -1)}
                            disabled={index === 0 || isSaving || !!processingKey}
                          >
                            <ArrowUp className="mr-1 h-3.5 w-3.5" />
                            Subir
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => movePhoto(section.id, index, 1)}
                            disabled={index === photos.length - 1 || isSaving || !!processingKey}
                          >
                            <ArrowDown className="mr-1 h-3.5 w-3.5" />
                            Bajar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              openPicker({
                                sectionId: section.id,
                                replacePhotoId: photo.id,
                              })
                            }
                            disabled={isSaving || !!processingKey}
                          >
                            <Upload className="mr-1 h-3.5 w-3.5" />
                            {photoIsProcessing ? "Procesando..." : "Reemplazar"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removePhoto(section.id, photo.id)}
                            disabled={isSaving || !!processingKey}
                          >
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
