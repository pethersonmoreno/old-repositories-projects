import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "./middlewares/logger";
import * as reducers from "./ducks";

const rootReducer = combineReducers(reducers);

let middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export default createStore(rootReducer, applyMiddleware(...middlewares));
