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
  return state;
};

export default reducerCashFlows;
