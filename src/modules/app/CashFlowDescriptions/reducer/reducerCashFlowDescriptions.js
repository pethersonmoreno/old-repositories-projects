import { types } from '../constants';

const reducerCashFlowDescriptions = (state = [], action) => {
  if (action.type === types.GET_CASH_FLOW_DESCRIPTIONS) {
    return action.payload;
  }
  return state;
};

export default reducerCashFlowDescriptions;
