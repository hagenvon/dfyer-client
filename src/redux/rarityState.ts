import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseFilterTraitString } from "../helper/filterTraitString";
import { Editions, Filters, Weights } from "../models/Rarity.models";

export interface RarityState {
  weights: Weights;
  filters: Filters;
  edition: Editions;
}

const initialState: RarityState = {
  weights: {
    Type: 1,
    Model: 0,
    "Gang Role": 0.1,
    "Favorite Rapper": 0,
    Look: 0,
    Background: 1,
    "Head color": 1,
    Neck: 0.33,
    Shades: 1,
    Smoking: 1,
    Beak: 1,
    Chain: 1,
    Earring: 1,
    Tattoo: 1,
    "Head accessories": 0.66,
  },
  filters: {},
  edition: "infamous",
};

export const rarityStateSlice = createSlice({
  name: "rarity",
  initialState,
  reducers: {
    setWeight: (state, action: PayloadAction<Weights>) => {
      state.weights = {
        ...state.weights,
        ...action.payload,
      };
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
    addFilter: (state, action: PayloadAction<Filters>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const parsedFilter = parseFilterTraitString(action.payload);
      state.filters = {
        ...state.filters,
        [parsedFilter.trait_type]: state.filters[
          parsedFilter.trait_type
        ].filter((it) => it !== action.payload),
      };
    },
    setEdition: (state, action: PayloadAction<Editions>) => {
      state.edition = action.payload;
    },
  },
});

export const { setWeight, setFilters, addFilter, removeFilter, setEdition } =
  rarityStateSlice.actions;
export default rarityStateSlice.reducer;
