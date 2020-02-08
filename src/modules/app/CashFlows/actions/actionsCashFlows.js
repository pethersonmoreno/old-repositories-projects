import { types } from '../constants';

export const getCashFlows = cashFlows => ({
  type: types.GET_CASH_FLOWS,
  payload: cashFlows
});
