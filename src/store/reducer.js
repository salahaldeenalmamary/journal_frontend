import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import authReducer from "./auth";
import UIsReducer from "./UI";
export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  UIS: UIsReducer,
});
