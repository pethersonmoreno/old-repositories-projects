import { combineReducers } from 'redux';
import accountsReducer from './accounts/reducer';
import flowDescriptionsReducer from './cashFlowDescriptions/reducer';
import flowsReducer from './cashFlows/reducer';
import peopleReducer from './people/reducer';

const reducers = {
  accounts: accountsReducer,
  flowDescriptions: flowDescriptionsReducer,
  flows: flowsReducer,
  people: peopleReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
