import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const resultSlice = createSlice({
  name: "result",
  initialState: {
    value: ""
  },
  reducers: {
    set: (state, action: { payload: string }) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = "";
    }
  }
});

export const actions = resultSlice.actions;

export default resultSlice.reducer;

export const select = (state: RootState) => state.result.value;
