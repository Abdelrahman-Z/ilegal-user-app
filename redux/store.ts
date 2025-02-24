import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
});

export default store;

export function isFetchBaseQueryError(
  error: any
): error is FetchBaseQueryError {
  return error && typeof error === "object" && "status" in error;
}
