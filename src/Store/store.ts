// import { configureStore } from "@reduxjs/toolkit";
// import campaignReducer from "@/Store/campaignSlice";

// // If you want to store Date objects directly, disable serializableCheck (we're using ISO strings below, so it's fine either way)
// export const store = configureStore({
//   reducer: {
//     campaign: campaignReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;





// // persist redux

// import { configureStore } from "@reduxjs/toolkit";
// import campaignReducer from "@/Store/campaignSlice";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { persistReducer, persistStore } from "redux-persist";
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// // --- Persist Config ---
// const persistConfig = {
//   key: "root", // key in localStorage
//   storage,
// };

// // --- Wrap your campaign reducer with persistReducer ---
// const persistedCampaignReducer = persistReducer(persistConfig, campaignReducer);

// // --- Store ---
// export const store = configureStore({
//   reducer: {
//     campaign: persistedCampaignReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore redux-persist actions from warnings
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// // --- Persistor ---
// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// --- Import slices ---
import campaignReducer from "@/Store/campaignSlice";
// import other reducers when needed

// --- Root Reducer (keeps your campaign slice persisted) ---
const rootReducer = combineReducers({
  campaign: campaignReducer, // your original persisted campaign
  // ...add other slices
});

// --- Persist Config (same as your old one) ---
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["campaign"], // keeps campaign persisted
};

// --- Wrap rootReducer with persistReducer ---
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Store ---
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions (same as your old config)
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// --- Persistor ---
export const persistor = persistStore(store);

// --- Types ---
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
