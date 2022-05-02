import { InfamousData } from "../models/InfamousMap";
import { CountedAttributes, Weights } from "../models/Rarity.models";
import { ITrait } from "../models/ITrait";

export const getRarityScore = (
  infData: InfamousData,
  counted: CountedAttributes,
  total: number,
  weights: Weights
): number => {
  const allTraitTypes = Object.keys(counted);

  const sanitizedAttributesList: ITrait[] = [];

  allTraitTypes.forEach((traitType) => {
    const foundTrait = infData.metadata.attributes.find(
      (it) => it.trait_type === traitType
    );
    if (foundTrait) {
      sanitizedAttributesList.push(foundTrait);
    } else {
      // Aliens don't have a neck
      if (traitType !== "Neck") {
        sanitizedAttributesList.push({ trait_type: traitType, value: "None" });
      }
    }
  });

  const scores = sanitizedAttributesList.map(({ trait_type, value }) => {
    const score = 1 / (counted[trait_type][value] / total);
    const weight = weights[trait_type] === undefined ? 1 : weights[trait_type];

    return score * weight;
  });

  return (
    scores.reduce((acc, next) => {
      return acc + next;
    }, 0) / sanitizedAttributesList.length
  );
};
