import { RootState } from "./store";
import { InfamousData } from "../models/InfamousMap";
import { createSelector } from "@reduxjs/toolkit";
import {
  selectAllFilters,
  selectAllWeights,
  selectEdition,
} from "./raritySelectors";
import { parseFilterTraitString } from "../helper/filterTraitString";
import { Filters } from "../models/Rarity.models";
import { getRarityScore } from "../helper/getRarityScore";
import { countAttributes, getAllAttributes } from "../helper/countAttributes";

const selectMetadataState = (state: RootState) => state.metadata;

export const selectAllInfamousDataAsList = createSelector(
  [selectMetadataState],
  (all) => {
    const result: InfamousData[] = [];

    all.ids.forEach((id) => {
      const entity = all.entities[id];
      if (entity) {
        result.push(entity);
      }
    });

    return result;
  }
);

export const selectMetadataAsList = createSelector(
  [selectAllInfamousDataAsList],
  (all) => {
    return all.map((it) => it.metadata);
  }
);

export const selectAllInfamousDataAsListByEdition = createSelector(
  [selectAllInfamousDataAsList, selectEdition],
  (all, edition) => {
    const criteria = edition;
    return all.filter((it) =>
      it.metadata.name.toLowerCase().startsWith(criteria)
    );
  }
);

export const selectMetadataAsListByEdition = createSelector(
  [selectAllInfamousDataAsListByEdition],
  (all) => {
    return all.map((it) => it.metadata);
  }
);

export const combineInfamousDataListAndFilters = (
  infamousDataList: InfamousData[],
  filters: Filters
) => {
  return infamousDataList.filter((infamousData) => {
    const allFilters: string[] = [];
    Object.values(filters).forEach((it) => {
      allFilters.push(...it);
    });

    const parsedFilter = allFilters.map(parseFilterTraitString);

    return parsedFilter.every((filterTrait) => {
      return infamousData.metadata.attributes.find((it) => {
        return (
          it.trait_type === filterTrait.trait_type &&
          it.value === filterTrait.value
        );
      });
    });
  });
};

export const selectCountedAttributes = createSelector(
  [selectMetadataAsListByEdition],
  (all) => {
    const allAttributes = getAllAttributes(all);

    return countAttributes(allAttributes);
  }
);

export const selectCountedAttributesInTotal = createSelector(
  [selectMetadataAsList],
  (all) => {
    const allAttributes = getAllAttributes(all);

    return countAttributes(allAttributes);
  }
);

export const selectInfamousDataWithScore = createSelector(
  [
    selectAllInfamousDataAsListByEdition,
    selectCountedAttributes,
    selectAllWeights,
  ],
  (allInfamousData, counted, weights) => {
    return allInfamousData.map((infData) => {
      return {
        ...infData,
        rarityScore: getRarityScore(
          infData,
          counted,
          allInfamousData.length,
          weights
        ),
      };
    });
  }
);

export const selectFilteredInfamousData = createSelector(
  [selectInfamousDataWithScore, selectAllFilters],
  combineInfamousDataListAndFilters
);
