import { configureStore } from '@reduxjs/toolkit'
import { postApi } from '../features/postSlice/postApi';
postApi
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [postApi.reducerPath]: postApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
