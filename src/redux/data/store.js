import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import { loadState, saveState } from './localStorage';
import logger from '../middlewares/logger';

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
