import { ITrait } from "../models/ITrait";

export const FILTER_DELIMITER = "||";

export function stringifyFilterTrait(trait: ITrait): string {
  return `${trait.trait_type}${FILTER_DELIMITER}${trait.value}`;
}

export function parseFilterTraitString(str: string): ITrait {
  const [trait_type, value] = str.split(FILTER_DELIMITER);

  return {
    trait_type,
    value,
  };
}
