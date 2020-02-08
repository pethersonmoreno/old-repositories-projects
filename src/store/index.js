import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import logger from './middlewares/logger';
import reducerPeople from '../modules/app/People/reducer/reducerPeople';
import reducerCashFlowDescriptions from '../modules/app/CashFlowDescriptions/reducer/reducerCashFlowDescriptions';

const reducers = {
  people: reducerPeople,
  cashFlowDescriptions: reducerCashFlowDescriptions,
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
