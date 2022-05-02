import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiState";
import metadataReducer from "./metadataState";
import rarityReducer from "./rarityState";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    metadata: metadataReducer,
    rarity: rarityReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
