import moment from 'moment';
import { types } from '../constants';

const initialState = {
  list: [],
  currentMonth: moment(new Date()).format('YYYY-MM'),
};

const prepareData = data => ({
  ...data,
  dateTime: data.dateTime instanceof Date ? data.dateTime.toString() : data.dateTime,
});
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
    return {
      ...state,
      list: state.list.map(cashFlow => {
        if (cashFlow.id === action.payload.id) {
          return { ...cashFlow, ...prepareData(action.payload) };
        }
        return cashFlow;
      }),
    };
  }
  if (action.type === types.ADD_CASH_FLOW) {
    if (!state.list.find(cashFlow => cashFlow.id !== action.payload.id)) {
      return {
        ...state,
        list: [...state.list, prepareData(action.payload)],
      };
    }
    return state;
  }
  if (action.type === types.REMOVE_CASH_FLOW) {
    return {
      ...state,
      list: state.list.filter(cashFlow => cashFlow.id !== action.payload.id),
    };
  }
  return state;
};

export default reducerCashFlows;
