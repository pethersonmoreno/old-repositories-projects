import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import logger from "./middlewares/logger";
import * as reducers from "./ducks";

const rootReducer = combineReducers(reducers);

let middlewares = [thunkMiddleware, promiseMiddleware()];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export default createStore(rootReducer, applyMiddleware(...middlewares));
