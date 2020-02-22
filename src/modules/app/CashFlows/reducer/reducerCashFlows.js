import moment from 'moment';
import { types } from '../constants';

const initialState = {
  list: [],
  currentMonth: moment(new Date()).format('YYYY-MM'),
};
const reducerCashFlows = (state = initialState, action) => {
  if (action.type === types.GET_CASH_FLOWS) {
    return {
      ...state,
      list: action.payload.list,
    };
  }
  if (action.type === types.SET_CASH_FLOWS_CURRENT_MONTH) {
    return {
      ...state,
      currentMonth: moment(action.payload.month).format('YYYY-MM'),
    };
  }
  if (action.type === types.UPDATE_CASH_FLOW) {
    return state.list.map(cashFlow => {
      if (cashFlow.id === action.payload.id) {
        return { ...cashFlow, ...action.payload };
      }
      return cashFlow;
    });
  }
  if (action.type === types.ADD_CASH_FLOW) {
    return [...state.list, action.payload];
  }
  if (action.type === types.REMOVE_CASH_FLOW) {
    return state.list.filter(cashFlow => cashFlow.id !== action.payload.id);
  }
  return state;
};

export default reducerCashFlows;
