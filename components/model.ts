/**
 * Shared mock data used across stories and unit tests.
 * Mirrors the shape of the JSON files in data/ so tests stay in sync
 * with the actual data model.
 */

import type { Look, Category, Option, Selection } from "@/lib/types";

export const mockLooks: Look[] = [
  {
    id: "natural-glow",
    name: { en: "Natural Glow", it: "Luminosità Naturale" },
    description: {
      en: "A fresh, everyday look that enhances your natural features",
      it: "Un look fresco e quotidiano che esalta i tuoi tratti naturali",
    },
    tags: ["everyday", "fresh", "minimal"],
    basePrice: 0,
  },
  {
    id: "evening-drama",
    name: { en: "Evening Drama", it: "Drama Serale" },
    description: {
      en: "Bold and sophisticated for special occasions",
      it: "Audace e sofisticato per le occasioni speciali",
    },
    tags: ["evening", "bold", "glamour"],
    basePrice: 0,
  },
];

export const mockCategories: Category[] = [
  {
    id: "base",
    name: { en: "Base", it: "Base" },
    order: 1,
    lookIds: ["natural-glow", "evening-drama"],
  },
  {
    id: "eyes",
    name: { en: "Eyes", it: "Occhi" },
    order: 2,
    lookIds: ["natural-glow", "evening-drama"],
  },
  {
    id: "lips",
    name: { en: "Lips", it: "Labbra" },
    order: 3,
    lookIds: ["natural-glow", "evening-drama"],
  },
];

export const mockOptions: Option[] = [
  {
    id: "base-light",
    categoryId: "base",
    name: { en: "Light Coverage", it: "Copertura Leggera" },
    description: { en: "Lightweight, skin-like finish", it: "Finish leggero" },
    price: 0,
  },
  {
    id: "base-medium",
    categoryId: "base",
    name: { en: "Medium Coverage", it: "Copertura Media" },
    description: { en: "Balanced coverage with glow", it: "Copertura equilibrata" },
    price: 0,
  },
  {
    id: "eyes-nude",
    categoryId: "eyes",
    name: { en: "Nude Palette", it: "Palette Nude" },
    description: { en: "Warm neutrals", it: "Neutri caldi" },
    price: 0,
  },
  {
    id: "eyes-smoky",
    categoryId: "eyes",
    name: { en: "Smoky Eye", it: "Smoky Eye" },
    description: { en: "Dramatic dark tones", it: "Toni scuri drammatici" },
    price: 15,
  },
  {
    id: "lips-nude",
    categoryId: "lips",
    name: { en: "Nude Lip", it: "Labbra Nude" },
    description: { en: "Natural-toned lip color", it: "Colore naturale" },
    price: 0,
  },
];

export const mockSelectionPartial: Selection = {
  base: "base-light",
};

export const mockSelectionFull: Selection = {
  base: "base-light",
  eyes: "eyes-smoky",
  lips: "lips-nude",
};
