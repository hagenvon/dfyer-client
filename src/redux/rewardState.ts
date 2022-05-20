import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClaim } from "../models/IClaim";
import { ITraitUpdate } from "../models/ITraitUpdate";
import { getBurnEdition } from "../api/edition.api";
import { RootState } from "./store";
import { IReward } from "../models/IReward";
import { getRewardConfig } from "../api/claim.api";

export interface RewardState {
  isInitialized: boolean;
  config: IReward | null;
}

export const initialState: RewardState = {
  isInitialized: false,
  config: null,
};

export const fetchRewardConfig = createAsyncThunk<IReward>(
  "rewards/getConfig",
  async () => {
    return await getRewardConfig();
  }
);

const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchRewardConfig.fulfilled,
      (state, action: PayloadAction<IReward>) => {
        state.config = action.payload;
        state.isInitialized = true;
      }
    );
  },
});

export default rewardSlice.reducer;

export const selectRewardConfig = (state: RootState) => state.rewards.config;
export const selectIsRewardsInitialized = (state: RootState) =>
  state.rewards.isInitialized;
