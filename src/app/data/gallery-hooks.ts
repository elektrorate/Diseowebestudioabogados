import { useEffect, useMemo, useState } from "react";
import { CONTENT_UPDATED_EVENT } from "./content-store";
import { GallerySectionId } from "./gallery-sections";
import { GalleryContent, getGalleryContent, resolveSectionImage } from "./gallery-store";

export function useSectionGalleryImage(
  sectionId: GallerySectionId,
  fallbackSrc: string,
  fallbackAlt: string,
  sizes?: string,
) {
  const [content, setContent] = useState<GalleryContent>(() => getGalleryContent());

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

  return useMemo(
    () => resolveSectionImage(content, sectionId, fallbackSrc, fallbackAlt, sizes),
    [content, fallbackAlt, fallbackSrc, sectionId, sizes],
  );
}
