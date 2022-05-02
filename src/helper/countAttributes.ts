import { IMetaData } from "../models/IMetaData";
import { ITrait } from "../models/ITrait";
import { CountedAttributes } from "../models/Rarity.models";

export function getAllAttributes(allMetadata: IMetaData[]): ITrait[] {
  const result: ITrait[] = [];
  allMetadata.forEach((metadata) => {
    result.push(...metadata.attributes);
  });
  return result;
}

const reducer = (
  acc: CountedAttributes,
  { trait_type, value }: ITrait
): CountedAttributes => {
  acc[trait_type] = acc[trait_type] || {};
  acc[trait_type][value] = acc[trait_type][value] || 0;
  acc[trait_type][value] += 1;
  return acc;
};

export function countAttributes(allAttrs: ITrait[]) {
  return allAttrs.reduce(reducer, {});
}
