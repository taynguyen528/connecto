import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@redux/slices/authSlice";
import { rootApi } from "@services/rootApi";
import snackbarReducer from "@redux/slices/snackbarSlice";
import settingsReducer from "@redux/slices/settingsSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { logOutMiddleware } from "./middlewares";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [rootApi.reducerPath],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    settings: settingsReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logOutMiddleware, rootApi.middleware);
  },
});

export const persistor = persistStore(store);
