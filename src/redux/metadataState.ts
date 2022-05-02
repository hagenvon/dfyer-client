import { InfamousData, InfamousMap } from "../models/InfamousMap";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as MetadataApi from "../api/metadata.api";

export const initialState: InfamousMap = {};

export const fetchAllMetadata = createAsyncThunk<InfamousMap>(
  "metadata/fetchAll",
  async (): Promise<InfamousMap> => {
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
  initialState,
  reducers: {
    setMetadata(state, action: PayloadAction<InfamousMap>) {
      return {
        ...action.payload,
      };
    },
    updateMetadata(state, action: PayloadAction<InfamousData>) {
      return {
        ...state,
        [action.payload.token]: {
          token: action.payload.token,
          metadata: action.payload.metadata,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchAllMetadata.fulfilled,
      (state, action: PayloadAction<InfamousMap>) => {
        return { ...action.payload };
      }
    );

    builder.addCase(
      fetchMetadata.fulfilled,
      (state, action: PayloadAction<InfamousData>) => {
        return {
          ...state,
          [action.payload.token]: {
            ...action.payload,
          },
        };
      }
    );
  },
});

export const { setMetadata, updateMetadata } = metadataSlice.actions;

export default metadataSlice.reducer;
