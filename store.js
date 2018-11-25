import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import * as reducers from "./ducks";
import { loadState, saveState } from "./localStorage";
import logger from "./middlewares/logger";

const rootReducer = combineReducers(reducers);

const persistedState = loadState();

let middlewares = [promiseMiddleware(), thunkMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middlewares)
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
