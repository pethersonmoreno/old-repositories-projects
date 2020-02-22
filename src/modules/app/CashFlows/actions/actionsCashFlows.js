import { types } from '../constants';

export const getCashFlows = cashFlows => ({
  type: types.GET_CASH_FLOWS,
  payload: { list: cashFlows }
});
export const setCashFlowsCurrentMonth = month => ({
  type: types.SET_CASH_FLOWS_CURRENT_MONTH,
  payload: { month }
});

export const updateCashFlow = cashFlow => ({
  type: types.UPDATE_CASH_FLOW,
  payload: cashFlow
});

export const addCashFlow = cashFlow => ({
  type: types.ADD_CASH_FLOW,
  payload: cashFlow
});

export const removeCashFlow = id => ({
  type: types.REMOVE_CASH_FLOW,
  payload: { id }
});
