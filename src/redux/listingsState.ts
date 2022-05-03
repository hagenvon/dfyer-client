import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ListingResponse } from "../models/Listing.model";
import { getListings } from "../api/magicEden.api";

export const listingsAdapter = createEntityAdapter<ListingResponse>({
  selectId: (listing) => listing.tokenMint,
  sortComparer: (a, b) => a.price - b.price,
});

export const fetchListings = createAsyncThunk<ListingResponse[]>(
  "listings/fetchAll",
  async (): Promise<ListingResponse[]> => {
    return await getListings();
  }
);

const listingsSlice = createSlice({
  name: "listings",
  initialState: listingsAdapter.getInitialState(),
  reducers: {
    listingsReceived: (state, action: PayloadAction<ListingResponse[]>) => {
      listingsAdapter.setAll(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchListings.fulfilled,
      (state, action: PayloadAction<ListingResponse[]>) => {
        state = listingsAdapter.setAll(state, action.payload);
      }
    );
  },
});

export const { listingsReceived } = listingsSlice.actions;
export default listingsSlice.reducer;

export const { selectById: selectListingById } = listingsAdapter.getSelectors();
