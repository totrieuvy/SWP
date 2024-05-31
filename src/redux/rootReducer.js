import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
const rootReducer = combineReducers({
  user: counterReducer,
});

export default rootReducer;
