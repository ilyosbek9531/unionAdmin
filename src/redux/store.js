import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sideBarExpandReducer } from "./sidebar/sidebar.slice";
import { alertReducer } from "./alert/alert.slice";
import { paginationReducer } from "./pagination/pagination.slice";

const sidebarPersistConfig = {
  key: "sidebar",
  storage,
};

const paginationPersistConfig = {
  key: "sidebar",
  storage,
};

const rootReducer = combineReducers({
  sidebar: persistReducer(sidebarPersistConfig, sideBarExpandReducer),
  pagination: persistReducer(paginationPersistConfig, paginationReducer),
  alert: alertReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
