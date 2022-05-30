import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";
import { updateHistoryAdapter } from "./updateHistoryState";
import { IUpdateState } from "../models/IUpdateState";

export const getUpdateHistoryState = (state: RootState) => state.updateHistory;
export const getToken = (state: RootState, token: string) => token;
export const getWallet = (state: RootState, wallet: string) => wallet;

export const selectAllUpdateEntitiesPerToken = createSelector(
  [getUpdateHistoryState, getToken],
  (state, token) => {
    const all = updateHistoryAdapter.getSelectors().selectAll(state);
    return all.filter((it) => it.token === token);
  }
);

export const selectAllUpdateEntitiesPerWallet = createSelector(
  [getUpdateHistoryState, getWallet],
  (state, wallet) => {
    const all = updateHistoryAdapter.getSelectors().selectAll(state);
    return all.filter((it) => it.fromPublicKey === wallet);
  }
);

export const selectIncompleteUpdatesPerToken = createSelector(
  [getUpdateHistoryState, getToken],
  (state, token) => {
    const all = updateHistoryAdapter.getSelectors().selectAll(state);
    const allByToken = all.filter((it) => it.token === token);

    return allByToken.filter(
      (it) => ![IUpdateState.COMPLETED].includes(it.state)
    );
  }
);

export const selectRecentUpdatesPerToken = createSelector(
  [getUpdateHistoryState, getToken],
  (state, token) => {
    const all = updateHistoryAdapter.getSelectors().selectAll(state);
    const allByToken = all.filter((it) => it.token === token);

    return allByToken.slice(0, 5);
  }
);
