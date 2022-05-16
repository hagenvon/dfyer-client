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
