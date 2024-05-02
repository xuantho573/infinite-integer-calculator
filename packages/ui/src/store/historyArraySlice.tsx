import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface HistoryArrayState {
  value: Array<{ key: number; expr: string; result: string }>;
}

const initialState: HistoryArrayState = {
  value: []
};

export const historyArraySlice = createSlice({
  name: "historyArray",
  initialState,
  reducers: {
    append: (state, action: { payload: { expr: string; result: string } }) => {
      state.value = [
        ...state.value,
        { key: state.value.length, ...action.payload }
      ];
    },
    clear: (state) => {
      state.value = [];
    }
  }
});

export const actions = historyArraySlice.actions;

export default historyArraySlice.reducer;

export const select = (state: RootState) => state.historyArray.value;
