import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";
import flagsReducer from "./slices/flags";
import modalReducer from "./slices/modal";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    flags: flagsReducer,
    modal: modalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch