import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  visible: boolean;
  kind: "success" | "error";
}

const initialState: ModalState = {
  visible: false,
  kind: "error"
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (state, action) => {
        state.visible = true;
        state.kind = action.payload;
    },
    hide: (state) => {
        state.visible = false;
    }
  },
});

export const actions = modalSlice.actions;

export default modalSlice.reducer;
