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
};

export type Selection = Record<string, string>;
