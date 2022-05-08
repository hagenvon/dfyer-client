import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { parseFilterTraitString } from "../helper/filterTraitString";

export const selectRarityState = (state: RootState) => state.rarity;

export const selectAllFilters = createSelector(
  [selectRarityState],
  (state) => state.filters
);

export const selectAllWeights = createSelector(
  [selectRarityState],
  (state) => state.weights
);

export const selectEdition = createSelector(
  [selectRarityState],
  (state) => state.edition
);

export const selectAllActiveFilters = createSelector(
  [selectAllFilters],
  (filters) => {
    return Object.values(filters).flat().map(parseFilterTraitString);
  }
);
