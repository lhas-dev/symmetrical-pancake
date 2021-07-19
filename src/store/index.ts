import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";
import flagsReducer from "./slices/flags";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    flags: flagsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch