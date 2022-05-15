import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IClaim } from "../models/IClaim";
import {
  getAllClaims,
  getAllRewards,
  getSingleReward,
  startStaking,
} from "../api/claim.api";
import { fetchMintBalance } from "./uiState";
import { butterPubKey } from "../constants/constants";
import { PublicKey } from "@solana/web3.js";

export const claimAdapter = createEntityAdapter<IClaim>({
  selectId: (claim) => claim.token,
  // sortComparer: (a, b) =>
  //   new Date(a.lastClaim).getTime() - new Date(b.lastClaim).getTime(),
});

export const fetchClaims = createAsyncThunk<IClaim[], string>(
  "claims/fetchAll",
  async (wallet: string) => {
    return await getAllClaims(wallet);
  }
);

export const startClaiming = createAsyncThunk<IClaim, string>(
  "claims/startStaking",
  async (token: string) => {
    return await startStaking(token);
  }
);

export const claimSingleReward = createAsyncThunk<
  IClaim,
  { token: string; wallet: string }
>("claims/singleReward", async ({ token, wallet }, { dispatch }) => {
  dispatch(startClaimingOne(token));
  const claim = await getSingleReward(wallet, token);

  dispatch(endClaimingOne(token));
  dispatch(
    fetchMintBalance({
      mint: butterPubKey,
      fromPublicKey: new PublicKey(wallet),
    })
  );

  return claim;
});

export const claimAllRewards = createAsyncThunk<IClaim[], string>(
  "claims/allRewards",
  async (wallet: string, { dispatch }) => {
    dispatch(startClaimingAll());

    const all = await getAllRewards(wallet);

    dispatch(endClaimingAll());
    dispatch(
      fetchMintBalance({
        mint: butterPubKey,
        fromPublicKey: new PublicKey(wallet),
      })
    );

    return all;
  }
);

const claimsSlice = createSlice({
  name: "claims",
  initialState: claimAdapter.getInitialState({
    claimingAll: false,
    claimingOne: [] as string[],
  }),
  reducers: {
    startClaimingAll: (state) => {
      state.claimingAll = true;
    },
    endClaimingAll: (state) => {
      state.claimingAll = false;
    },
    startClaimingOne: (state, action: PayloadAction<string>) => {
      state.claimingOne.push(action.payload);
    },
    endClaimingOne: (state, action: PayloadAction<string>) => {
      state.claimingOne = state.claimingOne.filter(
        (it) => it !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchClaims.fulfilled,
      (state, action: PayloadAction<IClaim[]>) => {
        state = claimAdapter.setAll(state, action.payload);
      }
    );

    builder.addCase(
      startClaiming.fulfilled,
      (state, action: PayloadAction<IClaim>) => {
        state = claimAdapter.addOne(state, action.payload);
      }
    );

    builder.addCase(
      claimSingleReward.fulfilled,
      (state, action: PayloadAction<IClaim>) => {
        state = claimAdapter.upsertOne(state, action.payload);
      }
    );

    builder.addCase(
      claimAllRewards.fulfilled,
      (state, action: PayloadAction<IClaim[]>) => {
        state = claimAdapter.upsertMany(state, action.payload);
      }
    );
  },
});

export const {
  endClaimingOne,
  startClaimingOne,
  startClaimingAll,
  endClaimingAll,
} = claimsSlice.actions;
export default claimsSlice.reducer;

export const { selectById: selectClaimById, selectAll: selectAllClaims } =
  claimAdapter.getSelectors();
