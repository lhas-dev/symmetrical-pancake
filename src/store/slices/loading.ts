import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    show: () => true,
    hide: () => false,
  },
});

export const actions = loadingSlice.actions;

export default loadingSlice.reducer;
