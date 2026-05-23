import type { Look, Category, Option } from "./types";
import looksData from "../data/looks.json";
import categoriesData from "../data/categories.json";
import optionsData from "../data/options.json";

const looks = looksData as Look[];
const categories = categoriesData as Category[];
const options = optionsData as Option[];

export function getLooks(): Look[] {
  return looks;
}

export function getLook(id: string): Look | undefined {
  return looks.find((l) => l.id === id);
}

export function getCategoriesForLook(lookId: string): Category[] {
  return categories
    .filter((c) => c.lookIds.includes(lookId))
    .sort((a, b) => a.order - b.order);
}

export function getOptionsForCategory(categoryId: string): Option[] {
  return options.filter((o) => o.categoryId === categoryId);
}
