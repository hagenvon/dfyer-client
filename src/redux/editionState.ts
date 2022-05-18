import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClaim } from "../models/IClaim";
import { ITraitUpdate } from "../models/ITraitUpdate";
import { getBurnEdition } from "../api/edition.api";
import { RootState } from "./store";

export interface EditionState {
  isInitialized: boolean;
  burn: ITraitUpdate | null;
}

export const initialState: EditionState = {
  isInitialized: false,
  burn: null,
};

export const fetchBurnUpdate = createAsyncThunk<ITraitUpdate>(
  "editions/getBurnUpdate",
  async () => {
    return await getBurnEdition();
  }
);

const editionSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchBurnUpdate.fulfilled,
      (state, action: PayloadAction<ITraitUpdate>) => {
        state.burn = action.payload;
        state.isInitialized = true;
      }
    );
  },
});

export default editionSlice.reducer;

export const selectBurnUpdate = (state: RootState) => state.editions.burn;
export const selectIsEditionsInitialized = (state: RootState) =>
  state.editions.isInitialized;
