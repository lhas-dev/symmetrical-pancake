import { createSlice } from "@reduxjs/toolkit";

export const flagsSlice = createSlice({
  name: "flags",
  initialState: {
      displayFields: false,
      addManually: false,
      agreement: false,
  },
  reducers: {
    setFlagValue: (state: any, action) => {
        const { flag, value } = action.payload;
        state[flag] = value;
    },
  },
});

export const actions = flagsSlice.actions;

export default flagsSlice.reducer;
