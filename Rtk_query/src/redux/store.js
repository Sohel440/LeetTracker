import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../features/postSlice/postApi";
import { ContestApi } from "../features/contest/ContestApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [postApi.reducerPath]: postApi.reducer,
    [ContestApi.reducerPath]: ContestApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApi.middleware)
      .concat(ContestApi.middleware),
});
