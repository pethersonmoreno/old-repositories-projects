import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import logger from './middlewares/logger';
import reducerApp from '../modules/appCover/reducer/reducerApp';
import reducerAuth from '../modules/auth/reducer/reducerAuth';
import reducerPeople from '../modules/app/People/reducer/reducerPeople';
import reducerAccounts from '../modules/app/Accounts/reducer/reducerAccounts';
import reducerCashFlowDescriptions from '../modules/app/CashFlowDescriptions/reducer/reducerCashFlowDescriptions';
import reducerCashFlows from '../modules/app/CashFlows/reducer/reducerCashFlows';

const reducers = {
  app: reducerApp,
  auth: reducerAuth,
  people: reducerPeople,
  accounts: reducerAccounts,
  cashFlowDescriptions: reducerCashFlowDescriptions,
  cashFlows: reducerCashFlows,
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
