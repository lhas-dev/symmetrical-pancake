import { createSlice } from "@reduxjs/toolkit";

interface FlagState {
  displayFields: boolean;
  addManually: boolean;
  agreement: boolean;
  [key: string]: boolean;
}

const initialState: FlagState = {
  displayFields: false,
  addManually: false,
  agreement: false,
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    setFlagValue: (state, action) => {
      const { flag, value } = action.payload;
      state[flag] = value;
    },
    clear: () => initialState,
  },
});

export const actions = flagsSlice.actions;

export default flagsSlice.reducer;
