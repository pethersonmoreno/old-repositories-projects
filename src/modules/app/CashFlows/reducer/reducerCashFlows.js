import { types } from '../constants';

const reducerCashFlows = (state = [], action) => {
  if (action.type === types.GET_CASH_FLOWS) {
    return action.payload;
  }
  return state;
};

export default reducerCashFlows;
