import { RootState } from "./store";
import { InfamousData } from "../models/InfamousMap";
import { createSelector } from "@reduxjs/toolkit";

export function selectOwnedTokens(state: RootState): string[] {
  return state.ui.ownedTokens;
}

const selectUiState = (state: RootState) => state.ui;
const selectMetadataState = (state: RootState) => state.metadata;
const selectToken = (state: RootState, token: string) => token;

export const getMetadataByToken = createSelector(
  [selectMetadataState, selectToken],
  (state, token) => state[token]
);

export const selectAllInfamousDataAsList = createSelector(
  [selectMetadataState],
  (all) => {
    return Object.values(all) as InfamousData[];
  }
);

export const selectMetadataAsList = createSelector(
  [selectAllInfamousDataAsList],
  (all) => {
    return all.map((it) => it.metadata);
  }
);

const selectSignature = (state: RootState, signature: string) => signature;
export const selectActiveTransactionState = createSelector(
  [selectUiState, selectSignature],
  (state, signature) => {
    return state.activeUpdates[signature];
  }
);
export const selectAllActiveUpdates = createSelector(
  [selectUiState],
  (state) => {
    return Object.values(state.activeUpdates);
  }
);
export const selectIsUpdating = (state: RootState) => state.ui.isUpdating;
