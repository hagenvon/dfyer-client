import { RootState } from "./store";
import { InfamousData } from "../models/InfamousMap";
import { createSelector } from "@reduxjs/toolkit";
import { infamousDataAdapter } from "./metadataState";

export function selectOwnedTokens(state: RootState): string[] {
  return state.ui.ownedTokens;
}

const selectUiState = (state: RootState) => state.ui;
const selectMetadataState = (state: RootState) => state.metadata;
const selectToken = (state: RootState, token: string) => token;

export const getMetadataByToken = infamousDataAdapter.getSelectors().selectById;

export const selectAllInfamousDataAsList =
  infamousDataAdapter.getSelectors().selectAll;

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
