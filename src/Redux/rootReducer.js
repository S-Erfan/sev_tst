import { combineReducers } from "redux";
import globalReducer from "./global/globalReducer";
import userReducer from "./user/userReducder";

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});

export default rootReducer;
