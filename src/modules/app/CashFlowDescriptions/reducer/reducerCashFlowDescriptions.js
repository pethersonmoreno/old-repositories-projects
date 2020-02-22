import { types } from '../constants';

const reducerCashFlowDescriptions = (state = [], action) => {
  if (action.type === types.GET_CASH_FLOW_DESCRIPTIONS) {
    return action.payload;
  }
  if (action.type === types.UPDATE_DESCRIPTION) {
    return state.map(description => {
      if (description.id === action.payload.id) {
        return { ...description, ...action.payload };
      }
      return description;
    });
  }
  if (action.type === types.ADD_DESCRIPTION) {
    return [...state, action.payload];
  }
  if (action.type === types.REMOVE_DESCRIPTION) {
    return state.filter(description => description.id !== action.payload.id);
  }
  return state;
};

export default reducerCashFlowDescriptions;
