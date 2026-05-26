export type LocalizedString = {
  en: string;
  it: string;
};

export type Look = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  tags: string[];
  basePrice: number;
  imageUrl?: string | null;
  defaultOptions?: Record<string, string>;
};

export type Category = {
  id: string;
  name: LocalizedString;
  order: number;
  lookIds: string[];
};

export type Option = {
  id: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  imageUrl?: string | null;
};

export type Selection = Record<string, string>;
