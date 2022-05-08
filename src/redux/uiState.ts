import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConnection } from "../helper/getConnection";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { getInfamousTokens } from "../helper/getOwnedTokens";
import {
  IUpdateState,
  nonActiveUpdateStates,
  UpdateStateUpdatePayload,
} from "../models/IUpdateState";

export interface ActiveUpdateDetails {
  state: IUpdateState;
  token: string;
  signature: string;
  showSuccess: boolean;
}

type ActiveUpdates = {
  [signature: string]: ActiveUpdateDetails;
};

export interface UiState {
  isUpdating: boolean;
  activeUpdates: ActiveUpdates;
  solBalance: number;
  butterBalance: number;
  ownedTokens: string[];
}

const initialState: UiState = {
  isUpdating: false,
  activeUpdates: {},
  solBalance: 0,
  butterBalance: 0,
  ownedTokens: [],
};

export interface FetchMintParams {
  fromPublicKey: PublicKey;
  mint: PublicKey;
}

export const fetchSolBalance = createAsyncThunk<number, PublicKey>(
  "ui/fetchSolBalance",
  async (publicKey: PublicKey): Promise<number> => {
    const connection = getConnection();
    const result = await connection.getBalance(publicKey);

    console.log("SOL:", result);
    return (result / LAMPORTS_PER_SOL) as number;
  }
);

export const fetchMintBalance = createAsyncThunk<number, FetchMintParams>(
  "ui/fetchMintBalance",
  async ({ mint, fromPublicKey }: FetchMintParams): Promise<number> => {
    const connection = getConnection();
    const accountAddress = await splToken.getAssociatedTokenAddress(
      mint,
      fromPublicKey
    );
    const account = await splToken.getAccount(connection, accountAddress);

    return Number(account.amount || 0);
  }
);

export const findOwnedTokens = createAsyncThunk<string[], PublicKey>(
  "ui/findOwnedTokens",
  async (fromPublicKey: PublicKey): Promise<string[]> => {
    const result = await getInfamousTokens(fromPublicKey);

    return result.map((info) => info.mint);
  }
);

export const uiStateSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startUpdating: (state) => {
      state.isUpdating = true;
    },
    endUpdating: (state) => {
      state.isUpdating = false;
      let newActiveUpdates: ActiveUpdates = {};

      // filter completed updates
      Object.entries(state.activeUpdates)
        .filter(([key, value]) => {
          return value && !nonActiveUpdateStates.includes(value.state);
        })
        .forEach(([signature, updateState]) => {
          newActiveUpdates[signature] = updateState;
        });

      state.activeUpdates = { ...newActiveUpdates };
    },
    setOwnedTokens: (state, action: PayloadAction<string[]>) => {
      state.ownedTokens = [...action.payload];
    },
    startActiveTransaction: (
      state,
      action: PayloadAction<ActiveUpdateDetails>
    ) => {
      state.activeUpdates[action.payload.signature] = {
        ...action.payload,
        showSuccess: false,
      };
    },
    setActiveTransactionState: (
      state,
      action: PayloadAction<UpdateStateUpdatePayload>
    ) => {
      state.activeUpdates[action.payload.signature].state =
        action.payload.state;
    },
    markActiveTransactionAsSuccess: (state, action: PayloadAction<string>) => {
      state.activeUpdates[action.payload].showSuccess = true;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSolBalance.fulfilled, (state, action) => {
      // Add user to the state array
      state.solBalance = action.payload;
    });

    builder.addCase(fetchMintBalance.fulfilled, (state, action) => {
      state.butterBalance = action.payload;
    });

    builder.addCase(findOwnedTokens.fulfilled, (state, action) => {
      state.ownedTokens = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  startUpdating,
  endUpdating,
  setOwnedTokens,
  setActiveTransactionState,
  startActiveTransaction,
  markActiveTransactionAsSuccess,
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
