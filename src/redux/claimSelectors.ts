import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";
import { IClaim } from "../models/IClaim";

const selectAllClaims = (state: RootState) => {
  return (Object.values(state.claims.entities) as IClaim[]) || ([] as IClaim[]);
};

export const selectTotalClaimableButter = createSelector(
  [selectAllClaims],
  (claims) => {
    return claims.reduce((acc, next) => {
      return acc + (next.isClaimable ? next.amount : 0);
    }, 0);
  }
);

export const selectIsClaimingAll = (state: RootState) => {
  return state.claims.claimingAll;
};

export const selectIsClaimingOne = (token: string) => (state: RootState) => {
  return state.claims.claimingOne.includes(token);
};

export const selectIsClaimingAny = (state: RootState) => {
  return state.claims.claimingOne.length > 0;
};
