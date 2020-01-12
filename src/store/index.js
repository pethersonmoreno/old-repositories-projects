import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import logger from './middlewares/logger';
import reducerPeople from '../modules/app/People/reducer/reducerPeople';

const reducers = {
  people: reducerPeople,
};

const rootReducer = combineReducers(reducers);

const persistedState = loadState();

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const dataStore = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middlewares)
);

dataStore.subscribe(() => {
  saveState(dataStore.getState());
});

export default dataStore;
