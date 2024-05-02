import {
  actions as expressionActions,
  select as selectExpr
} from "./expressionSlice";
import {
  actions as historyActions,
  select as selectHistory
} from "./historyArraySlice";
import {
  actions as resultActions,
  select as selectResult
} from "./resultSlice";
import store from "./store";

export default store;
export {
  expressionActions,
  historyActions,
  resultActions,
  selectExpr,
  selectHistory,
  selectResult
};
