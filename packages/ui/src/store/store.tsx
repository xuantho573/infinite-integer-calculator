import { configureStore } from "@reduxjs/toolkit";
import expressionReducer from "./expressionSlice";
import historyArrayReducer from "./historyArraySlice";
import resultReducer from "./resultSlice";

const store = configureStore({
  reducer: {
    expression: expressionReducer,
    historyArray: historyArrayReducer,
    result: resultReducer
  }
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
