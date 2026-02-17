import homeHeroImage from "@/assets/54e6bf754107c9c49ea97b9a5ae8cf74708efb3a.webp";
import homeAboutImage from "@/assets/7cd1439c63657dc693a8f69ba7de1e85b57cf6fd.webp";
import homeProcessImage from "@/assets/f17fc7e94886323543bac62dff6e2ead1d41daaf.webp";
import homeGacetaImage from "@/assets/151cf3ccbe09ccc69d2c481a35014b24b67ab818.webp";
import nosotrosEquipoImage from "@/assets/group-confident-businesspeople-office.webp";
import procesosHeroImage from "@/assets/defends.webp";

export type GalleryVariantKey = "thumbnail" | "medium" | "large";

export const gallerySections = [
  {
    id: "home_hero",
    label: "Inicio - Hero",
    description: "Fondo principal de portada.",
  },
  {
    id: "home_about",
    label: "Inicio - Sobre ONLEX",
    description: "Imagen de apoyo para la seccion Sobre ONLEX.",
  },
  {
    id: "home_process",
    label: "Inicio - Procesos vs Estado",
    description: "Imagen de la seccion de procesos contra el Estado.",
  },
  {
    id: "home_gaceta",
    label: "Inicio - Gaceta",
    description: "Imagen de la seccion La Gaceta del Jubilado.",
  },
  {
    id: "nosotros_equipo",
    label: "Nosotros - Equipo",
    description: "Imagen institucional del equipo de abogados.",
  },
  {
    id: "procesos_hero",
    label: "Procesos vs Estado - Hero",
    description: "Imagen principal de portada de la pagina Procesos vs Estado.",
  },
] as const;

export type GallerySectionId = (typeof gallerySections)[number]["id"];

export interface SectionFallbackImage {
  src: string;
  alt: string;
}

export const gallerySectionFallbacks: Record<GallerySectionId, SectionFallbackImage> = {
  home_hero: {
    src: homeHeroImage,
    alt: "Oficina profesional de abogados",
  },
  home_about: {
    src: homeAboutImage,
    alt: "Equipo profesional de abogados",
  },
  home_process: {
    src: homeProcessImage,
    alt: "Justicia y derecho",
  },
  home_gaceta: {
    src: homeGacetaImage,
    alt: "Adultos mayores",
  },
  nosotros_equipo: {
    src: nosotrosEquipoImage,
    alt: "Equipo profesional de ONLEX",
  },
  procesos_hero: {
    src: procesosHeroImage,
    alt: "Defensa legal frente al Estado",
  },
};
