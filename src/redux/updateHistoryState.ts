import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUpdateEntity } from "../models/IUpdateEntity";
import {
  getUpdateEntity,
  getUpdateHistory,
  getUpdateHistoryPerToken,
} from "../api/updateTrait";
import { IUpdateState } from "../models/IUpdateState";
import { fetchMetadata } from "./metadataState";
import { fetchMintBalance, fetchSolBalance } from "./uiState";
import { butterPubKey } from "../constants/constants";
import { PublicKey } from "@solana/web3.js";

export const updateHistoryAdapter = createEntityAdapter<IUpdateEntity>({
  selectId: (item) => item.signature,
  sortComparer: (a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
});

export const fetchUpdateHistoryPerWallet = createAsyncThunk<
  IUpdateEntity[],
  string
>("updateHistory/fetchAllPerWallet", async (wallet: string) => {
  return await getUpdateHistory(wallet);
});

export const fetchUpdateHistoryPerToken = createAsyncThunk<
  IUpdateEntity[],
  string
>("updateHistory/fetchAllPerToken", async (token: string) => {
  return await getUpdateHistoryPerToken(token);
});

export const fetchUpdateBySignature = createAsyncThunk<IUpdateEntity, string>(
  "updateHistory/fetchOne",
  async (signature: string, { dispatch }) => {
    const update = await getUpdateEntity(signature);

    if (update.state === IUpdateState.COMPLETED) {
      dispatch(fetchMetadata(update.token));
      dispatch(fetchSolBalance(new PublicKey(update.fromPublicKey)));
      dispatch(
        fetchMintBalance({
          mint: butterPubKey,
          fromPublicKey: new PublicKey(update.fromPublicKey),
        })
      );
    }

    return update;
  }
);

const updateHistorySlice = createSlice({
  name: "updateHistory",
  initialState: updateHistoryAdapter.getInitialState({
    showUpdateInModal: "",
  }),
  reducers: {
    updateUpdateEntity: (state, action: PayloadAction<IUpdateEntity>) => {
      state = updateHistoryAdapter.upsertOne(state, action.payload);
    },
    showUpdateModal: (state, action: PayloadAction<string>) => {
      state.showUpdateInModal = action.payload;
    },
    hideUpdateModal: (state) => {
      state.showUpdateInModal = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchUpdateHistoryPerWallet.fulfilled,
      (state, action: PayloadAction<IUpdateEntity[]>) => {
        state = updateHistoryAdapter.upsertMany(state, action.payload);
      }
    );

    builder.addCase(
      fetchUpdateHistoryPerToken.fulfilled,
      (state, action: PayloadAction<IUpdateEntity[]>) => {
        state = updateHistoryAdapter.upsertMany(state, action.payload);
      }
    );

    builder.addCase(
      fetchUpdateBySignature.fulfilled,
      (state, action: PayloadAction<IUpdateEntity>) => {
        state = updateHistoryAdapter.upsertOne(state, action.payload);
      }
    );
  },
});

export const { updateUpdateEntity, showUpdateModal, hideUpdateModal } =
  updateHistorySlice.actions;

export default updateHistorySlice.reducer;

export const {
  selectById: selectUpdateEntity,
  selectAll: selectAllUpdateEntities,
} = updateHistoryAdapter.getSelectors();
