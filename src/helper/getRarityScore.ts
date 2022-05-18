import { InfamousData } from "../models/InfamousMap";
import { CountedAttributes, Weights } from "../models/Rarity.models";
import { ITrait } from "../models/ITrait";

export const getRarityScore = (
  infData: InfamousData,
  counted: CountedAttributes,
  total: number,
  weights: Weights
): number => {
  const sanitizedAttributesList = getSanitizedAttributeList(counted, infData);

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

function getSanitizedAttributeList(
  countedAttrs: CountedAttributes,
  data: InfamousData
): ITrait[] {
  // remove blocked trait types
  const allTraitTypes = Object.keys(countedAttrs);
  const result: ITrait[] = [];

  allTraitTypes.forEach((traitType) => {
    const foundTrait = data.metadata.attributes.find(
      (it) => it.trait_type === traitType
    );
    if (foundTrait) {
      // if found everything is fine
      result.push(foundTrait);
    } else {
      // if not found everything fill up with "None",
      // Except: Aliens don't have a neck
      if (traitType !== "Neck") {
        result.push({ trait_type: traitType, value: "None" });
      }
    }
  });
  return result;
}
