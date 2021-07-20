import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";
import flagsReducer from "./slices/flags";
import modalReducer from "./slices/modal";
import locationsReducer from "./slices/locations";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    flags: flagsReducer,
    modal: modalReducer,
    locations: locationsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch