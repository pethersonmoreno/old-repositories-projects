import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./ducks";

const rootReducer = combineReducers(reducers);

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
