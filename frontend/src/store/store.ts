/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import { authApi } from "./services/authApi";
import { rtkQueryErrorLogger } from "../middlewares/error-handler";
import { todoEntryApi } from "./services/todoEntryApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [todoEntryApi.reducerPath]: todoEntryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      todoEntryApi.middleware,
      rtkQueryErrorLogger
    ),
});

export const persistor = persistStore(store);
