export interface IRarityType {
  headline: string;
  subline?: string;
  items: IRarityItem[];
}

export interface IRarityItem {
  label: string;
  chance?: number;
  amount?: number;
  infotext?: string;
  previewUrl: string;
  subtext?: string;
}

export type Weights = { [traitType: string]: number };
export type Filters = { [traitType: string]: string[] };
export type Editions = "infamous" | "burnt";

export interface CountedAttributes {
  [trait_type: string]: Counter;
}

export interface Counter {
  [value: string]: number;
}
