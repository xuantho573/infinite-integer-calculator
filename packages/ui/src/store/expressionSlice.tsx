import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const expressionSlice = createSlice({
  name: "expression",
  initialState: {
    value: ""
  },
  reducers: {
    append: (state, action: { payload: string }) => {
      state.value += action.payload;
    },
    pop: (state, action: { payload: number }) => {
      if (action.payload >= state.value.length) state.value = "";
      else
        state.value = state.value.slice(0, state.value.length - action.payload);
    },
    set: (state, action: { payload: string }) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = "";
    }
  }
});

export const actions = expressionSlice.actions;

export default expressionSlice.reducer;

export const select = (state: RootState) => state.expression.value;
