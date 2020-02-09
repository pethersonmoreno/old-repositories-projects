import { types } from '../constants';

export const getCashFlows = cashFlows => ({
  type: types.GET_CASH_FLOWS,
  payload: { list: cashFlows }
});
export const setCashFlowsCurrentMonth = month => ({
  type: types.SET_CASH_FLOWS_CURRENT_MONTH,
  payload: { month }
});
