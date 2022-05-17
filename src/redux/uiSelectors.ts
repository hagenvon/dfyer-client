import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

export const selectUiState = (state: RootState) => state.ui;

export const selectButterBalance = createSelector(
  [selectUiState],
  (ui) => ui.butterBalance
);

export const selectSolBalance = createSelector(
  [selectUiState],
  (ui) => ui.solBalance
);

export const selectActiveUpdates = createSelector(
  [selectUiState],
  (ui) => ui.activeUpdates
);

export const selectCompletedActiveUpdateSignatures = createSelector(
  [selectActiveUpdates],
  (activeUpdates) =>
    Object.entries(activeUpdates)
      .filter(([signature, update]) => {
        return update.showSuccess === true;
      })
      .map(([signature]) => {
        return signature;
      })
);
