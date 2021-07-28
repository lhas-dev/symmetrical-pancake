import { createSlice } from "@reduxjs/toolkit";

interface LocationsState {
  states: any[];
  cities: any[];
  [key: string]: any[];
}

const initialState: LocationsState = {
  states: [],
  cities: []
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocationValue: (state, action) => {
        const { location, value } = action.payload;
        state[location] = value;
    },
  },
});

export const actions = locationsSlice.actions;

export default locationsSlice.reducer;
