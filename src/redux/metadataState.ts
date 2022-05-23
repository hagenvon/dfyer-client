import { InfamousData, InfamousMap } from "../models/InfamousMap";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import * as MetadataApi from "../api/metadata.api";

export const initialState: InfamousMap = {};

export const infamousDataAdapter = createEntityAdapter<InfamousData>({
  selectId: (infamousData) => infamousData.token,
});

export const fetchAllMetadata = createAsyncThunk<InfamousData[]>(
  "metadata/fetchAll",
  async (): Promise<InfamousData[]> => {
    return MetadataApi.getAllMetadata();
  }
);

export const fetchMetadata = createAsyncThunk<InfamousData, string>(
  "metadata/fetchOne",
  async (token: string): Promise<InfamousData> => {
    return MetadataApi.getMetadata(token);
  }
);

export const metadataSlice = createSlice({
  name: "metadata",
  initialState: infamousDataAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchAllMetadata.fulfilled,
      (state, action: PayloadAction<InfamousData[]>) => {
        infamousDataAdapter.setAll(state, action.payload);
      }
    );

    builder.addCase(
      fetchMetadata.fulfilled,
      (state, action: PayloadAction<InfamousData>) => {
        infamousDataAdapter.upsertOne(state, action.payload);
      }
    );
  },
});

export default metadataSlice.reducer;
